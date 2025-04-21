import { db } from "@/lib/db"
import {
  MinusIcon,
  TagsIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react"
import { subDays } from "date-fns"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Prisma } from "@prisma/client"

type CardType = {
  label: string
  icon: React.ReactNode
  href: string
  queryNow: () => Prisma.PrismaPromise<number>
  queryLastMonth: () => Prisma.PrismaPromise<number>
}
type Percentage = `${string}%`

export const StatsCards = async () => {
  const cards: CardType[] = [
    {
      label: "Tools",
      icon: <WrenchIcon className="size-4" />,
      href: "/dashboard/tools",
      queryNow: () => db.tool.count(),
      queryLastMonth: () =>
        db.tool.count({
          where: { createdAt: { gte: subDays(new Date(), 30) } },
        }),
    },
    {
      label: "Categories",
      icon: <TagsIcon className="size-4" />,
      href: "#",
      queryNow: () => db.category.count(),
      queryLastMonth: () =>
        db.category.count({
          where: { createdAt: { gte: subDays(new Date(), 30) } },
        }),
    },
    {
      label: "Users",
      icon: <UsersIcon className="size-4" />,
      href: "#",
      queryNow: () => db.user.count(),
      queryLastMonth: () =>
        db.user.count({
          where: { createdAt: { gte: subDays(new Date(), 30) } },
        }),
    },
  ]

  // const countsLastMonth = await db.$transaction(cards.map(card => card.queryLastMonth()))
  // const countsNow = await db.$transaction(cards.map(card => card.queryNow()))
  const countsNow = [585, 40, 20]
  const countsLastMonth = [400, 70, 20]
  const Trend = (
    index: number,
  ): {
    label: string
    icon: React.ReactNode
    percentage: Percentage
    count: number
    color: string
    difference: number
  } => {
    const count: number = (countsNow[index] * 100) / countsLastMonth[index] - 100
    const percentage: Percentage = `${Number.isInteger(count) ? count : count.toFixed(2)}%`

    return count > 0
      ? {
          label: "Trending up",
          icon: <TrendingUpIcon className="size-3" />,
          percentage,
          count,
          color: "text-success",
          difference: countsNow[index] - countsLastMonth[index],
        }
      : count < 0
        ? {
            label: "Trending down",
            icon: <TrendingDownIcon className="size-3" />,
            percentage,
            count,
            color: "text-destructive",
            difference: countsNow[index] - countsLastMonth[index],
          }
        : {
            label: "Stable",
            icon: <MinusIcon className="size-3" />,
            percentage,
            count,
            color: "text-foreground",
            difference: countsNow[index] - countsLastMonth[index],
          }
  }

  return (
    <div className="data-[slot=card]:*:shadow-2xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 data-[slot=card]:*:bg-linear-to-t data-[slot=card]:*:from-primary/5 data-[slot=card]:*:to-card dark:data-[slot=card]:*:bg-card lg:px-6">
      {cards.map((card, index) => (
        <Link
          href={card.href}
          key={card.label}
          className="hover:ring-2 hover:ring-border/60 transition-colors rounded-lg"
        >
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription className="flex items-center gap-2">
                {card.icon} {card.label}
              </CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {countsNow[index].toLocaleString()}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant={
                    Trend(index).count > 0
                      ? "success"
                      : Trend(index).count < 0
                        ? "destructive"
                        : "outline"
                  }
                  suffix={Trend(index).icon}
                  className={cn("flex items-center gap-1.5 rounded-lg text-xs")}
                >
                  {Trend(index).percentage}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="font-medium flex items-center gap-1.5">
                <span className={cn(Trend(index).color, "font-semibold")}>
                  {Trend(index).difference >= 0 ? "+" : "-"}
                  {Math.abs(Trend(index).difference)}{" "}
                </span>
                {card.label}
              </div>
              <div className="line-clamp-1 flex items-center gap-2 text-muted-foreground">
                {Trend(index).label} this month {Trend(index).icon}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
