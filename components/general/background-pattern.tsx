import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type BackgroundPatternProps = ComponentPropsWithoutRef<"div"> & {
  type?: "grid" | "dots"
}

export default function BackgroundPattern({ type = "grid", className }: BackgroundPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_100%)]",
        type === "grid" &&
          "bg-[size:35px_35px] bg-[linear-gradient(to_right,hsl(var(--ring))_1.618px,transparent_1.618px),linear-gradient(to_bottom,hsl(var(--ring))_1.618px,transparent_1.618px)]",
        type === "dots" &&
          "bg-[size:15px_15px] bg-[radial-gradient(hsl(var(--muted-foreground))_1.618px,transparent_1.618px),radial-gradient(hsl(var(--muted-foreground))_1.618px,transparent_1.618px)]",
        className,
      )}
    />
  )
}
