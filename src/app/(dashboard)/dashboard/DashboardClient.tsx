"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatsBar } from "@/components/layout/StatsBar";
import { RepoStatus } from "@/components/layout/RepoStatus";
import { PathView } from "@/components/path/PathView";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";
import { EarlyBirdBadge } from "@/components/ui/EarlyBirdBadge";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";

interface DashboardClientProps {
  xp: number;
  streakDays: number;
  currentLevel: number;
  plan: "FREE" | "PRO";
  connectedRepo: string | null;
  completedLevelIds: number[];
}

function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whop/checkout-url");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // fall through
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-xl bg-[#E8A445] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#D4932E] transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Redirecting..." : "Get Pro — $29"}
    </button>
  );
}

export function DashboardClient({
  xp,
  streakDays,
  currentLevel,
  plan,
  connectedRepo,
  completedLevelIds,
}: DashboardClientProps) {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window === "undefined") return false;
    if (completedLevelIds.length > 0) return false;
    return !localStorage.getItem("vibeclod_onboarded");
  });

  const handleWelcomeDone = () => {
    setShowWelcome(false);
    localStorage.setItem("vibeclod_onboarded", "1");
    router.push("/level/0");
  };

  // Re-fetch server data when the user navigates back (e.g. after level completion)
  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      handleRefresh();
    }
  }, [handleRefresh]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleRefresh);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleRefresh);
    };
  }, [handleVisibilityChange, handleRefresh]);

  const buddyMood =
    completedLevelIds.length === 0
      ? "idle"
      : completedLevelIds.length >= 40
        ? "celebrate"
        : streakDays >= 3
          ? "happy"
          : "think";

  return (
    <div className="min-h-screen pb-8">
      {showWelcome && <WelcomeModal onStart={handleWelcomeDone} />}

      <StatsBar
        xp={xp}
        streakDays={streakDays}
        currentLevel={currentLevel}
        plan={plan}
      />

      <RepoStatus repoName={connectedRepo} />

      {/* Header with buddy */}
      <div className="mx-auto max-w-md px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <PixelCharacter
            mood={buddyMood as "idle" | "happy" | "think" | "celebrate" | "confused"}
            size="md"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#2D2016]">Your Path</h1>
            <p className="text-[11px] sm:text-xs text-[#8B7355]">
              {completedLevelIds.length === 0
                ? "Start your journey — set up your tools"
                : `${completedLevelIds.length}/40 levels completed`}
            </p>
          </div>
        </div>
      </div>

      {/* Path — scrollable on mobile */}
      <div className="overflow-y-auto">
        <PathView
          completedLevelIds={completedLevelIds}
          currentLevel={currentLevel}
          userPlan={plan}
          hasRepo={!!connectedRepo}
        />
      </div>

      {/* Upgrade CTA for free users */}
      {plan === "FREE" && (
        <div className="mx-auto max-w-sm px-3 sm:px-4 mt-6 sm:mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#2D2016] to-[#4A3728] p-4 sm:p-5 text-center shadow-xl">
            <div className="flex justify-center mb-3">
              <EarlyBirdBadge />
            </div>
            <p className="text-base sm:text-lg font-bold text-white mb-1">
              Unlock All 40 Levels
            </p>
            <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">
              Lifetime Pro access — one-time payment
            </p>
            <UpgradeButton />
          </div>
        </div>
      )}
    </div>
  );
}
