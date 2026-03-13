"use client";

import { useState, useCallback } from "react";
import type { LevelWithStatus } from "@/types";
import type { World } from "@/types";
import { WORLDS, getLevelsForWorld } from "@/lib/levels";
import { WorldBanner } from "./WorldBanner";
import { LevelNode } from "./LevelNode";
import { PathConnector } from "./PathConnector";
import { LevelPopup } from "./LevelPopup";

interface PathViewProps {
  completedLevelIds: number[];
  currentLevel: number;
  userPlan: "FREE" | "PRO";
  hasRepo: boolean;
}

// Zigzag pattern for nodes within a world
const ZIGZAG_POSITIONS: ("left" | "center" | "right")[][] = [
  ["center", "right", "center", "left", "center"],
];

function getLevelStatus(
  levelId: number,
  completedIds: number[],
  currentLevel: number,
  worldLocked: boolean
): LevelWithStatus["status"] {
  if (worldLocked) return "locked";
  if (completedIds.includes(levelId)) return "completed";
  if (levelId === currentLevel) return "current";
  if (levelId < currentLevel) return "available";
  return "locked";
}

export function PathView({
  completedLevelIds,
  currentLevel,
  userPlan,
  hasRepo,
}: PathViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<LevelWithStatus | null>(null);

  const handleLevelClick = useCallback((level: LevelWithStatus) => {
    setSelectedLevel(level);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedLevel(null);
  }, []);

  const handleVerify = useCallback((levelId: number) => {
    // Will be connected to verification API in Phase 2
    window.location.href = `/level/${levelId}`;
  }, []);

  return (
    <div className="relative pb-20">
      {WORLDS.map((world) => {
        const worldLevels = getLevelsForWorld(world.id);
        const isWorldLocked =
          world.requiredPlan === "PRO" && userPlan === "FREE";
        const completedInWorld = worldLevels.filter((l) =>
          completedLevelIds.includes(l.id)
        ).length;

        const positions = ZIGZAG_POSITIONS[0];

        const levelsWithStatus: LevelWithStatus[] = worldLevels.map((level, i) => ({
          ...level,
          status: getLevelStatus(
            level.id,
            completedLevelIds,
            currentLevel,
            isWorldLocked
          ),
        }));

        return (
          <div key={world.id}>
            <WorldBanner
              world={world}
              isLocked={isWorldLocked}
              completedLevels={completedInWorld}
              totalLevels={worldLevels.length}
            />

            <div className="flex flex-col items-center">
              {levelsWithStatus.map((level, i) => {
                const pos = positions[i % positions.length];
                const nextPos =
                  i < levelsWithStatus.length - 1
                    ? positions[(i + 1) % positions.length]
                    : null;
                const isLastInWorld = i === levelsWithStatus.length - 1;

                return (
                  <div key={level.id} className="flex flex-col items-center">
                    <LevelNode
                      level={level}
                      position={pos}
                      onClick={handleLevelClick}
                    />

                    {!isLastInWorld && nextPos && (
                      <PathConnector
                        from={pos}
                        to={nextPos}
                        completed={
                          level.status === "completed" &&
                          levelsWithStatus[i + 1].status !== "locked"
                        }
                        worldColor={world.color}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Level popup */}
      <LevelPopup
        level={selectedLevel}
        onClose={handleClose}
        onVerify={handleVerify}
        hasRepo={hasRepo}
      />
    </div>
  );
}
