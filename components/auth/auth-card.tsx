"use client"
import { Social } from "@/components/auth/social"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Divider from "@/components/ui/divider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type React from "react"

interface AuthCardProps {
  children?: React.ReactNode
  headerLabel: string
  headerDescription?: string
  backButtonLabel: string
  backButtonHref: string
  backButtonVariant?: ButtonProps["variant"]
  showSocial?: boolean
  icon?: React.ReactNode
  className?: string
}

/**
 * A reusable authentication card component that provides a structured layout
 * for authentication-related content, such as headers, descriptions, social login options,
 * and a customizable back button.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the card.
 * @param {string} headerLabel - The main title of the card.
 * @param {string} [headerDescription] - An optional description displayed below the header label.
 * @param {string} backButtonHref - The URL or path for the back button link.
 * @param {string} backButtonLabel - The label text for the back button.
 * @param {"link" | "button"} [backButtonVariant="link"] - The variant style of the back button.
 * @param {boolean} [showSocial=false] - Whether to display social login options.
 * @param {React.ReactNode} [icon] - An optional icon to display above the header label.
 * @param {string} [className] - Additional CSS classes to apply to the card.
 *
 * @returns {JSX.Element} The rendered authentication card component.
 */
export function AuthCard({
  children,
  headerLabel,
  headerDescription,
  backButtonHref,
  backButtonLabel,
  backButtonVariant = "link",
  showSocial = false,
  icon,
  className,
}: AuthCardProps) {
  return (
    <Card
      className={cn("w-sm *:w-full grid place-items-center border-none shadow-none", className)}
    >
      <CardHeader className="text-center">
        {icon && <div className="mb-2 mx-auto">{icon}</div>}
        <CardTitle className="text-2xl font-bold text-balance text-foreground">
          {headerLabel}
        </CardTitle>
        {headerDescription && <CardDescription>{headerDescription}</CardDescription>}
      </CardHeader>
      {showSocial && (
        <CardContent className="pb-0 flex flex-col items-center gap-5">
          <Social />
          <Divider color="hsl(var(--border))">
            <span className="w-max text-sm text-muted-foreground">Or continue with</span>
          </Divider>
        </CardContent>
      )}
      {children && <CardContent>{children}</CardContent>}

      <CardFooter>
        {/* back button */}
        <Button
          variant={backButtonVariant}
          hover={false}
          className="w-full font-normal"
          size={"sm"}
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
