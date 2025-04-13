"use server"
import { db } from "@/lib/db"
import type { Prisma } from "@prisma/client"

/**
 * Gets a verification token by email with optimized performance
 * @param email The user's email
 * @param select Optional object specifying which fields to return
 * @returns The verification token or null if not found
 */
export const getVerificationTokenByEmail = async <T extends Prisma.VerificationTokenSelect>(
  email: string,
  select?: T,
): Promise<Prisma.VerificationTokenGetPayload<{ select: T }> | null> => {
  if (!email) {
    return null
  }

  try {
    return await db.verificationToken.findFirst({
      where: { email },
      select: select as T, // Explicitly cast select to T
    })
  } catch (error) {
    console.error("Error fetching verification token by email:", error)
    return null
  }
}

/**
 * Gets a verification token by token string with optimized performance
 * @param token The token string
 * @param select Optional object specifying which fields to return
 * @returns The verification token or null if not found
 */
export const getVerificationTokenByToken = async <T extends Prisma.VerificationTokenSelect>(
  token: string,
  select?: T,
): Promise<Prisma.VerificationTokenGetPayload<{ select: T }> | null> => {
  if (!token) {
    return null
  }

  try {
    return await db.verificationToken.findUnique({
      where: { token },
      select: select as T, // Explicitly cast select to T
    })
  } catch (error) {
    console.error("Error fetching verification token by token:", error)
    return null
  }
}
