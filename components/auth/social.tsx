"use client"
import { Button } from "@/components/ui/button"
import { LOGIN_DEFAULT_REDIRECT } from "@/routes"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useTransition } from "react"
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
          isPending={isPending}
          prefix={<Github size={16} />}
        >
          Github login
        </Button>
        <Button
          onClick={() => {
            onClick("google")
          }}
          variant="outline"
          className="w-full"
          isPending={isPending}
          prefix={
            <Image src="/brand-icons/google.svg" width={16} height={16} alt={"google logo"} />
          }
        >
          Google login
        </Button>
      </div>
      <Divider color="hsl(var(--border))">
        <span className="w-max text-sm text-muted-foreground">Or continue with</span>
      </Divider>
    </div>
  )
}
