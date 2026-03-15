import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLevel, LEVELS } from "@/lib/levels";
import {
  createOctokit,
  runGitHubChecks,
  getFilesContent,
  getRepoTree,
} from "@/lib/github";
import { reviewCode } from "@/lib/ai-review";
import { updateStreak } from "@/lib/streaks";
import { sendEmail, levelCompleteEmail } from "@/lib/email";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_req: Request, context: RouteContext) {
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

  // Get user with token
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      githubToken: true,
      connectedRepo: true,
      plan: true,
      currentLevel: true,
      xp: true,
      completions: {
        where: { levelId },
        take: 1,
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Already completed
  if (user.completions.length > 0) {
    return NextResponse.json({
      id: user.completions[0].id,
      status: "PASSED",
      aiScore: null,
      aiFeedback: "You already completed this level!",
      aiPassed: true,
      githubPassed: true,
      createdAt: user.completions[0].createdAt,
    });
  }

  // Check repo connected
  if (!user.connectedRepo) {
    return NextResponse.json(
      { error: "No repository connected. Go to Settings to connect one." },
      { status: 400 }
    );
  }

  // Check plan for PRO worlds (World 1-2 are free)
  if (level.worldId > 2 && user.plan === "FREE") {
    return NextResponse.json(
      { error: "This level requires Pro. Upgrade to unlock all worlds." },
      { status: 403 }
    );
  }

  // Create submission
  const submission = await prisma.submission.create({
    data: {
      userId: user.id,
      levelId,
      status: "CHECKING",
    },
  });

  try {
    const octokit = createOctokit(user.githubToken);

    // === LAYER 1: GitHub Checks ===
    const githubResult = await runGitHubChecks(
      octokit,
      user.connectedRepo,
      level.githubChecks
    );

    if (!githubResult.passed) {
      // GitHub checks failed
      const failedChecks = githubResult.details
        .filter((d) => !d.passed)
        .map((d) => d.message);

      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          status: "FAILED",
          githubPassed: false,
          githubDetails: JSON.parse(JSON.stringify(githubResult.details)),
          aiFeedback: `GitHub checks didn't pass:\n\n${failedChecks.map((m) => `- ${m}`).join("\n")}`,
        },
      });

      return NextResponse.json({
        id: submission.id,
        status: "FAILED",
        aiScore: null,
        aiFeedback: `GitHub checks didn't pass:\n\n${failedChecks.map((m) => `- ${m}`).join("\n")}`,
        aiPassed: null,
        githubPassed: false,
        createdAt: submission.createdAt.toISOString(),
      });
    }

    // === LAYER 2: AI Code Review ===
    // Collect files for review
    const tree = await getRepoTree(octokit, user.connectedRepo);

    // Determine which files to send to AI
    let filesToReview: string[] = [];

    // Always include files from githubChecks
    if (level.githubChecks.fileExists) {
      filesToReview.push(...level.githubChecks.fileExists);
    }
    if (level.githubChecks.fileContains) {
      filesToReview.push(
        ...level.githubChecks.fileContains.map((fc) => fc.path)
      );
    }

    // Add key project files if not already included
    const importantFiles = [
      "index.html",
      "package.json",
      "src/App.jsx",
      "src/App.tsx",
      "src/app/layout.tsx",
      "src/app/page.tsx",
      "prisma/schema.prisma",
    ];
    for (const f of importantFiles) {
      if (tree.includes(f) && !filesToReview.includes(f)) {
        filesToReview.push(f);
      }
    }

    // Deduplicate and limit
    filesToReview = [...new Set(filesToReview)].slice(0, 10);

    const filesContent = await getFilesContent(
      octokit,
      user.connectedRepo,
      filesToReview
    );

    const aiResult = await reviewCode(level, filesContent);

    // Update submission
    const finalStatus = aiResult.passed ? "PASSED" : "FAILED";

    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: finalStatus,
        githubPassed: true,
        githubDetails: JSON.parse(JSON.stringify(githubResult.details)),
        aiScore: aiResult.score,
        aiFeedback: aiResult.feedback,
        aiPassed: aiResult.passed,
        filePaths: filesToReview,
      },
    });

    // If passed — create completion, award XP, advance level, update streak
    if (aiResult.passed) {
      await prisma.$transaction([
        prisma.levelCompletion.create({
          data: {
            userId: user.id,
            levelId,
            xpEarned: level.xp,
            verifiedAt: new Date(),
            verifyMethod: "ai_review",
            verifyDetails: {
              score: aiResult.score,
              feedback: aiResult.feedback,
              suggestions: aiResult.suggestions,
            },
          },
        }),
        prisma.user.update({
          where: { id: user.id },
          data: {
            xp: { increment: level.xp },
            currentLevel: Math.max(user.currentLevel, levelId + 1),
          },
        }),
      ]);

      // Update streak (handles lastActiveAt + streakDays logic)
      await updateStreak(user.id);

      // Send level complete email (fire-and-forget)
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { name: true, email: true },
      });
      if (userData?.email) {
        const nextLevel = LEVELS.find((l) => l.id === levelId + 1);
        const { subject, html } = levelCompleteEmail(
          userData.name ?? "there",
          level.title,
          level.xp,
          nextLevel?.title
        );
        sendEmail(userData.email, subject, html).catch(() => {});
      }
    }

    return NextResponse.json({
      id: submission.id,
      status: finalStatus,
      aiScore: aiResult.score,
      aiFeedback:
        aiResult.feedback +
        (aiResult.suggestions.length > 0
          ? `\n\n**Suggestions:**\n${aiResult.suggestions.map((s) => `- ${s}`).join("\n")}`
          : ""),
      aiPassed: aiResult.passed,
      githubPassed: true,
      createdAt: submission.createdAt.toISOString(),
    });
  } catch (err) {
    console.error("Verification error:", err);

    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: "ERROR",
        aiFeedback:
          "Something went wrong during verification. Please check your repo is accessible and try again.",
      },
    });

    return NextResponse.json(
      {
        id: submission.id,
        status: "ERROR",
        aiScore: null,
        aiFeedback:
          "Something went wrong during verification. Please check your repo is accessible and try again.",
        aiPassed: null,
        githubPassed: null,
        createdAt: submission.createdAt.toISOString(),
      },
      { status: 500 }
    );
  }
}
