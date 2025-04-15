"use client"
import { login } from "@/actions/auth/login"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { type AuthErrorMessages, authErrorMessages, type AuthErrorType } from "@/lib/error-messages"
import { LoginSchema } from "@/schemas/auth/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import FormInfo from "../general/form-info"

export function LoginForm() {
  const searchParams = useSearchParams()
  const authError = searchParams?.get("error") as AuthErrorType | null

  const urlError: AuthErrorMessages | undefined = authError
    ? authErrorMessages[authError] || authErrorMessages.Default
    : undefined
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      login(values)
        .then(data => {
          if (data?.error) {
            form.resetField("password")
            setError(data.error)
          }
          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError("Something went wrong!"))
    })
  }

  return (
    <CardWrapper
      headerLabel={showTwoFactor ? "" : "Welcome back!"}
      headerDescription={showTwoFactor ? "" : "Login using your Google or Github account."}
      backButtonLabel={showTwoFactor ? "" : "Don't have an account? Sign up"}
      backButtonHref="/auth/register"
      className="bg-transparent"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            {/* ---------------EMAIL------------------ */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center mt-6">
                    <FormLabel htmlFor="code">Enter your 2FA code:</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                            required
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
                {/* ---------------PASSWORD------------------ */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link href="/auth/reset" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            {...field}
                            placeholder="*******"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            aria-label="Password input"
                            required
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
                            className="absolute right-1.5 top-1/2 -translate-y-1/2"
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
              </>
            )}
            {/* ------------ */}
          </div>
          {error && <FormError message={error} />}
          {urlError && <FormError message={urlError} />}
          {success && <FormSuccess message={success} />}
          {showTwoFactor && (
            <FormInfo message="A 2FA code has been sent to your email. Please enter it below to proceed." />
          )}

          <Button className="w-full capitalize" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex gap-2 items-center justify-center transition-all">
                <Loader className="animate-spin" />
              </span>
            ) : showTwoFactor ? (
              "Confirm"
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
