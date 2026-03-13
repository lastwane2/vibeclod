import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLevel, getWorld, WORLDS } from "@/lib/levels";
import { getBlocksForLevel } from "@/lib/blocks";
import { LevelDetailClient } from "./LevelDetailClient";
import { LevelPaywallWrapper } from "./LevelPaywallWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LevelPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;
  const levelId = parseInt(id, 10);
  const level = getLevel(levelId);
  if (!level) notFound();

  const world = getWorld(level.worldId);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      completions: {
        where: { levelId },
        take: 1,
      },
      blockCompletions: {
        where: { levelId },
        select: { blockId: true },
      },
    },
  });

  if (!user) redirect("/login");

  // Check if world is locked — show paywall instead of redirecting
  const isWorldLocked = world?.requiredPlan === "PRO" && user.plan === "FREE";

  if (isWorldLocked) {
    return (
      <LevelPaywallWrapper
        level={level}
        worldColor={world?.color ?? "#E8A445"}
        worldAccentColor={world?.accentColor ?? "#D4932E"}
      />
    );
  }

  const completion = user.completions[0] ?? null;
  const completedBlockIds = user.blockCompletions.map((bc) => bc.blockId);

  // Get blocks for this level
  const blocks = getBlocksForLevel(levelId);

  // Determine next world title for boss level celebration
  const isBoss = level.type === "boss";
  const nextWorld = isBoss
    ? WORLDS.find((w) => w.id === level.worldId + 1)
    : undefined;

  return (
    <LevelDetailClient
      level={level}
      blocks={blocks.map((b) => ({
        ...b,
        completed: completedBlockIds.includes(b.id),
      }))}
      worldColor={world?.color ?? "#E8A445"}
      worldAccentColor={world?.accentColor ?? "#D4932E"}
      worldTitle={world?.title ?? "Unknown World"}
      nextWorldTitle={nextWorld?.title}
      isCompleted={!!completion}
      connectedRepo={user.connectedRepo}
      completedBlockIds={completedBlockIds}
    />
  );
}
