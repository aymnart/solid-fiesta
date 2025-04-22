import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

function ShowPasswordButton() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
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
      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
    </Button>
  )
}

export default ShowPasswordButton
