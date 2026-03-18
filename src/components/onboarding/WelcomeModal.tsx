"use client";

import { useState } from "react";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";

interface WelcomeModalProps {
  onStart: () => void;
}

const STEPS = [
  {
    title: "Welcome to Vibeclod!",
    desc: "You're about to learn how to build real apps with AI. No coding experience needed — AI writes the code, you learn to direct it.",
    buddy: "celebrate" as const,
  },
  {
    title: "How it works",
    desc: "Each level has blocks: read concepts, answer quizzes, write AI prompts, and push real code. Complete blocks to earn XP and unlock the next level.",
    buddy: "happy" as const,
  },
  {
    title: "Ready to start?",
    desc: "First, we'll set up your tools — GitHub, AI coding tool, and connect your repo. Takes 5 minutes, then you're building!",
    buddy: "celebrate" as const,
  },
];

export function WelcomeModal({ onStart }: WelcomeModalProps) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#FAF6F0]/80 backdrop-blur-md" />

      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-[#E8E0D4] p-8 shadow-2xl animate-fade-in">
        {/* Buddy */}
        <div className="flex justify-center mb-5">
          <PixelCharacter mood={current.buddy} size="lg" />
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-[#E8A445]" : "w-1.5 bg-[#E8E0D4]"
              }`}
            />
          ))}
        </div>

        <h2 className="text-center text-xl font-bold text-[#2D2016] mb-2">
          {current.title}
        </h2>
        <p className="text-center text-sm text-[#8B7355] leading-relaxed mb-6">
          {current.desc}
        </p>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full rounded-xl bg-[#E8A445] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:bg-[#D4932E] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onStart}
            className="w-full rounded-xl bg-[#E8A445] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:bg-[#D4932E] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Set Up My Tools
          </button>
        )}

        {step < STEPS.length - 1 && (
          <button
            onClick={onStart}
            className="mt-2 w-full py-2 text-center text-xs text-[#8B7355] hover:text-[#2D2016] transition-colors"
          >
            Skip intro
          </button>
        )}
      </div>
    </div>
  );
}
