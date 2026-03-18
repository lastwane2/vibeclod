import type { Level, World } from "@/types";
import { getBlocksForLevel } from "@/lib/blocks";

// ═══════════════════════════════════════
// 8 Worlds — 40 Levels
// Smooth curve from HTML to making money
// ═══════════════════════════════════════

export const WORLDS: World[] = [
  {
    id: 0,
    title: "Setup",
    subtitle: "Get your tools ready",
    color: "#71717A",
    accentColor: "#52525B",
    icon: "⚙️",
    requiredPlan: "FREE",
  },
  {
    id: 1,
    title: "Hello, Vibe",
    subtitle: "Your first build with AI",
    color: "#E8A445",
    accentColor: "#D4932E",
    icon: "🌱",
    requiredPlan: "FREE",
  },
  {
    id: 2,
    title: "Real Tools",
    subtitle: "Terminal, npm, git — demystified",
    color: "#2AA198",
    accentColor: "#238E86",
    icon: "🔧",
    requiredPlan: "FREE",
  },
  {
    id: 3,
    title: "Components",
    subtitle: "Building with React",
    color: "#5B8DEF",
    accentColor: "#4A7AD6",
    icon: "🧩",
    requiredPlan: "PRO",
  },
  {
    id: 4,
    title: "Level Up",
    subtitle: "Bigger apps, smarter prompts",
    color: "#6366F1",
    accentColor: "#5558D9",
    icon: "⚡",
    requiredPlan: "PRO",
  },
  {
    id: 5,
    title: "Next Level",
    subtitle: "Next.js — the real framework",
    color: "#9B6EC6",
    accentColor: "#8A5DB5",
    icon: "🚀",
    requiredPlan: "PRO",
  },
  {
    id: 6,
    title: "Full Stack",
    subtitle: "Database, API, auth",
    color: "#E06B6B",
    accentColor: "#CC5555",
    icon: "🗄️",
    requiredPlan: "PRO",
  },
  {
    id: 7,
    title: "Ship It",
    subtitle: "Deploy and polish",
    color: "#10B981",
    accentColor: "#0D9668",
    icon: "📦",
    requiredPlan: "PRO",
  },
  {
    id: 8,
    title: "Get Paid",
    subtitle: "Monetize what you built",
    color: "#EAB308",
    accentColor: "#CA9A06",
    icon: "💰",
    requiredPlan: "PRO",
  },
];

