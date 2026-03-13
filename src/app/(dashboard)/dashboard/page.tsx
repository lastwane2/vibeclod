import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Fetch user data + completions
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      completions: {
        select: { levelId: true, xpEarned: true },
      },
    },
  });

  if (!user) redirect("/login");

  const completedLevelIds = user.completions.map((c) => c.levelId);

  return (
    <DashboardClient
      xp={user.xp}
      streakDays={user.streakDays}
      currentLevel={user.currentLevel}
      plan={user.plan}
      connectedRepo={user.connectedRepo}
      completedLevelIds={completedLevelIds}
    />
  );
}
