import type { Level, World } from "@/types";
import { getBlocksForLevel } from "@/lib/blocks";

// ═══════════════════════════════════════
// 9 Worlds — 30 Levels
// Product-first: idea → internet → money
// ═══════════════════════════════════════

export const WORLDS: World[] = [
  {
    id: 0,
    title: "Setup",
    subtitle: "Get your tools ready",
    color: "#71717A",
    accentColor: "#52525B",
    icon: "⚙️",
    requiredPlan: "FREE",
  },
  {
    id: 1,
    title: "Idea to Internet",
    subtitle: "From zero to live site",
    color: "#E8A445",
    accentColor: "#D4932E",
    icon: "🌱",
    requiredPlan: "FREE",
  },
  {
    id: 2,
    title: "Your Toolkit",
    subtitle: "Git, CLAUDE.md, DevTools",
    color: "#2AA198",
    accentColor: "#238E86",
    icon: "🔧",
    requiredPlan: "FREE",
  },
  {
    id: 3,
    title: "Give It Memory",
    subtitle: "Database and real data",
    color: "#5B8DEF",
    accentColor: "#4A7AD6",
    icon: "🧠",
    requiredPlan: "PRO",
  },
  {
    id: 4,
    title: "Lock the Door",
    subtitle: "Auth and user data",
    color: "#6366F1",
    accentColor: "#5558D9",
    icon: "🔐",
    requiredPlan: "PRO",
  },
  {
    id: 5,
    title: "Take Money",
    subtitle: "Stripe and payments",
    color: "#EAB308",
    accentColor: "#CA9A06",
    icon: "💰",
    requiredPlan: "PRO",
  },
  {
    id: 6,
    title: "Ship & Polish",
    subtitle: "SEO, analytics, domain",
    color: "#10B981",
    accentColor: "#0D9668",
    icon: "📦",
    requiredPlan: "PRO",
  },
  {
    id: 7,
    title: "Don't Get Hacked",
    subtitle: "Security and legal",
    color: "#E06B6B",
    accentColor: "#CC5555",
    icon: "🛡️",
    requiredPlan: "PRO",
  },
  {
    id: 8,
    title: "Get Users",
    subtitle: "Landing page, retention, growth",
    color: "#9B6EC6",
    accentColor: "#8A5DB5",
    icon: "🚀",
    requiredPlan: "PRO",
  },
];

