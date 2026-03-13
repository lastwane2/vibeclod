# vibeclod — Project Spec

> Duolingo, but for vibe coding.
> 25 levels. Real repos. Ship or don't level up.

---

## 1. Product Overview

**vibeclod** is a web platform that teaches people to build real software products through AI (vibe coding). Instead of video courses or docs, learners complete hands-on missions in their actual GitHub repositories. Progress is verified automatically via GitHub API + AI code review.

### Core Loop

```
Connect repo → Get mission → Build with AI → Push code → Auto-verify → Level up → Repeat
```

### Key Differentiators

- **No passive learning** — every level requires shipping real code to a real repo
- **AI verification** — GitHub API checks file existence/structure, Claude API reviews code quality
- **Progression system** — 5 worlds, 25 levels, XP, streaks, boss fights (like Duolingo)
- **Outcome-oriented** — Level 25 is literally "earn your first $100"

### Target Audience

- Non-developers who want to build products with AI
- Junior developers who want to ship faster
- Entrepreneurs who want to prototype without a team
- Anyone curious about vibe coding but doesn't know where to start

---

## 2. Tech Stack

### Decided

| Layer | Tech | Why |
|-------|------|-----|
| Framework | **Next.js 15 (App Router)** | SSR, API routes, RSC — everything in one project |
| Language | **TypeScript** | Type safety, better DX with Prisma |
| Database | **PostgreSQL** on Railway | One-click provision, same platform as app |
| ORM | **Prisma** | Type-safe queries, easy migrations, great with Next.js |
| Auth | **NextAuth.js v5** with GitHub OAuth | Users need GitHub anyway — single sign-on with their GitHub account |
| Payments | **Whop** | One-time payment, simple API, built-in checkout page |
| AI Review | **Anthropic Claude API** (claude-sonnet-4-20250514) | Code review for level verification |
| GitHub | **GitHub REST API** via Octokit | Check repos, files, commits for level verification |
| Styling | **Tailwind CSS v4** | Fast, utility-first, plays well with Next.js |
| Deploy | **Railway** | App + Postgres + Redis in one place, easy env management |
| Email | **Resend** | Transactional emails (welcome, streak reminders, level complete) |
| Analytics | **PostHog** (self-hosted or cloud) | Product analytics, funnels, feature flags |
| Cache/Queue | **Redis** on Railway | Session cache, rate limiting, job queue for AI reviews |

### Project Structure

```
vibeclod/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── callback/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx              # Main path/map view
│   │   │   ├── level/[id]/page.tsx   # Level detail + mission
│   │   │   └── settings/page.tsx
│   │   ├── (marketing)/
│   │   │   ├── page.tsx              # Landing page
│   │   │   └── pricing/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── whop/route.ts
│   │   │   │   └── github/route.ts
│   │   │   ├── levels/
│   │   │   │   ├── [id]/verify/route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── user/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── path/                     # Duolingo-style path UI
│   │   │   ├── WorldBanner.tsx
│   │   │   ├── LevelNode.tsx
│   │   │   ├── PathConnector.tsx
│   │   │   └── LevelPopup.tsx
│   │   ├── pixel-buddy/
│   │   │   └── PixelCharacter.tsx
│   │   ├── ui/                       # Shared UI primitives
│   │   └── layout/
│   │       ├── TopBar.tsx
│   │       └── RepoStatus.tsx
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── whop.ts                 # Whop API client + helpers
│   │   ├── github.ts                 # GitHub API helpers
│   │   ├── ai-review.ts             # Claude API verification logic
│   │   └── levels.ts                 # Level definitions + verification rules
│   ├── hooks/
│   │   ├── useUser.ts
│   │   └── useLevelStatus.ts
│   └── types/
│       └── index.ts
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── railway.toml
└── README.md
```

---

## 3. Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  githubId      String    @unique
  githubToken   String    // Encrypted — for GitHub API calls
  
  // Progression
  xp            Int       @default(0)
  currentLevel  Int       @default(1)
  streakDays    Int       @default(0)
  lastActiveAt  DateTime?
  
  // Payment
  plan          Plan      @default(FREE)
  whopUserId    String?   @unique
  whopMembershipId String?
  paidAt        DateTime?
  
  // Relations
  completions   LevelCompletion[]
  submissions   Submission[]
  connectedRepo String?   // "owner/repo" format
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Plan {
  FREE
  PRO
}

