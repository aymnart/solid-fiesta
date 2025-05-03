import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

const headingVariants = cva("font-display", {
  variants: {
    size: {
      h1: "text-4xl md:text-6xl font-bold tracking-tight leading-tight",
      h2: "text-3xl md:text-5xl font-semibold tracking-tight leading-snug",
      h3: "text-2xl md:text-3xl font-semibold leading-snug",
      h4: "text-xl md:text-2xl font-medium leading-normal",
      h5: "text-lg font-medium leading-normal",
      h6: "text-base font-medium leading-snug",
    },
    align: {
      start: "text-left",
      center: "text-center",
      end: "text-right",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    variant: {
      default: "text-foreground",
      subtle: "text-muted-foreground",
      gradient:
        "bg-gradient-to-b from-foreground via-foreground to-primary bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    size: "h3",
    align: "start",
    variant: "default",
  },
})

const validHeadingTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
type HeadingTag = (typeof validHeadingTags)[number]

type HProps<T extends HeadingTag = "h3"> = {
  as?: T
  className?: string
} & ComponentPropsWithoutRef<T> &
  Omit<VariantProps<typeof headingVariants>, "size">

const H = <T extends HeadingTag = "h3">({
  as,
  className,
  align,
  weight,
  variant,
  ...props
}: HProps<T>) => {
  const Tag = validHeadingTags.includes(as as HeadingTag) ? (as as HeadingTag) : "h3"
  const size = Tag

  return (
    <Tag className={cn(headingVariants({ size, align, weight, variant }), className)} {...props} />
  )
}

export { H, headingVariants }
