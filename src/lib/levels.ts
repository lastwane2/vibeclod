import type { Level, World } from "@/types";

export const WORLDS: World[] = [
  {
    id: 1,
    title: "Hello, Vibe",
    subtitle: "Your first steps with AI coding",
    color: "#E8A445",
    accentColor: "#D4932E",
    icon: "🌱",
    requiredPlan: "FREE",
  },
  {
    id: 2,
    title: "Build Mode",
    subtitle: "Real apps, real frameworks",
    color: "#5B8DEF",
    accentColor: "#4A7AD6",
    icon: "🔨",
    requiredPlan: "PRO",
  },
  {
    id: 3,
    title: "Full Stack",
    subtitle: "Databases, APIs, auth",
    color: "#9B6EC6",
    accentColor: "#8A5DB5",
    icon: "🗄️",
    requiredPlan: "PRO",
  },
  {
    id: 4,
    title: "Ship It",
    subtitle: "Deploy, domain, users",
    color: "#E06B6B",
    accentColor: "#CC5555",
    icon: "🚀",
    requiredPlan: "PRO",
  },
  {
    id: 5,
    title: "Get Paid",
    subtitle: "Monetize what you built",
    color: "#4CAF50",
    accentColor: "#3D9140",
    icon: "💰",
    requiredPlan: "PRO",
  },
];

