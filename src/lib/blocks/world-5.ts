import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 5 — Next Level (Levels 21-25)
// Next.js framework: routing, server/client, architecture
// ═══════════════════════════════════════

export const WORLD_5_BLOCKS: Block[] = [
  // ─── Level 21: Why Frameworks? (4 blocks) ───
  {
    id: "L21B1",
    levelId: 21,
    type: "theory",
    title: "The Limits of React Alone",
    xp: 10,
    required: true,
    order: 1,
    content: `# The Limits of React Alone

React is great for building UI, but it has problems when you try to ship a REAL product:

## Problem 1: Slow First Load

The browser has to download ALL your JavaScript before showing anything. It's like waiting for a whole book to print before you can read page 1.

## Problem 2: Invisible to Google

Search engines can't see React content well. Google sends a robot to read your page, but the page is blank until JavaScript runs. Bad for SEO.

## Problem 3: No Backend

React is frontend only. Need an API? A database connection? That's a completely separate project, separate deploy, separate headache.

## Why this matters

These problems don't matter when you're **learning**. But they matter for **real products** that need to be fast, findable, and full-featured.

This is where frameworks come in.`,
  },
  {
    id: "L21B2",
    levelId: 21,
    type: "theory",
    title: "Next.js = React + Superpowers",
    xp: 10,
    required: true,
    order: 2,
    content: `# Next.js = React + Superpowers

Next.js is React with all the problems solved. Same components, same JSX, same Tailwind — but with extras:

- **Fast loads** — pages pre-render on the server, so users see content instantly
- **Google can find you** — SEO works out of the box
- **Backend built in** — API routes live right next to your pages
- **File = page** — no router setup needed, ever
- **Deploy in one click** — Vercel (made by the Next.js team) handles everything

## What changes in your prompts?

Almost nothing. Instead of "Create a React app", say **"Use Next.js with App Router"**. That's it. AI handles the rest.

Everything you already know (components, Tailwind, TypeScript) still works exactly the same.`,
    miniQuiz: [
      {
        question:
          "What problems does Next.js solve that plain React has?",
        options: [
          "Slow first load, bad SEO, no backend",
          "No styling support, no TypeScript, no components",
          "Only works on Windows, too expensive, hard to learn",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "L21B3",
    levelId: 21,
    type: "experiment",
    title: "Explore Next.js",
    xp: 15,
    required: true,
    order: 3,
    description: "Create a Next.js project and see how it's organized.",
    steps: [
      {
        id: "L21B3S1",
        instruction:
          "Run `npx create-next-app@latest my-app` (say yes to all defaults). Once it's done, look at the folder structure — what's inside `src/app/`?",
        expectedOutcome:
          "You see page.tsx (the home page), layout.tsx (the wrapper for all pages), and globals.css. The folder structure IS your routing.",
      },
      {
        id: "L21B3S2",
        instruction:
          "Open `page.tsx` — this is your home page. Open `layout.tsx` — this wraps every page. The file names are special: `page.tsx` always means 'this is a page', `layout.tsx` always means 'this wraps pages'.",
        expectedOutcome:
          "You understand that Next.js uses file conventions: specific filenames have specific purposes.",
        question:
          "What two files did you find in src/app/ and what does each one do?",
      },
    ],
  },
  {
    id: "L21B4",
    levelId: 21,
    type: "quiz",
    title: "Why Next.js",
    xp: 15,
    required: true,
    order: 4,
    questions: [
      {
        question: "What does Next.js add on top of React?",
        options: [
          "A completely different programming language",
          "Server rendering, file-based routing, built-in API routes",
          "A paid subscription for hosting",
          "A replacement for HTML and CSS",
        ],
        correctIndex: 1,
      },
      {
        question: "What is the 'App Router' in Next.js?",
        options: [
          "A GPS navigation feature",
          "The system where your folder structure defines your URLs",
          "A third-party plugin you install separately",
          "A tool for managing API keys",
        ],
        correctIndex: 1,
      },
      {
        question: "When would you use Next.js instead of plain React?",
        options: [
          "Only for mobile apps",
          "When you need SEO, server rendering, or a built-in backend",
          "Only for very small projects",
          "Never — React is always better",
        ],
        correctIndex: 1,
      },
      {
        question: "What does 'file-based routing' mean?",
        options: [
          "You configure routes in a JSON file",
          "Creating a folder/file automatically creates a URL — no router config needed",
          "Files are served as downloads",
          "Each route needs a separate repository",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 3,
  },

  // ─── Level 22: Pages from Files (4 blocks) ───
  {
    id: "L22B1",
    levelId: 22,
    type: "theory",
    title: "File = Page",
    xp: 10,
    required: true,
    order: 1,
    content: `# File = Page

In Next.js, your folder structure IS your website:

- Create \`src/app/about/page.tsx\` → you get \`/about\`
- Create \`src/app/blog/page.tsx\` → you get \`/blog\`
- Create \`src/app/contact/page.tsx\` → you get \`/contact\`

**No routing config needed.** The folders ARE the URLs.

Think of it like a filing cabinet — the label on the drawer IS the address. Want a new page? Create a new folder with a \`page.tsx\` inside it. Done.

## The rule

Every \`page.tsx\` file becomes a page. The folder path becomes the URL. That's the entire routing system.`,
  },
  {
    id: "L22B2",
    levelId: 22,
    type: "theory",
    title: "Layouts = Shared Wrapper",
    xp: 10,
    required: true,
    order: 2,
    content: `# Layouts = Shared Wrapper

\`layout.tsx\` wraps every page in its folder. Put your navigation and footer in the root layout → every page automatically gets them.

It's like a **picture frame** — you change the photo (page content), the frame (layout) stays the same.

## Why this matters

You write the layout **once**. Navigation, footer, sidebar — set it and forget it. Every new page you add automatically gets wrapped in it.

## In your prompts

Tell AI: "Create a layout with navigation at the top and footer at the bottom." Every page will inherit it automatically.`,
    miniQuiz: [
      {
        question:
          "Where do you put navigation that should appear on every page?",
        options: [
          "Copy-paste it into every page.tsx",
          "In layout.tsx — it wraps all pages automatically",
          "In a separate navigation app",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L22B3",
    levelId: 22,
    type: "prompt",
    title: "Write a Next.js Pages Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Create a Next.js app with multiple pages and a shared layout",
    referencePrompt:
      "Create a Next.js app with App Router. Add these pages: Home (src/app/page.tsx), About (src/app/about/page.tsx), Blog (src/app/blog/page.tsx), Contact (src/app/contact/page.tsx). The root layout.tsx should have a navigation bar with links to all pages (highlight the active page) and a simple footer. Use Tailwind CSS for styling. Each page should have a unique heading and some content.",
    hints: [
      "List all pages with their file paths",
      "Describe the layout (what's shared across pages)",
      "Mention active page styling in the navigation",
      "Specify the styling approach (Tailwind)",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L22B4",
    levelId: 22,
    type: "build",
    title: "Build Your Pages",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Build a Next.js app with 4+ pages, shared layout with navigation, consistent Tailwind styling.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["src/app/layout.tsx"],
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for 4+ pages using file-based routing, shared layout.tsx with navigation, consistent Tailwind styling.",
    passingScore: 55,
  },

  // ─── Level 23: Server & Client (4 blocks) ───
  {
    id: "L23B1",
    levelId: 23,
    type: "theory",
    title: "Two Types of Components",
    xp: 10,
    required: true,
    order: 1,
    content: `# Two Types of Components

Next.js has two flavors of components:

## Server Components (default)

Like a **buffet**: pre-cooked, ready to serve, fast. They render on the server and send finished HTML to the browser.

- Can access the database directly
- Can't handle clicks or interactivity
- No useState, no onClick, no browser APIs

## Client Components ("use client" at top)

Like **live cooking**: custom, interactive, responds to you in real time.

- Handles clicks, forms, animations
- Uses useState, useEffect, event handlers
- Can't access the database directly

## The Rule of Thumb

If it **moves** or **responds to clicks** → client component. If it just **shows data** → server component.

## In your prompts

Be specific: "This page is a **server component** that fetches data" or "This form is a **client component** with useState."`,
  },
  {
    id: "L23B2",
    levelId: 23,
    type: "theory",
    title: "Loading & Error Safety Nets",
    xp: 10,
    required: true,
    order: 2,
    content: `# Loading & Error Safety Nets

Next.js has magic files that act as safety nets:

- **loading.tsx** → shows while a page loads (skeleton, spinner)
- **error.tsx** → shows when something breaks (friendly error + retry)
- **not-found.tsx** → shows for wrong URLs (custom 404)

## How it works

Just **create these files** in any folder. That's it. No configuration, no wiring, no imports. Next.js finds them automatically.

It's like having backup plans that activate themselves — you never have to think about WHEN to show them.

## In your prompts

Tell AI: "Add loading.tsx with a skeleton and error.tsx with a retry button." Simple as that.`,
    miniQuiz: [
      {
        question: "What does loading.tsx do?",
        options: [
          "Loads JavaScript faster",
          "Shows a placeholder while the page is loading",
          "Prevents the page from ever loading",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L23B3",
    levelId: 23,
    type: "prompt",
    title: "Write Server/Client Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Build a Next.js app with proper server/client separation",
    referencePrompt:
      "Update my Next.js app: 1) The main pages should be server components — they display static content. 2) Add a 'use client' ContactForm component with name, email, and message fields, form validation, and a submit handler that shows a success message. 3) Add loading.tsx in the app root with a centered spinner. 4) Add error.tsx with a 'Something went wrong' message and a 'Try again' button. 5) Add not-found.tsx with a custom 404 page and link back to home.",
    hints: [
      "Specify which components are server vs client",
      "Describe interactive components separately",
      "Mention loading.tsx, error.tsx, not-found.tsx",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L23B4",
    levelId: 23,
    type: "build",
    title: "Add Safety Nets",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add loading.tsx, error.tsx, not-found.tsx. Have at least one client component with 'use client' and interactivity.",
    githubChecks: {
      hasPackageJson: true,
      minFiles: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: loading.tsx, error.tsx, not-found.tsx, proper 'use client' usage, mix of server and client components.",
    passingScore: 55,
  },

  // ─── Level 24: App Architecture (4 blocks) ───
  {
    id: "L24B1",
    levelId: 24,
    type: "theory",
    title: "Organize by Feature, Not Type",
    xp: 10,
    required: true,
    order: 1,
    content: `# Organize by Feature, Not Type

## Bad organization

All components in /components, all utils in /utils. Like organizing a kitchen by putting ALL knives in one drawer and ALL plates in another — you have to run between drawers to make a single meal.

## Good organization

Group by **feature**. Everything for "users" in one place: the page, the components, the API route, the types. Everything for "tasks" together. Everything for "settings" together.

When you need to change "tasks", you open ONE folder — not five.

## In your prompts

Tell AI your folder structure and it'll follow it. Be explicit: "Group files by feature — tasks/ has the page, components, and API route together."`,
  },
  {
    id: "L24B2",
    levelId: 24,
    type: "pattern",
    title: "App Architecture Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "app-architecture",
    exercise: {
      goal: "Plan your app's architecture using the App Architecture Pattern",
      template: `Organize my Next.js app:

Pages: ___
Shared components: ___
Utilities: ___
Data flow: ___
File structure: ___`,
      exampleFilled: `Organize my Next.js app:

Pages: home, dashboard, settings, project detail
Shared components: Header, Footer, Button, Card, Modal
Utilities: auth helper, API client, date formatting
Data flow: pages fetch from API routes, API routes query Prisma
File structure: src/app/(pages), src/components/ui (shared), src/lib (utilities), each feature folder contains its own components`,
    },
  },
  {
    id: "L24B3",
    levelId: 24,
    type: "review",
    title: "Evaluate AI's Structure",
    xp: 20,
    required: true,
    order: 3,
    code: `src/
  app/
    page.tsx
    layout.tsx
  components/
    Header.tsx
    Footer.tsx
    Button.tsx
    Card.tsx
    TaskList.tsx
    TaskItem.tsx
    TaskForm.tsx
    UserProfile.tsx
    UserAvatar.tsx
    UserSettings.tsx
    ProjectCard.tsx
    ProjectList.tsx
    Modal.tsx
    Spinner.tsx
    ErrorMessage.tsx
  utils/
    utils.ts        // 800 lines — everything in one file
  types/
    // no types folder — interfaces are scattered in component files`,
    language: "text",
    description:
      "AI generated this project structure. What's wrong with the organization?",
    knownIssues: [
      {
        id: "L24B3I1",
        lineRange: [4, 18],
        description:
          "All components dumped in one giant /components folder — Task, User, and Project components should be organized by feature, not all mixed together",
        severity: "critical",
      },
      {
        id: "L24B3I2",
        lineRange: [19, 19],
        description:
          "All utility functions in one 800-line utils.ts file — should be split by purpose (auth.ts, formatting.ts, api.ts)",
        severity: "warning",
      },
      {
        id: "L24B3I3",
        lineRange: [20, 21],
        description:
          "No types folder — TypeScript interfaces are scattered across component files instead of being centralized or co-located with features",
        severity: "suggestion",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L24B4",
    levelId: 24,
    type: "debug",
    title: "Fix Next.js Issues",
    xp: 20,
    required: true,
    order: 4,
    scenarios: [
      {
        id: "L24B4D1",
        title: "useState in Server Component",
        description:
          "This component tries to use useState but it's a server component (no 'use client' directive). Next.js throws an error.",
        brokenCode: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}`,
        language: "tsx",
        hint: "Server components can't use React hooks. What directive makes a component run on the client?",
        expectedFix:
          "Add 'use client' directive at the top of the file, before any imports",
      },
      {
        id: "L24B4D2",
        title: "'window is not defined'",
        description:
          "This component accesses the window object, but it runs on the server during SSR where window doesn't exist.",
        brokenCode: `export default function ScreenSize() {
  const width = window.innerWidth;

  return (
    <div>
      <p>Screen width: {width}px</p>
    </div>
  );
}`,
        language: "tsx",
        hint: "The server doesn't have a browser window. How can you make this component only run in the browser, or check if window exists?",
        expectedFix:
          "Either add 'use client' directive to make it a client component, or check if window exists with 'typeof window !== \"undefined\"' before accessing it",
      },
    ],
    passingCount: 1,
  },

  // ─── Level 25: Next.js Boss (3 blocks) ───
  {
    id: "L25B1",
    levelId: 25,
    type: "quiz",
    title: "World 5 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What does Next.js add that plain React doesn't have?",
        options: [
          "Components and JSX",
          "Server rendering, file-based routing, and built-in API routes",
          "CSS and styling",
          "JavaScript support",
        ],
        correctIndex: 1,
      },
      {
        question: "How does file-based routing work in Next.js?",
        options: [
          "You configure routes in a JSON config file",
          "Creating src/app/about/page.tsx automatically creates the /about URL",
          "You import a Router library and define routes manually",
          "Each page needs a separate Next.js project",
        ],
        correctIndex: 1,
      },
      {
        question: "When should you use a client component vs a server component?",
        options: [
          "Always use client components — server components are deprecated",
          "Client for interactivity (clicks, forms, state). Server for displaying data.",
          "Server components are only for API routes",
          "There's no difference — they work the same way",
        ],
        correctIndex: 1,
      },
      {
        question: "What do loading.tsx and error.tsx do?",
        options: [
          "They speed up JavaScript execution",
          "loading.tsx shows a placeholder while loading; error.tsx shows a fallback when something breaks",
          "They are required config files that define build settings",
          "They replace page.tsx as the main page content",
        ],
        correctIndex: 1,
      },
      {
        question: "Why should you organize code by feature instead of by type?",
        options: [
          "It makes the app run faster",
          "Everything related to one feature is in one place — easier to find and change",
          "Next.js requires it",
          "It reduces the number of files",
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
    title: "Design Your Next.js App",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "hints",
    goal: "Write a comprehensive prompt for a complete Next.js application",
    referencePrompt:
      "Create a Next.js app with App Router and TypeScript. Pages: Home (landing with hero section), Dashboard (shows user content), Projects (list of projects), Project Detail (single project view), Settings (user preferences). Root layout.tsx with responsive navigation (hamburger on mobile) and footer. Use Tailwind CSS. Each page that fetches data should be a server component. Interactive elements (forms, modals, dropdowns) should be client components with 'use client'. Add loading.tsx with skeleton UI for pages that load data. Add error.tsx with a friendly message and retry button. Add not-found.tsx with a custom 404. Organize by feature: each feature folder contains its page, components, and types together.",
    hints: [
      "List all pages with their purpose",
      "Describe the layout and navigation",
      "Specify server vs client for each component",
      "Include loading and error handling",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L25B3",
    levelId: 25,
    type: "build",
    title: "Ship Your Next.js App",
    xp: 300,
    required: true,
    order: 3,
    mission:
      "Build a complete Next.js app: 5+ pages, shared layout, loading/error states, Tailwind, TypeScript, clean architecture.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["src/app/layout.tsx"],
      fileContains: [
        { path: "package.json", contains: ["next", "tailwind"] },
      ],
      minFiles: 15,
      minCommits: 5,
      commitAfter: "level_start",
    },
    passingScore: 60,
    aiReviewPrompt:
      "Boss level — full audit. Check: 5+ pages with file-based routing, shared layout with navigation, loading.tsx, error.tsx, not-found.tsx, mix of server and client components, Tailwind styling, TypeScript, organized folder structure.",
  },
];
