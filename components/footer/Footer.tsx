import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-8 text-meta text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>Built with Next.js and Framer Motion</p>
      </div>
    </footer>
  );
}
