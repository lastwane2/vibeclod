"use client";

import type { LevelWithStatus } from "@/types";
import { getWorld } from "@/lib/levels";

interface LevelNodeProps {
  level: LevelWithStatus;
  position: "left" | "center" | "right";
  onClick: (level: LevelWithStatus) => void;
}

export function LevelNode({ level, position, onClick }: LevelNodeProps) {
  const world = getWorld(level.worldId);
  const worldColor = world?.color ?? "#E8A445";
  const isBoss = level.type === "boss";
  const isCompleted = level.status === "completed";
  const isCurrent = level.status === "current" || level.status === "available";
  const isLocked = level.status === "locked";

  // Smaller zigzag offset on mobile (translate-x-8 = 2rem) vs desktop (translate-x-12 = 3rem)
  const positionOffset =
    position === "left"
      ? "-translate-x-8 sm:-translate-x-12"
      : position === "right"
        ? "translate-x-8 sm:translate-x-12"
        : "";

  return (
    <button
      onClick={() => !isLocked && onClick(level)}
      disabled={isLocked}
      className={`
        group relative flex flex-col items-center
        ${positionOffset}
        transition-all duration-300
        ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}
        touch-manipulation
      `}
    >
      {/* Glow ring for current level */}
      {isCurrent && (
        <div
          className="absolute inset-0 -m-2 rounded-full animate-pulse-slow opacity-40 blur-md"
          style={{ backgroundColor: worldColor }}
        />
      )}

      {/* The node itself */}
      <div
        className={`
          relative flex items-center justify-center
          transition-all duration-300
          ${isBoss
            ? "h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] rounded-2xl"
            : "h-[52px] w-[52px] sm:h-[58px] sm:w-[58px] rounded-full"
          }
          ${isLocked
            ? "bg-[#E0D5C7] shadow-sm"
            : isCompleted
              ? "shadow-lg"
              : "shadow-md"
          }
          ${isCurrent && !isLocked
            ? "ring-3 ring-offset-2 ring-offset-[#FAF6F0] scale-105"
            : ""
          }
          ${!isLocked ? "group-hover:scale-110 group-active:scale-95" : ""}
        `}
        style={{
          backgroundColor: isLocked ? undefined : worldColor,
          ["--tw-ring-color" as string]: isCurrent && !isLocked ? worldColor : undefined,
          boxShadow: !isLocked
            ? `0 4px 14px ${worldColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`
            : undefined,
        }}
      >
        {/* Inner highlight */}
        {!isLocked && (
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/20 to-transparent" />
        )}

        {/* Icon / Number */}
        <span
          className={`
            relative z-10 select-none
            ${isBoss ? "text-2xl" : "text-lg"}
            ${isLocked ? "text-[#B8A898]" : "text-white"}
          `}
        >
          {isLocked ? "🔒" : isCompleted ? "✓" : level.icon}
        </span>

        {/* Completed checkmark badge */}
        {isCompleted && (
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#4CAF50] border-2 border-[#FAF6F0] shadow-sm">
            <span className="text-[10px] text-white">✓</span>
          </div>
        )}

        {/* Boss crown */}
        {isBoss && !isLocked && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm">
            👑
          </div>
        )}
      </div>

      {/* Level title */}
      <span
        className={`
          mt-2 text-[11px] font-semibold text-center max-w-[90px] leading-tight
          transition-colors duration-200
          ${isLocked
            ? "text-[#B8A898]"
            : isCompleted
              ? "text-[#6B8B6B]"
              : "text-[#2D2016]"
          }
        `}
      >
        {level.title}
      </span>

      {/* XP badge for current/available */}
      {isCurrent && !isLocked && (
        <span
          className="mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
          style={{ backgroundColor: `${worldColor}CC` }}
        >
          +{level.xp} XP
        </span>
      )}
    </button>
  );
}
