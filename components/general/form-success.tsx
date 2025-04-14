import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface FormSuccessProps {
  message?: string
  className?: string
}
export default function FormSuccess({ message, className }: FormSuccessProps) {
  if (!message) {
    return
  }
  return (
    <Alert className={cn(className)} variant={"success"}>
      <AlertDescription className="flex items-start">
        <CheckCircle2 size={24} />
        <span className="ml-4">{message}</span>
      </AlertDescription>
    </Alert>
  )
}
