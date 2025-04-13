"use server";
import { db } from "@/lib/db";
import { appearanceFormSchema } from "@/schemas/settings/appearance";
import { auth } from "@/auth";
import { z } from "zod";

export async function updateAppearancePreferences(
  data: z.infer<typeof appearanceFormSchema>
) {
  const validatedFields = appearanceFormSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error("Invalid input!");
  }

  const user = (await auth())?.user;

  if (!user || !user.id) {
    return { error: "User not found!" };
  }

  await db.userPreference.upsert({
    where: { userId: user.id },
    update: validatedFields.data,
    create: {
      userId: user.id,
      theme: validatedFields.data.theme || "",
      font: validatedFields.data.font || "",
    },
  });

  return { success: "Preferences updated successfully!" };
}
