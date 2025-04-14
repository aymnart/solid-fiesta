import { DataTable } from "@/components/dashboard/data-table"
import data from "./data.json"
import { SiteHeader } from "@/components/general/site-header"
function Page() {
  return (
    <div>
      <SiteHeader items={[{ title: "Tools", url: "/dashboard/tools" }]} />
      <DataTable data={data} />
    </div>
  )
}

export default Page
