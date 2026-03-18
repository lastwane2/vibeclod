"use client";

import { useEffect, useRef } from "react";
import type { LevelWithStatus } from "@/types";
import { getWorld } from "@/lib/levels";
import { getBlocksForLevel } from "@/lib/blocks";
import { BLOCK_ICONS } from "@/types/blocks";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";

interface LevelPopupProps {
  level: LevelWithStatus | null;
  onClose: () => void;
  onVerify: (levelId: number) => void;
  hasRepo: boolean;
}

const BUDDY_MESSAGES: Record<string, string> = {
  idle: "Ready when you are!",
  happy: "You got this! 🔥",
  think: "Hmm, this one's tricky...",
  celebrate: "YESSS! Amazing work!",
  confused: "Need a hint?",
};

export function LevelPopup({ level, onClose, onVerify, hasRepo }: LevelPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!level) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [level, onClose]);

  if (!level) return null;

  const world = getWorld(level.worldId);
  const worldColor = world?.color ?? "#E8A445";
  const isCompleted = level.status === "completed";
  const isBoss = level.type === "boss";
  const blocks = getBlocksForLevel(level.id);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Sheet */}
      <div className="relative w-full max-w-md mx-4 mb-0 sm:mb-0 animate-slide-up">
        <div className="rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl overflow-hidden">
          {/* Colored header */}
          <div
            className="relative px-6 pt-6 pb-12"
            style={{
              background: `linear-gradient(135deg, ${worldColor}, ${world?.accentColor ?? worldColor})`,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white/80 hover:bg-white/30 hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Level type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                {isBoss ? "🏆 Boss Fight" : level.type}
              </span>
              <span className="text-white/60 text-[10px] font-medium">
                {level.duration}
              </span>
            </div>

            {/* Block type icons */}
            {blocks.length > 0 && (
              <div className="flex items-center gap-1 mt-2 mb-1">
                {blocks.map((b) => (
                  <span
                    key={b.id}
                    className="flex h-5 w-5 items-center justify-center rounded bg-white/15 text-[10px]"
                    title={b.title}
                  >
                    {BLOCK_ICONS[b.type]}
                  </span>
                ))}
                <span className="text-white/50 text-[10px] ml-1">
                  {blocks.length} blocks
                </span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold text-white leading-tight">
              {level.icon} {level.title}
            </h2>
            <p className="text-white/70 text-sm mt-1">{level.subtitle}</p>

            {/* XP badge */}
            <div className="absolute -bottom-4 left-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold shadow-md"
                style={{ color: worldColor }}
              >
                ⚡ {level.xp} XP
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pt-8 pb-6">
            {/* Pixel buddy */}
            <div className="flex justify-center mb-5">
              <PixelCharacter
                mood={isCompleted ? "celebrate" : level.buddyMood}
                size="lg"
                message={
                  isCompleted
                    ? "Already crushed it! 🎉"
                    : BUDDY_MESSAGES[level.buddyMood]
                }
              />
            </div>

            {/* Mission */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2">
                Mission
              </h3>
              <p className="text-sm text-[#2D2016] leading-relaxed">
                {level.mission}
              </p>
            </div>

            {/* Key concepts */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2">
                What you&apos;ll learn
              </h3>
              <ul className="space-y-2">
                {level.concepts.map((concept, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A3728]">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: `${worldColor}90` }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-snug">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              {isCompleted ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
                  <span>✓</span> Level Complete
                  {level.xpEarned && (
                    <span className="text-[#4CAF50] font-bold ml-1">
                      +{level.xpEarned} XP
                    </span>
                  )}
                </div>
              ) : !hasRepo && level.worldId !== 0 ? (
                <a
                  href="/settings"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#F5EDE0] text-[#8B7355] text-sm font-semibold hover:bg-[#EDE5D8] transition-colors"
                >
                  Set up your project first →
                </a>
              ) : (
                <a
                  href={`/level/${level.id}`}
                  className="flex items-center justify-center w-full py-3.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: worldColor,
                    boxShadow: `0 4px 14px ${worldColor}50`,
                  }}
                >
                  {isBoss ? "🏆 Begin Boss Fight" : "Start Level →"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
