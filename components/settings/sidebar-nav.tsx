"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex space-x-2 text-end lg:flex-col lg:space-x-0 lg:space-y-1 -mx-4 overflow-x-scroll scrollbar-hide lg:w-1/5",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted/90"
              : "hover:bg-transparent hover:underline",
            "justify-end"
          )}
        >
          {item.title}
        </Link>
      ))}
    </aside>
  );
}
