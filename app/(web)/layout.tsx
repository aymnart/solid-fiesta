import { auth } from "@/auth"
import Navbar from "@/components/web/navbar"
import type { ReactNode } from "react"

async function WebLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <div className="max-w-5xl mx-auto">
      <Navbar session={session} />
      <main>{children}</main>
    </div>
  )
}

export default WebLayout
