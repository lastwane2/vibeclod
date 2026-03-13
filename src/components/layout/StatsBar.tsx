"use client";

interface StatsBarProps {
  xp: number;
  streakDays: number;
  currentLevel: number;
  plan: "FREE" | "PRO";
}

export function StatsBar({ xp, streakDays, currentLevel, plan }: StatsBarProps) {
  return (
    <div className="mx-auto max-w-md px-4 py-3">
      <div className="flex items-center justify-between rounded-2xl bg-white/70 border border-[#E8E0D4] px-4 py-2.5 shadow-sm backdrop-blur-sm">
        {/* XP */}
        <div className="flex items-center gap-1.5">
          <span className="text-base">⚡</span>
          <div>
            <p className="text-[10px] font-medium text-[#8B7355] uppercase tracking-wider leading-none">XP</p>
            <p className="text-sm font-bold text-[#2D2016] font-mono">{xp.toLocaleString()}</p>
          </div>
        </div>

        <div className="h-6 w-px bg-[#E8E0D4]" />

        {/* Streak */}
        <div className="flex items-center gap-1.5">
          <span className="text-base">{streakDays > 0 ? "🔥" : "❄️"}</span>
          <div>
            <p className="text-[10px] font-medium text-[#8B7355] uppercase tracking-wider leading-none">Streak</p>
            <p className="text-sm font-bold text-[#2D2016] font-mono">{streakDays}d</p>
          </div>
        </div>

        <div className="h-6 w-px bg-[#E8E0D4]" />

        {/* Level */}
        <div className="flex items-center gap-1.5">
          <span className="text-base">🎯</span>
          <div>
            <p className="text-[10px] font-medium text-[#8B7355] uppercase tracking-wider leading-none">Level</p>
            <p className="text-sm font-bold text-[#2D2016] font-mono">{currentLevel}/25</p>
          </div>
        </div>

        <div className="h-6 w-px bg-[#E8E0D4]" />

        {/* Plan */}
        <div className="flex items-center">
          {plan === "PRO" ? (
            <span className="rounded-full bg-gradient-to-r from-[#E8A445] to-[#D4932E] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
              Pro
            </span>
          ) : (
            <span className="rounded-full bg-[#F5EDE0] px-2.5 py-1 text-[10px] font-bold text-[#8B7355] uppercase tracking-wider">
              Free
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
