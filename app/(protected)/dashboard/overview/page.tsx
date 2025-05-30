import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SiteHeader } from "@/components/general/site-header"

export default function Page() {
  return (
    <>
      <SiteHeader items={[{ title: "Overview", url: "/dashboard/overview" }]} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* <SectionCards /> */}
            <StatsCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
