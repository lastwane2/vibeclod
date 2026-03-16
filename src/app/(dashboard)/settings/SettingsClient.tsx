"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { trackUpgradeClick } from "@/lib/analytics";

interface GitHubRepo {
  fullName: string;
  name: string;
  private: boolean;
  description: string | null;
  updatedAt: string | null;
}

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
  const [upgrading, setUpgrading] = useState(false);
  const [billingSuccess, setBillingSuccess] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle ?billing=success redirect from Whop
  useEffect(() => {
    if (searchParams.get("billing") === "success") {
      setBillingSuccess(true);
      router.replace("/settings");
    }
  }, [searchParams, router]);

  const handleUpgrade = useCallback(async () => {
    setUpgrading(true);
    trackUpgradeClick();
    try {
      const res = await fetch("/api/whop/checkout-url");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setUpgrading(false);
      }
    } catch {
      setUpgrading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/user/repos")
      .then((res) => res.json())
      .then((data) => {
        if (data.repos) {
          setRepos(data.repos);
        } else {
          setReposError(data.error ?? "Failed to load repos");
        }
      })
      .catch(() => setReposError("Failed to load repos"))
      .finally(() => setLoadingRepos(false));
  }, []);

  const handleSaveRepo = async () => {
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
              {loadingRepos ? (
                <div className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] px-3 py-2.5 text-sm text-[#B8A898] flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-[#8B7355]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading repos...
                </div>
              ) : reposError ? (
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => {
                    setRepoInput(e.target.value);
                    setError(null);
                    setSaved(false);
                  }}
                  placeholder="owner/repo"
                  className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] px-3 py-2.5 text-sm text-[#2D2016] placeholder:text-[#C4B4A4] focus:outline-none focus:ring-2 focus:ring-[#E8A445]/30 focus:border-[#E8A445] transition-all"
                />
              ) : (
                <select
                  value={repoInput}
                  onChange={(e) => {
                    setRepoInput(e.target.value);
                    setError(null);
                    setSaved(false);
                  }}
                  className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] px-3 py-2.5 text-sm text-[#2D2016] focus:outline-none focus:ring-2 focus:ring-[#E8A445]/30 focus:border-[#E8A445] transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B7355' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                >
                  <option value="">Select a repository...</option>
                  {repos.map((r) => (
                    <option key={r.fullName} value={r.fullName}>
                      {r.fullName}{r.private ? " 🔒" : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button
              onClick={handleSaveRepo}
              disabled={saving || loadingRepos}
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

          {billingSuccess && (
            <div className="mb-4 rounded-xl bg-[#E8F5E8] border border-[#C8E6C9] px-4 py-3 text-sm text-[#2D6A2D]">
              Payment successful! Your plan will activate shortly.
            </div>
          )}

          {plan === "PRO" ? (
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gradient-to-r from-[#E8A445] to-[#D4932E] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                  Pro — Lifetime
                </span>
                <span className="text-sm text-[#8B7355]">All 40 levels unlocked</span>
              </div>
              <button
                onClick={() => {
                  const isSandbox = process.env.NEXT_PUBLIC_WHOP_SANDBOX === "true";
                  window.open(isSandbox ? "https://sandbox.whop.com/orders" : "https://whop.com/orders", "_blank");
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#8B7355] hover:text-[#2D2016] transition-colors"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Manage Billing
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-[#F5EDE0] px-3 py-1.5 text-xs font-bold text-[#8B7355]">
                  Free
                </span>
                <span className="text-sm text-[#8B7355]">Worlds 1-2 (10 levels free)</span>
              </div>
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E8A445] px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#D4932E] transition-colors disabled:opacity-60"
              >
                {upgrading ? "Redirecting..." : "Upgrade to Pro — $29 lifetime"}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
