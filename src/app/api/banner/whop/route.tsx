import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const fontData = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nYivN04w.woff2"
    )
  ).then((res) => res.arrayBuffer());

  // 16:9 ratio
  const width = 1920;
  const height = 1080;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #2D2016 0%, #3D2F20 50%, #2D2016 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Pixel grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "repeating-linear-gradient(0deg, #E8A445 0px, #E8A445 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #E8A445 0px, #E8A445 1px, transparent 1px, transparent 24px)",
          }}
        />

        {/* Top gold bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #E8A445, #D4932E, #E8A445)",
          }}
        />

        {/* Main content - centered */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              display: "flex",
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "linear-gradient(135deg, #E8A445, #D4932E)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 48,
              boxShadow: "0 16px 64px rgba(232,164,69,0.5)",
            }}
          >
            {/* Pixel buddy face */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "white" }} />
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "white" }} />
              </div>
              <div style={{ width: 24, height: 8, borderRadius: "0 0 8px 8px", background: "white", marginTop: 6 }} />
            </div>
          </div>

          {/* Brand name */}
          <div
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: 72,
              color: "#E8A445",
              letterSpacing: 6,
              marginBottom: 24,
              textShadow: "0 4px 24px rgba(232,164,69,0.3)",
            }}
          >
            vibeclod
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: 22,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 60,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Duolingo, but for vibe coding
          </div>

          {/* Feature cards */}
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { num: "40", label: "Levels" },
              { num: "8", label: "Worlds" },
              { num: "$29", label: "Lifetime" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  padding: "28px 48px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Press Start 2P"',
                    fontSize: 36,
                    color: "#E8A445",
                    marginBottom: 8,
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    fontFamily: '"Press Start 2P"',
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 0 40px",
          }}
        >
          <div
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: 14,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            vibeclod.com
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
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
