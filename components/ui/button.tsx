"use client"
import { Slot } from "@radix-ui/react-slot"
import type { ComponentProps, ReactNode } from "react"
import { Children, isValidElement } from "react"
import { boxVariants } from "@/components/ui/box"
import { Slottable } from "@/components/general/slottable"
import { type VariantProps, cva } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 hover:text-success-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 hover:text-destructive-foreground",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "border-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon_sm: "h-8 w-8 p-0",
        icon: "h-9 w-9 p-0",
        icon_lg: "h-10 w-10 p-0",
      },
      isPending: {
        true: "[&>*:not(.animate-spin)]:opacity-0 select-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

const buttonAffixVariants = cva({
  base: "shrink-0 first:-ml-[0.21425em] last:-mr-[0.21425em] [&:is(svg)]:size-[1.1em] [&:is(svg)]:opacity-75",
})

export type ButtonProps = Omit<ComponentProps<"button">, "size" | "prefix"> &
  VariantProps<typeof buttonVariants> &
  VariantProps<typeof boxVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean

    /**
     * If set to `true`, the button will be rendered in the pending state.
     */
    isPending?: boolean

    /**
     * The slot to be rendered before the label.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the label.
     */
    suffix?: ReactNode
  }

const Button = ({
  children,
  className,
  disabled,
  asChild,
  isPending,
  prefix,
  suffix,
  variant,
  size,
  hover = true,
  focus = true,
  ...props
}: ButtonProps) => {
  const useAsChild = asChild && isValidElement(children)
  const Comp = useAsChild ? Slot : "button"

  return (
    <Comp
      disabled={disabled ?? isPending}
      className={cn(
        boxVariants({ hover, focus }),
        buttonVariants({ variant, size, isPending }),
        className,
      )}
      {...props}
    >
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            <Slot className={buttonAffixVariants()}>{prefix}</Slot>

            {Children.count(child) !== 0 && (
              <span className="flex-1 flex justify-center items-center truncate only:text-center has-[div]:contents">
                {child}
              </span>
            )}

            <Slot className={buttonAffixVariants()}>{suffix}</Slot>

            {!!isPending && <Loader2Icon className="absolute size-[1.25em] animate-spin" />}
          </>
        )}
      </Slottable>
    </Comp>
  )
}

export { Button, buttonVariants }