export const LEVELS: Level[] = [
  // ═══════════════════════════════════════
  // WORLD 1 — Hello, Vibe (FREE)
  // ═══════════════════════════════════════
  {
    id: 1,
    worldId: 1,
    title: "Your First Prompt",
    subtitle: "Talk to AI, get code",
    type: "setup",
    xp: 50,
    duration: "30 min",
    teaches: "How to talk to AI and get working code.",
    concepts: [
      "A prompt = task + context + format",
      "AI generates code from scratch",
      "Start simple, iterate later",
    ],
    mission:
      "Generate an HTML page with a headline and button via any AI tool. Push to your repo as index.html.",
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
    title: "Style It Up",
    subtitle: "Make it look good with CSS",
    type: "practice",
    xp: 75,
    duration: "45 min",
    teaches: "How to use AI to add styling and make pages look professional.",
    concepts: [
      "CSS basics: colors, fonts, spacing",
      "AI can style existing code",
      "Iterate on design with follow-up prompts",
    ],
    mission:
      "Add CSS to your index.html — custom colors, fonts, centered layout. It should look like a real landing page, not a default HTML page.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["style", "color", "font"] },
      ],
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review the CSS styling. Does it look intentional and polished? Check for custom colors, proper fonts, centered layout. Should not look like unstyled HTML.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🎨",
  },
  {
    id: 3,
    worldId: 1,
    title: "Multi-Page Magic",
    subtitle: "Build a mini website",
    type: "practice",
    xp: 100,
    duration: "1 hour",
    teaches: "How to create multiple linked pages and navigate between them.",
    concepts: [
      "HTML links connect pages",
      "Consistent navigation across pages",
      "AI can scaffold multi-file projects",
    ],
    mission:
      "Create at least 3 HTML pages (index, about, contact) with a shared navigation bar. All pages should link to each other.",
    githubChecks: {
      fileExists: ["index.html", "about.html", "contact.html"],
      fileContains: [
        { path: "index.html", contains: ["<a", "href"] },
        { path: "about.html", contains: ["<a", "href"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check that there are at least 3 HTML pages with working navigation between them. Pages should have distinct content and a shared nav bar.",
    passingScore: 55,
    buddyMood: "think",
    icon: "📄",
  },
  {
    id: 4,
    worldId: 1,
    title: "Make It Interactive",
    subtitle: "JavaScript enters the chat",
    type: "practice",
    xp: 125,
    duration: "1 hour",
    teaches: "How to add interactivity with JavaScript via AI prompts.",
    concepts: [
      "JavaScript makes pages interactive",
      "Event listeners respond to clicks",
      "DOM manipulation changes what users see",
    ],
    mission:
      "Add JavaScript interactivity — a button that shows/hides content, a counter, or a form that validates input. Something users can click and see change.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [{ path: "index.html", contains: ["<script", "function"] }],
      minCommits: 4,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review the JavaScript. Is there genuine interactivity? Look for event listeners, DOM manipulation, user-triggered behavior. It should DO something when clicked.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "⚡",
  },
  {
    id: 5,
    worldId: 1,
    title: "Portfolio Boss",
    subtitle: "Ship your first real site",
    type: "boss",
    xp: 250,
    duration: "2 hours",
    teaches: "How to combine everything into a polished portfolio site.",
    concepts: [
      "Combine HTML, CSS, and JS into a real project",
      "Portfolio sites show your work",
      "Polish matters — details make it professional",
    ],
    mission:
      "Build a complete personal portfolio site: hero section, about, projects section (at least 2), contact form, responsive design. This is your first real ship.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        {
          path: "index.html",
          contains: ["<form", "project", "style", "<script"],
        },
      ],
      minCommits: 5,
      minFiles: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "This is a boss level — be thorough. Check for: hero section, about section, at least 2 project cards, contact form, responsive design, polished CSS. Should look like a real portfolio someone would share.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 2 — Build Mode (PRO)
  // ═══════════════════════════════════════
  {
    id: 6,
    worldId: 2,
    title: "Package Manager",
    subtitle: "npm init your project",
    type: "setup",
    xp: 75,
    duration: "30 min",
    teaches: "How modern projects are structured with package.json and npm.",
    concepts: [
      "package.json is your project manifest",
      "npm install adds dependencies",
      "node_modules should be in .gitignore",
    ],
    mission:
      "Initialize a new project with npm. Create a package.json, add at least one dependency, and set up a .gitignore that excludes node_modules.",
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
      "Check for a valid package.json with at least one dependency, a .gitignore excluding node_modules. Project should be set up properly.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "📦",
  },
  {
    id: 7,
    worldId: 2,
    title: "Component Thinking",
    subtitle: "Build with React",
    type: "practice",
    xp: 100,
    duration: "1 hour",
    teaches: "How React components work and how AI can generate them.",
    concepts: [
      "Components are reusable UI building blocks",
      "Props pass data down",
      "State tracks things that change",
    ],
    mission:
      "Create a React app with at least 3 custom components. Use props to pass data between them. At least one component should have state.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["src/App.jsx"],
      fileContains: [
        { path: "package.json", contains: ["react"] },
        { path: "src/App.jsx", contains: ["import", "export"] },
      ],
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for at least 3 custom React components, proper use of props and state. Components should be in separate files or clearly defined. Look for useState.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🧩",
  },
  {
    id: 8,
    worldId: 2,
    title: "Tailwind Power",
    subtitle: "Utility-first styling",
    type: "practice",
    xp: 100,
    duration: "1 hour",
    teaches: "How to use Tailwind CSS for rapid, consistent styling.",
    concepts: [
      "Utility classes replace custom CSS",
      "Responsive design with breakpoint prefixes",
      "Tailwind makes AI-generated UI more consistent",
    ],
    mission:
      "Style your React app with Tailwind CSS. Build a responsive layout that looks good on mobile and desktop. Use Tailwind utilities — no custom CSS files.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["tailwind"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Tailwind CSS usage across components. Look for responsive utilities (sm:, md:, lg:), flexbox/grid layouts, and consistent spacing. Should be styled entirely with Tailwind.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🌊",
  },
  {
    id: 9,
    worldId: 2,
    title: "Router & Navigation",
    subtitle: "Multi-page React apps",
    type: "practice",
    xp: 125,
    duration: "1.5 hours",
    teaches: "How to add client-side routing and navigation to React apps.",
    concepts: [
      "React Router handles page navigation",
      "Routes map URLs to components",
      "Links navigate without full page reload",
    ],
    mission:
      "Add routing to your React app. At least 3 pages with navigation, a 404 page, and active link styling.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react-router"] },
      ],
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for React Router setup with at least 3 routes, a navigation component, 404 handling, and active link indication. Navigation should work between pages.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🗺️",
  },
  {
    id: 10,
    worldId: 2,
    title: "Dashboard Boss",
    subtitle: "Ship a complete web app",
    type: "boss",
    xp: 300,
    duration: "3 hours",
    teaches: "How to combine React, routing, and Tailwind into a real app.",
    concepts: [
      "Real apps have layout, nav, and multiple views",
      "Dashboard patterns: sidebar, cards, stats",
      "Polish: loading states, hover effects, transitions",
    ],
    mission:
      "Build a complete dashboard app: sidebar navigation, at least 4 pages, stat cards with data, a data table or list, and responsive design. Think admin panel.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["src/App.jsx"],
      fileContains: [
        { path: "package.json", contains: ["react", "tailwind"] },
      ],
      minFiles: 10,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level — be thorough. Check for: sidebar nav, 4+ pages/views, stat cards, data table/list, responsive design, Tailwind styling, polished UI with hover states and transitions. Should look like a real dashboard.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 3 — Full Stack (PRO)
  // ═══════════════════════════════════════
  {
    id: 11,
    worldId: 3,
    title: "Next.js Setup",
    subtitle: "The full-stack framework",
    type: "setup",
    xp: 75,
    duration: "30 min",
    teaches: "How to set up a Next.js project — the framework used by real startups.",
    concepts: [
      "Next.js = React + server + routing",
      "App Router uses folders for pages",
      "Server components render on the server",
    ],
    mission:
      "Create a Next.js project with the App Router. At least 3 pages with a shared layout and navigation. Deploy-ready structure.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["next"] },
      ],
      fileExists: ["src/app/layout.tsx"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for proper Next.js App Router structure: layout.tsx, at least 3 page.tsx files in separate route folders, shared navigation component.",
    passingScore: 50,
    buddyMood: "idle",
    icon: "⚙️",
  },
  {
    id: 12,
    worldId: 3,
    title: "Database Time",
    subtitle: "Prisma + PostgreSQL",
    type: "practice",
    xp: 125,
    duration: "1.5 hours",
    teaches: "How to add a database to your app with Prisma ORM.",
    concepts: [
      "Prisma schema defines your data model",
      "Migrations update the database",
      "Type-safe queries prevent bugs",
    ],
    mission:
      "Add Prisma to your Next.js project. Define at least 2 models with a relation between them. Create the schema file and generate the client.",
    githubChecks: {
      fileExists: ["prisma/schema.prisma"],
      fileContains: [
        { path: "prisma/schema.prisma", contains: ["model", "@relation"] },
        { path: "package.json", contains: ["prisma"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check the Prisma schema for at least 2 models with proper fields, types, and a relation between them. Schema should be valid and well-structured.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🗄️",
  },
  {
    id: 13,
    worldId: 3,
    title: "API Routes",
    subtitle: "Build your backend",
    type: "practice",
    xp: 125,
    duration: "1.5 hours",
    teaches: "How to create API endpoints in Next.js that talk to your database.",
    concepts: [
      "API routes handle server-side logic",
      "CRUD: Create, Read, Update, Delete",
      "HTTP methods: GET, POST, PUT, DELETE",
    ],
    mission:
      "Create API routes for full CRUD operations on one of your models. GET (list + single), POST (create), PUT (update), DELETE. Use Prisma to query the database.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next", "prisma"] },
      ],
      minFiles: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Next.js API route handlers with CRUD operations. Look for proper HTTP method handling, Prisma queries, error handling, and meaningful responses.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔌",
  },
  {
    id: 14,
    worldId: 3,
    title: "Auth Flow",
    subtitle: "Users can sign in",
    type: "practice",
    xp: 150,
    duration: "2 hours",
    teaches: "How to add authentication so users can sign up and log in.",
    concepts: [
      "Auth protects user data",
      "OAuth lets users sign in with existing accounts",
      "Sessions track who's logged in",
    ],
    mission:
      "Add authentication to your Next.js app. Users should be able to sign in (OAuth or credentials), see their profile, and sign out. Protected routes should redirect unauthenticated users.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next-auth"] },
      ],
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for NextAuth.js or similar auth setup. Look for: sign-in page, sign-out functionality, session handling, protected routes that redirect unauthenticated users, profile display.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🔐",
  },
  {
    id: 15,
    worldId: 3,
    title: "SaaS Boss",
    subtitle: "Ship a full-stack app",
    type: "boss",
    xp: 350,
    duration: "4 hours",
    teaches: "How to build a complete full-stack SaaS app from scratch.",
    concepts: [
      "SaaS = software people pay for monthly",
      "Combine auth + database + UI into a product",
      "Polish: forms, validation, feedback, empty states",
    ],
    mission:
      "Build a complete SaaS app: user auth, database with Prisma, CRUD operations, at least 3 pages, responsive UI. Users should be able to sign in, create/edit/delete items, and see their data. Think: todo app, note-taking, or expense tracker.",
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
      "Boss level — be thorough. Check for: user auth flow, Prisma schema with relations, CRUD API routes, at least 3 pages, forms with validation, responsive Tailwind UI, error handling, loading states. Should feel like a real product.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 4 — Ship It (PRO)
  // ═══════════════════════════════════════
  {
    id: 16,
    worldId: 4,
    title: "Domain & Deploy",
    subtitle: "Put it on the internet",
    type: "setup",
    xp: 100,
    duration: "1 hour",
    teaches: "How to deploy your app and connect a custom domain.",
    concepts: [
      "Deployment makes your app accessible",
      "Vercel/Railway handle hosting",
      "Environment variables keep secrets safe",
    ],
    mission:
      "Deploy your app to Vercel or Railway. Add a deployment config to your repo. The app should be accessible via a URL.",
    githubChecks: {
      hasDeploy: true,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for deployment configuration (vercel.json, railway.toml, or similar). Look for proper env variable handling and a production-ready setup.",
    passingScore: 50,
    buddyMood: "happy",
    icon: "🌐",
  },
  {
    id: 17,
    worldId: 4,
    title: "Error Handling",
    subtitle: "When things go wrong",
    type: "practice",
    xp: 100,
    duration: "1 hour",
    teaches: "How to handle errors gracefully so users don't see broken pages.",
    concepts: [
      "Try/catch prevents crashes",
      "Error boundaries catch React errors",
      "User-friendly error messages build trust",
    ],
    mission:
      "Add comprehensive error handling: error.tsx boundary, loading.tsx states, not-found.tsx page, try/catch in API routes, and user-friendly error messages.",
    githubChecks: {
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for error handling: error.tsx boundary, loading.tsx skeletons, not-found.tsx, try/catch in API routes, user-friendly error messages. App should fail gracefully.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🛡️",
  },
  {
    id: 18,
    worldId: 4,
    title: "SEO & Meta",
    subtitle: "Get found on Google",
    type: "practice",
    xp: 100,
    duration: "1 hour",
    teaches: "How to optimize your app for search engines and social sharing.",
    concepts: [
      "Meta tags tell search engines about your page",
      "OG images make social shares look good",
      "Sitemap helps Google find your pages",
    ],
    mission:
      "Add SEO optimization: proper meta tags on all pages, Open Graph tags for social sharing, a sitemap.xml, and robots.txt.",
    githubChecks: {
      fileExists: ["public/robots.txt"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for: metadata exports in layout/pages, Open Graph tags (title, description, image), sitemap generation, robots.txt. Pages should have unique, descriptive titles.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔍",
  },
  {
    id: 19,
    worldId: 4,
    title: "Analytics & Tracking",
    subtitle: "Understand your users",
    type: "practice",
    xp: 125,
    duration: "1.5 hours",
    teaches: "How to add analytics to understand how people use your app.",
    concepts: [
      "Analytics show what users actually do",
      "Events track specific actions",
      "Funnels reveal where users drop off",
    ],
    mission:
      "Add analytics to your app. Track page views and at least 3 custom events (sign-up, feature use, etc). Use PostHog, Plausible, or similar.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for analytics integration. Look for: analytics script/setup, page view tracking, at least 3 custom events being tracked on user actions. Should be non-invasive.",
    passingScore: 55,
    buddyMood: "think",
    icon: "📊",
  },
  {
    id: 20,
    worldId: 4,
    title: "Launch Boss",
    subtitle: "Ship to the world",
    type: "boss",
    xp: 400,
    duration: "4 hours",
    teaches: "How to prepare a product for public launch.",
    concepts: [
      "Launch readiness: error handling, SEO, analytics",
      "Landing pages convert visitors to users",
      "Launch checklist: accessibility, performance, mobile",
    ],
    mission:
      "Make your app launch-ready: polished landing page, error boundaries, loading states, SEO meta tags, analytics, mobile responsive, deployed and accessible. Would you share this URL publicly?",
    githubChecks: {
      hasDeploy: true,
      minFiles: 20,
      minCommits: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level — full audit. Check: landing page quality, error handling, loading states, SEO tags, mobile responsiveness, analytics integration, deployed config. Score based on launch-readiness.",
    passingScore: 60,
    buddyMood: "celebrate",
    icon: "👑",
  },

  // ═══════════════════════════════════════
  // WORLD 5 — Get Paid (PRO)
  // ═══════════════════════════════════════
  {
    id: 21,
    worldId: 5,
    title: "Payments Setup",
    subtitle: "Accept money online",
    type: "setup",
    xp: 125,
    duration: "1.5 hours",
    teaches: "How to integrate payments and start charging for your product.",
    concepts: [
      "Stripe/Whop handle payment processing",
      "Webhooks notify your app of payment events",
      "Never store credit card data yourself",
    ],
    mission:
      "Add a payment integration (Stripe, Whop, or LemonSqueezy). Create a checkout flow, pricing page, and webhook handler. User should be able to go from pricing to payment.",
    githubChecks: {
      minFiles: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for payment integration: pricing page, checkout redirect or embedded form, webhook handler for payment events, plan/subscription model in schema.",
    passingScore: 55,
    buddyMood: "idle",
    icon: "💳",
  },
  {
    id: 22,
    worldId: 5,
    title: "Email System",
    subtitle: "Welcome, notify, convert",
    type: "practice",
    xp: 100,
    duration: "1 hour",
    teaches: "How to send transactional emails to engage and retain users.",
    concepts: [
      "Transactional emails trigger on user actions",
      "Email APIs: Resend, SendGrid, Postmark",
      "Templates make emails look professional",
    ],
    mission:
      "Add email functionality. Set up Resend (or similar), create at least 2 email templates (welcome + notification), and trigger them from your app logic.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for email integration: API setup, at least 2 email templates with HTML/React, trigger logic from user actions. Emails should look professional.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "📧",
  },
  {
    id: 23,
    worldId: 5,
    title: "Landing Page Pro",
    subtitle: "Convert visitors to paying users",
    type: "practice",
    xp: 125,
    duration: "2 hours",
    teaches: "How to build landing pages that convince people to pay.",
    concepts: [
      "Hero → Problem → Solution → Proof → CTA",
      "Social proof builds trust",
      "Clear pricing reduces friction",
    ],
    mission:
      "Build a conversion-optimized landing page: compelling hero, problem/solution section, feature list, testimonials/social proof, pricing table, FAQ, and clear CTA buttons throughout.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review landing page for conversion optimization. Check: hero with clear value prop, problem/solution narrative, feature section, social proof, pricing, FAQ, multiple CTAs. Should feel like a real product page.",
    passingScore: 55,
    buddyMood: "think",
    icon: "🎯",
  },
  {
    id: 24,
    worldId: 5,
    title: "User Retention",
    subtitle: "Keep them coming back",
    type: "practice",
    xp: 150,
    duration: "2 hours",
    teaches: "How to add features that keep users engaged and returning.",
    concepts: [
      "Onboarding reduces initial friction",
      "Notifications bring users back",
      "Streaks and progress create habits",
    ],
    mission:
      "Add retention features: onboarding flow for new users, notification/email system for re-engagement, and at least one gamification element (streaks, points, progress bar).",
    githubChecks: {
      minFiles: 18,
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for retention features: onboarding flow, notification/email triggers, gamification element. These should be integrated into the app flow, not afterthoughts.",
    passingScore: 55,
    buddyMood: "happy",
    icon: "🔄",
  },
  {
    id: 25,
    worldId: 5,
    title: "First $100 Boss",
    subtitle: "Earn your first revenue",
    type: "boss",
    xp: 500,
    duration: "Ongoing",
    teaches: "How to launch, promote, and earn your first revenue as a builder.",
    concepts: [
      "Ship > perfect — launch before you're ready",
      "Promote where your users are",
      "Your first $100 proves the model works",
    ],
    mission:
      "The final mission: your app must be live, accepting payments, and have a complete user experience from landing page to paid feature. Deploy it, share it, and start getting users. This is graduation.",
    githubChecks: {
      hasDeploy: true,
      minFiles: 25,
      minCommits: 15,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Final boss — full product audit. Check: live deployment config, payment integration, complete user journey (landing → sign up → use → pay), polished UI, error handling, SEO, emails. Score based on: would this product earn money?",
    passingScore: 65,
    buddyMood: "celebrate",
    icon: "👑",
  },
];

export function getLevelsForWorld(worldId: number): Level[] {
  return LEVELS.filter((l) => l.worldId === worldId);
}

export function getWorld(worldId: number): World | undefined {
  return WORLDS.find((w) => w.id === worldId);
}

export function getLevel(levelId: number): Level | undefined {
  return LEVELS.find((l) => l.id === levelId);
}

/**
 * Check whether a world is unlocked for a user.
 * - World 1 is always unlocked.
 * - Worlds 2+ require PRO plan.
 * - Previous world must be fully completed (all 5 levels).
 */
export function isWorldUnlocked(
  worldId: number,
  completions: { levelId: number }[],
  plan: string
): boolean {
  if (worldId === 1) return true; // World 1 always unlocked
  if (plan !== "PRO") return false; // Worlds 2+ need PRO
  // Previous world must be fully completed (all 5 levels)
  const prevWorldLevels = getLevelsForWorld(worldId - 1);
  const completedIds = new Set(completions.map((c) => c.levelId));
  return prevWorldLevels.every((l) => completedIds.has(l.id));
}
