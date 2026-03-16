"use client";

const EARLY_BIRD_SPOTS = 49;

export function EarlyBirdBadge() {
  const spots = EARLY_BIRD_SPOTS;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5EB] border border-[#E8A445]/25 px-3 py-1.5 shadow-sm">
      <span className="text-sm" aria-hidden="true">
        🔥
      </span>
      <span className="text-xs font-semibold text-[#B8792A]">
        {spots} of 200 early bird spots left{" "}
        <span className="font-bold text-[#E8A445]">&mdash; $29</span>
      </span>
    </div>
  );
}
