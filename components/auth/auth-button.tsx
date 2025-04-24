"use client"
import { LoginForm } from "@components/auth/login-form"
import { RegisterForm } from "@components/auth/register-form"
import { Button, type ButtonProps } from "@components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { useNavigation } from "@hooks/useNavigation"
import type { Session } from "next-auth"
import Image from "next/image"
import type { ReactNode } from "react"

interface AuthButtonProps extends ButtonProps {
  children?: ReactNode
  authType: "login" | "register"
  mode?: "modal" | "redirect"
  session?: Session | null
}

export const AuthButton = ({
  session,
  children,
  authType,
  mode = "redirect",
  className,
  variant = "primary",
  size,
  hover = true,
  focus = true,
}: AuthButtonProps) => {
  const { navigateTo, handleKeyboardNavigation } = useNavigation()

  return mode === "modal" ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={className}
          variant={variant}
          size={size}
          tabIndex={0}
          hover={hover}
          focus={focus}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="grid place-items-center">
        <DialogTitle />
        {authType === "login" ? <LoginForm /> : <RegisterForm />}
      </DialogContent>
    </Dialog>
  ) : (
    <Button
      hover={hover}
      focus={focus}
      className={className}
      variant={variant}
      size={size}
      onClick={() => navigateTo(`/auth/${authType}`)}
      onKeyDown={handleKeyboardNavigation(`/auth/${authType}`)}
      tabIndex={0}
      prefix={
        session?.user.image && (
          <Image
            src={session?.user.image}
            alt="User Image"
            width={20}
            height={20}
            className="rounded-full"
          />
        )
      }
    >
      {children}
      {!session?.user.image && session?.user.name && ` (${session?.user.name})`}
    </Button>
  )
}
