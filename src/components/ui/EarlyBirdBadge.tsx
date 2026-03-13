"use client";

interface EarlyBirdBadgeProps {
  spotsLeft?: number;
}

export function EarlyBirdBadge({ spotsLeft }: EarlyBirdBadgeProps) {
  const spots =
    spotsLeft ??
    (typeof window !== "undefined" && process.env.NEXT_PUBLIC_EARLY_BIRD_SPOTS
      ? parseInt(process.env.NEXT_PUBLIC_EARLY_BIRD_SPOTS, 10)
      : 200);

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
