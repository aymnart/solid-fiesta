import authConfig from "@/auth.config"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

// Separate function for 2FA validation
async function validateTwoFactorAuth(userId: string): Promise<boolean> {
  try {
    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(userId, {
      expires: true,
      id: true,
    })

    if (!twoFactorConfirmation) {
      console.log(`No 2FA confirmation found for user ${userId}`)
      return false
    }

    const isExpired = twoFactorConfirmation.expires.getTime() < Date.now()

    if (isExpired) {
      // Clean up expired confirmation
      await db.twoFactorConfirmation.delete({
        where: { id: twoFactorConfirmation.id },
      })
      console.log(`Expired 2FA confirmation removed for user ${userId}`)
      return false
    }

    return true
  } catch (error) {
    console.error("Error validating 2FA:", error)
    return false
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Allow OAuth without email verification
        if (account?.provider !== "credentials") {
          return true
        }

        if (!user.id) {
          console.log("Sign-in attempted without user ID")
          return false
        }

        const existingUser = await getUserById(user.id, {
          emailVerified: true,
          isTwoFactorEnabled: true,
          id: true,
        })

        if (!existingUser) {
          console.log(`User not found: ${user.id}`)
          return false
        }

        // Prevent signIn without email verification
        if (!existingUser.emailVerified) {
          console.log(`Unverified email for user: ${user.id}`)
          return false
        }

        // Validate 2FA if enabled
        if (existingUser.isTwoFactorEnabled) {
          const is2FAValid = await validateTwoFactorAuth(existingUser.id)

          if (!is2FAValid) {
            console.log(`2FA validation failed for user: ${user.id}`)
            return false
          }
        }

        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token
      }
      const existingUser = await getUserById(token.sub)
      if (!existingUser) {
        return token
      }
      token.role = existingUser.role
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
