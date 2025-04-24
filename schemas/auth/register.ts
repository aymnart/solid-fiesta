import { z } from "zod"

export const RegisterSchema = z
  .object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
    confirmPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
    name: z
      .string()
      .nonempty("Name is required!")
      .min(2, { message: "Name must be at least 2 characters long!" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
