"use client"
import { Slot } from "@radix-ui/react-slot"
import { type ComponentProps, type ReactNode, isValidElement } from "react"
import { Slottable } from "@/components/general/slottable"
import { type VariantProps, cva, cx } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:text-foreground",
  {
    variants: {
      variant: {
        default: "border-primary/40 bg-primary/15 text-primary shadow-sm hover:bg-primary/80",
        secondary: "border-secondary/40 bg-secondary/15 text-secondary hover:bg-secondary/80",
        success: "border-success/40 bg-success/15 text-success hover:bg-success/80",
        destructive:
          "border-destructive/40 bg-destructive/15 text-destructive shadow-sm hover:bg-destructive/80",
        outline: "text-foreground hover:bg-foreground/10",
      },

      size: {
        sm: "px-1 py-px gap-1 text-[0.625rem]",
        md: "px-1.5 py-0.5 gap-1.5 text-xs",
        lg: "px-2 py-1 gap-2 text-sm rounded-md",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type BadgeProps = Omit<ComponentProps<"span">, "prefix"> &
  VariantProps<typeof badgeVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean

    /**
     * The slot to be rendered before the label.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the label.
     */
    suffix?: ReactNode
  }

const badgeAffixVariants = cva("shrink-0 size-[1.1em]")

const Badge = ({
  children,
  className,
  asChild,
  variant,
  size,
  prefix,
  suffix,
  ...props
}: BadgeProps) => {
  const useAsChild = asChild && isValidElement(children)
  const Comp = useAsChild ? Slot : "span"

  return (
    <Comp className={cx(badgeVariants({ variant, size, className }))} {...props}>
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            {prefix && <Slot className={cx(badgeAffixVariants())}>{prefix}</Slot>}
            {child}
            {suffix && <Slot className={cx(badgeAffixVariants())}>{suffix}</Slot>}
          </>
        )}
      </Slottable>
    </Comp>
  )
}

export { Badge, badgeVariants }
