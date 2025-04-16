import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { type ComponentProps, isValidElement } from "react"
import { Slot } from "@radix-ui/react-slot"
import { H } from "@/components/general/heading"

const tileVariants = cva("group flex justify-between items-center gap-4 min-w-0 -my-2 py-2")
type TileProps = ComponentProps<"div"> &
  import("class-variance-authority").VariantProps<typeof tileVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

const Tile = ({ className, asChild, ...props }: TileProps) => {
  const useAsChild = asChild && isValidElement(props.children)
  const Comp = useAsChild ? Slot : "div"

  return <Comp className={cn(tileVariants({ className }))} {...props} />
}

const TileTitle = ({ className, ...props }: ComponentProps<"h2">) => {
  return <H size="h5" className={cn("truncate", className)} {...props} />
}

const TileDivider = ({ className, ...props }: ComponentProps<"hr">) => {
  return <hr className={cn("min-w-2 flex-1 group-hover:border-ring", className)} {...props} />
}

const TileCaption = ({ className, ...props }: ComponentProps<"span">) => {
  return <span className={cn("shrink-0 text-xs text-secondary-foreground", className)} {...props} />
}

export { Tile, TileTitle, TileDivider, TileCaption }
