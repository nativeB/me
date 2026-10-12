/**
 * First-visit curtain: a count to 100 that lifts off the already-rendered
 * page. Entirely CSS (see .intro in globals.css); it only displays when the
 * pre-paint script marks <html data-intro="play">, and it never takes input.
 */
export default function Intro() {
  return (
    <div aria-hidden className="intro">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-4 pb-8 pt-6 sm:px-6 lg:px-10">
        <p className="intro-name overflow-clip font-display text-small font-semibold tracking-tight">
          <span className="inline-block">Quincy Hutchison</span>
        </p>
        <div>
          <div className="overflow-clip">
            <div className="intro-count font-display text-[clamp(6rem,22vw,20rem)] font-extrabold leading-[0.8] tracking-[-0.06em] tabular-nums" />
          </div>
          <div className="mt-6 h-px bg-line-strong">
            <div className="intro-bar h-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
