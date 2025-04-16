import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export const EmptyList = ({ className, ...props }: ComponentProps<"p">) => {
  return <p className={cn("col-span-full text-muted-foreground", className)} {...props} />
}
