import { prisma } from "@/lib/prisma";

export interface StreakStatus {
  isActive: boolean;
  daysCount: number;
  isAtRisk: boolean;
}

/** Returns midnight (00:00:00.000) of the given date. */
function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Update a user's streak after completing a level.
 * - If lastActiveAt is today: do nothing (already counted)
 * - If lastActiveAt was yesterday: increment streakDays
 * - If lastActiveAt was >1 day ago (or null): reset streak to 1
 * Always updates lastActiveAt to now.
 */
export async function updateStreak(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastActiveAt: true, streakDays: true },
  });

  if (!user) return;

  const now = new Date();
  const todayStart = startOfDay(now);

  let newStreakDays = user.streakDays;

  if (user.lastActiveAt) {
    const lastActiveDay = startOfDay(user.lastActiveAt);
    const diffMs = todayStart.getTime() - lastActiveDay.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Already active today — just update lastActiveAt, keep streak
      await prisma.user.update({
        where: { id: userId },
        data: { lastActiveAt: now },
      });
      return;
    } else if (diffDays === 1) {
      // Yesterday — extend the streak
      newStreakDays = user.streakDays + 1;
    } else {
      // More than 1 day gap — reset
      newStreakDays = 1;
    }
  } else {
    // First ever activity
    newStreakDays = 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      streakDays: newStreakDays,
      lastActiveAt: now,
    },
  });
}

/**
 * Get the current streak status for a user.
 * - isActive: whether the streak is still alive
 * - daysCount: current streak length
 * - isAtRisk: if last active today, streak could break tomorrow
 */
export function getStreakStatus(user: {
  streakDays: number;
  lastActiveAt: Date | null;
}): StreakStatus {
  if (!user.lastActiveAt) {
    return { isActive: false, daysCount: 0, isAtRisk: false };
  }

  const now = new Date();
  const todayStart = startOfDay(now);
  const lastActiveDay = startOfDay(user.lastActiveAt);
  const diffMs = todayStart.getTime() - lastActiveDay.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Active today — streak alive, but could break if they skip tomorrow
    return {
      isActive: true,
      daysCount: user.streakDays,
      isAtRisk: true,
    };
  } else if (diffDays === 1) {
    // Last active yesterday — streak still valid but needs activity today
    return {
      isActive: true,
      daysCount: user.streakDays,
      isAtRisk: true,
    };
  } else {
    // Streak is broken
    return {
      isActive: false,
      daysCount: 0,
      isAtRisk: false,
    };
  }
}
