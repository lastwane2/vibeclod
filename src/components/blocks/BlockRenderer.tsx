"use client";

import type { Block } from "@/types/blocks";
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
    <>
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
    </>
  );
}
