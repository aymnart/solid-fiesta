import { db } from "@/lib/db"
import type { Prisma } from "@prisma/client"

export const getAccountById = async <T extends Prisma.AccountSelect>(
  userId: string,
  select?: T,
): Promise<Prisma.AccountGetPayload<{ select: T }> | null> => {
  if (!userId) {
    console.warn("Missing userId for account lookup!")
    return null
  }

  try {
    return await db.account.findFirst({
      where: { userId },
      select: select as T,
    })
  } catch (error) {
    console.error("Failed fetching account by userId:", {
      userId,
      error,
    })
    return null
  }
}
