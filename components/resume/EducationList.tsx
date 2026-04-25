import { GraduationCap } from "lucide-react";
import { educations } from "./resumeData";

export function EducationList() {
  return (
    <div className="neo-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)]">
          <GraduationCap size={16} className="text-main-foreground" />
        </div>
        <h3 className="text-lg font-heading text-foreground">Education</h3>
      </div>

      <div className="flex flex-col gap-3">
        {educations.map((edu, index) => (
          <div 
            key={index}
            className="rounded-base border-2 border-border bg-background p-3 shadow-[2px_2px_0px_0px_var(--border)]"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-heading text-foreground">{edu.degree}</p>
              <span className="text-[11px] font-medium text-foreground/60 whitespace-nowrap">{edu.period}</span>
            </div>
            <p className="mt-0.5 text-[12px] font-medium text-main">{edu.school}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
