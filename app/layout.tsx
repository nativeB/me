import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNav from "@/components/site/SiteNav";
import MotionProvider from "@/components/motion/MotionProvider";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Only used for small metadata below the fold; don't compete with the hero.
  preload: false,
});

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  title,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/images/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

// Runs before first paint so a stored theme choice never flashes the wrong palette.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-small focus:text-bg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteNav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
