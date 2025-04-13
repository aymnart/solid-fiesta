import { db } from "@/lib/db"
import type { Prisma } from "@prisma/client"

export const getTwoFactorTokenByEmail = async <T extends Prisma.TwoFactorTokenSelect>(
  email: string,
  select?: T,
): Promise<Prisma.TwoFactorTokenGetPayload<{ select: T }> | null> => {
  if (!email) {
    return null
  }
  try {
    return await db.twoFactorToken.findFirst({
      where: { email },
      select: select as T,
    })
  } catch (error) {
    console.error("Error fetching two factor token by email:", error)
    return null
  }
}
