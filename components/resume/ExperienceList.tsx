import { Briefcase } from "lucide-react";
import { experiences } from "./resumeData";

export function ExperienceList() {
  return (
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
  );
}
