"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

import { updateAppearancePreferences } from "@/actions/settings/preferences"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fontMap, fontsList } from "@/font.config"
import { useCurrentUser } from "@/hooks/use-current-user"
import { appearanceFormSchema } from "@/schemas/settings/appearance"
import type { Theme } from "@/themes.config"
import ModeSkeleton from "./mode-skeleton"

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const themes: Theme[] = [
  "light",
  "modern-sage",
  "lavender-dusk",
  "dark",
  "moonlit",
  "obsidian-dark",
]
export function AppearanceForm({ theme, font }: AppearanceFormValues) {
  const [isPending, startTransition] = useTransition()
  const user = useCurrentUser()
  const [defaultValues, setDefaultValues] = useState<AppearanceFormValues | undefined>(undefined)

  // set user preferences when component mounts
  useEffect(() => {
    if (user?.id) {
      setDefaultValues({
        theme: theme,
        font: font,
      })
    }
  }, [user?.id, theme, font])

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultValues,
  })

  // Prevent rendering until default values are set (fixes hydration issue)
  if (!defaultValues) {
    return (
      <p className="flex items-center">
        <Loader className="animate-spin h-4 w-4 mr-4" />
        Loading preferences...
      </p>
    )
  }

  function onSubmit(data: AppearanceFormValues) {
    startTransition(async () => {
      try {
        toast.promise(updateAppearancePreferences(data), {
          loading: "Updating preferences...",
          success: "Preferences updated!",
          error: "Error updating preferences!",
        })
        //reload the window so the user see the changes
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch {
        toast.error("Error updating preferences!", {
          description: "Check your connexion and try again.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        {/* Font Selection */}
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={defaultValues.font}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>

                    <SelectContent>
                      {fontsList.map((font, index) => (
                        <SelectItem value={font} key={index}>
                          <span className={fontMap[font]}>{font}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormDescription>Set the font you want to use in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Theme Selection */}
        <FormField
          control={form.control}
          defaultValue={defaultValues.theme}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the dashboard.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex-wrap flex gap-y-12 pt-4 max-w-lg lg:max-w-full"
              >
                {themes.map(theme => (
                  <FormItem key={theme} className="flex-1 grow">
                    <FormLabel className="cursor-pointer flex flex-col items-start flex-1 space-x-2">
                      <ModeSkeleton
                        mode={theme}
                        selected={field.value === theme}
                        className={"transition-transform transform"}
                      />
                      <FormControl>
                        <RadioGroupItem disabled={isPending} value={theme} className="sr-only" />
                      </FormControl>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button isPending={isPending} type="submit">
          {isPending ? "Updating preferences" : "Update Preferences"}
        </Button>
      </form>
    </Form>
  )
}
