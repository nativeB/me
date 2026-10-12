"use client";

import { useEffect, useRef } from "react";

type Line = { text: string; className?: string };

// Resting and peak axis values. Heavy at rest; under the cursor the letters
// thin out and stretch, so the pointer reads as carving light into the name.
const REST_WGHT = 820;
const PEAK_WGHT = 240;
const REST_WDTH = 100;
const PEAK_WDTH = 125;

/**
 * The hero name as individually addressable letters. Each letter rises out of
 * its line on load (CSS), then responds to a fine pointer by interpolating the
 * font's weight and width axes by distance. All writes go straight to the
 * element's style from a rAF loop that sleeps whenever nothing is moving.
 * Decorative: the accessible name lives in the parent heading.
 */
export default function KineticName({ lines }: { lines: Line[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
    const influence = letters.map(() => 0);
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let radius = 200;

    const measure = () => {
      radius = parseFloat(getComputedStyle(root).fontSize) * 1.1;
    };

    const loop = () => {
      raf = 0;
      // Read every rect first, then write every style: one layout per frame.
      const rects = letters.map((el) => el.getBoundingClientRect());
      let settling = false;
      for (let i = 0; i < letters.length; i++) {
        const r = rects[i];
        const dx = px - (r.left + r.width / 2);
        const dy = (py - (r.top + r.height / 2)) * 1.35;
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
        const target = t * t * (3 - 2 * t);
        influence[i] += (target - influence[i]) * 0.14;
        if (Math.abs(target - influence[i]) > 0.002) settling = true;
      }
      for (let i = 0; i < letters.length; i++) {
        const k = influence[i];
        letters[i].style.fontVariationSettings = `"wght" ${(REST_WGHT + (PEAK_WGHT - REST_WGHT) * k).toFixed(1)}, "wdth" ${(REST_WDTH + (PEAK_WDTH - REST_WDTH) * k).toFixed(1)}`;
      }
      if (settling) raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (!visible || e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      kick();
    };

    const onLeave = () => {
      px = py = -1e5;
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) onLeave();
    });
    io.observe(root);

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  let index = 0;
  return (
    <span ref={ref} aria-hidden className="block">
      {lines.map((line) => (
        <span key={line.text} className={`kn-line ${line.className ?? ""}`}>
          {Array.from(line.text).map((ch, j) => (
            <span
              key={j}
              data-l
              className="kn-l enter-letter"
              style={{ "--i": index++ } as React.CSSProperties}
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
