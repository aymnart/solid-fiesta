"use client"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { LoginForm } from "./login-form"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({ children, mode = "redirect" }: LoginButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push("/auth/login")
  }
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <span>{children}</span>
        </DialogTrigger>
        <DialogContent className="grid place-items-center">
          <DialogTitle />
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Button
      className="capitalize"
      variant={"default"}
      size={"lg"}
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
