"use server"

import { auth } from "@/auth"
import { AppearanceForm } from "@/components/settings/appearance-form"
import { Separator } from "@/components/ui/separator"
import { getUserPreferenceById } from "@/data/user-preference"

export default async function SettingsAppearancePage() {
  const userId = (await auth())?.user?.id

  if (!userId) {
    return <p>You need to be logged in to edit preferences.</p>
  }

  const { theme, font } = await getUserPreferenceById(userId, {
    theme: true,
    font: true,
  })

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm theme={theme} font={font} />
    </section>
  )
}
