import type { CategoryManyNested } from "@/app/categories/mockData"
import { Tile, TileCaption, TileDivider, TileTitle } from "@/components/ui/tile"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ComponentProps } from "react"
import { useMemo } from "react"
import { EmptyList } from "@/components/general/empty-list"
import { H } from "@/components/general/heading"
import { Skeleton } from "@/components/ui/skeleton"

type CategoryListProps = ComponentProps<"div"> & {
  categories: CategoryManyNested[]
}

const CategoryList = ({ categories, className, ...props }: CategoryListProps) => {
  if (!categories.length) {
    return <EmptyList>No categories found.</EmptyList>
  }

  return (
    <div
      className={cn("columns-3xs -mt-8 gap-6 md:gap-8 md:-mt-12 lg:gap-14", className)}
      {...props}
    >
      {categories.map(({ name, slug, fullPath, subcategories }) => (
        <div
          key={slug}
          className="inline-flex flex-col gap-4 w-full mt-8 md:mt-12 hover:text-primary"
        >
          <H size="h4" className="text-lg">
            <Link href={`/categories/${fullPath}`} prefetch={false}>
              {name}
            </Link>
          </H>

          {subcategories?.length > 0 &&
            subcategories.map(({ name, slug, fullPath, subcategories }) => (
              <div key={slug} className="flex flex-col gap-3 pl-3">
                <H size="h5" className="text-sm">
                  <Link href={`/categories/${fullPath}`} prefetch={false}>
                    {name}
                  </Link>
                </H>

                {subcategories?.length > 0 && (
                  <div className="contents">
                    {subcategories.map(({ name, slug, fullPath, tools }) => (
                      <Tile key={slug} className="pl-3" asChild>
                        <Link href={`/categories/${fullPath}`} prefetch={false}>
                          <TileTitle className="text-xs font-normal text-muted-foreground group-hover:text-foreground">
                            {name}
                          </TileTitle>

                          <TileDivider />

                          <TileCaption className="tabular-nums">
                            <span className="text-[10px] mr-0.5 opacity-50">#</span>
                            {tools}
                          </TileCaption>
                        </Link>
                      </Tile>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

const CategoryListSkeleton = () => {
  // Generate stable IDs for skeleton items - only calculated once on component mount
  const skeletonData = useMemo(() => {
    return Array.from({ length: 6 }, (_, categoryIndex) => {
      const subCategoryCount = Math.floor(Math.random() * 3) + 2

      return {
        id: `categ-${categoryIndex}`,
        subcategories: Array.from({ length: subCategoryCount }, (_, subIndex) => {
          const subsubcategoryCount = Math.floor(Math.random() * 3) + 2

          return {
            id: `subcateg-${categoryIndex}-${subIndex}`,
            subsubcategories: Array.from({ length: subsubcategoryCount }, (_, subsubIndex) => ({
              id: `subsubcategories-${categoryIndex}-${subIndex}-${subsubIndex}`,
            })),
          }
        }),
      }
    })
  }, [])

  return (
    <div className="columns-3xs -mt-8 gap-6 md:gap-8 md:-mt-12 lg:gap-10">
      {skeletonData.map(category => (
        <div key={category.id} className="inline-flex flex-col gap-4 w-full mt-8 md:mt-12">
          <H size="h4" className="text-lg">
            <Skeleton className="w-1/2">&nbsp;</Skeleton>
          </H>

          {category.subcategories.map(subcategory => (
            <div key={subcategory.id} className="flex flex-col gap-2 pl-2">
              <H size="h5" className="text-sm">
                <Skeleton className="w-2/3">&nbsp;</Skeleton>
              </H>

              <div className="contents">
                {subcategory.subsubcategories.map(subsubcategory => (
                  <Tile key={subsubcategory.id} className="pl-2">
                    <TileTitle className="text-xs font-normal text-muted-foreground group-hover:text-foreground">
                      <Skeleton className="w-20">&nbsp;</Skeleton>
                    </TileTitle>

                    <TileDivider />

                    <TileCaption className="tabular-nums">
                      <span className="text-[10px] mr-0.5 opacity-50">#</span>
                      <Skeleton className="inline-block w-4">&nbsp;</Skeleton>
                    </TileCaption>
                  </Tile>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export { CategoryList, CategoryListSkeleton }
