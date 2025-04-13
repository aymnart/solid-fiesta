import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Access your account or sign in to our secure authentication platform.",
};

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
