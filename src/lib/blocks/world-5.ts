import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 5 — Take Money (Levels 15-18)
// Stripe, pricing, webhooks, gating
// ═══════════════════════════════════════

export const WORLD_5_BLOCKS: Block[] = [
  // ─── Level 15: How Payments Work (4 blocks) ───
  {
    id: "L15B1",
    levelId: 15,
    type: "theory",
    title: "How Online Payments Work",
    xp: 10,
    required: true,
    order: 1,
    content: `# How Online Payments Work

You never touch credit card numbers. Ever. **Stripe** handles everything.

## The Payment Flow

1. User clicks "Buy Pro" on your pricing page
2. Your server creates a **Checkout Session** (tells Stripe what they're buying)
3. User is redirected to **Stripe's hosted payment page**
4. User enters card details **on Stripe's page** (not yours)
5. Stripe processes payment
6. Stripe sends a **webhook** to your app: "Payment succeeded!"
7. Your app updates the user's plan in the database

You never see the credit card. Stripe is PCI compliant so you don't have to be.

## Stripe Test Mode

Stripe has a test mode with fake credit cards:
- \`4242 4242 4242 4242\` — always succeeds
- \`4000 0000 0000 0002\` — always declines

Use test mode for everything during development. Switch to live mode only when you're ready for real money.

## Stripe Fees

Stripe takes **2.9% + $0.30 per transaction.** On a $12/mo subscription, that's about $0.65. You keep $11.35.

No monthly fees. No setup fees. You only pay when you get paid.`,
    miniQuiz: [
      {
        question: "Where does the user enter their credit card details?",
        options: [
          "On your app's payment form",
          "On Stripe's hosted payment page — you never touch card data",
          "In a popup that your app renders",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L15B2",
    levelId: 15,
    type: "theory",
    title: "Pricing That Works",
    xp: 10,
    required: true,
    order: 2,
    content: `# Pricing Models — Which One for Your SaaS?

## Three Main Models

### 1. Freemium (Recommended to Start)
- **Free tier** with limitations
- **Paid tier** unlocks everything
- Why: gets users in the door. They try it, love it, upgrade.

Example: Notion — free for personal use, paid for teams.

### 2. Subscription
- Monthly or yearly recurring payment
- Predictable revenue (MRR)
- Why: best for SaaS. Recurring revenue compounds.

Example: Netflix — $12.99/mo, cancel anytime.

### 3. One-Time Payment
- Pay once, use forever
- Simpler but no recurring revenue
- Why: good for tools, bad for SaaS.

Example: Lifetime deals on AppSumo.

## The Winning Combo: Freemium + Subscription

Most successful SaaS apps use both:
1. **Free plan** — basic features, limited usage
2. **Pro plan** — $12-29/mo, unlimited everything
3. Optional: **Team plan** — per-seat pricing for businesses

## Keep It Simple

Two plans is enough for launch. Don't overthink tiers. You can always add more later.

| Plan | Price | What's included |
|---|---|---|
| Free | $0 | Core features, limited usage |
| Pro | $12/mo | Everything, unlimited |`,
    miniQuiz: [
      {
        question: "Why is freemium the best starting model for SaaS?",
        options: [
          "Because free is always better than paid",
          "It gets users in the door — they try free, love it, then upgrade to paid",
          "Because Stripe charges less for free plans",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L15B3",
    levelId: 15,
    type: "pattern",
    title: "The Payment Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "payment-pattern",
    exercise: {
      goal: "Plan your Stripe integration: plans, flow, gating, security",
      template: `Add Stripe to [my app]:

Plans:
- Free: ___
- Pro ($___/mo): ___

Gating:
- Free users: ___
- Pro users: ___

Security:
- Verify webhook signatures
- Check plan in API, not just UI`,
      exampleFilled: `Add Stripe to FocusFlow:

Plans:
- Free: 1 team, 5 sessions/day, basic stats
- Pro ($12/mo): unlimited teams, unlimited sessions, analytics

Gating:
- Free: show upgrade banner, limit sessions, 1 team max
- Pro: no limits, analytics tab, team creation

Security:
- Verify webhook signatures with STRIPE_WEBHOOK_SECRET
- Check user.plan in API routes before returning premium data`,
    },
  },
  {
    id: "L15B4",
    levelId: 15,
    type: "experiment",
    title: "Set Up Stripe",
    xp: 15,
    required: true,
    order: 4,
    description: "Create a Stripe account and get your test API keys.",
    steps: [
      {
        id: "L15B4S1",
        instruction:
          "Go to **stripe.com** and create an account. You don't need to verify your business yet — test mode works immediately.",
        expectedOutcome: "You're in the Stripe dashboard.",
        question: "Can you see the Stripe dashboard?",
      },
      {
        id: "L15B4S2",
        instruction:
          "Make sure you're in **Test mode** (toggle in the top-right). Go to **Developers → API keys**. Copy your **Publishable key** and **Secret key**.\n\nAdd them to `.env.local`:\n```\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...\nSTRIPE_SECRET_KEY=sk_test_...\n```",
        expectedOutcome: "Stripe keys are in your .env.local file.",
        question: "Are your Stripe test keys in .env.local?",
      },
      {
        id: "L15B4S3",
        instruction:
          "In Stripe dashboard, go to **Products** and create your plans:\n1. A **Free** plan (price: $0 — or just skip creating it in Stripe)\n2. A **Pro** plan with a monthly price\n\nCopy the **Price ID** (starts with `price_`) — you'll need it in your code.",
        expectedOutcome: "Your Pro plan exists in Stripe with a Price ID.",
        question: "What's your Pro plan's Price ID?",
      },
    ],
  },

  // ─── Level 16: Pricing & Checkout (3 blocks) ───
  {
    id: "L16B1",
    levelId: 16,
    type: "theory",
    title: "The Payment Flow in Code",
    xp: 10,
    required: true,
    order: 1,
    content: `# Building the Payment Flow

## Step 1: Pricing Page

A simple page showing your plans with a "Buy" button on the paid plan. Don't overcomplicate it:
- Plan name and price
- What's included (bullet list)
- One CTA button per plan
- The Pro plan should stand out visually

## Step 2: Create Checkout Session (Server-Side)

When user clicks "Buy Pro":
1. Your frontend calls your API: \`POST /api/stripe/checkout\`
2. Your API creates a Stripe Checkout Session
3. Stripe returns a URL
4. You redirect the user to that URL

The Checkout Session tells Stripe:
- What product/price the user is buying
- Where to redirect after success (\`/dashboard?success=true\`)
- Where to redirect if they cancel (\`/pricing\`)
- The customer's email (from your auth session)

## Step 3: User Pays on Stripe

The user enters their card details on Stripe's page. You have zero involvement. Stripe handles:
- Card validation
- 3D Secure verification
- Fraud detection
- Receipt emails

After payment, Stripe redirects the user to your success URL.

## Important: Don't Trust the Redirect

The success redirect is for UX only. A user could manually type \`/dashboard?success=true\` without paying.

The REAL confirmation comes via **webhooks** (next level).`,
  },
  {
    id: "L16B2",
    levelId: 16,
    type: "prompt",
    title: "Build Pricing & Checkout",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "hints",
    goal: "Build a pricing page and Stripe Checkout integration.",
    referencePrompt: `Add Stripe Checkout to my Next.js app.

1. Create a /pricing page with two plans:
   - Free: "Core features" — no button needed (already using it)
   - Pro ($12/mo): "Everything unlimited" — "Upgrade to Pro" button
   - Make the Pro card slightly larger/highlighted as the recommended plan

2. Create API route POST /api/stripe/checkout:
   - Get the user session (must be logged in)
   - Create a Stripe Checkout Session with:
     - price: process.env.STRIPE_PRO_PRICE_ID
     - mode: 'subscription'
     - customer_email: session user's email
     - success_url: /dashboard?checkout=success
     - cancel_url: /pricing
   - Return the checkout URL

3. When user clicks "Upgrade to Pro", call the API and redirect to the checkout URL.

Use the stripe npm package. My STRIPE_SECRET_KEY is in .env.local.`,
    hints: [
      "Create the pricing page UI first, then wire up the API",
      "Use stripe.checkout.sessions.create() to create the session",
      "Always check auth before creating a checkout session",
      "Set customer_email so Stripe links the payment to the user",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L16B3",
    levelId: 16,
    type: "build",
    title: "Checkout Flow",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Build a pricing page with plans. 'Buy' button creates a Stripe Checkout session and redirects to Stripe. Test with fake card 4242 4242 4242 4242.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: pricing page with at least 2 plans, Stripe Checkout integration (API route that creates a session), redirect to Stripe. Auth check before creating checkout. Success and cancel URLs.",
    passingScore: 55,
  },

  // ─── Level 17: Webhooks & Gating (4 blocks) ───
  {
    id: "L17B1",
    levelId: 17,
    type: "theory",
    title: "Webhooks — Stripe Calls You",
    xp: 10,
    required: true,
    order: 1,
    content: `# Webhooks — How Stripe Tells You "They Paid"

A webhook is Stripe making an HTTP request to YOUR app when something happens.

## The Flow

1. User pays on Stripe's checkout page
2. Stripe processes the payment
3. Stripe POSTs to \`your-app.com/api/stripe/webhook\`
4. Your webhook handler:
   - Verifies the request is really from Stripe (signature check)
   - Reads the event type (checkout.session.completed)
   - Updates the user's plan in your database
5. Returns 200 OK to Stripe

## Events You Need to Handle

| Event | What happened | What to do |
|---|---|---|
| checkout.session.completed | User just paid | Set user plan to Pro |
| invoice.paid | Recurring payment succeeded | Keep plan active |
| invoice.payment_failed | Card declined | Notify user, maybe downgrade |
| customer.subscription.deleted | User canceled | Set plan back to Free |

## Webhook Signature Verification

Anyone could POST fake data to your webhook URL. Stripe signs every webhook with a secret.

\`\`\`javascript
const event = stripe.webhooks.constructEvent(
  body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET  // from Stripe dashboard
);
\`\`\`

If the signature doesn't match, reject the request. This prevents fake payment confirmations.

## Testing Webhooks Locally

Use the **Stripe CLI** to forward webhooks to your local server:

\`\`\`
stripe listen --forward-to localhost:3000/api/stripe/webhook
\`\`\`

This gives you a webhook signing secret for local testing.`,
    miniQuiz: [
      {
        question: "Why must you verify webhook signatures?",
        options: [
          "Stripe requires it for billing purposes",
          "Without verification, anyone could send fake 'payment succeeded' events to your webhook",
          "It makes webhooks faster",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L17B2",
    levelId: 17,
    type: "theory",
    title: "Feature Gating",
    xp: 10,
    required: true,
    order: 2,
    content: `# Feature Gating — Free vs Pro

After a user pays, you need to **gate** features — show different things based on their plan.

## The Rule: Check Server-Side

**Wrong:** Hide the Pro button with CSS/JavaScript
\`\`\`javascript
// BAD — anyone can change this in DevTools
{user.plan === 'pro' && <ProFeature />}
\`\`\`

**Right:** Check the plan in your API routes
\`\`\`javascript
// GOOD — server-side check, can't be bypassed
if (user.plan !== 'pro') {
  return Response.json({ error: 'Upgrade to Pro' }, { status: 403 });
}
\`\`\`

You still hide UI elements for better UX. But the **real** gating happens on the server.

## Common Gating Patterns

| Pattern | Free | Pro |
|---|---|---|
| Feature lock | 3 projects max | Unlimited |
| Usage limit | 100 API calls/day | 10,000/day |
| Feature toggle | Basic dashboard | Analytics tab visible |
| Export | No export | CSV/PDF export |

## Show Upgrade Prompts

When a free user hits a limit, don't just show an error. Show them WHY they should upgrade:

"You've used 3 of 3 free projects. Upgrade to Pro for unlimited projects — $12/mo."

This is your best conversion moment.`,
    miniQuiz: [
      {
        question: "Where should you check the user's plan for feature gating?",
        options: [
          "Only in the UI — hide buttons for free users",
          "In the API routes (server-side) — UI hiding is for UX only, not security",
          "In the database schema",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L17B3",
    levelId: 17,
    type: "debug",
    title: "Fix Payment Issues",
    xp: 20,
    required: true,
    order: 3,
    scenarios: [
      {
        id: "L17B3S1",
        title: "Webhook not working",
        description:
          "User pays successfully on Stripe, gets redirected to /dashboard?success=true, but their plan is still 'free' in the database. The webhook endpoint exists but the plan never updates.",
        brokenCode: `// api/stripe/webhook/route.ts
export async function POST(request) {
  const body = await request.text();

  // Parse the event directly without verification
  const event = JSON.parse(body);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Update user plan... but which user?
    await supabase
      .from('users')
      .update({ plan: 'pro' })
      .eq('email', session.customer_email);
  }

  return Response.json({ received: true });
}`,
        language: "typescript",
        hint: "Two issues: (1) No webhook signature verification — anyone can fake this request. (2) Make sure the email match actually finds the user. Also check: is the webhook URL registered in Stripe dashboard?",
        expectedFix:
          "Should verify webhook signature using stripe.webhooks.constructEvent(). Should also check that the user was actually found before returning success. Webhook URL must be registered in Stripe.",
      },
      {
        id: "L17B3S2",
        title: "Feature not gated properly",
        description:
          "Pro features are hidden in the UI for free users, but if you call the API directly (with curl or Postman), you can still access pro-only data without paying.",
        brokenCode: `// api/analytics/route.ts — supposed to be Pro only
export async function GET() {
  // No plan check — returns data for everyone
  const { data } = await supabase
    .from('analytics')
    .select('*');
  return Response.json(data);
}`,
        language: "typescript",
        hint: "The API route doesn't check the user's plan. Anyone with a valid session can access it. Add a plan check before returning data.",
        expectedFix:
          "Should check session auth AND user.plan === 'pro' before returning analytics data. Return 403 with upgrade message for free users.",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L17B4",
    levelId: 17,
    type: "build",
    title: "Full Payment Flow",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Handle Stripe webhooks: update user plan in database on successful payment. Gate features: Free users see upgrade prompt, Pro users see full features. Server-side gating.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: webhook endpoint handling Stripe events, user plan update in database, feature gating (server-side check, not just UI hiding), webhook signature verification.",
    passingScore: 55,
  },

  // ─── Level 18: Money Boss (3 blocks) ───
  {
    id: "L18B1",
    levelId: 18,
    type: "review",
    title: "Spot Payment Bugs",
    xp: 20,
    required: true,
    order: 1,
    code: `// Pricing page component
export default function PricingPage() {
  const { user } = useAuth();

  async function handleUpgrade() {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
    });
    const { url } = await response.json();
    window.location.href = url;
  }

  return (
    <div>
      <h1>Pricing</h1>
      <div className="plans">
        <div className="plan">
          <h2>Free</h2>
          <p>$0/mo</p>
          <ul><li>3 projects</li><li>Basic features</li></ul>
        </div>
        <div className="plan">
          <h2>Pro</h2>
          <p>$12/mo</p>
          <ul><li>Unlimited projects</li><li>Analytics</li><li>Priority support</li></ul>
          {user?.plan === 'pro'
            ? <span>Current Plan</span>
            : <button onClick={handleUpgrade}>Upgrade</button>
          }
        </div>
      </div>
    </div>
  );
}`,
    language: "tsx",
    description:
      "A pricing page with Stripe checkout. Works at first glance. What could go wrong?",
    knownIssues: [
      {
        id: "no-loading-state",
        lineRange: [6, 11],
        description:
          "No loading state on the upgrade button. User clicks 'Upgrade', nothing visible happens for 1-2 seconds while the API call processes. They might click again, creating duplicate checkout sessions.",
        severity: "warning",
      },
      {
        id: "no-error-handling",
        lineRange: [7, 7],
        description:
          "No error handling on the fetch call. If the API returns an error (auth failed, Stripe error), the code tries to redirect to undefined and breaks.",
        severity: "critical",
      },
      {
        id: "client-side-plan-check",
        lineRange: [21, 21],
        description:
          "Plan check is only client-side (user?.plan). If the user modifies localStorage or the auth state, they could bypass this. The API must also verify the plan.",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L18B2",
    levelId: 18,
    type: "audit",
    title: "Payment Checklist",
    xp: 25,
    required: true,
    order: 2,
    description: "Audit your payment integration.",
    checklist: [
      {
        id: "checkout-works",
        category: "ux",
        title: "Checkout Flow Works",
        description: "Clicking 'Buy' creates a Stripe Checkout session and redirects to Stripe. User can complete payment with test card 4242 4242 4242 4242.",
        severity: "critical",
        howToCheck: "Click the upgrade button, complete payment with test card. Check Stripe dashboard for the payment.",
      },
      {
        id: "webhook-updates-plan",
        category: "security",
        title: "Webhook Updates Plan",
        description: "After successful payment, the user's plan is updated in the database via webhook (not via the success redirect).",
        severity: "critical",
        howToCheck: "After payment, check the database directly. Is the user's plan updated to 'pro'?",
      },
      {
        id: "webhook-verified",
        category: "security",
        title: "Webhook Signature Verified",
        description: "Webhook endpoint verifies the Stripe signature before processing events.",
        severity: "critical",
        howToCheck: "Check the webhook code for stripe.webhooks.constructEvent() with STRIPE_WEBHOOK_SECRET.",
      },
      {
        id: "server-side-gating",
        category: "security",
        title: "Server-Side Feature Gating",
        description: "Pro features are gated in API routes (server-side), not just hidden in the UI.",
        severity: "critical",
        howToCheck: "As a free user, try calling pro-only API routes directly with curl. Do they return 403?",
      },
      {
        id: "upgrade-prompts",
        category: "ux",
        title: "Upgrade Prompts",
        description: "When free users hit a limit, they see a helpful upgrade prompt (not just an error).",
        severity: "warning",
        howToCheck: "As a free user, try to use a Pro feature. Do you see a clear upgrade prompt?",
      },
    ],
    minPassed: 4,
  },
  {
    id: "L18B3",
    levelId: 18,
    type: "build",
    title: "App That Takes Money",
    xp: 200,
    required: true,
    order: 3,
    mission:
      "Boss level: complete Stripe integration. Pricing page, checkout, webhooks, feature gating. Test end-to-end with Stripe test cards.",
    githubChecks: {
      minCommits: 5,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: pricing page with plans, Stripe Checkout, webhook handler with signature verification, database plan update, server-side feature gating. Full payment flow should work in test mode.",
    passingScore: 60,
  },
];
