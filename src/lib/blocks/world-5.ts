import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 5 — Get Paid (Levels 21-25)
// Patterns: Landing Page, Payment, Feature Planning
// ═══════════════════════════════════════

export const WORLD_5_BLOCKS: Block[] = [
  // ─── Level 21: Payments Setup (5 blocks) ───
  {
    id: "L21B1",
    levelId: 21,
    type: "theory",
    title: "How Payments Work Online",
    xp: 10,
    required: true,
    order: 1,
    content: `# How Payments Work Online

You never handle credit card numbers directly. Payment providers do the heavy lifting:

## The Flow

1. User clicks "Subscribe" on your site
2. They're redirected to **Stripe Checkout** (hosted by Stripe)
3. They enter card details on Stripe's secure page
4. Stripe charges the card and sends a **webhook** to your server
5. Your server updates the user's plan in the database

## Key Concepts

| Concept | What it means |
|---------|---------------|
| **Checkout** | The payment page (hosted or embedded) |
| **Webhook** | Stripe notifying your server of events |
| **Subscription** | Recurring monthly/yearly payment |
| **Customer** | A Stripe record linked to your user |
| **Plan/Price** | The product being sold ($12/mo, $99/yr) |

## Webhooks are critical

Webhooks are how you know a payment actually went through:

\`\`\`typescript
// Verify the webhook is really from Stripe
const event = stripe.webhooks.constructEvent(body, sig, secret);

if (event.type === 'checkout.session.completed') {
  // User paid! Update their plan in your database
}
\`\`\`

## Security rules

1. **NEVER** store credit card numbers
2. **ALWAYS** validate webhook signatures
3. **NEVER** trust client-side plan status — check server-side
4. **ALWAYS** handle failed payments gracefully`,
    miniQuiz: [
      {
        question: "Why should you never trust client-side plan status?",
        options: [
          "It's slower than server-side",
          "Users can modify client-side code to fake having a paid plan",
          "Client-side doesn't support payments",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L21B2",
    levelId: 21,
    type: "pattern",
    title: "Payment Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "payment-pattern",
    exercise: {
      goal: "Use the Payment Pattern to plan your payment integration",
      template: `Add ___ to my app:

Requirements:
- Plans: ___
- Checkout: ___
- Webhooks: ___
- User model: ___
- Gating: ___

Security:
- ___`,
      exampleFilled: `Add Stripe to my task manager SaaS:

Requirements:
- Plans: Free (no card), Pro $9/mo (unlimited tasks)
- Checkout: Stripe Checkout redirect
- Webhooks: checkout.session.completed, customer.subscription.deleted
- User model: add plan (FREE/PRO), stripeCustomerId, stripeSubscriptionId
- Gating: Free = 10 tasks max, Pro = unlimited

Security:
- Validate webhook signatures
- Check plan in API routes, not just UI
- Handle subscription cancellation: downgrade to Free`,
    },
  },
  {
    id: "L21B3",
    levelId: 21,
    type: "prompt",
    title: "Write a Payments Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Write a prompt to add payment integration to your app",
    referencePrompt:
      "Add Stripe payment integration to my Next.js app: 1) Create a pricing page with Free and Pro ($12/month) plans. Free shows current features, Pro shows upgrade benefits. 2) Create POST /api/checkout route that creates a Stripe Checkout session and redirects to it. 3) Create POST /api/webhooks/stripe route that handles checkout.session.completed (upgrade user to PRO) and customer.subscription.deleted (downgrade to FREE). Verify webhook signatures. 4) Add stripeCustomerId and plan fields to User model. 5) Create a middleware or utility that checks user plan in API routes for feature gating. 6) Add a 'Manage Subscription' button that redirects to Stripe Customer Portal.",
    hints: [
      "Describe the full payment flow",
      "List webhook events to handle",
      "Mention security (signature verification)",
      "Include feature gating logic",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L21B4",
    levelId: 21,
    type: "build",
    title: "Add Payments",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add payment integration: pricing page, checkout flow, webhook handler.",
    githubChecks: {
      minFiles: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for payment integration: pricing page, checkout redirect, webhook handler, plan model in schema.",
    passingScore: 55,
  },
  {
    id: "L21B5",
    levelId: 21,
    type: "review",
    title: "Spot Payment Security Issues",
    xp: 15,
    required: false,
    order: 5,
    code: `// POST /api/webhooks/stripe
export async function POST(req) {
  const body = await req.json();

  if (body.type === 'checkout.session.completed') {
    const email = body.data.object.customer_email;
    await prisma.user.update({
      where: { email },
      data: { plan: 'PRO' },
    });
  }

  return Response.json({ received: true });
}`,
    language: "typescript",
    description: "This Stripe webhook handler has security issues. Find them.",
    knownIssues: [
      {
        id: "L21B5I1",
        lineRange: [3, 3],
        description:
          "No webhook signature verification — anyone can fake a webhook call and upgrade themselves to PRO",
        severity: "critical",
      },
      {
        id: "L21B5I2",
        lineRange: [3, 3],
        description:
          "Using req.json() instead of req.text() — Stripe signature verification needs the raw body, not parsed JSON",
        severity: "critical",
      },
      {
        id: "L21B5I3",
        lineRange: [5, 9],
        description:
          "No error handling — if the database update fails, the webhook returns 200 and Stripe won't retry",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },

  // ─── Level 22: Email System (4 blocks) ───
  {
    id: "L22B1",
    levelId: 22,
    type: "theory",
    title: "Transactional Emails",
    xp: 10,
    required: true,
    order: 1,
    content: `# Transactional Emails

These are emails triggered by user actions — not marketing blasts.

## Types of transactional emails

| Email | Trigger | Purpose |
|-------|---------|---------|
| Welcome | User signs up | First impression, onboarding |
| Notification | Task assigned, comment | Keep users engaged |
| Receipt | Payment processed | Legal + trust |
| Password reset | User forgot password | Account recovery |
| Re-engagement | User inactive 7 days | Bring them back |

## Email services

| Service | Free tier | Best for |
|---------|-----------|----------|
| Resend | 3k/month | Developer-friendly, React email templates |
| SendGrid | 100/day | High volume |
| Postmark | 100/month | Deliverability |

## React Email (with Resend)

Write email templates with React:

\`\`\`tsx
import { Html, Text, Button } from "@react-email/components";

export function WelcomeEmail({ name }) {
  return (
    <Html>
      <Text>Welcome, {name}!</Text>
      <Button href="https://myapp.com/dashboard">
        Get Started
      </Button>
    </Html>
  );
}
\`\`\`

Then send:

\`\`\`typescript
await resend.emails.send({
  to: user.email,
  subject: "Welcome to MyApp!",
  react: WelcomeEmail({ name: user.name }),
});
\`\`\``,
  },
  {
    id: "L22B2",
    levelId: 22,
    type: "prompt",
    title: "Write an Email Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a prompt to add email functionality to your app",
    referencePrompt:
      "Add email functionality to my Next.js app using Resend: 1) Create a Resend client utility in src/lib/email.ts with the API key from environment variables. 2) Create a welcome email template (React Email) with the user's name, a brief intro, and a 'Get Started' button. 3) Create a notification email template for task assignments. 4) Trigger welcome email on new user sign-up (after account creation). 5) Trigger notification email when a task is assigned. 6) Handle email sending failures gracefully — log errors but don't crash the main flow.",
    hints: [
      "Name the email service (Resend, SendGrid, etc.)",
      "List each email template with its content",
      "Describe when each email is triggered",
      "Mention error handling for sends",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L22B3",
    levelId: 22,
    type: "build",
    title: "Add Emails",
    xp: 35,
    required: true,
    order: 3,
    mission:
      "Add email: set up Resend, create 2+ templates (welcome + notification), trigger from app logic.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for email integration: API setup, at least 2 templates, trigger logic from user actions.",
    passingScore: 55,
  },
  {
    id: "L22B4",
    levelId: 22,
    type: "pattern",
    title: "Performance Pattern",
    xp: 15,
    required: true,
    order: 4,
    patternId: "performance-pattern",
    exercise: {
      goal: "Practice identifying performance issues",
      template: `Optimize ___ for performance:

Current issue: ___
Measurement: ___
Constraints: ___

Areas to check:
- [ ] ___
- [ ] ___
- [ ] ___`,
      exampleFilled: `Optimize the email sending flow for performance:

Current issue: Sign-up takes 3+ seconds because it waits for the welcome email to send
Measurement: User waits 3s after clicking "Sign Up"
Constraints: Email must still be sent

Areas to check:
- [ ] Email is sent synchronously blocking the response
- [ ] Could use fire-and-forget pattern (send async, don't await)
- [ ] Could use a background job queue for email sending`,
    },
  },

  // ─── Level 23: Landing Page Pro (4 blocks) ───
  {
    id: "L23B1",
    levelId: 23,
    type: "theory",
    title: "Landing Page Psychology",
    xp: 10,
    required: true,
    order: 1,
    content: `# Landing Page Psychology

A landing page has one job: **convince visitors to take action**.

## The structure that works

1. **Hero** — Clear headline + subheadline + CTA button (above the fold)
2. **Problem** — Describe the pain your users feel
3. **Solution** — Show how you solve it
4. **Features** — 3-5 key benefits with visuals
5. **Social Proof** — Testimonials, logos, numbers ("500+ users")
6. **Pricing** — Clear plans, highlight the popular one
7. **FAQ** — Answer objections before they become blockers
8. **Final CTA** — Repeat the call-to-action

## Key principles

- **One CTA** — Don't give 5 options. One action: Sign up / Start free / Get started
- **Above the fold** — The hero must convince without scrolling
- **Specific numbers** — "Save 4 hours/week" > "Save time"
- **Social proof** — People trust other people more than you

## Common mistakes

- Too many CTAs competing for attention
- Hero that describes features instead of benefits
- No social proof at all
- Pricing hidden or confusing
- No mobile optimization`,
  },
  {
    id: "L23B2",
    levelId: 23,
    type: "pattern",
    title: "Landing Page Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "landing-page",
    exercise: {
      goal: "Use the Landing Page Pattern to plan your conversion page",
      template: `Build a landing page for ___:

Sections (in order):
1. Hero: ___
2. Problem: ___
3. Solution: ___
4. Features: ___
5. Social proof: ___
6. Pricing: ___
7. FAQ: ___
8. Final CTA: ___

Tone: ___
Target audience: ___`,
      exampleFilled: `Build a landing page for TaskFlow (task manager):

Sections (in order):
1. Hero: "Get things done, finally" / "Simple task management for solo founders" / "Start free"
2. Problem: "Sticky notes and spreadsheets are killing your productivity"
3. Solution: "One clean board for all your tasks, priorities, and deadlines"
4. Features: Kanban board, Priority labels, Due dates, Dark mode, Mobile app
5. Social proof: "1,200 founders trust TaskFlow" + 3 testimonial quotes
6. Pricing: Free (50 tasks), Pro $8/mo (unlimited)
7. FAQ: 4 questions about data, pricing, cancellation, mobile
8. Final CTA: "Start organizing today — free forever plan available"

Tone: friendly and direct
Target audience: indie hackers and solo founders`,
    },
  },
  {
    id: "L23B3",
    levelId: 23,
    type: "build",
    title: "Build Your Landing Page",
    xp: 50,
    required: true,
    order: 3,
    mission:
      "Build a conversion-optimized landing page: hero, problem/solution, features, social proof, pricing, FAQ, CTAs.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review landing page for conversion. Check: hero with clear value prop, problem/solution, features, social proof, pricing, FAQ, CTAs.",
    passingScore: 55,
  },
  {
    id: "L23B4",
    levelId: 23,
    type: "review",
    title: "Review a Landing Page",
    xp: 15,
    required: false,
    order: 4,
    code: `<section className="hero">
  <h1>Welcome to Our Platform</h1>
  <p>We offer a variety of features including task management,
     team collaboration, file sharing, analytics, reporting,
     integrations, API access, and much more.</p>
  <button>Learn More</button>
  <button>Sign Up</button>
  <button>Watch Demo</button>
  <button>Contact Sales</button>
</section>`,
    language: "html",
    description: "This landing page hero was generated by AI. It has conversion problems. Find them.",
    knownIssues: [
      {
        id: "L23B4I1",
        lineRange: [2, 2],
        description:
          '"Welcome to Our Platform" is generic — should state a specific benefit or value proposition',
        severity: "critical",
      },
      {
        id: "L23B4I2",
        lineRange: [3, 5],
        description:
          "Feature dump instead of focusing on the key benefit — too many things listed without prioritization",
        severity: "warning",
      },
      {
        id: "L23B4I3",
        lineRange: [6, 9],
        description:
          "Four competing CTAs — should be ONE primary action. Too many choices = no action (paradox of choice)",
        severity: "critical",
      },
    ],
    minIssuesFound: 2,
  },

  // ─── Level 24: User Retention (4 blocks) ───
  {
    id: "L24B1",
    levelId: 24,
    type: "theory",
    title: "Why Users Leave (and How to Keep Them)",
    xp: 10,
    required: true,
    order: 1,
    content: `# User Retention

Getting users to sign up is hard. Getting them to **come back** is harder.

## Why users leave

1. **Confused onboarding** — don't know what to do first
2. **No value fast** — took too long to see the benefit
3. **Forgot about you** — no reminders or engagement hooks
4. **Found something better** — your product wasn't sticky enough

## Retention strategies

### 1. Onboarding flow
Guide new users to their "aha moment" — the first time they feel value:
- Welcome modal → First task → See results → "You just did X!"

### 2. Engagement hooks
Bring users back:
- Email: "You have 3 tasks due today"
- Notifications: new comments, assignments
- Streaks: "5-day streak! Don't break it"

### 3. Gamification
Make progress visible:
- Progress bars ("Profile 70% complete")
- Points/XP for actions
- Badges for milestones
- Streaks for consistency

### 4. Social features
Make it harder to leave:
- Team workspaces (your team depends on you)
- Shared projects
- Comments and collaboration

## For your app

Pick at least one from each category: onboarding, engagement hook, and gamification.`,
  },
  {
    id: "L24B2",
    levelId: 24,
    type: "prompt",
    title: "Write a Retention Prompt",
    xp: 25,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a prompt to add retention features to your app",
    referencePrompt:
      "Add user retention features to my Next.js app: 1) Onboarding flow: after first sign-in, show a 3-step welcome wizard — enter name, create first project, add first task. Track onboarding completion with a boolean field. Skip wizard if already completed. 2) Daily engagement email: cron job or serverless function that sends 'You have X tasks due today' to active users. 3) Streak system: track consecutive days of activity. Show current streak on the dashboard. Break streak if user misses a day. Show a 'Don't break your streak!' notification after 3+ days. 4) Progress bar: show 'Profile completeness' as a percentage — fields filled, first project created, first task done, payment method added.",
    hints: [
      "Include onboarding for new users",
      "Add a re-engagement mechanism (email, notification)",
      "Include gamification (streak, progress, points)",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L24B3",
    levelId: 24,
    type: "build",
    title: "Add Retention Features",
    xp: 50,
    required: true,
    order: 3,
    mission:
      "Add retention: onboarding flow, notifications/emails, and at least one gamification element.",
    githubChecks: {
      minFiles: 18,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for retention features: onboarding flow, notification/email triggers, gamification element. Should be integrated into the app flow.",
    passingScore: 55,
  },
  {
    id: "L24B4",
    levelId: 24,
    type: "pattern",
    title: "Feature Planning Pattern",
    xp: 15,
    required: true,
    order: 4,
    patternId: "feature-planning",
    exercise: {
      goal: "Practice planning a feature before building it",
      template: `Plan the ___ feature:

User story: As a ___, I want to ___ so that ___

Scope (MVP only):
- Must have: ___
- Nice to have: ___
- Out of scope: ___

Technical:
- New models: ___
- New routes: ___
- New components: ___
- Integrations: ___`,
      exampleFilled: `Plan the Streak System feature:

User story: As a user, I want to see my activity streak so that I'm motivated to use the app daily

Scope (MVP only):
- Must have: track consecutive active days, show streak count on dashboard
- Nice to have: streak badges at 7/30/100 days, streak freeze (skip 1 day)
- Out of scope: team streaks, streak competitions, streak-based rewards

Technical:
- New models: add streakDays (int) and lastActiveAt (datetime) to User
- New routes: POST /api/streak/update (called on any user action)
- New components: StreakBadge (shows 🔥 + count), StreakMilestone (modal at 7/30 days)
- Integrations: none (all internal)`,
    },
  },

  // ─── Level 25: First $100 Boss (3 blocks) ───
  {
    id: "L25B1",
    levelId: 25,
    type: "quiz",
    title: "Final Review",
    xp: 50,
    required: true,
    order: 1,
    questions: [
      {
        question: "What's the most critical security rule for payment webhooks?",
        options: [
          "Use HTTPS",
          "Always verify the webhook signature to prevent fake payment events",
          "Send a thank you email",
          "Log the webhook to a file",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the purpose of a landing page hero section?",
        options: [
          "Show the company logo",
          "List all features",
          "Communicate the core value proposition and drive one clear action",
          "Display the navigation menu",
        ],
        correctIndex: 2,
      },
      {
        question: "What's the 'aha moment' in onboarding?",
        options: [
          "When the user creates an account",
          "When the user first experiences the core value of your product",
          "When the user reads the FAQ",
          "When the user sees the pricing page",
        ],
        correctIndex: 1,
      },
      {
        question: "Why do streaks work as a retention mechanism?",
        options: [
          "They make the app load faster",
          "Loss aversion — people don't want to lose their accumulated streak",
          "They improve SEO rankings",
          "They reduce server costs",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the Feature Planning Pattern's most important section?",
        options: [
          "Technical implementation",
          "Scope — clearly defining what's MVP, nice-to-have, and out of scope",
          "The user story",
          "Integration list",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 3,
  },
  {
    id: "L25B2",
    levelId: 25,
    type: "prompt",
    title: "Final Product Audit Prompt",
    xp: 50,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a comprehensive prompt to audit your entire product",
    referencePrompt:
      "Do a complete audit of my app and list everything that needs fixing before I can start charging users: 1) User journey: can someone go from landing page → sign up → use the core feature → pay for upgrade? Test every step. 2) Payment: is checkout working? Do webhooks update the user plan? Is feature gating enforced server-side? 3) Error handling: what happens if the database is down? If payment fails? If the user enters invalid data? 4) Mobile: does every page work at 375px width? 5) SEO: does the landing page have proper meta tags and OG images? 6) Performance: does the app load in under 3 seconds? 7) Security: are all secrets in env vars? Are API routes auth-protected? Are webhooks signature-verified? List all issues found with severity (critical/high/medium/low).",
    hints: [
      "Cover the entire user journey",
      "Check payments end-to-end",
      "Verify error handling and security",
      "Test mobile and performance",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L25B3",
    levelId: 25,
    type: "build",
    title: "Graduate",
    xp: 400,
    required: true,
    order: 3,
    mission:
      "Your app is live, accepting payments, has a complete user experience. Deploy it, share it, start getting users. This is graduation.",
    githubChecks: {
      hasDeploy: true,
      minFiles: 25,
      minCommits: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Final boss — full product audit. Check: deployment, payments, complete user journey, polished UI, error handling, SEO, emails. Would this earn money?",
    passingScore: 65,
  },
];
