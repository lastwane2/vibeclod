"use client";

import { useState } from "react";

interface SettingsClientProps {
  name: string | null;
  email: string;
  image: string | null;
  plan: "FREE" | "PRO";
  connectedRepo: string | null;
  xp: number;
  currentLevel: number;
  streakDays: number;
  memberSince: string;
}

export function SettingsClient({
  name,
  email,
  image,
  plan,
  connectedRepo,
  xp,
  currentLevel,
  streakDays,
  memberSince,
}: SettingsClientProps) {
  const [repoInput, setRepoInput] = useState(connectedRepo ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveRepo = async () => {
    // Validate format: owner/repo
    if (repoInput && !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repoInput)) {
      setError("Format: owner/repo (e.g. john/my-project)");
      return;
    }

    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectedRepo: repoInput || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-[#2D2016]">Settings</h1>

      <div className="space-y-5">
        {/* Profile */}
        <section className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-4">
            Profile
          </h2>
          <div className="flex items-center gap-4">
            {image ? (
              <img
                src={image}
                alt=""
                className="h-14 w-14 rounded-xl ring-2 ring-[#E8E0D4] shadow-sm"
              />
            ) : (
              <div className="h-14 w-14 rounded-xl bg-[#E8A445] flex items-center justify-center text-white text-xl font-bold">
                {name?.[0] ?? "?"}
              </div>
            )}
            <div>
              <p className="font-semibold text-[#2D2016]">{name}</p>
              <p className="text-sm text-[#8B7355]">{email}</p>
              <p className="text-xs text-[#B8A898] mt-0.5">
                Member since {new Date(memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#E8E0D4]">
            <div className="text-center">
              <p className="text-lg font-bold text-[#2D2016] font-mono">
                {xp.toLocaleString()}
              </p>
              <p className="text-[10px] font-medium text-[#8B7355] uppercase tracking-wider">
                Total XP
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#2D2016] font-mono">
                {currentLevel}
              </p>
              <p className="text-[10px] font-medium text-[#8B7355] uppercase tracking-wider">
                Level
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#2D2016] font-mono">
                {streakDays}
              </p>
              <p className="text-[10px] font-medium text-[#8B7355] uppercase tracking-wider">
                Day Streak
              </p>
            </div>
          </div>
        </section>

        {/* Repository */}
        <section className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-1">
            Your Project
          </h2>
          <p className="text-xs text-[#B8A898] mb-4">
            Your code lives here — like a folder in the cloud. We check it when you verify levels.
          </p>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8A898] text-sm">
                github.com/
              </span>
              <input
                type="text"
                value={repoInput}
                onChange={(e) => {
                  setRepoInput(e.target.value);
                  setError(null);
                  setSaved(false);
                }}
                placeholder="owner/repo"
                className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] pl-[6.5rem] pr-3 py-2.5 text-sm text-[#2D2016] placeholder:text-[#C4B4A4] focus:outline-none focus:ring-2 focus:ring-[#E8A445]/30 focus:border-[#E8A445] transition-all"
              />
            </div>
            <button
              onClick={handleSaveRepo}
              disabled={saving}
              className="shrink-0 rounded-xl bg-[#2D2016] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4A3728] disabled:opacity-50 transition-colors"
            >
              {saving ? "..." : "Save"}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-xs text-[#B8553A]">{error}</p>
          )}
          {saved && (
            <p className="mt-2 text-xs text-[#4CAF50] font-medium">
              ✓ Repository saved
            </p>
          )}

          {connectedRepo && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E8F5E8] px-3 py-1 text-xs text-[#2D6A2D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4CAF50]" />
              Currently connected: <span className="font-mono font-medium">{connectedRepo}</span>
            </div>
          )}
        </section>

        {/* Plan */}
        <section className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-4">
            Plan
          </h2>

          {plan === "PRO" ? (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-[#E8A445] to-[#D4932E] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                Pro — Lifetime
              </span>
              <span className="text-sm text-[#8B7355]">All 40 levels unlocked</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-[#F5EDE0] px-3 py-1.5 text-xs font-bold text-[#8B7355]">
                  Free
                </span>
                <span className="text-sm text-[#8B7355]">Worlds 1-2 (10 levels free)</span>
              </div>
              <a
                href={process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL || "/pricing"}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E8A445] px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#D4932E] transition-colors"
              >
                Upgrade to Pro — $29 lifetime
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
