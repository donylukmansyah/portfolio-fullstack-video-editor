import { GraduationCap } from "lucide-react";

export function EducationList() {
  return (
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
  );
}
