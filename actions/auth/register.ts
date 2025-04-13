"use server"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/emails/email-verification"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { RegisterSchema } from "@/schemas/auth/register"
import bcrypt from "bcryptjs"
import type * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  const saltRounds = 10
  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  //get email, password and name from validated fields
  const { email, password, name } = validatedFields.data

  //generate salt and hash password
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  //check if email already exists
  const existingUser = await getUserByEmail(email, { email: true })
  if (existingUser) {
    return { error: "Email already in use!" }
  }

  //create a user if email does'nt exist
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })
  //generate verification token
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(name, email, verificationToken.token)

  return {
    success: "Confirmation Email sent!",
  }
}
