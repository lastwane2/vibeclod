import type { Block } from "@/types/blocks";
import { WORLD_0_BLOCKS } from "./world-0";
import { WORLD_1_BLOCKS } from "./world-1";
import { WORLD_2_BLOCKS } from "./world-2";
import { WORLD_3_BLOCKS } from "./world-3";
import { WORLD_4_BLOCKS } from "./world-4";
import { WORLD_5_BLOCKS } from "./world-5";
import { WORLD_6_BLOCKS } from "./world-6";
import { WORLD_7_BLOCKS } from "./world-7";
import { WORLD_8_BLOCKS } from "./world-8";

export const ALL_BLOCKS: Block[] = [
  ...WORLD_0_BLOCKS,
  ...WORLD_1_BLOCKS,
  ...WORLD_2_BLOCKS,
  ...WORLD_3_BLOCKS,
  ...WORLD_4_BLOCKS,
  ...WORLD_5_BLOCKS,
  ...WORLD_6_BLOCKS,
  ...WORLD_7_BLOCKS,
  ...WORLD_8_BLOCKS,
];

export function getBlocksForLevel(levelId: number): Block[] {
  return ALL_BLOCKS.filter((b) => b.levelId === levelId).sort(
    (a, b) => a.order - b.order
  );
}

export function getBlock(blockId: string): Block | undefined {
  return ALL_BLOCKS.find((b) => b.id === blockId);
}

export function getRequiredBlocksForLevel(levelId: number): Block[] {
  return getBlocksForLevel(levelId).filter((b) => b.required);
}

export function getLevelTotalXP(levelId: number): number {
  return getBlocksForLevel(levelId).reduce((sum, b) => sum + b.xp, 0);
}
