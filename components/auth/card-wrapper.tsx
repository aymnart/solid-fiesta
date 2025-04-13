"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "@/components/auth/social";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonVariant?:
    | "link"
    | "default"
    | "success"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  showSocial?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  backButtonHref,
  backButtonLabel,
  backButtonVariant = "link",
  showSocial,
  icon,
  className,
}: CardWrapperProps) {
  return (
    <Card
      className={cn(
        "w-96 grid justify-center items-center border-none shadow-none",
        className
      )}
    >
      <CardHeader className="text-center">
        {icon && <div className="mb-2 mx-auto">{icon}</div>}
        <CardTitle className="text-2xl font-bold text-balance text-foreground">
          {headerLabel}
        </CardTitle>
        {headerDescription && (
          <CardDescription>{headerDescription}</CardDescription>
        )}
      </CardHeader>
      {showSocial && (
        <CardContent className="pb-0">
          <Social />
        </CardContent>
      )}
      {children && <CardContent>{children}</CardContent>}

      <CardFooter>
        {/* back button */}
        <Button
          variant={backButtonVariant}
          className="w-full font-normal"
          size={"sm"}
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
