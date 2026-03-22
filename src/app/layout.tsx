import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Press_Start_2P } from "next/font/google";
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

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibeclod.com"),
  title: {
    default: "vibeclod — Duolingo, but for vibe coding",
    template: "%s | vibeclod",
  },
  description:
    "Learn to build real software products with AI. 23 hands-on levels across 6 worlds. Real GitHub repos. AI-verified code. Ship or don't level up.",
  keywords: [
    "vibe coding",
    "learn to code with AI",
    "coding bootcamp",
    "build with AI",
    "duolingo for coding",
    "learn vibe coding",
    "AI coding course",
    "non-tech founder",
    "build SaaS with AI",
    "learn to ship products",
    "cursor tutorial",
    "claude code tutorial",
    "vibe coding course",
    "coding for founders",
    "no-code to code",
    "AI-assisted development",
  ],
  authors: [{ name: "vibeclod" }],
  creator: "vibeclod",
  publisher: "vibeclod",
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: "vibeclod — Duolingo, but for vibe coding",
    description:
      "23 hands-on levels. 6 worlds. AI-verified code reviews. Ship real products or don't level up.",
    url: "https://vibeclod.com",
    siteName: "vibeclod",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibeclod — Duolingo, but for vibe coding",
    description:
      "23 hands-on levels. 6 worlds. AI-verified code reviews. Ship real products or don't level up.",
    creator: "@lastwaneX",
    site: "@lastwaneX",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "vibeclod",
      url: "https://vibeclod.com",
      description:
        "Learn to build real software products with AI. 23 hands-on levels across 6 worlds. Real GitHub repos. AI-verified code.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free — 6 levels across 2 worlds",
        },
        {
          "@type": "Offer",
          price: "29",
          priceCurrency: "USD",
          description: "Pro Lifetime — all 23 levels, 6 worlds, unlimited AI reviews",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
        bestRating: "5",
      },
    },
    {
      "@type": "Organization",
      name: "vibeclod",
      url: "https://vibeclod.com",
      logo: "https://vibeclod.com/logo.svg",
      sameAs: ["https://twitter.com/lastwaneX"],
    },
    {
      "@type": "Course",
      name: "Vibe Coding — From Zero to Shipping",
      description:
        "Learn to build and ship real software products using AI tools. 23 hands-on levels, 6 worlds, from idea to payments.",
      provider: {
        "@type": "Organization",
        name: "vibeclod",
        url: "https://vibeclod.com",
      },
      numberOfCredits: 23,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT10H",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics — must be in <head> for Google to detect */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-00T3846XEG" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-00T3846XEG');
            `,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${pressStart.variable} antialiased`}
      >
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
