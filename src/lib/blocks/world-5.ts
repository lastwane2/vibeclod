import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// WORLD 5 — Launch (L18-L22)
// Landing → SEO → polish → audit → ship
// ═══════════════════════════════════════

export const WORLD_5_BLOCKS: Block[] = [
  // ─── Level 18: Landing Page ───────────
  {
    id: "L18B1",
    levelId: 18,
    type: "theory",
    title: "A Page That Sells",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Your Homepage Should SELL, Not Just Exist

Right now your homepage is probably a dashboard or whatever AI generated in Level 2. That's fine for users — but strangers need a **landing page** that explains what this is and why they should care.

## The 8-Section Formula

1. **Hero** — Headline (benefit, not feature) + ONE CTA button
2. **Problem** — The pain your users feel
3. **Solution** — How you fix it (simple, clear)
4. **Features** — 3-5 benefits (not "PostgreSQL with RLS" — "Your data is secure")
5. **Social Proof** — Testimonials, logos, or "Trusted by early adopters"
6. **Pricing** — Free and Pro with clear differences
7. **FAQ** — 4-5 common questions
8. **Final CTA** — Same button as the hero

## The Design Reference Rule

Find 2-3 landing pages you love (Linear, Vercel, Notion, any SaaS). Tell AI: "make it look like THESE." Without a reference, you get generic garbage.

**ONE CTA button in the hero. Not 4. One.**`,
  },
  {
    id: "L18B2",
    levelId: 18,
    type: "prompt",
    title: "Build Landing Page",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    scaffold: "full",
    goal: "Tell AI to rebuild your homepage as a conversion-focused landing page.",
    referencePrompt: `Rebuild the homepage as a landing page.

Design references: [2-3 URLs]. I like [what specifically: style, animations, layout, colors].

Structure (8 sections):
1. HERO: headline (benefit, not feature) + subheadline + ONE CTA button
2. PROBLEM: the pain users feel
3. SOLUTION: how we solve it
4. FEATURES: 3-5 benefits (not technical specs — "Your data is secure," not "PostgreSQL with RLS")
5. SOCIAL PROOF: testimonials or "Trusted by early adopters"
6. PRICING: Free and Pro plans
7. FAQ: 4-5 questions
8. FINAL CTA: same button as hero

ONE CTA button in the hero. Not 4. One.`,
    hints: [
      "2-3 reference URLs make a massive difference",
      "Benefits, not features — 'Save 2 hours/week' not 'Automated scheduling'",
      "ONE button in hero — decision paralysis kills conversion",
    ],
    passingThreshold: 3,
  },
  {
    id: "L18B3",
    levelId: 18,
    type: "experiment",
    title: "Landing Page Check",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description: "Verify the landing page communicates clearly.",
    steps: [
      {
        id: "5sec",
        instruction:
          "Show your landing page to someone for 5 seconds, then close it. Ask: 'What does this app do?' If they can't answer — your headline is unclear.",
        expectedOutcome:
          "Someone can explain your app after seeing it for 5 seconds.",
      },
      {
        id: "cta",
        instruction:
          "Count the buttons in the hero section. Is it ONE clear CTA? Not 2, not 4 — one.",
        expectedOutcome: "Exactly one CTA button in the hero.",
      },
      {
        id: "mobile",
        instruction:
          "Open on your phone. All sections readable? Nothing cut off? CTA button reachable without scrolling past the fold?",
        expectedOutcome: "Landing page fully functional on mobile.",
      },
    ],
  },
  {
    id: "L18B4",
    levelId: 18,
    type: "build",
    title: "Landing Shipped",
    xp: 20,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Push your landing page. Hero, problem, solution, features, pricing, FAQ, CTA — all present. Mobile responsive. At least 3 commits.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check the landing page for: hero with headline and CTA, problem/solution sections, features (benefits not specs), pricing, FAQ. Clear conversion flow. Mobile responsive. Should look intentional, not like a template.",
    passingScore: 60,
  },

  // ─── Level 19: People Find You ────────
  {
    id: "L19B1",
    levelId: 19,
    type: "theory",
    title: "SEO & Social Previews",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# What Happens When You Share Your Link

Send your link in Telegram right now. What do people see? Probably just the raw URL. No title, no description, no image.

**OG tags** fix this — they tell social platforms what to show:
- \`og:title\` — the title in the preview
- \`og:description\` — the description
- \`og:image\` — the preview image (1200x630px)

**Meta tags** help Google find you:
- \`title\` and \`description\` — what appears in search results
- \`sitemap.xml\` — tells Google which pages exist

**Analytics** tell you what's happening:
- PostHog (free up to 1M events/month) tracks page views, signups, conversions

AI sets all of this up perfectly. You just need a PostHog account and an OG image (screenshot of your app works fine).`,
  },
  {
    id: "L19B2",
    levelId: 19,
    type: "prompt",
    title: "Add SEO + Analytics",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to add meta tags, OG tags, sitemap, and analytics.",
    referencePrompt: `Add SEO and analytics:
1. Meta tags — title and description for Google
2. OG tags — og:title, og:description, og:image for social previews (image 1200x630)
3. sitemap.xml and robots.txt
4. PostHog analytics — track page views, signups, and payments`,
    hints: [
      "AI handles all the meta tag code — you just need the content",
      "For the OG image: a screenshot of your app works great",
      "PostHog: sign up, get the key, that's it",
    ],
    passingThreshold: 3,
  },
  {
    id: "L19B3",
    levelId: 19,
    type: "experiment",
    title: "Test Previews",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    description: "Verify social previews and SEO are working.",
    steps: [
      {
        id: "social",
        instruction:
          "Share your production URL in a Telegram/Discord/Twitter message (to yourself). Does a preview show up with a title, description, and image?",
        expectedOutcome:
          "Social preview shows title, description, and image.",
      },
      {
        id: "sitemap",
        instruction:
          "Open yourapp.vercel.app/sitemap.xml in the browser. Does it show your pages?",
        expectedOutcome: "Sitemap XML with page URLs listed.",
      },
      {
        id: "analytics",
        instruction:
          "Open your PostHog dashboard. Visit a few pages on your site. Do events appear in PostHog?",
        expectedOutcome: "Page view events visible in PostHog.",
      },
    ],
  },
  {
    id: "L19B4",
    levelId: 19,
    type: "build",
    title: "Discoverable",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Push: meta tags, OG tags, sitemap.xml, analytics integration. At least 2 commits.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Check for: meta tags (title, description), OG tags (og:title, og:description, og:image), sitemap.xml generation, analytics code (PostHog or similar). At least some SEO basics present.",
    passingScore: 60,
  },

  // ─── Level 20: Polish ─────────────────
  {
    id: "L20B1",
    levelId: 20,
    type: "theory",
    title: "Details That Matter",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 1,
    content: `# Student Project vs Real Product

The difference between "amateur" and "professional" is small details:

- **Skeleton loading** instead of spinners — gray pulsing blocks where content will appear
- **Smooth transitions** — content fades in, buttons have hover effects, inputs have focus rings
- **Custom 404 page** — not the default white page with "Not Found"
- **Favicon** — the tiny icon in the browser tab (use your app's logo or generate one)

None of these take more than 5 minutes with AI. But together they make your app FEEL like a real product.

If you want a specific polish style — attach a reference. "Make transitions like [site]" works great.`,
  },
  {
    id: "L20B2",
    levelId: 20,
    type: "prompt",
    title: "Add Polish",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to add the finishing touches that make your app feel professional.",
    referencePrompt: `Polish the app:
1. Replace all loading spinners with skeleton placeholders (gray blocks with pulse animation)
2. Add smooth transitions: fade-in for content, hover effects on buttons, focus rings on inputs
3. Create a custom 404 page (not the default white one)
4. Add a favicon`,
    hints: [
      "Skeletons > spinners — AI often defaults to spinners",
      "If you want specific animation style, attach a reference site",
      "Favicon: generate one with AI or use a simple icon",
    ],
    passingThreshold: 3,
  },
  {
    id: "L20B3",
    levelId: 20,
    type: "experiment",
    title: "Final Mobile Test",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description:
      "Open every page on your phone one final time.",
    steps: [
      {
        id: "pages",
        instruction:
          "On your phone, visit EVERY page: Landing → Login → Signup → Dashboard → Pricing → Settings (if exists). Anything broken? Anything ugly?",
        expectedOutcome: "All pages look good and function on mobile.",
      },
      {
        id: "transitions",
        instruction:
          "Navigate between pages. Is there a smooth transition? Do buttons have hover/tap feedback?",
        expectedOutcome: "Smooth transitions and interactive feedback.",
      },
      {
        id: "404",
        instruction:
          "Visit yourapp.vercel.app/this-page-doesnt-exist. Do you see a custom 404 page or the ugly default?",
        expectedOutcome: "Custom 404 page with a link back to home.",
      },
    ],
  },
  {
    id: "L20B4",
    levelId: 20,
    type: "build",
    title: "Polished",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Push your polish: skeletons, transitions, custom 404, favicon. At least 2 commits.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Look for: skeleton/loading components, CSS transitions or animations, custom 404/error page, favicon. The app should feel smooth and intentional.",
    passingScore: 60,
  },

  // ─── Level 21: Final Audit ────────────
  {
    id: "L21B1",
    levelId: 21,
    type: "audit",
    title: "10-Point Launch Checklist",
    xp: 25,
    required: true,
    order: 1,
    estimatedMinutes: 10,
    description: "The pre-launch audit. Every item must pass.",
    checklist: [
      {
        id: "mobile",
        category: "ux",
        title: "Mobile works",
        description: "Every page looks good and functions on a phone (375px).",
        severity: "critical",
        howToCheck:
          "Open every page on your phone. Nothing broken, nothing off-screen.",
      },
      {
        id: "buttons",
        category: "ux",
        title: "All buttons work",
        description:
          "Every button and link does something. No dead clicks, no 404s.",
        severity: "critical",
        howToCheck:
          "Click every button and link in the app. Every single one.",
      },
      {
        id: "loading",
        category: "ux",
        title: "Loading states",
        description:
          "Skeleton or loading indicator shows while data loads.",
        severity: "warning",
        howToCheck:
          "DevTools → Network → Slow 3G → reload. Do you see loading states?",
      },
      {
        id: "errors",
        category: "ux",
        title: "Error handling",
        description:
          "When something breaks, users see a friendly message — not raw errors.",
        severity: "warning",
        howToCheck:
          "Temporarily break .env.local → reload → see a user-friendly error? Fix .env back.",
      },
      {
        id: "secrets",
        category: "security",
        title: "No secrets in code",
        description: "No API keys, tokens, or passwords in the codebase.",
        severity: "critical",
        howToCheck:
          "Search entire project for: sk_, eyJ, password, secret. Only .env.local should have real values.",
      },
      {
        id: "api-auth",
        category: "security",
        title: "Auth on API routes",
        description:
          "Every API route checks authentication. No session → 401.",
        severity: "critical",
        howToCheck:
          "Open each file in app/api/. Session check at the top of each handler.",
      },
      {
        id: "data-isolation",
        category: "security",
        title: "Data isolation",
        description:
          "Two different users see only their own data. RLS enabled.",
        severity: "critical",
        howToCheck:
          "Test with 2 accounts in 2 browsers. No data crossover.",
      },
      {
        id: "webhooks",
        category: "code-quality",
        title: "Webhooks configured",
        description:
          "Stripe webhook URL points to production, not localhost.",
        severity: "critical",
        howToCheck:
          "Stripe Dashboard → Webhooks. URL starts with https://your-app.vercel.app.",
      },
      {
        id: "seo",
        category: "seo",
        title: "SEO basics",
        description:
          "Sharing the link in Telegram shows a proper preview (title + image).",
        severity: "warning",
        howToCheck:
          "Share your production URL in a messenger. Preview shows up?",
      },
      {
        id: "build",
        category: "code-quality",
        title: "Clean build",
        description: "npm run build completes with zero errors.",
        severity: "critical",
        howToCheck: "Run 'npm run build' locally. No red errors.",
      },
    ],
    minPassed: 8,
  },
  {
    id: "L21B2",
    levelId: 21,
    type: "prompt",
    title: "Generate Legal Pages",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Generate Terms of Service and Privacy Policy — required for Stripe.",
    referencePrompt: `Write Terms of Service and Privacy Policy for my app [name].
It's a SaaS that [what it does]. Stores [what data]. Payments through Stripe.
Short, clear text. No legal jargon.
Create pages at /terms and /privacy. Add links to both in the footer.`,
    hints: [
      "Stripe requires ToS + Privacy Policy for real payments",
      "Keep it simple — you can have a lawyer review later",
      "Add links in the footer of every page",
    ],
    passingThreshold: 3,
  },
  {
    id: "L21B3",
    levelId: 21,
    type: "build",
    title: "Audit Passed",
    xp: 20,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    mission:
      "All audit items fixed. Terms and Privacy pages created. npm run build passes. At least 3 commits.",
    githubChecks: {
      minCommits: 3,
      fileExists: [".gitignore", ".env.example"],
    },
    aiReviewPrompt:
      "Launch audit: mobile, interactions, loading states, error handling, no secrets, auth, data isolation, webhooks, SEO, clean build. Check for /terms and /privacy pages. At least 8/10 checklist items should pass.",
    passingScore: 70,
  },

  // ─── Level 22: LAUNCH ─────────────────
  {
    id: "L22B1",
    levelId: 22,
    type: "theory",
    title: "What It Costs",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Running a SaaS: The Real Numbers

| Service | Free Tier | When You Pay |
|---------|-----------|-------------|
| Vercel | 100GB bandwidth | $20/mo after |
| Supabase | 500MB database | $25/mo for Pro |
| Stripe | No subscription fee | 2.9% + $0.30 per transaction |
| Domain | — | $10-15/year |
| PostHog | 1M events/month | $0 for indie |
| Resend (email) | 100 emails/day | $20/mo for more |
| **Total** | **$0-15/month** | **Until you grow** |

You can launch and run for months on free tiers. Don't pay for infrastructure until you have paying users.`,
  },
  {
    id: "L22B2",
    levelId: 22,
    type: "theory",
    title: "Finding Your First Users",
    xp: 5,
    required: true,
    order: 2,
    estimatedMinutes: 2,
    content: `# Your First 100 Users Come From Conversations

Not ads. Not SEO. Not viral growth. **Conversations.**

## Where to Start

- **Product Hunt** — launch on Tuesday or Wednesday. Need good screenshots and a tagline.
- **Twitter/X** — post about your building process. #buildinpublic. People love watching creation.
- **Reddit** — find your subreddit. Don't spam. Help people, mention your tool when relevant.
- **Indie Hackers** — share your progress. "From idea to first paying customer."
- **DMs** — seriously. Message people who might use it. Ask for feedback. Be genuine.

## What Comes Next

- Collect feedback from users
- Add features in small iterations (the same workflow you've been practicing)
- For your NEXT project: try a SaaS boilerplate (ShipFast, MakerKit) to skip auth/payments setup
- When you're earning: have a lawyer review your ToS/Privacy`,
  },
  {
    id: "L22B3",
    levelId: 22,
    type: "experiment",
    title: "Final Deploy & Share",
    xp: 20,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description: "Ship your final version and share it with the world.",
    steps: [
      {
        id: "deploy",
        instruction:
          "Final commit: git add . && git commit -m 'ready for launch' && git push. Check Vercel: deployment green? Site works?",
        expectedOutcome:
          "Final version deployed. Green checkmark on Vercel.",
      },
      {
        id: "end-to-end",
        instruction:
          "Test the complete user journey on production: visit landing page → sign up → use the app → upgrade to pro (test card) → pro features work → share link → preview looks good.",
        expectedOutcome: "Complete user journey works end-to-end.",
      },
      {
        id: "share",
        instruction:
          "Share your production URL with at least one person. Ask them to try it. Note any feedback.",
        expectedOutcome:
          "Real person has used your app. You have their feedback.",
      },
    ],
  },
  {
    id: "L22B4",
    levelId: 22,
    type: "build",
    title: "LAUNCHED",
    xp: 60,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Your SaaS is live. Auth, database, payments, landing page, SEO, polished. You built this from ZERO with AI. At least 10 commits, 15+ files.",
    githubChecks: {
      minCommits: 10,
      minFiles: 15,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Final comprehensive review. This should look and function like a real product. Auth works, payments work, data persists, mobile responsive, professional design, SEO, landing page sells. Not a demo — a product that can make money.",
    passingScore: 80,
  },
];
