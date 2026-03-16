"use client";

import { useState, useCallback } from "react";
import type { BuildBlock as BuildBlockType } from "@/types/blocks";
import { trackVerifyAttempt } from "@/lib/analytics";

interface SubmissionData {
  id: string;
  status: string;
  aiScore: number | null;
  aiFeedback: string | null;
  aiPassed: boolean | null;
  githubPassed: boolean | null;
  createdAt: string;
}

interface Props {
  block: BuildBlockType;
  worldColor: string;
  completed: boolean;
  connectedRepo: string | null;
  onComplete: (data: Record<string, unknown>) => void;
}

type VerifyPhase = "idle" | "github" | "ai" | "done";

export function BuildBlock({ block, worldColor, completed, connectedRepo, onComplete }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [phase, setPhase] = useState<VerifyPhase>("idle");
  const [result, setResult] = useState<SubmissionData | null>(null);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleVerify = useCallback(async () => {
    setVerifying(true);
    setResult(null);
    setPhase("github");

    try {
      const res = await fetch(`/api/levels/${block.levelId}/verify`, {
        method: "POST",
      });
      const data = await res.json();

      // Show AI phase briefly if GitHub passed
      if (data.githubPassed) {
        setPhase("ai");
        await new Promise((r) => setTimeout(r, 300));
      }

      setPhase("done");
      setResult(data);

      trackVerifyAttempt(block.levelId, data.status === "PASSED");

      if (data.status === "PASSED") {
        setIsCompleted(true);
        onComplete({ submission: data, levelCompleted: true });
      }
    } catch {
      setPhase("done");
      setResult({
        id: "",
        status: "ERROR",
        aiScore: null,
        aiFeedback: "Something went wrong. Check your repo is accessible and try again.",
        aiPassed: false,
        githubPassed: false,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setVerifying(false);
    }
  }, [block.levelId, onComplete]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A3728]">{block.mission}</p>

      {/* Verification progress */}
      {verifying && (
        <div className="rounded-xl border border-[#E8E0D4] bg-white p-4 space-y-2">
          <p className="text-xs font-bold text-[#8B7355] uppercase">Verifying...</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                phase === "github" ? "bg-[#E8A445]/20 text-[#E8A445]" : "bg-[#E8F5E8] text-[#4CAF50]"
              }`}>
                {phase === "github" ? (
                  <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : "✓"}
              </div>
              <span className="text-xs text-[#2D2016]">GitHub Checks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                phase === "ai" ? "bg-[#5B8DEF]/20 text-[#5B8DEF]" : phase === "done" ? "bg-[#E8F5E8] text-[#4CAF50]" : "bg-[#F5EDE0] text-[#B8A898]"
              }`}>
                {phase === "ai" ? (
                  <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : phase === "done" ? "✓" : "·"}
              </div>
              <span className="text-xs text-[#2D2016]">AI Code Review</span>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !verifying && (
        <div className={`rounded-xl border p-4 ${
          result.status === "PASSED" ? "bg-[#E8F5E8] border-[#C8E6C8]" : result.status === "FAILED" ? "bg-[#FFF5F5] border-[#F5D5D5]" : "bg-[#FFF8F0] border-[#F5E0C0]"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">
              {result.status === "PASSED" ? "🎉" : result.status === "FAILED" ? "💪" : "⚠️"}
            </span>
            <span className="text-sm font-bold text-[#2D2016]">
              {result.status === "PASSED" ? "Passed!" : result.status === "FAILED" ? "Not quite yet" : "Error"}
            </span>
            {result.aiScore !== null && (
              <span className="ml-auto text-lg font-bold font-mono" style={{
                color: result.aiScore >= 80 ? "#4CAF50" : result.aiScore >= 60 ? "#E8A445" : "#E06B6B",
              }}>
                {result.aiScore}/100
              </span>
            )}
          </div>

          {/* Checklist for failures */}
          {result.status === "FAILED" && (
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs">
                <span className={result.githubPassed ? "text-[#4CAF50]" : "text-[#E06B6B]"}>
                  {result.githubPassed ? "✓" : "✗"}
                </span>
                <span className={result.githubPassed ? "text-[#6B8B6B]" : "text-[#B8553A] font-medium"}>
                  GitHub checks {result.githubPassed ? "passed" : "— files missing or incorrect"}
                </span>
              </div>
              {result.githubPassed && (
                <div className="flex items-center gap-2 text-xs">
                  <span className={result.aiPassed ? "text-[#4CAF50]" : "text-[#E06B6B]"}>
                    {result.aiPassed ? "✓" : "✗"}
                  </span>
                  <span className={result.aiPassed ? "text-[#6B8B6B]" : "text-[#B8553A] font-medium"}>
                    AI code review {result.aiPassed ? "passed" : "— needs improvement"}
                  </span>
                </div>
              )}
            </div>
          )}

          {result.aiFeedback && (
            <p className="text-sm text-[#4A3728] whitespace-pre-wrap">{result.aiFeedback}</p>
          )}
        </div>
      )}

      {/* Action */}
      {!isCompleted && !verifying && (
        <>
          {!connectedRepo ? (
            <div className="rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] p-4 space-y-2">
              <p className="text-sm font-medium text-[#2D2016]">
                You need a project to push code to
              </p>
              <p className="text-xs text-[#8B7355]">
                A project (repository) is like a folder in the cloud where your code lives.
              </p>
              <a
                href="/settings"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: worldColor }}
              >
                Set up your project →
              </a>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: worldColor }}
            >
              {result?.status === "FAILED" ? "Try Again" : "Verify My Code"}
            </button>
          )}
        </>
      )}

      {isCompleted && (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
          ✓ Completed
        </div>
      )}
    </div>
  );
}
