import { DataTable } from "@/components/dashboard/data-table"
import { SiteHeader } from "@/components/general/site-header"
import data from "./data.json"
function Page() {
  return (
    <div>
      <SiteHeader items={[{ title: "Tools", url: "/dashboard/tools" }]} />
      <DataTable data={data} />
    </div>
  )
}

export default Page
