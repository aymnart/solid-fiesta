/**
 * 🧭 Application Route Configuration
 *
 * Centralized definition of public, authentication, and protected API routes.
 * Helps maintain consistent access control, redirection logic, and DX across the app.
 */

export const PUBLIC_ROUTES = [
  "/auth/new-verification", // Public for email verification
  "/legal/privacy-policy",
  "/legal/terms-of-service",
] as const

export const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
] as const

export const API_AUTH_PREFIX = "/api/auth" as const
export const LOGIN_DEFAULT_REDIRECT = "/dashboard/overview" as const

/**
 * 🔒 RouteConfig
 *
 * Type-safe object representing route accessibility levels in the app.
 */
export type RouteConfig = {
  publicRoutes: ReadonlyArray<(typeof PUBLIC_ROUTES)[number]>
  authRoutes: ReadonlyArray<(typeof AUTH_ROUTES)[number]>
  apiAuthPrefix: typeof API_AUTH_PREFIX
  redirectAfterLogin: typeof LOGIN_DEFAULT_REDIRECT
}

/**
 * ✅ Exported constants for route usage
 */
export const publicRoutes = PUBLIC_ROUTES
export const authRoutes = AUTH_ROUTES
export const apiAuthPrefix = API_AUTH_PREFIX

/**
 * 📦 Unified route configuration object
 */
export const routeConfig: RouteConfig = {
  publicRoutes: PUBLIC_ROUTES,
  authRoutes: AUTH_ROUTES,
  apiAuthPrefix: API_AUTH_PREFIX,
  redirectAfterLogin: LOGIN_DEFAULT_REDIRECT,
}

/**
 * 🔍 Route Type Checkers
 *
 * Utility functions to identify route categories during navigation/middleware checks
 */

/**
 * Checks if a route is publicly accessible (no auth required)
 */
export const isPublicRoute = (path: string): boolean =>
  PUBLIC_ROUTES.some(route => path === "/" || path.startsWith(route))

/**
 * Checks if a route belongs to the authentication flow
 */
export const isAuthRoute = (path: string): boolean =>
  AUTH_ROUTES.includes(path as (typeof AUTH_ROUTES)[number])

/**
 * Checks if a route is an API endpoint used for authentication
 */
export const isApiAuthRoute = (path: string): boolean => path.startsWith(API_AUTH_PREFIX)
