import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"

const headingVariants = cva("font-display font-semibold", {
  variants: {
    size: {
      h1: "text-3xl tracking-tight text-pretty bg-linear-to-b from-foreground to-foreground/75 bg-clip-text text-transparent md:text-4xl",
      h2: "text-2xl tracking-tight md:text-3xl",
      h3: "text-2xl tracking-tight",
      h4: "text-xl tracking-tight",
      h5: "text-base font-medium tracking-micro",
      h6: "text-sm font-medium",
    },
  },

  defaultVariants: {
    size: "h3",
  },
})

const H = ({
  size,
  className,
  ...props
}: ComponentProps<"h1"> & { size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) => {
  return <h1 className={cn(headingVariants({ size, className }))} {...props} />
}

export { H, headingVariants }
