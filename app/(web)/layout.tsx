import { auth } from "@/auth"
import WebNavbar from "@/components/web/web-navbar"
import type { ReactNode } from "react"

async function WebLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <div className="max-w-screen overflow-x-hidden">
      <WebNavbar session={session} />
      <main className="max-w-[61%] mx-auto border-x bg-background">{children}</main>
    </div>
  )
}

export default WebLayout
