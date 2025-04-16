import { cn } from "@/lib/utils" // Utility for conditional class merging
import { AlertCircle, CheckCircle2 } from "lucide-react"
import React from "react"

export const Input = React.forwardRef(
  (
    {
      error,
      isValid,
      className,
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
      error?: string // Error message or undefined
      isValid?: boolean // Success state
      className?: string
    },
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <div className="relative">
        {/* Input Field */}
        <input
          ref={ref}
          {...props}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
            // shadow-[-2px_2px_0px_0px_hsl(var(--destructive))]
            error && "border-destructive focus-visible:ring-destructive",
            isValid && "border-success focus-visible:ring-success",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "input-error" : undefined}
        />

        {/* Icon Feedback */}
        {error ? (
          <AlertCircle
            size={18}
            className="absolute right-2 bottom-7 rounded-full bg-background text-destructive"
          />
        ) : isValid ? (
          <CheckCircle2
            size={18}
            className="absolute right-2 bottom-7 rounded-full bg-background text-success"
          />
        ) : null}
      </div>
    )
  },
)

Input.displayName = "Input"
