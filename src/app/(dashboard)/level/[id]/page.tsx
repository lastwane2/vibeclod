import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLevel, getWorld, WORLDS } from "@/lib/levels";
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
      submissions: {
        where: { levelId },
        orderBy: { createdAt: "desc" },
        take: 5,
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
  const submissions = user.submissions;

  // Determine next world title for boss level celebration
  const isBoss = level.type === "boss";
  const nextWorld = isBoss
    ? WORLDS.find((w) => w.id === level.worldId + 1)
    : undefined;

  return (
    <LevelDetailClient
      level={level}
      worldColor={world?.color ?? "#E8A445"}
      worldAccentColor={world?.accentColor ?? "#D4932E"}
      worldTitle={world?.title ?? "Unknown World"}
      nextWorldTitle={nextWorld?.title}
      isCompleted={!!completion}
      connectedRepo={user.connectedRepo}
      submissions={submissions.map((s) => ({
        id: s.id,
        status: s.status,
        aiScore: s.aiScore,
        aiFeedback: s.aiFeedback,
        aiPassed: s.aiPassed,
        githubPassed: s.githubPassed,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
