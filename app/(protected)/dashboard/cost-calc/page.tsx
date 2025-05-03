"use client"

import { H } from "@/components/general/heading"
import { SiteHeader } from "@/components/general/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"

const pricingData = [
  { label: "Database", description: "NeonDB", starterPrice: 0, scalePrice: 19 },
  { label: "Email Service", description: "Resend", starterPrice: 0, scalePrice: 20 },
  { label: "Storage", description: "AWS S3 Standard Storage", starterPrice: 0, scalePrice: 5 },
  { label: "Analytics", description: "Plausible", starterPrice: 9, scalePrice: 9 },
  { label: "Redis", description: "Upstash Redis", starterPrice: 0, scalePrice: 10 },
  { label: "AI", description: "Google Gemini", starterPrice: 0, scalePrice: 5 },
  { label: "Screenshots", description: "ScreenShotOne", starterPrice: 0, scalePrice: 17 },
  { label: "Payments", description: "Stripe", starterPrice: 0, scalePrice: 0 },
  { label: "Hosting", description: "Vercel", starterPrice: 0, scalePrice: 20 },
] as const

type Tier = "starter" | "scale"
type LabelValues = (typeof pricingData)[number]["label"]
type Usage = Record<LabelValues, boolean>
type CostItem = {
  label: LabelValues
  description?: string
  starterPrice: number
  scalePrice: number
}
type CostCalculatorProps = {
  title?: string
  items: readonly CostItem[]
  currencyRate?: number
  currencyLabel?: string
  storageKey?: string
  tierStorageKey?: string
}

const getInitialUsage = (items: readonly CostItem[], storageKey: string): Usage => {
  try {
    const saved = localStorage.getItem(storageKey)
    const parsed = saved ? JSON.parse(saved) : {}
    return Object.fromEntries(
      items.map(({ label }) => [label, typeof parsed[label] === "boolean" ? parsed[label] : true]),
    ) as Usage
  } catch {
    return Object.fromEntries(items.map(({ label }) => [label, true])) as Usage
  }
}

function CostCalculator({
  title = "Cost Calculator",
  items,
  currencyRate = 3.75,
  currencyLabel = "ريال",
  storageKey = "cost-calculator-usage",
  tierStorageKey = "cost-calculator-tier",
}: CostCalculatorProps) {
  const [isClient, setIsClient] = useState(false)
  const [tier, setTier] = useState<Tier>("starter")
  const [usage, setUsage] = useState<Usage>(
    Object.fromEntries(items.map(item => [item.label, true])) as Usage,
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const storedTier = localStorage.getItem(tierStorageKey)
    if (storedTier === "starter" || storedTier === "scale") {
      setTier(storedTier)
    }

    setUsage(getInitialUsage(items, storageKey))
  }, [isClient, items, storageKey, tierStorageKey])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(storageKey, JSON.stringify(usage))
    }
  }, [usage, isClient, storageKey])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(tierStorageKey, tier)
    }
  }, [tier, isClient, tierStorageKey])

  const toggleService = useCallback((label: LabelValues) => {
    setUsage(prev => ({ ...prev, [label]: !prev[label] }))
  }, [])

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      if (!usage[item.label]) return sum
      return sum + (tier === "starter" ? item.starterPrice : item.scalePrice)
    }, 0)
  }, [items, usage, tier])

  const formattedCost = useMemo(() => {
    const converted = Math.round(total * currencyRate)
    return `$${total} (${converted} ${currencyLabel})`
  }, [total, currencyRate, currencyLabel])

  if (!isClient) return null

  return (
    <Card className="w-full mx-auto max-w-xl shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex w-full max-w-xs mx-auto justify-center gap-4">
          <Button
            className="flex-1"
            variant={tier === "starter" ? "secondary" : "outline"}
            onClick={() => setTier("starter")}
            size="sm"
          >
            Starter
          </Button>
          <Button
            className="flex-1"
            variant={tier === "scale" ? "secondary" : "outline"}
            onClick={() => setTier("scale")}
            size="sm"
          >
            Scale
          </Button>
        </div>

        {items.map(({ label, description, starterPrice, scalePrice }) => {
          const price = tier === "starter" ? starterPrice : scalePrice
          return (
            <Fragment key={label}>
              <div className="flex items-center justify-between">
                <Label htmlFor={label} className="text-sm flex justify-between w-full mr-3">
                  <div>
                    <span>{label}</span>
                    {description && <span className="text-muted-foreground"> ({description})</span>}
                  </div>
                  <span className="text-muted-foreground">${price}</span>
                </Label>
                <Switch
                  id={label}
                  checked={!!usage[label]}
                  onCheckedChange={() => toggleService(label)}
                />
              </div>
              <Separator className="my-2" />
            </Fragment>
          )
        })}

        <div className="mt-8 flex flex-col items-center">
          <p className="text-muted-foreground text-sm mb-1">Estimated Monthly Cost</p>
          <H as="h2" variant="gradient" dir="rtl">
            {formattedCost}
          </H>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CalcPage() {
  return (
    <main>
      <SiteHeader items={[{ title: "Costs Calculator", url: "/dashboard/cost-calc" }]} />
      <CostCalculator items={pricingData} />
    </main>
  )
}
