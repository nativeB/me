"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard blocked (permissions, insecure context): the mailto link still works.
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  // Both labels are stacked in one cell; a short blur cross-fade makes the
  // swap read as a single morph. Fixed width, so nothing around it moves.
  const state = (shown: boolean) =>
    `col-start-1 row-start-1 inline-flex items-center justify-center gap-2 transition-[opacity,filter,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none ${
      shown ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-[3px]"
    }`;

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-grid h-11 w-[8.5rem] place-items-center rounded-full border border-line-strong text-small font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-surface active:scale-[0.97] active:duration-100"
    >
      <span
        aria-hidden={copied}
        className={`${state(!copied)} ${copied ? "-translate-y-1" : ""}`}
      >
        <Copy size={16} aria-hidden />
        Copy email
      </span>
      <span
        aria-hidden={!copied}
        className={`${state(copied)} ${copied ? "" : "translate-y-1"}`}
      >
        <Check size={16} aria-hidden className="text-accent" />
        Copied
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
