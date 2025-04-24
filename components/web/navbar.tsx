"use client"
import { AuthButton } from "@components/auth/auth-button"
import { Button } from "@components/ui/button"
import { cn } from "@lib/utils"
import { LogInIcon, Menu, X } from "lucide-react"
import type { Session } from "next-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname()
  const menuItems = [
    { name: "Categories", href: "/categories", isActive: pathname === "/categories" },
    { name: "About", href: "/about", isActive: pathname === "/about" },
  ]
  const [menuState, setMenuState] = useState(false)
  return (
    <header className="w-full fixed top-0 left-0 z-20">
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent"
      >
        <div className="m-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <LogInIcon />
              </Link>

              <Button
                variant="ghost"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-8 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-8 -rotate-180 scale-0 opacity-0 duration-200" />
              </Button>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:pr-4">
                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-muted-foreground hover:text-accent-foreground block duration-150",
                          item.isActive && "text-accent-foreground",
                        )}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full gap-3 lg:border-l lg:pl-6">
                <AuthButton
                  size="sm"
                  variant="primary"
                  session={session}
                  mode={session ? "redirect" : "modal"}
                  authType="login"
                  className="w-2/4 lg:w-fit"
                >
                  Sign in
                </AuthButton>
                {!session && (
                  <AuthButton
                    size="sm"
                    variant="secondary"
                    mode="redirect"
                    authType="register"
                    className="w-2/4"
                  >
                    Sign up
                  </AuthButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
