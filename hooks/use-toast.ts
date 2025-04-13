"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

// Configurable constants
const TOAST_LIMIT = 5 // Increased from 1 to allow multiple toasts
const TOAST_REMOVE_DELAY = 5000 // Reduced from 1000000 to a more reasonable 5 seconds

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  duration?: number // Added custom duration per toast
}

type ActionType = {
  ADD_TOAST: "ADD_TOAST"
  UPDATE_TOAST: "UPDATE_TOAST"
  DISMISS_TOAST: "DISMISS_TOAST"
  REMOVE_TOAST: "REMOVE_TOAST"
}

// Use a more reliable ID generation method
const generateId = (() => {
  let count = 0
  return () => {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return `toast-${Date.now()}-${count}`
  }
})()

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, duration?: number) => {
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId))
    toastTimeouts.delete(toastId)
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, duration || TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        for (const toast of state.toasts) {
          addToRemoveQueue(toast.id)
        }
      }

      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      }
  }
}

// Implement a proper state management to avoid unexpected behavior with concurrent renders
const listeners: Set<(state: State) => void> = new Set()
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  for (const listener of listeners) {
    listener(memoryState)
  }
}

interface ToastOptions extends Omit<ToasterToast, "id" | "open" | "onOpenChange"> {
  duration?: number
}

function toast(options: ToastOptions) {
  const id = generateId()
  const { duration, ...props } = options

  const update = (props: Partial<ToasterToast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) {
          dismiss()
        }
      },
      duration,
    },
  })

  if (duration !== 0) {
    // Only auto-dismiss if duration is not 0
    addToRemoveQueue(id, duration)
  }

  return {
    id,
    dismiss,
    update,
  }
}

// Add variant-specific helpers
toast.success = (options: string | Omit<ToastOptions, "variant">) => {
  if (typeof options === "string") {
    return toast({ description: options, variant: "success" })
  }
  return toast({ ...options, variant: "success" })
}

toast.error = (options: string | Omit<ToastOptions, "variant">) => {
  if (typeof options === "string") {
    return toast({ description: options, variant: "destructive" })
  }
  return toast({ ...options, variant: "destructive" })
}

toast.warning = (options: string | Omit<ToastOptions, "variant">) => {
  if (typeof options === "string") {
    return toast({ description: options, variant: "warning" })
  }
  return toast({ ...options, variant: "warning" })
}

toast.info = (options: string | Omit<ToastOptions, "variant">) => {
  if (typeof options === "string") {
    return toast({ description: options, variant: "info" })
  }
  return toast({ ...options, variant: "info" })
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)

      // Clean up timeouts when component unmounts
      if (listeners.size === 0) {
        toastTimeouts.forEach(clearTimeout)
        toastTimeouts.clear()
      }
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    clear: () => dispatch({ type: "REMOVE_TOAST" }),
  }
}

export { useToast, toast }
