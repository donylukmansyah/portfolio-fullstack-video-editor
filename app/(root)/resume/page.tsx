import type { Metadata } from "next";
import ResumeSection from "@/components/portfolio/ResumeSection";

export const metadata: Metadata = {
  title: "Resume | Dony Lukmansyah",
  description:
    "Experience, skills, and education of Dony Lukmansyah — Video Editor & Motion Designer.",
};

export default function ResumePage() {
  return (
    <div className="hero-entrance pt-28 sm:pt-32">
      <ResumeSection />
    </div>
  );
}
