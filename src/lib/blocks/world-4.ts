import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 4 — Ship It (Levels 16-20)
// Patterns: Error Fix, Debug, Performance
// ═══════════════════════════════════════

export const WORLD_4_BLOCKS: Block[] = [
  // ─── Level 16: Domain & Deploy (4 blocks) ───
  {
    id: "L16B1",
    levelId: 16,
    type: "theory",
    title: "Deployment Basics",
    xp: 10,
    required: true,
    order: 1,
    content: `# Putting Your App on the Internet

Building locally is great, but nobody can see it. Deployment = making your app accessible via a URL.

## Deployment platforms

| Platform | Best for | Free tier |
|----------|----------|-----------|
| Vercel | Next.js apps | Yes |
| Railway | Full-stack + DB | Limited |
| Netlify | Static sites | Yes |
| Fly.io | Docker apps | Limited |

## What you need

1. **Deploy config** — tells the platform how to build your app
2. **Environment variables** — secrets that shouldn't be in code (.env)
3. **Database URL** — connection string to your hosted database
4. **Build command** — usually \`npm run build\`

## Environment Variables

**NEVER commit secrets to Git.** Use environment variables:

\`\`\`bash
# .env (local — in .gitignore!)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="random-string"
GITHUB_ID="your-client-id"
\`\`\`

Set these in your deployment platform's dashboard, not in code.

## For your prompts

Specify: which platform, what env vars are needed, any special build configurations.`,
  },
  {
    id: "L16B2",
    levelId: 16,
    type: "prompt",
    title: "Write a Deploy Prompt",
    xp: 15,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a prompt to prepare your app for deployment",
    referencePrompt:
      "Prepare my Next.js app for deployment to Vercel. Add: 1) vercel.json with proper build settings. 2) Make sure all secrets (database URL, auth secrets, API keys) are read from environment variables, not hardcoded. 3) Create a .env.example file listing all required env vars with placeholder values. 4) Add a production DATABASE_URL configuration for PostgreSQL. 5) Ensure the build passes with `npm run build` — fix any TypeScript or build errors.",
    hints: [
      "Name the deployment platform",
      "Mention environment variables",
      "Include build command verification",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L16B3",
    levelId: 16,
    type: "build",
    title: "Deploy Your App",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Deploy your app to Vercel or Railway. Add deployment config to your repo.",
    githubChecks: {
      hasDeploy: true,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for deployment configuration (vercel.json, railway.toml, or similar). Look for proper env variable handling.",
    passingScore: 50,
  },
  {
    id: "L16B4",
    levelId: 16,
    type: "experiment",
    title: "What Happens Without Env Vars?",
    xp: 10,
    required: false,
    order: 4,
    description:
      "Understand why environment variables matter for deployment.",
    steps: [
      {
        id: "L16B4S1",
        instruction:
          "Look at your .env file. Imagine deploying without setting these variables on the platform. What would break?",
        expectedOutcome:
          "Database connections would fail, auth wouldn't work, any API integrations would be broken.",
        question: "Which environment variables are critical for your app to work?",
      },
      {
        id: "L16B4S2",
        instruction:
          "Check your code for any hardcoded URLs, API keys, or secrets. These should all be environment variables.",
        expectedOutcome: "You might find some hardcoded values that need to be moved to .env.",
        question: "Did you find any hardcoded secrets?",
      },
    ],
  },

  // ─── Level 17: Error Handling (5 blocks) ───
  {
    id: "L17B1",
    levelId: 17,
    type: "theory",
    title: "Why Errors Happen",
    xp: 10,
    required: true,
    order: 1,
    content: `# Why Errors Happen

Errors are normal. Every app has them. The question is: does your app **crash** or **handle it gracefully**?

## Common error sources

| Source | Example | Fix |
|--------|---------|-----|
| Network | API is down | Show error message + retry |
| User input | Invalid email | Validate before sending |
| Missing data | Null pointer | Check before accessing |
| Auth | Token expired | Redirect to login |
| Server | Database down | Error boundary + fallback |

## Error handling in Next.js

1. **error.tsx** — catches React rendering errors
2. **loading.tsx** — shows while data loads (prevents blank screens)
3. **not-found.tsx** — custom 404 page
4. **try/catch** — catches errors in API routes and server actions

\`\`\`tsx
// error.tsx
"use client";
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
\`\`\`

## The golden rule

**Never show raw error messages to users.** Instead: log the real error server-side, show a friendly message to the user.`,
  },
  {
    id: "L17B2",
    levelId: 17,
    type: "debug",
    title: "Fix Error Scenarios",
    xp: 30,
    required: true,
    order: 2,
    scenarios: [
      {
        id: "L17B2D1",
        title: "Unhandled API error",
        description: "This API route crashes when the database query fails.",
        brokenCode: `export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}`,
        language: "typescript",
        hint: "What if prisma.user.findMany() throws an error?",
        expectedFix:
          "Wrap in try/catch, return a 500 response with a friendly error message on failure",
      },
      {
        id: "L17B2D2",
        title: "Null reference crash",
        description: "This component crashes when user data hasn't loaded yet.",
        brokenCode: `function Profile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Joined: {user.createdAt.toLocaleDateString()}</p>
    </div>
  );
}`,
        language: "tsx",
        hint: "What if user is null or undefined?",
        expectedFix:
          "Add a null check: if (!user) return a loading/placeholder state",
      },
      {
        id: "L17B2D3",
        title: "Missing error boundary",
        description: "The app shows a blank white screen when a component throws an error.",
        brokenCode: `// src/app/dashboard/page.tsx
export default async function Dashboard() {
  const data = await fetchDashboardData();
  return <DashboardView data={data} />;
}

// No error.tsx in the dashboard folder!`,
        language: "tsx",
        hint: "What file should catch rendering errors in Next.js App Router?",
        expectedFix:
          "Create an error.tsx file in the same folder to catch and display errors gracefully",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L17B3",
    levelId: 17,
    type: "prompt",
    title: "Write Error Handling Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Write a prompt to add comprehensive error handling to your app",
    referencePrompt:
      "Add comprehensive error handling to my Next.js app: 1) Create error.tsx in the app root and key route folders — show a friendly error message with a 'Try Again' button that calls reset(). 2) Add loading.tsx with skeleton UI to all pages that fetch data. 3) Create not-found.tsx with a custom 404 page and link back to home. 4) Wrap all API route handlers in try/catch — log errors server-side, return user-friendly JSON error responses with proper status codes. 5) Add form validation on all input forms — show inline error messages for required fields.",
    hints: [
      "List each type of error handling (boundary, loading, 404, API)",
      "Describe what users should see for each error case",
      "Mention form validation",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L17B4",
    levelId: 17,
    type: "build",
    title: "Add Error Handling",
    xp: 25,
    required: true,
    order: 4,
    mission:
      "Add error.tsx, loading.tsx, not-found.tsx, try/catch in API routes, and user-friendly error messages.",
    githubChecks: {
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for error handling: error.tsx boundary, loading.tsx skeletons, not-found.tsx, try/catch in API routes, user-friendly messages.",
    passingScore: 55,
  },
  {
    id: "L17B5",
    levelId: 17,
    type: "experiment",
    title: "Remove try/catch, See What Breaks",
    xp: 10,
    required: false,
    order: 5,
    description: "Understand why try/catch matters by removing it temporarily.",
    steps: [
      {
        id: "L17B5S1",
        instruction:
          "Find an API route with try/catch. Temporarily remove the try/catch wrapper. Then trigger an error (e.g., disconnect the database). What does the user see?",
        expectedOutcome:
          "The API returns a raw 500 error or the page shows an unhandled error.",
        question: "What error did the user see without try/catch?",
      },
      {
        id: "L17B5S2",
        instruction: "Put the try/catch back. Trigger the same error again.",
        expectedOutcome: "Now the user sees your friendly error message instead of a crash.",
      },
    ],
  },

  // ─── Level 18: SEO & Meta (4 blocks) ───
  {
    id: "L18B1",
    levelId: 18,
    type: "theory",
    title: "SEO Basics for Developers",
    xp: 10,
    required: true,
    order: 1,
    content: `# SEO Basics

SEO = Search Engine Optimization. It's how Google finds and ranks your site.

## What Google looks at

1. **Title tag** — the text in the browser tab
2. **Meta description** — preview text in search results
3. **Headings** — H1, H2, H3 structure
4. **Content** — actual text on the page
5. **Performance** — how fast the page loads
6. **Mobile** — does it work on phones?

## Open Graph tags (social sharing)

When someone shares your URL on Twitter/LinkedIn, these tags control the preview:

\`\`\`html
<meta property="og:title" content="My App" />
<meta property="og:description" content="The best app ever" />
<meta property="og:image" content="https://myapp.com/og-image.png" />
\`\`\`

## In Next.js

\`\`\`typescript
// In layout.tsx or page.tsx
export const metadata = {
  title: "My App",
  description: "The best app for managing tasks",
  openGraph: {
    title: "My App",
    description: "The best app for managing tasks",
    images: ["/og-image.png"],
  },
};
\`\`\`

## sitemap.xml and robots.txt

- **sitemap.xml** — tells Google which pages exist
- **robots.txt** — tells crawlers which pages to index/ignore`,
  },
  {
    id: "L18B2",
    levelId: 18,
    type: "prompt",
    title: "Write an SEO Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a prompt to add SEO optimization to your app",
    referencePrompt:
      "Add SEO optimization to my Next.js app: 1) Add metadata exports to layout.tsx with title template, default description, and Open Graph tags. 2) Add unique metadata to each page.tsx with page-specific title and description. 3) Create a sitemap.ts that auto-generates sitemap.xml from all routes. 4) Add robots.txt in the public folder allowing all crawlers. 5) Ensure all pages have proper H1 headings and semantic HTML structure.",
    hints: [
      "Cover meta tags, Open Graph, sitemap, and robots.txt",
      "Mention unique titles per page",
      "Think about what Google needs to properly index your site",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L18B3",
    levelId: 18,
    type: "build",
    title: "Optimize for SEO",
    xp: 35,
    required: true,
    order: 3,
    mission:
      "Add meta tags, Open Graph tags, sitemap.xml, and robots.txt to your app.",
    githubChecks: {
      fileExists: ["public/robots.txt"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: metadata exports, Open Graph tags, sitemap, robots.txt. Pages should have unique titles.",
    passingScore: 55,
  },
  {
    id: "L18B4",
    levelId: 18,
    type: "pattern",
    title: "Error Fix Pattern",
    xp: 15,
    required: true,
    order: 4,
    patternId: "error-fix",
    exercise: {
      goal: "Practice describing errors clearly to AI using the Error Fix Pattern",
      template: `I'm getting this error:

\`\`\`
___
\`\`\`

Context:
- File: ___
- What I was doing: ___
- What I expected: ___
- What I already tried: ___`,
      exampleFilled: `I'm getting this error:

\`\`\`
Error: Metadata export is not available in client components
\`\`\`

Context:
- File: src/app/dashboard/page.tsx
- What I was doing: adding metadata export for SEO
- What I expected: page title to update in the browser tab
- What I already tried: added "use client" because I have useState, but then metadata broke`,
    },
  },

  // ─── Level 19: Analytics (4 blocks) ───
  {
    id: "L19B1",
    levelId: 19,
    type: "theory",
    title: "Understanding Analytics",
    xp: 10,
    required: true,
    order: 1,
    content: `# Analytics: Know Your Users

Building is half the battle. Knowing if anyone uses your app — and how — is the other half.

## What to track

| Type | Example | Why |
|------|---------|-----|
| Page views | Which pages are visited most | Know what's popular |
| Events | Button clicks, sign-ups, purchases | Know what users do |
| Funnels | Landing → Sign-up → First use → Pay | Find where users drop off |
| Sessions | How long users stay | Measure engagement |

## Analytics tools

- **PostHog** — open source, self-hostable, free tier
- **Plausible** — privacy-focused, simple
- **Google Analytics** — most popular, but privacy concerns
- **Vercel Analytics** — built into Vercel

## How to add

\`\`\`typescript
// Track a custom event
posthog.capture('task_created', {
  projectId: project.id,
  taskCount: project.tasks.length,
});
\`\`\`

## For your prompts

Specify: which analytics tool, what events to track, where to put the tracking code.`,
  },
  {
    id: "L19B2",
    levelId: 19,
    type: "prompt",
    title: "Write an Analytics Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a prompt to add analytics tracking to your app",
    referencePrompt:
      "Add PostHog analytics to my Next.js app: 1) Install posthog-js and create a PostHogProvider component. 2) Track page views automatically on route changes. 3) Add custom events: 'user_signed_up' on registration, 'task_created' when creating a task, 'project_completed' when all tasks are done. 4) Include user identification on login (posthog.identify). 5) Make sure the PostHog key comes from environment variables. 6) Respect Do Not Track browser setting.",
    hints: [
      "Name the analytics tool",
      "List specific events to track",
      "Mention environment variables for keys",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L19B3",
    levelId: 19,
    type: "build",
    title: "Add Analytics",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Add analytics to your app. Track page views and at least 3 custom events.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for analytics integration: setup, page view tracking, at least 3 custom events on user actions.",
    passingScore: 55,
  },
  {
    id: "L19B4",
    levelId: 19,
    type: "pattern",
    title: "Debug Pattern",
    xp: 15,
    required: true,
    order: 4,
    patternId: "debug-pattern",
    exercise: {
      goal: "Practice systematic debugging with the Debug Pattern",
      template: `Something isn't working right:

Expected behavior: ___
Actual behavior: ___

Here's the relevant code:
\`\`\`
___
\`\`\`

Environment: ___
Console output: ___`,
      exampleFilled: `Something isn't working right:

Expected behavior: PostHog events should appear in the dashboard after clicking "Create Task"
Actual behavior: page views show up but custom events don't

Here's the relevant code:
\`\`\`tsx
<button onClick={() => { createTask(); }}>Create Task</button>
\`\`\`

Environment: Chrome 120, Next.js 14, PostHog cloud
Console output: no errors, no PostHog warnings`,
    },
  },

  // ─── Level 20: Launch Boss (3 blocks) ───
  {
    id: "L20B1",
    levelId: 20,
    type: "quiz",
    title: "World 4 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "Why should you NEVER commit .env files to Git?",
        options: [
          "They make the repo too large",
          "They contain secrets (API keys, database URLs) that should stay private",
          "Git can't handle .env format",
          "They slow down deployment",
        ],
        correctIndex: 1,
      },
      {
        question: "What does error.tsx do in Next.js?",
        options: [
          "Logs errors to a file",
          "Catches rendering errors and shows a fallback UI instead of a blank screen",
          "Prevents all errors from happening",
          "Sends error reports to email",
        ],
        correctIndex: 1,
      },
      {
        question: "What are Open Graph tags used for?",
        options: [
          "Database optimization",
          "Controlling how your URL preview looks when shared on social media",
          "Making JavaScript faster",
          "User authentication",
        ],
        correctIndex: 1,
      },
      {
        question: "Why track custom analytics events (not just page views)?",
        options: [
          "Page views are inaccurate",
          "Custom events show you what users actually DO — sign up, click buttons, complete tasks",
          "Google requires them for SEO",
          "They make the app faster",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the Error Fix Pattern for getting AI help with bugs?",
        options: [
          "Just paste the error and say 'fix this'",
          "Provide: exact error, file/line, what you were doing, what you expected, what you tried",
          "Delete the file and start over",
          "Restart the computer",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 3,
  },
  {
    id: "L20B2",
    levelId: 20,
    type: "prompt",
    title: "Launch Readiness Prompt",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "none",
    goal: "Write a prompt to audit your app for launch readiness",
    referencePrompt:
      "Audit my Next.js app for launch readiness and fix any issues: 1) Check all pages have proper error boundaries and loading states. 2) Verify SEO meta tags exist on every page with unique titles. 3) Ensure mobile responsiveness — test at 375px, 768px, 1024px widths. 4) Confirm analytics tracking is set up for key user actions. 5) Verify all environment variables are documented in .env.example. 6) Check for any hardcoded localhost URLs or test data. 7) Run `npm run build` and fix any TypeScript/build errors. 8) Review the landing page: does it clearly explain the product and have a clear CTA?",
    hints: [
      "Think about every aspect: errors, SEO, mobile, analytics, security",
      "Mention specific checks for each area",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L20B3",
    levelId: 20,
    type: "build",
    title: "Launch Your App",
    xp: 300,
    required: true,
    order: 3,
    mission:
      "Make your app launch-ready: landing page, error handling, SEO, analytics, mobile responsive, deployed.",
    githubChecks: {
      hasDeploy: true,
      minFiles: 20,
      minCommits: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level — full audit. Check: landing page, error handling, loading states, SEO, mobile, analytics, deployed config.",
    passingScore: 60,
  },
];
