"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Level } from "@/types";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";

interface SubmissionData {
  id: string;
  status: string;
  aiScore: number | null;
  aiFeedback: string | null;
  aiPassed: boolean | null;
  githubPassed: boolean | null;
  createdAt: string;
}

interface LevelDetailClientProps {
  level: Level;
  worldColor: string;
  worldAccentColor: string;
  isCompleted: boolean;
  connectedRepo: string | null;
  submissions: SubmissionData[];
}

type VerifyPhase = "idle" | "github" | "ai" | "done";

export function LevelDetailClient({
  level,
  worldColor,
  worldAccentColor,
  isCompleted: initialCompleted,
  connectedRepo,
  submissions: initialSubmissions,
}: LevelDetailClientProps) {
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [phase, setPhase] = useState<VerifyPhase>("idle");
  const [result, setResult] = useState<SubmissionData | null>(null);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [showConfetti, setShowConfetti] = useState(false);

  const isBoss = level.type === "boss";

  const handleVerify = useCallback(async () => {
    setVerifying(true);
    setResult(null);
    setPhase("github");

    // Simulate phase progress for UX
    const aiTimer = setTimeout(() => setPhase("ai"), 2000);

    try {
      const res = await fetch(`/api/levels/${level.id}/verify`, {
        method: "POST",
      });
      clearTimeout(aiTimer);
      const data = await res.json();

      setPhase("done");
      setResult(data);

      if (data.status === "PASSED") {
        setIsCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    } catch {
      clearTimeout(aiTimer);
      setPhase("done");
      setResult({
        id: "",
        status: "ERROR",
        aiScore: null,
        aiFeedback: "Something went wrong. Please try again.",
        aiPassed: false,
        githubPassed: false,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setVerifying(false);
    }
  }, [level.id]);

  const latestResult = result;
  const buddyMood = verifying
    ? "think"
    : isCompleted
      ? "celebrate"
      : result?.status === "FAILED"
        ? "confused"
        : level.buddyMood;

  const buddyMessage = verifying
    ? phase === "github"
      ? "Checking your repo..."
      : "AI is reviewing your code..."
    : isCompleted && result?.status === "PASSED"
      ? `+${level.xp} XP! Amazing work!`
      : result?.status === "FAILED"
        ? "Almost there! Check the feedback."
        : level.teaches;

  return (
    <div className="min-h-screen pb-12 relative">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                fontSize: `${12 + Math.random() * 16}px`,
              }}
            >
              {["🎉", "⭐", "✨", "🎊", "💫", "🔥"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      {/* Hero header */}
      <div
        className="relative px-4 pt-6 pb-16"
        style={{
          background: `linear-gradient(135deg, ${worldColor}, ${worldAccentColor})`,
        }}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to path
        </Link>

        <div className="flex items-start gap-2 mb-1">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            {isBoss ? "🏆 Boss" : level.type} · Level {level.id}
          </span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/80">
            {level.duration}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mt-3">
          {level.icon} {level.title}
        </h1>
        <p className="text-white/70 mt-1">{level.subtitle}</p>

        <div className="absolute -bottom-4 left-4">
          <span
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-lg"
            style={{ color: worldColor }}
          >
            ⚡ {level.xp} XP
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-10">
        {/* Buddy */}
        <div className="flex justify-center mb-8">
          <PixelCharacter
            mood={buddyMood as "idle" | "happy" | "think" | "celebrate" | "confused"}
            size="lg"
            message={buddyMessage}
          />
        </div>

        {/* Mission */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <h2 className="flex items-center gap-2 text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-md text-[10px]" style={{ backgroundColor: `${worldColor}15`, color: worldColor }}>
              📋
            </span>
            Mission
          </h2>
          <p className="text-[15px] text-[#2D2016] leading-relaxed">
            {level.mission}
          </p>
        </div>

        {/* Concepts */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <h2 className="flex items-center gap-2 text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-md text-[10px]" style={{ backgroundColor: `${worldColor}15`, color: worldColor }}>
              💡
            </span>
            Key Concepts
          </h2>
          <ul className="space-y-3">
            {level.concepts.map((concept, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: worldColor }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-[#4A3728] leading-snug pt-0.5">
                  {concept}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verification progress */}
        {verifying && (
          <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5 animate-fade-in">
            <h3 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-4">
              Verifying...
            </h3>
            <div className="space-y-3">
              {/* GitHub check step */}
              <div className="flex items-center gap-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                  phase === "github"
                    ? "bg-[#E8A445]/20 text-[#E8A445]"
                    : phase === "ai" || phase === "done"
                      ? "bg-[#E8F5E8] text-[#4CAF50]"
                      : "bg-[#F5EDE0] text-[#B8A898]"
                }`}>
                  {phase === "github" ? (
                    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : "✓"}
                </div>
                <div>
                  <p className={`text-sm font-medium ${phase === "github" ? "text-[#2D2016]" : "text-[#6B8B6B]"}`}>
                    GitHub Checks
                  </p>
                  <p className="text-xs text-[#8B7355]">Files, commits, structure</p>
                </div>
              </div>

              {/* AI review step */}
              <div className="flex items-center gap-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                  phase === "ai"
                    ? "bg-[#5B8DEF]/20 text-[#5B8DEF]"
                    : phase === "done"
                      ? "bg-[#E8F5E8] text-[#4CAF50]"
                      : "bg-[#F5EDE0] text-[#B8A898]"
                }`}>
                  {phase === "ai" ? (
                    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : phase === "done" ? "✓" : "·"}
                </div>
                <div>
                  <p className={`text-sm font-medium ${phase === "ai" ? "text-[#2D2016]" : phase === "done" ? "text-[#6B8B6B]" : "text-[#B8A898]"}`}>
                    AI Code Review
                  </p>
                  <p className="text-xs text-[#8B7355]">Quality, requirements, style</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result card */}
        {latestResult && !verifying && (
          <div
            className={`rounded-2xl border p-5 mb-5 animate-slide-up ${
              latestResult.status === "PASSED"
                ? "bg-[#E8F5E8] border-[#C8E6C8]"
                : latestResult.status === "FAILED"
                  ? "bg-[#FFF5F5] border-[#F5D5D5]"
                  : "bg-[#FFF8F0] border-[#F5E0C0]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">
                {latestResult.status === "PASSED" ? "🎉" : latestResult.status === "FAILED" ? "💪" : "⚠️"}
              </span>
              <h3 className="text-base font-bold text-[#2D2016]">
                {latestResult.status === "PASSED"
                  ? "Level Complete!"
                  : latestResult.status === "FAILED"
                    ? "Not quite yet"
                    : "Something went wrong"}
              </h3>
              {latestResult.aiScore !== null && (
                <div className="ml-auto flex items-center gap-1">
                  <span
                    className="text-xl font-bold font-mono"
                    style={{
                      color:
                        latestResult.aiScore >= 80
                          ? "#4CAF50"
                          : latestResult.aiScore >= 60
                            ? "#E8A445"
                            : "#E06B6B",
                    }}
                  >
                    {latestResult.aiScore}
                  </span>
                  <span className="text-xs text-[#8B7355]">/100</span>
                </div>
              )}
            </div>

            {/* Score bar */}
            {latestResult.aiScore !== null && (
              <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${latestResult.aiScore}%`,
                    backgroundColor:
                      latestResult.aiScore >= 80
                        ? "#4CAF50"
                        : latestResult.aiScore >= 60
                          ? "#E8A445"
                          : "#E06B6B",
                  }}
                />
              </div>
            )}

            {/* Feedback */}
            {latestResult.aiFeedback && (
              <div className="text-sm text-[#4A3728] leading-relaxed whitespace-pre-wrap">
                {latestResult.aiFeedback}
              </div>
            )}

            {/* XP earned on pass */}
            {latestResult.status === "PASSED" && (
              <div className="mt-4 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/60">
                <span className="text-lg">⚡</span>
                <span className="text-sm font-bold" style={{ color: worldColor }}>
                  +{level.xp} XP earned!
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {isCompleted && !verifying ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: worldColor,
                boxShadow: `0 4px 14px ${worldColor}50`,
              }}
            >
              Continue to next level →
            </button>
          ) : !connectedRepo ? (
            <Link
              href="/settings"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#F5EDE0] text-[#8B7355] text-sm font-semibold hover:bg-[#EDE5D8] transition-colors"
            >
              Connect a repository first →
            </Link>
          ) : (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="w-full py-3.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                backgroundColor: worldColor,
                boxShadow: `0 4px 14px ${worldColor}50`,
              }}
            >
              {verifying
                ? "Verifying..."
                : result?.status === "FAILED"
                  ? "Try Again"
                  : isBoss
                    ? "🏆 Begin Boss Fight"
                    : "✓ Verify My Code"}
            </button>
          )}
        </div>

        {/* Previous submissions */}
        {initialSubmissions.length > 0 && !verifying && (
          <details className="mt-4 group">
            <summary className="cursor-pointer text-xs text-[#8B7355] hover:text-[#2D2016] transition-colors text-center py-2">
              Previous attempts ({initialSubmissions.length})
            </summary>
            <div className="mt-2 space-y-2">
              {initialSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between rounded-xl bg-white border border-[#E8E0D4] px-4 py-3 text-xs"
                >
                  <span className="text-[#8B7355]">
                    {new Date(sub.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    {sub.aiScore !== null && (
                      <span className="font-mono font-semibold text-[#2D2016]">
                        {sub.aiScore}/100
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-bold ${
                        sub.status === "PASSED"
                          ? "bg-[#E8F5E8] text-[#2D6A2D]"
                          : sub.status === "FAILED"
                            ? "bg-[#FFF5F5] text-[#B8553A]"
                            : "bg-[#F5EDE0] text-[#8B7355]"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