export const LEVELS: Level[] = [
  // ═══════════════════════════════════════
  // WORLD 0 — Setup (L0) — FREE
  // GitHub, Claude Code, repo connection
  // ═══════════════════════════════════════
  {
    id: 0,
    worldId: 0,
    title: "Get Ready",
    subtitle: "Set up GitHub, AI tools, and your repo",
    type: "setup",
    xp: 40,
    duration: "10 min",
    teaches:
      "How to set up your GitHub account, connect a repo, and configure your AI coding tool.",
    concepts: [
      "GitHub stores your code online",
      "Claude Code (or any AI tool) writes code for you",
      "CLAUDE.md makes Claude Code auto-push to GitHub",
    ],
    mission:
      "Create a GitHub repo, connect it to vibeclod, set up your AI coding tool, and verify the full loop works.",
    githubChecks: {
      minCommits: 1,
    },
    aiReviewPrompt:
      "Check that the student has a connected GitHub repo with at least one commit. This is a setup level — any valid repo connection counts as passing.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "⚙️",
  },

  // ═══════════════════════════════════════
  // WORLD 1 — Idea to Internet (L1-4) — FREE
  // PRD → first build → deploy → verify
  // ═══════════════════════════════════════
  {
    id: 1,
    worldId: 1,
    title: "What is Vibe Coding",
    subtitle: "How AI builds software in 2026",
    type: "theory",
    xp: 50,
    duration: "5 min",
    teaches:
      "Vibe coding = you describe, AI builds, you verify. Not coding — directing.",
    concepts: [
      "You're a director, AI is your team",
      "AI has defaults and biases — learn to override them",
      "PRD first, code second",
    ],
    mission:
      "Understand how vibe coding works and what makes a good AI prompt vs a bad one.",
    githubChecks: {
      minCommits: 0,
    },
    aiReviewPrompt:
      "Theory level — no code to review. Check conceptual understanding through quiz completion.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "💡",
  },
  {
    id: 2,
    worldId: 1,
    title: "Your Idea on Paper",
    subtitle: "Write a PRD that AI understands",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches:
      "How to write a Product Requirements Document that gives AI clear direction.",
    concepts: [
      "A PRD defines: problem, user, features, MVP scope",
      "AI without a PRD builds generic garbage",
      "A design brief controls how your app looks",
    ],
    mission:
      "Write a PRD for your SaaS idea and a design brief with your brand's look and feel.",
    githubChecks: {
      minCommits: 0,
    },
    aiReviewPrompt:
      "Prompt-focused level — evaluate the quality of the student's PRD and design brief through the prompt blocks.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "📋",
  },
  {
    id: 3,
    worldId: 1,
    title: "First Deploy",
    subtitle: "Live on the internet in 15 minutes",
    type: "practice",
    xp: 100,
    duration: "15 min",
    teaches:
      "Push code to GitHub → Vercel auto-deploys → your site is live. That's it.",
    concepts: [
      "Vercel deploys automatically from GitHub",
      "Every push = your site updates",
      "Your first live URL — share it with anyone",
    ],
    mission:
      "Use your PRD to build a landing page, push to GitHub, deploy on Vercel. Get a live URL.",
    githubChecks: {
      fileExists: ["index.html"],
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check that the student has a deployed landing page. Should have a headline, description, and at least one call-to-action. Should look intentional, not a blank template.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "🌐",
  },
  {
    id: 4,
    worldId: 1,
    title: "Trust But Verify",
    subtitle: "Catch AI mistakes before users do",
    type: "boss",
    xp: 200,
    duration: "12 min",
    teaches:
      "AI makes mistakes — broken links, dead buttons, no mobile. Always verify.",
    concepts: [
      "Test every link, button, and form",
      "Check mobile: open on your phone",
      "DevTools Console shows hidden errors",
    ],
    mission:
      "Review and fix your landing page: all links work, buttons function, looks good on mobile. Boss level — ship a polished site.",
    githubChecks: {
      fileExists: ["index.html"],
      minCommits: 4,
      minFiles: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: working links, functional buttons/forms, responsive design, consistent styling, no obvious broken elements. Should look like a real landing page, not a demo.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 2 — Your Toolkit (L5-7) — FREE
  // Git, CLAUDE.md, code reading, DevTools
  // ═══════════════════════════════════════
  {
    id: 5,
    worldId: 2,
    title: "Save Your Work",
    subtitle: "Git saves and rollbacks",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches:
      "Git is save points for your code. When AI breaks everything — you can go back.",
    concepts: [
      "git commit = save point",
      "git push = upload to GitHub",
      "git revert = undo a mistake",
      ".gitignore = files to never upload",
    ],
    mission:
      "Make meaningful commits, break something on purpose, roll it back. Prove you can recover.",
    githubChecks: {
      minCommits: 3,
      fileExists: [".gitignore"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for multiple commits with descriptive messages. Should have .gitignore. Commit history should tell a story.",
    passingScore: 50,
    buddyMood: "think",
    icon: "💾",
  },
  {
    id: 6,
    worldId: 2,
    title: "Master Your AI",
    subtitle: "CLAUDE.md, small steps, iteration",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "CLAUDE.md is the most important file in your project. It tells AI how YOUR project works.",
    concepts: [
      "CLAUDE.md = persistent memory for AI",
      "One small step > one giant prompt",
      "Iteration: fix AI's output, don't regenerate",
    ],
    mission:
      "Create a CLAUDE.md for your project. Use small-step prompting to add a feature. Iterate on the result.",
    githubChecks: {
      fileExists: ["CLAUDE.md"],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for a CLAUDE.md file with project-specific rules (not a generic template). Should have multiple commits showing iterative development.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "🧠",
  },
  {
    id: 7,
    worldId: 2,
    title: "Pro Setup",
    subtitle: "Read code, use DevTools, ship clean",
    type: "boss",
    xp: 200,
    duration: "12 min",
    teaches:
      "Reading code (not writing) and using DevTools are the two skills that separate amateurs from pros.",
    concepts: [
      "Scan code: find the return statement, understand structure",
      "DevTools Console: see errors. Network: see requests. Elements: see layout",
      "A clean project: CLAUDE.md, .gitignore, meaningful commits",
    ],
    mission:
      "Boss level: spot and fix bugs in AI-generated code using DevTools. Ship a clean, organized project with CLAUDE.md and proper git history.",
    githubChecks: {
      fileExists: ["CLAUDE.md", ".gitignore"],
      minCommits: 5,
      minFiles: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: CLAUDE.md with real project rules, .gitignore, clean file structure, meaningful commit messages. Code should be organized, not a single giant file.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 3 — Give It Memory (L8-11) — PRO
  // Supabase database, CRUD, states
  // ═══════════════════════════════════════
  {
    id: 8,
    worldId: 3,
    title: "Your App Needs a Brain",
    subtitle: "Databases and Supabase",
    type: "setup",
    xp: 50,
    duration: "8 min",
    teaches:
      "A database is permanent memory. Supabase gives you a free PostgreSQL database with a visual dashboard.",
    concepts: [
      "Without a database, data disappears on refresh",
      "Supabase: free Postgres + visual editor + API",
      "Data modeling: what entities, what connections",
    ],
    mission:
      "Create a Supabase project, design your data model, create tables using the dashboard.",
    githubChecks: {
      minCommits: 1,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check that the project has Supabase configured (environment variables or config file referencing Supabase). Data model should make sense for the student's app idea.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "🗄️",
  },
  {
    id: 9,
    worldId: 3,
    title: "The Only 4 Things",
    subtitle: "Create, Read, Update, Delete",
    type: "practice",
    xp: 100,
    duration: "12 min",
    teaches:
      "Every feature in every app is one of four things: Create, Read, Update, or Delete.",
    concepts: [
      "CRUD: the foundation of all software",
      "Supabase client: insert, select, update, delete",
      "Connect your UI to real data",
    ],
    mission:
      "Connect your app to Supabase. Users can create, view, edit, and delete data. Real data, not hardcoded.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Supabase integration with actual CRUD operations. Data should not be hardcoded. App should read from and write to the database.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔄",
  },
  {
    id: 10,
    worldId: 3,
    title: "Handle Everything",
    subtitle: "Loading, errors, and empty states",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "Always handle three states: loading (data coming), success (data here), error (something broke). Plus: what does a brand new user see?",
    concepts: [
      "Loading → Success → Error: always handle ALL three",
      "Empty state: first-time user sees helpful guidance, not a blank page",
      "Never show a broken page — always show something useful",
    ],
    mission:
      "Add loading indicators, error messages, and empty states to all data-fetching features. A new user should know exactly what to do.",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for loading states (spinner/skeleton), error handling (user-friendly messages), and empty states (guidance for new users). No raw error dumps or blank screens.",
    passingScore: 55,
    buddyMood: "think",
    icon: "⚡",
  },
  {
    id: 11,
    worldId: 3,
    title: "Data Boss",
    subtitle: "Ship your app with real data",
    type: "boss",
    xp: 250,
    duration: "15 min",
    teaches:
      "A real app handles data professionally: validation, states, and clean code.",
    concepts: [
      "Validate input before saving",
      "Every data feature needs loading/error/empty",
      "Test: create, edit, delete, refresh — does it all work?",
    ],
    mission:
      "Boss level: app with Supabase CRUD, all states handled, input validated. Deploy and test the full data flow.",
    githubChecks: {
      minCommits: 5,
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: working CRUD operations, loading/error/empty states on all data features, input validation, Supabase integration. No hardcoded data. App should feel complete.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 4 — Lock the Door (L12-14) — PRO
  // Auth, user-scoped data, secrets
  // ═══════════════════════════════════════
  {
    id: 12,
    worldId: 4,
    title: "Authentication",
    subtitle: "Sign up, sign in, protect routes",
    type: "practice",
    xp: 100,
    duration: "12 min",
    teaches:
      "Auth = knowing who is who. Use Supabase Auth or NextAuth — never build your own password system.",
    concepts: [
      "Authentication: who are you? Authorization: what can you do?",
      "OAuth: sign in with Google/GitHub (let them handle passwords)",
      "Protected routes: redirect to login if not signed in",
    ],
    mission:
      "Add authentication to your app. Sign up, sign in, sign out. Protected routes redirect to login.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for authentication implementation (Supabase Auth, NextAuth, or similar). Should have: sign up, sign in, sign out, and at least one protected route.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔑",
  },
  {
    id: 13,
    worldId: 4,
    title: "Your Data, Their Data",
    subtitle: "User isolation and secrets",
    type: "practice",
    xp: 100,
    duration: "12 min",
    teaches:
      "Each user sees only their data. Secrets (API keys, DB passwords) NEVER go to GitHub.",
    concepts: [
      "User-scoped data: filter by userId in every query",
      ".env.local = secrets on your machine",
      ".env.example = template for others (no real values)",
      "Vercel env vars = secrets in production",
    ],
    mission:
      "Make all data user-scoped. Set up .env.local and .env.example. Verify: user A can't see user B's data.",
    githubChecks: {
      fileExists: [".env.example", ".gitignore"],
      fileContains: [
        { path: ".gitignore", contains: [".env"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for user-scoped data (queries filter by user ID). Must have .env.example (no real secrets). .gitignore must exclude .env files. No API keys or secrets in committed code.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔒",
  },
  {
    id: 14,
    worldId: 4,
    title: "Auth Boss",
    subtitle: "Secure multi-user app",
    type: "boss",
    xp: 300,
    duration: "15 min",
    teaches:
      "A real SaaS: multiple users, isolated data, no secrets exposed.",
    concepts: [
      "Every API route checks: is the user authenticated?",
      "Every data query filters: is this the user's data?",
      "Security audit: no secrets in code, no unprotected routes",
    ],
    mission:
      "Boss level: multi-user app with auth, user-scoped data, .env.example, no exposed secrets. Deploy and test with 2 accounts.",
    githubChecks: {
      fileExists: [".env.example", ".gitignore"],
      minCommits: 5,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: working auth (sign up/in/out), protected routes, user-scoped data, .env.example, .gitignore with .env. No secrets in code. Multiple users should see different data.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 5 — Take Money (L15-18) — PRO
  // Stripe, pricing, webhooks, gating
  // ═══════════════════════════════════════
  {
    id: 15,
    worldId: 5,
    title: "How Payments Work",
    subtitle: "Stripe and pricing models",
    type: "setup",
    xp: 50,
    duration: "8 min",
    teaches:
      "Stripe handles everything: cards, subscriptions, invoices. You never touch payment data.",
    concepts: [
      "Stripe Checkout: redirect user → Stripe handles payment → webhook tells you",
      "Pricing: freemium (start free), subscription (recurring), one-time",
      "Test mode: use fake cards to test without real money",
    ],
    mission:
      "Create a Stripe account, get test API keys, understand the payment flow.",
    githubChecks: {
      minCommits: 1,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Setup level — check that the project references Stripe (env vars or config). Student should understand the payment flow.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "💳",
  },
  {
    id: 16,
    worldId: 5,
    title: "Pricing & Checkout",
    subtitle: "Plans page and Stripe integration",
    type: "practice",
    xp: 100,
    duration: "12 min",
    teaches:
      "Build a pricing page with plans. When user clicks 'Buy', redirect to Stripe Checkout.",
    concepts: [
      "Pricing page: show plans clearly with one obvious CTA per plan",
      "Stripe Checkout Session: create on your server, redirect user",
      "Success/cancel URLs: where user goes after payment",
    ],
    mission:
      "Build a pricing page with at least 2 plans. 'Buy' button creates a Stripe Checkout session and redirects.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for a pricing page with multiple plans and Stripe Checkout integration. Button should create a checkout session. Should have success and cancel redirect URLs.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🏷️",
  },
  {
    id: 17,
    worldId: 5,
    title: "Webhooks & Gating",
    subtitle: "Stripe tells you who paid",
    type: "practice",
    xp: 100,
    duration: "12 min",
    teaches:
      "A webhook is Stripe calling YOUR app to say 'they paid.' Feature gating: Free vs Pro in your code.",
    concepts: [
      "Webhook: Stripe POSTs to your endpoint when something happens",
      "Always verify webhook signatures (prevent fake requests)",
      "Feature gating: check plan in API, not just in UI",
    ],
    mission:
      "Handle Stripe webhooks: update user plan in database. Gate features: Free users see upgrade prompt, Pro users see full features.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for webhook endpoint handling Stripe events. User plan should update in the database. Feature gating should check server-side, not just UI. Webhook signature verification is a plus.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🪝",
  },
  {
    id: 18,
    worldId: 5,
    title: "Money Boss",
    subtitle: "Full payment flow end-to-end",
    type: "boss",
    xp: 300,
    duration: "15 min",
    teaches:
      "A real SaaS takes money: pricing → checkout → webhook → database → gated features.",
    concepts: [
      "Test the full flow with Stripe test cards",
      "Webhook must verify signatures",
      "Feature gating must be server-side (not just hiding buttons)",
    ],
    mission:
      "Boss level: complete Stripe integration. Pricing page, checkout, webhooks, feature gating. Test with Stripe test cards end-to-end.",
    githubChecks: {
      minCommits: 5,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: pricing page, Stripe Checkout, webhook handler, database plan update, feature gating (server-side). Full payment flow should work in test mode.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 6 — Ship & Polish (L19-22) — PRO
  // SEO, domain, analytics, email, polish
  // ═══════════════════════════════════════
  {
    id: 19,
    worldId: 6,
    title: "Get Found",
    subtitle: "SEO and your own domain",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "SEO makes Google find you. A custom domain makes you look real. OG tags make your links look good when shared.",
    concepts: [
      "Title + description = what Google shows",
      "OG tags = what Twitter/LinkedIn show when you share a link",
      "Custom domain: buy on Namecheap, connect to Vercel",
    ],
    mission:
      "Add meta tags, OG tags, sitemap.xml, robots.txt. Connect a custom domain (or prepare the config).",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: meta title and description, OG tags (og:title, og:description, og:image), sitemap.xml, robots.txt. Domain setup is optional but should be referenced.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "🔍",
  },
  {
    id: 20,
    worldId: 6,
    title: "Know Your Users",
    subtitle: "Analytics and email",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "PostHog tells you what users do. Resend sends them emails. Both are free to start.",
    concepts: [
      "PostHog: pageviews, events, funnels — free and privacy-friendly",
      "Resend: transactional emails (welcome, receipt, password reset)",
      "Track what matters: sign ups, key actions, payments",
    ],
    mission:
      "Add PostHog analytics (track page views + key events). Add Resend for at least one email (welcome or receipt).",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for analytics integration (PostHog, Plausible, or similar) with at least basic event tracking. Email setup (Resend or similar) with at least one transactional email template.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "📊",
  },
  {
    id: 21,
    worldId: 6,
    title: "Polish the Details",
    subtitle: "The 5% that makes 50% difference",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "Loading skeletons, hover effects, smooth transitions, empty states — small touches that make your app feel professional.",
    concepts: [
      "Loading skeleton > blank screen",
      "Hover effects and transitions make it feel alive",
      "Test on mobile (375px) and slow connections (3G)",
    ],
    mission:
      "Add loading skeletons, hover effects, transitions. Test on mobile. Fix everything that looks broken or feels janky.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for polish: loading states (skeletons or spinners), hover/focus effects, smooth transitions, empty states. Mobile responsive. No broken layouts or janky interactions.",
    passingScore: 55,
    buddyMood: "think",
    icon: "✨",
  },
  {
    id: 22,
    worldId: 6,
    title: "Launch Boss",
    subtitle: "Ready for real users",
    type: "boss",
    xp: 350,
    duration: "15 min",
    teaches:
      "A launch-ready app: SEO, analytics, email, polished, no broken pages.",
    concepts: [
      "10-point launch checklist: mobile, loading, errors, SEO, analytics, 404, favicon, images",
      "Test the full user journey: land → sign up → use → pay",
      "Every page should look intentional",
    ],
    mission:
      "Boss level: pass the 10-point launch readiness audit. Polished, deployed, SEO-ready, analytics tracking, email working.",
    githubChecks: {
      minCommits: 5,
      minFiles: 10,
      hasDeploy: true,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: SEO (meta, OG), analytics setup, email integration, loading/error/empty states, mobile responsive, no broken links, favicon, polished design. App should feel launch-ready.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 7 — Don't Get Hacked (L23-25) — PRO
  // Security, .env, legal
  // ═══════════════════════════════════════
  {
    id: 23,
    worldId: 7,
    title: "Top 5 Vibe Code Fails",
    subtitle: "Security mistakes AI makes for you",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "45% of AI-generated code has security flaws. Know the top 5 mistakes before they cost you.",
    concepts: [
      "Secrets in code = instant hack",
      "No auth on API routes = anyone can access your data",
      "No input validation = SQL injection, XSS attacks",
      "Error messages that leak internal details",
    ],
    mission:
      "Find and fix security vulnerabilities in AI-generated code. Verify your own app doesn't have these issues.",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check that the student has addressed common security issues: no secrets in code, auth on API routes, input validation, safe error messages.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🚨",
  },
  {
    id: 24,
    worldId: 7,
    title: "The Full Audit",
    subtitle: "Security checklist and legal basics",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "A 10-point security checklist. Plus: Stripe requires Terms of Service and Privacy Policy.",
    concepts: [
      "Security audit: systematic check of all attack surfaces",
      "Rate limiting: don't let bots spam your API",
      "Terms of Service + Privacy Policy: AI can draft them, you review",
    ],
    mission:
      "Run the full security audit on your app. Add Terms of Service and Privacy Policy pages (AI generates drafts).",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for security hardening: auth on all sensitive routes, no secrets in code, .env.example, input validation. Bonus: ToS and Privacy Policy pages.",
    passingScore: 55,
    buddyMood: "think",
    icon: "📋",
  },
  {
    id: 25,
    worldId: 7,
    title: "Security Boss",
    subtitle: "Hardened and ready for production",
    type: "boss",
    xp: 300,
    duration: "15 min",
    teaches:
      "A production app handles attacks gracefully. Auth bypass, data leaks, exposed APIs — close every hole.",
    concepts: [
      "Test like a hacker: try to access other users' data",
      "Try to call API routes without auth",
      "Check: can you find any secret in the committed code?",
    ],
    mission:
      "Boss level: pass the 10-point security audit. Fix all vulnerabilities. Deploy a hardened app.",
    githubChecks: {
      fileExists: [".env.example", ".gitignore"],
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Security audit: no secrets in committed code, auth on all API routes, user data isolation, input validation, safe error messages, .env.example, .gitignore with .env. ToS/Privacy pages are a plus.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 8 — Get Users (L26-29) — PRO
  // Landing page, retention, graduation
  // ═══════════════════════════════════════
  {
    id: 26,
    worldId: 8,
    title: "The Landing Page",
    subtitle: "Sell your product in 10 seconds",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "A landing page has 8 sections. One CTA. One message. Make them care in 10 seconds.",
    concepts: [
      "Hero: headline + subheadline + CTA. That's all that matters above the fold",
      "Problem → Solution → Features → Proof → Pricing → FAQ → CTA",
      "One CTA per section. Not 4 buttons competing for attention",
    ],
    mission:
      "Build a conversion-optimized landing page. Hero, problem, solution, features, social proof, pricing, FAQ, final CTA.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for landing page with: clear hero (headline + CTA), problem/solution section, features, social proof or testimonials, pricing section, FAQ, and final CTA. Should have one clear action per section.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "📄",
  },
  {
    id: 27,
    worldId: 8,
    title: "Keep Them Coming Back",
    subtitle: "Onboarding, emails, retention",
    type: "practice",
    xp: 75,
    duration: "10 min",
    teaches:
      "Users leave because of confusion, no quick value, and forgetting you exist. Fix all three.",
    concepts: [
      "Onboarding wizard: guide new users to their 'aha moment'",
      "Email sequences: welcome → tips → re-engage",
      "Engagement hooks: streaks, progress bars, notifications",
    ],
    mission:
      "Add onboarding flow for new users. Set up at least one retention mechanism (email sequence, streak, or progress tracking).",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: onboarding flow (wizard, tour, or guided first-use), and at least one retention feature (email drip, streak system, progress bar, or notifications).",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔄",
  },
  {
    id: 28,
    worldId: 8,
    title: "What's Next",
    subtitle: "Planning, costs, and growing",
    type: "theory",
    xp: 50,
    duration: "8 min",
    teaches:
      "How to plan features, what running a SaaS costs, when to use a boilerplate, when to hire a dev.",
    concepts: [
      "Feature planning: Must have / Nice to have / Out of scope",
      "Monthly cost: hosting $0-20, DB $0-25, domain $10-15/year, Stripe 2.9%",
      "SaaS boilerplates (MakerKit, ShipFast) = skip months of setup",
    ],
    mission:
      "Plan your next 3 features using the feature planning pattern. Calculate your monthly costs. Decide: keep building solo or hire help?",
    githubChecks: {
      minCommits: 0,
    },
    aiReviewPrompt:
      "Theory level — evaluate understanding through quiz and pattern exercises.",
    passingScore: 50,
    buddyMood: "think",
    icon: "🗺️",
  },
  {
    id: 29,
    worldId: 8,
    title: "Graduate",
    subtitle: "Ship your SaaS to the world",
    type: "boss",
    xp: 500,
    duration: "20 min",
    teaches:
      "Final boss. Your SaaS is live, accepts payments, has real users (or is ready for them).",
    concepts: [
      "Full product audit: user journey, payments, errors, mobile, SEO, security",
      "Share: Product Hunt, Twitter/X, Reddit, communities",
      "You built a real product. Not a tutorial project — a business.",
    ],
    mission:
      "Graduate: live SaaS with auth, database, payments, SEO, analytics, security. Complete the full product audit. Ship it.",
    githubChecks: {
      hasDeploy: true,
      minCommits: 10,
      minFiles: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Final boss. Comprehensive audit: deployed live, auth working, database with CRUD, Stripe payments, SEO (meta/OG), analytics, error handling, mobile responsive, security (no secrets, auth on routes, user isolation). This should be a real, shippable product.",
    passingScore: 65,
    buddyMood: "celebrate",
    icon: "🎓",
  },
];

// ═══════════════════════════════════════
// Helper functions
// ═══════════════════════════════════════

export function getLevelById(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}
export const getLevel = getLevelById;

export function getLevelsForWorld(worldId: number): Level[] {
  return LEVELS.filter((l) => l.worldId === worldId);
}

export function getWorldById(id: number): World | undefined {
  return WORLDS.find((w) => w.id === id);
}
export const getWorld = getWorldById;

export function getNextLevel(currentLevelId: number): Level | undefined {
  const idx = LEVELS.findIndex((l) => l.id === currentLevelId);
  return idx >= 0 && idx < LEVELS.length - 1 ? LEVELS[idx + 1] : undefined;
}

export function getLevelProgress(levelId: number): {
  totalBlocks: number;
  totalXP: number;
} {
  const blocks = getBlocksForLevel(levelId);
  return {
    totalBlocks: blocks.length,
    totalXP: blocks.reduce((sum, b) => sum + b.xp, 0),
  };
}
