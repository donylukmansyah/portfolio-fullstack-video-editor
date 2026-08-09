"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/portfolios": "Portfolio Manager",
  "/admin/messages": "Messages",
  "/admin/main-categories": "Main Categories",
  "/admin/sub-categories": "Sub Categories",
};

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const currentLabel = routeLabels[pathname] ?? "Dashboard";
  const isHome = pathname === "/admin";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/admin" className="font-heading text-foreground/60 hover:text-foreground transition-colors">
              Admin
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isHome && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-heading text-foreground">
                {currentLabel}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
