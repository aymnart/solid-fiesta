import Navbar from "@/components/navigation/navbar"
import { SessionProvider } from "next-auth/react"
import type React from "react"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <main>
        <Navbar />
        <section className="mt-20 md:mt-0">{children}</section>
      </main>
    </SessionProvider>
  )
}
