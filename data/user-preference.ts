"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * Gets user preferences by id with optimized performance
 * @param userId The user's id
 * @param select Optional object specifying which fields to return
 * @returns The userPreferences or null if not found
 */
export const getUserPreferenceById = async <
  T extends Prisma.UserPreferenceSelect
>(
  userId: string,
  select?: T
): Promise<Prisma.UserPreferenceGetPayload<{ select: T }> | null> => {
  if (!userId) {
    return null;
  }

  try {
    return await db.userPreference.findFirst({
      where: {
        userId,
      },
      select: select as T,
    });
  } catch (error) {
    console.error("Error fetching user preferences by id:", error);
    return null;
  }
};
