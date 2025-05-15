//add themes variables in css/themes.css
export const themes = [
  "light",
  "dark",
  "graphite",
  "lavender-dusk",
  "tangerine",
  "perpetuity",
] as const

export type Theme = (typeof themes)[number]

export const defaultTheme: Theme = "dark"

/**
 * Determines if the provided value is a valid theme type.
 *
 * This type guard checks if the given `theme` is a string and exists
 * within the predefined list of themes. If the conditions are met,
 * it narrows the type of `theme` to `Theme`.
 *
 * @param theme - The value to check, which can be of any type.
 * @returns A boolean indicating whether the value is a valid `Theme`.
 */
export const isThemeType = (theme: unknown): theme is Theme => {
  return typeof theme === "string" && themes.includes(theme as Theme)
}
