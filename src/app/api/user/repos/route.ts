import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createOctokit } from "@/lib/github";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { githubToken: true },
  });

  if (!user?.githubToken) {
    return NextResponse.json(
      { error: "No GitHub token. Re-login with GitHub." },
      { status: 400 }
    );
  }

  try {
    const octokit = createOctokit(user.githubToken);

    // Fetch repos (up to 100, sorted by most recently pushed)
    const { data } = await octokit.repos.listForAuthenticatedUser({
      sort: "pushed",
      direction: "desc",
      per_page: 100,
      type: "owner",
    });

    const repos = data.map((r) => ({
      fullName: r.full_name,
      name: r.name,
      private: r.private,
      description: r.description,
      updatedAt: r.pushed_at,
    }));

    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repos from GitHub." },
      { status: 500 }
    );
  }
}
