import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import type { ComponentProps } from "react"

/**
 * Props for the Logo component.
 * - Inherits anchor (`<a>`) and image (`<img>`) props.
 * - `width` and `height` control the logo image size.
 */
type LogoProps = Omit<ComponentProps<typeof Link>, "href"> &
  Omit<ComponentProps<typeof Image>, "src" | "alt" | "width" | "height"> & {
    /** Width of the logo image (default: 85) */
    width?: number
    /** Height of the logo image (default: 10) */
    height?: number
    /** Additional class names for the link wrapper */
    className?: string
    /** */
    type?: "word" | "letter"
  }

/**
 * Renders the application logo as a clickable link to the homepage.
 * Uses Next.js Image for optimized loading.
 */
function Logo({ width = 85, height = 10, className, type = "word", ...props }: LogoProps) {
  return (
    <Link href="/" aria-label="home" className={cn("block size-fit", className)} {...props}>
      <Image
        src={type === "word" ? "/road3.png" : "/road3_icon.png"}
        alt="logo"
        width={width}
        height={height}
        priority
        draggable={false}
        style={{ objectFit: "contain" }}
      />
    </Link>
  )
}

export default Logo
