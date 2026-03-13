"use client";

import type { Block } from "@/types/blocks";
import { BLOCK_ICONS } from "@/types/blocks";

interface Props {
  blocks: Block[];
  completedBlockIds: Set<string>;
  currentBlockIndex: number;
  worldColor: string;
  onBlockClick: (index: number) => void;
}

export function BlockProgress({
  blocks,
  completedBlockIds,
  currentBlockIndex,
  worldColor,
  onBlockClick,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {blocks.map((block, i) => {
        const isCompleted = completedBlockIds.has(block.id);
        const isCurrent = i === currentBlockIndex;

        return (
          <button
            key={block.id}
            onClick={() => onBlockClick(i)}
            className={`relative flex items-center justify-center transition-all ${
              isCurrent
                ? "h-8 w-8 rounded-lg ring-2 ring-offset-1"
                : "h-6 w-6 rounded-md"
            } ${
              isCompleted
                ? "bg-[#E8F5E8]"
                : isCurrent
                  ? "bg-white shadow-sm"
                  : "bg-[#F5EDE0]"
            }`}
            style={{
              ["--tw-ring-color" as string]: isCurrent ? worldColor : undefined,
            }}
            title={block.title}
          >
            <span className={`${isCurrent ? "text-sm" : "text-[10px]"}`}>
              {isCompleted ? "✓" : BLOCK_ICONS[block.type]}
            </span>
            {!block.required && (
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#B8A898]" title="Optional" />
            )}
          </button>
        );
      })}
    </div>
  );
}
