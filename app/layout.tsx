import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://me-nativeb.vercel.app";

export const metadata: Metadata = {
  title: "Quincy Hutchison — Senior Frontend Engineer",
  description:
    "Senior frontend engineer with 7+ years building fintech and consumer products. React, Next.js, TypeScript. Based in Accra, open to remote roles.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Quincy Hutchison — Senior Frontend Engineer",
    description:
      "Senior frontend engineer with 7+ years building fintech and consumer products. React, Next.js, TypeScript. Based in Accra, open to remote roles.",
    url: baseUrl,
    siteName: "Quincy Hutchison",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Quincy Hutchison — Senior Frontend Engineer",
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
    title: "Quincy Hutchison — Senior Frontend Engineer",
    description:
      "Senior frontend engineer with 7+ years building fintech and consumer products. React, Next.js, TypeScript. Based in Accra, open to remote roles.",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-[#ededed] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
