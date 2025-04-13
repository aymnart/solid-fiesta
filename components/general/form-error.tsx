import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
  className?: string;
}
export default function FormError({ message, className }: FormErrorProps) {
  if (!message) {
    return;
  }
  return (
    <Alert className={cn(className)} variant={"destructive"}>
      <AlertDescription className="flex items-start">
        <AlertCircle size={24} />
        <span className="ml-4">{message}</span>
      </AlertDescription>
    </Alert>
  );
}
