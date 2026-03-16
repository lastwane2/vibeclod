import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
export const alt = "vibeclod — Duolingo, but for vibe coding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = readFileSync(join(process.cwd(), "public", "PressStart2P.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2D2016 0%, #4A3728 100%)",
          position: "relative",
        }}
      >
        {/* Pixel grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, #E8A445 0%, #D4932E 50%, #E8A445 100%)",
          }}
        />

        {/* Pixel buddy */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #E8A445, #D4932E)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 8px 32px rgba(232,164,69,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Eyes */}
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "white",
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "white",
                }}
              />
            </div>
            {/* Mouth */}
            <div
              style={{
                width: 18,
                height: 6,
                borderRadius: "0 0 6px 6px",
                background: "white",
                marginTop: 4,
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: '"Press Start 2P"',
            fontSize: 56,
            color: "#E8A445",
            letterSpacing: 4,
            marginBottom: 16,
          }}
        >
          vibeclod
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: '"Press Start 2P"',
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 40,
          }}
        >
          Duolingo, but for vibe coding
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          {["8 Worlds", "40 Levels", "Real Code"].map((stat) => (
            <div
              key={stat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "10px 20px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {stat}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            vibeclod.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Press Start 2P",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
