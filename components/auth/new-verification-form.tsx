"use client"
import "@/css/beat-loader.css"
import NewVerification from "@/actions/auth/new-verification"
import { AuthCard } from "@/components/auth/auth-card"
import FormError from "@/components/general/form-error"
import FormSuccess from "@/components/general/form-success"
import { MailCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCallback } from "react"

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!")
      return
    }
    NewVerification(token)
      .then(data => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong!")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <AuthCard
      icon={<MailCheck size={36} />}
      headerLabel="Confirming your verification"
      headerDescription="We're verifying your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      backButtonVariant="primary"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <div className="loader" />}
        {success && <FormSuccess className="w-fit" message={success} />}
        {error && <FormError className="w-fit" message={error} />}
      </div>
    </AuthCard>
  )
}
