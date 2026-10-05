"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

type SectionId = (typeof links)[number]["id"];

export default function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [activeOnHome, setActiveOnHome] = useState<SectionId | null>(null);

  // Track which section sits in the middle band of the viewport.
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          visible.set(entry.target.id, entry.isIntersecting);
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
    <header className="sticky top-0 z-40">
      {/* Material appears once content scrolls under the bar (CSS scroll timeline). */}
      <div
        aria-hidden
        className="nav-material absolute inset-0 border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
      />
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="-ml-1 rounded-md px-1 text-small font-medium tracking-tight text-fg"
        >
          <span className="sm:hidden">Quincy H.</span>
          <span className="hidden sm:inline">Quincy Hutchison</span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
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
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", duration: 0.45, bounce: 0.15 }
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
        </div>
      </nav>
    </header>
  );
}
