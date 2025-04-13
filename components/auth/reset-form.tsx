"use client"
import { reset } from "@/actions/auth/reset-password"
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
import { ResetPasswordSchema } from "@/schemas/auth/reset-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, ShieldCheck } from "lucide-react"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"

export function ResetForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      reset(values).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
      icon={<ShieldCheck size={36} />}
      headerLabel="Forgot your password?"
      headerDescription="Type your email and we will send you a link to reset your password."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form className={"flex flex-col gap-10"} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            {/* ---------------EMAIL------------------ */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
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
            {/* --------------------- */}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full capitalize" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex gap-2 items-center justify-center transition-all">
                <Loader className="animate-spin" />
              </span>
            ) : (
              "Send reset email"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