model LevelCompletion {
  id        String   @id @default(cuid())
  userId    String
  levelId   Int
  xpEarned  Int
  
  // Verification details
  verifiedAt    DateTime
  verifyMethod  String    // "github_check", "ai_review", "manual"
  verifyDetails Json?     // Stores AI review feedback, commit SHAs, etc.
  
  user      User     @relation(fields: [userId], references: [id])
  
  createdAt DateTime @default(now())
  
  @@unique([userId, levelId])
}

model Submission {
  id        String   @id @default(cuid())
  userId    String
  levelId   Int
  status    SubmissionStatus @default(PENDING)
  
  // What was checked
  commitSha String?
  filePaths String[]        // Files that were verified
  
  // AI Review
  aiScore   Int?            // 0-100
  aiFeedback String?        // Claude's feedback in markdown
  aiPassed  Boolean?
  
  // GitHub Check
  githubPassed Boolean?
  githubDetails Json?
  
  user      User     @relation(fields: [userId], references: [id])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum SubmissionStatus {
  PENDING
  CHECKING
  PASSED
  FAILED
  ERROR
}
```

---

## 4. Level Verification System

This is the core differentiator. Two-layer verification:

### Layer 1: GitHub API Check (instant)

Automated checks via GitHub REST API (Octokit):

```typescript
// What we can check automatically:
interface GitHubCheck {
  fileExists: string[];        // ["index.html", "src/App.jsx"]
  fileContains: {              // File must contain substring
    path: string;
    contains: string[];
  }[];
  minCommits: number;          // Minimum commits in repo
  minFiles: number;            // Minimum file count
  hasPackageJson: boolean;     // Has package.json
  hasDeploy: boolean;          // Has deployment config
  commitAfter: Date;           // Commits after level was started
}
```

Examples per level:
- **Level 1**: `fileExists: ["index.html"]`, file contains `<button>`
- **Level 3**: `minCommits: 5`, commits after level start
- **Level 10**: `hasPackageJson: true`, `fileExists: ["src/App.jsx"]`, `minFiles: 8`
- **Level 15**: `fileExists: ["package.json", "prisma/schema.prisma"]`, file contains `"next"`

### Layer 2: AI Code Review (async, 5-15 sec)

After GitHub checks pass, Claude reviews the actual code:

```typescript
interface AIReviewRequest {
  levelId: number;
  files: { path: string; content: string }[];  // Fetched from GitHub
  levelRequirements: string;                     // What this level expects
}

interface AIReviewResponse {
  passed: boolean;
  score: number;        // 0-100
  feedback: string;     // Markdown — shown to user
  suggestions: string[];
}
```

**System prompt for AI reviewer:**

```
You are a code reviewer for vibeclod, a vibe coding learning platform.
You're reviewing a student's submission for Level {id}: "{title}".

Requirements for this level:
{requirements}

Review the code and respond with JSON:
- passed: boolean (meets the level requirements?)
- score: 0-100 (code quality)
- feedback: brief markdown feedback (2-3 sentences, encouraging)
- suggestions: array of 1-3 specific improvement ideas

Be encouraging but honest. The student built this with AI — judge 
the result, not the process. Working code > perfect code.
```

### Verification Flow

```
User clicks "Verify" 
  → Frontend calls POST /api/levels/{id}/verify
  → Backend fetches repo via GitHub API (using user's OAuth token)
  → Run GitHub checks (file exists, commits, etc.)
  → If GitHub checks fail → return instant feedback
  → If GitHub checks pass → send code to Claude for review
  → Claude returns score + feedback
  → If score >= 60 → Level complete! Award XP
  → If score < 60 → Show feedback + suggestions, let user retry
  → Save Submission record either way
```

---

## 5. Auth Flow

Using NextAuth.js v5 with GitHub OAuth only.

**Why GitHub-only auth:**
- Users NEED GitHub for the product to work (we check their repos)
- One login = account + repo access. No extra steps.
- We get their GitHub OAuth token for API calls

```
User clicks "Sign in with GitHub"
  → GitHub OAuth flow
  → We get: profile info + OAuth token (repo scope)
  → Create/update User in DB
  → Store encrypted GitHub token
  → Redirect to dashboard
  → Prompt to select/connect a repo
```

**Required GitHub OAuth scopes:** `repo` (read/write access to repos), `read:user`

---

## 6. Payment Flow (Whop)

### Plans

| | Free | Pro — Lifetime $29 |
|---|---|---|
| World 1 (5 levels) | ✅ | ✅ |
| Worlds 2-5 (20 levels) | 🔒 | ✅ |
| AI Code Review | 3/day | Unlimited |
| Streak tracking | ✅ | ✅ |
| Pixel buddy moods | Basic | All |
| Discord community | ❌ | ✅ |
| All future worlds/seasons | ❌ | ✅ |

**Pricing tiers (raise over time):**
- Launch (first 200 sales): **$29**
- After 200 sales: **$49**
- After 500 sales: **$79**

### Whop Integration

Whop handles the checkout page, payment processing, and license management. We just verify membership via their API.

```
User clicks "Unlock All Worlds — $29"
  → Redirect to Whop checkout page (hosted by Whop)
  → User pays
  → Whop sends webhook to /api/webhooks/whop
  → We update user.plan = PRO, store whopUserId + whopMembershipId
  → User redirected back to app with Pro access
```

**Implementation:**

```typescript
// src/lib/whop.ts
import { WhopSDK } from "@whop-apps/sdk";

const whop = new WhopSDK({ apiKey: process.env.WHOP_API_KEY! });

// Verify a user has paid
export async function verifyMembership(whopUserId: string): Promise<boolean> {
  try {
    const memberships = await whop.memberships.list({
      user_id: whopUserId,
      valid: true,
    });
    return memberships.data.length > 0;
  } catch {
    return false;
  }
}
```

**Webhook to handle:**
- `membership.went_valid` → activate Pro
- `membership.went_invalid` → downgrade to Free (chargebacks/refunds)

**Why Whop over Stripe:**
- Hosted checkout = zero checkout UI to build
- Built-in license/membership management
- Lower friction for one-time payments
- Dashboard for tracking sales out of the box
- Popular with indie builders — audience overlap

---

## 7. Level Definitions Structure

Levels are defined in code (not DB) for easy version control:

```typescript
// src/lib/levels.ts

export interface Level {
  id: number;
  worldId: number;
  title: string;
  type: "practice" | "theory" | "boss" | "setup";
  xp: number;
  duration: string;
  
  // Content
  teaches: string;
  concepts: string[];
  mission: string;
  
  // Verification
  githubChecks: GitHubCheck;
  aiReviewPrompt: string;     // Additional context for Claude
  passingScore: number;        // Default 60
  
  // UI
  buddyMood: "idle" | "happy" | "think";
}

export const LEVELS: Level[] = [
  {
    id: 1,
    worldId: 1,
    title: "Your First Prompt",
    type: "practice",
    xp: 50,
    duration: "30 min",
    teaches: "How to talk to AI and get working code.",
    concepts: [
      "A prompt = task + context + format",
      "AI generates code from scratch",
      "Start simple, iterate later",
    ],
    mission: "Generate an HTML page with a headline and button via Claude. Push to your repo as index.html.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["<button", "<h1"] }
      ],
      minCommits: 1,
      commitAfter: "level_start", // Dynamic — set when user starts level
    },
    aiReviewPrompt: "Check if index.html is a valid HTML page with a visible heading and a button. It should look intentional, not a blank template.",
    passingScore: 50,
    buddyMood: "idle",
  },
  // ... 24 more levels
];
```

---

## 8. Key Pages & UX

### Landing Page (`/`)
- Hero: "Duolingo, but for vibe coding"
- Demo of the path UI (interactive, not just a screenshot)
- Social proof (Twitter embeds, user count)
- Pricing section
- CTA: "Start Free — World 1"

### Dashboard / Path View (`/dashboard`)
- THE main screen — the Duolingo-style path from the artifact
- Sticky top bar: pixel buddy, streak, XP
- Repo connected badge
- World banners + level nodes (zigzag path)
- Click node → popup with mission + verify button

### Level Detail (`/level/[id]`)
- Full mission description
- Key concepts
- Pixel buddy with mood
- "Verify" button → triggers GitHub + AI check
- Result: pass/fail with AI feedback
- On pass: XP animation, confetti, next level unlocked

### Settings (`/settings`)
- Connected repo (change/disconnect)
- Pro status (linked to Whop)
- Profile (from GitHub)

---

## 9. API Routes

```
# Auth
GET  /api/auth/[...nextauth]     # NextAuth handlers

