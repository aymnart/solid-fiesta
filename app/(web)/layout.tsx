import { auth } from "@/auth"
import Navbar from "@/components/web/navbar"
import type { ReactNode } from "react"

async function WebLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <>
      <Navbar session={session} />
      <main>{children}</main>
    </>
  )
}

export default WebLayout
