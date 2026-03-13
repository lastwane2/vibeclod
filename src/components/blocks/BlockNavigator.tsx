"use client";

import type { Block } from "@/types/blocks";
import { BLOCK_ICONS, BLOCK_LABELS } from "@/types/blocks";

interface Props {
  blocks: Block[];
  completedBlockIds: Set<string>;
  currentBlockIndex: number;
  worldColor: string;
  onBlockClick: (index: number) => void;
}

export function BlockNavigator({
  blocks,
  completedBlockIds,
  currentBlockIndex,
  worldColor,
  onBlockClick,
}: Props) {
  return (
    <div className="space-y-1.5">
      {blocks.map((block, i) => {
        const isCompleted = completedBlockIds.has(block.id);
        const isCurrent = i === currentBlockIndex;

        return (
          <button
            key={block.id}
            onClick={() => onBlockClick(i)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
              isCurrent
                ? "bg-white shadow-sm border-2"
                : isCompleted
                  ? "bg-[#E8F5E8]/50 hover:bg-[#E8F5E8]"
                  : "hover:bg-[#FAF6F0]"
            }`}
            style={isCurrent ? { borderColor: worldColor } : undefined}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm ${
              isCompleted
                ? "bg-[#4CAF50] text-white"
                : isCurrent
                  ? "text-white"
                  : "bg-[#F5EDE0] text-[#8B7355]"
            }`}
              style={isCurrent && !isCompleted ? { backgroundColor: worldColor } : undefined}
            >
              {isCompleted ? "✓" : BLOCK_ICONS[block.type]}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                isCurrent ? "text-[#2D2016]" : isCompleted ? "text-[#6B8B6B]" : "text-[#4A3728]"
              }`}>
                {block.title}
              </p>
              <p className="text-[10px] text-[#8B7355]">
                {BLOCK_LABELS[block.type]} · {block.xp} XP
                {!block.required && " · Optional"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
