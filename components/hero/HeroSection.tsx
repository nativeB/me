import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { featuredProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/motion/Magnetic";
import ProjectDeck from "./ProjectDeck";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-4 pb-20 pt-10 sm:px-6 md:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-8"
    >
      <div className="min-w-0 lg:col-span-6">
        <h1 id="hero-heading" className="text-display font-semibold">
          <span className="hero-line">
            <span className="enter-line" style={i(0)}>
              Hi, I&rsquo;m
            </span>
          </span>
          <span className="hero-line">
            <span className="enter-line" style={i(1)}>
              Quincy.
            </span>
          </span>
        </h1>

        <p
          className="enter-fade mt-8 max-w-[34ch] text-lead text-muted"
          style={i(3)}
        >
          Senior frontend engineer. I build fintech and consumer products that
          feel good to use. Currently at iKhokha. Based in Accra.
        </p>

        <div
          className="enter-fade mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          style={i(4)}
        >
          <Magnetic>
            <Button asChild size="lg" className="group">
              <a href="#contact">
                Get in touch
                <span className="grid size-8 place-items-center rounded-full bg-bg/15 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5">
                  <ArrowRight size={16} aria-hidden />
                </span>
              </a>
            </Button>
          </Magnetic>
          <Link
            href="/work"
            className="rounded-sm text-small font-medium text-muted underline decoration-line-strong underline-offset-[6px] transition-colors duration-200 hover:text-fg hover:decoration-accent"
          >
            View all work
          </Link>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-6 lg:pl-6 xl:pl-10">
        {/* Drifts slightly slower than the page as the hero scrolls away (CSS scroll timeline). */}
        <div className="hero-drift">
          <ProjectDeck projects={featuredProjects} />
        </div>
      </div>
    </section>
  );
}
