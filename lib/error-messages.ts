export const authErrorMessages = {
  AccessDenied: "Access denied. You do not have permission to access this resource.",
  AccountNotLinked: "Email already in use with a different provider!",
  AdapterError: "There was an issue with the database adapter. Please contact support.",
  AuthError: "An authentication error occurred. Please try again.",
  CallbackRouteError: "There was an issue during the callback process. Please try again.",
  CredentialsSignin: "Invalid credentials. Please check your email and password.",
  DuplicateConditionalUI: "Multiple providers have conditional UI enabled. Please contact support.",
  EmailSignInError: "There was an issue signing in with email. Please try again.",
  ErrorPageLoop: "There was an error with the error page configuration. Please contact support.",
  EventError: "An error occurred during an event. Please contact support.",
  ExperimentalFeatureNotEnabled: "An experimental feature is not enabled. Please contact support.",
  InvalidCallbackUrl: "The callback URL is invalid. Please contact support.",
  InvalidCheck: "An OAuth check could not be performed. Please try again.",
  InvalidEndpoints: "One of the OAuth endpoints is missing. Please contact support.",
  InvalidProvider: "The provider is invalid or unsupported. Please contact support.",
  JWTSessionError: "There was an issue with the JWT session. Please try again.",
  MissingAdapter: "A required database adapter is missing. Please contact support.",
  MissingAdapterMethods:
    "Some required methods are missing in the database adapter. Please contact support.",
  MissingAuthorize:
    "The authorize method is missing for the credentials provider. Please contact support.",
  MissingCSRF: "CSRF token is missing. Please try again.",
  MissingSecret: "A required secret is missing. Please contact support.",
  MissingWebAuthnAutocomplete:
    "WebAuthn autocomplete parameter is missing. Please contact support.",
  OAuthAccountNotLinked: "Email already in use with a different provider!",
  OAuthCallbackError: "There was an issue during the OAuth callback. Please try again.",
  OAuthProfileParseError: "There was an issue parsing the OAuth profile. Please contact support.",
  OAuthSignInError: "There was an issue signing in with the OAuth provider. Please try again.",
  SessionTokenError: "There was an issue with the session token. Please try again.",
  SignInError: "An error occurred during sign-in. Please try again.",
  SignOutError: "An error occurred during sign-out. Please try again.",
  UnknownAction: "An unknown action was requested. Please contact support.",
  UnsupportedStrategy: "The authentication strategy is unsupported. Please contact support.",
  UntrustedHost: "The host is untrusted. Please contact support.",
  Verification: "There was an issue with email verification. Please try again.",
  WebAuthnVerificationError:
    "There was an issue verifying the WebAuthn response. Please try again.",
  Default: "Oops something went wrong! Please try again.",
} as const

export type AuthErrorType = keyof typeof authErrorMessages
