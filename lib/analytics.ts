// lib/analytics.ts
import { type LucideIcon, MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

/**
 * A string literal type representing a percentage value.
 * Example: "45.5%", "100%", "-23.76%"
 */
type Percentage = `${number}%`

/**
 * Represents trend analytics data for a metric between two time periods.
 *
 * @property label - Human-readable label for the trend direction.
 * @property icon - Lucide icon representing the trend visually.
 * @property percentage - Percentage change between `now` and `last`, formatted as a string.
 * @property count - Raw numeric value of the percentage change (can be negative).
 * @property color - Tailwind CSS text color class based on the trend direction.
 * @property difference - Absolute difference between `now` and `last` values.
 */
type TrendData = {
  label: string
  icon: LucideIcon
  percentage: Percentage
  count: number
  color: string
  difference: number
}

/**
 * Calculates the trend between two numerical values, typically from different time periods.
 *
 * @param now - The current metric value (e.g., this month).
 * @param last - The previous metric value (e.g., last month).
 *
 * @returns A `TrendData` object describing the trend direction, percentage change,
 *          and metadata for UI representation.
 *
 * @example
 * ```ts
 * calculateTrend(120, 100) // Trending up by 20%
 * calculateTrend(80, 100)  // Trending down by 20%
 * calculateTrend(100, 100) // Stable
 * ```
 *
 * @note If `last` is 0, the percentage will default to 100%.
 */
const calculateTrend = (now: number, last: number): TrendData => {
  const diff = now - last
  const rawPercentage = last === 0 ? 100 : (now * 100) / last - 100
  const percentage: Percentage = `${Number.isInteger(rawPercentage) ? rawPercentage : Number(rawPercentage.toFixed(2))}%`

  if (rawPercentage > 0) {
    return {
      label: "Trending up",
      icon: TrendingUpIcon,
      percentage,
      count: rawPercentage,
      color: "text-success",
      difference: diff,
    }
  }

  if (rawPercentage < 0) {
    return {
      label: "Trending down",
      icon: TrendingDownIcon,
      percentage,
      count: rawPercentage,
      color: "text-destructive",
      difference: diff,
    }
  }

  return {
    label: "Stable",
    icon: MinusIcon,
    percentage,
    count: 0,
    color: "text-foreground",
    difference: diff,
  }
}

export { calculateTrend, type Percentage, type TrendData }
