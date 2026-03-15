"use client";

import { useState } from "react";

export function Paywall() {
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whop/checkout-url");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-[#FAF6F0]/70 backdrop-blur-md"
        onClick={() => setDismissed(true)}
      />

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-[#E8E0D4] p-8 shadow-2xl animate-fade-in">
        {/* Lock icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8A445]/10">
          <svg
            className="h-8 w-8 text-[#E8A445]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        <h2 className="text-center text-xl font-bold text-[#2D2016] mb-1">
          Unlock All Worlds &mdash; $29 Lifetime
        </h2>
        <p className="text-center text-sm text-[#8B7355] mb-6">
          Complete your vibe coding journey
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-6">
          {[
            "30 more levels across 6 worlds",
            "Full stack, deployment & payments",
            "Unlimited AI code reviews",
            "Boss fights & advanced projects",
            "Future worlds & seasons included",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2.5 text-sm text-[#4A3728]"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F5E8] text-[10px] text-[#4CAF50]">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Unlock button */}
        <button
          onClick={handleUnlock}
          disabled={loading}
          className="w-full rounded-xl bg-[#E8A445] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8A445]/30 hover:bg-[#D4932E] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Redirecting..." : "Unlock Now"}
        </button>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="mt-3 w-full py-2 text-center text-xs text-[#8B7355] hover:text-[#2D2016] transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
