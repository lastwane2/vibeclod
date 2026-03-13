import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export interface GitHubCheck {
  fileExists?: string[];
  fileContains?: {
    path: string;
    contains: string[];
  }[];
  minCommits?: number;
  minFiles?: number;
  hasPackageJson?: boolean;
  hasDeploy?: boolean;
  commitAfter?: "level_start";
}

export interface Level {
  id: number;
  worldId: number;
  title: string;
  subtitle: string;
  type: "practice" | "theory" | "boss" | "setup";
  xp: number;
  duration: string;
  teaches: string;
  concepts: string[];
  mission: string;
  githubChecks: GitHubCheck;
  aiReviewPrompt: string;
  passingScore: number;
  buddyMood: "idle" | "happy" | "think" | "celebrate" | "confused";
  icon: string;
}

export interface World {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  accentColor: string;
  icon: string;
  requiredPlan: "FREE" | "PRO";
}

export type LevelStatus = "locked" | "available" | "current" | "completed";

export interface LevelWithStatus extends Level {
  status: LevelStatus;
  completedAt?: Date;
  xpEarned?: number;
}
