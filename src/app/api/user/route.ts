import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      xp: true,
      currentLevel: true,
      streakDays: true,
      plan: true,
      connectedRepo: true,
      completions: {
        select: { levelId: true, xpEarned: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { connectedRepo } = body;

  // Validate repo format
  if (
    connectedRepo !== null &&
    connectedRepo !== undefined &&
    typeof connectedRepo === "string" &&
    connectedRepo.length > 0 &&
    !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(connectedRepo)
  ) {
    return NextResponse.json(
      { error: "Invalid repo format. Use owner/repo" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      connectedRepo: connectedRepo || null,
    },
    select: {
      id: true,
      connectedRepo: true,
    },
  });

  return NextResponse.json(user);
}
