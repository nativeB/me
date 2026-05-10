import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import CaseStudyCard from "./CaseStudyCard";

export default function WorkSection() {
  return (
    <section id="work">
      {featuredProjects.map((project) => (
        <CaseStudyCard key={project.id} project={project} />
      ))}

      <div className="flex justify-center pb-24">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#666] hover:text-[#ededed] transition-colors duration-200"
        >
          View all work
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
