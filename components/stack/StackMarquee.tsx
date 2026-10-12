"use client";

import { Fragment, useRef } from "react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Asterisk } from "@phosphor-icons/react";

// Drift speed in percent of one copy of the track per second.
const BASE_SPEED = 2.4;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * The toolbox as one continuous band. It drifts on its own and couples to the
 * page: scrolling faster speeds it up, scrolling back reverses it. Under
 * reduced motion it is a still, wrapped list.
 */
export default function StackMarquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1000, 0, 1000], [-5, 0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    const b = boost.get();
    if (b < -0.05) direction.current = 1;
    else if (b > 0.05) direction.current = -1;
    const step = BASE_SPEED * (delta / 1000) * (1 + Math.abs(b));
    baseX.set(baseX.get() + direction.current * step);
  });

  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span
            className={`whitespace-nowrap px-[0.35em] ${i % 2 ? "text-subtle" : "text-fg"}`}
          >
            {item}
          </span>
          <Asterisk weight="bold" className="size-[0.42em] shrink-0 text-accent" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={ref}>
      {/* The real list. Visually it only appears under reduced motion; the
          switch is CSS so server and client render the same tree. */}
      <ul className="sr-only motion-reduce:not-sr-only motion-reduce:mx-auto motion-reduce:flex motion-reduce:max-w-360 motion-reduce:flex-wrap motion-reduce:gap-x-8 motion-reduce:gap-y-2 motion-reduce:px-4 motion-reduce:font-display motion-reduce:text-h3 motion-reduce:font-bold sm:motion-reduce:px-6 lg:motion-reduce:px-10">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="overflow-clip py-4 motion-reduce:hidden font-display text-[clamp(3rem,1.8rem+5.4vw,8.5rem)] font-bold leading-none tracking-[-0.045em] select-none"
      >
        <m.div className="flex w-max" style={{ x }}>
          {track}
          {track}
        </m.div>
      </div>
    </div>
  );
}
