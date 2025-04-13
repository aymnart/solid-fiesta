"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * Gets a user by email with optimized performance
 * @param email The user's email
 * @param select Optional object specifying which fields to return
 * @returns The user or null if not found
 */
export const getUserByEmail = async <T extends Prisma.UserSelect>(
  email: string,
  select?: T
): Promise<Prisma.UserGetPayload<{ select: T }> | null> => {
  if (!email) {
    return null;
  }

  try {
    return await db.user.findUnique({
      where: { email },
      select: select as T, // Explicitly cast select to T
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

/**
 * Gets a user by ID with optimized performance
 * @param id The user's ID
 * @param select Optional object specifying which fields to return
 * @returns The user or null if not found
 */
export const getUserById = async <T extends Prisma.UserSelect>(
  id: string,
  select?: T
): Promise<Prisma.UserGetPayload<{ select: T }> | null> => {
  if (!id) {
    return null;
  }

  try {
    return await db.user.findUnique({
      where: { id },
      select: select as T, // Explicitly cast select to T
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

/**
 * Gets the two-factor status for a user by ID
 * @param id The user's ID
 * @returns Boolean indicating if 2FA is enabled, or false if error/not found
 */
export const getIsTwoFactorEnabledById = async (
  id: string
): Promise<boolean> => {
  if (!id) {
    return false;
  }

  try {
    const user = await getUserById(id, { isTwoFactorEnabled: true });
    return user?.isTwoFactorEnabled ?? false;
  } catch (error) {
    console.error("Error fetching 2FA status:", error);
    return false;
  }
};
