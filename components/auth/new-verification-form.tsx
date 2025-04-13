"use client"
import "@/css/beat-loader.css"
import NewVerification from "@/actions/auth/new-verification"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { MailCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useCallback } from "react"
import FormError from "../general/form-error"
import FormSuccess from "../general/form-success"

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
    <CardWrapper
      icon={<MailCheck size={36} />}
      headerLabel="Confirming your verification"
      headerDescription="We're verifying your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      backButtonVariant={"default"}
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <div className="loader" />}
        <FormSuccess className="w-fit" message={success} />
        <FormError className="w-fit" message={error} />
      </div>
    </CardWrapper>
  )
}
