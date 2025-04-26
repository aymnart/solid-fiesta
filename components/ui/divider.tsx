"use client"

import { cn } from "@/lib/utils"
import { type HTMLMotionProps, motion } from "framer-motion"
import type { ReactNode } from "react"
import { useMemo } from "react"

type Orientation = "horizontal" | "vertical" | "ver" | "hor" | "v" | "h"
type Variant = "solid" | "gradient" | "dashed" | "dotted" | "neon"
type Unit =
  | "px"
  | "em"
  | "rem"
  | "vh"
  | "vw"
  | "%"
  | "cm"
  | "mm"
  | "in"
  | "pt"
  | "pc"
  | "ex"
  | "ch"
  | "vmin"
  | "vmax"

type ThicknessValue = number | `${number}${Unit}`

interface DividerProps extends HTMLMotionProps<"div"> {
  styleChildren?: boolean
  className?: string
  orientation?: Orientation
  color?: string
  children?: ReactNode
  variant?: Variant
  thickness?: ThicknessValue
}

/**
 * A versatile `Divider` component with Framer Motion animation.
 */
const Divider = ({
  className,
  children,
  styleChildren = false,
  orientation = "horizontal",
  color = "currentColor",
  variant = "solid",
  thickness = "1px",
  ...props
}: DividerProps) => {
  const isVertical = useMemo(() => orientation.startsWith("v"), [orientation])
  const thicknessValue = typeof thickness === "number" ? `${thickness}px` : thickness

  const getLineStyle = (reverse = false): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      borderRadius: "2px",
      ...(isVertical
        ? { width: thicknessValue, height: "100%" }
        : { height: thicknessValue, width: "100%" }),
    }

    if (variant === "gradient") {
      const direction = isVertical
        ? reverse
          ? "to top"
          : "to bottom"
        : reverse
          ? "to left"
          : "to right"

      return {
        ...baseStyle,
        background: `linear-gradient(${direction}, transparent, ${color})`,
      }
    }

    if (variant === "dashed" || variant === "dotted") {
      return {
        ...baseStyle,
        background: "transparent",
        border: `${thicknessValue} ${variant} ${color}`,
      }
    }

    return {
      ...baseStyle,
      background: color,
      ...(variant === "neon" && { boxShadow: `0 0 5px ${color}` }),
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-orientation={isVertical ? "vertical" : "horizontal"}
      aria-label={`${variant} divider`}
      className={cn(
        "m-2 flex items-center justify-center",
        isVertical ? "h-full flex-col" : "w-full flex-row",
        className,
      )}
      style={{
        ...(isVertical
          ? { width: `calc(${thicknessValue} + 8px)` }
          : { height: `calc(${thicknessValue} + 8px)` }),
      }}
      {...props}
    >
      <motion.span
        initial={isVertical ? { scaleY: 0, opacity: 0 } : { scaleX: 0, opacity: 0 }}
        animate={isVertical ? { scaleY: 1, opacity: 1 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={getLineStyle()}
      />

      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className={cn(
            "flex items-center justify-center p-1.5 rounded-full gap-1",
            isVertical && "flex-col",
          )}
          style={styleChildren ? { color } : undefined}
        >
          {children}
        </motion.div>
      )}

      <motion.span
        initial={isVertical ? { scaleY: 0, opacity: 0 } : { scaleX: 0, opacity: 0 }}
        animate={isVertical ? { scaleY: 1, opacity: 1 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={getLineStyle(true)}
      />
    </motion.div>
  )
}

export default Divider
