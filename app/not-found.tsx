import Link from "next/link";
import KineticName from "@/components/hero/KineticName";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-360 flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-10"
    >
      <h1 className="font-display text-[min(38vw,22rem)] leading-[0.86] tracking-[-0.05em]">
        <span className="sr-only">Page not found (404)</span>
        <KineticName lines={[{ text: "404" }]} />
      </h1>
      <p
        className="enter-fade mt-8 max-w-[44ch] text-lead text-muted"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        This page doesn&rsquo;t exist. The link may be old, or the address
        mistyped.
      </p>
      <Link
        href="/"
        className="enter-fade mt-10 inline-flex h-11 items-center self-start rounded-full border border-line-strong px-5 text-small font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-surface active:scale-[0.97]"
        style={{ "--i": 5 } as React.CSSProperties}
      >
        Back home
      </Link>
    </main>
  );
}
