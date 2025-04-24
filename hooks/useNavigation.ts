import { useRouter } from "next/navigation"
import { useCallback } from "react"

type NavigationOptions = {
  /**
   * Optional callback that is triggered before navigation begins.
   */
  onBeforeNavigate?: () => void

  /**
   * Optional callback that is triggered after navigation completes.
   */
  onAfterNavigate?: () => void
}

/**
 * Custom hook that provides navigation helpers using Next.js router.
 * It allows triggering optional callbacks before and after navigation.
 *
 * @param {NavigationOptions} options - Configuration options for navigation.
 * @returns {{
 *   navigateTo: (path: string) => void,
 *   handleKeyboardNavigation: (path: string) => (e: React.KeyboardEvent) => void
 * }}
 *
 * @example
 * const { navigateTo, handleKeyboardNavigation } = useNavigation({
 *   onBeforeNavigate: () => console.log("Before navigation"),
 *   onAfterNavigate: () => console.log("After navigation")
 * })
 *
 * // Programmatic navigation
 * navigateTo('/dashboard')
 *
 * // Keyboard accessibility
 * <div tabIndex={0} onKeyDown={handleKeyboardNavigation('/dashboard')}>
 *   Go to Dashboard
 * </div>
 */
export function useNavigation(options: NavigationOptions = {}) {
  const router = useRouter()
  const { onBeforeNavigate, onAfterNavigate } = options

  /**
   * Navigates to the specified path using Next.js router.
   *
   * @param {string} path - The route to navigate to.
   */
  const navigateTo = useCallback(
    (path: string) => {
      if (onBeforeNavigate) onBeforeNavigate()
      router.push(path)
      if (onAfterNavigate) onAfterNavigate()
    },
    [router, onBeforeNavigate, onAfterNavigate],
  )

  /**
   * Returns a keyboard event handler that triggers navigation
   * when the Enter or Space key is pressed.
   *
   * @param {string} path - The route to navigate to.
   * @returns {(e: React.KeyboardEvent) => void}
   */
  const handleKeyboardNavigation = useCallback(
    (path: string) => {
      return (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          navigateTo(path)
        }
      }
    },
    [navigateTo],
  )

  return {
    navigateTo,
    handleKeyboardNavigation,
  }
}
