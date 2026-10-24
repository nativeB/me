import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/motion/Magnetic";
import MoltenField from "@/components/fx/MoltenField";
import KineticName from "./KineticName";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-clip"
    >
      {/* The field sinks away as the page scrolls (CSS scroll timeline). */}
      <div aria-hidden className="hero-sink absolute inset-0 -z-10">
        <div className="enter-field absolute inset-0 mask-[linear-gradient(to_bottom,black_60%,transparent_98%)]">
          <MoltenField center={[0.7, 0.44]} radius={1.05} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-360 flex-1 flex-col px-4 pb-8 pt-24 sm:px-6 md:pb-10 md:pt-28 lg:px-10">
        <h1
          id="hero-heading"
          className="hero-recede origin-top-left font-display text-[min(17.5vw,27svh)] leading-[0.86] tracking-[-0.045em] text-fg md:text-[min(15vw,27svh)]"
        >
          <span className="sr-only">Quincy Hutchison, senior frontend engineer</span>
          <KineticName
            lines={[{ text: "Quincy" }, { text: "Hutchison", className: "text-right" }]}
          />
        </h1>

        <div className="mt-auto grid grid-cols-1 gap-8 pt-16 md:grid-cols-12 md:items-end">
          <p
            className="enter-fade max-w-[30ch] text-lead text-muted md:col-span-7 lg:col-span-5"
            style={i(9)}
          >
            Senior frontend engineer building fintech and consumer products
            that feel good to use. Currently at iKhokha, based in Accra.
          </p>

          <div
            className="enter-fade flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-5 md:justify-end lg:col-span-4 lg:col-start-9"
            style={i(10)}
          >
            <Magnetic>
              <Button asChild size="lg" className="group">
                <a href="#contact">
                  Get in touch
                  <span className="grid size-8 place-items-center rounded-full bg-bg/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-rotate-45">
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </a>
              </Button>
            </Magnetic>
            <a
              href="#work"
              className="rounded-sm text-small font-medium text-fg underline decoration-fg/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-fg"
            >
              Selected work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
