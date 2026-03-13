import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLevel, getWorld } from "@/lib/levels";
import { LevelDetailClient } from "./LevelDetailClient";

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

  // Check if world is locked
  if (world?.requiredPlan === "PRO" && user.plan === "FREE") {
    redirect("/dashboard");
  }

  const completion = user.completions[0] ?? null;
  const submissions = user.submissions;

  return (
    <LevelDetailClient
      level={level}
      worldColor={world?.color ?? "#E8A445"}
      worldAccentColor={world?.accentColor ?? "#D4932E"}
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
