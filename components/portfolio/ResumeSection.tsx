"use client";

import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    role: "Video Editor",
    company: "@jtdigitally",
    period: "2024 - Present",
    description: "Creating engaging video content for social media and brand campaigns.",
  },
  {
    role: "Freelance Motion Designer",
    company: "Various Clients",
    period: "2023 - 2024",
    description: "Designed motion graphics and visual effects for multiple creators.",
  },
];

const skills = [
  "Adobe Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Figma",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
  "Storytelling",
];

export default function ResumeSection() {
  return (
    <section className="pb-10 pt-6" id="resume">
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="neo-label">Resume</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Experience */}
        <div className="neo-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)]">
              <Briefcase size={16} className="text-main-foreground" />
            </div>
            <h3 className="text-lg font-heading text-foreground">Experience</h3>
          </div>

          <div className="flex flex-col gap-4">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="rounded-base border-2 border-border bg-background p-3 transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0px_0px_var(--border)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-1">
                  <p className="text-sm font-heading text-foreground">{exp.role}</p>
                  <span className="text-[11px] font-heading text-foreground/60">{exp.period}</span>
                </div>
                <p className="mt-0.5 text-xs font-heading text-main">{exp.company}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-6">
          {/* Skills card */}
          <div className="neo-panel p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)]">
                <Award size={16} className="text-main-foreground" />
              </div>
              <h3 className="text-lg font-heading text-foreground">Skills</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-base border-2 border-border bg-background px-2.5 py-1 text-xs font-heading text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div className="neo-panel p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)]">
                <GraduationCap size={16} className="text-main-foreground" />
              </div>
              <h3 className="text-lg font-heading text-foreground">Education</h3>
            </div>

            <div className="rounded-base border-2 border-border bg-background p-3 shadow-[2px_2px_0px_0px_var(--border)]">
              <p className="text-sm font-heading text-foreground">Self-Taught Creator</p>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">
                Continuously learning through online courses, tutorials, and hands-on projects in video editing and motion design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