export const LEVELS: Level[] = [
  // ═══════════════════════════════════════
  // WORLD 0 — Setup (L0) — FREE
  // GitHub, Claude Code, repo connection
  // ═══════════════════════════════════════
  {
    id: 0,
    worldId: 0,
    title: "Get Ready",
    subtitle: "Set up GitHub, AI tools, and your repo",
    type: "setup",
    xp: 40,
    duration: "10 min",
    teaches:
      "How to set up your GitHub account, connect a repo, and configure your AI coding tool.",
    concepts: [
      "GitHub stores your code online",
      "Claude Code (or any AI tool) writes code for you",
      "CLAUDE.md makes Claude Code auto-push to GitHub",
    ],
    mission:
      "Create a GitHub repo, connect it to vibeclod, set up your AI coding tool, and verify the full loop works.",
    githubChecks: {
      minCommits: 1,
    },
    aiReviewPrompt:
      "Check that the student has a connected GitHub repo with at least one commit. This is a setup level — any valid repo connection counts as passing.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "⚙️",
  },
  // ═══════════════════════════════════════
  // WORLD 1 — Hello, Vibe (L1-5) — FREE
  // The basic loop: prompt → generate → push
  // ═══════════════════════════════════════
  {
    id: 1,
    worldId: 1,
    title: "Your First Prompt",
    subtitle: "Talk to AI, get a website",
    type: "setup",
    xp: 50,
    duration: "5 min",
    teaches: "The basic vibe coding loop: describe what you want, AI builds it.",
    concepts: [
      "Vibe coding = describing what you want to AI",
      "A good prompt has: task, context, and format",
      "AI writes code, you direct it",
    ],
    mission:
      "Use AI to generate an HTML page with a headline and button. Push to your repo as index.html.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [{ path: "index.html", contains: ["<button", "<h1"] }],
      minCommits: 1,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check if index.html is a valid HTML page with a visible heading and a button. It should look intentional, not a blank template.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "💬",
  },
  {
    id: 2,
    worldId: 1,
    title: "Make It Pretty",
    subtitle: "Styling vocabulary for AI",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "The right words to describe visual design to AI.",
    concepts: [
      "Specific styling words → better AI output",
      "Colors, layout, typography, effects",
      "Be precise: hex codes > 'make it nice'",
    ],
    mission:
      "Add styling to your page — custom colors, fonts, centered layout. Should look like a real landing page.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["style", "color", "font"] },
      ],
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review the CSS styling. Does it look intentional? Check for custom colors, fonts, centered layout. Should not look like unstyled HTML.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🎨",
  },
  {
    id: 3,
    worldId: 1,
    title: "Pages & Clicks",
    subtitle: "Multi-page sites with interactivity",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "How to describe multi-page sites and interactive behavior to AI.",
    concepts: [
      "Multiple pages connected by navigation",
      "Interactive = describe what triggers what",
      "Tell AI exactly: 'when user clicks X, show Y'",
    ],
    mission:
      "Create 3+ HTML pages with shared navigation and at least one interactive feature (show/hide, counter, form validation).",
    githubChecks: {
      fileExists: ["index.html", "about.html"],
      fileContains: [
        { path: "index.html", contains: ["<a", "href", "<script"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for multiple pages with navigation, consistent styling, and at least one working JavaScript interaction.",
    passingScore: 55,
    buddyMood: "think",
    icon: "📄",
  },
  {
    id: 4,
    worldId: 1,
    title: "Trust But Verify",
    subtitle: "Catching AI mistakes",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "How to spot and fix common AI coding mistakes.",
    concepts: [
      "AI makes mistakes — broken links, wrong styles, dead buttons",
      "Always test what AI gives you",
      "Describe the problem clearly to get a fix",
    ],
    mission:
      "Review and fix your existing site — check all links work, buttons do what they should, and styling is consistent across pages.",
    githubChecks: {
      fileExists: ["index.html"],
      minCommits: 4,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check the site for quality: all links work, interactive features function, styling is consistent, no obvious broken elements.",
    passingScore: 50,
    buddyMood: "think",
    icon: "🔍",
  },
  {
    id: 5,
    worldId: 1,
    title: "Portfolio Boss",
    subtitle: "Ship your first real site",
    type: "boss",
    xp: 200,
    duration: "15 min",
    teaches: "Combining everything into a polished portfolio.",
    concepts: [
      "Combine HTML, CSS, and JS into a real project",
      "Portfolio = your proof of work",
      "Polish matters — details make it professional",
    ],
    mission:
      "Build a complete portfolio: hero section, about, 2+ projects, contact form, responsive design. Your first real ship.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["<form", "project", "style"] },
      ],
      minCommits: 5,
      minFiles: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: hero section, about section, 2+ project cards, contact form, responsive design, polished CSS.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 2 — Real Tools (L6-10) — PRO
  // Terminal, Node, npm, Git — demystified
  // ═══════════════════════════════════════
  {
    id: 6,
    worldId: 2,
    title: "The Terminal",
    subtitle: "Text chat with your computer",
    type: "setup",
    xp: 50,
    duration: "5 min",
    teaches: "The terminal is just texting commands to your computer.",
    concepts: [
      "Terminal = another way to talk to your computer",
      "5 commands that matter: cd, ls, mkdir, touch, npm",
      "You don't need to memorize — AI can help with commands",
    ],
    mission:
      "Open the terminal, navigate to your project folder, and create a proper folder structure with subdirectories.",
    githubChecks: {
      minCommits: 1,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check that the project has a logical folder structure with at least 2 subdirectories.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "💻",
  },
  {
    id: 7,
    worldId: 2,
    title: "Projects Have Structure",
    subtitle: "npm, packages, and dependencies",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "How modern projects are organized with npm and package.json.",
    concepts: [
      "package.json = your project's ingredient list",
      "npm install = get all the ingredients",
      "node_modules = never upload (use .gitignore)",
    ],
    mission:
      "Create a project with npm. Must have package.json with at least one dependency and .gitignore excluding node_modules.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: [".gitignore"],
      fileContains: [
        { path: ".gitignore", contains: ["node_modules"] },
        { path: "package.json", contains: ["dependencies"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for valid package.json with a dependency, .gitignore with node_modules. Proper project structure.",
    passingScore: 50,
    buddyMood: "think",
    icon: "📦",
  },
  {
    id: 8,
    worldId: 2,
    title: "Save Points",
    subtitle: "Git and version control",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "Git is save points for your code. GitHub is the cloud backup.",
    concepts: [
      "Git commit = saving your progress",
      "GitHub = cloud storage for code",
      "You can always go back to any save point",
    ],
    mission:
      "Make at least 3 meaningful commits with clear messages. Your commit history should tell the story of what you built.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check the commit history. Are there 3+ commits with descriptive messages? Do they tell a coherent story of progress?",
    passingScore: 50,
    buddyMood: "happy",
    icon: "💾",
  },
  {
    id: 9,
    worldId: 2,
    title: "The Full Workflow",
    subtitle: "IDE → Terminal → Git → Ship",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "The complete development workflow professionals use.",
    concepts: [
      "IDE + Terminal + AI = your cockpit",
      "The loop: prompt AI → paste → test → commit → push",
      "Practice the workflow, not the code",
    ],
    mission:
      "Create a project from scratch using the full workflow: initialize with npm, add structure, make multiple commits with clear messages.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: [".gitignore"],
      minCommits: 3,
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: proper npm project, clean file structure, .gitignore, meaningful commit history with 3+ commits.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔄",
  },
  {
    id: 10,
    worldId: 2,
    title: "Setup Boss",
    subtitle: "From zero to project",
    type: "boss",
    xp: 200,
    duration: "12 min",
    teaches: "Setting up a complete, professional project from scratch.",
    concepts: [
      "Professional projects have: npm, git, structure, README",
      "The setup is the foundation for everything",
      "AI can scaffold the whole thing if you ask right",
    ],
    mission:
      "Set up a complete project from scratch: npm init, proper dependencies, .gitignore, organized folder structure, README, and at least 5 well-committed files.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: [".gitignore", "README.md"],
      minCommits: 5,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: complete npm setup, clean file structure, .gitignore, README with project description, 5+ meaningful commits.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 3 — Components (L11-15) — PRO
  // React as LEGO blocks
  // ═══════════════════════════════════════
  {
    id: 11,
    worldId: 3,
    title: "Building Blocks",
    subtitle: "Components are LEGO for UI",
    type: "setup",
    xp: 75,
    duration: "8 min",
    teaches: "Components are reusable building blocks that make up your UI.",
    concepts: [
      "Components = LEGO blocks for your interface",
      "React = the most popular component system",
      "Tell AI what blocks you need, it builds them",
    ],
    mission:
      "Create a React app with at least 3 custom components. Each component should do one thing well.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react"] },
      ],
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for at least 3 custom React components, proper imports, clean structure. Components should be in separate files.",
    passingScore: 55,
    buddyMood: "idle",
    icon: "🧩",
  },
  {
    id: 12,
    worldId: 3,
    title: "Things That Change",
    subtitle: "State and events in React",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "State tracks what changes, events trigger those changes.",
    concepts: [
      "State = things that change (counter, toggle, form input)",
      "Events = user actions that cause changes",
      "Describe triggers and results to AI",
    ],
    mission:
      "Build a React app with interactive components — at least one counter/toggle and one form that does something when submitted.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react"] },
      ],
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for React state (useState), event handlers, and actual interactivity. Should have a counter/toggle AND a form.",
    passingScore: 55,
    buddyMood: "think",
    icon: "⚡",
  },
  {
    id: 13,
    worldId: 3,
    title: "Modern Styling",
    subtitle: "Tailwind CSS — style with words",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "Tailwind lets you style by adding class names — no CSS files needed.",
    concepts: [
      "Tailwind = styling language in your HTML",
      "Responsive = one app, every screen size",
      "AI writes better UI with Tailwind",
    ],
    mission:
      "Style your React app with Tailwind CSS. Responsive layout that works on mobile and desktop. No custom CSS files.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["tailwind"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Tailwind usage across components. Look for responsive utilities (sm:, md:, lg:), consistent spacing, polished look.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🌊",
  },
  {
    id: 14,
    worldId: 3,
    title: "AI Makes Mistakes",
    subtitle: "Spotting and fixing React bugs",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "How to spot common mistakes AI makes in React code.",
    concepts: [
      "AI duplicates code instead of making components",
      "AI forgets to handle loading and errors",
      "The fix loop: spot issue → describe to AI → verify",
    ],
    mission:
      "Review your app code, find at least 2 issues (duplicated code, missing error handling, etc.), and fix them. Push the improved version.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check if the code is well-organized: no major duplication, proper error handling, clean component structure.",
    passingScore: 50,
    buddyMood: "think",
    icon: "🐛",
  },
  {
    id: 15,
    worldId: 3,
    title: "App Boss",
    subtitle: "Ship a polished React app",
    type: "boss",
    xp: 250,
    duration: "15 min",
    teaches: "Building a complete, polished React application.",
    concepts: [
      "Components + state + Tailwind = real app",
      "Polish: hover effects, transitions, empty states",
      "Ship something you'd show to others",
    ],
    mission:
      "Build a polished React + Tailwind app: 3+ pages/views, interactive components, responsive design, consistent styling. Think: recipe app, task list, weather dashboard.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react", "tailwind"] },
      ],
      minFiles: 10,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: 3+ views, interactive components with state, Tailwind styling, responsive design, polished UI with hover states.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 4 — Level Up (L16-20) — PRO
  // Deeper patterns + TypeScript
  // ═══════════════════════════════════════
  {
    id: 16,
    worldId: 4,
    title: "Multiple Pages",
    subtitle: "Routing and navigation",
    type: "setup",
    xp: 75,
    duration: "8 min",
    teaches: "How apps show different content based on the URL.",
    concepts: [
      "Routing = URL decides what user sees",
      "Navigation patterns: sidebar, tabs, top bar",
      "Tell AI the URL structure you want",
    ],
    mission:
      "Add routing to your React app. At least 4 pages with navigation, active link styling, and a 404 page.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react-router"] },
      ],
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for routing with 4+ pages, navigation component, active link styling, 404 handling.",
    passingScore: 55,
    buddyMood: "idle",
    icon: "🗺️",
  },
  {
    id: 17,
    worldId: 4,
    title: "Talking to the Internet",
    subtitle: "APIs and data fetching",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "How your app gets data from other services.",
    concepts: [
      "APIs = your app asking another computer for data",
      "Every data request has 3 states: loading, success, error",
      "Always tell AI to handle all 3 states",
    ],
    mission:
      "Build an app that fetches data from a public API and displays it. Must show loading state, error state, and the data.",
    githubChecks: {
      hasPackageJson: true,
      minFiles: 6,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for API data fetching with all 3 states: loading indicator, error handling, and data display. Data should come from a real API.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🌐",
  },
  {
    id: 18,
    worldId: 4,
    title: "TypeScript = Better Prompts",
    subtitle: "Types help AI write better code",
    type: "practice",
    xp: 75,
    duration: "8 min",
    teaches: "TypeScript adds labels to your code so AI makes fewer mistakes.",
    concepts: [
      "Types = labels that help AI understand your data",
      ".tsx = same React, just with safety labels",
      "You don't write TypeScript — AI does. You just say 'use TypeScript'",
    ],
    mission:
      "Convert your app to TypeScript (.tsx files). All components should have typed props. AI does the conversion — you verify.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["typescript"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for TypeScript usage: .tsx files, typed props/interfaces, proper type annotations. Should compile without errors.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🏷️",
  },
  {
    id: 19,
    worldId: 4,
    title: "Smart Prompting",
    subtitle: "Breaking down big tasks",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "How to break complex apps into step-by-step AI prompts.",
    concepts: [
      "Don't ask AI to build everything at once",
      "Step-by-step prompts give better results",
      "Each step: describe → generate → verify → next",
    ],
    mission:
      "Build a medium-complexity app by breaking it into 4+ steps. Each step should be a separate commit showing incremental progress.",
    githubChecks: {
      hasPackageJson: true,
      minCommits: 4,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check commit history for incremental, step-by-step development. The app should show clear progression from simple to complex.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🧠",
  },
  {
    id: 20,
    worldId: 4,
    title: "Dashboard Boss",
    subtitle: "Ship a complex web app",
    type: "boss",
    xp: 300,
    duration: "15 min",
    teaches: "Building a complex, multi-view application.",
    concepts: [
      "Dashboard = sidebar + cards + tables + charts",
      "Complex apps need: routing, data, TypeScript",
      "Polish makes it feel professional",
    ],
    mission:
      "Build a dashboard app: sidebar navigation, 4+ pages, stat cards, data table, responsive design, TypeScript. Think: admin panel or analytics dashboard.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react", "tailwind", "typescript"] },
      ],
      minFiles: 12,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: sidebar nav, 4+ pages, stat cards, data table/list, responsive Tailwind, TypeScript, hover states, transitions.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 5 — Next Level (L21-25) — PRO
  // Next.js framework
  // ═══════════════════════════════════════
  {
    id: 21,
    worldId: 5,
    title: "Why Frameworks?",
    subtitle: "React alone isn't enough",
    type: "setup",
    xp: 75,
    duration: "8 min",
    teaches: "Why Next.js exists and what problems it solves.",
    concepts: [
      "React alone: slow first load, invisible to Google, no backend",
      "Next.js = React + speed + SEO + backend",
      "Tell AI: 'use Next.js with App Router'",
    ],
    mission:
      "Create a Next.js project with at least 3 pages using the App Router. Explore the folder structure.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["next"] },
      ],
      fileExists: ["src/app/layout.tsx"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for proper Next.js App Router structure: layout.tsx, 3+ page.tsx files in route folders.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "🚀",
  },
  {
    id: 22,
    worldId: 5,
    title: "Pages from Files",
    subtitle: "File-based routing and layouts",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "In Next.js, creating a file automatically creates a page.",
    concepts: [
      "File = page (app/about/page.tsx → /about)",
      "Layouts wrap pages (shared nav, footer)",
      "No routing setup needed — folders ARE the URLs",
    ],
    mission:
      "Build a Next.js app with 4+ pages, shared layout with navigation, and consistent styling across all pages.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["src/app/layout.tsx"],
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for 4+ pages using file-based routing, shared layout.tsx with navigation, consistent Tailwind styling.",
    passingScore: 55,
    buddyMood: "think",
    icon: "📁",
  },
  {
    id: 23,
    worldId: 5,
    title: "Server & Client",
    subtitle: "Two types of components",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "Server components are fast, client components are interactive.",
    concepts: [
      "Server components = pre-cooked, fast, can access database",
      "Client components = interactive, run in browser",
      "loading.tsx and error.tsx handle waiting and failures",
    ],
    mission:
      "Add loading.tsx and error.tsx to your Next.js app. Have at least one client component with 'use client' and interactivity.",
    githubChecks: {
      hasPackageJson: true,
      minFiles: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: loading.tsx, error.tsx, proper 'use client' usage, mix of server and client components.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "⚙️",
  },
  {
    id: 24,
    worldId: 5,
    title: "App Architecture",
    subtitle: "How real apps are organized",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "Organizing code by feature, not file type.",
    concepts: [
      "Organize by feature, not by type",
      "Good structure makes AI output more consistent",
      "Describe your folder structure in prompts",
    ],
    mission:
      "Reorganize your app with a clean architecture. Components, utilities, and pages should be well-organized. Add a README describing the structure.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["README.md"],
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for clean project structure: organized folders, separated concerns, README. Should be easy to understand at a glance.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🏗️",
  },
  {
    id: 25,
    worldId: 5,
    title: "Next.js Boss",
    subtitle: "Ship a complete Next.js app",
    type: "boss",
    xp: 300,
    duration: "15 min",
    teaches: "Building a complete, well-architected Next.js application.",
    concepts: [
      "Next.js + TypeScript + Tailwind = modern stack",
      "Layouts, loading, error handling = professional feel",
      "Clean architecture = maintainable code",
    ],
    mission:
      "Build a complete Next.js app: 5+ pages, shared layout, loading/error states, responsive Tailwind, TypeScript, clean architecture. Think: blog, portfolio, or product showcase.",
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
    aiReviewPrompt:
      "Boss level. Check for: 5+ pages, layout.tsx, loading/error states, Tailwind, TypeScript, responsive design, clean structure.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 6 — Full Stack (L26-30) — PRO
  // Database, API, Auth
  // ═══════════════════════════════════════
  {
    id: 26,
    worldId: 6,
    title: "Your App Needs Memory",
    subtitle: "What databases do",
    type: "setup",
    xp: 75,
    duration: "8 min",
    teaches: "Databases give your app permanent memory.",
    concepts: [
      "Database = permanent memory (data survives refresh)",
      "Think about data BEFORE coding: what entities? how connected?",
      "Prisma = you describe data, it handles the database",
    ],
    mission:
      "Add Prisma to your Next.js project. Define a schema with at least 2 models and proper fields.",
    githubChecks: {
      fileExists: ["prisma/schema.prisma"],
      fileContains: [
        { path: "prisma/schema.prisma", contains: ["model"] },
        { path: "package.json", contains: ["prisma"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Prisma schema with at least 2 models, proper field types, and meaningful structure.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "🗄️",
  },
  {
    id: 27,
    worldId: 6,
    title: "Connected Data",
    subtitle: "Relations between models",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "How different types of data connect to each other.",
    concepts: [
      "Relations = how data connects (User HAS Posts)",
      "One-to-many: user has many tasks",
      "Describe relationships in your prompt",
    ],
    mission:
      "Update your Prisma schema with at least one relation between models. User should have related data (posts, tasks, or items).",
    githubChecks: {
      fileContains: [
        { path: "prisma/schema.prisma", contains: ["@relation"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for at least one proper relation in Prisma schema. Models should be connected meaningfully.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔗",
  },
  {
    id: 28,
    worldId: 6,
    title: "The API Layer",
    subtitle: "Frontend talks to database",
    type: "practice",
    xp: 125,
    duration: "12 min",
    teaches: "API routes are the bridge between your UI and database.",
    concepts: [
      "API = waiter between app and database",
      "CRUD = create, read, update, delete (the 4 things apps do)",
      "Every API route: what method + what it does + what it returns",
    ],
    mission:
      "Create API routes for full CRUD on one model. GET (list), POST (create), PUT (update), DELETE. All connected to Prisma.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next", "prisma"] },
      ],
      minFiles: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for CRUD API routes with Prisma queries: GET list, POST create, PUT update, DELETE. Proper HTTP methods and responses.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔌",
  },
  {
    id: 29,
    worldId: 6,
    title: "Who Are You?",
    subtitle: "Authentication and login",
    type: "practice",
    xp: 150,
    duration: "15 min",
    teaches: "Auth protects user data and personalizes the experience.",
    concepts: [
      "Auth = bouncer checking who you are",
      "OAuth = let Google/GitHub verify identity (safer)",
      "Protected routes redirect anonymous users to login",
    ],
    mission:
      "Add authentication: sign-in page, user profile display, sign-out, protected routes that require login.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next-auth"] },
      ],
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for auth setup: sign-in page, sign-out, session handling, protected routes, user profile display.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔐",
  },
  {
    id: 30,
    worldId: 6,
    title: "Full Stack Boss",
    subtitle: "Ship a complete SaaS",
    type: "boss",
    xp: 350,
    duration: "20 min",
    teaches: "Building a complete full-stack application.",
    concepts: [
      "Full stack = frontend + backend + database + auth",
      "SaaS = software people use (and pay for)",
      "The goal: user can sign in, create data, see their data",
    ],
    mission:
      "Build a complete SaaS: auth, database with Prisma, CRUD API, 3+ pages, responsive UI. Users sign in, create/edit/delete items, see their data.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["prisma/schema.prisma", "src/app/layout.tsx"],
      fileContains: [
        { path: "package.json", contains: ["next", "prisma", "next-auth"] },
      ],
      minFiles: 15,
      minCommits: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: auth flow, Prisma schema with relations, CRUD API routes, 3+ pages, forms, responsive Tailwind, error handling.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 7 — Ship It (L31-35) — PRO
  // Deploy, errors, SEO, analytics
  // ═══════════════════════════════════════
  {
    id: 31,
    worldId: 7,
    title: "Going Live",
    subtitle: "Deploy to the internet",
    type: "setup",
    xp: 100,
    duration: "10 min",
    teaches: "Deployment makes your app accessible to everyone.",
    concepts: [
      "Deployment = putting your app on the internet",
      "Environment variables = secrets your app needs",
      "NEVER put secrets in code — always in platform settings",
    ],
    mission:
      "Deploy your app to Vercel or Railway. Add deployment config and .env.example listing required variables.",
    githubChecks: {
      hasDeploy: true,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for deployment config (vercel.json, railway.toml, or Dockerfile). Look for .env.example and proper env variable handling.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "🌐",
  },
  {
    id: 32,
    worldId: 7,
    title: "When Things Break",
    subtitle: "Error handling and debugging",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "Good apps handle errors gracefully instead of crashing.",
    concepts: [
      "Errors are normal — handle them, don't fear them",
      "error.tsx, loading.tsx, not-found.tsx = safety nets",
      "Describe errors clearly to AI: what happened, what you expected",
    ],
    mission:
      "Add error handling: error.tsx, loading.tsx, not-found.tsx, try/catch in API routes. No more white screens.",
    githubChecks: {
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: error.tsx, loading.tsx, not-found.tsx, try/catch in API routes, user-friendly error messages.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🛡️",
  },
  {
    id: 33,
    worldId: 7,
    title: "Get Found & Shared",
    subtitle: "SEO and analytics",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "SEO helps Google find you. Analytics tells you if anyone came.",
    concepts: [
      "SEO = how Google finds and shows your site",
      "OG tags = how links look when shared on social media",
      "Analytics = tracking what users actually do",
    ],
    mission:
      "Add SEO (meta tags, OG tags, sitemap, robots.txt) and basic analytics tracking to your app.",
    githubChecks: {
      fileExists: ["public/robots.txt"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: metadata exports, OG tags, sitemap, robots.txt, analytics setup, unique page titles.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔍",
  },
  {
    id: 34,
    worldId: 7,
    title: "Polish",
    subtitle: "The details that matter",
    type: "practice",
    xp: 100,
    duration: "10 min",
    teaches: "Small details make apps feel 50% more professional.",
    concepts: [
      "Loading skeletons, hover effects, smooth transitions",
      "Empty states: what shows when there's no data yet",
      "Mobile-first: test on a phone-sized screen",
    ],
    mission:
      "Polish your app: add loading skeletons, hover effects, empty states, smooth transitions. Test on mobile.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for polish: loading skeletons or spinners, hover effects on clickable elements, empty states, mobile responsiveness, smooth transitions.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "✨",
  },
  {
    id: 35,
    worldId: 7,
    title: "Launch Boss",
    subtitle: "Production-ready app",
    type: "boss",
    xp: 400,
    duration: "20 min",
    teaches: "Preparing a product for real users.",
    concepts: [
      "Launch readiness: errors, SEO, mobile, performance",
      "Test everything a real user would do",
      "Would you share this URL publicly?",
    ],
    mission:
      "Make your app launch-ready: deployed, error handling, SEO, analytics, mobile responsive, polished UI. The full package.",
    githubChecks: {
      hasDeploy: true,
      minFiles: 20,
      minCommits: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Full audit: deployment, error handling, loading states, SEO, mobile responsiveness, analytics, polish. Launch-ready?",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 8 — Get Paid (L36-40) — PRO
  // Payments, landing, retention
  // ═══════════════════════════════════════
  {
    id: 36,
    worldId: 8,
    title: "Money Moves",
    subtitle: "Accept payments online",
    type: "setup",
    xp: 125,
    duration: "12 min",
    teaches: "How online payments work — you never touch credit cards.",
    concepts: [
      "Payment providers (Stripe) handle the money",
      "Webhooks = Stripe tells your app 'they paid'",
      "Never store credit card data, never trust client-side",
    ],
    mission:
      "Add payment integration: pricing page, checkout flow, webhook handler for payment events.",
    githubChecks: {
      minFiles: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: pricing page, checkout redirect, webhook handler for payment events, plan field in user model.",
    passingScore: 55,
    buddyMood: "idle",
    icon: "💳",
  },
  {
    id: 37,
    worldId: 8,
    title: "The Landing Page",
    subtitle: "Convert visitors to users",
    type: "practice",
    xp: 125,
    duration: "15 min",
    teaches: "Landing pages have one job: convince visitors to act.",
    concepts: [
      "Hero → Problem → Solution → Features → Proof → Pricing → CTA",
      "One clear call-to-action, not five",
      "Social proof builds trust (testimonials, numbers)",
    ],
    mission:
      "Build a conversion-optimized landing page: hero, problem/solution, features, social proof, pricing, FAQ, clear CTAs.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review for conversion: hero with value prop, problem/solution, features, social proof, pricing, FAQ, CTAs. Should feel real.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🎯",
  },
  {
    id: 38,
    worldId: 8,
    title: "Keep Them Coming Back",
    subtitle: "Retention and engagement",
    type: "practice",
    xp: 125,
    duration: "15 min",
    teaches: "Getting users to sign up is half the battle — keeping them is the other half.",
    concepts: [
      "Onboarding = guide new users to their 'aha moment'",
      "Engagement hooks: emails, notifications, streaks",
      "Gamification: points, progress bars, milestones",
    ],
    mission:
      "Add retention features: onboarding flow for new users, email notifications, and at least one gamification element (streaks, progress, or badges).",
    githubChecks: {
      minFiles: 18,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: onboarding flow, email/notification triggers, gamification element. Integrated into app flow, not afterthoughts.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔄",
  },
  {
    id: 39,
    worldId: 8,
    title: "The Complete Product",
    subtitle: "From project to product",
    type: "practice",
    xp: 150,
    duration: "15 min",
    teaches: "The gap between 'it works on my laptop' and 'strangers can use it'.",
    concepts: [
      "Projects work for you, products work for strangers",
      "Edge cases: what if no data? what if slow connection?",
      "Security: validate inputs, protect routes, verify webhooks",
    ],
    mission:
      "Audit and fix your product: handle edge cases, validate inputs, secure webhook handlers, add empty states, test as a new user.",
    githubChecks: {
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for product quality: input validation, secure webhooks, empty states, edge case handling. Would a stranger be able to use this?",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔒",
  },
  {
    id: 40,
    worldId: 8,
    title: "Graduate",
    subtitle: "Your app is live and earning",
    type: "boss",
    xp: 500,
    duration: "15 min",
    teaches: "You built a real product. Ship it, share it, earn from it.",
    concepts: [
      "Ship > perfect — launch before you're ready",
      "Your first revenue proves the model works",
      "You just learned to build anything with AI",
    ],
    mission:
      "The final mission: live app, accepting payments, complete user journey from landing to paid feature. Deploy, share, start getting users. This is graduation.",
    githubChecks: {
      hasDeploy: true,
      minFiles: 25,
      minCommits: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Final boss. Full product audit: deployment, payments, complete user journey (landing → sign up → use → pay), polished UI, error handling, SEO, emails. Would this earn money?",
    passingScore: 65,
    buddyMood: "celebrate",
    icon: "🎓",
  },
];

export function getLevelsForWorld(worldId: number): Level[] {
  return LEVELS.filter((l) => l.worldId === worldId);
}

export function getWorld(worldId: number): World | undefined {
  return WORLDS.find((w) => w.id === worldId);
}

export function getLevel(levelId: number): Level | undefined {
  const level = LEVELS.find((l) => l.id === levelId);
  if (level) {
    return { ...level, blocks: getBlocksForLevel(levelId) };
  }
  return undefined;
}

/**
 * Check whether a world is unlocked for a user.
 * - Worlds 1-2 are free.
 * - Worlds 3+ require PRO plan.
 * - Previous world must be fully completed.
 */
export function isWorldUnlocked(
  worldId: number,
  completions: { levelId: number }[],
  plan: string
): boolean {
  if (worldId === 1) return true;
  if (plan !== "PRO") return false;
  const prevWorldLevels = getLevelsForWorld(worldId - 1);
  const completedIds = new Set(completions.map((c) => c.levelId));
  return prevWorldLevels.every((l) => completedIds.has(l.id));
}
