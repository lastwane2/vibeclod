import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 8 — Get Paid (Levels 36-40)
// Payments, landing, retention, graduation
// Scaffold: "none" for prompt blocks
// ═══════════════════════════════════════

export const WORLD_8_BLOCKS: Block[] = [
  // ─── Level 36: Money Moves (4 blocks) ───
  {
    id: "L36B1",
    levelId: 36,
    type: "theory",
    title: "How Online Payments Work",
    xp: 10,
    required: true,
    order: 1,
    content: `# How Online Payments Work

You **NEVER** touch credit cards. Here's how it actually works:

1. User clicks "Subscribe" on your site
2. They go to **Stripe's checkout page** (Stripe's website, not yours)
3. They enter card details on Stripe's secure page
4. Stripe charges them and sends a **webhook** (notification) to your server
5. Your server gets the webhook → updates user to "paid" in database

## What you handle

- The "Subscribe" button
- The webhook receiver (an API route)
- The database update

## What Stripe handles

- Credit cards, security, fraud detection, receipts, refunds

You never see a credit card number. Stripe does all the scary stuff.

## Common Gotcha: Webhook URL

The #1 reason payments "work locally but not in production" is a **wrong webhook URL** in Stripe's dashboard.

Your webhook endpoint lives at \`/api/webhooks/stripe\` — but people often register it as \`/webhooks/stripe\` (missing \`/api/\`). Stripe sends the event, gets a 404, and your user's plan never updates.

**Always double-check:** the webhook URL in Stripe's dashboard must match the **exact path** of your API route file. If your file is at \`src/app/api/webhooks/stripe/route.ts\`, the URL is \`https://yourapp.com/api/webhooks/stripe\`.`,
  },
  {
    id: "L36B2",
    levelId: 36,
    type: "theory",
    title: "Pricing That Works",
    xp: 10,
    required: true,
    order: 2,
    content: `# Pricing That Works

Three models that work:

## Freemium
Free version with limits, pay to unlock more. (Spotify, Notion)
Best for: **getting users in the door**.

## Subscription
Monthly/yearly payment. (Netflix, SaaS tools)
Best for: **recurring revenue**.

## One-time
Pay once, use forever. (Lifetime deals)
Best for: **simple products**.

## For your first product

Start with **freemium**. Free tier gets users. Paid tier ($9-29/mo) unlocks the good stuff.

Make the free tier useful but limited enough that power users **WANT** to upgrade.`,
    miniQuiz: [
      {
        question: "Which pricing model is best for getting users?",
        options: [
          "Freemium — free tier gets users in the door",
          "Subscription — users pay monthly from day one",
          "One-time — charge a big upfront fee",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "L36B3",
    levelId: 36,
    type: "pattern",
    title: "Payment Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "payment-pattern",
    exercise: {
      goal: "Plan a complete payment integration using the Payment Pattern",
      template: `Add ___ payments:
- Plans: ___
- Checkout: ___
- Webhooks: ___
- User model: ___
- Gating: ___
- Security: ___`,
      exampleFilled: `Add Stripe payments:
- Plans: Free (basic features, 10 items max), Pro $12/mo (unlimited items, priority support)
- Checkout: Redirect to Stripe Checkout session
- Webhooks: checkout.session.completed → upgrade user plan to Pro, customer.subscription.deleted → downgrade to Free
- User model: Add "plan" field (FREE or PRO) and "stripeCustomerId" to User
- Gating: Free users limited to 10 items (check count server-side), Pro users unlimited
- Security: Verify webhook signatures with Stripe secret, check user plan server-side (never trust client)`,
    },
  },
  {
    id: "L36B4",
    levelId: 36,
    type: "build",
    title: "Add Payments",
    xp: 50,
    required: true,
    order: 4,
    mission:
      "Add payment integration: pricing page, checkout flow, webhook handler.",
    githubChecks: { minFiles: 15, commitAfter: "level_start" },
    aiReviewPrompt:
      "Check for: pricing page, checkout redirect, webhook handler, plan field in user model or schema.",
    passingScore: 55,
  },

  // ─── Level 37: The Landing Page (4 blocks) ───
  {
    id: "L37B1",
    levelId: 37,
    type: "theory",
    title: "Landing Page = Your Sales Pitch",
    xp: 10,
    required: true,
    order: 1,
    content: `# Landing Page = Your Sales Pitch

A landing page has **ONE job**: convince the visitor to take **ONE action** (sign up, start free trial, buy).

## The structure that works

1. **HERO** — Clear headline + what you do + CTA button (above the fold, no scrolling)
2. **PROBLEM** — "Tired of X?" — describe the pain
3. **SOLUTION** — "We fix X by doing Y"
4. **FEATURES** — 3-5 key benefits with icons
5. **SOCIAL PROOF** — "10,000+ users" / testimonials / logos
6. **PRICING** — Clear plans, highlight the popular one
7. **FAQ** — Answer "but what about...?" objections
8. **FINAL CTA** — Repeat the action button

Every successful landing page follows this. Tell AI this exact structure.`,
  },
  {
    id: "L37B2",
    levelId: 37,
    type: "pattern",
    title: "Landing Page Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "landing-page",
    exercise: {
      goal: "Plan a conversion-optimized landing page using the Landing Page Pattern",
      template: `Build a landing page:
- Hero: headline: ___, subline: ___, CTA: ___
- Problem: ___
- Solution: ___
- Features (3-5): ___
- Social proof: ___
- Pricing: ___
- FAQ (3-5 questions): ___
- Final CTA: ___
- Tone: ___
- Target audience: ___`,
      exampleFilled: `Build a landing page:
- Hero: headline: "Ship tasks, not stress", subline: "The task manager that solo founders actually finish building", CTA: "Start free — no credit card"
- Problem: "You've tried Notion, Trello, Todoist — but you spend more time organizing tasks than doing them"
- Solution: "TaskFlow gives you ONE view, ONE workflow, ZERO configuration. Add tasks, do tasks, done."
- Features (3-5): 1) One-click task creation, 2) AI-powered priority sorting, 3) Daily focus mode (shows only today's 3 tasks), 4) Built-in Pomodoro timer
- Social proof: "Used by 2,000+ indie hackers" + 3 short testimonials
- Pricing: Free (up to 25 tasks), Pro $9/mo (unlimited + AI features)
- FAQ: "Is my data safe?" / "Can I import from Todoist?" / "What happens if I cancel Pro?"
- Final CTA: "Start free today — your tasks aren't going to do themselves"
- Tone: Casual, direct, slightly playful
- Target audience: Solo founders and indie hackers who want simplicity`,
    },
  },
  {
    id: "L37B3",
    levelId: 37,
    type: "review",
    title: "Spot Conversion Problems",
    xp: 20,
    required: true,
    order: 3,
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
      "This landing page hero was generated by AI. It has conversion problems — can you spot them?",
    knownIssues: [
      {
        id: "L37B3I1",
        lineRange: [2, 2],
        description:
          "Generic headline — 'Welcome to Our Platform' says nothing. Should state a specific benefit like 'Ship Projects 2x Faster' or solve a pain point.",
        severity: "critical",
      },
      {
        id: "L37B3I2",
        lineRange: [3, 8],
        description:
          "Feature dump — listing 8 different features instead of one clear value proposition. The visitor has no idea what this product DOES in 5 seconds.",
        severity: "warning",
      },
      {
        id: "L37B3I3",
        lineRange: [9, 14],
        description:
          "Four competing CTAs — the visitor doesn't know which button to click. Should be ONE primary action (e.g., 'Start Free Trial') and at most one secondary.",
        severity: "critical",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L37B4",
    levelId: 37,
    type: "build",
    title: "Build Your Landing Page",
    xp: 50,
    required: true,
    order: 4,
    mission:
      "Build a conversion-optimized landing page: hero, problem/solution, features, social proof, pricing, FAQ, CTAs.",
    githubChecks: { minCommits: 3, commitAfter: "level_start" },
    aiReviewPrompt:
      "Review for conversion: hero with clear value prop, problem/solution, features, social proof, pricing, FAQ, CTAs.",
    passingScore: 55,
  },

  // ─── Level 38: Keep Them Coming Back (4 blocks) ───
  {
    id: "L38B1",
    levelId: 38,
    type: "theory",
    title: "Why Users Leave",
    xp: 10,
    required: true,
    order: 1,
    content: `# Why Users Leave

Getting users to sign up is half the battle. **Keeping them** is the other half.

Users leave because:

1. **Confused** — didn't know what to do first (fix: onboarding flow)
2. **No value fast** — took too long to see the benefit (fix: guide to "aha moment" in under 2 minutes)
3. **Forgot about you** — no reason to come back (fix: emails, notifications)
4. **No habit** — nothing pulling them back daily (fix: streaks, progress bars)

Fix all four → users stay.`,
  },
  {
    id: "L38B2",
    levelId: 38,
    type: "theory",
    title: "Engagement Hooks",
    xp: 10,
    required: true,
    order: 2,
    content: `# Engagement Hooks

Tools to bring users back:

**Onboarding** — Welcome wizard: enter name → create first item → see result. The "You just did X!" moment.

**Emails** — "You have 3 tasks due today", "Someone commented on your post". Timely and useful.

**Streaks** — "5-day streak! Don't break it." Loss aversion is powerful — people hate losing progress more than they enjoy gaining it.

**Progress** — "Profile 80% complete." People feel compelled to fill bars. It's irresistible.

**Notifications** — "New activity on your project." Pull them back when something happens.

Pick 2-3 and implement them. You don't need all.`,
    miniQuiz: [
      {
        question: "Why do streaks work as a retention mechanism?",
        options: [
          "Loss aversion — people don't want to lose their accumulated streak",
          "Streaks make the app load faster",
          "Users earn money for maintaining streaks",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "L38B3",
    levelId: 38,
    type: "prompt",
    title: "Write a Retention Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Add retention features to keep users engaged",
    referencePrompt:
      "Add retention features to my Next.js app: 1) Onboarding flow — after first sign-in, show a 3-step wizard: enter name, create first project, add first task. Skip if already completed. 2) Daily email notification for users with due tasks. 3) Streak system — track consecutive active days, show streak count and fire emoji on dashboard. Reset if user misses a day. 4) Progress bar showing 'Setup: X% complete' based on: profile filled, first project, first task, payment method.",
    hints: [
      "Include onboarding for new users",
      "Add re-engagement (emails/notifications)",
      "Include gamification (streaks, progress)",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L38B4",
    levelId: 38,
    type: "build",
    title: "Add Retention Features",
    xp: 50,
    required: true,
    order: 4,
    mission:
      "Add retention: onboarding flow, email notifications, at least one gamification element (streaks, progress, badges).",
    githubChecks: {
      minFiles: 18,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: onboarding flow, email/notification triggers, gamification element. Integrated into app flow.",
    passingScore: 55,
  },

  // ─── Level 39: The Complete Product (4 blocks) ───
  {
    id: "L39B1",
    levelId: 39,
    type: "theory",
    title: "Project vs Product",
    xp: 10,
    required: true,
    order: 1,
    content: `# Project vs Product

A **PROJECT** works on your laptop. A **PRODUCT** works for strangers who have never seen it before.

The gap:

1. **Edge cases** — What if there's no data? What if they enter weird input? What if the internet is slow?
2. **Security** — Are API routes protected? Are webhooks verified? Can users access each other's data?
3. **First impression** — Does the landing page make sense in 5 seconds?
4. **Complete journey** — Can a stranger go from landing → sign up → use core feature → pay?

Test every step yourself **as if you've never seen the app**. Better yet, have a friend try it while you watch silently.`,
  },
  {
    id: "L39B2",
    levelId: 39,
    type: "pattern",
    title: "Feature Planning Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "feature-planning",
    exercise: {
      goal: "Plan a new feature with clear MVP scope using the Feature Planning Pattern",
      template: `Plan the ___ feature:
User story: As a ___, I want ___ so that ___
Scope (MVP):
- Must have: ___
- Nice to have: ___
- Out of scope: ___
Technical: new models, new routes, new components`,
      exampleFilled: `Plan the streak system feature:
User story: As a user, I want to see my daily streak so that I stay motivated to use the app every day
Scope (MVP):
- Must have: Track last active date, calculate streak count, display streak on dashboard, reset on missed day
- Nice to have: Streak milestones (7-day, 30-day), streak freeze (skip one day), weekly email with streak summary
- Out of scope: Leaderboard, streak rewards/prizes, social sharing of streaks
Technical: new fields on User model (lastActiveDate, streakCount), middleware to update on each visit, dashboard component to display streak`,
    },
  },
  {
    id: "L39B3",
    levelId: 39,
    type: "audit",
    title: "Security Audit",
    xp: 25,
    required: true,
    order: 3,
    description:
      "Audit YOUR project for security vulnerabilities. A single critical issue can get your app hacked, your users' data leaked, or your Stripe account drained. Check everything.",
    checklist: [
      {
        id: "L39A1",
        category: "security",
        title: "No secrets in code or git history",
        description: "API keys, database URLs, and tokens are in .env — never committed to git.",
        severity: "critical",
        howToCheck: "Search your codebase for actual key values (sk_live_, pk_live_, password=). Run `git log -p | grep -i 'secret\\|password\\|api_key'` to check history.",
      },
      {
        id: "L39A2",
        category: "security",
        title: "API routes require authentication",
        description: "Protected endpoints check for a valid session before doing anything. No auth = no access.",
        severity: "critical",
        howToCheck: "Open each API route file. Does it call auth() or getServerSession() at the top? Try calling the endpoint without being logged in (use curl or Postman).",
      },
      {
        id: "L39A3",
        category: "security",
        title: "Users can't access each other's data",
        description: "Every database query filters by the logged-in user's ID. User A can't see User B's items.",
        severity: "critical",
        howToCheck: "Check every Prisma query in API routes. Does it include `where: { userId: session.user.id }`? Log in as two different users and try to access each other's data.",
      },
      {
        id: "L39A4",
        category: "security",
        title: "Webhook signatures are verified",
        description: "Stripe webhooks use constructEvent() with the signing secret. No one can fake a payment.",
        severity: "critical",
        howToCheck: "Open your webhook handler. Is it using `stripe.webhooks.constructEvent(body, sig, secret)`? If it just does `req.json()` without verification — anyone can POST fake events.",
      },
      {
        id: "L39A5",
        category: "security",
        title: "Input validation on forms and API",
        description: "User input is validated server-side. No SQL injection, no XSS, no unlimited-length strings.",
        severity: "warning",
        howToCheck: "Try submitting forms with empty fields, very long strings (10,000+ chars), and HTML like `<script>alert('xss')</script>`. Does the server reject bad input?",
      },
      {
        id: "L39A6",
        category: "security",
        title: "Feature gating is server-side",
        description: "Pro features are enforced on the server, not just hidden in the UI. Free users can't bypass the paywall.",
        severity: "critical",
        howToCheck: "Check API routes for paid features. Do they verify the user's plan before proceeding? Try calling a Pro API endpoint as a Free user directly.",
      },
      {
        id: "L39A7",
        category: "security",
        title: ".env.example exists without real values",
        description: "New developers can set up the project without seeing real secrets.",
        severity: "warning",
        howToCheck: "Check if .env.example exists. Does it list all required env vars with placeholder values like YOUR_API_KEY_HERE?",
      },
      {
        id: "L39A8",
        category: "security",
        title: "Auth cookies are secure",
        description: "Session cookies use httpOnly, secure, and sameSite flags in production.",
        severity: "warning",
        howToCheck: "Open DevTools → Application → Cookies. Check your session cookie. Is it httpOnly? Secure? If using NextAuth — it handles this, but verify.",
      },
      {
        id: "L39A9",
        category: "code-quality",
        title: "Error messages don't leak internals",
        description: "API errors return user-friendly messages, not stack traces or database schema details.",
        severity: "warning",
        howToCheck: "Trigger an error in your API (e.g., request a non-existent item). Does the response show internal error details or a clean error message?",
      },
      {
        id: "L39A10",
        category: "security",
        title: "Rate limiting on auth endpoints",
        description: "Login/signup endpoints limit attempts to prevent brute-force attacks.",
        severity: "suggestion",
        howToCheck: "Try sending 100 rapid requests to your login endpoint. Does it start rejecting them? If not, consider adding rate limiting middleware.",
      },
    ],
    minPassed: 6,
  },
  {
    id: "L39B4",
    levelId: 39,
    type: "debug",
    title: "Fix Production Issues",
    xp: 25,
    required: true,
    order: 4,
    scenarios: [
      {
        id: "L39B4D1",
        title: "Auth redirect loop",
        description:
          "Users are stuck in an infinite redirect loop. The protected dashboard page redirects to /login, but /login immediately redirects back to /dashboard. The browser shows 'too many redirects'.",
        brokenCode: `// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// The matcher catches ALL routes including /login itself
// So: /dashboard → no token → redirect to /login → no token → redirect to /login → loop`,
        language: "typescript",
        hint: "The middleware matcher catches /login too. When an unauthenticated user hits /login, it redirects them... back to /login.",
        expectedFix:
          "Exclude /login from the middleware matcher, or add a condition to skip the redirect when the user is already on the /login page. For example: matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)']",
      },
      {
        id: "L39B4D2",
        title: "Webhook fails silently",
        description:
          "Stripe sends webhooks but the user's plan never updates. The Stripe dashboard shows webhooks are being sent, but they all return 404. The app works fine locally.",
        brokenCode: `// Local development (works):
// Stripe CLI forwards to: http://localhost:3000/api/webhooks/stripe

// Production (broken):
// Stripe dashboard webhook URL: https://myapp.vercel.app/webhooks/stripe
//
// The API route file is at:
// src/app/api/webhooks/stripe/route.ts
//
// Stripe dashboard shows: 404 Not Found for every webhook
// The URL in Stripe is missing the /api/ prefix`,
        language: "typescript",
        hint: "Compare the webhook URL in Stripe's dashboard with where the actual API route lives. Look at the path carefully.",
        expectedFix:
          "The webhook URL in Stripe's dashboard is missing the /api/ prefix. Change it from https://myapp.vercel.app/webhooks/stripe to https://myapp.vercel.app/api/webhooks/stripe",
      },
    ],
    passingCount: 1,
  },

  // ─── Level 40: Graduate (3 blocks) ───
  {
    id: "L40B1",
    levelId: 40,
    type: "quiz",
    title: "Final Review",
    xp: 50,
    required: true,
    order: 1,
    questions: [
      {
        question:
          "In a Stripe integration, why should you verify webhook signatures?",
        options: [
          "To make webhooks faster",
          "To prevent anyone from faking a webhook and upgrading themselves for free",
          "Stripe won't send webhooks without verification",
          "It's required by JavaScript",
        ],
        correctIndex: 1,
        explanation:
          "Without signature verification, anyone can POST to your webhook URL and trigger a plan upgrade. Always verify with stripe.webhooks.constructEvent().",
      },
      {
        question: "What is the purpose of the hero section on a landing page?",
        options: [
          "To list every feature of the product",
          "To show the company's history and founding story",
          "To communicate the core value proposition and drive one clear action — in under 5 seconds",
          "To display the navigation menu",
        ],
        correctIndex: 2,
        explanation:
          "The hero must answer 'What does this do and why should I care?' immediately. One headline, one CTA.",
      },
      {
        question: "What is the 'aha moment' in onboarding?",
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
        question: "Why do streaks work as a retention tool?",
        options: [
          "They make the app load faster for returning users",
          "Loss aversion — people hate losing accumulated progress more than they enjoy gaining new progress",
          "Streaks are required by app store guidelines",
          "They reduce server costs",
        ],
        correctIndex: 1,
        explanation:
          "Loss aversion is a powerful psychological principle. A 30-day streak feels too valuable to break.",
      },
      {
        question:
          "When planning a new feature, why define 'out of scope'?",
        options: [
          "To impress stakeholders with how much you thought about",
          "To prevent scope creep — knowing what you WON'T build keeps the MVP focused and shippable",
          "Out of scope items are automatically added to the next sprint",
          "It's a legal requirement for software projects",
        ],
        correctIndex: 1,
        explanation:
          "Without clear boundaries, features grow forever. Define what's out of scope so you actually ship.",
      },
    ],
    passingScore: 3,
  },
  {
    id: "L40B2",
    levelId: 40,
    type: "prompt",
    title: "Write Your Product Audit",
    xp: 50,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a comprehensive prompt to audit your entire product before launch",
    referencePrompt:
      "Complete audit of my app. Check: 1) User journey — landing → sign up → use feature → pay. Test every step. 2) Payments — checkout working? webhooks updating? feature gating enforced server-side? 3) Error handling — what happens if DB is down? payment fails? invalid input? 4) Mobile — every page at 375px width. 5) SEO — proper meta tags, OG images. 6) Performance — loads under 3 seconds? 7) Security — secrets in env vars? routes protected? webhooks verified? List all issues with severity.",
    hints: [
      "Cover the entire user journey",
      "Check payments end-to-end",
      "Test mobile and performance",
      "Verify security",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L40B3",
    levelId: 40,
    type: "build",
    title: "Graduate",
    xp: 500,
    required: true,
    order: 3,
    mission:
      "Your app is live, accepting payments, has a complete user experience. Deploy, share, start getting users. This is graduation.\n\nSuggested project: TaskFlow with payments, landing page, retention",
    githubChecks: {
      hasDeploy: true,
      minFiles: 25,
      minCommits: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Final boss — full product audit. Deployment, payments, complete user journey (landing → sign up → use → pay), polished UI, error handling, SEO, emails. Would this earn money?",
    passingScore: 65,
  },
];
