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

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Private mode or blocked storage: the choice just won't persist.
      }
    };
    setTurns((t) => t + 1);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("startViewTransition" in document)) {
      apply();
      return;
    }

    // The new theme grows out of the toggle as a circle. Keyboard presses have
    // no pointer position, so they start from the button's centre.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 700,
            easing: "cubic-bezier(0.77, 0, 0.175, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch color theme"
      title="Switch color theme"
      className="grid size-10 place-items-center rounded-full text-muted transition-[color,background-color,transform] duration-150 ease-out hover:bg-surface hover:text-fg active:scale-[0.94]"
    >
      <CircleHalfTilt
        size={18}
        weight="regular"
        aria-hidden
        className="transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `rotate(${turns * 180}deg)` }}
      />
    </button>
  );
}
