"use client";

interface PathConnectorProps {
  from: "left" | "center" | "right";
  to: "left" | "center" | "right";
  completed: boolean;
  worldColor: string;
}

export function PathConnector({
  from,
  to,
  completed,
  worldColor,
}: PathConnectorProps) {
  // Calculate SVG path based on positions
  const fromX = from === "left" ? 80 : from === "right" ? 220 : 150;
  const toX = to === "left" ? 80 : to === "right" ? 220 : 150;

  const path = `M ${fromX} 0 C ${fromX} 20, ${toX} 28, ${toX} 48`;

  return (
    <div className="flex justify-center w-full max-w-sm mx-auto h-12">
      <svg
        width="300"
        height="48"
        viewBox="0 0 300 48"
        fill="none"
        className="overflow-visible"
      >
        {/* Shadow path */}
        <path
          d={path}
          stroke={completed ? `${worldColor}20` : "#E0D5C7"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={completed ? "none" : "6 6"}
        />
        {/* Main path */}
        <path
          d={path}
          stroke={completed ? worldColor : "#D4C4A8"}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={completed ? "none" : "6 6"}
          className="transition-all duration-500"
        />
      </svg>
    </div>
  );
}
