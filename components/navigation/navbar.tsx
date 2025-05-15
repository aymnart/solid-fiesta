"use client"
import UserButton from "@components/navigation/user-button"
import { buttonVariants } from "@components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/ui/tooltip"
import { cn } from "@lib/utils"
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ComponentType, type SVGProps, useMemo } from "react"

interface NavItem {
  label: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  isActive: boolean
}

export default function Navbar() {
  const pathname = usePathname()

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        isActive: pathname.startsWith("/settings"),
      },
      {
        label: "Dashboard",
        href: "/dashboard/overview",
        icon: LayoutDashboardIcon,
        isActive: pathname.startsWith("/dashboard"),
      },
    ],
    [pathname],
  )

  return (
    <nav className="z-50 w-max mx-auto flex fixed top-2 left-0 right-0 items-center justify-center space-x-4 rounded-lg border bg-background p-2 shadow-lg transition-all duration-300">
      {navItems.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                item.isActive && "bg-secondary text-secondary-foreground",
                buttonVariants({
                  variant: "ghost",
                  size: item.isActive ? "sm" : "icon_sm",
                }),
                "rounded-lg",
              )}
            >
              {item.icon && <item.icon />}
              {item.isActive && <span>{item.label}</span>}
              <span className="sr-only">{item.label}</span>
            </Link>
          </TooltipTrigger>
          {!item.isActive && <TooltipContent>{item.label}</TooltipContent>}
        </Tooltip>
      ))}

      <UserButton />
    </nav>
  )
}
