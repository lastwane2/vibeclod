"use client";

import { useState } from "react";
import type { DebugBlock as DebugBlockType } from "@/types/blocks";

interface Props {
  block: DebugBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

export function DebugBlock({ block, worldColor, completed, onComplete }: Props) {
  const [fixes, setFixes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; feedback: string } | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/blocks/${block.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fixes: Object.entries(fixes).map(([scenarioId, fix]) => ({ scenarioId, fix })),
        }),
      });
      const data = await res.json();
      setResult({ passed: data.passed, feedback: data.feedback });
      if (data.passed) {
        onComplete({ fixes });
      }
    } catch {
      setResult({ passed: false, feedback: "Error submitting fixes." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#8B7355]">
        Fix {block.passingCount} of {block.scenarios.length} scenarios to pass
      </p>

      {block.scenarios.map((scenario) => (
        <div key={scenario.id} className="rounded-xl border border-[#E8E0D4] bg-white p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🐛</span>
            <h4 className="text-sm font-bold text-[#2D2016]">{scenario.title}</h4>
          </div>
          <p className="text-xs text-[#4A3728]">{scenario.description}</p>

          <pre className="rounded-lg bg-[#2D2016] text-[#E8E0D4] p-3 text-xs overflow-x-auto">
            <code>{scenario.brokenCode}</code>
          </pre>

          {scenario.hint && (
            <p className="text-xs text-[#8B7355] italic">Hint: {scenario.hint}</p>
          )}

          <textarea
            value={fixes[scenario.id] || ""}
            onChange={(e) => setFixes({ ...fixes, [scenario.id]: e.target.value })}
            placeholder="Describe how you'd fix this..."
            rows={3}
            disabled={completed}
            className="w-full rounded-lg border border-[#E8E0D4] bg-[#FAF6F0] p-2.5 text-sm text-[#2D2016] placeholder:text-[#B8A898] focus:border-[#E8A445] focus:ring-1 focus:ring-[#E8A445] outline-none resize-none"
          />
        </div>
      ))}

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
          disabled={submitting || Object.values(fixes).filter(Boolean).length === 0}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          {submitting ? "Checking..." : "Submit Fixes"}
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
