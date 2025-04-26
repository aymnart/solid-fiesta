"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SiteHeader } from "@/components/general/site-header"

const baseCosts = {
  database: 19, // Neon Launch Plan
  email: 20, // Resend Scale Plan
  storage: 5, // AWS S3 Standard Storage
  analytics: 9, // Plausible Analytics Basic Plan
  redis: 10, // Upstash Redis Fixed Plan
  ai: 10, // Google Gemini AI + ScreenshotOne
  auth: 0, // Google OAuth (Free)
  stripe: 0, // Stripe (Transaction fees only)
}

type Usage = {
  database: boolean
  email: boolean
  storage: boolean
  analytics: boolean
  redis: boolean
  ai: boolean
}

export default function CostCalculatorPage() {
  const [usage, setUsage] = useState<Usage>({
    database: true,
    email: true,
    storage: true,
    analytics: true,
    redis: true,
    ai: true,
  })

  function toggleService(service: keyof Usage) {
    setUsage(prev => ({ ...prev, [service]: !prev[service] }))
  }

  function calculateMonthlyCost(): number {
    let total = 0
    if (usage.database) total += baseCosts.database
    if (usage.email) total += baseCosts.email
    if (usage.storage) total += baseCosts.storage
    if (usage.analytics) total += baseCosts.analytics
    if (usage.redis) total += baseCosts.redis
    if (usage.ai) total += baseCosts.ai
    return total
  }

  function formatCost(totalUsd: number): string {
    const sarRate = 3.75 // 1 USD ≈ 3.75 SAR (Saudi Riyal)
    const sar = (totalUsd * sarRate).toFixed(0)
    return `$${totalUsd} (${sar}  ريال)`
  }
  const total = calculateMonthlyCost()
  return (
    <>
      <SiteHeader items={[{ title: "Cost Calculator", url: "/dashboard/cost-calc" }]} />
      <main className="flex items-center justify-center p-6">
        <Card className="w-full max-w-lg shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Dirstarter Cost Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {(
              [
                { label: "Database (Paid Tier)", key: "database" },
                { label: "Email Service (Resend Paid)", key: "email" },
                { label: "Storage (S3/R2)", key: "storage" },
                { label: "Analytics (Plausible)", key: "analytics" },
                { label: "Redis (Upstash)", key: "redis" },
                { label: "AI Features (Gemini, ScreenshotOne)", key: "ai" },
              ] as const
            ).map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <Label htmlFor={item.key} className="text-sm">
                  {item.label}
                </Label>
                <Switch
                  id={item.key}
                  checked={usage[item.key]}
                  onCheckedChange={() => toggleService(item.key)}
                />
              </div>
            ))}

            <div className="mt-8 flex flex-col items-center">
              <div className="text-muted-foreground text-sm">Estimated Monthly Cost</div>
              <div dir="rtl" className="text-4xl font-bold">
                {formatCost(total)}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
