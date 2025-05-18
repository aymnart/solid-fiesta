"use client"

import { LayoutDashboardIcon, ListIcon, Settings2Icon } from "lucide-react"

import { NavUser } from "@/components/dashboard/nav-user"
import Logo from "@/components/general/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/sidebar/sidebar"
import { SidebarNavGroup } from "@/components/sidebar/sidebar-nav-group"
import { useSession } from "next-auth/react"
import type { ComponentProps } from "react"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const { open } = useSidebar()
  const user = session?.user

  const data = {
    user: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.image || "",
    },
    navMain: [
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Tools",
        url: "/dashboard/tools",
        icon: ListIcon,
      },
    ],
    navSec: [
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2Icon,
      },
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {open ? <Logo /> : <Logo type="letter" width={24} className="mx-auto" />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarNavGroup items={data.navMain} />
        <SidebarNavGroup items={data.navSec} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
