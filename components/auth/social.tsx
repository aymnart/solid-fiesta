"use client"

import { Button } from "@/components/ui/button"
import { LOGIN_DEFAULT_REDIRECT } from "@/routes"
import { Github, Loader2Icon } from "lucide-react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState, useTransition } from "react"
import { toast } from "sonner"

/**
 * Supported authentication providers
 */
type Provider = "github" | "google"

/**
 * Social authentication component that provides login options with GitHub and Google
 *
 * @returns A React component with social login buttons
 */
export function Social() {
  // Track authentication processing state
  const [isPending, startTransition] = useTransition()
  // Track which provider is currently being processed
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null)

  /**
   * Initiates the authentication flow with the selected provider
   *
   * @param provider - The authentication provider to use ("github" or "google")
   */
  const handleLogin = async (provider: Provider) => {
    setActiveProvider(provider)

    startTransition(async () => {
      try {
        await signIn(provider, {
          callbackUrl: LOGIN_DEFAULT_REDIRECT,
        })
      } catch (error) {
        console.error(`${provider} authentication failed:`, error)
        toast.error("Authentication failed", {
          description: `Could not sign in with ${provider}. Please try again.`,
        })
      } finally {
        setActiveProvider(null)
      }
    })
  }

  /**
   * Provider configuration data for consistent rendering
   */
  const providers = [
    {
      id: "github" as Provider,
      name: "GitHub",
      icon: <Github className="mr-2" size={16} />,
    },
    {
      id: "google" as Provider,
      name: "Google",
      icon: (
        <Image
          src="/brand-icons/google.svg"
          width={16}
          height={16}
          alt="Google logo"
          className="mr-2"
        />
      ),
    },
  ]

  return (
    <div className="flex flex-col w-full gap-4">
      {providers.map(provider => (
        <Button
          key={provider.id}
          onClick={() => handleLogin(provider.id)}
          variant="outline"
          disabled={isPending}
          aria-busy={isPending && activeProvider === provider.id}
          className="w-full flex items-center justify-center"
          prefix={provider.icon}
          suffix={
            isPending && activeProvider === provider.id && <Loader2Icon className="animate-spin" />
          }
        >
          <span>
            {isPending && activeProvider === provider.id
              ? `Connecting to ${provider.name}...`
              : `Continue with ${provider.name}`}
          </span>
        </Button>
      ))}
    </div>
  )
}
