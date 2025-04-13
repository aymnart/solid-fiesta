"use server";

import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { getUserPreferenceById } from "@/data/user-preference";
import { auth } from "@/auth";
import { defaultFont, isFontType } from "@/font.config";
import { defaultTheme, isThemeType } from "@/themes.config";

export default async function SettingsAppearancePage() {
  const userId = (await auth())?.user?.id;

  if (!userId) {
    return <p>You need to be logged in to edit preferences.</p>;
  }

  const userPreference = await getUserPreferenceById(userId, {
    theme: true,
    font: true,
  });
  const theme = isThemeType(userPreference?.theme)
    ? userPreference?.theme
    : defaultTheme;
  const font = isFontType(userPreference?.font)
    ? userPreference?.font
    : defaultFont;

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm theme={theme} font={font} />
    </section>
  );
}
