import { ResetForm } from "@/components/auth/reset-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Securely reset your password to regain access to your account.",
}

export default function ResetPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ResetForm />
    </div>
  )
}
