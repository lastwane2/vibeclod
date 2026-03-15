"use client";

import { useState } from "react";
import type { PromptBlock as PromptBlockType, PromptEvaluation } from "@/types/blocks";

interface Props {
  block: PromptBlockType;
  worldColor: string;
  completed: boolean;
  completionData?: Record<string, unknown>;
  onComplete: (data: Record<string, unknown>) => void;
}

const DIMENSION_LABELS = {
  specificity: "Specificity",
  context: "Context",
  format: "Format",
  completeness: "Completeness",
};

function restoreEvaluation(data?: Record<string, unknown>): PromptEvaluation | null {
  if (!data) return null;
  const s = Number(data.specificity) || 0;
  const c = Number(data.context) || 0;
  const f = Number(data.format) || 0;
  const co = Number(data.completeness) || 0;
  return {
    specificity: s,
    context: c,
    format: f,
    completeness: co,
    average: Number(data.average) || (s + c + f + co) / 4,
    feedback: String(data.feedback ?? ""),
    suggestions: Array.isArray(data.suggestions) ? data.suggestions.map(String) : [],
  };
}

export function PromptBlock({ block, worldColor, completed, completionData, onComplete }: Props) {
  const [prompt, setPrompt] = useState(
    completed && completionData?.prompt ? String(completionData.prompt) : ""
  );
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<PromptEvaluation | null>(
    completed ? restoreEvaluation(completionData) : null
  );
  const [showReference, setShowReference] = useState(false);
  const [passed, setPassed] = useState(completed);

  const handleSubmit = async () => {
    setEvaluating(true);
    try {
      const res = await fetch(`/api/blocks/${block.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data.data) {
        setEvaluation({
          specificity: data.data.specificity,
          context: data.data.context,
          format: data.data.format,
          completeness: data.data.completeness,
          average: data.data.average,
          feedback: data.feedback,
          suggestions: data.data.suggestions || [],
        });
      }

      if (data.passed) {
        setPassed(true);
        onComplete({ prompt });
      }
    } catch {
      // Error handled by showing no evaluation
    } finally {
      setEvaluating(false);
    }
  };

  // Scaffold display
  const scaffoldContent = () => {
    switch (block.scaffold) {
      case "full":
        return (
          <div className="rounded-xl bg-[#FAF6F0] border border-[#E8E0D4] p-4 mb-3">
            <p className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2">
              Reference Prompt
            </p>
            <p className="text-sm text-[#4A3728] whitespace-pre-wrap">
              {block.referencePrompt}
            </p>
          </div>
        );
      case "template":
        return (
          <div className="rounded-xl bg-[#FAF6F0] border border-[#E8E0D4] p-4 mb-3">
            <p className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2">
              Template — Fill in the blanks
            </p>
            <p className="text-sm text-[#4A3728] whitespace-pre-wrap font-mono">
              {block.template}
            </p>
          </div>
        );
      case "hints":
        return (
          <div className="rounded-xl bg-[#FAF6F0] border border-[#E8E0D4] p-4 mb-3">
            <p className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2">
              Hints
            </p>
            <ul className="space-y-1">
              {block.hints?.map((hint, i) => (
                <li key={i} className="text-sm text-[#4A3728] flex items-start gap-2">
                  <span style={{ color: worldColor }}>•</span> {hint}
                </li>
              ))}
            </ul>
          </div>
        );
      case "none":
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A3728]">{block.goal}</p>

      {scaffoldContent()}

      {/* Prompt textarea */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt here..."
        rows={6}
        disabled={completed || passed}
        className="w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-sm text-[#2D2016] placeholder:text-[#B8A898] focus:border-[#E8A445] focus:ring-1 focus:ring-[#E8A445] outline-none resize-none transition-colors"
      />

      {/* Evaluation results */}
      {evaluation && (
        <div className={`rounded-xl border p-4 space-y-3 ${
          passed ? "border-[#C8E6C8] bg-[#E8F5E8]/50" : "border-[#F5D5D5] bg-[#FFF5F5]/50"
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#2D2016]">
              {passed ? "Great prompt!" : "Needs improvement"}
            </p>
            <span className="text-lg font-bold font-mono" style={{ color: passed ? "#4CAF50" : "#E06B6B" }}>
              {evaluation.average.toFixed(1)}/5
            </span>
          </div>

          {/* Score bars */}
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(DIMENSION_LABELS) as (keyof typeof DIMENSION_LABELS)[]).map((dim) => (
              <div key={dim}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-[#8B7355]">{DIMENSION_LABELS[dim]}</span>
                  <span className="font-mono text-[#2D2016]">{evaluation[dim]}/5</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#E8E0D4] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(evaluation[dim] / 5) * 100}%`,
                      backgroundColor: evaluation[dim] >= 3 ? "#4CAF50" : evaluation[dim] >= 2 ? "#E8A445" : "#E06B6B",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#4A3728]">{evaluation.feedback}</p>

          {evaluation.suggestions.length > 0 && !passed && (
            <div>
              <p className="text-xs font-bold text-[#8B7355] uppercase mb-1">Suggestions:</p>
              <ul className="space-y-1">
                {evaluation.suggestions.map((s, i) => (
                  <li key={i} className="text-xs text-[#4A3728]">• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Side-by-side comparison */}
          {!passed && (
            <button
              onClick={() => setShowReference(!showReference)}
              className="text-xs underline text-[#8B7355] hover:text-[#2D2016]"
            >
              {showReference ? "Hide comparison" : "Compare with better version"}
            </button>
          )}

          {showReference && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="rounded-lg border border-[#F5D5D5] bg-[#FFF5F5] p-3">
                <p className="text-[10px] font-bold text-[#B8553A] uppercase tracking-wider mb-1.5">Your prompt</p>
                <p className="text-xs text-[#4A3728] whitespace-pre-wrap">
                  {prompt}
                </p>
              </div>
              <div className="rounded-lg border border-[#C8E6C8] bg-[#E8F5E8] p-3">
                <p className="text-[10px] font-bold text-[#2D6A2D] uppercase tracking-wider mb-1.5">Better version</p>
                <p className="text-xs text-[#4A3728] whitespace-pre-wrap">
                  {block.referencePrompt}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {!completed && !passed && (
        <button
          onClick={handleSubmit}
          disabled={evaluating || prompt.trim().length < 20}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          {evaluating ? "Evaluating..." : evaluation ? "Revise & Resubmit" : "Evaluate My Prompt"}
        </button>
      )}

      {(completed || passed) && (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
          ✓ Completed
        </div>
      )}
    </div>
  );
}
