import Image from "next/image";
import { ArrowUpRight, TrendDown } from "@phosphor-icons/react/ssr";
import { about } from "@/data/site";
import { projects } from "@/data/projects";
import Manifesto from "./Manifesto";
import CountDown from "./CountDown";
import AccraClock from "./AccraClock";

// Double-bezel: a hairline tray with the content core seated inside it.
const shell = "reveal-card rounded-[2rem] bg-surface/60 p-1.5 ring-1 ring-line";
const core =
  "relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]";

const kente = ["deal-gatekeeper", "invoice-collector", "zoning-watchdog"]
  .map((id) => projects.find((p) => p.id === id))
  .filter((p) => p !== undefined);

// Fanned at rest, spreading further on hover.
const fan = [
  "-rotate-[10deg] translate-x-[-38%] group-hover:-rotate-[16deg] group-hover:translate-x-[-58%]",
  "-rotate-[2deg] translate-x-[-6%] translate-y-[-6%] group-hover:-rotate-[3deg] group-hover:translate-y-[-14%]",
  "rotate-[8deg] translate-x-[24%] group-hover:rotate-[14deg] group-hover:translate-x-[44%]",
];

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-0">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10">
        <Manifesto
          headingId="about-heading"
          text={about.lead}
          emphasis="they feel them instantly."
        />
      </div>

      <div className="mx-auto max-w-360 px-4 pb-32 sm:px-6 md:pb-48 lg:px-10">
        <div className="grid grid-cols-1 gap-3 lg:grid-flow-dense lg:grid-cols-12 lg:gap-4">
          {/* The headline result. */}
          <div className={`${shell} lg:col-span-7 lg:row-span-2`}>
            <div className={`${core} min-h-104 justify-between gap-12 bg-accent p-7 text-on-accent sm:p-10 lg:p-12`}>
              <div className="flex items-start justify-between gap-6">
                <p className="text-small font-medium opacity-80">Checkout at iKhokha</p>
                <p className="inline-flex items-center gap-1.5 text-small font-semibold">
                  <TrendDown size={18} weight="bold" aria-hidden />
                  75% faster
                </p>
              </div>
              <div>
                <p className="font-display text-[clamp(5.5rem,2.5rem+9vw,12rem)] font-extrabold leading-[0.82] tracking-[-0.055em]">
                  <CountDown from={19.1} to={4.3} />
                  <span className="ml-3 text-[0.3em] font-bold tracking-[-0.03em]">min</span>
                </p>
                <p className="mt-8 max-w-[40ch] text-body opacity-85">
                  Average time to conversion, down from 19.1 minutes after I led
                  the checkout migration from Shopify to an internal system on Swell.
                </p>
              </div>
            </div>
          </div>

          <div className={`${shell} lg:col-span-5`}>
            <div className={`${core} justify-between gap-8 bg-[radial-gradient(90%_120%_at_100%_0%,var(--accent-soft),transparent_60%)] p-7 sm:p-10`}>
              <p className="font-display text-[clamp(4.5rem,2.8rem+5vw,8rem)] font-extrabold leading-[0.82] tracking-[-0.055em]">
                7<span className="text-accent">+</span>
              </p>
              <p className="max-w-[36ch] text-body text-muted">
                <span className="text-fg">Years building web products.</span>{" "}
                React, Next.js and TypeScript up front; Node.js, PostgreSQL and
                MongoDB behind them.
              </p>
            </div>
          </div>

          <div className={`${shell} group lg:col-span-5`}>
            <a
              href="https://kentehq.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${core} min-h-88 p-7 sm:p-10`}
            >
              <p className="text-small text-muted">On the side</p>
              <p className="mt-2 inline-flex items-center gap-2 font-display text-h3 font-bold">
                Founder, Kente HQ
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className="text-subtle transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </p>
              <p className="mt-3 max-w-[34ch] text-small text-muted">
                Small products for businesses: sponsor escrow, WhatsApp invoices,
                zoning alerts and more.
              </p>
              <span className="sr-only"> (opens in a new tab)</span>

              <div aria-hidden className="relative mt-auto h-32 sm:h-36">
                {kente.map((p, i) => (
                  <div
                    key={p.id}
                    className={`absolute bottom-[-30%] left-1/2 w-[58%] max-w-64 overflow-hidden rounded-xl shadow-[0_20px_40px_-16px_hsl(var(--shadow)/0.6)] ring-1 ring-white/10 transition-transform duration-700 ease-out ${fan[i]}`}
                  >
                    <Image
                      src={p.imageSrc}
                      alt=""
                      width={p.imageWidth}
                      height={p.imageHeight}
                      sizes="256px"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </a>
          </div>

          <div className={`${shell} lg:col-span-6`}>
            <div className={`${core} justify-between gap-8 p-7 sm:p-10`}>
              <p className="text-small text-muted">Local time in Accra</p>
              <p className="font-display text-[clamp(4.5rem,2.8rem+5vw,8rem)] font-extrabold leading-[0.82] tracking-[-0.055em]">
                <AccraClock />
              </p>
              <p className="max-w-[38ch] text-body text-muted">
                GMT all year, so my working day overlaps with London and the New
                York morning.
              </p>
            </div>
          </div>

          <div className={`${shell} lg:col-span-6`}>
            <div className={`${core} justify-between gap-8 bg-[linear-gradient(160deg,var(--surface-strong),transparent_70%)] p-7 sm:p-10`}>
              <p className="text-small text-muted">Outside work</p>
              <p className="font-display text-[clamp(3rem,1.8rem+4vw,6rem)] font-bold leading-[0.9] tracking-[-0.045em]">
                Writing
                <br />a novel<span className="text-accent">.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
