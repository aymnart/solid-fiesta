import Navbar from "@/components/web/navbar"
import { auth } from "@/auth"
import type React from "react"

async function WebLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <>
      <Navbar session={session} />
      <main>{children}</main>
    </>
  )
}

export default WebLayout
