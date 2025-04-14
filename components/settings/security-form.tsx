"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { updateSecuritySettings } from "@/actions/settings/security"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useCurrentUser } from "@/hooks/use-current-user"
import { securityFormSchema } from "@/schemas/settings/security"
import { Loader } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"

type SecurityFormValues = z.infer<typeof securityFormSchema>

type SecurityFormProps = {
  two_factor?: boolean | undefined
  provider: string | undefined
}

export function SecurityForm({ two_factor, provider }: SecurityFormProps) {
  const [isPending, startTransition] = useTransition()
  const user = useCurrentUser()
  const [defaultValues, setDefaultValues] = useState<SecurityFormValues | undefined>(undefined)

  useEffect(() => {
    async function fetchSecuritySettings() {
      if (user?.id) {
        setDefaultValues({ two_factor: two_factor })
      }
    }
    fetchSecuritySettings()
  }, [user?.id, two_factor])

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
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

  function onSubmit(data: SecurityFormValues) {
    startTransition(async () => {
      try {
        await updateSecuritySettings(data)
        toast.success("Security settings updated!", {
          description: "Your security settings have been successfully saved.",
        })
      } catch {
        toast.error("Error updating security!", {
          description: "Check your connexion and try again.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {provider === "credentials" ||
          (provider === undefined && (
            <FormField
              control={form.control}
              name="two_factor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable Two Factor Authentication for more security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      defaultChecked={defaultValues.two_factor}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center">
              <Loader className="animate-spin mr-2" />
              Updating Security
            </div>
          ) : (
            "Update Security"
          )}
        </Button>
      </form>
    </Form>
  )
}
