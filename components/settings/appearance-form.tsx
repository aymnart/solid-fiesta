"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useTransition } from "react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { appearanceFormSchema } from "@/schemas/settings/appearance";
import { updateAppearancePreferences } from "@/actions/settings/preferences";
import { useCurrentUser } from "@/hooks/use-current-user";
import { fontMap, fontsList } from "@/font.config";
import ModeSkeleton from "./mode-skeleton";
import { Theme } from "@/themes.config";

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const themes: Theme[] = [
  "light",
  "modern-sage",
  "lavender-dusk",
  "dark",
  "moonlit",
  "obsidian-dark",
];
export function AppearanceForm({ theme, font }: AppearanceFormValues) {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const [defaultValues, setDefaultValues] =
    useState<AppearanceFormValues | null>(null);

  // Fetch user preferences when component mounts
  useEffect(() => {
    async function fetchPreferences() {
      if (user?.id) {
        setDefaultValues({
          theme: theme,
          font: font,
        });
      }
    }
    fetchPreferences();
  }, [user?.id, theme, font]);

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultValues || {},
  });

  // Prevent rendering until default values are set (fixes hydration issue)
  if (!defaultValues) {
    return (
      <p className="flex items-center">
        <Loader className="animate-spin h-4 w-4 mr-4" />
        Loading preferences...
      </p>
    );
  }

  function onSubmit(data: AppearanceFormValues) {
    startTransition(async () => {
      try {
        await updateAppearancePreferences(data);
        toast({
          title: "User preferences updated!",
          description: "Your appearance settings have been successfully saved.",
          variant: "success",
        });
        //reload the window so the user see the changes
        window.location.reload();
      } catch {
        toast({
          title: "Error updating preferences!",
          description: "Check your connexion and try again.",
          variant: "destructive",
        });
      }
    });
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
              <FormDescription>
                Set the font you want to use in the dashboard.
              </FormDescription>
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
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex-wrap flex gap-y-12 pt-4 max-w-lg lg:max-w-full"
              >
                {themes.map((theme) => (
                  <FormItem key={theme} className="flex-1 flex-grow">
                    <FormLabel className="cursor-pointer flex flex-col items-start flex-1 space-x-2">
                      <ModeSkeleton
                        mode={theme}
                        selected={field.value === theme}
                        className={`transition-transform transform`}
                      />
                      <FormControl>
                        <RadioGroupItem
                          disabled={isPending}
                          value={theme}
                          className="sr-only"
                        />
                      </FormControl>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center">
              <Loader className="animate-spin mr-2" />
              Updating preferences
            </div>
          ) : (
            "Update Preferences"
          )}
        </Button>
      </form>
    </Form>
  );
}
