import { z } from "zod"

export const securityFormSchema = z.object({
  two_factor: z.boolean().default(false).optional(),
})
