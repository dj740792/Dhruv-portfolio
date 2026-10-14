import ProjectCard from "../ui/ProjectCard";
import { projects } from "@/constants/project";

export default function Works() {
  return (
    <section className="mx-auto w-full max-w-200 px-6 py-30">
      <h2 className="mb-10 text-lg font-medium">Selected Works</h2>

      <div className="space-y-10">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
