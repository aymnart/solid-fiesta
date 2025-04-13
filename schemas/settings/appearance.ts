import * as z from "zod";
import { Font, fontsList } from "@/font.config";
import { Theme, themes } from "@/themes.config";

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
});
