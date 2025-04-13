import { ResetForm } from "@/components/auth/reset-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Securely reset your password to regain access to your account.",
};

export default function ResetPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ResetForm />
    </div>
  );
}
