import authConfig from "@/auth.config"
import NextAuth from "next-auth"

import { LOGIN_DEFAULT_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn: boolean = !!req.auth
  const isApiAuthRoute: boolean = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_DEFAULT_REDIRECT, nextUrl))
    }
    return
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }
  return
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
