"use client"

import { Indicator, Root } from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type HTMLAttributes,
  forwardRef,
} from "react"

const Checkbox = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </Indicator>
    </Root>
  ),
)
Checkbox.displayName = Root.displayName

const CheckboxWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center gap-3 bg-muted rounded-lg p-3 px-4 cursor-pointer shadow-xs shadow-input transition duration-300 hover:bg-muted/70",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  ),
)
CheckboxWrapper.displayName = "CheckboxWrapper"

export { Checkbox, CheckboxWrapper }
