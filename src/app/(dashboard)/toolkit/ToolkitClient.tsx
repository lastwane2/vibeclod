"use client";

import { useState } from "react";
import Link from "next/link";
import { TOOLKIT_CHAPTERS, PROMPT_PATTERNS } from "@/types/prompt-toolkit";
import { WORLDS } from "@/lib/levels";

interface Props {
  unlockedPatternIds: string[];
}

export function ToolkitClient({ unlockedPatternIds }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const unlockedSet = new Set(unlockedPatternIds);

  const filteredPatterns = searchQuery.trim()
    ? PROMPT_PATTERNS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const handleCopy = (text: string, patternId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(patternId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-[#8B7355] hover:text-[#2D2016] text-sm mb-4 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to path
        </Link>

        <h1 className="text-2xl font-bold text-[#2D2016]">📚 Prompt Toolkit</h1>
        <p className="text-sm text-[#8B7355] mt-1">
          Your collection of prompt patterns. {unlockedPatternIds.length}/{PROMPT_PATTERNS.length} unlocked.
        </p>

        {/* Search */}
        <div className="mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patterns..."
            className="w-full rounded-xl border border-[#E8E0D4] bg-white px-4 py-2.5 text-sm text-[#2D2016] placeholder:text-[#B8A898] focus:border-[#E8A445] focus:ring-1 focus:ring-[#E8A445] outline-none"
          />
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4">
        {/* Search results */}
        {filteredPatterns ? (
          <div className="space-y-3">
            <p className="text-xs text-[#8B7355]">{filteredPatterns.length} results</p>
            {filteredPatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                unlocked={unlockedSet.has(pattern.id)}
                expanded={expandedPattern === pattern.id}
                copiedId={copiedId}
                onToggle={() =>
                  setExpandedPattern(expandedPattern === pattern.id ? null : pattern.id)
                }
                onCopy={handleCopy}
              />
            ))}
          </div>
        ) : (
          /* Chapters view */
          <div className="space-y-6">
            {TOOLKIT_CHAPTERS.map((chapter) => {
              const world = WORLDS.find((w) => w.id === chapter.worldId);
              const unlockedInChapter = chapter.patterns.filter((p) =>
                unlockedSet.has(p.id)
              ).length;

              return (
                <div key={chapter.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-xs"
                      style={{ backgroundColor: `${world?.color ?? "#E8A445"}20`, color: world?.color }}
                    >
                      {world?.icon}
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[#2D2016]">
                        Chapter {chapter.id}: {chapter.title}
                      </h2>
                      <p className="text-[10px] text-[#8B7355]">
                        {unlockedInChapter}/{chapter.patterns.length} unlocked
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {chapter.patterns.map((pattern) => (
                      <PatternCard
                        key={pattern.id}
                        pattern={pattern}
                        unlocked={unlockedSet.has(pattern.id)}
                        expanded={expandedPattern === pattern.id}
                        copiedId={copiedId}
                        onToggle={() =>
                          setExpandedPattern(
                            expandedPattern === pattern.id ? null : pattern.id
                          )
                        }
                        onCopy={handleCopy}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Pattern Card ──────────────────────

interface PatternCardProps {
  pattern: (typeof PROMPT_PATTERNS)[number];
  unlocked: boolean;
  expanded: boolean;
  copiedId: string | null;
  onToggle: () => void;
  onCopy: (text: string, id: string) => void;
}

function PatternCard({ pattern, unlocked, expanded, copiedId, onToggle, onCopy }: PatternCardProps) {
  return (
    <div
      className={`rounded-xl border transition-colors ${
        unlocked
          ? "bg-white border-[#E8E0D4] hover:border-[#D4C8B8]"
          : "bg-[#FAF6F0] border-[#E8E0D4] opacity-60"
      }`}
    >
      <button
        onClick={onToggle}
        disabled={!unlocked}
        className="w-full text-left px-4 py-3 flex items-center gap-3"
      >
        <span className="text-lg">{unlocked ? "📚" : "🔒"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#2D2016] truncate">{pattern.name}</p>
          <p className="text-xs text-[#8B7355] truncate">{pattern.description}</p>
        </div>
        {unlocked && (
          <svg
            className={`h-4 w-4 text-[#8B7355] transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {expanded && unlocked && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#E8E0D4] pt-3">
          {/* Template */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-[#8B7355] uppercase">Template</p>
              <button
                onClick={() => onCopy(pattern.template, pattern.id + "-template")}
                className="text-[10px] text-[#8B7355] hover:text-[#2D2016] transition-colors"
              >
                {copiedId === pattern.id + "-template" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="rounded-lg bg-[#2D2016] text-[#E8E0D4] p-3 text-xs whitespace-pre-wrap overflow-x-auto">
              {pattern.template}
            </pre>
          </div>

          {/* Example */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-[#8B7355] uppercase">Example</p>
              <button
                onClick={() => onCopy(pattern.example, pattern.id + "-example")}
                className="text-[10px] text-[#8B7355] hover:text-[#2D2016] transition-colors"
              >
                {copiedId === pattern.id + "-example" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="rounded-lg bg-[#E8F5E8]/50 border border-[#C8E6C8] text-[#4A3728] p-3 text-xs whitespace-pre-wrap overflow-x-auto">
              {pattern.example}
            </pre>
          </div>

          {/* When to use */}
          <p className="text-xs text-[#8B7355] italic">
            When to use: {pattern.whenToUse}
          </p>
        </div>
      )}
    </div>
  );
}
