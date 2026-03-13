"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export function TopBar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8E0D4]/80 bg-[#FAF6F0]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-3 sm:px-4">
        <Link href="/dashboard" className="flex items-center gap-2 group min-h-[44px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E8A445] to-[#D4932E] shadow-sm group-hover:shadow-md transition-shadow">
            <span className="text-sm font-bold text-white">V</span>
          </div>
          <span className="text-lg font-bold text-[#2D2016] hidden sm:block">
            vibeclod
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/60 transition-colors min-h-[44px] touch-manipulation"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt=""
                    className="h-8 w-8 sm:h-7 sm:w-7 rounded-full ring-2 ring-[#E8E0D4]"
                  />
                ) : (
                  <div className="h-8 w-8 sm:h-7 sm:w-7 rounded-full bg-[#E8A445] flex items-center justify-center text-white text-xs font-bold">
                    {session.user.name?.[0] ?? "?"}
                  </div>
                )}
                <span className="text-sm font-medium text-[#2D2016] hidden sm:block">
                  {session.user.name}
                </span>
                <svg
                  className={`h-3.5 w-3.5 text-[#8B7355] transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl bg-white border border-[#E8E0D4] shadow-lg py-1 animate-fade-in">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 sm:py-2.5 text-sm text-[#2D2016] hover:bg-[#FAF6F0] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Path
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 sm:py-2.5 text-sm text-[#2D2016] hover:bg-[#FAF6F0] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-[#E8E0D4]" />
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block w-full text-left px-4 py-3 sm:py-2.5 text-sm text-[#B8553A] hover:bg-[#FFF5F5] transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-[#2D2016] px-4 py-2 text-sm font-medium text-white hover:bg-[#4A3728] transition-colors shadow-sm min-h-[44px] flex items-center"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
