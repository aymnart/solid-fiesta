"use client"
import { newPassword } from "@/actions/auth/new-password"
import { CardWrapper } from "@/components/auth/card-wrapper"
import FormError from "@/components/general/form-error"
import FormSuccess from "@/components/general/form-success"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NewPasswordSchema } from "@/schemas/auth/new-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, KeyRound, Loader } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"

export function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "", // Add confirmPassword to default values
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")
    if (values.password !== values.confirmPassword) {
      // Add password match validation
      setError("Passwords do not match")
      return
    }
    startTransition(() => {
      newPassword(values, token).then(data => {
        setError(data?.error)
        setSuccess(data?.success && `${data?.success} Redirecting to login page...`)

        if (data?.success) {
          setTimeout(() => {
            window.location.href = "/auth/login"
          }, 2500)
        }
      })
    })
  }

  return (
    <CardWrapper
      icon={<KeyRound size={36} />}
      headerLabel="Reset Your Password"
      headerDescription="Please enter and confirm your new password below."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        {...field}
                        placeholder="Enter your new password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        aria-label="New password input"
                        disabled={isPending}
                        minLength={6}
                        error={form.formState.errors.password?.message}
                        isValid={!form.formState.errors.password && !!field.value}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        {...field}
                        placeholder="Re-enter your new password"
                        type="password"
                        autoComplete="new-password"
                        aria-label="Confirm password input"
                        disabled={isPending}
                        minLength={6}
                        error={form.formState.errors.confirmPassword?.message}
                        isValid={!form.formState.errors.confirmPassword && !!field.value}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Error and Success Messages */}
          <FormError message={error} />
          <FormSuccess message={success} />
          {/* Submit Button */}
          <Button className="w-full capitalize" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex gap-2 items-center justify-center transition-all">
                <Loader className="animate-spin" />
                Submitting...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
