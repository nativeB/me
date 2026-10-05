import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1200px] flex-col justify-center px-4 pb-24 sm:px-6 lg:px-8"
    >
      <p className="font-mono text-meta text-subtle">404</p>
      <h1 className="mt-4 text-h2 font-semibold">This page doesn&rsquo;t exist.</h1>
      <p className="mt-4 max-w-[44ch] text-body text-muted">
        The link may be old, or the address mistyped.
      </p>
      <Link
        href="/"
        className="mt-8 self-start rounded-full border border-line-strong px-5 py-2.5 text-small font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-surface active:scale-[0.97]"
      >
        Back home
      </Link>
    </main>
  );
}
