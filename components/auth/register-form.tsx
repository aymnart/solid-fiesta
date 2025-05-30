"use client"
import { register } from "@/actions/auth/register"
import { AuthCard } from "@/components/auth/auth-card"
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
import { type AuthErrorMessages, type AuthErrorType, authErrorMessages } from "@/lib/error-messages"
import { RegisterSchema } from "@/schemas/auth/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"

export function RegisterForm() {
  const searchParams = useSearchParams()
  const authError = searchParams?.get("error") as AuthErrorType | null

  const urlError: AuthErrorMessages | undefined = authError
    ? authErrorMessages[authError] || authErrorMessages.Default
    : undefined
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      register(values)
        .then(data => {
          setError(data.error)
          setSuccess(data.success)
        })
        .catch(error => {
          setError(error.message)
        })
    })
  }

  return (
    <AuthCard
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Sign in"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* ---------------NAME--------------- */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="name"
                        {...field}
                        placeholder="name"
                        type="text"
                        autoComplete="name"
                        aria-label="name input"
                        disabled={isPending}
                        error={form.formState.errors.name?.message}
                        isValid={!form.formState.errors.name && !!field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ----------------EMAIL----------------- */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="email"
                        {...field}
                        placeholder="name@example.com"
                        type="email"
                        autoComplete="email"
                        aria-label="Email input"
                        disabled={isPending}
                        error={form.formState.errors.email?.message}
                        isValid={!form.formState.errors.email && !!field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ----------------PASSWORD----------------- */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        {...field}
                        placeholder="*******"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        aria-label="Password input"
                        disabled={isPending}
                        minLength={6}
                        error={form.formState.errors.password?.message}
                        isValid={!form.formState.errors.password && !!field.value}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="link"
                        size="icon"
                        hover={false}
                        focus={false}
                        className="absolute right-1 top-1/2 -translate-y-1/2 border-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon size={16} aria-hidden="true" />
                        ) : (
                          <EyeIcon size={16} aria-hidden="true" />
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
            {/* ---------------Confirm Password------------------ */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        {...field}
                        placeholder="*******"
                        type={"password"}
                        autoComplete="new-password"
                        aria-label="Confirm Password input"
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
          {error && <FormError message={error} />}
          {urlError && <FormError message={urlError} />}
          {success && <FormSuccess message={success} />}
          {/* Submit Button */}
          <Button className="w-full " type="submit" isPending={isPending}>
            {isPending ? "Submitting..." : "Create an account"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
