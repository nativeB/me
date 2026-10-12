import { stackGroups } from "@/data/site";
import StackMarquee from "./StackMarquee";

export default function StackSection() {
  const items = stackGroups.flatMap((g) => g.items);

  return (
    <section aria-labelledby="stack-heading" className="pb-32 md:pb-48">
      <h2
        id="stack-heading"
        className="reveal mx-auto mb-8 max-w-360 px-4 font-mono text-meta uppercase tracking-[0.2em] text-subtle sm:px-6 lg:px-10"
      >
        Tools I reach for
      </h2>
      <StackMarquee items={items} />
    </section>
  );
}
