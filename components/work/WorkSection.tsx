import { projects } from "@/data/projects";
import CaseStudyCard from "./CaseStudyCard";

export default function WorkSection() {
  return (
    <section id="work">
      {projects.map((project) => (
        <CaseStudyCard key={project.id} project={project} />
      ))}
    </section>
  );
}
