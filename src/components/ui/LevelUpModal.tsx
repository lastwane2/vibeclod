"use client";

import { useEffect, useState } from "react";

interface LevelUpModalProps {
  worldTitle: string;
  nextWorldTitle?: string;
  onClose: () => void;
}

/**
 * Celebration modal shown when user completes a world's boss level.
 * Auto-dismisses after 5 seconds or on click.
 * Warm beige/gold aesthetic matching #FAF6F0 theme.
 */
export function LevelUpModal({
  worldTitle,
  nextWorldTitle,
  onClose,
}: LevelUpModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Modal */}
      <div
        className="relative max-w-sm w-full rounded-3xl p-8 text-center transition-all duration-300 font-sans"
        style={{
          background: "linear-gradient(145deg, #FAF6F0, #F5EDE0)",
          border: "2px solid #E8A445",
          boxShadow: visible
            ? "0 0 60px rgba(232, 164, 69, 0.3), 0 0 120px rgba(232, 164, 69, 0.1), 0 24px 48px rgba(0, 0, 0, 0.15)"
            : "none",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
          opacity: visible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sparkle decorations */}
        <div className="absolute -top-3 -left-3 text-2xl animate-pulse-slow">
          ✨
        </div>
        <div
          className="absolute -top-2 -right-3 text-xl"
          style={{ animationDelay: "0.5s", animationDuration: "2s" }}
        >
          ⭐
        </div>
        <div
          className="absolute -bottom-2 -left-2 text-lg animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        >
          💫
        </div>
        <div className="absolute -bottom-3 -right-2 text-2xl animate-pulse-slow">
          ✨
        </div>

        {/* Crown icon */}
        <div className="text-5xl mb-4 animate-celebrate">👑</div>

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #E8A445, #D4932E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          World Complete!
        </h2>

        {/* World name */}
        <p className="text-lg font-semibold text-[#2D2016] mb-1">
          {worldTitle}
        </p>

        <p className="text-sm text-[#8B7355] mb-6">
          You conquered every level. Legendary.
        </p>

        {/* Next world info */}
        {nextWorldTitle && (
          <div
            className="rounded-xl px-4 py-3 mb-5"
            style={{
              background: "linear-gradient(135deg, #E8A44520, #D4932E10)",
              border: "1px solid #E8A44530",
            }}
          >
            <p className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-1">
              Next Up
            </p>
            <p className="text-base font-bold text-[#2D2016]">
              {nextWorldTitle} unlocked!
            </p>
          </div>
        )}

        {/* Dismiss button */}
        <button
          onClick={handleClose}
          className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #E8A445, #D4932E)",
            boxShadow: "0 4px 14px rgba(232, 164, 69, 0.4)",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
