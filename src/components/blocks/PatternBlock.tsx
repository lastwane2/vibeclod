"use client";

import { useState } from "react";
import type { PatternBlock as PatternBlockType } from "@/types/blocks";
import { PROMPT_PATTERNS } from "@/types/prompt-toolkit";

interface Props {
  block: PatternBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

export function PatternBlock({ block, worldColor, completed, onComplete }: Props) {
  const [filledTemplate, setFilledTemplate] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pattern = PROMPT_PATTERNS.find((p) => p.id === block.patternId);

  const handleComplete = async () => {
    setSubmitted(true);
    try {
      const res = await fetch(`/api/blocks/${block.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseCompleted: true,
          filledTemplate,
        }),
      });
      const data = await res.json();
      if (data.passed) {
        onComplete({ exerciseCompleted: true, filledTemplate });
      }
    } catch {
      setSubmitted(false);
    }
  };

  if (!pattern) return <p className="text-sm text-[#B8553A]">Pattern not found.</p>;

  return (
    <div className="space-y-4">
      {/* Pattern info */}
      <div className="rounded-xl bg-gradient-to-br from-[#FAF6F0] to-white border border-[#E8E0D4] p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📚</span>
          <h3 className="text-sm font-bold text-[#2D2016]">{pattern.name}</h3>
        </div>
        <p className="text-sm text-[#4A3728] mb-3">{pattern.description}</p>

        <p className="text-xs font-bold text-[#8B7355] uppercase mb-1">Template:</p>
        <pre className="rounded-lg bg-[#2D2016] text-[#E8E0D4] p-3 text-xs whitespace-pre-wrap overflow-x-auto">
          {pattern.template}
        </pre>

        <p className="text-xs text-[#8B7355] mt-3 italic">
          When to use: {pattern.whenToUse}
        </p>
      </div>

      {/* Example toggle */}
      <button
        onClick={() => setShowExample(!showExample)}
        className="text-xs underline text-[#8B7355] hover:text-[#2D2016]"
      >
        {showExample ? "Hide" : "Show"} filled example
      </button>

      {showExample && (
        <div className="rounded-xl bg-[#E8F5E8]/30 border border-[#C8E6C8] p-3">
          <p className="text-xs font-bold text-[#2D6A2D] mb-1">Example:</p>
          <pre className="text-xs text-[#4A3728] whitespace-pre-wrap">
            {block.exercise.exampleFilled}
          </pre>
        </div>
      )}

      {/* Exercise */}
      <div className="rounded-xl border border-[#E8E0D4] bg-white p-4 space-y-2">
        <p className="text-xs font-bold text-[#8B7355] uppercase">Your turn</p>
        <p className="text-sm text-[#4A3728]">{block.exercise.goal}</p>

        <pre className="rounded-lg bg-[#FAF6F0] text-[#4A3728] p-3 text-xs whitespace-pre-wrap">
          {block.exercise.template}
        </pre>

        <textarea
          value={filledTemplate}
          onChange={(e) => setFilledTemplate(e.target.value)}
          placeholder="Fill in the pattern with your own example..."
          rows={5}
          disabled={completed}
          className="w-full rounded-lg border border-[#E8E0D4] bg-[#FAF6F0] p-2.5 text-sm text-[#2D2016] placeholder:text-[#B8A898] focus:border-[#E8A445] focus:ring-1 focus:ring-[#E8A445] outline-none resize-none"
        />
      </div>

      {!completed && (
        <button
          onClick={handleComplete}
          disabled={submitted || filledTemplate.trim().length < 10}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          {submitted ? "Saving..." : "Add to My Toolkit ✓"}
        </button>
      )}

      {completed && (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
          ✓ Added to Toolkit
        </div>
      )}
    </div>
  );
}
