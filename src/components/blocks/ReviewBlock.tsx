"use client";

import { useState } from "react";
import type { ReviewBlock as ReviewBlockType } from "@/types/blocks";

interface Props {
  block: ReviewBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

export function ReviewBlock({ block, worldColor, completed, onComplete }: Props) {
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; feedback: string } | null>(null);

  const toggleIssue = (issueId: string) => {
    const next = new Set(selectedIssues);
    if (next.has(issueId)) {
      next.delete(issueId);
    } else {
      next.add(issueId);
    }
    setSelectedIssues(next);
  };

  const handleSubmit = async () => {
    const foundIssues = Array.from(selectedIssues);
    try {
      const res = await fetch(`/api/blocks/${block.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foundIssues }),
      });
      const data = await res.json();
      setResult({ passed: data.passed, feedback: data.feedback });
      setSubmitted(true);
      if (data.passed) {
        onComplete({ foundIssues });
      }
    } catch {
      setResult({ passed: false, feedback: "Error submitting review." });
      setSubmitted(true);
    }
  };

  // Split code into lines for line-number display
  const lines = block.code.split("\n");

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A3728]">{block.description}</p>
      <p className="text-xs text-[#8B7355]">
        Find at least {block.minIssuesFound} of {block.knownIssues.length} issues
      </p>

      {/* Code display */}
      <div className="rounded-xl bg-[#2D2016] p-4 overflow-x-auto">
        <pre className="text-xs">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-[#8B7355] w-6 text-right mr-3 select-none shrink-0">
                {i + 1}
              </span>
              <span className="text-[#E8E0D4]">{line}</span>
            </div>
          ))}
        </pre>
      </div>

      {/* Issue checklist */}
      <div className="rounded-xl border border-[#E8E0D4] bg-white p-4 space-y-2">
        <p className="text-xs font-bold text-[#8B7355] uppercase mb-2">Found issues:</p>
        {block.knownIssues.map((issue) => (
          <button
            key={issue.id}
            onClick={() => !submitted && toggleIssue(issue.id)}
            disabled={submitted}
            className={`w-full text-left flex items-start gap-2 p-2 rounded-lg text-sm transition-colors ${
              selectedIssues.has(issue.id)
                ? "bg-[#FAF6F0] border border-[#E8E0D4]"
                : "hover:bg-[#FAF6F0]"
            }`}
          >
            <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
              selectedIssues.has(issue.id)
                ? "border-[#4CAF50] bg-[#4CAF50] text-white"
                : "border-[#E8E0D4]"
            }`}>
              {selectedIssues.has(issue.id) && <span className="text-[8px]">✓</span>}
            </div>
            <div>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                issue.severity === "critical"
                  ? "bg-[#FFF5F5] text-[#B8553A]"
                  : issue.severity === "warning"
                    ? "bg-[#FFF8F0] text-[#E8A445]"
                    : "bg-[#F0F4FF] text-[#5B8DEF]"
              }`}>
                {issue.severity}
              </span>
              <span className="text-xs text-[#8B7355] ml-1">
                Lines {issue.lineRange[0]}-{issue.lineRange[1]}
              </span>
              {submitted && (
                <p className="text-xs text-[#4A3728] mt-1">{issue.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {result && (
        <div className={`rounded-xl p-3 text-center text-sm font-medium ${
          result.passed ? "bg-[#E8F5E8] text-[#2D6A2D]" : "bg-[#FFF5F5] text-[#B8553A]"
        }`}>
          {result.feedback}
        </div>
      )}

      {!completed && !result?.passed && (
        <button
          onClick={handleSubmit}
          disabled={selectedIssues.size === 0}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          Submit Review
        </button>
      )}

      {completed && (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
          ✓ Completed
        </div>
      )}
    </div>
  );
}
