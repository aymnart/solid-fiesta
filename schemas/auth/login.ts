import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Minimum 6 characters required!" }),
  code: z.optional(z.string()),
});
