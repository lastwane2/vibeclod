"use client";

import Link from "next/link";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { WORLDS, LEVELS } from "@/lib/levels";

// ─── Typewriter ─────────────────────────────────────────────

const TYPED_WORDS = ["products.", "SaaS.", "startups.", "your idea."];

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPED_WORDS[wordIdx];

    if (!deleting && display === word) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (deleting && display === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPED_WORDS.length);
      return;
    }

    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      setDisplay(
        deleting
          ? word.slice(0, display.length - 1)
          : word.slice(0, display.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [display, deleting, wordIdx]);

  return display;
}

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

// ─── Data ───────────────────────────────────────────────────

const DOESNT_WORK = [
  "Watching 10-hour YouTube tutorials",
  "Following along in sandboxes",
  "Reading docs hoping it clicks",
  "Copy-pasting from Stack Overflow",
  "Asking AI to explain code you'll never write",
];

const DOES_WORK = [
  "Get a clear mission with a real goal",
  "Build it with Claude, Cursor, or any AI",
  "Push real code to your actual GitHub repo",
  "AI reviews your code for quality",
  "Level up → unlock the next mission",
];

const STEPS = [
  {
    num: "01",
    title: "Get your mission",
    desc: "Each level gives you a specific build task. Learn the concept, study the prompt pattern, then go build it.",
    icon: "📋",
    color: "#E8A445",
  },
  {
    num: "02",
    title: "Build & push",
    desc: "Use any AI tool — Claude, Cursor, Copilot. Build the feature. Push to your real GitHub repo.",
    icon: "⚡",
    color: "#3B82F6",
  },
  {
    num: "03",
    title: "Get reviewed",
    desc: "We check your actual code via GitHub API. AI reviews quality. Pass → XP + next level. Fail → feedback + retry.",
    icon: "✓",
    color: "#22C55E",
  },
];

const DEMO_BLOCKS = [
  { icon: "📖", name: "What is Vibe Coding?", status: "done", xp: 10 },
  { icon: "📚", name: "The Basic Prompt Pattern", status: "done", xp: 15 },
  { icon: "✏️", name: "Write your first AI prompt", status: "current", xp: 20 },
  { icon: "🔨", name: "Push index.html to GitHub", status: "locked", xp: 30 },
  { icon: "📖", name: "What You Just Built", status: "locked", xp: 10 },
];

const FAQS = [
  {
    q: "Do I need to know how to code?",
    a: "No. That's the whole point. You'll learn to build products using AI tools — Claude, Cursor, ChatGPT. The AI writes most of the code. You learn to direct it.",
  },
  {
    q: "What AI tools can I use?",
    a: "Any. Claude, ChatGPT, Cursor, Copilot, Windsurf — whatever you prefer. vibeclod teaches the skill of working with AI, not any specific tool.",
  },
  {
    q: "Is this a monthly subscription?",
    a: "No. $29 one-time payment for lifetime access to all current and future content. No recurring charges. Ever.",
  },
  {
    q: "What do I actually build?",
    a: "Real projects on your real GitHub account. By level 40, you'll have built and deployed a full product with auth, database, payments, and real users.",
  },
  {
    q: "How is this different from a course?",
    a: "Courses show you what to do. vibeclod gives you a mission and checks if you did it. Your code gets verified against your actual GitHub repo, then AI reviews quality.",
  },
];

// ─── Page ───────────────────────────────────────────────────

