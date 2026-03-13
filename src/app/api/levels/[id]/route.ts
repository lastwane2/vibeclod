import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLevel, getWorld } from "@/lib/levels";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const levelId = parseInt(id, 10);
  const level = getLevel(levelId);

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  const world = getWorld(level.worldId);

  return NextResponse.json({
    ...level,
    worldTitle: world?.title,
    worldColor: world?.color,
  });
}
