"use client";

import { useEffect, useRef, useState } from "react";

// ─── Pixel Art Drawing Helpers ────────────────────
const COLORS = {
  grass: ["#8BC34A", "#7CB342", "#689F38", "#9CCC65"],
  path: ["#D7CCC8", "#BCAAA4", "#A1887F"],
  tree: ["#4CAF50", "#388E3C", "#2E7D32"],
  trunk: ["#795548", "#6D4C41"],
  roof: ["#E06B6B", "#E8A445", "#5B8DEF", "#9B6EC6"],
  wall: ["#FAF6F0", "#F5EDE0", "#E8E0D4"],
  window: ["#FFF9C4", "#5B8DEF"],
  skin: ["#FFCC80", "#FFB74D", "#A1887F"],
  hair: ["#5D4037", "#3E2723", "#FF8A65", "#FFF176"],
  shirt: ["#E8A445", "#5B8DEF", "#E06B6B", "#4CAF50", "#9B6EC6"],
  cloud: ["#FFFFFF", "#F5F5F5"],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Entity {
  x: number;
  y: number;
  type: string;
  color?: string;
  speed?: number;
  dir?: number;
  frame?: number;
  size?: number;
}

function drawPixel(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), s, s);
}

function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  const trunk = pick(COLORS.trunk);
  const leaf = pick(COLORS.tree);
  // Trunk
  drawPixel(ctx, x + s, y + s * 3, s, trunk);
  drawPixel(ctx, x + s, y + s * 4, s, trunk);
  // Leaves
  for (let dy = 0; dy < 3; dy++) {
    for (let dx = 0; dx < 3; dx++) {
      if (dy === 0 && (dx === 0 || dx === 2)) continue;
      drawPixel(ctx, x + dx * s, y + dy * s, s, dy === 0 ? "#2E7D32" : leaf);
    }
  }
}

function drawHouse(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  const roof = pick(COLORS.roof);
  const wall = pick(COLORS.wall);
  const win = pick(COLORS.window);
  // Roof
  drawPixel(ctx, x + s * 2, y, s, roof);
  for (let i = 1; i < 4; i++) drawPixel(ctx, x + i * s, y + s, s, roof);
  for (let i = 0; i < 5; i++) drawPixel(ctx, x + i * s, y + s * 2, s, roof);
  // Walls
  for (let dy = 3; dy < 6; dy++) {
    for (let dx = 0; dx < 5; dx++) {
      drawPixel(ctx, x + dx * s, y + dy * s, s, wall);
    }
  }
  // Window
  drawPixel(ctx, x + s, y + s * 3, s, win);
  drawPixel(ctx, x + s, y + s * 4, s, win);
  drawPixel(ctx, x + s * 3, y + s * 3, s, win);
  drawPixel(ctx, x + s * 3, y + s * 4, s, win);
  // Door
  drawPixel(ctx, x + s * 2, y + s * 4, s, "#795548");
  drawPixel(ctx, x + s * 2, y + s * 5, s, "#795548");
}

function drawPerson(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, e: Entity) {
  const skin = e.color || pick(COLORS.skin);
  const hair = pick(COLORS.hair);
  const shirt = pick(COLORS.shirt);
  const frame = (e.frame || 0) % 4;
  const legOffset = frame < 2 ? 0 : s;

  // Head
  drawPixel(ctx, x, y, s, skin);
  // Hair
  drawPixel(ctx, x, y - s, s, hair);
  // Body
  drawPixel(ctx, x, y + s, s, shirt);
  // Legs
  drawPixel(ctx, x - (legOffset ? s * 0.3 : 0), y + s * 2, s, "#4A3728");
  drawPixel(ctx, x + (legOffset ? s * 0.3 : 0), y + s * 2, s, "#4A3728");
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  const c = pick(COLORS.cloud);
  for (let dx = 0; dx < 4; dx++) drawPixel(ctx, x + dx * s, y + s, s, c);
  drawPixel(ctx, x + s, y, s, c);
  drawPixel(ctx, x + s * 2, y, s, c);
}

