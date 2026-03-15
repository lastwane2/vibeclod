"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Level } from "@/types";
import type { Block } from "@/types/blocks";
import { BLOCK_ICONS, BLOCK_LABELS, getBlockMinutes } from "@/types/blocks";
import { PixelCharacter } from "@/components/pixel-buddy/PixelCharacter";
import { XPGain } from "@/components/ui/XPGain";
import { LevelUpModal } from "@/components/ui/LevelUpModal";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

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
  blockCompletionData: Record<string, Record<string, unknown>>;
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
  blockCompletionData,
}: LevelDetailClientProps) {
  const router = useRouter();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(() => {
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

      setXpAmount(currentBlock.xp);
      setShowXPGain(true);

      if (data.levelCompleted) {
        setIsCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        if (isBoss) {
          setTimeout(() => setShowLevelUp(true), 1600);
        }
      }

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

  const getBuddyMessage = () => {
    if (isCompleted) return "Level complete! Amazing work!";
    if (completedRequired > 0) return `${completedRequired}/${totalRequired} blocks done!`;
    if (!currentBlock) return level.teaches;
    switch (currentBlock.type) {
      case "theory": return "Read this carefully — there might be a quiz next!";
      case "quiz": return "Take your time, you can retry if you get it wrong.";
      case "prompt": return "Be as specific as possible in your prompt.";
      case "build": return "Make sure to push your code before verifying!";
      case "debug": return "Read the error carefully — the clue is in there.";
      case "review": return "Look for bugs the AI might have missed.";
      case "experiment": return "Try it and see what happens!";
      case "pattern": return "This pattern will help with future prompts.";
      default: return level.teaches;
    }
  };
  const buddyMessage = getBuddyMessage();

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
        <div className="mx-auto max-w-5xl">
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
          </div>

          <h1 className="text-3xl font-bold text-white mt-3">
            {level.icon} {level.title}
          </h1>
          <p className="text-white/70 mt-1">{level.subtitle}</p>

          {/* Block progress bar in hero */}
          {hasBlocks && (
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${(completedIds.size / blocks.length) * 100}%` }}
                />
              </div>
              <span className="text-white/80 text-xs font-medium">
                {completedIds.size}/{blocks.length}
              </span>
              <span className="text-white/50 text-xs">
                ~{blocks.reduce((sum, b) => sum + getBlockMinutes(b), 0)} min
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main content — two column on desktop */}
      <div className="mx-auto max-w-5xl px-4 -mt-6">
        {/* Buddy — compact */}
        <div className="flex justify-center mb-4">
          <PixelCharacter
            mood={buddyMood as "idle" | "happy" | "think" | "celebrate" | "confused"}
            size="lg"
            message={buddyMessage}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Block sidebar / stepper */}
          {hasBlocks && (
            <div className="lg:w-56 shrink-0">
              <div className="rounded-2xl bg-white border border-[#E8E0D4] shadow-sm overflow-hidden lg:sticky lg:top-20">
                <div className="px-3 py-2.5 border-b border-[#E8E0D4] bg-[#FAF6F0]">
                  <p className="text-[10px] font-bold text-[#8B7355] uppercase tracking-wider">
                    Blocks · {completedIds.size} of {blocks.length}
                  </p>
                </div>
                <div className="p-1.5 space-y-0.5 max-h-[60vh] overflow-y-auto">
                  {blocks.map((block, i) => {
                    const isDone = completedIds.has(block.id);
                    const isCurrent = i === currentBlockIndex;

                    return (
                      <button
                        key={block.id}
                        onClick={() => setCurrentBlockIndex(i)}
                        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all ${
                          isCurrent
                            ? "bg-white shadow-sm ring-1"
                            : isDone
                              ? "hover:bg-[#E8F5E8]/30"
                              : "hover:bg-[#FAF6F0]"
                        }`}
                        style={isCurrent ? { ["--tw-ring-color" as string]: worldColor + "60" } : undefined}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs ${
                            isDone
                              ? "bg-[#4CAF50] text-white"
                              : isCurrent
                                ? "text-white"
                                : "bg-[#F5EDE0] text-[#8B7355]"
                          }`}
                          style={isCurrent && !isDone ? { backgroundColor: worldColor } : undefined}
                        >
                          {isDone ? "✓" : BLOCK_ICONS[block.type]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate ${
                            isCurrent ? "text-[#2D2016]" : isDone ? "text-[#6B8B6B]" : "text-[#4A3728]"
                          }`}>
                            {block.title}
                          </p>
                          <p className="text-[9px] text-[#B8A898]">
                            {block.xp} XP · ~{getBlockMinutes(block)}m{!block.required ? " · Bonus" : ""}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Main block content */}
          <div className="flex-1 min-w-0">
            {hasBlocks && currentBlock && (
              <div className="rounded-2xl bg-white border border-[#E8E0D4] shadow-sm overflow-hidden mb-4">
                {/* Block header bar */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E8E0D4] bg-[#FAF6F0]">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
                    style={{ backgroundColor: `${worldColor}15`, color: worldColor }}
                  >
                    {BLOCK_ICONS[currentBlock.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#8B7355] font-medium">
                      {BLOCK_LABELS[currentBlock.type]} · Block {currentBlockIndex + 1} of {blocks.length}
                    </p>
                    <h3 className="text-sm font-bold text-[#2D2016] truncate">{currentBlock.title}</h3>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                    style={{ backgroundColor: `${worldColor}12`, color: worldColor }}
                  >
                    {currentBlock.xp} XP
                  </span>
                </div>

                {/* Block body */}
                <div className="p-5 sm:p-6">
                  <BlockRenderer
                    block={currentBlock}
                    worldColor={worldColor}
                    completed={completedIds.has(currentBlock.id)}
                    completionData={blockCompletionData[currentBlock.id]}
                    connectedRepo={connectedRepo}
                    onComplete={handleBlockComplete}
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {hasBlocks && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setCurrentBlockIndex(Math.max(0, currentBlockIndex - 1))}
                  disabled={currentBlockIndex === 0}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8E0D4] bg-white text-sm font-medium text-[#8B7355] hover:bg-[#FAF6F0] disabled:opacity-30 transition-colors shadow-sm"
                >
                  ← Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentBlockIndex(Math.min(blocks.length - 1, currentBlockIndex + 1))
                  }
                  disabled={currentBlockIndex === blocks.length - 1}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8E0D4] bg-white text-sm font-medium text-[#8B7355] hover:bg-[#FAF6F0] disabled:opacity-30 transition-colors shadow-sm"
                >
                  Next →
                </button>
              </div>
            )}

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
      </div>
    </div>
  );
}
