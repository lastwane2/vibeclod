"use client";

import { StatsBar } from "@/components/layout/StatsBar";
import { RepoStatus } from "@/components/layout/RepoStatus";
import { PathView } from "@/components/path/PathView";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";

interface DashboardClientProps {
  xp: number;
  streakDays: number;
  currentLevel: number;
  plan: "FREE" | "PRO";
  connectedRepo: string | null;
  completedLevelIds: number[];
}

export function DashboardClient({
  xp,
  streakDays,
  currentLevel,
  plan,
  connectedRepo,
  completedLevelIds,
}: DashboardClientProps) {
  const buddyMood =
    completedLevelIds.length === 0
      ? "idle"
      : completedLevelIds.length >= 25
        ? "celebrate"
        : streakDays >= 3
          ? "happy"
          : "think";

  return (
    <div className="min-h-screen pb-8">
      <StatsBar
        xp={xp}
        streakDays={streakDays}
        currentLevel={currentLevel}
        plan={plan}
      />

      <RepoStatus repoName={connectedRepo} />

      {/* Header with buddy */}
      <div className="mx-auto max-w-md px-4 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <PixelCharacter
            mood={buddyMood as "idle" | "happy" | "think" | "celebrate" | "confused"}
            size="md"
          />
          <div>
            <h1 className="text-xl font-bold text-[#2D2016]">Your Path</h1>
            <p className="text-xs text-[#8B7355]">
              {completedLevelIds.length === 0
                ? "Start your journey — complete Level 1"
                : `${completedLevelIds.length}/25 levels completed`}
            </p>
          </div>
        </div>
      </div>

      {/* Path */}
      <PathView
        completedLevelIds={completedLevelIds}
        currentLevel={currentLevel}
        userPlan={plan}
        hasRepo={!!connectedRepo}
      />

      {/* Upgrade CTA for free users */}
      {plan === "FREE" && (
        <div className="mx-auto max-w-sm px-4 mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#2D2016] to-[#4A3728] p-5 text-center shadow-xl">
            <p className="text-lg font-bold text-white mb-1">
              Unlock All 25 Levels
            </p>
            <p className="text-sm text-white/60 mb-4">
              Lifetime Pro access — one-time payment
            </p>
            <a
              href={process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL || "/pricing"}
              className="inline-block rounded-xl bg-[#E8A445] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#D4932E] transition-colors"
            >
              Get Pro — $29
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
