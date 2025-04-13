import { Info } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FormInfoProps {
  message?: string;
  className?: string;
}
export default function FormInfo({ message, className }: FormInfoProps) {
  if (!message) {
    return;
  }
  return (
    <Alert className={cn(className)} variant={"info"}>
      <AlertDescription className="flex items-start">
        <Info size={24} />
        <span className="ml-4">{message}</span>
      </AlertDescription>
    </Alert>
  );
}
