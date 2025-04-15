import { SidebarTrigger } from "@/components/sidebar/sidebar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem } from "../ui/breadcrumb"

export function SiteHeader({ items }: { items: { title: string; url: string }[] }) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          {items.map(item => (
            <BreadcrumbItem className="text-sm" key={item.title}>
              <Link href={item.url}>{item.title}</Link>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>
    </header>
  )
}
