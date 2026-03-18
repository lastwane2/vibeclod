"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { ExperimentBlock as ExperimentBlockType } from "@/types/blocks";

interface Props {
  block: ExperimentBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

export function ExperimentBlock({ block, worldColor, completed, onComplete }: Props) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const toggleStep = (stepId: string) => {
    const next = new Set(completedSteps);
    if (next.has(stepId)) {
      next.delete(stepId);
    } else {
      next.add(stepId);
    }
    setCompletedSteps(next);
  };

  const handleComplete = async () => {
    try {
      const res = await fetch(`/api/blocks/${block.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completedSteps: Array.from(completedSteps),
          answers,
        }),
      });
      const data = await res.json();
      if (data.passed) {
        onComplete({ completedSteps: Array.from(completedSteps), answers });
      }
    } catch {
      // Error handled silently
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A3728]">{block.description}</p>

      {block.steps.map((step, i) => (
        <div
          key={step.id}
          className={`rounded-xl border p-4 space-y-2 transition-colors ${
            completedSteps.has(step.id)
              ? "border-[#C8E6C8] bg-[#E8F5E8]/30"
              : "border-[#E8E0D4] bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => !completed && toggleStep(step.id)}
              disabled={completed}
              className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                completedSteps.has(step.id)
                  ? "border-[#4CAF50] bg-[#4CAF50] text-white"
                  : "border-[#E8E0D4]"
              }`}
            >
              {completedSteps.has(step.id) && <span className="text-[10px]">✓</span>}
            </button>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#8B7355] uppercase">Step {i + 1}</p>
              <div className="text-sm text-[#2D2016] mt-1 prose prose-sm max-w-none prose-img:rounded-lg prose-img:border prose-img:border-[#E8E0D4] prose-img:my-2 prose-code:bg-[#F5F0E8] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[#2D2016] prose-pre:bg-[#2D2016] prose-pre:text-[#F5F0E8] prose-pre:rounded-lg prose-strong:text-[#2D2016]">
                <ReactMarkdown>{step.instruction}</ReactMarkdown>
              </div>
              <p className="text-xs text-[#8B7355] mt-1.5 italic">
                Expected: {step.expectedOutcome}
              </p>
              {step.question && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-[#4A3728] mb-1">{step.question}</p>
                  <input
                    type="text"
                    value={answers[step.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [step.id]: e.target.value })
                    }
                    disabled={completed}
                    placeholder="Your answer..."
                    className="w-full rounded-lg border border-[#E8E0D4] bg-[#FAF6F0] px-2.5 py-1.5 text-sm text-[#2D2016] placeholder:text-[#B8A898] focus:border-[#E8A445] outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {!completed && (
        <button
          onClick={handleComplete}
          disabled={completedSteps.size === 0}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          Complete Experiment
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
