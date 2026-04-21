import type { Metadata } from "next";
import ContactSection from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact | Dony Lukmansyah",
  description:
    "Get in touch with Dony Lukmansyah for video editing, motion design, and collaboration inquiries.",
};

export default function ContactPage() {
  return (
    <div className="hero-entrance pt-28 sm:pt-32">
      <ContactSection />
    </div>
  );
}
