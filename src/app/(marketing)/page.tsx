"use client";

import Link from "next/link";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { WORLDS, LEVELS } from "@/lib/levels";
import { trackLandingCTA } from "@/lib/analytics";

// ─── Scroll Reveal ──────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Island Nav ─────────────────────────────────────────────

function IslandNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl">
      <div
        className={`flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-500 ${
          scrolled
            ? "bg-[#18181B]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/[0.1] ring-1 ring-white/[0.05]"
            : "bg-[#18181B]/50 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-white/[0.06]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          backdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="vibeclod" className="h-7 w-7" />
          <span className="font-pixel text-[10px] text-white/80">
            vibeclod
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          <a href="#demo" className="text-sm text-white/40 hover:text-white/80 transition-colors hidden sm:block px-2 py-1">
            Levels
          </a>
          <a href="#path" className="text-sm text-white/40 hover:text-white/80 transition-colors hidden sm:block px-2 py-1">
            Curriculum
          </a>
          <a href="#pricing" className="text-sm text-white/40 hover:text-white/80 transition-colors hidden sm:block px-2 py-1">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-white/40 hover:text-white/80 transition-colors hidden sm:block px-2 py-1">
            FAQ
          </a>
          <Link
            href="/login"
            onClick={() => trackLandingCTA("nav_start_free")}
            className="rounded-xl bg-[#E8A445] px-4 py-2 text-sm font-bold text-white hover:brightness-110 transition-all min-h-[40px] flex items-center shadow-lg shadow-[#E8A445]/20 ml-2"
          >
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Avatars + Stars ────────────────────────────────────────

const FOUNDER_AVATARS = [
  "/images/founder-1.jpg",
  "/images/founder-2.jpg",
  "/images/founder-3.jpg",
];

function SocialProof() {
  return (
    <div className="flex items-center gap-3 mt-6">
      <div className="flex -space-x-2">
        {FOUNDER_AVATARS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#09090B]"
          />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-white/40">
          <span className="font-semibold text-white/70">12</span> non-tech founders shipped their first startup
        </span>
      </div>
    </div>
  );
}

// ─── Tech Stack Logos ────────────────────────────────────────

function TechLogos() {
  return (
    <div className="relative w-full h-[280px] sm:h-[440px] rounded-3xl bg-white overflow-hidden">
      {/* Claude — center, biggest */}
      <img
        src="/images/stack/claude.png"
        alt="Claude"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 object-contain w-[6rem] h-[6rem] sm:w-[11rem] sm:h-[11rem]"
        style={{ animation: "float 6s ease-in-out infinite" }}
      />

      {/* Scattered tighter around center */}
      <img
        src="/images/stack/nextjs.png"
        alt="Next.js"
        className="absolute object-contain w-[3.5rem] h-[3.5rem] sm:w-[7rem] sm:h-[7rem] top-[8%] left-[8%] sm:left-[12%]"
        style={{ animation: "float 7s ease-in-out infinite 0.3s" }}
      />
      <img
        src="/images/stack/react.webp"
        alt="React"
        className="absolute object-contain w-[4rem] h-[4rem] sm:w-[8rem] sm:h-[8rem] top-[5%] right-[6%] sm:right-[10%]"
        style={{ animation: "float 5.5s ease-in-out infinite 1s" }}
      />
      <img
        src="/images/stack/tailwind.svg"
        alt="Tailwind"
        className="absolute object-contain w-[3.5rem] h-[3.5rem] sm:w-[7rem] sm:h-[7rem] bottom-[18%] left-[4%] sm:bottom-[20%] sm:left-[6%]"
        style={{ animation: "float 6.5s ease-in-out infinite 0.7s" }}
      />
      <img
        src="/images/stack/cursor.png"
        alt="Cursor"
        className="absolute object-contain w-[3.5rem] h-[3.5rem] sm:w-[7rem] sm:h-[7rem] top-[38%] right-[2%] sm:top-[35%] sm:right-[4%]"
        style={{ animation: "float 5s ease-in-out infinite 1.5s" }}
      />
      <img
        src="/images/stack/supabase.png"
        alt="Supabase"
        className="absolute object-contain w-[3.5rem] h-[3.5rem] sm:w-[7.5rem] sm:h-[7.5rem] bottom-[4%] left-[18%] sm:bottom-[6%] sm:left-[22%]"
        style={{ animation: "float 7.5s ease-in-out infinite 0.5s" }}
      />
      <img
        src="/images/stack/vercel.png"
        alt="Vercel"
        className="absolute object-contain w-[3.5rem] h-[3.5rem] sm:w-[7rem] sm:h-[7rem] bottom-[6%] right-[8%] sm:bottom-[8%] sm:right-[12%]"
        style={{ animation: "float 6s ease-in-out infinite 2s" }}
      />
    </div>
  );
}

// ─── Data ───────────────────────────────────────────────────

const WITHOUT_VC = [
  "3 months watching tutorials, no product",
  "Overwhelmed by React, Node, databases...",
  "Built a to-do app. Nobody cares.",
  "Auth tutorial broke everything",
  'Still "learning" — zero revenue',
];

const WITH_VC = [
  "Structured path — every step in the right order",
  "Day 2: first page live on GitHub",
  "Day 5: database + CRUD working",
  "Day 8: auth + payments integrated",
  "Day 12: live SaaS, real users paying",
];

const WHAT_YOU_BUILD = [
  { world: "World 0–1", label: "Foundation", result: "Landing page + GitHub workflow", icon: "🌱", color: "#22C55E" },
  { world: "World 2", label: "Real Data", result: "App with database + CRUD", icon: "🗄️", color: "#3B82F6" },
  { world: "World 3", label: "Users", result: "Auth + protected routes", icon: "🔐", color: "#8B5CF6" },
  { world: "World 4", label: "Money", result: "Stripe payments + gating", icon: "💰", color: "#E8A445" },
  { world: "World 5", label: "Launch", result: "SEO + polish + ship to real users", icon: "🚀", color: "#EF4444" },
];

const FAQS = [
  { q: "Do I need to know how to code?", a: "No. That's the whole point. You'll learn to build products using AI tools — Claude, Cursor, ChatGPT. The AI writes most of the code. You learn to direct it." },
  { q: "What AI tools can I use?", a: "Any. Claude, ChatGPT, Cursor, Copilot, Windsurf — whatever you prefer. vibeclod teaches the skill of working with AI, not any specific tool." },
  { q: "Is this a monthly subscription?", a: "No. $29 is a one-time payment — lifetime access to all current and future content. It was $49 last week. No recurring charges, ever." },
  { q: "What do I actually build?", a: "Real projects on your real GitHub account. By level 22, you'll have built and deployed a full SaaS with auth, database, payments, and real users." },
  { q: "How is this different from a course?", a: "Courses show you what to do. vibeclod gives you a mission and checks if you did it. Your code gets verified against your actual GitHub repo, then AI reviews quality." },
  { q: "What if I get stuck?", a: "Every level has theory, prompt patterns, and hints. You learn the concept before you build. And the whole point is to use AI tools — they help you when you're stuck." },
];

// ─── Page ───────────────────────────────────────────────────

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] overflow-hidden relative">
      <IslandNav />

      {/* ── Background Grid ──────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── HERO ────────────────────────────────────── */}
      <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left — text */}
            <div>
              <Reveal>
                <span className="font-pixel text-[10px] text-[#E8A445] uppercase tracking-wider">
                  learn to ship software with AI
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mt-4 mb-6">
                  Ship your first
                  <br />
                  <span className="bg-gradient-to-r from-[#E8A445] via-[#F59E0B] to-[#E8A445] bg-clip-text text-transparent">
                    startup.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base sm:text-lg text-white/40 leading-relaxed mb-8 max-w-lg">
                  23 hands-on missions. Build a real SaaS with AI&nbsp;tools.
                  Push code to GitHub. AI reviews every commit.
                  No coding skills needed.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <Link
                  href="/login"
                  onClick={() => trackLandingCTA("hero_start_building")}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8A445] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#E8A445]/25 hover:shadow-[#E8A445]/40 hover:brightness-110 transition-all active:scale-[0.98] min-h-[48px]"
                >
                  Start Building — Free
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </Reveal>

              <Reveal delay={400}>
                <SocialProof />
              </Reveal>
            </div>

            {/* Right — tech logos scattered */}
            <Reveal delay={200}>
              <TechLogos />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ────────────────────────────── */}
      <section id="testimonial" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Quote */}
                <div>
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
                    &ldquo;Zero coding experience. I just followed the missions
                    and used AI to build everything. 8 weeks later — live SaaS,
                    real users, $8,100/mo in revenue.
                    vibeclod gave me a step-by-step path when I had no idea where to start.&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <img src="/images/testimonial-avatar.jpg" alt="Daniel K." className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
                    <div>
                      <p className="text-sm font-semibold text-white/90">Daniel K.</p>
                      <p className="text-xs text-white/40">Non-tech founder</p>
                    </div>
                  </div>
                </div>

                {/* Revenue screenshot */}
                <div className="rounded-xl overflow-hidden border border-white/[0.08]">
                  <img
                    src="/images/testimonial-revenue.png"
                    alt="$8,142 MRR dashboard"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMPARISON ─────────────────────────────── */}
      <section id="comparison" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-pixel text-[10px] text-[#E8A445] uppercase tracking-wider">
                the difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
                Your first startup
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg">😵</span>
                  <p className="text-sm font-bold uppercase tracking-wider text-red-400/70">
                    Without vibeclod
                  </p>
                </div>
                <div className="space-y-4">
                  {WITHOUT_VC.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-white/30">
                      <span className="text-red-400/50 mt-0.5 shrink-0">✕</span>
                      <span className="text-sm line-through decoration-white/10">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <p className="text-xs text-white/20 italic">Months wasted. No product. No revenue.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-2xl border border-[#22C55E]/15 bg-[#22C55E]/[0.04] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg">🚀</span>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#22C55E]/80">
                    With vibeclod
                  </p>
                </div>
                <div className="space-y-4">
                  {WITH_VC.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-white/70">
                      <span className="text-[#22C55E] mt-0.5 shrink-0">✓</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-[#22C55E]/10">
                  <p className="text-xs text-[#22C55E] font-medium">12 days, not 6 months. Real product. Real money.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LEVEL DEMO — Level 2: Your First Build Prompt ──── */}
      <section id="demo" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="font-pixel text-[10px] text-[#E8A445] uppercase tracking-wider">
                inside vibeclod
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
                This is what a level looks like
              </h2>
              <p className="text-base text-white/40">
                We give you the exact prompt. You paste it. AI builds it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                {/* Level header */}
                <div className="bg-gradient-to-r from-[#22C55E]/20 to-[#22C55E]/5 border-b border-white/[0.06] px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/50">Level 02</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]/60 font-medium">FREE</span>
                    <h3 className="text-base font-bold text-white/90">🤖 AI Builds It</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[66%] rounded-full bg-[#22C55E]" />
                    </div>
                    <span className="text-[10px] text-white/30 font-mono">2/3</span>
                  </div>
                </div>

                {/* Two-panel layout */}
                <div className="flex flex-col sm:flex-row">
                  {/* Sidebar — block list */}
                  <div className="sm:w-48 shrink-0 border-b sm:border-b-0 sm:border-r border-white/[0.06] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-2 mb-2">Blocks</p>
                    {[
                      { icon: "📖", name: "Steal a Design", status: "done" as const, type: "Theory" },
                      { icon: "✏️", name: "Your First Build Prompt", status: "current" as const, type: "Prompt" },
                      { icon: "🔨", name: "Build & Push", status: "locked" as const, type: "Build" },
                    ].map((block) => (
                      <div
                        key={block.name}
                        className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs mb-1 ${
                          block.status === "current"
                            ? "bg-[#E8A445]/10 border border-[#E8A445]/20 text-white/90"
                            : block.status === "done"
                              ? "text-white/40"
                              : "text-white/20 opacity-50"
                        }`}
                      >
                        <span className="shrink-0 text-[11px]">{block.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="block truncate text-[11px]">{block.name}</span>
                        </div>
                        {block.status === "done" && <span className="text-[#22C55E] text-[10px]">✓</span>}
                        {block.status === "current" && <span className="text-[#E8A445] text-[10px]">→</span>}
                        {block.status === "locked" && <span className="text-white/15 text-[10px]">🔒</span>}
                      </div>
                    ))}
                  </div>

                  {/* Main content — prompt block */}
                  <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span>✏️</span>
                      <p className="text-sm font-bold text-white/90">Your First Build Prompt</p>
                      <span className="ml-auto text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">15 XP</span>
                    </div>

                    <p className="text-xs text-white/50 mb-2">Write a prompt that turns your PRD into a working first version.</p>

                    {/* Reference Prompt */}
                    <div className="rounded-lg bg-[#FAF6F0] border border-[#E8E0D4] p-3 mb-2">
                      <p className="text-[9px] font-bold text-[#8B7355] uppercase tracking-wider mb-1">Reference Prompt</p>
                      <p className="text-[11px] text-[#4A3728] whitespace-pre-wrap leading-relaxed">
                        {`Here's my app plan:\n[paste your PRD]\n\nDesign reference: [URL]. I like [what specifically — colors, layout, card style, navigation].\n\nBuild the first version. Next.js 14 + Tailwind + shadcn/ui.\nNo database yet — use hardcoded demo data for now.\nMust work on mobile.\nStart with the main page and one core feature.`}
                      </p>
                    </div>

                    {/* Empty textarea */}
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-3 mb-2 h-16">
                      <p className="text-xs text-white/20">Write your prompt here...<span className="inline-block w-[2px] h-3 bg-[#E8A445] ml-0.5 animate-pulse align-middle" /></p>
                    </div>

                    <button className="w-full rounded-xl bg-[#22C55E] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#22C55E]/20">
                      Evaluate My Prompt →
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-white/20 mt-4">
                This level is free — try it right now
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT YOU'LL BUILD — timeline ──────────── */}
      <section id="path" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-pixel text-[10px] text-[#E8A445] uppercase tracking-wider">
                the path
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
                From zero to a{" "}
                <span className="bg-gradient-to-r from-[#E8A445] to-[#F59E0B] bg-clip-text text-transparent">
                  live product
                </span>
              </h2>
              <p className="text-base text-white/40">
                Each world teaches a real skill. By the end — deployed SaaS with payments.
              </p>
            </div>
          </Reveal>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#22C55E]/40 via-[#3B82F6]/40 to-[#EF4444]/40" />

            <div className="space-y-6">
              {WHAT_YOU_BUILD.map((item, i) => (
                <Reveal key={item.world} delay={i * 80}>
                  <div className="flex gap-4 sm:gap-6 items-start pl-1">
                    <div
                      className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl border border-white/[0.06] bg-white/[0.03] shadow-sm z-10"
                    >
                      {item.icon}
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 flex-1 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>
                          {item.world}
                        </span>
                        <span className="text-[10px] text-white/20">—</span>
                        <span className="text-[10px] text-white/40 font-medium">{item.label}</span>
                      </div>
                      <p className="text-sm font-medium text-white/80">{item.result}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={WHAT_YOU_BUILD.length * 80}>
                <div className="flex gap-4 sm:gap-6 items-start pl-1">
                  <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl border border-[#E8A445]/30 bg-[#E8A445]/10 z-10">
                    🏆
                  </div>
                  <div className="rounded-xl border border-[#E8A445]/20 bg-[#E8A445]/[0.06] p-4 sm:p-5 flex-1">
                    <p className="text-sm font-bold text-[#E8A445]">
                      Result: a live SaaS with real users and payments
                    </p>
                    <p className="text-xs text-white/30 mt-1">On your GitHub. On your domain. Yours.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ─────────────────────────────── */}
      <section id="video" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="font-pixel text-[10px] text-[#E8A445] uppercase tracking-wider">
                see it in action
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
                Watch how it works
              </h2>
              <p className="text-base text-white/40">2 minutes. From zero to your first push.</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mx-auto max-w-3xl aspect-video rounded-2xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center overflow-hidden backdrop-blur-sm">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm text-white/30">Demo video coming soon</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────── */}
      <section id="pricing" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="font-pixel text-[10px] text-[#E8A445] uppercase tracking-wider">
                pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
                One price. Everything. Forever.
              </h2>
              <p className="text-base text-white/40">No subscriptions. No upsells. Pay once, learn forever.</p>
            </div>
          </Reveal>

          {/* Big discount banner */}
          <Reveal delay={50}>
            <div className="max-w-2xl mx-auto mb-8 rounded-2xl bg-gradient-to-r from-[#E8A445]/10 to-[#F59E0B]/10 border border-[#E8A445]/20 p-4 text-center">
              <p className="text-sm text-[#E8A445] font-bold">
                🔥 Launch deal — save $20. Price goes back up soon.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            <Reveal delay={100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 h-full flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Free</p>
                <p className="text-4xl font-bold mb-1">$0</p>
                <p className="text-xs text-white/30 mb-6">Forever. No card needed.</p>
                <ul className="space-y-3 text-sm text-white/60 mb-8 flex-1">
                  {["Worlds 0–1 — 6 levels", "GitHub verification", "AI code review (3/day)", "Streak tracking", "Prompt Toolkit (basic)"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="text-[#22C55E] text-xs shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  onClick={() => trackLandingCTA("pricing_free")}
                  className="block w-full rounded-xl border border-white/10 py-3 text-center text-sm font-semibold text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all min-h-[44px]"
                >
                  Start Free
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative h-full">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#E8A445]/40 to-[#E8A445]/0 pointer-events-none" />
                <div className="relative rounded-2xl bg-[#18181B] p-6 sm:p-8 border border-[#E8A445]/30 h-full flex flex-col">
                  {/* Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#E8A445] px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-[#E8A445]/40">
                      🔥 Save 40%
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E8A445]/70 mb-3 mt-3">Pro — Lifetime Access</p>

                  {/* Giant price block */}
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-5xl sm:text-6xl font-black">$29</span>
                    <div className="flex flex-col">
                      <span className="text-2xl sm:text-3xl text-white/30 line-through font-bold decoration-red-500/60 decoration-[3px]">$49</span>
                      <span className="text-[10px] font-bold text-[#22C55E] uppercase">you save $20</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mb-6">One payment. Yours forever. No subscriptions ever.</p>

                  <ul className="space-y-3 text-sm text-white/70 mb-8 flex-1">
                    {["All 23 levels — 6 worlds", "Unlimited AI reviews", "Boss fights & challenges", "Full Prompt Toolkit", "All future worlds & content", "Lifetime updates — no extra cost"].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="text-[#E8A445] text-xs shrink-0">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/login"
                    onClick={() => trackLandingCTA("pricing_pro")}
                    className="block w-full rounded-xl bg-[#E8A445] py-3.5 text-center font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:shadow-[#E8A445]/50 hover:brightness-110 transition-all min-h-[48px] text-base"
                  >
                    Get Lifetime Access — $29
                  </Link>
                  <p className="text-[10px] text-white/20 text-center mt-3">One payment. Lifetime access. No subscriptions.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section id="faq" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Frequently asked
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto max-w-2xl space-y-2">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-medium text-white/80 text-sm sm:text-base pr-4">{faq.q}</span>
                    <span className="text-white/30 text-lg shrink-0 transition-transform duration-300">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                    <p className="px-5 pb-5 text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section id="cta" className="relative py-20 sm:py-32 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-[#E8A445]/[0.06] rounded-full blur-[120px]" />
        </div>

        <Reveal>
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Stop watching tutorials.
            <br />
            <span className="bg-gradient-to-r from-[#E8A445] to-[#F59E0B] bg-clip-text text-transparent">
              Start shipping.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="relative text-base sm:text-lg text-white/40 mb-8 max-w-md mx-auto">
            Your first level takes 5 minutes. By level 22, you&apos;ll have a
            live product with real users.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <Link
            href="/login"
            onClick={() => trackLandingCTA("footer_start_free")}
            className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8A445] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#E8A445]/25 hover:shadow-[#E8A445]/40 hover:brightness-110 transition-all active:scale-[0.98] min-h-[48px]"
          >
            Start Free — No credit card
            <span>→</span>
          </Link>
        </Reveal>

        <Reveal delay={300}>
          <p className="relative mt-4 text-sm text-white/30">
            First 6 levels free. Then <span className="line-through text-white/20">$49</span>{" "}
            <span className="text-[#E8A445] font-bold">$29</span> one-time for everything.
          </p>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="vibeclod" className="h-5 w-5 opacity-50" />
            <span className="font-pixel text-[8px] text-white/40">vibeclod</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <a href="mailto:support@vibeclod.com" className="hover:text-white/60 transition-colors">support@vibeclod.com</a>
          </div>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