export default function LandingPage() {
  const typed = useTypewriter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] overflow-hidden">
      {/* ── Ambient background ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#E8A445]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-[60%] -right-40 w-[500px] h-[500px] bg-[#3B82F6]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-[#9B6EC6]/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="vibeclod" className="h-7 w-7" />
            <span className="font-pixel text-[10px] text-white/80">
              vibeclod
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#E8A445]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A445] animate-pulse" />
              49 spots left
            </div>
            <a
              href="#pricing"
              className="text-sm text-white/40 hover:text-white/70 transition-colors hidden sm:block"
            >
              Pricing
            </a>
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#09090B] hover:bg-white/90 transition-colors min-h-[44px] flex items-center"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 pt-20 sm:pt-32 pb-16 sm:pb-24 text-center">
          {/* Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A445]/20 bg-[#E8A445]/[0.08] px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-xs font-medium text-[#E8A445]">
                Early Bird — $29 Lifetime · 49 of 200 spots left
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              Learn to{" "}
              <span className="bg-gradient-to-r from-[#E8A445] via-[#F59E0B] to-[#E8A445] bg-clip-text text-transparent">
                vibe code.
              </span>
              <br />
              <span className="text-white/30">Ship </span>
              <span className="text-white">{typed}</span>
              <span className="animate-pulse text-[#E8A445] ml-0.5">|</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto max-w-lg text-base sm:text-lg text-white/40 leading-relaxed mb-10">
              30 missions. 9 worlds. Push real code to GitHub.
              <br className="hidden sm:block" />
              AI reviews every commit. Ship a real product or don&apos;t level
              up.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="group w-full sm:w-auto rounded-xl bg-[#E8A445] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#E8A445]/20 hover:shadow-[#E8A445]/40 hover:brightness-110 transition-all active:scale-[0.98] min-h-[48px] flex items-center justify-center gap-2"
              >
                Start Building — Free
                <span className="group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-medium text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all min-h-[48px] flex items-center justify-center"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={400}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-white/30">
              <span className="flex items-center gap-1.5">
                <span className="text-[#E8A445]">★★★★★</span>
                <span className="text-white/50">4.9/5</span>
              </span>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <span>
                <span className="text-white/50 font-medium">500+</span>{" "}
                builders
              </span>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <span>No credit card needed</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.02] py-4 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-4 text-sm text-white/25 shrink-0"
            >
              <span>🎯 Real GitHub repos</span>
              <span className="text-white/10">·</span>
              <span>🤖 AI code reviews</span>
              <span className="text-white/10">·</span>
              <span>🔥 Daily streaks</span>
              <span className="text-white/10">·</span>
              <span>⚡ 40 hands-on levels</span>
              <span className="text-white/10">·</span>
              <span>🚀 From zero to deployed</span>
              <span className="text-white/10">·</span>
              <span>💰 Build a product with payments</span>
              <span className="text-white/10">·</span>
              <span>📚 Learn prompt patterns</span>
              <span className="text-white/10">·</span>
              <span>🏆 Boss fights every 5 levels</span>
              <span className="text-white/10">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM vs SOLUTION ─────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              You&apos;ve tried{" "}
              <span className="text-white/30 line-through decoration-white/20">
                learning to code
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/40">
              Here&apos;s why it didn&apos;t stick — and what actually works.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 h-full">
              <p className="text-xs font-bold uppercase tracking-wider text-red-400/70 mb-6">
                What doesn&apos;t work
              </p>
              <div className="space-y-4">
                {DOESNT_WORK.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-white/30"
                  >
                    <span className="text-red-400/50 mt-0.5 shrink-0">✕</span>
                    <span className="text-sm line-through decoration-white/10">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-[#22C55E]/10 bg-[#22C55E]/[0.03] p-6 sm:p-8 h-full">
              <p className="text-xs font-bold uppercase tracking-wider text-[#22C55E]/70 mb-6">
                What vibeclod does
              </p>
              <div className="space-y-4">
                {DOES_WORK.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <span className="text-[#22C55E] mt-0.5 shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────── */}
      <section id="how-it-works" className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Three steps. Every level.
            </h2>
            <p className="text-base sm:text-lg text-white/40">
              No setup. No config. Just build.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: `${step.color}99` }}
                  >
                    Step {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white/90 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── LEVEL DEMO ──────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              This is what a level looks like
            </h2>
            <p className="text-base sm:text-lg text-white/40">
              Each level has 3–6 blocks. Theory, prompts, building,
              verification.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden">
              {/* Header */}
              <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#E8A445]" />
                    <span className="font-mono text-xs text-white/40">
                      LEVEL 01
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">Your First Page</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/30">World 1</p>
                  <p className="text-xs text-[#E8A445] font-medium">85 XP</p>
                </div>
              </div>

              {/* Blocks */}
              <div className="p-4 space-y-2">
                {DEMO_BLOCKS.map((block) => (
                  <div
                    key={block.name}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      block.status === "current"
                        ? "bg-[#E8A445]/10 border border-[#E8A445]/20"
                        : block.status === "done"
                          ? "bg-white/[0.03]"
                          : "bg-white/[0.01] opacity-50"
                    }`}
                  >
                    <span className="text-base shrink-0">{block.icon}</span>
                    <span
                      className={`text-sm flex-1 ${
                        block.status === "locked"
                          ? "text-white/30"
                          : "text-white/80"
                      }`}
                    >
                      {block.name}
                    </span>
                    <span className="text-xs shrink-0">
                      {block.status === "done" && (
                        <span className="text-[#22C55E]">✓</span>
                      )}
                      {block.status === "current" && (
                        <span className="text-[#E8A445] font-medium">→</span>
                      )}
                      {block.status === "locked" && (
                        <span className="text-white/20">🔒</span>
                      )}
                    </span>
                    <span className="text-[10px] text-white/20 font-mono shrink-0">
                      {block.xp} XP
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="border-t border-white/[0.06] px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[40%] rounded-full bg-[#E8A445]" />
                  </div>
                  <span className="text-xs text-white/30">2/5</span>
                </div>
                <span className="text-xs text-white/20">25 XP earned</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── THE JOURNEY ─────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              9 worlds. One product.
            </h2>
            <p className="text-base sm:text-lg text-white/40">
              Each world builds on the last. By the end, you have a live, paying
              product.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WORLDS.map((world, i) => {
            const levelCount = LEVELS.filter(
              (l) => l.worldId === world.id
            ).length;
            return (
              <Reveal key={world.id} delay={i * 75}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{world.icon}</span>
                    {world.requiredPlan === "PRO" && (
                      <span className="text-[9px] font-bold text-[#E8A445] bg-[#E8A445]/10 px-1.5 py-0.5 rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white/90 mb-1">
                    {world.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed mb-3">
                    {world.subtitle}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: levelCount }).map((_, j) => (
                        <div
                          key={j}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              world.id === 1 && j === 0
                                ? world.color
                                : `${world.color}40`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-white/20">
                      {levelCount} levels
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────── */}
      <section id="pricing" className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Simple pricing
            </h2>
            <p className="text-base sm:text-lg text-white/40">
              10 levels free. Unlock everything with one payment.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {/* Free */}
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 h-full flex flex-col">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                Free
              </p>
              <p className="text-4xl font-bold mb-1">$0</p>
              <p className="text-xs text-white/30 mb-6">
                Forever. No card needed.
              </p>
              <ul className="space-y-3 text-sm text-white/60 mb-8 flex-1">
                {[
                  "Worlds 1–2 — 10 levels",
                  "GitHub verification",
                  "AI code review (3/day)",
                  "Streak tracking",
                  "Prompt Toolkit (basic)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="text-[#22C55E] text-xs shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block w-full rounded-xl border border-white/10 py-3 text-center text-sm font-semibold text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all min-h-[44px]"
              >
                Start Free
              </Link>
            </div>
          </Reveal>

          {/* Pro */}
          <Reveal delay={200}>
            <div className="relative h-full">
              {/* Gradient border glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#E8A445]/30 to-[#E8A445]/0 pointer-events-none" />

              <div className="relative rounded-2xl bg-[#18181B] p-6 sm:p-8 border border-[#E8A445]/20 h-full flex flex-col">
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#E8A445] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-[#E8A445]/30">
                    ★ Most Popular
                  </span>
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-[#E8A445]/70 mb-2 mt-2">
                  Pro — Lifetime
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-white/20 text-sm line-through">
                    $79
                  </span>
                </div>
                <p className="text-xs text-white/30 mb-6">
                  One-time. Forever. No subscriptions.
                </p>
                <ul className="space-y-3 text-sm text-white/70 mb-8 flex-1">
                  {[
                    "All 30 levels — 9 worlds",
                    "Unlimited AI reviews",
                    "Boss fights & challenges",
                    "Full Prompt Toolkit",
                    "Discord community",
                    "All future worlds & content",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="text-[#E8A445] text-xs shrink-0">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="block w-full rounded-xl bg-[#E8A445] py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#E8A445]/25 hover:brightness-110 transition-all min-h-[44px]"
                >
                  Unlock Everything — $29
                </Link>
                <p className="text-center text-[10px] text-white/20 mt-3">
                  49 of 200 early bird spots left
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
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
                  <span className="font-medium text-white/80 text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <span className="text-white/30 text-lg shrink-0 transition-transform duration-300">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-white/40 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="relative mx-auto max-w-4xl px-4 py-20 sm:py-32 text-center">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-[#E8A445]/[0.06] rounded-full blur-[100px]" />
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
            Your first level takes 5 minutes. By level 40, you&apos;ll have a
            live product with paying users.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <Link
            href="/login"
            className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8A445] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#E8A445]/20 hover:shadow-[#E8A445]/40 hover:brightness-110 transition-all active:scale-[0.98] min-h-[48px]"
          >
            Start Free — No credit card
            <span>→</span>
          </Link>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="vibeclod"
              className="h-5 w-5 opacity-50"
            />
            <span className="font-pixel text-[8px] text-white/40">
              vibeclod
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-white/60 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/60 transition-colors"
            >
              Terms
            </Link>
            <a
              href="mailto:support@vibeclod.com"
              className="hover:text-white/60 transition-colors"
            >
              support@vibeclod.com
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
