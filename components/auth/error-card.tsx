import { AlertCircle } from "lucide-react"
import { AuthCard } from "./auth-card"

export default function AuthErrorCard() {
  return (
    <AuthCard
      icon={<AlertCircle className="size-14 text-destructive" />}
      headerLabel="Authentication Error"
      headerDescription="We encountered an issue while trying to authenticate you. This could be due to an expired session or invalid
          credentials."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonVariant="primary"
      className="flex items-center justify-center flex-col"
    />
  )
}
