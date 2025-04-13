// Utility function to calculate token expiry time
const calculateExpiry = (seconds: number): Date => new Date(Date.now() + seconds * 1000)

/**
 * 2FA token time = 5 mins
 */ export const twoFactorTokenExpiry = calculateExpiry(300)
export const twoFactorTokenExpiryString = "5 minutes"
/**
 * Password reset time = 1 hour
 */ export const passwordResetTokenExpiry = calculateExpiry(3600)
export const passwordResetTokenExpiryString = "1 hour"
/**
 * Email verification token time = 1 hour
 */ export const verificationTokenExpiry = calculateExpiry(3600)
export const emailVerificationTokenExpiryString = "1 hour"

/**
 * 2FA confirmation time = 24 hours
 */ export const twoFactorConfirmationExpiry = calculateExpiry(24 * 3600)
export const twoFactorConfirmationTokenExpiryString = "24 hours"
