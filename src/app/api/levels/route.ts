import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LEVELS, WORLDS } from "@/lib/levels";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      currentLevel: true,
      completions: {
        select: { levelId: true, xpEarned: true, verifiedAt: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const completedIds = new Set(user.completions.map((c) => c.levelId));

  const levels = LEVELS.map((level) => {
    const world = WORLDS.find((w) => w.id === level.worldId);
    const worldLocked = world?.requiredPlan === "PRO" && user.plan === "FREE";
    const completion = user.completions.find((c) => c.levelId === level.id);

    let status: string;
    if (worldLocked) {
      status = "locked";
    } else if (completedIds.has(level.id)) {
      status = "completed";
    } else if (level.id === user.currentLevel) {
      status = "current";
    } else if (level.id < user.currentLevel) {
      status = "available";
    } else {
      status = "locked";
    }

    return {
      ...level,
      status,
      completedAt: completion?.verifiedAt ?? null,
      xpEarned: completion?.xpEarned ?? null,
    };
  });

  return NextResponse.json(levels);
}
