"use server"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

const NewVerification = async (token: string) => {
  //check if the token exists
  const existingToken = await getVerificationTokenByToken(token, {
    expires: true,
    email: true,
    id: true,
  })

  if (!existingToken) {
    return { error: "Token does not exist!" }
  }
  //check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token has expired!" }
  }
  //check if the user email exists
  const existingUser = await getUserByEmail(existingToken.email, {
    id: true,
    email: true,
  })

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }
  //update the emailVerified field for the user
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingUser.email,
    },
  })
  //delete the token after it has been used
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })
  return { success: "Email verified!" }
}

export default NewVerification
