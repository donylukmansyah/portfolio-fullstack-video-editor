import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { isAdminEmail } from "@/lib/admin-access";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getAdminSession() {
  const session = await getServerSession();

  if (!session || !isAdminEmail(session.user.email)) {
    return null;
  }

  return session;
}

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
