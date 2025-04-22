import { Slot } from "@radix-ui/react-slot"

import { cva, cx, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

const boxVariants = cva("border duration-100 ease-out", {
  variants: {
    hover: {
      true: "not-disabled:cursor-pointer hover:not-disabled:ring-[3px] hover:not-disabled:ring-border/50 hover:not-disabled:border-border",
    },
    focus: {
      true: "focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-border/50 focus-visible:border-ring",
    },
    focusWithin: {
      true: "focus-within:outline-hidden focus-within:ring-[3px] focus-within:ring-border/50 focus-within:border-ring",
    },
  },
})

type BoxProps = ComponentProps<"div"> & VariantProps<typeof boxVariants>

const Box = ({ hover, focus, focusWithin, className, ...props }: BoxProps) => {
  return <Slot className={cx(boxVariants({ hover, focus, focusWithin, className }))} {...props} />
}

export { Box, boxVariants, type BoxProps }
