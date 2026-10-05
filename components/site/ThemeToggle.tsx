"use client";

import { useState } from "react";
import { CircleHalfTilt } from "@phosphor-icons/react";

type Theme = "light" | "dark";

function resolvedTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  // Drives the icon's half-turn; purely visual feedback that the press landed.
  const [turns, setTurns] = useState(0);

  function toggle() {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Private mode or blocked storage: the choice just won't persist.
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
    setTurns((t) => t + 1);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch color theme"
      title="Switch color theme"
      className="grid size-9 place-items-center rounded-full text-muted transition-[color,transform] duration-150 ease-out hover:text-fg active:scale-[0.94]"
    >
      <CircleHalfTilt
        size={18}
        weight="regular"
        aria-hidden
        className="transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        style={{ transform: `rotate(${turns * 180}deg)` }}
      />
    </button>
  );
}
