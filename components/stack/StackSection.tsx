import { stackGroups } from "@/data/site";

export default function StackSection() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 md:pb-32 lg:px-8"
    >
      <div className="rounded-[20px] bg-surface p-6 sm:p-10 lg:p-14">
        <h2 id="stack-heading" className="reveal text-h3 font-medium">
          Tools I reach for
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-14">
          {stackGroups.map((group) => (
            <div key={group.label} className="reveal-late">
              <h3 className="font-mono text-meta text-subtle">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-body text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
