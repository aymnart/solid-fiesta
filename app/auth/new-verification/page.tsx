import NewVerificationForm from "@/components/auth/new-verification-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Verification",
  description: "Verify your account to complete the authentication process.",
}

export default function NewVerificationPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <NewVerificationForm />
    </div>
  )
}
