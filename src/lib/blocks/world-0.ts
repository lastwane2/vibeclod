import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// WORLD 0 — Start (L0-L1)
// Tools setup + idea/PRD
// ═══════════════════════════════════════

export const WORLD_0_BLOCKS: Block[] = [
  // ─── Level 0: Your Tools ──────────────
  {
    id: "L0B1",
    levelId: 0,
    type: "theory",
    title: "What You Need",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Three Tools. That's It.

You need three things to start building:

**1. GitHub** — where your code lives online
- Create an account at github.com (if you don't have one)
- Think of it as Google Drive, but for code

**2. AI coding tool** — the thing that actually writes code for you
- **Claude Code** (terminal, most powerful, steeper learning curve)
- **Cursor** (code editor, easier for beginners)
- **Bolt.new / Lovable** (browser-based, easiest start)

Pick ONE. You can always switch later. All our prompts work with any of them.

**3. Vercel** — where your site lives on the internet
- Sign up at vercel.com using your GitHub account
- Free tier is more than enough

That's it. No other tools needed right now.`,
  },
  {
    id: "L0B2",
    levelId: 0,
    type: "experiment",
    title: "Set Up Everything",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    description: "Create accounts and connect your tools.",
    steps: [
      {
        id: "github",
        instruction:
          "Create a GitHub account (or log in if you have one). Create a new repository — name it after your app idea, or just 'my-app' for now.",
        expectedOutcome:
          "You have a GitHub repo at github.com/yourname/your-repo",
      },
      {
        id: "ai-tool",
        instruction:
          "Install your AI coding tool. Claude Code: follow the official setup guide. Cursor: download from cursor.com. Bolt/Lovable: just open the site.",
        expectedOutcome: "Your AI tool is installed and ready to use",
      },
      {
        id: "vercel",
        instruction:
          "Go to vercel.com — sign up with GitHub. That's it — we'll connect a project later.",
        expectedOutcome: "You have a Vercel account connected to GitHub",
      },
    ],
  },
  {
    id: "L0B3",
    levelId: 0,
    type: "build",
    title: "Connect Your Repo",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    mission:
      "Connect your GitHub repo to vibeclod. Go to Settings → connect your repo. Push at least one commit (even a README) so we can verify it works.",
    githubChecks: {
      minCommits: 1,
    },
    aiReviewPrompt:
      "Setup level — any connected repo with at least one commit counts as passing.",
    passingScore: 50,
  },

  // ─── Level 1: Your Idea ───────────────
  {
    id: "L1B1",
    levelId: 1,
    type: "theory",
    title: "Why You Need a Plan",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# AI Without a Plan = Random Garbage

If you tell AI "build me an app," you'll get something generic and useless.

AI needs **direction**. That direction is a **PRD** — Product Requirements Document.

A PRD is just a short plan that answers:
- **What problem** does this solve?
- **Who** is it for?
- **What features** does the MVP need? (3-5, no more)
- **What are we NOT building?** (this is the most important part)

The "not building" list prevents AI from adding random features you didn't ask for.

**You also need CLAUDE.md** — a file in your project that AI reads automatically. It contains:
- Your tech stack (we use Next.js + Tailwind + Supabase)
- Project rules (commit after every change, mobile-first, etc.)

Think of CLAUDE.md as standing instructions for your AI assistant.`,
  },
  {
    id: "L1B2",
    levelId: 1,
    type: "prompt",
    title: "Generate Your PRD",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    scaffold: "full",
    goal: "Create a clear PRD for your app idea that AI can build from.",
    referencePrompt: `I want to build [your app idea]. Help me write a short plan:
1. What problem does this solve?
2. Who specifically will use this? (not "everyone")
3. 3-5 key features for the MVP (minimum viable product)
4. What are we NOT building yet? (at least 3 things to skip)

Keep it short — one paragraph per section. No marketing fluff.`,
    hints: [
      "Be specific about WHO uses it — 'remote team leads with 5-20 people' is better than 'teams'",
      "Features should describe WHAT it does, not HOW it's built",
      "The NOT building list is the most important part — it keeps scope small",
    ],
    passingThreshold: 3,
  },
  {
    id: "L1B3",
    levelId: 1,
    type: "prompt",
    title: "Create CLAUDE.md",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    scaffold: "template",
    goal: "Create a CLAUDE.md file that sets up your project rules.",
    referencePrompt: `# [Your App Name]

## Stack
Next.js 14 + Tailwind CSS + Supabase + Vercel

## What It Does
[One sentence from your PRD]

## Rules
- Write TypeScript
- Use shadcn/ui for components
- Commit after every feature
- Everything must work on mobile (375px)
- Never put secrets in code — use .env.local`,
    template: `# ___

## Stack
Next.js 14 + Tailwind CSS + Supabase + Vercel

## What It Does
___

## Rules
- Write TypeScript
- Use shadcn/ui for components
- ___
- ___`,
    passingThreshold: 3,
  },
  {
    id: "L1B4",
    levelId: 1,
    type: "build",
    title: "Push PRD + CLAUDE.md",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Save your PRD (as a file or in CLAUDE.md) and push CLAUDE.md to your GitHub repo. This is the foundation everything else builds on.",
    githubChecks: {
      minCommits: 1,
      fileExists: ["CLAUDE.md"],
    },
    aiReviewPrompt:
      "Check that CLAUDE.md exists and contains: project name, tech stack, and at least 2 rules. Check for a PRD (can be in CLAUDE.md or separate file) that mentions: what the app does, who it's for, and features.",
    passingScore: 50,
  },
];
