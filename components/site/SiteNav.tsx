"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

type SectionId = (typeof links)[number]["id"];

/**
 * A floating glass pill. It tucks away while reading downward and returns the
 * moment the visitor scrolls up, with a hairline of scroll progress along its
 * bottom edge (CSS scroll timeline, no JS per frame).
 */
export default function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [activeOnHome, setActiveOnHome] = useState<SectionId | null>(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const last = useRef(0);

  // Only flips state when the direction actually changes, not every frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - last.current;
    last.current = y;
    if (Math.abs(delta) < 6) return;
    const next = delta > 0 && y > 240;
    setHidden((h) => (h === next ? h : next));
  });

  // Track which section sits in the middle band of the viewport.
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = links.find((l) => visible.get(l.id));
        setActiveOnHome(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const active: SectionId | null = pathname.startsWith("/work")
    ? "work"
    : pathname === "/"
      ? activeOnHome
      : null;

  return (
    <m.header
      initial={false}
      animate={{ transform: hidden && !reduce ? "translateY(-140%)" : "translateY(0%)" }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
      // Keyboard focus inside a tucked-away bar brings it back into view.
      onFocus={() => setHidden(false)}
      className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-5"
    >
      <nav
        aria-label="Primary"
        className="enter-fade relative flex h-12 items-center gap-1 overflow-clip rounded-full border border-line bg-bg/70 py-1 pl-4 pr-1 shadow-[0_10px_40px_-12px_hsl(var(--shadow)/0.35),inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl backdrop-saturate-150 sm:pl-5"
        style={{ "--i": 9 } as React.CSSProperties}
      >
        <Link
          href="/"
          className="mr-1 rounded-md font-display text-small font-semibold tracking-tight text-fg sm:mr-3"
        >
          <span className="sm:hidden">QH</span>
          <span className="hidden sm:inline">Quincy Hutchison</span>
        </Link>

        <ul className="flex items-center">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="relative">
                {isActive && (
                  <m.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-surface-strong"
                    transition={
                      reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.15 }
                    }
                  />
                )}
                <Link
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block rounded-full px-3 py-1.5 text-small transition-colors duration-200 ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />

        <span
          aria-hidden
          className="scroll-progress pointer-events-none absolute inset-x-5 bottom-0 hidden h-px bg-accent supports-[animation-timeline:scroll()]:block motion-reduce:hidden"
        />
      </nav>
    </m.header>
  );
}
