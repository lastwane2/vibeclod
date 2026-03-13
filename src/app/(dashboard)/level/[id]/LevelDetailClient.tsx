"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Level } from "@/types";
import type { Block } from "@/types/blocks";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";
import { XPGain } from "@/components/ui/XPGain";
import { LevelUpModal } from "@/components/ui/LevelUpModal";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { BlockProgress } from "@/components/blocks/BlockProgress";
import { BlockNavigator } from "@/components/blocks/BlockNavigator";

type BlockWithStatus = Block & {
  completed: boolean;
};

interface LevelDetailClientProps {
  level: Level;
  blocks: BlockWithStatus[];
  worldColor: string;
  worldAccentColor: string;
  worldTitle: string;
  nextWorldTitle?: string;
  isCompleted: boolean;
  connectedRepo: string | null;
  completedBlockIds: string[];
}

export function LevelDetailClient({
  level,
  blocks,
  worldColor,
  worldAccentColor,
  worldTitle,
  nextWorldTitle,
  isCompleted: initialCompleted,
  connectedRepo,
  completedBlockIds: initialCompletedIds,
}: LevelDetailClientProps) {
  const router = useRouter();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(() => {
    // Start at first incomplete block
    const firstIncomplete = blocks.findIndex(
      (b) => !initialCompletedIds.includes(b.id)
    );
    return firstIncomplete >= 0 ? firstIncomplete : 0;
  });
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(initialCompletedIds)
  );
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isBoss = level.type === "boss";
  const currentBlock = blocks[currentBlockIndex];
  const hasBlocks = blocks.length > 0;

  const totalRequired = blocks.filter((b) => b.required).length;
  const completedRequired = blocks.filter(
    (b) => b.required && completedIds.has(b.id)
  ).length;

  const handleBlockComplete = useCallback(
    (data: Record<string, unknown>) => {
      if (!currentBlock) return;

      const newCompleted = new Set(completedIds);
      newCompleted.add(currentBlock.id);
      setCompletedIds(newCompleted);

      // Show XP
      setXpAmount(currentBlock.xp);
      setShowXPGain(true);

      // Check if we got level completion from the API
      if (data.levelCompleted) {
        setIsCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        if (isBoss) {
          setTimeout(() => setShowLevelUp(true), 1600);
        }
      }

      // Auto-advance to next incomplete block
      const nextIncomplete = blocks.findIndex(
        (b, i) => i > currentBlockIndex && !newCompleted.has(b.id)
      );
      if (nextIncomplete >= 0) {
        setTimeout(() => setCurrentBlockIndex(nextIncomplete), 800);
      }
    },
    [currentBlock, completedIds, blocks, currentBlockIndex, isBoss]
  );

  const buddyMood = isCompleted
    ? "celebrate"
    : completedRequired > 0
      ? "happy"
      : level.buddyMood;

  const buddyMessage = isCompleted
    ? "Level complete! Amazing work!"
    : completedRequired > 0
      ? `${completedRequired}/${totalRequired} blocks done!`
      : level.teaches;

  return (
    <div className="min-h-screen pb-12 relative">
      {/* Confetti */}
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

      {showXPGain && (
        <XPGain amount={xpAmount} onComplete={() => setShowXPGain(false)} />
      )}

      {showLevelUp && (
        <LevelUpModal
          worldTitle={worldTitle}
          nextWorldTitle={nextWorldTitle}
          onClose={() => setShowLevelUp(false)}
        />
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
          {hasBlocks && (
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/80">
              {blocks.length} blocks
            </span>
          )}
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

      <div className="mx-auto max-w-lg px-4 pt-8">
        {/* Buddy */}
        <div className="flex justify-center mb-4">
          <PixelCharacter
            mood={buddyMood as "idle" | "happy" | "think" | "celebrate" | "confused"}
            size="lg"
            message={buddyMessage}
          />
        </div>

        {/* Block progress dots */}
        {hasBlocks && (
          <BlockProgress
            blocks={blocks}
            completedBlockIds={completedIds}
            currentBlockIndex={currentBlockIndex}
            worldColor={worldColor}
            onBlockClick={setCurrentBlockIndex}
          />
        )}

        {/* Current block content */}
        {hasBlocks && currentBlock && (
          <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
            <BlockRenderer
              block={currentBlock}
              worldColor={worldColor}
              completed={completedIds.has(currentBlock.id)}
              connectedRepo={connectedRepo}
              onComplete={handleBlockComplete}
            />
          </div>
        )}

        {/* Block navigator (collapsible) */}
        {hasBlocks && (
          <details className="mb-5 group">
            <summary className="cursor-pointer text-xs text-[#8B7355] hover:text-[#2D2016] transition-colors text-center py-2">
              All blocks ({completedIds.size}/{blocks.length})
            </summary>
            <div className="mt-2 rounded-2xl bg-white border border-[#E8E0D4] p-3 shadow-sm">
              <BlockNavigator
                blocks={blocks}
                completedBlockIds={completedIds}
                currentBlockIndex={currentBlockIndex}
                worldColor={worldColor}
                onBlockClick={setCurrentBlockIndex}
              />
            </div>
          </details>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setCurrentBlockIndex(Math.max(0, currentBlockIndex - 1))}
            disabled={currentBlockIndex === 0}
            className="flex-1 py-2.5 rounded-xl border border-[#E8E0D4] text-sm font-medium text-[#8B7355] hover:bg-[#FAF6F0] disabled:opacity-30 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              setCurrentBlockIndex(Math.min(blocks.length - 1, currentBlockIndex + 1))
            }
            disabled={currentBlockIndex === blocks.length - 1}
            className="flex-1 py-2.5 rounded-xl border border-[#E8E0D4] text-sm font-medium text-[#8B7355] hover:bg-[#FAF6F0] disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Level complete action */}
        {isCompleted && (
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
        )}
      </div>
    </div>
  );
}
