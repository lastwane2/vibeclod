import type { Level, World } from "@/types";
import { getBlocksForLevel } from "@/lib/blocks";

// ═══════════════════════════════════════
// 6 Worlds — 23 Levels
// Zero to launched SaaS
// ═══════════════════════════════════════

export const WORLDS: World[] = [
  {
    id: 0,
    title: "Start",
    subtitle: "Tools & your idea",
    color: "#71717A",
    accentColor: "#52525B",
    icon: "⚙️",
    requiredPlan: "FREE",
  },
  {
    id: 1,
    title: "Zero to Link",
    subtitle: "From nothing to a live site",
    color: "#E8A445",
    accentColor: "#D4932E",
    icon: "🌱",
    requiredPlan: "FREE",
  },
  {
    id: 2,
    title: "Real Data",
    subtitle: "Database & persistence",
    color: "#5B8DEF",
    accentColor: "#4A7AD6",
    icon: "🧠",
    requiredPlan: "PRO",
  },
  {
    id: 3,
    title: "Users",
    subtitle: "Auth, privacy & security",
    color: "#6366F1",
    accentColor: "#5558D9",
    icon: "🔐",
    requiredPlan: "PRO",
  },
  {
    id: 4,
    title: "Money",
    subtitle: "Stripe & payments",
    color: "#EAB308",
    accentColor: "#CA9A06",
    icon: "💰",
    requiredPlan: "PRO",
  },
  {
    id: 5,
    title: "Launch",
    subtitle: "Landing, polish & go live",
    color: "#10B981",
    accentColor: "#0D9668",
    icon: "🚀",
    requiredPlan: "PRO",
  },
];

