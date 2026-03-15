"use client";

import { signIn } from "next-auth/react";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {/* Decorative background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#E8A445]/5" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#5B8DEF]/5" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Buddy */}
        <div className="flex justify-center mb-6">
          <PixelCharacter mood="happy" size="lg" message="Let's build something!" />
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white border border-[#E8E0D4] p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#E8A445] to-[#D4932E] mb-3 shadow-md">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <h1 className="text-2xl font-bold text-[#2D2016]">vibeclod</h1>
            <p className="text-sm text-[#8B7355] mt-1">
              Duolingo, but for vibe coding
            </p>
          </div>

          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#2D2016] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[#4A3728] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>

          <p className="mt-4 text-center text-[10px] text-[#B8A898] leading-relaxed">
            We need GitHub access to check your repos.
            <br />
            World 1 is free — no credit card needed.
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "🎯", label: "40 Levels" },
            { icon: "🤖", label: "AI Verified" },
            { icon: "🚀", label: "Ship Real Code" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl bg-white/60 border border-[#E8E0D4]/50 px-2 py-3">
              <span className="text-lg">{f.icon}</span>
              <p className="text-[10px] font-medium text-[#8B7355] mt-1">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
