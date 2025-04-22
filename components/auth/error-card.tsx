import { AlertCircle } from "lucide-react"
import { CardWrapper } from "./card-wrapper"

export default function ErrorCard() {
  return (
    <CardWrapper
      icon={<AlertCircle className="h-14 w-14 text-destructive" />}
      headerLabel="Authentication Error"
      headerDescription="We encountered an issue while trying to authenticate you. This could be due to an expired session or invalid
          credentials."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonVariant={"primary"}
      className="flex items-center justify-center flex-col"
    />
  )
}