# User
GET  /api/user                    # Current user + progress
PATCH /api/user                   # Update settings

# Levels  
GET  /api/levels                  # All levels with user's completion status
GET  /api/levels/[id]             # Single level detail
POST /api/levels/[id]/start       # Mark level as started (for commit timing)
POST /api/levels/[id]/verify      # Trigger verification (GitHub + AI)

# Webhooks
POST /api/webhooks/whop            # Whop payment/membership events
POST /api/webhooks/github          # GitHub push events (optional — for auto-verify)

# Payments
GET  /api/whop/checkout-url        # Generate Whop checkout link with user metadata
```

---

## 10. Railway Setup

### Services

```
┌─────────────────────────────────────┐
│           Railway Project           │
│                                     │
│  ┌──────────┐  ┌──────────────┐    │
│  │ Next.js  │  │ PostgreSQL   │    │
│  │ App      │──│ (managed)    │    │
│  └──────────┘  └──────────────┘    │
│       │                             │
│  ┌──────────┐                      │
│  │ Redis    │                      │
│  │ (managed)│                      │
│  └──────────┘                      │
└─────────────────────────────────────┘
```

### railway.toml

```toml
[build]
builder = "nixpacks"
buildCommand = "npx prisma generate && npm run build"

[deploy]
startCommand = "npx prisma migrate deploy && npm start"
healthcheckPath = "/api/health"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3

