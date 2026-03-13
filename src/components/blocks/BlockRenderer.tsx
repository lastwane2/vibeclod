"use client";

import type { Block } from "@/types/blocks";
import { BLOCK_ICONS, BLOCK_LABELS } from "@/types/blocks";
import { TheoryBlock } from "./TheoryBlock";
import { QuizBlock } from "./QuizBlock";
import { PromptBlock } from "./PromptBlock";
import { BuildBlock } from "./BuildBlock";
import { DebugBlock } from "./DebugBlock";
import { ReviewBlock } from "./ReviewBlock";
import { ExperimentBlock } from "./ExperimentBlock";
import { PatternBlock } from "./PatternBlock";

interface Props {
  block: Block;
  worldColor: string;
  completed: boolean;
  connectedRepo: string | null;
  onComplete: (data: Record<string, unknown>) => void;
}

export function BlockRenderer({ block, worldColor, completed, connectedRepo, onComplete }: Props) {
  return (
    <div>
      {/* Block header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{BLOCK_ICONS[block.type]}</span>
        <div>
          <p className="text-xs font-bold text-[#8B7355] uppercase tracking-wider">
            {BLOCK_LABELS[block.type]}
          </p>
          <h3 className="text-base font-bold text-[#2D2016]">{block.title}</h3>
        </div>
        <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${worldColor}15`, color: worldColor }}>
          {block.xp} XP
        </span>
      </div>

      {/* Block content by type */}
      {block.type === "theory" && (
        <TheoryBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
      {block.type === "quiz" && (
        <QuizBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
      {block.type === "prompt" && (
        <PromptBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
      {block.type === "build" && (
        <BuildBlock block={block} worldColor={worldColor} completed={completed} connectedRepo={connectedRepo} onComplete={onComplete} />
      )}
      {block.type === "debug" && (
        <DebugBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
      {block.type === "review" && (
        <ReviewBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
      {block.type === "experiment" && (
        <ExperimentBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
      {block.type === "pattern" && (
        <PatternBlock block={block} worldColor={worldColor} completed={completed} onComplete={onComplete} />
      )}
    </div>
  );
}
