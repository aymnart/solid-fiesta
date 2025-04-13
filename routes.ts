/**
 * An array to hold the public routes for the application.
 * Public routes are accessible without authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * An array to hold the authentication routes for the application.
 * These routes will redirect logged-in users to the default after-login path.
 * @see {@link LOGIN_DEFAULT_REDIRECT}
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default path to redirect users after successful log in.
 * @type {string}
 */
export const LOGIN_DEFAULT_REDIRECT: string = "/settings";
