"use client";

export function PixelBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0] to-[#F5EDE0]" />

      {/* Floating orbs */}
      <div
        className="absolute rounded-full opacity-[0.04] animate-float-slow"
        style={{ width: 300, height: 300, top: "10%", left: "5%", background: "#E8A445" }}
      />
      <div
        className="absolute rounded-full opacity-[0.03] animate-float-slower"
        style={{ width: 400, height: 400, top: "40%", right: "0%", background: "#5B8DEF" }}
      />
      <div
        className="absolute rounded-full opacity-[0.04] animate-float-slow"
        style={{ width: 250, height: 250, bottom: "10%", left: "20%", background: "#9B6EC6" }}
      />
      <div
        className="absolute rounded-full opacity-[0.03] animate-float-slower"
        style={{ width: 350, height: 350, top: "5%", right: "20%", background: "#4CAF50" }}
      />

      {/* Tiny floating dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-dot"
          style={{
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            top: `${10 + (i * 4.2) % 80}%`,
            left: `${5 + (i * 5.3) % 90}%`,
            background: ["#E8A445", "#5B8DEF", "#4CAF50", "#9B6EC6", "#E06B6B"][i % 5],
            opacity: 0.08 + (i % 3) * 0.03,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 5) * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
