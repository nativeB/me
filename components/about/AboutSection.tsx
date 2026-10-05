import { about } from "@/data/site";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 border-t border-line"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <h2 id="about-heading" className="reveal text-h2 font-semibold lg:col-span-4">
          About
        </h2>

        <div className="lg:col-span-8">
          <p className="reveal max-w-[30ch] text-h3 font-medium text-fg sm:text-lead sm:max-w-[34ch]">
            {about.lead}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-5">
              {about.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="reveal-late text-body text-muted">
                  {text}
                </p>
              ))}
            </div>

            <dl className="reveal-late flex flex-col self-start">
              {about.facts.map(({ term, detail }) => (
                <div
                  key={term}
                  className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-line py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="font-mono text-meta text-subtle">{term}</dt>
                  <dd className="text-small text-fg">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
