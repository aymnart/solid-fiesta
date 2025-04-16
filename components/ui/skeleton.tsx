import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export const Skeleton = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("animate-pulse rounded-md bg-foreground/10", className)} {...props} />
}
