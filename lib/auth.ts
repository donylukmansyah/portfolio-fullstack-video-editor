import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

function normalizeOrigin(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

const trustedOrigins = [
  normalizeOrigin(process.env.BETTER_AUTH_URL),
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
].filter((origin): origin is string => Boolean(origin));

const baseURL =
  normalizeOrigin(process.env.BETTER_AUTH_URL) ??
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL);

export const auth = betterAuth({
  appName: "Dony Lukmansyah Portfolio",
  ...(baseURL ? { baseURL } : {}),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  ...(trustedOrigins.length > 0 ? { trustedOrigins } : {}),
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 60,
    storage: "memory",
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
