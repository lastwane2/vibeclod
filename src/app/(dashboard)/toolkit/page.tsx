import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ToolkitClient } from "./ToolkitClient";

export default async function ToolkitPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const entries = await prisma.promptToolkitEntry.findMany({
    where: { userId: session.user.id },
    select: { patternId: true, unlockedAt: true },
  });

  const unlockedPatternIds = entries.map((e) => e.patternId);

  return <ToolkitClient unlockedPatternIds={unlockedPatternIds} />;
}