[service]
internalPort = 3000
```

### Environment Variables

```env
# Database (auto-set by Railway Postgres plugin)
DATABASE_URL=

# Redis (auto-set by Railway Redis plugin)  
REDIS_URL=

# Auth
NEXTAUTH_URL=https://vibeclod.com
NEXTAUTH_SECRET=           # Generate: openssl rand -base64 32
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Whop
WHOP_API_KEY=
WHOP_WEBHOOK_SECRET=
NEXT_PUBLIC_WHOP_CHECKOUT_URL=     # Your Whop product checkout link

# AI
ANTHROPIC_API_KEY=

# Email
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://vibeclod.com
```

---

## 11. Development Roadmap

### Phase 0 — Setup (Day 1)
- [ ] Init Next.js + TypeScript + Tailwind
- [ ] Setup Prisma + PostgreSQL schema
- [ ] Railway project: app + postgres + redis
- [ ] GitHub OAuth app registration
- [ ] NextAuth.js with GitHub provider
- [ ] Basic layout: top bar, page structure
- [ ] Deploy to Railway — verify it runs

### Phase 1 — Core Path (Days 2-5)
- [ ] Level definitions (all 25 levels in code)
- [ ] Path UI — Duolingo-style zigzag with world banners
- [ ] Pixel buddy component
- [ ] Level popup (mission, concepts, verify button)
- [ ] Repo connection flow (select repo after login)
- [ ] "Repo connected" badge

### Phase 2 — Verification Engine (Days 6-9)
- [ ] GitHub API integration (Octokit)
  - [ ] Fetch repo file tree
  - [ ] Read file contents
  - [ ] Check commit history
- [ ] GitHub check runner (per-level rules)
- [ ] Claude AI review integration
  - [ ] System prompt for code review
  - [ ] Parse response, store results
- [ ] POST /api/levels/[id]/verify endpoint
- [ ] Verification UI: loading → result → feedback
- [ ] XP award + level unlock on pass

### Phase 3 — Progression System (Days 10-12)
- [ ] XP tracking + level-up logic
- [ ] Streak system (daily activity tracking)
- [ ] World unlocking (complete all levels in a world)
- [ ] Boss level special UI
- [ ] Completion celebrations (confetti, XP animation)
- [ ] Progress stats on dashboard

### Phase 4 — Payments (Days 13-15)
- [ ] Whop product setup (one-time $29 lifetime)
- [ ] Checkout redirect flow
- [ ] Webhook handler (membership.went_valid)
- [ ] Paywall on World 2+ levels
- [ ] Pricing page with early bird messaging
- [ ] "X of 200 early bird spots left" counter

### Phase 5 — Landing & Launch (Days 16-19)
- [ ] Landing page with path demo
- [ ] SEO: meta tags, OG images
- [ ] Email: welcome, streak reminders (Resend)
- [ ] Analytics: PostHog events
- [ ] Error tracking: Sentry
- [ ] Polish: loading states, error states, empty states
- [ ] Mobile responsiveness pass

### Phase 6 — Launch (Day 20)
- [ ] Product Hunt listing
- [ ] Twitter/X thread
- [ ] Reddit posts (r/SideProject, r/webdev)
- [ ] First users onboarded
- [ ] Monitor, fix, iterate

---

## 12. Costs Estimate (Monthly)

| Service | Free Tier | At Scale (1K users) |
|---------|-----------|---------------------|
| Railway (app) | $5/mo | $20/mo |
| Railway (Postgres) | $5/mo | $15/mo |
| Railway (Redis) | $5/mo | $10/mo |
| Anthropic API | ~$5/mo (light) | ~$50/mo |
| Resend | Free (100/day) | $20/mo |
| Domain | $12/yr | $12/yr |
| Whop fees | 3% per transaction | 3% per transaction |
| **Total** | **~$16/mo** | **~$120/mo** |

Revenue model (one-time lifetime):
- First 200 sales × $29 = **$5,800** (minus ~$174 Whop fees)
- Next 300 sales × $49 = **$14,700**
- After 500 × $79 = ongoing

Break-even: ~6 sales covers a full year of infrastructure.

---

## 13. Content Scaling Plan

The initial 25 levels = Season 1. Future worlds:

| Season | World | Theme | Levels |
|--------|-------|-------|--------|
| 2 | Mobile Builder | React Native with AI | 5 |
| 2 | Chrome Extensions | Browser add-ons via AI | 5 |
| 2 | Telegram Empire | Bots, mini-apps, payments | 5 |
| 3 | AI Agents | Autonomous agents, tool use | 5 |
| 3 | Open Source | Contributing to OSS with AI | 5 |
| 3 | Freelance Machine | Client projects via vibe coding | 5 |

Each season = content update + marketing push + re-engagement email.

---

## 14. Key Risks & Mitigations

**Risk: AI verification is too strict/lenient**
→ Start with low passing score (50-60), tune based on data. Allow manual override (retry button). Log all AI reviews to improve prompts.

**Risk: GitHub API rate limits**
→ 5000 requests/hour per OAuth user is plenty. Cache repo data in Redis. Batch file reads.

**Risk: Users don't have Claude/AI access**
→ vibeclod doesn't require Claude specifically. Missions say "use AI" — could be Claude, GPT, Cursor, Copilot. We only check the output, not the tool.

**Risk: Low conversion free → paid**
→ World 1 must be genuinely valuable and hook people. Boss level (portfolio site) is a strong tangible outcome. Tease World 2 content hard at the gate. $29 one-time is low friction — impulse buy after free world proves value. Early bird "X spots left" creates urgency.

**Risk: Content gets stale**
→ Missions are tool-agnostic ("build an API" not "use Express 4.18"). Verification checks output, not implementation. Update AI review prompts as tools evolve.

---

## 15. Launch Checklist

- [ ] Domain: vibeclod.com
- [ ] GitHub OAuth App approved
- [ ] Whop product created (one-time $29, checkout page live)
- [ ] All 25 level definitions complete with verification rules
- [ ] AI review prompts tested for each level
- [ ] Landing page live with waitlist/signup
- [ ] OG image for Twitter cards
- [ ] Product Hunt ship page created
- [ ] First 5 beta testers have completed World 1
- [ ] Error monitoring (Sentry) active
- [ ] Analytics (PostHog) tracking key events
- [ ] Whop webhook verified in production
- [ ] Email templates: welcome, streak, level complete, upgrade prompt
- [ ] Terms of Service + Privacy Policy pages
