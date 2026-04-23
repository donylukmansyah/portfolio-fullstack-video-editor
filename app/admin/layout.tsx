import type { Metadata } from "next";

import { createPublicPageMetadata } from "@/lib/metadata/public";

export const metadata: Metadata = createPublicPageMetadata({
  title: "Admin",
  description: "Secure admin workspace for managing portfolio content.",
  path: "/admin",
  robots: {
    index: false,
    follow: false,
  },
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