export const LEVELS: Level[] = [
  // ═══════════════════════════════════════
  // WORLD 0 — Start (L0-L1) — FREE
  // Tools setup + idea/PRD
  // ═══════════════════════════════════════
  {
    id: 0,
    worldId: 0,
    title: "Your Tools",
    subtitle: "Set up GitHub, AI tools, and Vercel",
    type: "setup",
    xp: 40,
    duration: "10 min",
    teaches:
      "How to set up GitHub, your AI coding tool, and Vercel — the three things you need to start building.",
    concepts: [
      "GitHub stores your code online",
      "AI tool writes code for you — you pick which one",
      "Vercel hosts your site for free",
    ],
    mission:
      "Create a GitHub repo, install your AI tool (Claude Code / Cursor / Bolt), create a Vercel account, and connect your repo to vibeclod.",
    githubChecks: {
      minCommits: 1,
    },
    aiReviewPrompt:
      "Check that the student has a connected GitHub repo with at least one commit. This is a setup level — any valid repo connection counts as passing.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "⚙️",
  },
  {
    id: 1,
    worldId: 0,
    title: "Your Idea",
    subtitle: "PRD + CLAUDE.md in 15 minutes",
    type: "practice",
    xp: 60,
    duration: "15 min",
    teaches:
      "How to turn a vague idea into a clear plan that AI can actually build from.",
    concepts: [
      "PRD = plan that tells AI what to build",
      "CLAUDE.md = project rules AI reads automatically",
      "Without a plan, AI builds random garbage",
    ],
    mission:
      "Pick your app idea, generate a PRD with AI, create CLAUDE.md, and push both to your repo.",
    githubChecks: {
      minCommits: 1,
      fileExists: ["CLAUDE.md"],
    },
    aiReviewPrompt:
      "Check that the repo has a CLAUDE.md file with project info (stack, rules). Check for a PRD or project description — can be in CLAUDE.md or a separate file. The PRD should mention: what the app does, who it's for, and MVP features.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "💡",
  },

  // ═══════════════════════════════════════
  // WORLD 1 — Zero to Link (L2-L5) — FREE
  // Build → deploy → fix → git
  // ═══════════════════════════════════════
  {
    id: 2,
    worldId: 1,
    title: "AI Builds It",
    subtitle: "From PRD to working app",
    type: "practice",
    xp: 80,
    duration: "15 min",
    teaches:
      "How to give AI your PRD + a design reference and get a working first version.",
    concepts: [
      "Design references make AI output 10x better",
      "Start with hardcoded data — database comes later",
      "One main feature first, not everything at once",
    ],
    mission:
      "Find a design reference, give AI your PRD, build the first version of your app, and push to GitHub.",
    githubChecks: {
      minCommits: 1,
      hasPackageJson: true,
    },
    aiReviewPrompt:
      "Check for a working Next.js/React project structure: package.json, at least one page component, Tailwind CSS configured. The app should have at least one visible feature, not just a blank template.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "🔨",
  },
  {
    id: 3,
    worldId: 1,
    title: "It's Online",
    subtitle: "Live on the internet in 10 minutes",
    type: "practice",
    xp: 70,
    duration: "10 min",
    teaches:
      "Push to GitHub → Vercel auto-deploys → your site has a real URL anyone can visit.",
    concepts: [
      "Vercel deploys from GitHub automatically",
      "Every git push = site updates",
      "If build fails — check Vercel logs, paste error to AI",
    ],
    mission:
      "Connect your repo to Vercel, deploy, and get a live URL. If the build fails — debug it.",
    githubChecks: {
      hasDeploy: true,
      minCommits: 2,
    },
    aiReviewPrompt:
      "Check that the project has a Vercel deployment (hasDeploy). The site should be accessible at a .vercel.app URL. At least 2 commits showing iteration.",
    passingScore: 50,
    buddyMood: "celebrate",
    icon: "🌐",
  },
  {
    id: 4,
    worldId: 1,
    title: "It's Broken",
    subtitle: "Test everything, fix everything",
    type: "practice",
    xp: 100,
    duration: "20 min",
    teaches:
      "The core vibe coding skill: test on mobile, find bugs, describe them to AI, iterate until it works.",
    concepts: [
      "AI writes code — YOUR job is to verify and fix",
      "F12 → Console = your best debugging friend",
      "3-5 fix iterations is normal, not failure",
    ],
    mission:
      "Test every button, link, and form on mobile. Open the console. Find bugs. Describe each to AI. Fix. Repeat until everything works.",
    githubChecks: {
      minCommits: 3,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Check for at least 3 commits showing bug-fix iterations. The project should have responsive CSS (Tailwind classes or media queries). No obvious broken links or placeholder content. Look for evidence of iteration — multiple small commits, not just one big dump.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🐛",
  },
  {
    id: 5,
    worldId: 1,
    title: "Save Your Work",
    subtitle: "Git basics + workflow",
    type: "practice",
    xp: 80,
    duration: "15 min",
    teaches:
      "Git = save points for code. Three commands: add, commit, push. Plus: how to undo mistakes and work with AI effectively.",
    concepts: [
      "commit = save, push = backup, revert = undo",
      ".gitignore keeps secrets out of GitHub",
      "Small steps beat big prompts — one feature at a time",
    ],
    mission:
      "Practice git revert, update CLAUDE.md with what works and what's broken, make 3+ descriptive commits.",
    githubChecks: {
      minCommits: 3,
      fileExists: ["CLAUDE.md", ".gitignore"],
    },
    aiReviewPrompt:
      "Check: .gitignore exists and includes .env entries. CLAUDE.md is updated with project-specific info (not just the initial template). At least 3 commits with descriptive messages (not 'update' or 'fix'). Evidence of iterative workflow.",
    passingScore: 60,
    buddyMood: "happy",
    icon: "💾",
  },

  // ═══════════════════════════════════════
  // WORLD 2 — Real Data (L6-L9) — PRO
  // Supabase → CRUD → states → boss
  // ═══════════════════════════════════════
  {
    id: 6,
    worldId: 2,
    title: "Data Disappears",
    subtitle: "Connect Supabase — data persists",
    type: "practice",
    xp: 90,
    duration: "20 min",
    teaches:
      "Your app loses data on refresh because it's all in the browser. Supabase gives you a real database.",
    concepts: [
      "Env vars = passwords to services, never in code",
      ".env.local for secrets, .env.example for the team",
      "AI knows Supabase — just tell it WHAT to store",
    ],
    mission:
      "Create a Supabase project, set up env vars, tell AI to connect your app to Supabase with the right table structure.",
    githubChecks: {
      minCommits: 2,
      fileExists: [".env.example", ".gitignore"],
    },
    aiReviewPrompt:
      "Check: .env.example exists with Supabase variable names (no real values). .gitignore includes .env entries. Code imports/uses a Supabase client. At least one database table is referenced in the code.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🗄️",
  },
  {
    id: 7,
    worldId: 2,
    title: "CRUD",
    subtitle: "Create, read, update, delete — for real",
    type: "practice",
    xp: 100,
    duration: "25 min",
    teaches:
      "Replace all fake data with real Supabase queries. Full CRUD — create, read, update, delete.",
    concepts: [
      "CRUD = the 4 operations every app needs",
      "AI writes the queries — you verify the result",
      "Test: create → refresh → still there?",
    ],
    mission:
      "Tell AI to replace all hardcoded data with real Supabase CRUD. Test every operation: create 3 items, edit one, delete one, refresh — all saved?",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for Supabase CRUD operations in the code: insert, select, update, delete. No hardcoded/mock data remaining for the main feature. At least 3 commits showing iteration.",
    passingScore: 60,
    buddyMood: "happy",
    icon: "📝",
  },
  {
    id: 8,
    worldId: 2,
    title: "When Things Go Wrong",
    subtitle: "Loading, errors, and empty states",
    type: "practice",
    xp: 90,
    duration: "20 min",
    teaches:
      "Three states every screen needs: loading (skeleton), error (friendly message), empty (helpful prompt).",
    concepts: [
      "Skeletons > spinners for loading",
      "Never show raw errors to users",
      "Empty state = opportunity to guide the user",
    ],
    mission:
      "Tell AI to add loading skeletons, error messages, empty states, and form validation. Test each: slow 3G, broken env, no data, empty form submit.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Look for: loading states (skeleton/spinner components), error handling (try/catch, error boundaries, user-friendly messages), empty states (conditional rendering when data is empty), form validation. At least 2 of these 4 should be present.",
    passingScore: 60,
    buddyMood: "think",
    icon: "⚠️",
  },
  {
    id: 9,
    worldId: 2,
    title: "BOSS: Real App",
    subtitle: "Full test + deploy with database",
    type: "boss",
    xp: 200,
    duration: "25 min",
    teaches:
      "End-to-end test: mobile, CRUD, states, env vars in Vercel. Everything works together on production.",
    concepts: [
      "Env vars must be in Vercel too — not just local",
      "Production test = the real test",
      "Boss level: no bugs allowed",
    ],
    mission:
      "Full test on mobile: create 5 items, edit 2, delete 1, refresh, check states. Add env vars to Vercel. Redeploy. Test production URL.",
    githubChecks: {
      minCommits: 5,
      minFiles: 5,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Comprehensive review: working Supabase integration (not mock data), CRUD operations functional, loading/error/empty states present, env vars properly handled (.env.example exists, .gitignore has .env), deployed and working. This should feel like a real app, not a demo.",
    passingScore: 70,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 3 — Users (L10-L13) — PRO
  // Auth → data isolation → security → boss
  // ═══════════════════════════════════════
  {
    id: 10,
    worldId: 3,
    title: "Anyone Sees Everything",
    subtitle: "Add auth — accounts and login",
    type: "practice",
    xp: 100,
    duration: "25 min",
    teaches:
      "Right now everyone sees the same data. Supabase Auth adds login/signup so each person has their own account.",
    concepts: [
      "Auth = who are you? (login/signup)",
      "Protected routes redirect to /login",
      "AI handles the auth code — you test the flow",
    ],
    mission:
      "Tell AI to add Supabase Auth: login page, signup page, logout button, protected routes. Test: signup, login, logout, direct URL access without auth.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for: auth pages (login/signup routes), session handling, protected routes (redirect to login if not authenticated), logout functionality. Supabase Auth integration in the code.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🔑",
  },
  {
    id: 11,
    worldId: 3,
    title: "Mine vs Yours",
    subtitle: "Each user sees only their data",
    type: "practice",
    xp: 100,
    duration: "25 min",
    teaches:
      "Auth alone isn't enough — User A can still see User B's data. RLS (Row Level Security) fixes this at the database level.",
    concepts: [
      "user_id on every record = who owns it",
      "RLS = database-level privacy rules",
      "Always test with 2 accounts in 2 browsers",
    ],
    mission:
      "Tell AI to add user_id to all records + RLS policies. Test with 2 accounts: User A creates 3 items, User B creates 2. Each sees only their own?",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for: user_id field in database queries, RLS policies referenced or configured, data filtering by user in queries. The app should show different data to different users.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🔒",
  },
  {
    id: 12,
    worldId: 3,
    title: "Security Checklist",
    subtitle: "Find and fix the holes",
    type: "practice",
    xp: 80,
    duration: "15 min",
    teaches:
      "A 6-point security checklist every app must pass: no secrets in code, auth on API routes, RLS enabled, safe error messages.",
    concepts: [
      "Search for sk_, eyJ, password in your repo",
      "Every API route checks auth — no exceptions",
      "Never show raw error details to users",
    ],
    mission:
      "Run through the 6-point security checklist manually. Then ask AI to audit your code. Fix every issue found.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Security audit: check for hardcoded secrets (API keys, tokens), unprotected API routes (no auth check), missing RLS, raw error messages exposed to users, .env in .gitignore. Flag any issues found.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🛡️",
  },
  {
    id: 13,
    worldId: 3,
    title: "BOSS: Multi-User App",
    subtitle: "Two strangers can use your app independently",
    type: "boss",
    xp: 250,
    duration: "25 min",
    teaches:
      "Full end-to-end test: two users, production URL, data isolation, auth flows, mobile, all states.",
    concepts: [
      "Production URL, not localhost",
      "Two independent users = real multi-tenant app",
      "Every button, every form, every state",
    ],
    mission:
      "On production: register User A (5 items), register User B (3 items). Verify isolation. Test logout/redirect. Mobile. Loading states. Empty states. Fix everything.",
    githubChecks: {
      minCommits: 5,
      minFiles: 8,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Comprehensive review: working auth (login/signup/logout), data isolation (user_id + RLS), security basics (no exposed secrets, auth on API routes), proper states (loading/error/empty), mobile responsive, deployed. This should work as a real multi-user application.",
    passingScore: 70,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 4 — Money (L14-L17) — PRO
  // Stripe → checkout → gating → boss
  // ═══════════════════════════════════════
  {
    id: 14,
    worldId: 4,
    title: "How to Get Paid",
    subtitle: "Stripe account + pricing page",
    type: "practice",
    xp: 90,
    duration: "20 min",
    teaches:
      "Set up Stripe in test mode, create a product, and build a pricing page with a design reference.",
    concepts: [
      "Test mode = fake money, real flow",
      "STRIPE_SECRET_KEY never gets NEXT_PUBLIC_ prefix",
      "Pricing page needs a design reference to look good",
    ],
    mission:
      "Create Stripe account (test mode), add env vars, create a product with a price. Find a pricing page reference, tell AI to build /pricing with Free and Pro plans.",
    githubChecks: {
      minCommits: 2,
      fileExists: [".env.example"],
    },
    aiReviewPrompt:
      "Check for: Stripe-related env vars in .env.example (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY), a pricing page or component, two plans (free/pro) defined somewhere in the code.",
    passingScore: 60,
    buddyMood: "happy",
    icon: "💳",
  },
  {
    id: 15,
    worldId: 4,
    title: "Buy Button Works",
    subtitle: "Stripe Checkout + webhooks",
    type: "practice",
    xp: 110,
    duration: "25 min",
    teaches:
      "Wire up the full payment flow: click Buy → Stripe Checkout → webhook updates the database → user is now Pro.",
    concepts: [
      "Checkout Session = Stripe's hosted payment page",
      "Webhook = Stripe calls YOUR server after payment",
      "Test card: 4242 4242 4242 4242",
    ],
    mission:
      "Tell AI to add Checkout + webhook. Add STRIPE_WEBHOOK_SECRET to env vars. Test: click Upgrade → pay with test card → plan updates in database.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for: Stripe Checkout session creation (API route), webhook endpoint (API route that handles Stripe events), webhook signature verification (constructEvent), plan field update logic. At least 3 commits.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🛒",
  },
  {
    id: 16,
    worldId: 4,
    title: "Free vs Pro",
    subtitle: "Feature gating that actually works",
    type: "practice",
    xp: 90,
    duration: "20 min",
    teaches:
      "Hiding a button in the UI is not security. Server-side plan checks are the real gate. UI just shows the upgrade prompt.",
    concepts: [
      "Server checks plan on every Pro API call",
      "UI shows upgrade prompt, not Pro features",
      "Subscription canceled → webhook → back to Free",
    ],
    mission:
      "Tell AI to add server-side plan checks + UI gating. Test: free user hits Pro API → 403. Free user sees upgrade prompt. Pro user sees everything.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Check for: server-side plan verification in API routes (checking user plan before allowing access), UI conditional rendering based on plan, upgrade prompts for free users. The gating should be on the server, not just UI-hidden.",
    passingScore: 60,
    buddyMood: "think",
    icon: "🚧",
  },
  {
    id: 17,
    worldId: 4,
    title: "BOSS: Payment Cycle",
    subtitle: "Register → free → pay → pro — full flow",
    type: "boss",
    xp: 300,
    duration: "25 min",
    teaches:
      "The complete payment lifecycle: new user → free plan → upgrade → checkout → webhook → pro access. All on production.",
    concepts: [
      "Webhook URL must be production, not localhost",
      "Test the FULL flow, not individual pieces",
      "Stripe Dashboard → Webhooks → check events delivered",
    ],
    mission:
      "Full test on production: new user signup → free plan → Pro features blocked → Upgrade → test card → Pro plan → features unlocked → webhook events in Stripe Dashboard. All env vars in Vercel.",
    githubChecks: {
      minCommits: 5,
      minFiles: 8,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Comprehensive payment review: Stripe integration (checkout + webhooks), server-side plan checks, UI gating, webhook signature verification, proper env var handling, deployed and functional. This should be a real monetized application.",
    passingScore: 70,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 5 — Launch (L18-L22) — PRO
  // Landing → SEO → polish → audit → ship
  // ═══════════════════════════════════════
  {
    id: 18,
    worldId: 5,
    title: "Landing Page",
    subtitle: "A page that actually sells",
    type: "practice",
    xp: 100,
    duration: "25 min",
    teaches:
      "Your homepage should SELL your app, not just show the dashboard. 8-section structure with a design reference.",
    concepts: [
      "Hero: benefit headline + ONE CTA button",
      "Features = benefits, not technical specs",
      "2-3 reference sites make AI output 10x better",
    ],
    mission:
      "Find 2-3 landing page references. Tell AI to rebuild your homepage as an 8-section landing page: hero, problem, solution, features, social proof, pricing, FAQ, final CTA. One CTA button in hero.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check the landing page for: hero section with headline and CTA, problem/solution sections, features section (benefits not specs), pricing section, FAQ. Should have a clear conversion flow. Mobile responsive.",
    passingScore: 60,
    buddyMood: "happy",
    icon: "📄",
  },
  {
    id: 19,
    worldId: 5,
    title: "People Find You",
    subtitle: "SEO + social previews + analytics",
    type: "practice",
    xp: 80,
    duration: "20 min",
    teaches:
      "Meta tags for Google, OG tags for social previews, PostHog for analytics. All in one prompt.",
    concepts: [
      "OG tags = what people see when you share the link",
      "sitemap.xml helps Google find your pages",
      "PostHog tracks what users actually do",
    ],
    mission:
      "Tell AI to add meta tags, OG tags (with image), sitemap.xml, robots.txt, and PostHog analytics. Sign up for PostHog, add the key. Test: share link in Telegram — preview shows up?",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Check for: meta tags (title, description), OG tags (og:title, og:description, og:image), sitemap.xml or sitemap generation, analytics integration (PostHog or similar). At least some SEO basics present.",
    passingScore: 60,
    buddyMood: "happy",
    icon: "🔍",
  },
  {
    id: 20,
    worldId: 5,
    title: "Polish",
    subtitle: "From 'student project' to 'real product'",
    type: "practice",
    xp: 80,
    duration: "20 min",
    teaches:
      "The small details that separate amateur from professional: skeletons, transitions, custom error pages, favicon.",
    concepts: [
      "Skeletons not spinners for loading",
      "Smooth transitions = professional feel",
      "Custom 404 + error pages show you care",
    ],
    mission:
      "Tell AI to add: skeleton loading, smooth transitions (fade-in, hover, focus), custom 404 page, favicon. Test every page on mobile one final time.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Look for polish: skeleton/loading components, CSS transitions or animations, custom 404/error page, favicon. The app should feel smooth and intentional, not like a raw template.",
    passingScore: 60,
    buddyMood: "happy",
    icon: "✨",
  },
  {
    id: 21,
    worldId: 5,
    title: "Final Audit",
    subtitle: "10-point launch checklist",
    type: "practice",
    xp: 90,
    duration: "20 min",
    teaches:
      "Before launch: mobile test, all buttons work, loading states, error handling, security, auth, data isolation, webhooks, SEO, clean build.",
    concepts: [
      "One missed bug = first impression ruined",
      "Stripe needs Terms of Service + Privacy Policy",
      "npm run build must pass with zero errors",
    ],
    mission:
      "Run through the 10-point launch checklist. Generate Terms of Service and Privacy Policy with AI. Add /terms and /privacy pages. Fix every issue. npm run build must pass.",
    githubChecks: {
      minCommits: 3,
      fileExists: [".gitignore", ".env.example"],
    },
    aiReviewPrompt:
      "Launch audit: mobile responsive, all interactions work, loading states present, error handling exists, no exposed secrets, auth on API routes, data isolation working, webhooks configured, SEO basics present, clean build. Also check for terms/privacy pages.",
    passingScore: 70,
    buddyMood: "think",
    icon: "📋",
  },
  {
    id: 22,
    worldId: 5,
    title: "LAUNCH",
    subtitle: "Ship it to the world",
    type: "boss",
    xp: 500,
    duration: "15 min",
    teaches:
      "Final deploy, cost breakdown, where to find your first users, and what to do next.",
    concepts: [
      "Free tier costs: $0-15/mo to start",
      "First 100 users come from conversations, not ads",
      "Build in public: share your progress on Twitter/X",
    ],
    mission:
      "Final deploy. Verify production works end-to-end. Share your live URL. You built a real SaaS from zero — with AI, not by writing code.",
    githubChecks: {
      minCommits: 10,
      minFiles: 15,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Final comprehensive review. This should look and function like a real product that can make money. Check: auth works, payments work, data persists, mobile responsive, professional design, SEO present, clean code structure. Not a demo — a product.",
    passingScore: 80,
    buddyMood: "celebrate",
    icon: "🚀",
  },
];

// ─── Helper functions ────────────────────

export function getLevelById(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}

export function getLevelsForWorld(worldId: number): Level[] {
  return LEVELS.filter((l) => l.worldId === worldId);
}

export function getWorldById(id: number): World | undefined {
  return WORLDS.find((w) => w.id === id);
}

export function getNextLevel(currentLevelId: number): Level | undefined {
  const currentIndex = LEVELS.findIndex((l) => l.id === currentLevelId);
  if (currentIndex === -1 || currentIndex === LEVELS.length - 1)
    return undefined;
  return LEVELS[currentIndex + 1];
}

export function getLevelProgress(levelId: number) {
  const blocks = getBlocksForLevel(levelId);
  return {
    totalBlocks: blocks.length,
    totalXP: blocks.reduce((sum, b) => sum + b.xp, 0),
  };
}

// Aliases for backward compatibility
export const getLevel = getLevelById;
export const getWorld = getWorldById;
