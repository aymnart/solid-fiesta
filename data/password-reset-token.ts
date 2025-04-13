import { db } from "@/lib/db"
import type { Prisma } from "@prisma/client"

export const getPasswordResetTokenByToken = async <T extends Prisma.PasswordResetTokenSelect>(
  token: string,
  select?: T,
): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
  if (!token) {
    console.warn("Missing token for password reset token lookup!")
    return null
  }
  try {
    return await db.passwordResetToken.findUnique({
      where: { token },
      select: select as T,
    })
  } catch (error) {
    console.error("Failed fetching password reset token by token:", {
      token,
      error,
    })
    return null
  }
}

///////////////////////////////////////////////////////////////////////////

export const getPasswordResetTokenByEmail = async <T extends Prisma.PasswordResetTokenSelect>(
  email: string,
  select?: T,
): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
  if (!email) {
    console.warn("Missing email for password reset token lookup!")
    return null
  }
  try {
    return await db.passwordResetToken.findFirst({
      where: { email },
      select: select as T,
    })
  } catch (error) {
    console.error("Failed fetching password reset token by email:", {
      email,
      error,
    })
    return null
  }
}
