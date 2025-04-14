"use server"

import type { Font } from "@/font.config"
import { defaultFont, isFontType } from "@/font.config"
import { db } from "@/lib/db"
import type { Theme } from "@/themes.config"
import { defaultTheme, isThemeType } from "@/themes.config"
import type { Prisma } from "@prisma/client"

/**
 * Retrieves user preferences by user ID with optimized performance.
 * Falls back to default values if preferences are not found or invalid.
 * @param userId - The unique identifier of the user.
 * @param select - Optional selection object specifying fields to return.
 * @returns An object containing the user's theme and font preferences.
 */
export const getUserPreferenceById = async <T extends Prisma.UserPreferenceSelect>(
  userId: string | undefined,
  select?: T,
): Promise<{ theme: Theme; font: Font }> => {
  if (!userId) {
    return { theme: defaultTheme, font: defaultFont }
  }

  try {
    const prefs: Partial<{ theme: Theme; font: Font } | null> = await db.userPreference.findFirst({
      where: {
        userId,
      },
      select: select as T,
    })

    return {
      theme: isThemeType(prefs?.theme) ? prefs.theme : defaultTheme,
      font: isFontType(prefs?.font) ? prefs.font : defaultFont,
    }
  } catch (error) {
    console.error("Error fetching user preferences by id:", error)
    return { theme: defaultTheme, font: defaultFont }
  }
}
