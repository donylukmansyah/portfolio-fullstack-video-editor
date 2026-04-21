import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin-access";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    email?: string;
    password?: string;
  } | null;

  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const configuredPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!configuredEmail || !configuredPassword) {
    return NextResponse.json(
      { error: "Admin environment variables are not configured." },
      { status: 500 },
    );
  }

  if (email !== configuredEmail || password !== configuredPassword || !isAdminEmail(email)) {
    return NextResponse.json({ error: "Invalid admin bootstrap credentials." }, { status: 403 });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: "Admin",
      },
    });
  }

  return NextResponse.json({ ok: true });
}
