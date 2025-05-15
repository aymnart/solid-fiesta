import { auth } from "@/auth"
import WebNavbar from "@/components/web/web-navbar"
import type { ReactNode } from "react"

async function WebLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <div className="max-w-5xl mx-auto">
      <WebNavbar session={session} />
      <main>{children}</main>
    </div>
  )
}

export default WebLayout
