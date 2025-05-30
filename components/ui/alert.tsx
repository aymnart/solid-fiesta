import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "bg-destructive/15 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "bg-success/15 border-success/50 text-success dark:border-success [&>svg]:text-success",
        info: "bg-info/15 border-info/50 text-info dark:border-info [&>svg]:text-info",
        warning:
          "bg-warning/15 border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
