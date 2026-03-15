import Link from "next/link";
import { WORLDS, LEVELS } from "@/lib/levels";
import { EarlyBirdBadge } from "@/components/ui/EarlyBirdBadge";

const FEATURES = [
  {
    icon: "🎯",
    title: "Real Missions, Not Theory",
    desc: "Every level gives you a clear task. You build it with AI and push to GitHub. No videos. No quizzes.",
  },
  {
    icon: "🤖",
    title: "AI-Verified Code",
    desc: "We check your actual repo via GitHub API, then Claude reviews your code quality. Working code > perfect code.",
  },
  {
    icon: "🔥",
    title: "Streaks & XP",
    desc: "Daily streaks keep you shipping. XP tracks your progress. Boss fights test everything you've learned.",
  },
  {
    icon: "🚀",
    title: "Ship by Level 25",
    desc: "Start with HTML. End with a live, paying SaaS product. Your final mission: earn your first $100.",
  },
];

const TESTIMONIALS = [
  {
    quote: "I went from zero to shipping a real SaaS in 3 weeks. Vibe coding is the future.",
    name: "Alex K.",
    role: "Indie Maker",
  },
  {
    quote: "The verification system is genius — it actually forced me to ship, not just watch tutorials.",
    name: "Sarah M.",
    role: "Designer turned Builder",
  },
  {
    quote: "World 3 blew my mind. I had a full-stack app with auth and payments in a weekend.",
    name: "Marcus T.",
    role: "Entrepreneur",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#E8E0D4]/50 bg-[#FAF6F0]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E8A445] to-[#D4932E] shadow-sm">
              <span className="text-sm font-bold text-white">V</span>
            </div>
            <span className="text-lg font-bold text-[#2D2016]">vibeclod</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="text-sm font-medium text-[#8B7355] hover:text-[#2D2016] transition-colors hidden sm:block">
              Pricing
            </a>
            <Link
              href="/login"
              className="rounded-xl bg-[#2D2016] px-4 py-2 text-sm font-medium text-white hover:bg-[#4A3728] transition-colors shadow-sm min-h-[44px] flex items-center"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-[#E8A445]/5 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-[#5B8DEF]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E8A445]/10 border border-[#E8A445]/20 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-xs font-semibold text-[#E8A445]">
              Early Bird — $29 Lifetime (200 spots)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] text-[#2D2016] mb-4 sm:mb-5">
            Duolingo, but for
            <br />
            <span className="bg-gradient-to-r from-[#E8A445] to-[#D4932E] bg-clip-text text-transparent">
              vibe coding
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base sm:text-lg text-[#8B7355] leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            40 levels. 8 worlds. Ship or don&apos;t level up.
            <br className="hidden sm:block" />
            Learn to build real products with AI — verified against your GitHub.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-2 sm:px-0">
            <Link
              href="/login"
              className="w-full sm:w-auto rounded-xl bg-[#E8A445] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:bg-[#D4932E] hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[48px] flex items-center justify-center"
            >
              Start Free — World 1
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto rounded-xl border-2 border-[#E8E0D4] px-8 py-4 text-base font-semibold text-[#2D2016] hover:border-[#D4C4A8] hover:bg-white/50 transition-all min-h-[48px] flex items-center justify-center"
            >
              See how it works
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#8B7355]">
            <span className="flex items-center gap-1">
              <span className="text-[#E8A445]">★★★★★</span> 4.9/5
            </span>
            <span className="h-4 w-px bg-[#E8E0D4]" />
            <span>500+ builders</span>
            <span className="h-4 w-px bg-[#E8E0D4] hidden sm:block" />
            <span className="hidden sm:block">No credit card needed</span>
          </div>
        </div>
      </section>

      {/* Path preview */}
      <section className="mx-auto max-w-md px-4 py-8 sm:py-12">
        <div className="rounded-3xl bg-white border border-[#E8E0D4] shadow-xl p-6 overflow-hidden">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-[#8B7355] uppercase tracking-wider">Your Journey</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            {WORLDS.map((world) => {
              const levels = LEVELS.filter((l) => l.worldId === world.id);
              return (
                <div key={world.id} className="w-full">
                  {/* Mini world banner */}
                  <div
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 mb-2"
                    style={{ backgroundColor: `${world.color}10` }}
                  >
                    <span className="text-base">{world.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[#2D2016]">
                        {world.title}
                      </p>
                      <p className="text-[10px] text-[#8B7355]">
                        {levels.length} levels · {world.subtitle}
                      </p>
                    </div>
                    {world.requiredPlan === "PRO" && (
                      <span className="ml-auto text-[9px] font-bold text-[#E8A445] bg-[#E8A445]/10 px-1.5 py-0.5 rounded-full">
                        PRO
                      </span>
                    )}
                  </div>

                  {/* Mini level dots */}
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    {levels.map((level, i) => (
                      <div
                        key={level.id}
                        className={`
                          flex items-center justify-center rounded-full text-[8px]
                          ${level.type === "boss" ? "h-6 w-6 rounded-lg" : "h-4 w-4"}
                        `}
                        style={{
                          backgroundColor:
                            world.id === 1 && i === 0
                              ? world.color
                              : `${world.color}30`,
                        }}
                      >
                        {level.type === "boss" && (
                          <span className="text-[8px]">👑</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2016] mb-2 sm:mb-3">
            Three steps. That&apos;s it.
          </h2>
          <p className="text-sm sm:text-base text-[#8B7355]">No setup. No configuration. Just start building.</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              color: "#E8A445",
              title: "Get a mission",
              desc: "Each level gives you a clear, specific task. Build it with any AI tool — Claude, GPT, Cursor, Copilot.",
              icon: "📋",
            },
            {
              step: "02",
              color: "#5B8DEF",
              title: "Push to GitHub",
              desc: "Build your project and push to your repo. We check your actual code — not a sandbox, your real repo.",
              icon: "🔨",
            },
            {
              step: "03",
              color: "#4CAF50",
              title: "Level up",
              desc: "AI reviews your code for quality. Pass = XP + next level unlocked. Fail = feedback + try again.",
              icon: "🚀",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl bg-white border border-[#E8E0D4] p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  {item.icon}
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: item.color }}
                >
                  Step {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#2D2016] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#8B7355] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white/50 border-y border-[#E8E0D4]/50 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2016] mb-2 sm:mb-3">
              Not another tutorial site
            </h2>
            <p className="text-sm sm:text-base text-[#8B7355]">
              You can&apos;t watch your way to shipping. You have to build.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-[#FAF6F0] border border-[#E8E0D4]/50 p-5"
              >
                <span className="text-2xl mb-3 block">{feature.icon}</span>
                <h3 className="text-base font-bold text-[#2D2016] mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#8B7355] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2016]">
            Builders ship with vibeclod
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm"
            >
              <div className="text-[#E8A445] text-sm mb-2">★★★★★</div>
              <p className="text-sm text-[#2D2016] leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-[#2D2016]">{t.name}</p>
                <p className="text-xs text-[#8B7355]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white/50 border-y border-[#E8E0D4]/50 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2016] mb-2 sm:mb-3">
              Simple pricing
            </h2>
            <p className="text-sm sm:text-base text-[#8B7355]">
              World 1 is free forever. Unlock everything with one payment.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto items-start">
            {/* Free */}
            <div className="rounded-2xl bg-[#FAF6F0] border border-[#E8E0D4] p-6">
              <h3 className="text-sm font-bold text-[#8B7355] uppercase tracking-wider mb-1">
                Free
              </h3>
              <p className="text-3xl font-bold text-[#2D2016] mb-4">$0</p>
              <ul className="space-y-2.5 text-sm text-[#4A3728] mb-6">
                {[
                  "World 1 — 5 levels free",
                  "GitHub verification",
                  "AI code review (3/day)",
                  "Streak tracking",
                  "Pixel buddy (basic)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#4CAF50] text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block w-full rounded-xl border-2 border-[#E8E0D4] py-3 text-center text-sm font-semibold text-[#2D2016] hover:border-[#D4C4A8] hover:bg-white/80 transition-all min-h-[44px] flex items-center justify-center"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="relative">
              {/* Early bird badge above card */}
              <div className="flex justify-center mb-3">
                <EarlyBirdBadge />
              </div>

              <div className="rounded-2xl bg-[#2D2016] p-6 text-white relative overflow-hidden shadow-2xl ring-2 ring-[#E8A445]/40 scale-[1.02]">
                {/* Popular badge */}
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-[#E8A445] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    Popular
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-1">
                  Pro — Lifetime
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-white/40 text-sm line-through">$79</span>
                </div>
                <p className="text-xs text-white/40 mb-4">
                  One-time payment. Forever access.
                </p>

                <ul className="space-y-2.5 text-sm text-white/80 mb-6">
                  {[
                    "All 40 levels (8 worlds)",
                    "Unlimited AI reviews",
                    "Boss fights",
                    "All pixel buddy moods",
                    "Discord community",
                    "Future worlds & seasons",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#E8A445] text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL || "/login"}
                  className="block w-full rounded-xl bg-[#E8A445] py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:bg-[#D4932E] transition-all min-h-[44px] flex items-center justify-center"
                >
                  Unlock Everything — $29
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2016] mb-3 sm:mb-4">
          Stop watching tutorials.
          <br />
          <span className="text-[#E8A445]">Start shipping.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#8B7355] mb-6 sm:mb-8 max-w-md mx-auto">
          Your first level takes 30 minutes. By level 40, you&apos;ll have a live,
          paying product.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-xl bg-[#E8A445] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:bg-[#D4932E] hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
        >
          Start Free — No credit card
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E0D4] py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 flex items-center justify-between text-xs sm:text-sm text-[#8B7355]">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#E8A445] to-[#D4932E]">
              <span className="text-[10px] font-bold text-white">V</span>
            </div>
            <span className="font-medium">vibeclod</span>
          </div>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
