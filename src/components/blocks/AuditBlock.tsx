"use client";

import { useState } from "react";
import type { AuditBlock as AuditBlockType, AuditCheckItem } from "@/types/blocks";

interface Props {
  block: AuditBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

const CATEGORY_LABELS: Record<AuditCheckItem["category"], { label: string; icon: string }> = {
  security: { label: "Security", icon: "🔒" },
  performance: { label: "Performance", icon: "⚡" },
  ux: { label: "UX", icon: "✨" },
  seo: { label: "SEO", icon: "🔍" },
  "code-quality": { label: "Code Quality", icon: "🧹" },
};

const SEVERITY_STYLES: Record<AuditCheckItem["severity"], string> = {
  critical: "bg-[#FFF5F5] text-[#B8553A]",
  warning: "bg-[#FFF8F0] text-[#E8A445]",
  suggestion: "bg-[#F0F4FF] text-[#5B8DEF]",
};

export function AuditBlock({ block, worldColor, completed, onComplete }: Props) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; feedback: string } | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    if (submitted) return;
    const next = new Set(checkedItems);
    if (next.has(itemId)) {
      next.delete(itemId);
    } else {
      next.add(itemId);
    }
    setCheckedItems(next);
  };

  const handleSubmit = async () => {
    const passedItems = Array.from(checkedItems);
    try {
      const res = await fetch(`/api/blocks/${block.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passedItems }),
      });
      const data = await res.json();
      setResult({ passed: data.passed, feedback: data.feedback });
      setSubmitted(true);
      if (data.passed) {
        onComplete({ passedItems });
      }
    } catch {
      setResult({ passed: false, feedback: "Error submitting audit." });
      setSubmitted(true);
    }
  };

  // Group checklist by category
  const grouped = block.checklist.reduce<Record<string, AuditCheckItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const criticalCount = block.checklist.filter((i) => i.severity === "critical").length;
  const checkedCritical = block.checklist.filter(
    (i) => i.severity === "critical" && checkedItems.has(i.id)
  ).length;

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A3728]">{block.description}</p>

      {/* Progress bar */}
      <div className="rounded-xl border border-[#E8E0D4] bg-white p-3">
        <div className="flex items-center justify-between text-xs text-[#8B7355] mb-2">
          <span>
            {checkedItems.size}/{block.checklist.length} checked
          </span>
          <span>
            Need {block.minPassed} to pass
          </span>
        </div>
        <div className="h-2 rounded-full bg-[#F5F0EB] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(checkedItems.size / block.checklist.length) * 100}%`,
              backgroundColor: worldColor,
            }}
          />
        </div>
        {criticalCount > 0 && (
          <p className="text-[10px] text-[#B8553A] mt-1.5">
            🔴 {checkedCritical}/{criticalCount} critical items checked
          </p>
        )}
      </div>

      {/* Grouped checklist */}
      {Object.entries(grouped).map(([category, items]) => {
        const cat = CATEGORY_LABELS[category as AuditCheckItem["category"]];
        return (
          <div key={category} className="rounded-xl border border-[#E8E0D4] bg-white overflow-hidden">
            <div className="px-4 py-2.5 bg-[#FAF6F0] border-b border-[#E8E0D4]">
              <p className="text-xs font-bold text-[#4A3728]">
                {cat.icon} {cat.label}
              </p>
            </div>
            <div className="p-2 space-y-1">
              {items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => toggleItem(item.id)}
                    disabled={submitted}
                    className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg text-sm transition-colors ${
                      checkedItems.has(item.id)
                        ? "bg-[#E8F5E8]/50"
                        : "hover:bg-[#FAF6F0]"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        checkedItems.has(item.id)
                          ? "border-[#4CAF50] bg-[#4CAF50] text-white"
                          : "border-[#E8E0D4]"
                      }`}
                    >
                      {checkedItems.has(item.id) && (
                        <span className="text-[8px]">✓</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${SEVERITY_STYLES[item.severity]}`}>
                          {item.severity}
                        </span>
                        <span className="text-xs font-medium text-[#2D2016]">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8B7355] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedItem(expandedItem === item.id ? null : item.id);
                      }}
                      className="shrink-0 text-[10px] text-[#5B8DEF] hover:underline mt-0.5"
                    >
                      {expandedItem === item.id ? "hide" : "how?"}
                    </button>
                  </button>
                  {expandedItem === item.id && (
                    <div className="ml-9 mr-2 mb-2 p-2.5 rounded-lg bg-[#F0F4FF] text-xs text-[#4A3728]">
                      <span className="font-semibold">How to check:</span>{" "}
                      {item.howToCheck}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {result && (
        <div
          className={`rounded-xl p-3 text-center text-sm font-medium ${
            result.passed
              ? "bg-[#E8F5E8] text-[#2D6A2D]"
              : "bg-[#FFF5F5] text-[#B8553A]"
          }`}
        >
          {result.feedback}
        </div>
      )}

      {!completed && !result?.passed && (
        <button
          onClick={handleSubmit}
          disabled={checkedItems.size < block.minPassed}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          Submit Audit ({checkedItems.size}/{block.minPassed} minimum)
        </button>
      )}

      {completed && (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
          ✓ Audit Complete
        </div>
      )}
    </div>
  );
}
