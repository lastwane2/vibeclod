import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// WORLD 4 — Money (L14-L17)
// Stripe → checkout → gating → boss
// ═══════════════════════════════════════

export const WORLD_4_BLOCKS: Block[] = [
  // ─── Level 14: How to Get Paid ────────
  {
    id: "L14B1",
    levelId: 14,
    type: "theory",
    title: "Stripe in Test Mode",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Take Money Without Real Money (Yet)

Stripe has a **test mode** — everything works like real payments, but no actual money moves.

Test card number: \`4242 4242 4242 4242\` (any expiry, any CVC).

## Setup

1. Go to stripe.com → create account
2. **Turn on Test Mode** (toggle at the top)
3. You get two keys:
   - \`pk_test_...\` — Publishable key (safe for browser)
   - \`sk_test_...\` — Secret key (**server only, NEVER in browser**)

## The Critical Rule

\`STRIPE_SECRET_KEY\` goes in \`.env.local\` **WITHOUT** the \`NEXT_PUBLIC_\` prefix.

Why? Variables with \`NEXT_PUBLIC_\` get sent to the browser. Your secret key in the browser = anyone can charge your Stripe account.

\`\`\`
# .env.local
STRIPE_SECRET_KEY=sk_test_...          # ← NO NEXT_PUBLIC_ prefix!
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # ← This one is OK in browser
\`\`\``,
    miniQuiz: [
      {
        question:
          "Why does STRIPE_SECRET_KEY NOT get the NEXT_PUBLIC_ prefix?",
        options: [
          "It's too long",
          "NEXT_PUBLIC_ sends it to the browser — secret keys must stay on the server",
          "It's a Stripe requirement",
          "It doesn't matter",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L14B2",
    levelId: 14,
    type: "experiment",
    title: "Set Up Stripe",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    description:
      "Create a Stripe account, product, and add env vars.",
    steps: [
      {
        id: "account",
        instruction:
          "Go to stripe.com → create account → turn on Test Mode (toggle at the top). Copy your Publishable key (pk_test_) and Secret key (sk_test_) from the API keys page.",
        expectedOutcome: "Stripe account in test mode with both keys.",
      },
      {
        id: "env",
        instruction:
          "Add to .env.local: STRIPE_SECRET_KEY=sk_test_... and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... Update .env.example with placeholder names. Add to Vercel too.",
        expectedOutcome:
          "Stripe keys in .env.local and Vercel. .env.example updated.",
      },
      {
        id: "product",
        instruction:
          "Stripe Dashboard → Products → Add product. Name it '[Your App] Pro', set price ($9/mo or whatever). Copy the Price ID (price_...).",
        expectedOutcome:
          "Product created in Stripe with a Price ID you can use.",
      },
    ],
  },
  {
    id: "L14B3",
    levelId: 14,
    type: "prompt",
    title: "Build Pricing Page",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to build a pricing page with a design reference.",
    referencePrompt: `Create a /pricing page.
Design reference: [URL of a pricing page you like]. I like [what specifically].

Two plans: Free and Pro ($9/month).
Free: [2-3 features]. Pro: [everything + 2-3 extra features].
Make the Pro plan stand out visually — highlighted border, "Most Popular" badge.
One button per plan.`,
    hints: [
      "Find a pricing page you like first — Linear, Notion, any SaaS",
      "Tell AI what you like about the reference",
      "Pro should visually stand out — say so explicitly",
    ],
    passingThreshold: 3,
  },
  {
    id: "L14B4",
    levelId: 14,
    type: "build",
    title: "Stripe + Pricing Ready",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Push: Stripe env vars in .env.example, pricing page with Free/Pro plans. At least 2 commits.",
    githubChecks: {
      minCommits: 2,
      fileExists: [".env.example"],
    },
    aiReviewPrompt:
      "Check for: Stripe env vars in .env.example (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY names), a pricing page or component with two plans (free/pro). The pricing page should look intentional, not like a placeholder.",
    passingScore: 60,
  },

  // ─── Level 15: Buy Button Works ───────
  {
    id: "L15B1",
    levelId: 15,
    type: "theory",
    title: "How Payments Flow",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# The Payment Flow

Here's what happens when someone clicks "Upgrade to Pro":

1. **Your server** creates a Checkout Session (tells Stripe: "this user wants to buy Pro")
2. **Stripe** shows its own payment page (you don't handle card numbers — Stripe does)
3. **User** enters card details on Stripe's page and pays
4. **Stripe** sends a **webhook** to your server: "hey, this person paid"
5. **Your server** updates the user's plan in the database: free → pro

The webhook is the tricky part. It's Stripe calling YOUR API endpoint to tell you about the payment. You need to:
- Create an API route to receive it
- Verify the webhook signature (so nobody can fake it)
- Update the database

**STRIPE_WEBHOOK_SECRET** — one more env var. You get it from Stripe Dashboard → Webhooks.`,
  },
  {
    id: "L15B2",
    levelId: 15,
    type: "prompt",
    title: "Wire Up Payments",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    scaffold: "full",
    goal: "Tell AI to add the full Stripe Checkout + webhook flow.",
    referencePrompt: `Add the full Stripe payment flow:
1. "Upgrade to Pro" button creates a Checkout Session and redirects to Stripe
2. Webhook endpoint receives the event when the user pays and updates their plan in the database
3. Add a "plan" field to the user (free/pro)
4. Webhook must verify the signature (constructEvent with STRIPE_WEBHOOK_SECRET)
Price ID: [paste your Price ID from Stripe Dashboard]`,
    hints: [
      "Include your Price ID — AI needs it",
      "Mention constructEvent — that's the webhook signature check",
      "AI handles all the Stripe code — you test the flow",
    ],
    passingThreshold: 3,
  },
  {
    id: "L15B3",
    levelId: 15,
    type: "experiment",
    title: "Test Payment Flow",
    xp: 20,
    required: true,
    order: 3,
    estimatedMinutes: 8,
    description:
      "Test the complete payment flow with Stripe's test card.",
    steps: [
      {
        id: "webhook-setup",
        instruction:
          "Stripe Dashboard → Webhooks → Add endpoint. URL: https://yourapp.vercel.app/api/stripe/webhook (or whatever your webhook route is). Select events: checkout.session.completed, customer.subscription.deleted. Copy the webhook secret → add to .env.local as STRIPE_WEBHOOK_SECRET. Add to Vercel too.",
        expectedOutcome:
          "Webhook endpoint configured in Stripe with the correct URL.",
      },
      {
        id: "checkout",
        instruction:
          "Click 'Upgrade to Pro' in your app. Are you redirected to Stripe's checkout page?",
        expectedOutcome: "Stripe Checkout page opens with your product.",
      },
      {
        id: "pay",
        instruction:
          "Enter test card: 4242 4242 4242 4242, any future expiry, any CVC. Complete the payment. Are you redirected back to your app?",
        expectedOutcome: "Payment completes, redirect to your app.",
      },
      {
        id: "verify",
        instruction:
          "Check Supabase: is the user's plan now 'pro'? Check Stripe Dashboard → Webhooks → Recent events: was the webhook delivered successfully (200)?",
        expectedOutcome:
          "Plan updated in database. Webhook delivered with 200 status.",
      },
    ],
  },
  {
    id: "L15B4",
    levelId: 15,
    type: "build",
    title: "Payments Work",
    xp: 20,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Push your payment integration. Checkout route, webhook endpoint, plan update logic. At least 3 commits.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for: Stripe Checkout session creation, webhook endpoint that handles Stripe events, webhook signature verification (constructEvent), plan field update. At least 3 commits.",
    passingScore: 60,
  },

  // ─── Level 16: Free vs Pro ────────────
  {
    id: "L16B1",
    levelId: 16,
    type: "theory",
    title: "Server Checks, Not UI Hiding",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Hiding a Button Is NOT Security

You might think: "I'll just hide the Pro features in the UI for free users."

That's like putting a "Do Not Enter" sign without a lock. Anyone can call your API directly and get Pro features for free.

**The rule: check the plan on the SERVER.**

Every API route that serves Pro data should:
1. Get the user's session
2. Check their plan in the database
3. If free → return 403 (forbidden)
4. If pro → return the data

The UI hides Pro features for a nice experience. The SERVER enforces it for real security.

Also: when a subscription is canceled, Stripe sends a \`customer.subscription.deleted\` webhook. Your server should catch this and set the user's plan back to free.`,
  },
  {
    id: "L16B2",
    levelId: 16,
    type: "prompt",
    title: "Add Feature Gating",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to add server-side plan checks and UI gating.",
    referencePrompt: `Add free/pro feature separation:
1. On the SERVER: check the user's plan in every API route for pro features. If free → return 403.
2. In the UI: free users see an upgrade prompt instead of pro features
3. Free tier limits: [describe what free users can/can't do]
4. Handle subscription.deleted webhook — set plan back to free when canceled`,
    hints: [
      "Server checks are the REAL gate — UI is just cosmetic",
      "Mention specific limits: number of items, no export, etc.",
      "Don't forget the cancellation webhook",
    ],
    passingThreshold: 3,
  },
  {
    id: "L16B3",
    levelId: 16,
    type: "experiment",
    title: "Test Feature Gating",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description:
      "Verify that free users can't access pro features — not even through the API.",
    steps: [
      {
        id: "free-ui",
        instruction:
          "As a free user: navigate to where Pro features should be. Do you see an upgrade prompt instead?",
        expectedOutcome:
          "Pro features replaced by upgrade prompt for free users.",
      },
      {
        id: "free-api",
        instruction:
          "As a free user: try to call a Pro API route directly (use the browser address bar or DevTools → Network → copy the API URL). Do you get a 403?",
        expectedOutcome:
          "403 Forbidden when free user tries Pro API endpoint.",
      },
      {
        id: "pro-access",
        instruction:
          "As a pro user (upgrade first if needed): are all Pro features accessible?",
        expectedOutcome: "Pro user sees and can use all features.",
      },
    ],
  },
  {
    id: "L16B4",
    levelId: 16,
    type: "build",
    title: "Gating Complete",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Push: server-side plan checks, UI upgrade prompts, subscription cancellation handling. At least 2 commits.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Check for: server-side plan checks in API routes, UI conditional rendering based on plan, upgrade prompts for free users, webhook handling for subscription.deleted. Server-side checks are critical — not just UI hiding.",
    passingScore: 60,
  },

  // ─── Level 17: BOSS — Payment Cycle ───
  {
    id: "L17B1",
    levelId: 17,
    type: "experiment",
    title: "Full Payment Test",
    xp: 25,
    required: true,
    order: 1,
    estimatedMinutes: 10,
    description:
      "Test the complete payment lifecycle on production.",
    steps: [
      {
        id: "new-user",
        instruction:
          "On your PRODUCTION URL: register a brand new user. Are they on the free plan? Are Pro features blocked?",
        expectedOutcome: "New user starts on free. Pro features inaccessible.",
      },
      {
        id: "upgrade",
        instruction:
          "Click Upgrade → Stripe checkout opens? Pay with test card (4242...) → redirected back?",
        expectedOutcome: "Checkout completes, user returns to the app.",
      },
      {
        id: "pro-check",
        instruction:
          "Check: user's plan updated to pro in the database? Pro features now accessible? Stripe Dashboard → Webhooks → event delivered with 200?",
        expectedOutcome:
          "Plan is pro, features unlocked, webhook successful.",
      },
      {
        id: "webhook-url",
        instruction:
          "Verify: the webhook URL in Stripe Dashboard is your PRODUCTION URL (https://yourapp.vercel.app/...), NOT localhost. This is the #1 mistake.",
        expectedOutcome:
          "Webhook URL points to production, not localhost.",
      },
      {
        id: "mobile",
        instruction:
          "All of this works on mobile too? Pricing page, checkout redirect, pro features?",
        expectedOutcome: "Full payment flow works on mobile.",
      },
    ],
  },
  {
    id: "L17B2",
    levelId: 17,
    type: "build",
    title: "Ship Monetized App",
    xp: 40,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    mission:
      "Full payment flow on production: signup → free → upgrade → checkout → pro. Webhooks, gating, env vars — all working. At least 5 commits, 8+ files.",
    githubChecks: {
      minCommits: 5,
      minFiles: 8,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Comprehensive payment review: Stripe integration (checkout + webhooks), server-side plan checks, UI gating, webhook signature verification, proper env var handling, deployed. This should be a real monetized application.",
    passingScore: 70,
  },
];
