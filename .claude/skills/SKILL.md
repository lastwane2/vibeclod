---
name: vibeclod-dev
description: "Development skill for vibeclod — a Duolingo-style platform for learning vibe coding. Use when working on vibeclod codebase: building features, fixing bugs, creating components, writing API routes, database migrations, or any task related to the vibeclod project. Triggers on mentions of vibeclod, level system, verification engine, pixel buddy, path UI, world/level structure, Whop integration, or GitHub repo checking."
metadata:
  author: vibeclod
  version: 1.0.0
---

# vibeclod Development Skill

You are building **vibeclod** — Duolingo, but for vibe coding. A web platform where users learn to build products with AI through hands-on missions verified against their real GitHub repos.

## Architecture Overview

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Database:** PostgreSQL on Railway + Prisma ORM
- **Auth:** NextAuth.js v5 with GitHub OAuth only
- **Payments:** Whop (one-time lifetime $29)
- **AI Review:** Anthropic Claude API (claude-sonnet-4-20250514)
- **GitHub:** Octokit (REST API) for repo verification
- **Styling:** Tailwind CSS v4
- **Cache:** Redis on Railway
- **Email:** Resend
- **Deploy:** Railway (app + postgres + redis in one project)

## Project Structure

```
vibeclod/
├── prisma/schema.prisma
├── src/
│   ├── app/
│   │   ├── (auth)/login, callback
│   │   ├── (dashboard)/page.tsx, level/[id]/page.tsx, settings/page.tsx
│   │   ├── (marketing)/page.tsx, pricing/page.tsx
│   │   └── api/auth, webhooks/whop, webhooks/github, levels/[id]/verify, user
│   ├── components/
│   │   ├── path/ (WorldBanner, LevelNode, PathConnector, LevelPopup)
│   │   ├── pixel-buddy/PixelCharacter.tsx
│   │   ├── ui/ (shared primitives)
│   │   └── layout/ (TopBar, RepoStatus)
│   ├── lib/
│   │   ├── prisma.ts, auth.ts, whop.ts, github.ts, ai-review.ts, levels.ts
│   ├── hooks/ (useUser, useLevelStatus)
│   └── types/index.ts
├── railway.toml
└── .env.local
```

## Core Concepts

### Levels & Worlds

5 worlds, 25 levels total. Levels are defined in code (`src/lib/levels.ts`), NOT in the database. Each level has:
- `id`, `worldId`, `title`, `type` (practice | theory | boss | setup)
- `xp`, `duration`, `teaches`, `concepts[]`, `mission`
- `githubChecks` — automated file/commit checks
- `aiReviewPrompt` — additional context for Claude reviewer
- `passingScore` — minimum AI review score (default 60)
- `buddyMood` — pixel character mood for this level

World 1 is free. Worlds 2-5 require Pro (lifetime $29 via Whop).

### Verification Engine (TWO LAYERS)

**Layer 1 — GitHub Check (instant):**
Uses Octokit with user's OAuth token. Checks: file existence, file contents (substring match), minimum commits, commit timestamps, package.json presence.

**Layer 2 — AI Code Review (5-15 sec):**
Sends relevant files to Claude API. System prompt asks Claude to review against level requirements. Returns: passed (bool), score (0-100), feedback (markdown), suggestions (array).

Flow: User clicks Verify → GitHub checks run → if pass → AI review runs → if score >= passingScore → level complete, award XP.

### Auth

GitHub OAuth ONLY. Users need GitHub for the product to work. One login = account + repo access. Store encrypted OAuth token for API calls. Required scopes: `repo`, `read:user`.

### Payments (Whop)

One-time lifetime purchase. Whop handles checkout (hosted page). We verify membership via Whop SDK. Webhook `membership.went_valid` → set user.plan = PRO. Pricing: $29 early bird → $49 → $79.

### Progression

- XP awarded on level completion
- Streak: consecutive days with activity
- World unlocks: complete all levels in previous world
- Boss levels: bigger XP, special UI treatment

## Database Models

Key models: `User` (with plan, xp, streakDays, connectedRepo, whopUserId), `LevelCompletion` (userId + levelId unique, stores verification details), `Submission` (tracks every verify attempt with AI score/feedback).

Plan enum: FREE | PRO.

## Code Style Rules

- Use server components by default, `"use client"` only when needed
- API routes in `src/app/api/` using Route Handlers
- Prisma client singleton in `src/lib/prisma.ts`
- All env vars typed and validated at startup
- Error handling: try/catch with meaningful error responses
- Use Tailwind for all styling, no CSS modules
- Components: one per file, named export matching filename

## UI Design

The app has a warm, light aesthetic (background #FAF6F0) — NOT dark mode. Think Duolingo meets craft/cozy vibes. Colors are earthy: browns, warm oranges, muted tones.

Key UI elements:
- **Path view:** Duolingo-style zigzag path with nodes, world banners between sections
- **Level nodes:** Circles (58px) for regular, rounded squares (72px) for bosses. Colored when completed/current, muted when locked.
- **Pixel buddy:** 8×16 pixel art character with moods (idle, happy, think). Dark background behind it for contrast.
- **Repo badge:** Green "Repository connected" badge under top bar
- **Level popup:** Bottom sheet with buddy, mission description, verify button

Font: DM Sans (body) + DM Mono (code/numbers). No generic fonts like Inter or Arial.

## Common Tasks

When asked to create a new level, follow the Level interface in `src/lib/levels.ts` and include both githubChecks and aiReviewPrompt.

When building API routes, always check auth via `getServerSession` and verify Pro plan for World 2+ content.

When working on verification, test GitHub checks first (they're instant), then AI review (costs money per call).

For Whop integration, refer to `src/lib/whop.ts` — use the SDK to verify membership, don't roll custom API calls.
