"use client";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Home, Menu, Settings } from "lucide-react";
import UserButton from "./user-button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
}

export default function Navbar() {
  const pathname = usePathname();

  const navItems: NavItem[] = React.useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        icon: Home,
        isActive: pathname === "/",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        isActive: pathname.startsWith("/settings"),
      },
      {
        label: "Menu",
        href: "/menu",
        icon: Menu,
        isActive: pathname.startsWith("/menu"),
      },
    ],
    [pathname]
  );

  return (
    <nav className="z-50 w-max mx-auto flex fixed top-2 left-0 right-0 items-center justify-center space-x-4 rounded-full border bg-background p-2 shadow-lg">
      {navItems.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                item.isActive && "bg-primary text-primary-foreground",
                buttonVariants({
                  variant: "ghost",
                  size: item.isActive ? "default" : "icon",
                }),
                "rounded-full"
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
  );
}
