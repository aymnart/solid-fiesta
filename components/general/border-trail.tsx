"use client"

import { cn } from "@/lib/utils"
import { type Transition, motion } from "motion/react"
import type { CSSProperties } from "react"

type BorderTrailProps = {
  className?: string
  size?: number
  transition?: Transition
  delay?: number
  onAnimationComplete?: () => void
  style?: CSSProperties
  color?: string
  gradient?: boolean
}

/**
 * Renders an animated border trail effect using a moving, glowing element along the border of its parent.
 *
 * The `BorderTrail` component is designed to visually enhance UI elements by animating a glowing trail
 * around their borders. It supports both solid color and gradient glow effects, customizable size, color,
 * animation timing, and additional styling.
 *
 * @param className - Additional CSS classes to apply to the animated trail element.
 * @param size - The diameter (in pixels) of the animated trail. Defaults to `60`.
 * @param transition - Custom animation transition settings. If not provided, a default infinite linear animation is used.
 * @param delay - Optional delay (in seconds) before the animation starts.
 * @param onAnimationComplete - Callback function invoked when the animation completes a cycle.
 * @param style - Inline styles to apply to the animated trail element.
 * @param color - The color of the trail. Defaults to `"rgb(161 161 170)"` (zinc-500).
 * @param gradient - If `true`, applies a glowing gradient effect to the trail. Defaults to `false`.
 *
 * @example
 * ```tsx
 * <BorderTrail size={80} color="#00f" gradient />
 * ```
 *
 * @remarks
 * - The component uses absolute positioning and expects to be placed inside a relatively positioned container.
 * - The trail animates along the border using CSS `offsetPath` and `offsetDistance`.
 * - Requires Framer Motion and a utility function `cn` for class name concatenation.
 */
export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
  color = "rgb(161 161 170)", // Default to zinc-500 color
  gradient = false,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Number.POSITIVE_INFINITY,
    duration: 5,
    ease: "linear",
  }

  // Generate styles based on if gradient is enabled
  const trailStyles = gradient
    ? {
        boxShadow: `0px 0px 60px 30px ${color}, 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)`,
      }
    : {}

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          backgroundColor: color,
          ...trailStyles,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  )
}
