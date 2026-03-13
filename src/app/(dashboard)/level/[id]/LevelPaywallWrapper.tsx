"use client";

import Link from "next/link";
import type { Level } from "@/types";
import { Paywall } from "@/components/ui/Paywall";

interface LevelPaywallWrapperProps {
  level: Level;
  worldColor: string;
  worldAccentColor: string;
}

export function LevelPaywallWrapper({
  level,
  worldColor,
  worldAccentColor,
}: LevelPaywallWrapperProps) {
  return (
    <div className="min-h-screen pb-12 relative">
      {/* Blurred hero header */}
      <div
        className="relative px-4 pt-6 pb-16 select-none"
        style={{
          background: `linear-gradient(135deg, ${worldColor}, ${worldAccentColor})`,
        }}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to path
        </Link>

        <div className="flex items-start gap-2 mb-1">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            {level.type === "boss" ? "Boss" : level.type} · Level {level.id}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mt-3">
          {level.icon} {level.title}
        </h1>
        <p className="text-white/70 mt-1">{level.subtitle}</p>
      </div>

      {/* Blurred content placeholder */}
      <div className="mx-auto max-w-lg px-4 pt-10 filter blur-sm pointer-events-none select-none opacity-50">
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <div className="h-4 bg-[#E8E0D4]/60 rounded w-1/3 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-[#E8E0D4]/40 rounded w-full" />
            <div className="h-3 bg-[#E8E0D4]/40 rounded w-4/5" />
            <div className="h-3 bg-[#E8E0D4]/40 rounded w-3/5" />
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm">
          <div className="h-4 bg-[#E8E0D4]/60 rounded w-1/4 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-[#E8E0D4]/40 rounded w-full" />
            <div className="h-3 bg-[#E8E0D4]/40 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* Paywall overlay */}
      <Paywall />
    </div>
  );
}
