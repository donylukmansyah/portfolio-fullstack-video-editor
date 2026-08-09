import type { Metadata } from "next";

import ResumeSection from "@/features/resume/components/index";
import { createPublicPageMetadata } from "@/server/metadata/public";

export const metadata: Metadata = createPublicPageMetadata({
  title: "Resume",
  description:
    "Experience, skills, and education of Dony Lukmansyah — Video Editor & Motion Designer.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="hero-entrance pt-28 sm:pt-32">
      <ResumeSection />
    </div>
  );
}
