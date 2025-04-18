import { Tile, TileCaption, TileDivider, TileTitle } from "@/components/ui/tile"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ComponentProps } from "react"
import { EmptyList } from "@/components/general/empty-list"
import { H } from "@/components/general/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategoriesWithSubcategories } from "@/data/categories"

export type CategoryManyNested = {
  name: string
  slug: string
  fullPath: string
  subcategories: CategoryManyNested[]
  _count: {
    tools: number
  }
}

const CategoryList = async ({ className, ...props }: ComponentProps<"div">) => {
  const categories: CategoryManyNested[] = await getCategoriesWithSubcategories()
  if (!categories.length) {
    return <EmptyList>No categories found.</EmptyList>
  }

  return (
    <div
      className={cn("columns-3xs -mt-8 gap-6 md:gap-8 md:-mt-12 lg:gap-14", className)}
      {...props}
    >
      {categories.map(({ name, slug, fullPath, subcategories }) => (
        <div key={slug} className="inline-flex flex-col gap-6 w-full mt-8 md:mt-20">
          <H size="h4" className="hover:text-primary">
            <Link href={`/categories/${fullPath}`} prefetch={false}>
              {name}
            </Link>
          </H>

          {subcategories?.length > 0 &&
            subcategories.map(({ name, slug, fullPath, subcategories }) => (
              <div key={slug} className={cn("flex flex-col gap-3 pl-4 relative pb-2")}>
                <H size="h6" className="z-10 hover:underline">
                  <Link href={`/categories/${fullPath}`} prefetch={false}>
                    {name}
                  </Link>
                </H>

                {subcategories?.length > 0 && (
                  <div className="contents">
                    {subcategories.map(({ name, slug, fullPath, _count }) => (
                      <Tile key={slug} className="pl-4" asChild>
                        <Link href={`/categories/${fullPath}`} prefetch={false}>
                          <TileTitle className="text-xs font-normal text-muted-foreground hover:text-foreground">
                            {name}
                          </TileTitle>

                          <TileDivider className="border-dashed border-muted" />

                          <TileCaption className="tabular-nums">
                            <span className="text-[10px] mr-0.5 opacity-50">#</span>
                            {_count.tools}
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
  return (
    <div className="columns-3xs -mt-8 gap-6 md:gap-8 md:-mt-12 lg:gap-10">
      {Array.from({ length: 6 }, (_, categoryIndex) => (
        <div key={categoryIndex} className="inline-flex flex-col gap-4 w-full mt-8 md:mt-12">
          <H size="h4" className="text-lg">
            <Skeleton className="w-1/2">&nbsp;</Skeleton>
          </H>

          {Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, subcategoryIndex) => (
            <div key={subcategoryIndex} className="flex flex-col gap-2 pl-2">
              <H size="h5" className="text-sm">
                <Skeleton className="w-2/3">&nbsp;</Skeleton>
              </H>

              <div className="contents">
                {Array.from(
                  { length: Math.floor(Math.random() * 3) + 2 },
                  (_, subsubcategoryIndex) => (
                    <Tile key={subsubcategoryIndex} className="pl-2">
                      <TileTitle className="text-xs">
                        <Skeleton className="w-20">&nbsp;</Skeleton>
                      </TileTitle>

                      <TileDivider />

                      <TileCaption className="tabular-nums">
                        <span className="text-[10px] mr-0.5 opacity-50">#</span>
                        <Skeleton className="inline-block w-4">&nbsp;</Skeleton>
                      </TileCaption>
                    </Tile>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export { CategoryList, CategoryListSkeleton }
