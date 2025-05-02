// lib/api-client.ts

import { createAPIClient } from "@/app/api/api-client"

export const api = createAPIClient({
  baseUrl: "https://jsonplaceholder.typicode.com", // 🧪 Real testing API
  retries: 3,
  delayMs: 500,
  getAuthToken: async () => {
    // Not needed for jsonplaceholder, but example if needed later
    return null
  },
  refreshAuthToken: async () => {
    // Also not needed here, but in real app you would refresh token here
    console.log("Refreshing token...")
  },
})
