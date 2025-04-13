import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import {
  passwordResetTokenExpiry,
  twoFactorTokenExpiry,
  verificationTokenExpiry,
} from "@/tokens.config";

/**
 * Generates a two-factor authentication token for the given email.
 * The token is a 6-digit random number and is valid for 5 minutes.
 * If a token already exists for the email, it will be deleted before creating a new one.
 *
 * @param email - The email address for which the two-factor token is generated.
 * @returns A promise that resolves to the newly created two-factor token object.
 */
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const existingToken = await getTwoFactorTokenByEmail(email, { id: true });
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires: twoFactorTokenExpiry,
    },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  const existingToken = await getPasswordResetTokenByEmail(email, { id: true });
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires: passwordResetTokenExpiry,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const existingToken = await getVerificationTokenByEmail(email, { id: true });
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const verificationToken = db.verificationToken.create({
    data: {
      email,
      expires: verificationTokenExpiry,
      token,
    },
  });
  return verificationToken;
};
