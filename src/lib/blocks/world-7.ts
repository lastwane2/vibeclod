import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 7 — Ship It (Levels 31-35)
// Deploy, errors, SEO, analytics, polish
// Scaffold: "none" for prompt blocks
// ═══════════════════════════════════════

export const WORLD_7_BLOCKS: Block[] = [
  // ─── Level 31: Going Live (4 blocks) ───
  {
    id: "L31B1",
    levelId: 31,
    type: "theory",
    title: "Deployment = Your App on the Internet",
    xp: 10,
    required: true,
    order: 1,
    content: `# Deployment = Your App on the Internet

Right now your app lives on your laptop. Deployment puts it on the internet so **ANYONE** with the URL can use it.

It's like the difference between a manuscript on your desk and a printed book in stores.

## Platforms

- **Vercel** — best for Next.js, free tier, made by the Next.js team
- **Railway** — good for full-stack + database
- **Netlify** — great for static sites

## The process

1. Connect your GitHub repo to the platform
2. Platform builds your app
3. You get a URL

That's it. Push code → it's live.`,
  },
  {
    id: "L31B2",
    levelId: 31,
    type: "theory",
    title: "Secrets Stay Secret",
    xp: 10,
    required: true,
    order: 2,
    content: `# Secrets Stay Secret

Your app has secrets: database password, API keys, auth tokens. These should **NEVER** be in your code.

If they're in code → anyone on GitHub can see them → your database gets hacked. It happens every day.

## The solution: Environment Variables

Store secrets in the deployment platform's settings panel — not in your code.

Think of it like a **safe**. Your code is a public blueprint anyone can read. Environment variables are a locked safe with the keys inside.

## In your prompts

Tell AI: "Read all secrets from environment variables. Create a .env.example listing what's needed with placeholder values."`,
    miniQuiz: [
      {
        question: "Where should database passwords be stored?",
        options: [
          "In environment variables on the deployment platform, never in code",
          "In a passwords.txt file in the project",
          "Hardcoded in the database config file",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "L31B3",
    levelId: 31,
    type: "prompt",
    title: "Write a Deployment Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Prepare your app for deployment — config, env vars, build verification",
    referencePrompt:
      "Prepare my Next.js app for deployment on Vercel. 1) Ensure all secrets are read from environment variables. 2) Create .env.example listing all required variables with placeholder values. 3) Verify the build passes with npm run build. 4) Add proper production database URL configuration. 5) Fix any TypeScript or build errors.",
    hints: [
      "Name the platform",
      "Mention environment variables",
      "Include build verification",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L31B4",
    levelId: 31,
    type: "build",
    title: "Deploy Your App",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Deploy your app to Vercel or Railway. Must have deployment config and .env.example.",
    githubChecks: { hasDeploy: true, commitAfter: "level_start" },
    aiReviewPrompt:
      "Check for deployment config (vercel.json, railway.toml, or Dockerfile), .env.example file, no hardcoded secrets.",
    passingScore: 50,
  },

  // ─── Level 32: When Things Break (4 blocks) ───
  {
    id: "L32B1",
    levelId: 32,
    type: "theory",
    title: "Errors Are Normal",
    xp: 10,
    required: true,
    order: 1,
    content: `# Errors Are Normal

Every app breaks. The question isn't IF, but **HOW**.

**Bad:** user sees a white screen with "Cannot read property of undefined".

**Good:** user sees "Something went wrong. Click here to try again."

The difference is **error handling**. Think of it like airbags in a car — the crash still happens, but the passenger is protected.

## Next.js safety nets

- **error.tsx** — airbag for crashes (shows friendly message + retry button)
- **loading.tsx** — shows while waiting for data (skeleton, spinner)
- **not-found.tsx** — friendly 404 page instead of a blank screen

Create these files → your users never see ugly errors again.`,
  },
  {
    id: "L32B2",
    levelId: 32,
    type: "pattern",
    title: "Error Fix Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "error-fix",
    exercise: {
      goal: "Use the Error Fix Pattern to describe a bug clearly so AI can solve it",
      template: `I'm getting this error:
\`\`\`
___
\`\`\`
Context:
- File: ___
- What I was doing: ___
- What I expected: ___
- What I tried: ___`,
      exampleFilled: `I'm getting this error:
\`\`\`
Error: "metadata" is not allowed to be exported from a client component. It can only be exported from a Server Component.
\`\`\`
Context:
- File: src/app/dashboard/page.tsx
- What I was doing: Adding page title and description using the metadata export
- What I expected: The page should show "Dashboard" as the browser tab title
- What I tried: I exported a metadata object but the file has "use client" at the top because it has interactive charts`,
    },
  },
  {
    id: "L32B3",
    levelId: 32,
    type: "debug",
    title: "Fix Real Errors",
    xp: 25,
    required: true,
    order: 3,
    scenarios: [
      {
        id: "L32B3D1",
        title: "Unhandled API error",
        description:
          "This API route has no error handling. When the database fails, the server crashes and the client gets a cryptic 500 error.",
        brokenCode: `import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}`,
        language: "typescript",
        hint: "What happens if prisma.task.findMany() throws an error? There's no safety net.",
        expectedFix:
          "Wrap the database call in a try/catch block. In the catch, return a NextResponse.json with a user-friendly error message and a 500 status code.",
      },
      {
        id: "L32B3D2",
        title: "Null reference crash",
        description:
          "This component renders user data, but the user object might be null (still loading, or not logged in). The app crashes with 'Cannot read properties of null'.",
        brokenCode: `export default function ProfileCard({ user }) {
  return (
    <div className="p-4 border rounded">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Joined: {user.createdAt.toLocaleDateString()}</p>
    </div>
  );
}`,
        language: "tsx",
        hint: "What if user is null or undefined? The component tries to read .name on nothing.",
        expectedFix:
          "Add a null check — if (!user) return a loading skeleton or a 'Not logged in' message. Only render user data when user is confirmed to exist.",
      },
      {
        id: "L32B3D3",
        title: "Missing error boundary",
        description:
          "The app shows a blank white screen when any component throws an error. There's no error.tsx file to catch the crash.",
        brokenCode: `// src/app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchDashboardData();
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsGrid data={data} />
      <RecentActivity items={data.activity} />
    </div>
  );
}

// No error.tsx exists anywhere in the app
// If fetchDashboardData() fails → white screen of death`,
        language: "tsx",
        hint: "Next.js needs an error.tsx file to catch errors and show a fallback UI. Without it, errors produce a blank white screen.",
        expectedFix:
          "Create an error.tsx file (with 'use client' directive) that shows a user-friendly error message and a 'Try again' button that calls reset().",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L32B4",
    levelId: 32,
    type: "build",
    title: "Add Error Handling",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add error.tsx, loading.tsx, not-found.tsx, try/catch in API routes. No more white screens.",
    githubChecks: { minFiles: 12, commitAfter: "level_start" },
    aiReviewPrompt:
      "Check for: error.tsx, loading.tsx, not-found.tsx, try/catch in API routes, user-friendly error messages.",
    passingScore: 55,
  },

  // ─── Level 33: Get Found & Shared (4 blocks) ───
  {
    id: "L33B1",
    levelId: 33,
    type: "theory",
    title: "SEO = Your Store's Sign",
    xp: 10,
    required: true,
    order: 1,
    content: `# SEO = Your Store's Sign

Imagine opening a store but forgetting to put a sign outside. That's a website without SEO.

SEO tells Google three things:
1. **What your site is about** — title and description
2. **What pages exist** — sitemap
3. **What to show when shared on social media** — OG tags (the preview card on Twitter/LinkedIn)

## The basics

- **Title tag** — the text in the browser tab
- **Meta description** — the preview text in Google search results
- **OG image** — the picture shown when someone shares your link

Most apps skip this. Don't skip it — it takes 5 minutes with AI.`,
  },
  {
    id: "L33B2",
    levelId: 33,
    type: "theory",
    title: "Analytics = Did Anyone Come?",
    xp: 10,
    required: true,
    order: 2,
    content: `# Analytics = Did Anyone Come?

You built it. You deployed it. But... is anyone using it?

Analytics answer that question.

## What to track

- **Page views** — which pages are popular?
- **Events** — what buttons do users click?
- **Funnels** — where do users drop off?

## Tools

- **PostHog** — free, open source, full-featured
- **Plausible** — privacy-focused, simple
- **Vercel Analytics** — built-in if you're on Vercel

## Start simple

Track page views + 3 key events: sign up, create item, complete task. That's it.

You can't improve what you don't measure.`,
    miniQuiz: [
      {
        question: "Why add analytics to your app?",
        options: [
          "To know if anyone is using it and how they use it",
          "To make the app load faster",
          "Because Google requires it for SEO",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "L33B3",
    levelId: 33,
    type: "prompt",
    title: "Write SEO & Analytics Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Add SEO optimization and analytics tracking to your app",
    referencePrompt:
      "Add SEO and analytics to my Next.js app: 1) Metadata exports in layout.tsx with site title, description, and OG tags. 2) Unique metadata per page. 3) sitemap.ts that generates sitemap.xml. 4) robots.txt in public folder. 5) PostHog analytics: track page views and 3 custom events (user_signed_up, item_created, task_completed). 6) Analytics key from environment variable.",
    hints: [
      "Cover meta tags, OG tags, sitemap, robots.txt",
      "Name the analytics tool",
      "List specific events to track",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L33B4",
    levelId: 33,
    type: "build",
    title: "Add SEO & Analytics",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add SEO (meta tags, OG tags, sitemap, robots.txt) and basic analytics tracking.",
    githubChecks: {
      fileExists: ["public/robots.txt"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: metadata exports, OG tags, sitemap, robots.txt, analytics setup, unique page titles.",
    passingScore: 55,
  },

  // ─── Level 34: Polish (4 blocks) ───
  {
    id: "L34B1",
    levelId: 34,
    type: "theory",
    title: "The 5% That Makes 50% Difference",
    xp: 10,
    required: true,
    order: 1,
    content: `# The 5% That Makes 50% Difference

The difference between "my project" and "a product" is **polish**.

5 things that take 5% effort but feel like 50% improvement:

1. **Loading skeletons** — gray boxes instead of blank screen while loading
2. **Hover effects** — buttons change color on mouse-over
3. **Smooth transitions** — things don't just appear, they fade/slide in
4. **Empty states** — "No tasks yet — create your first one!" instead of blank white
5. **Mobile testing** — does it work when you resize to phone size?

Each one is a single sentence in your prompt. "Add loading skeletons." "Add hover effects to buttons." "Add empty states for lists."

5 extra sentences → your app feels professional.`,
  },
  {
    id: "L34B2",
    levelId: 34,
    type: "pattern",
    title: "Debug Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "debug-pattern",
    exercise: {
      goal: "Use the Debug Pattern to describe unexpected behavior clearly",
      template: `Something isn't working:
Expected: ___
Actual: ___
Relevant code: ___
Environment: ___
Console output: ___`,
      exampleFilled: `Something isn't working:
Expected: PostHog events show in the dashboard when users click buttons
Actual: Page views show up fine, but custom events (item_created, task_completed) never appear
Relevant code: Button has onClick handler but no posthog.capture() call inside it — only the page view tracking was set up automatically
Environment: Chrome, Next.js 14, PostHog cloud
Console output: No errors, no warnings — it just silently doesn't track`,
    },
  },
  {
    id: "L34B3",
    levelId: 34,
    type: "review",
    title: "Launch Readiness Audit",
    xp: 20,
    required: true,
    order: 3,
    code: `export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="border p-3 rounded">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2">
              Complete
            </button>
          </div>
        ))}
      </div>
      <button className="bg-green-500 text-white px-6 py-3 mt-6">
        Add Task
      </button>
      <a href="http://localhost:3000/api/export">Export</a>
    </div>
  );
}`,
    language: "tsx",
    description:
      "This app is about to launch. What's missing for a production-ready experience?",
    knownIssues: [
      {
        id: "L34B3I1",
        lineRange: [1, 3],
        description:
          "No loading state — user sees nothing while getTasks() fetches data. Needs a loading.tsx or Suspense boundary with a skeleton.",
        severity: "critical",
      },
      {
        id: "L34B3I2",
        lineRange: [18, 18],
        description:
          "Hardcoded http://localhost:3000 URL — will break in production. Should use a relative URL or environment variable.",
        severity: "critical",
      },
      {
        id: "L34B3I3",
        lineRange: [5, 17],
        description:
          "No empty state — if tasks array is empty, the page shows nothing. Should display 'No tasks yet — create your first one!'",
        severity: "warning",
      },
      {
        id: "L34B3I4",
        lineRange: [13, 15],
        description:
          "No hover effects on buttons — feels unresponsive. Add hover:bg-blue-600 and cursor-pointer for better UX.",
        severity: "suggestion",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L34B4",
    levelId: 34,
    type: "experiment",
    title: "Test Like a User",
    xp: 15,
    required: false,
    order: 4,
    description: "Test your app the way a real user would.",
    steps: [
      {
        id: "L34B4S1",
        instruction:
          "Open your app on mobile (or resize your browser to 375px width). Does everything work? Can you tap all buttons? Is any text cut off?",
        expectedOutcome:
          "You find at least one layout issue at mobile width — text overflowing, buttons too small to tap, or content hidden off-screen.",
        question:
          "What broke at mobile width? How would you tell AI to fix it?",
      },
      {
        id: "L34B4S2",
        instruction:
          "Open Chrome DevTools → Network tab → select 'Slow 3G' throttling. Reload the page. Does anything useful show while loading, or is it a blank white screen?",
        expectedOutcome:
          "On a slow connection, you see either loading skeletons (good) or a blank screen for several seconds (bad — needs loading.tsx).",
        question:
          "What did the user experience on slow 3G? Was there any feedback while loading?",
      },
      {
        id: "L34B4S3",
        instruction:
          "Sign out and try using the app as a brand new user who has never seen it before. Is the first screen clear? Do you know what to do?",
        expectedOutcome:
          "You notice at least one confusing thing — unclear navigation, missing onboarding, or an empty dashboard with no guidance.",
        question:
          "What was confusing as a first-time user? What would make the first experience better?",
      },
    ],
  },

  // ─── Level 35: Launch Boss (3 blocks) ───
  {
    id: "L35B1",
    levelId: 35,
    type: "quiz",
    title: "World 7 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What does deployment do?",
        options: [
          "Puts your app on the internet so anyone with the URL can access it",
          "Deletes your local code and moves it to the cloud",
          "Converts your app into a mobile app",
          "Sends your code to GitHub for backup",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Where should you store API keys and database passwords?",
        options: [
          "In a config.js file committed to GitHub",
          "In environment variables on the deployment platform",
          "In comments in the source code",
          "In the README file",
        ],
        correctIndex: 1,
      },
      {
        question: "What is the purpose of error.tsx in Next.js?",
        options: [
          "It logs errors to the console",
          "It shows a friendly fallback UI when a page crashes, instead of a white screen",
          "It prevents errors from happening in the first place",
          "It sends error reports to the developer's email",
        ],
        correctIndex: 1,
      },
      {
        question: "What are OG tags used for?",
        options: [
          "Making the app load faster",
          "Controlling what preview card is shown when your link is shared on social media",
          "Preventing hackers from accessing your site",
          "Generating a sitemap for Google",
        ],
        correctIndex: 1,
      },
      {
        question: "Why should you add analytics to your app?",
        options: [
          "It's required by law",
          "To make your app faster",
          "To know if anyone is using it and how they behave",
          "To improve your Google search ranking",
        ],
        correctIndex: 2,
      },
    ],
    passingScore: 3,
  },
  {
    id: "L35B2",
    levelId: 35,
    type: "prompt",
    title: "Write a Launch Audit Prompt",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a comprehensive prompt to audit your app for launch readiness",
    referencePrompt:
      "Audit my Next.js app for launch readiness. Check: 1) All pages have error boundaries and loading states. 2) SEO meta tags on every page. 3) Mobile responsive at 375px, 768px, 1024px. 4) Analytics tracking for key actions. 5) All env vars documented in .env.example. 6) No hardcoded localhost URLs. 7) npm run build passes clean. 8) Landing page has clear value prop and CTA.",
    hints: [
      "Cover every aspect: errors, SEO, mobile, analytics, security",
      "Include specific checks and widths",
      "Mention build verification",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L35B3",
    levelId: 35,
    type: "build",
    title: "Launch Ready",
    xp: 400,
    required: true,
    order: 3,
    mission:
      "Production-ready app: deployed, error handling, SEO, analytics, mobile responsive, polished UI. Would you share this URL publicly?",
    githubChecks: {
      hasDeploy: true,
      minFiles: 20,
      minCommits: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Full audit: deployment, error handling, loading states, SEO, mobile responsive, analytics, polish. Launch-ready?",
    passingScore: 60,
  },
];
