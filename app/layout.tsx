"use server"
import { auth } from "@/auth"
import "@/css/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getUserPreferenceById } from "@/data/user-preference"
import { type Font, defaultFont, fontMap, isFontType } from "@/font.config"
import { cn } from "@/lib/utils"
import { type Theme, defaultTheme, isThemeType } from "@/themes.config"
import { Suspense, cache } from "react"
import Loading from "./loading"

// Cache the auth result to prevent duplicate calls
const getAuthSession = cache(async () => await auth())

/**
 * Cached function to fetch user preferences with fallback to defaults
 * @param userId The user's ID
 * @returns User theme and font preferences
 */
const getUserPreferences = cache(async (userId?: string): Promise<{ theme: Theme; font: Font }> => {
  if (!userId) {
    return { theme: defaultTheme, font: defaultFont }
  }

  try {
    const prefs = await getUserPreferenceById(userId, {
      theme: true,
      font: true,
    })
    return {
      theme: isThemeType(prefs?.theme) ? prefs.theme : defaultTheme,
      font: isFontType(prefs?.font) ? prefs.font : defaultFont,
    }
  } catch (error) {
    console.error("Failed to fetch user preferences:", error, userId)
    return { theme: defaultTheme, font: defaultFont }
  }
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get session first to correctly use the userId
  const session = await getAuthSession()

  // Get user preferences with the session ID
  const { theme, font } = await getUserPreferences(session?.user?.id).catch(() => ({
    theme: defaultTheme,
    font: defaultFont,
  }))

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme} />
      </head>
      <body
        className={cn(
          fontMap[font], // font is now guaranteed to be valid
          "antialiased min-h-screen",
        )}
      >
        <Suspense fallback={<Loading />}>
          <TooltipProvider delayDuration={1}>
            {children}
            <Toaster />
          </TooltipProvider>
        </Suspense>
      </body>
    </html>
  )
}
