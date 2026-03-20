import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 8 — Get Users (Levels 26-29)
// Landing page, retention, growth, graduation
// ═══════════════════════════════════════

export const WORLD_8_BLOCKS: Block[] = [
  // ─── Level 26: The Landing Page (4 blocks) ───
  {
    id: "L26B1",
    levelId: 26,
    type: "theory",
    title: "Your Page Has 10 Seconds",
    xp: 10,
    required: true,
    order: 1,
    content: `# Your Landing Page Has 10 Seconds

A visitor lands on your page. In **10 seconds** they decide: stay or leave.

That means your **hero section** (the top of the page, before scrolling) must answer:
1. **What is this?** — one clear headline
2. **Why should I care?** — one sentence of value
3. **What do I do?** — one button

## The 8-Section Structure

Every high-converting landing page follows this:

| # | Section | Job |
|---|---------|-----|
| 1 | **Hero** | Headline + CTA. Above the fold. |
| 2 | **Problem** | Describe the pain. Make them nod. |
| 3 | **Solution** | How you fix it. Simple. |
| 4 | **Features** | 3-5 benefits (not specs) with icons |
| 5 | **Social proof** | Testimonials, logos, or user count |
| 6 | **Pricing** | Clear plans. Highlight the popular one. |
| 7 | **FAQ** | Kill objections. 4-6 questions. |
| 8 | **Final CTA** | Same button as hero. Last chance. |

## The #1 Mistake

AI generates landing pages with **4 competing CTAs**: "Sign Up", "Watch Demo", "View Pricing", "Contact Sales". The visitor doesn't know which to click.

**One page. One action. One button.**`,
    miniQuiz: [
      {
        question: "What's the most important job of a landing page hero section?",
        options: [
          "List every feature the product has",
          "Show the company's story and team photos",
          "Communicate the value proposition and drive one clear action — in under 10 seconds",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "L26B2",
    levelId: 26,
    type: "review",
    title: "Spot Conversion Killers",
    xp: 20,
    required: true,
    order: 2,
    code: `<section class="hero py-20 text-center">
  <h1 class="text-4xl font-bold">Welcome to Our Platform</h1>
  <p class="mt-4 text-gray-600">
    We offer project management, time tracking, invoicing,
    team chat, file sharing, calendar sync, analytics dashboards,
    and AI-powered insights for your business needs.
  </p>
  <div class="mt-8 flex gap-4 justify-center">
    <button class="bg-blue-500 text-white px-6 py-3 rounded">Sign Up Free</button>
    <button class="bg-green-500 text-white px-6 py-3 rounded">Watch Demo</button>
    <button class="bg-purple-500 text-white px-6 py-3 rounded">View Pricing</button>
    <button class="border border-gray-300 px-6 py-3 rounded">Contact Sales</button>
  </div>
</section>`,
    language: "html",
    description:
      "This AI-generated landing page hero has conversion problems. Can you spot them?",
    knownIssues: [
      {
        id: "L26B2I1",
        lineRange: [2, 2],
        description:
          "Generic headline — 'Welcome to Our Platform' says nothing. Should state a specific benefit like 'Ship Projects 2x Faster' or solve a pain point.",
        severity: "critical",
      },
      {
        id: "L26B2I2",
        lineRange: [3, 8],
        description:
          "Feature dump — listing 8 features instead of one clear value proposition. A visitor can't understand what this product DOES in 5 seconds.",
        severity: "warning",
      },
      {
        id: "L26B2I3",
        lineRange: [9, 14],
        description:
          "Four competing CTAs — the visitor doesn't know which button to click. Should be ONE primary action (e.g., 'Start Free Trial') and at most one secondary.",
        severity: "critical",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L26B3",
    levelId: 26,
    type: "pattern",
    title: "Landing Page Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "landing-page",
    exercise: {
      goal: "Plan a conversion-optimized landing page for YOUR product",
      template: `Build a landing page for [your product]:

Sections:
1. Hero: headline: ___, subheadline: ___, CTA: ___
2. Problem: ___
3. Solution: ___
4. Features (3-5): ___
5. Social proof: ___
6. Pricing: ___
7. FAQ (4-6): ___
8. Final CTA: ___

Tone: ___
Target audience: ___`,
      exampleFilled: `Build a landing page for FocusFlow:

Sections:
1. Hero: headline: "Your team's focus time, protected", subheadline: "See who's in deep work. Stop unnecessary interruptions.", CTA: "Start free"
2. Problem: "Your team spends 60% of the day in meetings. The other 40%? Recovering from meetings."
3. Solution: "FocusFlow shows when your team is in deep work — so you interrupt less and ship more."
4. Features: Focus timer (personal Pomodoro), Team dashboard (who's focused now), Weekly report (focus vs meeting hours), Quiet mode (block notifications during focus)
5. Social proof: "500+ teams ship faster with FocusFlow" + 3 short testimonials
6. Pricing: Free (1 team, basic timer) / Pro $12/mo (unlimited, analytics, reports)
7. FAQ: How does it work? / Is my data private? / Can I try it free? / Do I need to install anything?
8. Final CTA: "Start protecting your team's focus — free forever for small teams"

Tone: professional but warm, no corporate jargon
Target audience: remote team leads at startups (5-20 people)`,
    },
  },
  {
    id: "L26B4",
    levelId: 26,
    type: "build",
    title: "Build Your Landing Page",
    xp: 50,
    required: true,
    order: 4,
    mission:
      "Build a conversion-optimized landing page with all 8 sections: hero, problem, solution, features, social proof, pricing, FAQ, and final CTA.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for landing page with: clear hero (headline + one CTA), problem/solution section, features, social proof, pricing section, FAQ, and final CTA. Should have one clear action, not multiple competing buttons.",
    passingScore: 55,
  },

  // ─── Level 27: Keep Them Coming Back (4 blocks) ───
  {
    id: "L27B1",
    levelId: 27,
    type: "theory",
    title: "Why Users Leave",
    xp: 10,
    required: true,
    order: 1,
    content: `# Getting Users Is Half the Battle

Signing up is easy. **Coming back tomorrow** is hard.

Users leave your app for 4 reasons:

## 1. Confused
They didn't know what to do first. The dashboard was blank and overwhelming.

**Fix:** Onboarding wizard. Guide them to their first success in under 2 minutes.

## 2. No Value Fast
It took too long to see the benefit. They signed up but never hit the "aha moment."

**Fix:** Get them to create their first [item] immediately. Show the result. "You just did it!"

## 3. Forgot About You
No reason to come back. Out of sight, out of mind.

**Fix:** Emails: "You have 3 tasks due today." Notifications: "Someone commented."

## 4. No Habit
Nothing pulls them back daily. There's no cost to leaving.

**Fix:** Streaks, progress bars, daily stats. Loss aversion is powerful — people hate losing accumulated progress more than they enjoy gaining new progress.

**Fix all four → users stay.**`,
    miniQuiz: [
      {
        question: "Why do streaks work as a retention mechanism?",
        options: [
          "They make the app load faster for returning users",
          "Loss aversion — people hate losing accumulated progress more than gaining new progress",
          "Streaks are required by app store guidelines",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L27B2",
    levelId: 27,
    type: "theory",
    title: "Engagement Hooks",
    xp: 10,
    required: true,
    order: 2,
    content: `# Engagement Hooks That Work

You don't need all of these. Pick 2-3 and implement them well.

## Onboarding Wizard
After first sign-in: 3 steps. Enter name → create first item → see result.

The goal: get them to the **aha moment** — when they first experience your product's value. This should happen in under 2 minutes.

## Email Sequences
- **Welcome**: immediate. "Here's how to get started."
- **Day 2**: "You created [item]. Here's what to do next."
- **Day 7**: "You haven't been back. Here's what you're missing."

Use Resend — it has a free tier and clean API.

## Streaks
"5-day streak! Don't break it." Track consecutive active days. Show a fire emoji and count on the dashboard. People will come back just to not lose the streak.

## Progress Bars
"Profile 80% complete." People feel compelled to fill bars — it's irresistible. Show setup progress: name filled, first project, first task, payment method.

## Notifications
"New activity on your project." Only send when something **actually happened**. Never spam.`,
  },
  {
    id: "L27B3",
    levelId: 27,
    type: "prompt",
    title: "Retention Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Write a prompt that adds retention features to your app",
    referencePrompt: `Add retention features to my app:

1. Onboarding flow — after first sign-in, show a 3-step wizard:
   - Step 1: enter display name
   - Step 2: create first [item]
   - Step 3: see success message with "aha moment"
   Skip if already completed (check a flag in the user profile).

2. Welcome email — send via Resend immediately after sign-up.
   Subject: "Welcome to [App] — here's how to get started"
   Include a link to the dashboard and their first task.

3. Streak system — track consecutive active days.
   - Show streak count + fire emoji on dashboard
   - Reset if user misses a day
   - Store lastActiveDate and streakCount on user profile

4. Setup progress bar — "Setup: X% complete" based on:
   - Profile name filled (25%)
   - First project created (25%)
   - First task added (25%)
   - Payment method added (25%)
   Show on dashboard until 100%.`,
    hints: [
      "Include onboarding for new users — guide to aha moment",
      "Add email or notification to bring them back",
      "Include gamification: streaks, progress bars, or achievements",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L27B4",
    levelId: 27,
    type: "build",
    title: "Add Retention Features",
    xp: 50,
    required: true,
    order: 4,
    mission:
      "Add retention features: onboarding wizard for new users, at least one re-engagement mechanism (email or notification), and at least one gamification element (streaks, progress bar, or achievements).",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: onboarding flow (wizard, tour, or guided first-use), at least one re-engagement mechanism (email, notification), and at least one gamification element (streak, progress bar, achievement). Should be integrated into the app flow, not standalone.",
    passingScore: 55,
  },

  // ─── Level 28: What's Next (3 blocks) ───
  {
    id: "L28B1",
    levelId: 28,
    type: "theory",
    title: "Running Your SaaS",
    xp: 10,
    required: true,
    order: 1,
    content: `# What Running a SaaS Actually Costs

Your app is live. Here's what it costs to keep it running:

## Monthly Costs (Solo Founder)

| Service | Free Tier | When You Pay |
|---------|-----------|-------------|
| **Vercel** (hosting) | 100GB bandwidth | $20/mo after free tier |
| **Supabase** (database) | 500MB, 50K requests | $25/mo for Pro |
| **Stripe** (payments) | No monthly fee | 2.9% + 30¢ per transaction |
| **Domain** | — | $10-15/year |
| **Resend** (email) | 100 emails/day | $20/mo for more |
| **PostHog** (analytics) | 1M events/mo | $0 for most indie apps |

**Total to start: $0-15/month.** You can run a real SaaS for almost nothing until you have paying users.

## When to Use a Boilerplate

If you're starting your **second** project, consider a SaaS boilerplate:
- **MakerKit** — Next.js + Supabase + Stripe, pre-built
- **ShipFast** — similar, popular with indie hackers

They cost $100-300 but save you weeks of auth/payments/email setup.

Don't use one for your first project — you need to understand what's under the hood.

## When to Hire Help

- **UI polish**: Fiverr/Upwork for a designer to review your CSS ($50-200)
- **Complex backend**: when you need real-time, complex queries, or scale
- **Legal**: real lawyer for ToS/Privacy when you have real revenue

For everything else: AI + your skills = enough to build and launch.`,
  },
  {
    id: "L28B2",
    levelId: 28,
    type: "pattern",
    title: "Feature Planning Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "feature-planning",
    exercise: {
      goal: "Plan your next 3 features using the Feature Planning Pattern",
      template: `Plan the [feature] feature:

User story: As a [user], I want to [action] so that [benefit]

Scope:
- Must have: [ship doesn't work without these]
- Nice to have: [add in v2]
- Out of scope: [explicitly NOT building]

Technical:
- Database changes: [new tables/columns]
- New pages/components: [UI pieces]
- External services: [APIs, emails, payments]`,
      exampleFilled: `Plan the Team Invites feature:

User story: As a team admin, I want to invite people by email so they can join my workspace.

Scope:
- Must have: send invite email, click link to accept, join the team
- Nice to have: bulk invite, choose role on invite, invite expiration
- Out of scope: SSO, domain auto-join, admin approval workflow

Technical:
- Database changes: new "invites" table (email, team_id, invited_by, status, token, expires_at)
- New pages: InviteForm (email input + send), InvitePage (/invite?token=xxx), InviteList (pending invites in settings)
- External services: Resend for invite emails`,
    },
  },
  {
    id: "L28B3",
    levelId: 28,
    type: "theory",
    title: "Where to Find Users",
    xp: 10,
    required: true,
    order: 3,
    content: `# Where to Find Your First 100 Users

You built the product. Now you need people to use it.

## Free Channels (Start Here)

**Product Hunt** — launch here for your first wave. Prepare a good tagline, screenshots, and a 1-minute demo video. Launch on Tuesday or Wednesday.

**Twitter/X** — build in public. Post your progress. "Just shipped [feature]. Here's what I learned." People follow builders. Tag #buildinpublic.

**Reddit** — find your niche subreddit. Don't spam "check out my app." Instead: help people, share your journey, mention your tool when relevant.

**Indie Hackers** — post your milestones. "From idea to first paying customer in 30 days." This community loves builders.

**Hacker News** — "Show HN: [Your App] — [one-line description]." If it resonates, you'll get thousands of visits in a day.

## The Launch Checklist

1. Landing page is conversion-optimized (World 8, Level 26)
2. Onboarding gets users to "aha" in under 2 minutes
3. Screenshots and a short demo ready
4. Product Hunt listing prepared
5. Tweet thread about your journey written
6. Reddit/community posts planned

## The Real Secret

Your first 100 users won't come from marketing. They'll come from **talking to people**. DM founders, reply to tweets, answer questions on Reddit. Manual, one-by-one. It doesn't scale — but you don't need scale yet.`,
    miniQuiz: [
      {
        question: "What's the best way to get your first 100 users?",
        options: [
          "Run expensive Facebook ads",
          "Manual outreach — DMs, communities, building in public",
          "Wait for Google to index your site",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ─── Level 29: Graduate (3 blocks) ───
  {
    id: "L29B1",
    levelId: 29,
    type: "quiz",
    title: "Final Review",
    xp: 50,
    required: true,
    order: 1,
    questions: [
      {
        question:
          "In a Stripe integration, why must you verify webhook signatures?",
        options: [
          "To make webhooks faster",
          "To prevent anyone from faking a payment event and upgrading themselves for free",
          "Stripe won't send webhooks without verification",
          "It's required by JavaScript",
        ],
        correctIndex: 1,
        explanation:
          "Without signature verification, anyone can POST to your webhook URL and trigger a plan upgrade. Always verify with stripe.webhooks.constructEvent().",
      },
      {
        question: "What's the purpose of a landing page hero section?",
        options: [
          "To list every feature of the product",
          "To show the company's history",
          "To communicate the value proposition and drive one clear action — in under 10 seconds",
          "To display the navigation menu",
        ],
        correctIndex: 2,
        explanation:
          "The hero must answer 'What does this do and why should I care?' immediately. One headline, one CTA.",
      },
      {
        question: "What's the 'aha moment' in user onboarding?",
        options: [
          "When the user creates their account",
          "When the user first experiences the core value of the product",
          "When the user reads the FAQ",
          "When the user receives their first email",
        ],
        correctIndex: 1,
        explanation:
          "The aha moment is when users GET IT — they see why your product is valuable. Guide them there in under 2 minutes.",
      },
      {
        question: "Why should feature gating be enforced server-side?",
        options: [
          "Client-side checks are slower",
          "Because anyone can bypass UI restrictions by calling API routes directly",
          "Server-side code runs faster",
          "It's a Stripe requirement",
        ],
        correctIndex: 1,
        explanation:
          "Hiding a button in the UI doesn't prevent someone from calling the API directly with curl. Always check the user's plan in your API routes.",
      },
      {
        question: "When planning features, why define 'out of scope'?",
        options: [
          "To impress stakeholders",
          "To prevent scope creep — knowing what you WON'T build keeps the MVP focused and shippable",
          "Out of scope items are added to the next sprint automatically",
          "It's a legal requirement",
        ],
        correctIndex: 1,
        explanation:
          "Without clear boundaries, features grow forever. Define what's out of scope so you actually ship.",
      },
    ],
    passingScore: 3,
  },
  {
    id: "L29B2",
    levelId: 29,
    type: "prompt",
    title: "Your Product Audit",
    xp: 50,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a comprehensive prompt to audit your entire product before launch",
    referencePrompt: `Do a complete audit of my app before launch. Check everything:

1. User journey — can a stranger go from landing page → sign up → use the core feature → pay? Test every step.
2. Payments — does checkout work? Do webhooks update the database? Is feature gating enforced server-side?
3. Error handling — what happens if the database is down? Payment fails? Invalid input? Show me every broken state.
4. Mobile — check every page at 375px width. Nothing should overflow or be unreadable.
5. SEO — meta title and description on every page? OG tags for social sharing? Sitemap.xml?
6. Performance — does the page load in under 3 seconds? Any unnecessary large images or scripts?
7. Security — secrets in .env (not code)? Auth on all API routes? User data isolation? Webhook signatures verified?

For each issue found, tell me:
- What page/file
- What's wrong
- How to fix it
- Severity (critical/warning/suggestion)`,
    hints: [
      "Cover the entire user journey end-to-end",
      "Check payments flow completely",
      "Test mobile and performance",
      "Verify all security measures",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L29B3",
    levelId: 29,
    type: "build",
    title: "Graduate",
    xp: 500,
    required: true,
    order: 3,
    mission: `Final boss. Your SaaS is live and ready for real users.

Checklist:
- Deployed and accessible
- Auth: sign up, sign in, sign out
- Database: CRUD operations with real data
- Payments: Stripe checkout + webhooks + feature gating
- Landing page: hero, features, pricing, CTA
- SEO: meta tags, OG tags
- Analytics: tracking page views and key events
- Security: no secrets in code, auth on routes, user isolation
- Mobile: works on 375px

Ship it. Share it. Get your first users.`,
    githubChecks: {
      hasDeploy: true,
      minCommits: 10,
      minFiles: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Final boss. Comprehensive audit: deployed live, auth working, database with CRUD, Stripe payments, landing page with clear CTA, SEO (meta/OG), analytics, error handling, mobile responsive, security (no secrets in code, auth on API routes, user data isolation). This should be a real, shippable product — not a tutorial demo.",
    passingScore: 65,
  },
];
