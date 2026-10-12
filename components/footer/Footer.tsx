import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react/ssr";
import Magnetic from "@/components/motion/Magnetic";
import MoltenField from "@/components/fx/MoltenField";
import CopyEmail from "@/components/cta/CopyEmail";
import { site, socialLinks } from "@/data/site";

/**
 * Contact, as a curtain call. The footer is fixed beneath the page inside a
 * clipped shell, so the last section lifts away to reveal it, and the molten
 * field from the hero returns underneath.
 */
export default function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      data-field-root
      className="curtain relative"
    >
      <div className="curtain-body overflow-clip bg-bg">
        <div
          aria-hidden
          className="absolute inset-0 mask-[linear-gradient(to_top,black_25%,transparent_85%)]"
        >
          <MoltenField center={[0.82, 0.05]} radius={0.85} scale={1.25} />
        </div>

        <div className="curtain-rise relative mx-auto flex h-full max-w-360 flex-col px-4 pb-6 pt-28 sm:px-6 md:pt-32 lg:px-10">
          <h2
            id="contact-heading"
            className="max-w-[14ch] font-display text-h2 font-bold"
          >
            Looking for a senior frontend engineer?
          </h2>
          <p className="mt-6 max-w-[44ch] text-lead text-muted">
            Open to remote roles, contract or full-time, with EU and US Eastern
            time overlap from Accra.
          </p>

          <div className="mt-auto flex flex-col gap-6 pt-14">
            <Magnetic strength={0.1} className="self-start">
              <a
                href={`mailto:${site.email}`}
                className="group inline-block break-all font-display text-[clamp(1.75rem,0.6rem+5.2vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_3px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-700 ease-out group-hover:bg-size-[100%_3px] group-focus-visible:bg-size-[100%_3px]">
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
                  className="nudge-on-hover inline-flex h-11 items-center gap-1.5 rounded-full bg-bg/40 px-4 text-small font-medium text-muted backdrop-blur-sm transition-[color,background-color,transform] duration-200 ease-out hover:bg-surface hover:text-fg active:scale-[0.97]"
                >
                  {label}
                  <ArrowUpRight size={14} aria-hidden className="nudge-target" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
              <span className="ml-1 text-small text-muted">Replies within 24 hours.</span>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-5 text-meta text-muted">
            <p>
              &copy; {new Date().getFullYear()} {site.name}
            </p>
            <a
              href="#main"
              className="nudge-on-hover inline-flex h-9 items-center gap-1.5 rounded-full bg-bg/70 px-4 text-fg backdrop-blur-md transition-[background-color,transform] duration-200 ease-out hover:bg-bg active:scale-[0.97]"
            >
              Back to top
              <ArrowUp size={14} aria-hidden className="nudge-target" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
