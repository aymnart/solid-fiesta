import { calculateTrend } from "@/lib/analytics"
import { Badge } from "@components/ui/badge"
import { boxVariants } from "@components/ui/box"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { db } from "@lib/db"
import { cn } from "@lib/utils"
import type { Prisma } from "@prisma/client"
import { subDays } from "date-fns"
import { type LucideIcon, TagsIcon, UsersIcon, WrenchIcon } from "lucide-react"
import Link from "next/link"

type CardType = {
  label: string
  icon: LucideIcon
  href: `/dashboard/${string}`
  queryNow: () => Prisma.PrismaPromise<number>
  queryLastMonth: () => Prisma.PrismaPromise<number>
}

/**
 * Dashboard metric cards with trending data visualization
 */
/**
 * A React component that renders a grid of statistical cards for a dashboard.
 * Each card displays a label, an icon, the current count, and a trend indicator
 * based on the difference between the current count and the count from the last month.
 *
 * @async
 * @function StatsCards
 * @returns {JSX.Element} A section element containing a grid of cards.
 *
 * @remarks
 * - The component has mock data (`countsNow` and `countsLastMonth`) for demonstration purposes.
 * - The `calculateTrend` function is used to compute the trend data (difference, percentage, and icon).
 * - Each card is clickable and navigates to a specific dashboard route defined in the `href` property.
 *
 * @example
 * ```tsx
 * import { StatsCards } from './stats-cards';
 *
 * const Dashboard = () => (
 *   <div>
 *     <h1>Dashboard</h1>
 *     <StatsCards />
 *   </div>
 * );
 * ```
 */
export const StatsCards = async () => {
  const cards: CardType[] = [
    {
      label: "Tools",
      icon: WrenchIcon,
      href: "/dashboard/tools",
      queryNow: () => db.user.count(),
      queryLastMonth: () =>
        db.user.count({ where: { createdAt: { gte: subDays(new Date(), 30) } } }),
    },
    {
      label: "Categories",
      icon: TagsIcon,
      href: "/dashboard/categories",
      queryNow: () => db.user.count(),
      queryLastMonth: () =>
        db.user.count({ where: { createdAt: { gte: subDays(new Date(), 30) } } }),
    },
    {
      label: "Users",
      icon: UsersIcon,
      href: "/dashboard/users",
      queryNow: () => db.user.count(),
      queryLastMonth: () =>
        db.user.count({ where: { createdAt: { gte: subDays(new Date(), 30) } } }),
    },
  ]

  // const [countsNow, countsLastMonth] = await Promise.all([
  //   db.$transaction(cards.map(card => card.queryNow())),
  //   db.$transaction(cards.map(card => card.queryLastMonth())),
  // ])
  const countsNow = [100, 200, 45]
  const countsLastMonth = [20, 200, 150]

  return (
    <section className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-6">
      {cards.map((card, index) => {
        const trend = calculateTrend(countsNow[index], countsLastMonth[index])

        return (
          <Link href={card.href} key={card.label} aria-label={card.label}>
            <Card className={cn("@container/card group", boxVariants({ hover: true }))}>
              <CardHeader className="relative">
                <CardDescription className="flex items-center gap-2">
                  <card.icon className="size-4" /> {card.label}
                </CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {countsNow[index].toLocaleString()}
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge
                    variant={
                      trend.count > 0 ? "success" : trend.count < 0 ? "destructive" : "outline"
                    }
                    prefix={<trend.icon className="size-3" />}
                    className="flex items-center gap-1.5 rounded-lg text-xs group-hover:"
                  >
                    {trend.percentage}
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="font-medium flex items-center gap-1.5">
                  <span className={cn(trend.color, "font-semibold")}>
                    {trend.difference >= 0 ? "+" : "-"}
                    {Math.abs(trend.difference)}
                  </span>
                  {card.label}
                </div>
                <div className="line-clamp-1 flex items-center gap-2 text-muted-foreground">
                  {trend.label} this month {<trend.icon className="size-3" />}
                </div>
              </CardFooter>
            </Card>
          </Link>
        )
      })}
    </section>
  )
}
