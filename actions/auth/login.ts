"use server"
import { signIn } from "@/auth"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/emails/email-verification"
import { sendTwoFactorTokenEmail } from "@/emails/two-factor"
import { db } from "@/lib/db"
import { type AuthErrorType, authErrorMessages } from "@/lib/error-messages"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { LOGIN_DEFAULT_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas/auth/login"
import { twoFactorConfirmationExpiry } from "@/tokens.config"
import { AuthError } from "next-auth"
import type * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: "Validation error",
      details: validatedFields.error.flatten(),
    }
  }

  const { email, password, code } = validatedFields.data
  const existingUser = await getUserByEmail(email, {
    id: true,
    name: true,
    emailVerified: true,
    email: true,
    isTwoFactorEnabled: true,
  })

  if (!existingUser) {
    return { error: "Invalid email or password!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(existingUser.name, email, verificationToken.token)
    return { success: "Confirmation email sent!" }
  }

  // Handle 2FA flow if enabled
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    // Check if user already has a valid 2FA confirmation
    const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id, {
      id: true,
    })

    // If there's already a valid confirmation, proceed with login without requiring a new code
    if (existingConfirmation) {
      try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: LOGIN_DEFAULT_REDIRECT,
        })
        return { success: "Login successful!" }
      } catch (error) {
        if (error instanceof AuthError) {
          const errorMsg =
            authErrorMessages[error.type as AuthErrorType] || authErrorMessages.Default
          return { error: errorMsg }
        }
        throw error
      }
    }

    // Handle code verification if provided
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email, {
        token: true,
        expires: true,
        id: true,
      })

      if (!twoFactorToken) {
        return { error: "Invalid code!" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) {
        return { error: "Code expired!" }
      }

      // Clean up the used token
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      })

      // Create new 2FA confirmation
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
          // Add expiration for better security
          expires: twoFactorConfirmationExpiry,
        },
      })

      // Continue with login after successful 2FA
      try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: LOGIN_DEFAULT_REDIRECT,
        })
        return { success: "Login successful!" }
      } catch (error) {
        if (error instanceof AuthError) {
          const errorMsg =
            authErrorMessages[error.type as AuthErrorType] || authErrorMessages.Default
          return { error: errorMsg }
        }
        throw error
      }
    } else {
      // No code provided, generate and send a new 2FA token
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(existingUser.name, twoFactorToken.email, twoFactorToken.token)
      return { twoFactor: true }
    }
  }

  // Standard login for users without 2FA
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_DEFAULT_REDIRECT,
    })
    return { success: "Login successful!" }
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMsg = authErrorMessages[error.type as AuthErrorType] || authErrorMessages.Default
      return { error: errorMsg }
    }
    throw error
  }
}
