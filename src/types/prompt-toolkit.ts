// ═══════════════════════════════════════
// Prompt Toolkit — collected patterns
// Only patterns a non-tech founder needs
// ═══════════════════════════════════════

export interface PromptPattern {
  id: string;
  name: string;
  description: string;
  worldId: number;
  chapter: number; // 1-5
  template: string; // The pattern template
  example: string; // A filled-in example
  whenToUse: string; // Guidance on when to apply
}

export interface ToolkitChapter {
  id: number;
  worldId: number;
  title: string;
  patterns: PromptPattern[];
}

export const PROMPT_PATTERNS: PromptPattern[] = [
  // ── Chapter 1: World 0 — Start ──
  {
    id: "prd-pattern",
    name: "PRD Pattern",
    description: "Write a Product Requirements Document that AI understands",
    worldId: 0,
    chapter: 1,
    template: `# [Product Name]

## Problem
[What pain does this solve? Who has this pain?]

## Target User
[Who specifically will use this? Be concrete — not "everyone"]

## Core Features (MVP)
1. [Feature 1 — what it does, not how]
2. [Feature 2]
3. [Feature 3]

## Out of Scope (NOT building yet)
- [Feature to skip]
- [Feature to skip]

## Success Criteria
[How do you know it works? What does "done" look like?]`,
    example: `# FocusFlow — Pomodoro Timer for Remote Teams

## Problem
Remote workers lose track of focus time. Managers can't tell if the team is in deep work or stuck in meetings.

## Target User
Remote team leads (5-20 people) who want to protect focus time without micromanaging.

## Core Features (MVP)
1. Personal Pomodoro timer — 25 min focus / 5 min break
2. Team dashboard — see who's in focus mode right now
3. Focus score — weekly report of deep work hours vs meetings

## Out of Scope (NOT building yet)
- Calendar integration
- Slack notifications
- Mobile app

## Success Criteria
A team lead can see their team's focus time at a glance. Each member can run their own timer.`,
    whenToUse:
      "Before writing ANY code. Every project starts with a PRD. Paste it into AI before your first prompt.",
  },
  {
    id: "design-brief",
    name: "Design Brief Pattern",
    description: "Tell AI exactly how your app should look and feel",
    worldId: 0,
    chapter: 1,
    template: `## Visual Style
- Mood: [modern/playful/serious/minimal/bold]
- Inspiration: [reference sites or apps]

## Colors
- Primary: [hex code — the main brand color]
- Background: [hex code — light or dark]
- Accent: [hex code — buttons, highlights]
- Text: [hex code]

## Typography
- Font: [Google Font name — or "system default"]
- Heading style: [large bold / ALL CAPS / normal]

## Layout
- Style: [clean with lots of whitespace / dense and data-heavy / card-based]
- Responsive: mobile-first, must work on 375px

## Tone
- [Professional / casual / technical / friendly]`,
    example: `## Visual Style
- Mood: clean, professional, slightly techy
- Inspiration: Linear.app, Vercel.com

## Colors
- Primary: #6366F1 (indigo)
- Background: #0F172A (dark navy)
- Accent: #22D3EE (cyan for CTAs)
- Text: #F8FAFC (off-white)

## Typography
- Font: Inter
- Heading style: large bold, no ALL CAPS

## Layout
- Style: clean with generous whitespace, card-based for features
- Responsive: mobile-first, must work on 375px

## Tone
- Professional but approachable, no corporate jargon`,
    whenToUse:
      "After your PRD, before building. Prevents AI from giving you the default purple gradient + Inter combo.",
  },
  {
    id: "basic-prompt",
    name: "Basic Prompt Pattern",
    description: "The foundation: task + context + format",
    worldId: 0,
    chapter: 1,
    template: `[TASK]: What you want the AI to build
[CONTEXT]: Background info, tech stack, constraints
[FORMAT]: How the output should be structured`,
    example: `Build a landing page for FocusFlow, a Pomodoro timer for remote teams.

Context: Next.js with Tailwind CSS. Dark theme (#0F172A background, #6366F1 primary). Inter font. Must be responsive — looks good on mobile 375px.

Format: Single page with sections: hero (headline + CTA), problem, solution, 3 features with icons, pricing (Free/Pro), FAQ (4 questions), footer.`,
    whenToUse:
      "Every time you start a new prompt. This is your baseline structure — task, context, format.",
  },

  // ── Chapter 2: World 1 — Zero to Link ──
  {
    id: "claudemd-pattern",
    name: "CLAUDE.md Pattern",
    description: "Project rules that make AI remember your preferences",
    worldId: 1,
    chapter: 2,
    template: `# Project Rules

## Stack
- [Framework, language, styling, database]

## Commands
- Dev: [how to run locally]
- Build: [how to build]
- Deploy: [how to deploy]

## Conventions
- [File naming: kebab-case / camelCase]
- [Component structure preferences]
- [What to always/never do]

## After Changes
- Always commit and push to GitHub
- Use descriptive commit messages
- Test before committing`,
    example: `# Project Rules

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui components
- Supabase (database + auth)
- Stripe (payments)

## Commands
- Dev: npm run dev
- Build: npm run build
- Deploy: git push (Vercel auto-deploys)

## Conventions
- File naming: kebab-case for files, PascalCase for components
- All data queries go through lib/supabase.ts, not inline
- Always handle loading, error, and empty states
- Never put secrets in code — use .env.local

## After Changes
- Always commit and push to GitHub
- Use descriptive commit messages
- Test on mobile (375px) before committing`,
    whenToUse:
      "Create this file on day one of every project. Update it as your project grows. AI reads it automatically.",
  },
  {
    id: "breaking-down-complexity",
    name: "Breaking Down Complexity",
    description: "Split big tasks into small, testable steps",
    worldId: 1,
    chapter: 2,
    template: `I'm building [big thing]. Let's do it step by step.

Step 1: [smallest working piece — can test immediately]
Step 2: [add next feature — can test immediately]
Step 3: [add next feature]
...

Start with Step 1 only. I'll tell you when to proceed.`,
    example: `I'm adding user authentication to my app. Let's do it step by step.

Step 1: Install Supabase Auth and add the sign-in page with email/password
Step 2: Add the sign-up page with email confirmation
Step 3: Add a sign-out button to the nav bar
Step 4: Protect the /dashboard route — redirect to /login if not signed in
Step 5: Show the user's email in the nav bar when logged in

Start with Step 1 only. I'll tell you when to proceed.`,
    whenToUse:
      "When a task is too big for one prompt. The #1 rule: never ask AI to build everything at once.",
  },
  {
    id: "iteration-pattern",
    name: "Iteration Pattern",
    description: "Fix specific problems in AI output instead of regenerating",
    worldId: 1,
    chapter: 2,
    template: `The output has this problem:
[describe what's wrong — be specific]

Expected behavior:
[what it should do instead]

Please fix by:
[specific approach to fix — help AI understand what you want]`,
    example: `The output has this problem:
The pricing cards are all the same width, and the "Pro" plan doesn't stand out. All three buttons say "Get Started" with no visual difference.

Expected behavior:
The Pro plan should be slightly larger with a "Most Popular" badge. Its button should be the accent color (#22D3EE). Free and Team buttons should be outlined/secondary style.

Please fix by:
Making the Pro card scale(1.05) with a border highlight and badge. Change the Pro button to bg-cyan-400 and the other two to border-only variants.`,
    whenToUse:
      "When AI's output is close but not right. Don't regenerate from scratch — iterate on what you have. Faster and better results.",
  },

  // ── Chapter 3: World 2 — Real Data ──
  {
    id: "data-schema",
    name: "Data Schema Pattern",
    description: "Plan your database before writing code",
    worldId: 2,
    chapter: 3,
    template: `Design a database for [app type]:

Tables:
- [Table1]: [fields with types]
- [Table2]: [fields with types]

Relationships:
- [Table1] has many [Table2]
- [etc.]

Rules:
- Every table has: id (uuid), created_at (timestamp)
- [Any business rules — e.g., "a user can only have one active subscription"]`,
    example: `Design a database for FocusFlow (Pomodoro timer for teams):

Tables:
- users: id, email, name, avatar_url, plan (free/pro), stripe_customer_id
- teams: id, name, owner_id (references users)
- team_members: id, team_id, user_id, role (admin/member)
- focus_sessions: id, user_id, team_id, started_at, ended_at, duration_minutes, completed (boolean)

Relationships:
- A user can be in many teams (through team_members)
- A team has many members
- A user has many focus_sessions
- A focus_session belongs to one team

Rules:
- Every table has: id (uuid), created_at (timestamp)
- A user can only be in 3 teams on the free plan
- Focus sessions must have duration between 1-60 minutes`,
    whenToUse:
      "Before touching any database code. Think about your data first, then build. Changes later are painful.",
  },

  // ── Chapter 4: World 4 — Money ──
  {
    id: "payment-pattern",
    name: "Payment Pattern",
    description: "Integrate Stripe payments safely",
    worldId: 4,
    chapter: 4,
    template: `Add Stripe to [app]:

Plans:
- [Plan 1]: [price, what's included]
- [Plan 2]: [price, what's included]

Flow:
1. User clicks "Buy" on pricing page
2. Server creates Stripe Checkout Session
3. User completes payment on Stripe
4. Stripe sends webhook to [endpoint]
5. Server updates user plan in database

Gating:
- Free users: [what they can access]
- Pro users: [what they can access]

Security:
- Verify webhook signatures with STRIPE_WEBHOOK_SECRET
- Check plan in API routes, not just UI
- Never trust client-side plan status`,
    example: `Add Stripe to FocusFlow:

Plans:
- Free: 1 team, 5 focus sessions/day, basic stats
- Pro ($12/mo): unlimited teams, unlimited sessions, detailed analytics, team reports

Flow:
1. User clicks "Upgrade to Pro" on /pricing
2. POST /api/stripe/checkout creates a Checkout Session
3. User pays on Stripe's hosted page
4. Stripe webhook hits POST /api/stripe/webhook
5. On checkout.session.completed: update user.plan = "pro" and save stripeSubscriptionId

Gating:
- Free: show upgrade banner in dashboard, limit to 5 sessions/day, 1 team
- Pro: no limits, show analytics tab, allow team creation

Security:
- Verify webhook signatures with STRIPE_WEBHOOK_SECRET
- Check user.plan in API routes before returning premium data
- On subscription.deleted: downgrade user to free`,
    whenToUse:
      "When adding payments. Get the webhook handling right — it's the most common source of bugs.",
  },

  // ── Chapter 5: World 1 — Debugging ──
  {
    id: "error-fix",
    name: "Error Fix Pattern",
    description: "How to report errors to AI so it actually fixes them",
    worldId: 1,
    chapter: 5,
    template: `I'm getting this error:

\`\`\`
[paste exact error message]
\`\`\`

Context:
- File: [which file]
- What I was doing: [action that triggered it]
- What I expected: [what should have happened]
- What I already tried: [previous fix attempts]

[Attach screenshot if relevant]`,
    example: `I'm getting this error:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'map')
at TaskList (src/components/TaskList.tsx:15:22)
\`\`\`

Context:
- File: src/components/TaskList.tsx, line 15
- What I was doing: loading the dashboard page after signing in
- What I expected: list of tasks to appear
- What I already tried: checked Supabase dashboard — data is there. The API route returns data in the browser. Cleared cache.

The tasks variable seems to be undefined on first render before the data loads.`,
    whenToUse:
      "Every time you hit an error. Never just paste the error alone — AI needs context to help you.",
  },

  // ── Chapter 6: World 5 — Launch ──
  {
    id: "landing-page",
    name: "Landing Page Pattern",
    description: "Structure a conversion-optimized page",
    worldId: 5,
    chapter: 6,
    template: `Build a landing page for [product]:

Sections (in order):
1. Hero: [headline — benefit, not feature] / [subheadline] / [one CTA]
2. Problem: [pain point you solve — make them feel it]
3. Solution: [how you solve it — simple, clear]
4. Features: [3-5 key features with icons — benefits, not specs]
5. Social proof: [testimonials, logos, or numbers]
6. Pricing: [plans with clear differences]
7. FAQ: [4-6 common questions]
8. Final CTA: [closing push — same as hero CTA]

Tone: [professional/casual/bold]
Target audience: [who is this for — be specific]`,
    example: `Build a landing page for FocusFlow:

Sections (in order):
1. Hero: "Your team's focus time, protected" / "See who's in deep work. Stop unnecessary interruptions." / "Start free"
2. Problem: "Your team spends 60% of the day in meetings. The other 40%? Recovering from meetings."
3. Solution: "FocusFlow shows when your team is in deep work — so you interrupt less and ship more."
4. Features: Focus timer (personal Pomodoro), Team dashboard (who's focused now), Weekly report (focus hours vs meeting hours), Quiet mode (block notifications during focus), Team analytics (find your most productive hours)
5. Social proof: "500+ teams ship faster with FocusFlow" + 3 short testimonials
6. Pricing: Free (1 team, basic timer) / Pro $12/mo (unlimited, analytics, reports)
7. FAQ: How does it work? Is my data private? Can I try it free? Do I need to install anything?
8. Final CTA: "Start protecting your team's focus — free forever for small teams"

Tone: professional but warm, no corporate jargon
Target audience: remote team leads at startups (5-20 people)`,
    whenToUse:
      "When building your marketing landing page. Structure matters more than design — get the message right first.",
  },
  {
    id: "feature-planning",
    name: "Feature Planning Pattern",
    description: "Plan features before building them",
    worldId: 5,
    chapter: 6,
    template: `Plan the [feature name] feature:

User story: As a [user type], I want to [action] so that [benefit]

Scope:
- Must have: [essential — ship doesn't work without these]
- Nice to have: [add in v2 if time]
- Out of scope: [explicitly NOT building]

Technical:
- Database changes: [new tables/columns]
- New pages/components: [UI pieces]
- External services: [APIs, email, payments]`,
    example: `Plan the Team Invites feature:

User story: As a team admin, I want to invite people by email so they can join my workspace.

Scope:
- Must have: send invite email, click link to accept, join the team
- Nice to have: bulk invite, choose role on invite, invite expiration
- Out of scope: SSO, domain auto-join, admin approval workflow

Technical:
- Database changes: new "invites" table (email, team_id, invited_by, status, token, expires_at)
- New pages/components: InviteForm (email input + send), InvitePage (/invite?token=xxx), InviteList (pending invites in settings)
- External services: Resend for invite emails`,
    whenToUse:
      "Before building any feature. Prevents scope creep. The 'Out of scope' section is the most important part.",
  },
];

export const TOOLKIT_CHAPTERS: ToolkitChapter[] = [
  {
    id: 1,
    worldId: 0,
    title: "The Basics",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 1),
  },
  {
    id: 2,
    worldId: 1,
    title: "Directing AI",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 2),
  },
  {
    id: 3,
    worldId: 2,
    title: "Data & Backend",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 3),
  },
  {
    id: 4,
    worldId: 4,
    title: "Getting Paid",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 4),
  },
  {
    id: 5,
    worldId: 1,
    title: "Debugging",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 5),
  },
  {
    id: 6,
    worldId: 5,
    title: "Launch",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 6),
  },
];
