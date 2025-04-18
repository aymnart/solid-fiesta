import type { CategoryManyNested } from "@/components/categories/category-list"
import { db } from "@/lib/db"

/**
 * Fetches categories recursively and formats them into the desired structure.
 * Optimized for performance by using a map-based approach with for...of loops
 */
export async function getCategoriesWithSubcategories(): Promise<CategoryManyNested[]> {
  // Fetch all categories in a single database query
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      fullPath: true,
      parentId: true,
      _count: {
        select: {
          tools: true,
        },
      },
    },
    // Add ordering to ensure consistent results and potentially improve cache hits
    orderBy: {
      name: "asc",
    },
  })

  // Create a map for O(1) lookups instead of filtering the array repeatedly
  const categoryMap = new Map<string | null, CategoryManyNested[]>()

  // Initialize empty arrays for each parent ID
  for (const category of categories) {
    if (!categoryMap.has(category.parentId)) {
      categoryMap.set(category.parentId, [])
    }
  }

  // Populate the map with categories
  for (const category of categories) {
    const categoryData: CategoryManyNested = {
      name: category.name,
      slug: category.slug,
      fullPath: category.fullPath,
      _count: {
        tools: category._count?.tools || 0,
      },
      subcategories: [], // Will be populated in the next step
    }

    const parentChildren = categoryMap.get(category.parentId)
    if (parentChildren) {
      parentChildren.push(categoryData)
    }

    // Ensure an entry exists for this category's children
    if (!categoryMap.has(category.id)) {
      categoryMap.set(category.id, [])
    }
  }

  // Connect subcategories to their parents
  for (const category of categories) {
    const parentSubcategories = categoryMap.get(category.id) || []
    const parentChildren = categoryMap.get(category.parentId)

    if (parentChildren) {
      const categoryInMap = parentChildren.find(
        c => c.slug === category.slug && c.fullPath === category.fullPath,
      )

      if (categoryInMap) {
        categoryInMap.subcategories = parentSubcategories
      }
    }
  }

  // Return only the root categories (those with null parentId)
  return categoryMap.get(null) || []
}

// If you need to pre-warm the cache at build time or on server start:
export async function prefetchCategories(): Promise<void> {
  await getCategoriesWithSubcategories()
  // Additional logic can be added here if needed
}
