import { SidebarNav } from "@/components/settings/sidebar-nav"
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and set e-mail preferences.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },

  {
    title: "Display",
    href: "/settings/display",
  },
  {
    title: "Security",
    href: "/settings/security",
  },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6 p-4 md:p-10 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:gap-16 lg:space-y-0">
        <SidebarNav items={sidebarNavItems} />
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </section>
  )
}
