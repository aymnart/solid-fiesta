import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type PatternDividerProps = ComponentPropsWithoutRef<"div"> & {
  fullwidth?: boolean
}

function PatternGap({ fullwidth = false, className, ...props }: PatternDividerProps) {
  return (
    <div
      className={cn(
        fullwidth ? "w-screen" : "w-full",
        "h-14 edge-pattern screen-line-after screen-line-before",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

export default PatternGap
