import { CategoryList, CategoryListSkeleton } from "@/components/categories/category-list"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Software Categories",
  description: "Browse top categories to find your best software options.",
}

export default function Categories() {
  return (
    <>
      <div className="flex justify-center items-center mt-12 lg:max-w-screen-lg mx-auto">
        {/* <IntroTitle>{`${metadata.title}`}</IntroTitle>
          <IntroDescription>{metadata.description}</IntroDescription> */}

        <Suspense fallback={<CategoryListSkeleton />}>
          <CategoryList />
        </Suspense>
      </div>
    </>
  )
}
