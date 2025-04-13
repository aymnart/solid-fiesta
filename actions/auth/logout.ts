"use server"

import { signOut } from "@/auth"

export const logout = async () => {
  // Perform any other necessary cleanup tasks
  console.warn("User is logging out")

  // Sign the user out
  await signOut()
}
