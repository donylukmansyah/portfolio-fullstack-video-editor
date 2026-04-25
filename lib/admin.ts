import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { isAdminEmail } from "@/lib/admin-access";
import { auth } from "@/lib/auth";

export const getServerSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export const getAdminSession = cache(async () => {
  const session = await getServerSession();

  if (!session || !isAdminEmail(session.user.email)) {
    return null;
  }

  return session;
});

export async function requireAdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function assertAdminAction() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
