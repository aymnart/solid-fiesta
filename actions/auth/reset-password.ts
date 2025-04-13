"use server";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas/auth/reset-password";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/emails/password-reset";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email, { email: true });
  if (!existingUser) {
    return { error: "Email not found!" };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Password reset email has been sent successfully!" };
};
