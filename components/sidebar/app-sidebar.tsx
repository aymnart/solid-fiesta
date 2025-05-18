"use client"

import { LayoutDashboardIcon, ListIcon } from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/sidebar/sidebar"
import { useSession } from "next-auth/react"
import type { ComponentProps } from "react"
import Logo from "../general/logo"

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
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
