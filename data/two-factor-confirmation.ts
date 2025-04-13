"use server"

import { db } from "@/lib/db"
import type { Prisma } from "@prisma/client"

/**
 * Retrieves the two-factor confirmation details for a user by their ID.
 * @param userId - The user's ID.
 * @param select - Optional object specifying which fields to return.
 * @returns The two-factor confirmation details or null if not found.
 */
export const getTwoFactorConfirmationByUserId = async <
  T extends Prisma.TwoFactorConfirmationSelect,
>(
  userId: string,
  select?: T,
): Promise<Prisma.TwoFactorConfirmationGetPayload<{ select: T }> | null> => {
  if (!userId) {
    console.warn("User ID is required but was not provided.")
    return null
  }

  try {
    return await db.twoFactorConfirmation.findUnique({
      where: { userId },
      select: select as T,
    })
  } catch (error) {
    console.error("Failed to fetch two-factor confirmation by user ID:", {
      userId,
      error,
    })
    return null
  }
}
