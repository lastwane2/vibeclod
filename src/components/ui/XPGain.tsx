"use client";

import { useEffect, useState } from "react";

interface XPGainProps {
  amount: number;
  onComplete: () => void;
}

/**
 * Floating "+N XP" animation that floats up, scales, and fades out.
 * Uses warm amber/gold color matching the vibeclod theme.
 */
export function XPGain({ amount, onComplete }: XPGainProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <div className="animate-xp-float font-sans">
        <span
          className="inline-flex items-center gap-1.5 rounded-2xl px-5 py-2.5 text-2xl font-bold shadow-xl"
          style={{
            background: "linear-gradient(135deg, #E8A445, #D4932E)",
            color: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(232, 164, 69, 0.4)",
          }}
        >
          <span className="text-xl">⚡</span>
          +{amount} XP
        </span>
      </div>
    </div>
  );
}
