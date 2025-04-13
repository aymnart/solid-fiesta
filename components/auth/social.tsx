"use client"
import { Button } from "@/components/ui/button"
import { LOGIN_DEFAULT_REDIRECT } from "@/routes"
import { Github, Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import React, { useTransition } from "react"
import Divider from "../ui/divider"

export function Social() {
  const [isPending, startTransition] = useTransition()

  const onClick = (provider: "github" | "google") => {
    startTransition(() => {
      signIn(provider, {
        callbackUrl: LOGIN_DEFAULT_REDIRECT,
      })
    })
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          onClick={() => {
            onClick("github")
          }}
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Github />
              Github Login
            </div>
          )}
        </Button>
        <Button
          onClick={() => {
            onClick("google")
          }}
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Image src="/google.svg" width={16} height={16} alt={"google logo"} />
              Google Login
            </div>
          )}
        </Button>
      </div>
      <Divider color="hsl(var(--border))">
        <span className="w-max text-sm text-muted-foreground">Or continue with</span>
      </Divider>
    </div>
  )
}
