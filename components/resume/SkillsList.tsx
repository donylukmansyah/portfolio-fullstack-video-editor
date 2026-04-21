import { Award } from "lucide-react";
import { skills } from "./resumeData";

export function SkillsList() {
  return (
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
  );
}
