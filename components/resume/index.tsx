import { ExperienceList } from "./ExperienceList";
import { SkillsList } from "./SkillsList";
import { EducationList } from "./EducationList";

export default function ResumeSection() {
  return (
    <section className="pb-10 pt-6" id="resume">
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="neo-label">Resume</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Experience */}
        <ExperienceList />

        {/* Skills and Education */}
        <div className="flex flex-col gap-6">
          <SkillsList />
          <EducationList />
        </div>
      </div>
    </section>
  );
}
