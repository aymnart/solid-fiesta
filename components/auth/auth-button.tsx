"use client"
import { useRouter } from "next/navigation"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { cn } from "@/lib/utils"

interface AuthButtonProps {
  children?: React.ReactNode
  type: "login" | "register"
  mode?: "modal" | "redirect"
  asChild?: boolean
  className?: string
  variant?: ButtonProps["variant"]
}

export const AuthButton = ({
  children,
  mode = "redirect",
  type,
  className,
  variant = "primary",
}: AuthButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push(`/auth/${type}`)
  }

  return mode === "modal" ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn("capitalize w-[39%]", className)}
          variant={variant}
          size={"default"}
          tabIndex={0}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="grid place-items-center">
        <DialogTitle />
        {type === "login" ? <LoginForm /> : <RegisterForm />}
      </DialogContent>
    </Dialog>
  ) : (
    <Button
      className={cn("capitalize", className)}
      variant={variant}
      size={"default"}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
      tabIndex={0}
    >
      {children}
    </Button>
  )
}
