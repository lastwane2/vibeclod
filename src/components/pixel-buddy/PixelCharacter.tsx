"use client";

import { useEffect, useState } from "react";

type Mood = "idle" | "happy" | "think" | "celebrate" | "confused";

interface PixelCharacterProps {
  mood?: Mood;
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const MOOD_CONFIG: Record<Mood, { eyes: string; mouth: string; anim: string; bg: string }> = {
  idle: { eyes: "● ●", mouth: "‿", anim: "", bg: "from-[#3D2B1F] to-[#2D2016]" },
  happy: { eyes: "◕ ◕", mouth: "◡", anim: "animate-bounce-subtle", bg: "from-[#3D6B2F] to-[#2D5016]" },
  think: { eyes: "◑ ◐", mouth: "―", anim: "animate-think", bg: "from-[#3D3B5F] to-[#2D2B4F]" },
  celebrate: { eyes: "★ ★", mouth: "◡", anim: "animate-celebrate", bg: "from-[#6B3D2F] to-[#5B2D1F]" },
  confused: { eyes: "◔ ◔", mouth: "~", anim: "", bg: "from-[#5B4B3F] to-[#4B3B2F]" },
};

const SIZE_MAP = {
  sm: { container: "w-10 h-10", face: "text-[6px]", message: "text-[10px]" },
  md: { container: "w-14 h-14", face: "text-[8px]", message: "text-xs" },
  lg: { container: "w-20 h-20", face: "text-[11px]", message: "text-sm" },
};

export function PixelCharacter({
  mood = "idle",
  size = "md",
  message,
  className = "",
}: PixelCharacterProps) {
  const config = MOOD_CONFIG[mood];
  const sizeConfig = SIZE_MAP[size];
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div
        className={`
          ${sizeConfig.container} ${config.anim}
          relative flex items-center justify-center
          rounded-xl bg-gradient-to-b ${config.bg}
          shadow-lg shadow-black/20
          border border-white/10
          transition-all duration-300
        `}
      >
        {/* Pixel face */}
        <div className={`${sizeConfig.face} font-mono leading-tight text-center select-none`}>
          <div className="text-white tracking-wider">
            {blink ? "— —" : config.eyes}
          </div>
          <div className="text-white/80 mt-px">{config.mouth}</div>
        </div>

        {/* Shine effect */}
        <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />

        {/* Celebrate particles */}
        {mood === "celebrate" && (
          <>
            <span className="absolute -top-1 -left-1 text-[8px] animate-float-1">✨</span>
            <span className="absolute -top-2 right-0 text-[8px] animate-float-2">🎉</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] animate-float-3">⭐</span>
          </>
        )}
      </div>

      {message && (
        <div
          className={`
            ${sizeConfig.message} max-w-[160px] text-center
            rounded-lg bg-white px-2.5 py-1.5
            text-[#2D2016] font-medium
            shadow-sm border border-[#E8E0D4]
            relative
          `}
        >
          {/* Speech bubble arrow */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-[#E8E0D4] rotate-45" />
          <span className="relative z-10">{message}</span>
        </div>
      )}
    </div>
  );
}
