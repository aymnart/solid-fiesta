import ErrorCard from "@/components/auth/error-card"
import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Authentication Error",
  description: "An error occurred during the authentication process. Please try again.",
}

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-lg">
      <ErrorCard />
    </div>
  )
}
