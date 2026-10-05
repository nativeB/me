import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Magnetic from "@/components/motion/Magnetic";
import { site, socialLinks } from "@/data/site";
import CopyEmail from "./CopyEmail";

export default function CTASection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 border-t border-line"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 md:py-36 lg:px-8">
        <h2
          id="contact-heading"
          className="reveal max-w-[16ch] text-h2 font-semibold"
        >
          Looking for a senior frontend engineer?
        </h2>
        <p className="reveal-late mt-6 max-w-[46ch] text-lead text-muted">
          Open to remote roles, contract or full-time, with EU and US Eastern
          time overlap from Accra.
        </p>

        <div className="reveal-late mt-14 flex flex-col gap-8">
          <Magnetic strength={0.12} className="self-start">
            <a
              href={`mailto:${site.email}`}
              className="group inline-block break-all text-[clamp(1.5rem,0.9rem+3.2vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
                {site.email}
              </span>
            </a>
          </Magnetic>

          <div className="flex flex-wrap items-center gap-3">
            <CopyEmail email={site.email} />
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nudge-on-hover inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-small font-medium text-muted transition-[color,background-color,transform] duration-200 ease-out hover:bg-surface hover:text-fg active:scale-[0.97]"
              >
                {label}
                <ArrowUpRight size={14} aria-hidden className="nudge-target" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <p className="text-small text-subtle">Replies within 24 hours.</p>
        </div>
      </div>
    </section>
  );
}
