import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "vibeclod — Duolingo, but for vibe coding",
  description:
    "Learn to build real software products with AI. 25 hands-on levels. Real repos. Ship or don't level up.",
  keywords: [
    "vibe coding",
    "learn to code with AI",
    "coding bootcamp",
    "build with AI",
    "duolingo for coding",
  ],
  openGraph: {
    title: "vibeclod — Duolingo, but for vibe coding",
    description: "25 hands-on levels. Real repos. Ship or don't level up.",
    url: "https://vibeclod.com",
    siteName: "vibeclod",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibeclod — Duolingo, but for vibe coding",
    description: "25 hands-on levels. Real repos. Ship or don't level up.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
