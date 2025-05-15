import {
  Atkinson_Hyperlegible,
  Fira_Code,
  IBM_Plex_Mono,
  Inter,
  Merriweather,
  Outfit,
  Poppins,
  Space_Grotesk,
} from "next/font/google"

export const inter = Inter({ subsets: ["latin"], weight: ["400"] })
export const poppins = Poppins({ subsets: ["latin"], weight: ["400"] })
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
})
export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
})
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
})
export const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400"],
})
export const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400"] })

export const outfit = Outfit({ subsets: ["latin"], weight: ["400"] })

export type Font = keyof typeof fontMap

export const fontMap = {
  Inter: inter.className,
  Poppins: poppins.className,
  IBMPlexMono: ibmPlexMono.className,
  Merriweather: merriweather.className,
  SpaceGrotesk: spaceGrotesk.className,
  AtkinsonHyperlegible: atkinsonHyperlegible.className,
  FiraCode: firaCode.className,
  Outfit: outfit.className,
}

/**
 * Determines if the given value is a valid font type.
 *
 * This type guard checks whether the provided `font` is a string
 * and exists as a key in the `fontMap` object. If both conditions
 * are met, the function asserts that the value is of type `Font`.
 *
 * @param font - The value to check, which can be of any type.
 * @returns A boolean indicating whether the value is a valid font type.
 */
export const isFontType = (font: unknown): font is Font => {
  return typeof font === "string" && font in fontMap
}

export const fontsList: Font[] = Object.keys(fontMap) as Font[]
export const defaultFont: Font = "Outfit"
