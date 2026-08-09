import type { Metadata } from "next";

import ContactSection from "@/features/contact/components/index";
import { createPublicPageMetadata } from "@/server/metadata/public";

export const metadata: Metadata = createPublicPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Dony Lukmansyah for video editing, motion design, and collaboration inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="hero-entrance pt-28 sm:pt-32">
      <ContactSection />
    </div>
  );
}
