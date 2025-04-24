"use client"

import { Indicator, Item, Root } from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react"
import type { ComponentRef } from "react"
import { forwardRef } from "react"

const RadioGroup = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    return <Root className={cn("grid gap-2", className)} {...props} ref={ref} />
  },
)
RadioGroup.displayName = Root.displayName

const RadioGroupItem = forwardRef<ComponentRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <Indicator className="flex items-center justify-center">
          <Circle className="h-3.5 w-3.5 fill-primary" />
        </Indicator>
      </Item>
    )
  },
)
RadioGroupItem.displayName = Item.displayName

const RadioItemWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-fit flex items-center gap-3 bg-muted rounded-lg p-3 px-4 cursor-pointer shadow-xs shadow-input transition duration-300 hover:bg-muted/70",
        className,
      )}
      {...props}
    />
  ),
)
RadioItemWrapper.displayName = "RadioItemWrapper"
export { RadioGroup, RadioGroupItem, RadioItemWrapper }
