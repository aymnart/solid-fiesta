"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { type ReactNode, useMemo } from "react"

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

interface DividerProps {
  styleChildren?: boolean
  className?: string
  orientation?: Orientation
  color?: string
  children?: ReactNode
  variant?: Variant
  thickness?: ThicknessValue
}

/**
 * A versatile `Divider` component for creating horizontal or vertical dividers
 * with customizable styles, colors, thickness, and optional children content.
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
  // Determine orientation with a simpler check
  const isVertical = useMemo(() => orientation.startsWith("v"), [orientation])

  // Convert thickness to string format
  const thicknessValue = typeof thickness === "number" ? `${thickness}px` : thickness

  // Generate divider line styles based on variant
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
    <div
      aria-hidden={!children}
      aria-label={`${variant} divider`}
      aria-orientation={isVertical ? "vertical" : "horizontal"}
      className={cn(
        "m-2 flex items-center justify-center",
        isVertical ? "h-full flex-col" : "w-full flex-row",
        className,
        { ...props },
      )}
      style={{
        ...(isVertical
          ? { width: `calc(${thicknessValue} + 8px)` }
          : { height: `calc(${thicknessValue} + 8px)` }),
      }}
    >
      <span style={getLineStyle()} />

      {children && (
        <div
          className={cn(
            "flex items-center justify-center p-1.5 rounded-full gap-1 ",
            isVertical && "flex-col",
          )}
          style={styleChildren ? { color } : undefined}
        >
          {children}
        </div>
      )}

      <span style={getLineStyle(true)} />
    </div>
  )
}

export default Divider
