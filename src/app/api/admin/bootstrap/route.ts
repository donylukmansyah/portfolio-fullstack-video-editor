import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

import prisma from "@/server/db/prisma";
import { isAdminEmail } from "@/server/auth/guards";
import { auth } from "@/server/auth/auth";
import { adminBootstrapSchema } from "@/features/auth/schema";

export async function POST(request: Request) {
  const bootstrapEnabled =
    process.env.ENABLE_ADMIN_BOOTSTRAP === "true" ||
    (process.env.NODE_ENV !== "production" && process.env.ENABLE_ADMIN_BOOTSTRAP !== "false");

  if (!bootstrapEnabled) {
    return NextResponse.json({ error: "Admin bootstrap is disabled." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = adminBootstrapSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid admin bootstrap payload." }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const configuredPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!configuredEmail || !configuredPassword) {
    return NextResponse.json(
      { error: "Admin environment variables are not configured." },
      { status: 500 },
    );
  }

  // Constant-time compare on the password so timing doesn't leak guess length.
  const passwordMatches =
    password.length === configuredPassword.length &&
    timingSafeEqual(
      new TextEncoder().encode(password),
      new TextEncoder().encode(configuredPassword),
    );

  if (email !== configuredEmail || !passwordMatches || !isAdminEmail(email)) {
    return NextResponse.json({ error: "Invalid admin bootstrap credentials." }, { status: 403 });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: "Admin bootstrap has already been completed." }, { status: 409 });
  }

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: "Admin",
    },
  });

  return NextResponse.json({ ok: true });
}
