import { logout } from "@actions/auth/logout"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Button } from "@components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { useCurrentUser } from "@hooks/use-current-user"
import { Bell, CreditCard, LogOut, Sparkles, UserCircle } from "lucide-react"
import Link from "next/link"
import React from "react"

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

export default function UserButton() {
  const user = useCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          hover={false}
          focus={false}
          variant="ghost"
          size="icon_sm"
          className="rounded-full"
          asChild
        >
          <Avatar className="h-8 w-8 rounded-lg ">
            <AvatarImage
              src={user?.image || undefined}
              alt={`${user?.name || "user"}'s image`}
              loading="lazy"
            />
            <AvatarFallback className="h-8 w-8 rounded-lg">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
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
                alt={`${user?.name || "user"}'s image`}
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
          <React.Fragment key={index}>
            {(index === 1 || index === dropDownItems.length - 1) && <DropdownMenuSeparator />}

            <DropdownMenuItem asChild onClick={item.onClick}>
              <Link href={item.href}>
                {item.icon && <item.icon className="opacity-60 mr-1" />}
                {item.label}
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
