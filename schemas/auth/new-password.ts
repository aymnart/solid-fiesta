import * as z from "zod";

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
    confirmPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
