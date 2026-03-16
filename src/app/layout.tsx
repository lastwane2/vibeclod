import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
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
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69b7b9891099141c34e3f8f9/1jjqqpg8u';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
