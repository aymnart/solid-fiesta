"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { securityFormSchema } from "@/schemas/settings/security";
import z from "zod";

export const updateSecuritySettings = async (
  data: z.infer<typeof securityFormSchema>
) => {
  const user = (await auth())?.user;
  if (!user || !user.id) {
    return { error: "User not found!" };
  }

  const validatedFields = securityFormSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid");
  }

  if (validatedFields.data.two_factor === false) {
    try {
      await db.twoFactorConfirmation.delete({
        where: { userId: user.id },
      });
    } catch (error) {
      console.warn(
        "Two-factor confirmation record not found or already deleted:",
        error
      );
    }
    await db.user.update({
      where: { id: user.id },
      data: { isTwoFactorEnabled: false },
    });
  } else {
    await db.user.update({
      where: { id: user.id },
      data: { isTwoFactorEnabled: validatedFields.data.two_factor },
    });
  }

  return { success: "Security settings updated successfully!" };
};
