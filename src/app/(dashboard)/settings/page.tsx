import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      plan: true,
      connectedRepo: true,
      xp: true,
      currentLevel: true,
      streakDays: true,
      createdAt: true,
    },
  });

  if (!user) redirect("/login");

  return (
    <SettingsClient
      name={user.name}
      email={user.email}
      image={user.image}
      plan={user.plan}
      connectedRepo={user.connectedRepo}
      xp={user.xp}
      currentLevel={user.currentLevel}
      streakDays={user.streakDays}
      memberSince={user.createdAt.toISOString()}
    />
  );
}
