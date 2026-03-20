import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 6 — Ship & Polish (Levels 19-22)
// SEO, domain, analytics, email, polish
// ═══════════════════════════════════════

export const WORLD_6_BLOCKS: Block[] = [
  // ─── Level 19: Get Found (4 blocks) ───
  {
    id: "L19B1",
    levelId: 19,
    type: "theory",
    title: "SEO = Your Store's Sign",
    xp: 10,
    required: true,
    order: 1,
    content: `# SEO — How Google and Twitter Find You

SEO isn't magic. It's just telling Google and social media what your site is about.

## The Three Things That Matter

### 1. Meta Tags (What Google Shows)
\`\`\`html
<title>FocusFlow — Pomodoro Timer for Remote Teams</title>
<meta name="description" content="See who's in deep work. Protect your team's focus time." />
\`\`\`
This is what appears in Google search results. Make it specific and compelling.

### 2. OG Tags (What Social Media Shows)
When someone shares your link on Twitter or LinkedIn:
\`\`\`html
<meta property="og:title" content="FocusFlow" />
<meta property="og:description" content="Your team's focus time, protected." />
<meta property="og:image" content="https://focusflow.app/og-image.png" />
\`\`\`
Without OG tags, shared links look blank. With them, they look professional with an image preview.

### 3. Sitemap & Robots.txt
- \`sitemap.xml\` — lists all your pages so Google can find them
- \`robots.txt\` — tells Google which pages to index

## Next.js Makes This Easy

In Next.js, you export metadata from your layout:
\`\`\`typescript
export const metadata = {
  title: 'FocusFlow',
  description: 'Your team\\'s focus time, protected.',
  openGraph: { images: ['/og-image.png'] },
}
\`\`\`
AI can set all of this up in one prompt.`,
    miniQuiz: [
      {
        question: "What happens when someone shares your link without OG tags?",
        options: [
          "It shows a beautiful preview automatically",
          "It shows a blank, ugly link with no image or description",
          "The link doesn't work",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L19B2",
    levelId: 19,
    type: "theory",
    title: "Your Own Domain",
    xp: 10,
    required: true,
    order: 2,
    content: `# Your Own Domain

\`your-app.vercel.app\` works, but \`focusflow.app\` looks professional.

## How to Get a Domain

1. Go to **Namecheap** or **Cloudflare Registrar**
2. Search for your domain (e.g., focusflow.app)
3. Buy it — typically **$10-15/year**
4. That's it, you own it

## Connect to Vercel

1. In Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g., focusflow.app)
3. Vercel shows you DNS records to add
4. Go to your domain registrar → DNS settings
5. Add the records Vercel gave you
6. Wait 5-30 minutes for DNS to propagate
7. Your site is live at your custom domain with automatic HTTPS

## Do You Need a Domain for Launch?

No. \`your-app.vercel.app\` is fine for getting started. But if you're taking payments, a custom domain builds trust. Would you enter your credit card on \`random-words.vercel.app\`?

Budget: domain ($10-15/year) is your only required expense to look professional.`,
  },
  {
    id: "L19B3",
    levelId: 19,
    type: "prompt",
    title: "Add SEO",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Add SEO metadata, OG tags, sitemap, and robots.txt to your Next.js app.",
    referencePrompt: `Add SEO to my Next.js app (FocusFlow):

1. In app/layout.tsx, add metadata:
   - title: "FocusFlow — Pomodoro Timer for Remote Teams"
   - description: "See who's in deep work. Protect your team's focus time."
   - OG tags: title, description, image (/og-image.png), type: website

2. Create app/sitemap.ts that returns all public pages:
   - /, /pricing, /login, /blog (if exists)

3. Create app/robots.ts:
   - Allow all pages
   - Point to sitemap URL

4. Create a simple OG image (1200x630px) or use next/og to generate one dynamically.`,
    hints: [
      "Export metadata from layout.tsx — Next.js handles the rest",
      "Use the Metadata type from next for type safety",
      "OG image should be 1200x630px for best display on social media",
      "sitemap.ts and robots.ts are special Next.js files that auto-generate",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L19B4",
    levelId: 19,
    type: "build",
    title: "SEO & Domain",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add meta tags, OG tags, sitemap.xml, robots.txt. Optionally connect a custom domain. Your link should look good when shared on Twitter.",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: meta title and description, OG tags (og:title, og:description, og:image), sitemap generation, robots.txt. Shared link should preview properly. Domain setup is a bonus.",
    passingScore: 50,
  },

  // ─── Level 20: Know Your Users (4 blocks) ───
  {
    id: "L20B1",
    levelId: 20,
    type: "theory",
    title: "Analytics — What Are Users Doing?",
    xp: 10,
    required: true,
    order: 1,
    content: `# Analytics — See What Users Actually Do

Without analytics, you're guessing. With analytics, you know:
- How many people visit your site
- Where they come from
- Which features they use
- Where they drop off

## PostHog — Free and Privacy-Friendly

PostHog is the go-to for indie SaaS:
- **Free tier**: 1 million events/month
- **Self-hostable**: keep data on your servers if you want
- **Privacy-friendly**: no selling data to advertisers
- **Feature-rich**: events, funnels, session recording, A/B tests

## What to Track

Don't track everything. Start with these:

| Event | Why |
|---|---|
| Page view | Know which pages get traffic |
| Sign up | Your most important conversion |
| First action | Did they actually USE the product? |
| Upgrade to Pro | Money! |
| Feature usage | Which features matter most |

## Setup is One Script Tag

\`\`\`javascript
posthog.init('your-project-key', { api_host: 'https://app.posthog.com' })
\`\`\`

Then track custom events:
\`\`\`javascript
posthog.capture('task_created', { project_id: '123' })
posthog.capture('upgraded_to_pro', { plan: 'monthly' })
\`\`\``,
    miniQuiz: [
      {
        question: "What's the most important thing to track for a SaaS?",
        options: [
          "Every mouse movement and scroll position",
          "Key conversions: sign ups, first action, upgrades",
          "How long users stare at the pricing page",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L20B2",
    levelId: 20,
    type: "theory",
    title: "Email — Talk to Your Users",
    xp: 10,
    required: true,
    order: 2,
    content: `# Email — Every SaaS Needs It

Your app needs to send emails. Not marketing spam — useful emails:

## Transactional Emails

| Email | When | Why |
|---|---|---|
| Welcome | After sign up | Confirm they're in, show next steps |
| Receipt | After payment | Stripe can do this, or you can customize |
| Password reset | When requested | If you use email/password auth |
| Weekly digest | Every Monday | Remind them you exist + show value |

## Resend — The Modern Way

Resend is built for developers:
- **Free tier**: 100 emails/day, 3,000/month
- **Simple API**: one function call sends an email
- **React Email**: write email templates in React
- **Great deliverability**: emails actually arrive in inbox, not spam

## Basic Setup

\`\`\`javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'FocusFlow <hello@focusflow.app>',
  to: user.email,
  subject: 'Welcome to FocusFlow!',
  html: '<p>You\\'re in! Here\\'s how to get started...</p>'
});
\`\`\`

You need a custom domain for the "from" address. Until then, use Resend's onboarding domain for testing.`,
  },
  {
    id: "L20B3",
    levelId: 20,
    type: "prompt",
    title: "Add Analytics & Email",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Add PostHog analytics and Resend email to your app.",
    referencePrompt: `Add analytics and email to my Next.js app:

1. PostHog Analytics:
   - Install posthog-js
   - Create a PostHog provider component that initializes on mount
   - Track page views automatically
   - Add custom events: 'signed_up', 'task_created', 'upgraded_to_pro'
   - My PostHog key is in NEXT_PUBLIC_POSTHOG_KEY

2. Resend Email:
   - Install resend
   - Create API route POST /api/email/welcome
   - Send a welcome email when a user signs up
   - Template: "Welcome to FocusFlow! Here's how to get started: [3 steps]"
   - My RESEND_API_KEY is in .env.local`,
    hints: [
      "PostHog needs a client-side provider component",
      "Track page views with posthog.capture('$pageview')",
      "Resend sends from server-side only (API routes)",
      "Add RESEND_API_KEY and NEXT_PUBLIC_POSTHOG_KEY to .env.local",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L20B4",
    levelId: 20,
    type: "build",
    title: "Track & Email",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add PostHog analytics (pageviews + key events) and Resend email (at least one transactional email). Deploy and verify.",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: analytics integration (PostHog or similar) with at least page view tracking and one custom event. Email setup (Resend or similar) with at least one email template. API keys in env vars, not hardcoded.",
    passingScore: 50,
  },

  // ─── Level 21: Polish the Details (4 blocks) ───
  {
    id: "L21B1",
    levelId: 21,
    type: "theory",
    title: "The 5% That Makes 50% Difference",
    xp: 10,
    required: true,
    order: 1,
    content: `# Polish — The Details That Separate Amateur from Professional

Two apps can have the exact same features. One feels like a real product, the other feels like a student project. The difference is polish.

## The Big 5

### 1. Loading Skeletons
Instead of a blank screen while data loads, show gray placeholder shapes that match the layout. Users perceive the app as faster.

### 2. Hover & Focus Effects
Buttons change color on hover. Links underline. Interactive elements feel alive. Without these, your app feels dead.

### 3. Smooth Transitions
Pages don't just appear — they fade in. Modals slide up. Toast notifications slide in from the corner. CSS transitions make everything feel intentional.

### 4. Empty States
When there's no data, show a friendly illustration + CTA. "No tasks yet. Create your first one!" is 100x better than a blank page.

### 5. Error States
When something breaks, show a helpful message: "Something went wrong. Try refreshing the page." Not a white screen of death.

## The Mobile Test

Open your app on your phone (or Chrome DevTools → 375px width):
- Can you read all text?
- Can you tap all buttons easily?
- Does any content overflow off screen?
- Do images look right?

If anything breaks on mobile, fix it. Over 50% of web traffic is mobile.`,
  },
  {
    id: "L21B2",
    levelId: 21,
    type: "pattern",
    title: "The Error Fix Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "error-fix",
    exercise: {
      goal: "Practice describing an error to AI with enough context to get a real fix",
      template: `I'm getting this error:

\`\`\`
[error message]
\`\`\`

Context:
- File: ___
- What I was doing: ___
- Expected: ___
- Already tried: ___`,
      exampleFilled: `I'm getting this error:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'map')
at TaskList (src/components/TaskList.tsx:15)
\`\`\`

Context:
- File: src/components/TaskList.tsx, line 15
- What I was doing: loading dashboard after signing in
- Expected: list of tasks to appear
- Already tried: checked Supabase — data is there. API returns data in browser.

The tasks variable is probably undefined on first render before data loads.`,
    },
  },
  {
    id: "L21B3",
    levelId: 21,
    type: "experiment",
    title: "Test Like a User",
    xp: 15,
    required: true,
    order: 3,
    description: "Test your app the way real users will experience it.",
    steps: [
      {
        id: "L21B3S1",
        instruction:
          "Open Chrome DevTools (F12) → toggle device toolbar (phone icon). Set to **iPhone SE (375px)**. Browse your entire app. Note everything that looks broken: overflowing text, tiny buttons, hidden content.",
        expectedOutcome: "A list of mobile issues to fix.",
        question: "How many issues did you find on mobile?",
      },
      {
        id: "L21B3S2",
        instruction:
          "In DevTools → Network tab → change throttling to **Slow 3G**. Reload your app. Watch how it loads. Do you see loading states? Or does it show blank screens and then suddenly pop in?",
        expectedOutcome: "Loading skeletons or spinners appear on slow connections.",
        question: "Does your app show loading states on slow connections?",
      },
      {
        id: "L21B3S3",
        instruction:
          "Open an **incognito window**. Go to your app as a brand new user. Sign up with a new email. Go through the entire flow: sign up → first action → create data → try a pro feature.\n\nIs anything confusing? Would a non-technical person know what to do?",
        expectedOutcome: "The first-time experience is clear and guided.",
        question: "Would your mom know what to do on first visit?",
      },
    ],
  },
  {
    id: "L21B4",
    levelId: 21,
    type: "debug",
    title: "Fix Polish Issues",
    xp: 20,
    required: true,
    order: 4,
    scenarios: [
      {
        id: "L21B4S1",
        title: "Broken on mobile",
        description:
          "The dashboard sidebar is always visible, pushing the main content to a tiny column on mobile. The nav links overlap.",
        brokenCode: `.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
}
.sidebar {
  position: fixed;
  width: 240px;
  height: 100vh;
}`,
        language: "css",
        hint: "On mobile, the sidebar should be hidden by default and toggled with a hamburger menu. Use a media query or responsive Tailwind classes.",
        expectedFix:
          "Sidebar hidden on mobile (max-width: 768px) with a hamburger toggle. Main content takes full width on mobile.",
      },
      {
        id: "L21B4S2",
        title: "Flash of unstyled content",
        description:
          "When loading the dashboard, the user sees raw data flash for a split second before styles and layout kick in. Looks janky.",
        brokenCode: `export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { loadTasks(); }, []);

  return (
    <div>
      {tasks.map(t => <TaskCard key={t.id} task={t} />)}
    </div>
  );
}`,
        language: "tsx",
        hint: "Add a loading state that shows skeleton cards while data is being fetched. The initial state should show the loading UI, not an empty list.",
        expectedFix:
          "Should start with isLoading=true, show skeleton cards during fetch, then switch to real cards when data arrives.",
      },
    ],
    passingCount: 2,
  },

  // ─── Level 22: Launch Boss (3 blocks) ───
  {
    id: "L22B1",
    levelId: 22,
    type: "audit",
    title: "Launch Readiness",
    xp: 25,
    required: true,
    order: 1,
    description: "The 10-point launch checklist. Pass this and you're ready for real users.",
    checklist: [
      {
        id: "mobile-responsive",
        category: "ux",
        title: "Mobile Responsive",
        description: "Every page works on 375px width. No overflowing content, no tiny tap targets.",
        severity: "critical",
        howToCheck: "Open DevTools, set to 375px. Browse every page. Check buttons are tappable.",
      },
      {
        id: "loading-states",
        category: "ux",
        title: "Loading States",
        description: "Every page that fetches data shows a loading skeleton or spinner.",
        severity: "critical",
        howToCheck: "Throttle to Slow 3G. Reload each page. Is there always a loading indicator?",
      },
      {
        id: "error-handling",
        category: "ux",
        title: "Error Handling",
        description: "When things break, users see a helpful message — not a white screen or cryptic error.",
        severity: "critical",
        howToCheck: "Temporarily break your Supabase URL. Does each page show a user-friendly error?",
      },
      {
        id: "seo-tags",
        category: "seo",
        title: "SEO & OG Tags",
        description: "Every page has a title and description. Landing page has OG tags for social sharing.",
        severity: "warning",
        howToCheck: "View page source. Check for <title>, <meta description>, og:title, og:image.",
      },
      {
        id: "analytics",
        category: "ux",
        title: "Analytics Tracking",
        description: "PostHog (or similar) tracks page views and key events.",
        severity: "warning",
        howToCheck: "Check PostHog dashboard. Do events appear when you browse your site?",
      },
      {
        id: "404-page",
        category: "ux",
        title: "404 Page",
        description: "Visiting a non-existent URL shows a helpful 404 page, not a broken page.",
        severity: "warning",
        howToCheck: "Go to your-app.com/this-page-does-not-exist. What do you see?",
      },
      {
        id: "favicon",
        category: "ux",
        title: "Favicon",
        description: "Your app has a favicon (the small icon in the browser tab).",
        severity: "suggestion",
        howToCheck: "Look at your browser tab. Is there an icon or is it the default globe?",
      },
      {
        id: "no-placeholder-content",
        category: "ux",
        title: "No Placeholder Content",
        description: "No 'Lorem ipsum', no 'TODO', no placeholder images anywhere visible to users.",
        severity: "critical",
        howToCheck: "Browse every page and look for any placeholder or dummy content.",
      },
      {
        id: "build-succeeds",
        category: "code-quality",
        title: "Build Succeeds",
        description: "npm run build completes without errors.",
        severity: "critical",
        howToCheck: "Run npm run build in your terminal. Does it complete without errors?",
      },
      {
        id: "images-load",
        category: "ux",
        title: "All Images Load",
        description: "No broken image icons anywhere on the site.",
        severity: "warning",
        howToCheck: "Browse every page. Check DevTools Network tab for failed image requests (red entries).",
      },
    ],
    minPassed: 7,
  },
  {
    id: "L22B2",
    levelId: 22,
    type: "prompt",
    title: "Launch Audit Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Ask AI to perform a comprehensive launch audit of your project.",
    referencePrompt: `Do a comprehensive launch audit of my app. Check every page and report:

1. Mobile: Does everything work on 375px? Any overflow, tiny buttons, or broken layouts?
2. Loading: Does every data-fetching page have a loading state?
3. Errors: What happens when API calls fail? Do users see helpful messages?
4. SEO: Does the landing page have meta title, description, OG tags?
5. Empty states: What does a new user with no data see?
6. 404: What happens at a non-existent URL?
7. Build: Does npm run build pass?
8. Placeholder content: Any Lorem ipsum, TODO, or test data visible?
9. Links: Do all navigation links and buttons work?
10. Images: Do all images load?

For each issue found, tell me: what's wrong, where it is, and how to fix it.`,
    passingThreshold: 3.0,
  },
  {
    id: "L22B3",
    levelId: 22,
    type: "build",
    title: "Ready to Launch",
    xp: 250,
    required: true,
    order: 3,
    mission:
      "Boss level: pass the 10-point launch readiness audit. Polished, deployed, SEO-ready, analytics tracking, email working. Your app is ready for real users.",
    githubChecks: {
      minCommits: 5,
      minFiles: 10,
      hasDeploy: true,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Comprehensive check: SEO (meta/OG tags), analytics, email, loading/error/empty states, mobile responsive, no broken links, favicon, polished design, no placeholder content. App should feel launch-ready for real users.",
    passingScore: 60,
  },
];
