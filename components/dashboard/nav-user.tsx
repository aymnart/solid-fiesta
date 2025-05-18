"use client"

import { MoreVerticalIcon } from "lucide-react"

import { logout } from "@/actions/auth/logout"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/sidebar/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Bell, CreditCard, LogOut, Sparkles, UserCircle } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

const logOut = () => {
  logout()
}

const dropDownItems = [
  {
    icon: Sparkles,
    label: "Upgrade to Pro",
    href: "",
    onClick: undefined,
  },
  {
    icon: UserCircle,
    label: "Profile",
    href: "/settings",
    onClick: undefined,
  },
  {
    icon: CreditCard,
    label: "Billing",
    href: "",
    onClick: undefined,
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "",
    onClick: undefined,
  },
  {
    icon: LogOut,
    label: "Log out",
    href: "",
    onClick: logOut,
  },
]

export function NavUser() {
  const { state } = useSidebar()
  const user = useCurrentUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="flex justify-center items-center">
              <Avatar className="size-8 rounded-lg ">
                <AvatarImage
                  src={user?.image || undefined}
                  alt={`${user?.name || "user"}'s image`}
                  loading="lazy"
                />
                <AvatarFallback className="size-8 rounded-lg">
                  {user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {state === "expanded" && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                  <MoreVerticalIcon className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.image || undefined}
                    alt={`${user?.name || "User"}'s Image`}
                    loading="lazy"
                  />
                  <AvatarFallback className="h-8 w-8 rounded-lg">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dropDownItems.map((item, index) => (
              <Fragment key={index}>
                {(index === 1 || index === dropDownItems.length - 1) && <DropdownMenuSeparator />}

                <DropdownMenuItem asChild onClick={item.onClick}>
                  <Link href={item.href}>
                    {item.icon && <item.icon className="opacity-60 mr-1" />}
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              </Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