// ─── Default Subtle Background ────────────────────
function SubtleBackground() {
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

// ─── ADHD Pixel Town Background ───────────────────
function PixelTownCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesRef = useRef<Entity[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const S = 3; // pixel scale
    const W = canvas.width;
    const H = canvas.height;

    // Generate static entities
    const entities: Entity[] = [];

    // Trees
    for (let i = 0; i < 15; i++) {
      entities.push({
        x: Math.random() * W,
        y: H * 0.3 + Math.random() * H * 0.6,
        type: "tree",
        size: S + Math.floor(Math.random() * 2),
      });
    }

    // Houses
    for (let i = 0; i < 6; i++) {
      entities.push({
        x: 50 + Math.random() * (W - 100),
        y: H * 0.35 + Math.random() * H * 0.4,
        type: "house",
        size: S,
      });
    }

    // Clouds
    for (let i = 0; i < 5; i++) {
      entities.push({
        x: Math.random() * W,
        y: 20 + Math.random() * H * 0.15,
        type: "cloud",
        speed: 0.1 + Math.random() * 0.3,
        size: S + 1,
      });
    }

    // Walking people
    for (let i = 0; i < 8; i++) {
      entities.push({
        x: Math.random() * W,
        y: H * 0.5 + Math.random() * H * 0.35,
        type: "person",
        speed: 0.3 + Math.random() * 0.5,
        dir: Math.random() > 0.5 ? 1 : -1,
        frame: Math.floor(Math.random() * 4),
        color: pick(COLORS.skin),
        size: S,
      });
    }

    // Sort by Y for depth
    entities.sort((a, b) => a.y - b.y);
    entitiesRef.current = entities;

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground gradient
      const groundY = H * 0.85;
      const grd = ctx.createLinearGradient(0, H * 0.3, 0, H);
      grd.addColorStop(0, "rgba(139, 195, 74, 0)");
      grd.addColorStop(0.3, "rgba(139, 195, 74, 0.03)");
      grd.addColorStop(1, "rgba(139, 195, 74, 0.06)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, H * 0.3, W, H * 0.7);

      // Path (horizontal wavy line)
      ctx.fillStyle = "rgba(188, 170, 148, 0.08)";
      for (let x = 0; x < W; x += S) {
        const pathY = groundY + Math.sin(x * 0.01) * 20;
        ctx.fillRect(x, pathY - S * 2, S, S * 4);
      }

      tick++;

      for (const e of entities) {
        const s = e.size || S;
        switch (e.type) {
          case "tree":
            drawTree(ctx, e.x, e.y, s);
            break;
          case "house":
            drawHouse(ctx, e.x, e.y, s);
            break;
          case "cloud":
            drawCloud(ctx, e.x, e.y, s);
            e.x += (e.speed || 0.2);
            if (e.x > W + 50) e.x = -50;
            break;
          case "person":
            drawPerson(ctx, e.x, e.y, s, e);
            e.x += (e.speed || 0.3) * (e.dir || 1);
            if (tick % 15 === 0) e.frame = ((e.frame || 0) + 1) % 4;
            if (e.x > W + 20) { e.x = -20; e.dir = 1; }
            if (e.x < -20) { e.x = W + 20; e.dir = -1; }
            break;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
    />
  );
}

// ─── Main Component ───────────────────────────────
export function PixelBackground() {
  const [adhdMode, setAdhdMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("vibeclod_adhd") === "1";
  });

  const toggle = () => {
    const next = !adhdMode;
    setAdhdMode(next);
    localStorage.setItem("vibeclod_adhd", next ? "1" : "0");
  };

  return (
    <>
      {adhdMode ? <PixelTownCanvas /> : <SubtleBackground />}

      {/* Toggle button — bottom right */}
      <button
        onClick={toggle}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full bg-white/80 border border-[#E8E0D4] px-3 py-1.5 text-[10px] font-medium text-[#8B7355] shadow-sm hover:bg-white hover:text-[#2D2016] transition-all backdrop-blur-sm"
        title={adhdMode ? "Switch to calm mode" : "Switch to pixel town mode"}
      >
        <span className="text-sm">{adhdMode ? "🏙️" : "🌱"}</span>
        {adhdMode ? "Pixel Town" : "Calm"}
      </button>
    </>
  );
}
