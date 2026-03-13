import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBlock } from "@/lib/blocks";
import { getBlocksForLevel, getRequiredBlocksForLevel } from "@/lib/blocks";
import { getLevel, LEVELS } from "@/lib/levels";
import { verifyBlock } from "@/lib/block-verification";
import { updateStreak } from "@/lib/streaks";
import { sendEmail, levelCompleteEmail } from "@/lib/email";

interface RouteContext {
  params: Promise<{ blockId: string }>;
}

export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blockId } = await context.params;
  const block = getBlock(blockId);

  if (!block) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 });
  }

  const level = getLevel(block.levelId);
  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  // Check plan for PRO worlds
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      plan: true,
      currentLevel: true,
      xp: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (level.worldId > 1 && user.plan === "FREE") {
    return NextResponse.json(
      { error: "This level requires Pro." },
      { status: 403 }
    );
  }

  // Check if already completed
  const existing = await prisma.blockCompletion.findUnique({
    where: { userId_blockId: { userId: user.id, blockId } },
  });

  if (existing) {
    return NextResponse.json({
      blockId,
      passed: true,
      score: existing.score,
      feedback: "Already completed!",
      data: existing.data,
      alreadyCompleted: true,
    });
  }

  // Parse request body
  const body = await req.json().catch(() => ({}));

  // Build blocks are handled by the existing verify endpoint
  if (block.type === "build") {
    return NextResponse.json(
      { error: "Build blocks use /api/levels/[id]/verify", redirect: true },
      { status: 400 }
    );
  }

  // Verify the block
  const result = await verifyBlock(block, body);

  if (result.passed) {
    // Create block completion
    await prisma.blockCompletion.create({
      data: {
        userId: user.id,
        levelId: block.levelId,
        blockId,
        score: result.score ?? block.xp,
        data: result.data ? JSON.parse(JSON.stringify(result.data)) : undefined,
      },
    });

    // Award XP
    const xpToAward = result.score ?? block.xp;
    await prisma.user.update({
      where: { id: user.id },
      data: { xp: { increment: xpToAward } },
    });

    // If pattern block, unlock in toolkit
    if (block.type === "pattern") {
      const patternId = (block as import("@/types/blocks").PatternBlock).patternId;
      await prisma.promptToolkitEntry.upsert({
        where: { userId_patternId: { userId: user.id, patternId } },
        create: { userId: user.id, patternId },
        update: {},
      });
    }

    // Check if all required blocks for this level are now done
    const requiredBlocks = getRequiredBlocksForLevel(block.levelId);
    const completedBlocks = await prisma.blockCompletion.findMany({
      where: {
        userId: user.id,
        levelId: block.levelId,
      },
      select: { blockId: true },
    });
    const completedIds = new Set(completedBlocks.map((c) => c.blockId));
    const allRequiredDone = requiredBlocks.every((b) => completedIds.has(b.id));

    let levelCompleted = false;

    if (allRequiredDone) {
      // Check if level already completed
      const existingCompletion = await prisma.levelCompletion.findUnique({
        where: { userId_levelId: { userId: user.id, levelId: block.levelId } },
      });

      if (!existingCompletion) {
        // Complete the level
        const totalLevelXP = level.xp;
        await prisma.$transaction([
          prisma.levelCompletion.create({
            data: {
              userId: user.id,
              levelId: block.levelId,
              xpEarned: totalLevelXP,
              verifiedAt: new Date(),
              verifyMethod: "blocks",
              verifyDetails: {
                blocksCompleted: completedBlocks.length + 1,
                totalBlocks: getBlocksForLevel(block.levelId).length,
              },
            },
          }),
          prisma.user.update({
            where: { id: user.id },
            data: {
              currentLevel: Math.max(user.currentLevel, block.levelId + 1),
            },
          }),
        ]);

        await updateStreak(user.id);
        levelCompleted = true;

        // Send level complete email (fire-and-forget)
        const userData = await prisma.user.findUnique({
          where: { id: user.id },
          select: { name: true, email: true },
        });
        if (userData?.email) {
          const nextLevel = LEVELS.find((l) => l.id === block.levelId + 1);
          const { subject, html } = levelCompleteEmail(
            userData.name ?? "there",
            level.title,
            totalLevelXP,
            nextLevel?.title
          );
          sendEmail(userData.email, subject, html).catch(() => {});
        }
      }
    }

    return NextResponse.json({
      blockId,
      passed: true,
      score: result.score,
      feedback: result.feedback,
      data: result.data,
      xpEarned: xpToAward,
      levelCompleted,
      allRequiredDone,
    });
  }

  // Not passed
  return NextResponse.json({
    blockId,
    passed: false,
    score: result.score ?? 0,
    feedback: result.feedback,
    data: result.data,
  });
}
