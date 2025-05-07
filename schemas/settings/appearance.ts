import { type Font, fontsList } from "@/font.config"
import { type Theme, themes } from "@/themes.config"
import { z } from "zod"

export const appearanceFormSchema = z.object({
  theme: z
    .enum(themes as unknown as [Theme, ...Theme[]], {
      invalid_type_error: "Select a theme",
      required_error: "Please select a theme.",
    })
    .optional(),
  font: z
    .enum(fontsList as [Font, ...Font[]], {
      invalid_type_error: "Select a font",
      required_error: "Please select a font.",
    })
    .optional(),
})

export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
