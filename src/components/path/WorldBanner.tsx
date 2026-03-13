"use client";

import type { World } from "@/types";

interface WorldBannerProps {
  world: World;
  isLocked: boolean;
  completedLevels: number;
  totalLevels: number;
}

export function WorldBanner({
  world,
  isLocked,
  completedLevels,
  totalLevels,
}: WorldBannerProps) {
  const progress = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;

  return (
    <div className="relative w-full max-w-sm mx-auto my-6">
      <div
        className={`
          relative overflow-hidden rounded-2xl px-5 py-4
          transition-all duration-500
          ${isLocked
            ? "bg-[#E8E0D4]/60 border-2 border-dashed border-[#D4C4A8]"
            : "border-2 border-transparent shadow-lg"
          }
        `}
        style={
          !isLocked
            ? {
                background: `linear-gradient(135deg, ${world.color}15, ${world.color}08)`,
                borderColor: `${world.color}30`,
              }
            : undefined
        }
      >
        {/* World icon + info */}
        <div className="flex items-center gap-3">
          <div
            className={`
              flex h-11 w-11 items-center justify-center rounded-xl text-xl
              ${isLocked ? "bg-[#D4C4A8]/40 grayscale" : "shadow-md"}
            `}
            style={
              !isLocked
                ? { backgroundColor: `${world.color}20` }
                : undefined
            }
          >
            {isLocked ? "🔒" : world.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`font-bold text-sm truncate ${
                  isLocked ? "text-[#A09080]" : "text-[#2D2016]"
                }`}
              >
                World {world.id}: {world.title}
              </h3>
              {world.requiredPlan === "PRO" && isLocked && (
                <span className="shrink-0 rounded-full bg-[#E8A445]/15 px-2 py-0.5 text-[10px] font-bold text-[#E8A445] uppercase tracking-wider">
                  Pro
                </span>
              )}
            </div>
            <p
              className={`text-xs mt-0.5 ${
                isLocked ? "text-[#B8A898]" : "text-[#8B7355]"
              }`}
            >
              {world.subtitle}
            </p>
          </div>

          {/* Progress fraction */}
          {!isLocked && (
            <div className="text-right shrink-0">
              <span className="text-xs font-bold" style={{ color: world.color }}>
                {completedLevels}/{totalLevels}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!isLocked && (
          <div className="mt-3 h-1.5 w-full rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: world.color,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
