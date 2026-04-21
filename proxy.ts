import { NextResponse, type NextRequest } from "next/server";

import { isAdminEmail } from "@/lib/admin-access";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If the user is accessing an admin route (but not the login page)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    if (!session || !isAdminEmail(session.user.email)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If the user goes to /admin/login while already logged in
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    if (session && isAdminEmail(session.user.email)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
