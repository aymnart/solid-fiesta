import React from "react";
import { CardWrapper } from "./card-wrapper";
import { AlertCircle } from "lucide-react";

export default function ErrorCard() {
  return (
    <CardWrapper
      icon={<AlertCircle className="h-14 w-14 text-destructive" />}
      headerLabel="Authentication Error"
      headerDescription="We encountered an issue while trying to authenticate you. This could be due to an expired session or invalid
          credentials."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonVariant={"default"}
      className="flex items-center justify-center flex-col"
    />
  );
}
