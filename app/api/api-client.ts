/**
 * 🌟 Ultimate Resilient API Client 🌟
 *
 * Features:
 * - Smart retries with exponential backoff + jitter
 * - Auto token refresh and automatic re-requesting
 * - Timeout and abort support for fetch
 * - Clean error handling and extensibility
 * - Fully typed with TypeScript
 */

type PendingRequest = {
  fn: () => Promise<any>
  retries: number
  delayMs: number
  attempt: number
}

interface APIClientOptions {
  baseUrl: string
  retries?: number
  delayMs?: number
  getAuthToken?: () => Promise<string | null>
  refreshAuthToken?: () => Promise<void>
}

interface RequestConfig extends RequestInit {
  retries?: number
  delayMs?: number
  timeoutMs?: number
}

let pendingRequests: PendingRequest[] = []

/**
 * Retries a given function with exponential backoff and optional token refresh on 401 errors.
 * @template T
 * @param fn - The async function to retry.
 * @param retries - Max retry attempts.
 * @param baseDelayMs - Initial delay in milliseconds.
 * @param onTokenRefresh - Optional auth refresh function.
 * @param attempt - Current attempt number.
 * @returns The successful response from the function.
 */
async function retryWithTokenRefresh<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelayMs = 500,
  onTokenRefresh?: () => Promise<void>,
  attempt = 1,
): Promise<T> {
  try {
    return await fn()
  } catch (error: any) {
    if (retries <= 0) throw error

    const isUnauthorized = error?.status === 401

    if (isUnauthorized && onTokenRefresh) {
      pendingRequests.push({ fn, retries, delayMs: baseDelayMs, attempt })
      await onTokenRefresh()
      await processPendingRequests(onTokenRefresh)
      return fn()
    }

    const delay = Math.min(30000, 2 ** attempt * baseDelayMs)
    const jitter = Math.random() * delay * 0.5
    const finalDelay = delay + jitter

    console.warn(`[retry] Retrying after ${Math.round(finalDelay)}ms (Attempt ${attempt})`)

    await new Promise(res => setTimeout(res, finalDelay))

    return retryWithTokenRefresh(fn, retries - 1, baseDelayMs, onTokenRefresh, attempt + 1)
  }
}

/**
 * Processes and retries all pending requests after a token refresh.
 * @param onTokenRefresh - Token refresh function.
 */
async function processPendingRequests(onTokenRefresh?: () => Promise<void>) {
  const requests = [...pendingRequests]
  pendingRequests = []

  for (const { fn, retries, delayMs, attempt } of requests) {
    await retryWithTokenRefresh(fn, retries, delayMs, onTokenRefresh, attempt)
  }
}

/**
 * Creates a timeout that aborts the fetch request after a specified duration.
 * @param ms - Timeout in milliseconds.
 * @param controller - AbortController instance.
 * @returns A promise that rejects after timeout.
 */
function timeoutPromise(ms: number, controller: AbortController) {
  return new Promise<never>((_, reject) =>
    setTimeout(() => {
      controller.abort()
      reject(new Error("Request timeout"))
    }, ms),
  )
}

/**
 * Performs a fetch request with built-in timeout and abort controller.
 * @param url - The URL to fetch.
 * @param options - Fetch options.
 * @param timeout - Timeout in milliseconds.
 * @returns A Promise resolving with the response.
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController()
  const timeoutP = timeoutPromise(timeout, controller)
  const fetchP = fetch(url, { ...options, signal: controller.signal })

  return Promise.race([fetchP, timeoutP])
}

/**
 * Factory to create a smart, resilient API client.
 * Supports dynamic retries, auth handling, and flexible configs.
 *
 * @param defaultOptions - Default options for the API client.
 * @returns A Proxy client supporting dynamic HTTP methods.
 */
const createAPIClient = ((defaultOptions: APIClientOptions) => {
  return (customOptions?: Partial<APIClientOptions>) => {
    const options = { ...defaultOptions, ...customOptions }

    const handler: ProxyHandler<any> = {
      get(_target, method: string) {
        return async (endpoint: string, body?: any, config?: RequestConfig) => {
          if (!["get", "post", "put", "patch", "delete"].includes(method)) {
            throw new Error(`Unsupported method: ${method}`)
          }

          const retries = config?.retries ?? options.retries ?? 3
          const delayMs = config?.delayMs ?? options.delayMs ?? 500
          const timeoutMs = config?.timeoutMs ?? 10000

          return retryWithTokenRefresh(
            async () => {
              const headers = new Headers({
                "Content-Type": "application/json",
                ...(config?.headers || {}),
              })

              const token = options.getAuthToken ? await options.getAuthToken() : null
              if (token) {
                headers.append("Authorization", `Bearer ${token}`)
              }

              const requestInit: RequestInit = {
                method: method.toUpperCase(),
                headers,
                ...config,
              }

              if (body && method !== "get") {
                requestInit.body = JSON.stringify(body)
              }

              const url =
                method === "get" && body
                  ? `${options.baseUrl}${endpoint}?${new URLSearchParams(body).toString()}`
                  : `${options.baseUrl}${endpoint}`

              const res = await fetchWithTimeout(url, requestInit, timeoutMs)

              if (!res.ok) {
                const error = new Error(`Request failed with status ${res.status}`) as any
                error.status = res.status
                throw error
              }

              const contentType = res.headers.get("Content-Type")
              if (contentType?.includes("application/json")) {
                return res.json()
              }
              return res.text()
            },
            retries,
            delayMs,
            options.refreshAuthToken,
          )
        }
      },
    }

    return new Proxy({}, handler)
  }
})({
  baseUrl: "/api", // Default fallback, you can override this
  retries: 3,
  delayMs: 500,
})

export { createAPIClient }
