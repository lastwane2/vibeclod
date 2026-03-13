import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBlocksForLevel } from "@/lib/blocks";
import { getLevel } from "@/lib/levels";

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

  const blocks = getBlocksForLevel(levelId);

  // Get user's completions for this level's blocks
  const completions = await prisma.blockCompletion.findMany({
    where: {
      userId: session.user.id,
      levelId,
    },
    select: {
      blockId: true,
      score: true,
      data: true,
      createdAt: true,
    },
  });

  const completionMap = new Map(completions.map((c) => [c.blockId, c]));

  const blocksWithStatus = blocks.map((block) => {
    const completion = completionMap.get(block.id);
    return {
      ...block,
      completed: !!completion,
      completionScore: completion?.score ?? null,
      completedAt: completion?.createdAt ?? null,
    };
  });

  const totalBlocks = blocks.length;
  const completedCount = completions.length;
  const requiredBlocks = blocks.filter((b) => b.required).length;
  const requiredCompleted = blocks
    .filter((b) => b.required)
    .filter((b) => completionMap.has(b.id)).length;

  return NextResponse.json({
    levelId,
    blocks: blocksWithStatus,
    progress: {
      total: totalBlocks,
      completed: completedCount,
      requiredTotal: requiredBlocks,
      requiredCompleted,
      allRequiredDone: requiredCompleted >= requiredBlocks,
    },
  });
}
