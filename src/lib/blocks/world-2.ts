import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 2 — Build Mode (Levels 6-10)
// Patterns: Component Request, Layout, Breaking Down Complexity
// ═══════════════════════════════════════

export const WORLD_2_BLOCKS: Block[] = [
  // ─── Level 6: Package Manager (4 blocks) ───
  {
    id: "L6B1",
    levelId: 6,
    type: "theory",
    title: "Modern Project Structure",
    xp: 10,
    required: true,
    order: 1,
    content: `# Modern Project Structure

Real projects don't live in single HTML files. They use **package managers** to organize code and dependencies.

## package.json

This file is your project's manifest. It lists:
- **name** — your project name
- **dependencies** — libraries your project needs
- **scripts** — commands to run (build, start, test)

## npm (Node Package Manager)

\`\`\`bash
npm init -y          # Create package.json
npm install react    # Add a dependency
npm run dev          # Run a script
\`\`\`

## .gitignore

The \`node_modules\` folder contains thousands of files from dependencies. **Never commit it to git.** Add it to \`.gitignore\`:

\`\`\`
node_modules/
.env
\`\`\`

## For your prompts

When asking AI to create a modern project, say: "Initialize with npm, include package.json with dependencies, and add a .gitignore that excludes node_modules."`,
    miniQuiz: [
      {
        question: "Why should node_modules be in .gitignore?",
        options: [
          "It contains secret passwords",
          "It has thousands of files that can be reinstalled with npm install",
          "It makes JavaScript run slower",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L6B2",
    levelId: 6,
    type: "prompt",
    title: "Write a Project Setup Prompt",
    xp: 15,
    required: true,
    order: 2,
    scaffold: "template",
    goal: "Write a prompt to initialize a modern project with npm",
    referencePrompt:
      "Create a new project with npm. Initialize package.json, install React and React DOM as dependencies. Add a .gitignore file that excludes node_modules, .env, and dist folders. Create a basic src/index.js entry point that renders a 'Hello World' React component.",
    template:
      "Create a new project with ___. Initialize ___, install ___ as dependencies. Add a ___ file that excludes ___. Create a basic ___ entry point.",
    hints: [
      "Specify the package manager",
      "List dependencies to install",
      "Mention .gitignore entries",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L6B3",
    levelId: 6,
    type: "build",
    title: "Set Up Your Project",
    xp: 30,
    required: true,
    order: 3,
    mission:
      "Initialize a project with npm. Create package.json with at least one dependency and .gitignore excluding node_modules.",
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
  },
  {
    id: "L6B4",
    levelId: 6,
    type: "experiment",
    title: "What's Inside node_modules?",
    xp: 10,
    required: false,
    order: 4,
    description: "Peek inside node_modules to understand why we gitignore it.",
    steps: [
      {
        id: "L6B4S1",
        instruction:
          "Run `npm install` in your project, then count the files in node_modules. On Mac/Linux: `find node_modules -type f | wc -l`. On Windows: `dir /s /b node_modules | find /c /v \"\"`",
        expectedOutcome:
          "You'll see hundreds or thousands of files — even for a small project.",
        question: "How many files were in your node_modules?",
      },
      {
        id: "L6B4S2",
        instruction:
          "Delete node_modules (`rm -rf node_modules`), then run `npm install` again.",
        expectedOutcome:
          "Everything comes back. That's why we don't commit it — npm install recreates it from package.json.",
      },
    ],
  },

  // ─── Level 7: Component Thinking (5 blocks) ───
  {
    id: "L7B1",
    levelId: 7,
    type: "theory",
    title: "What Are Components?",
    xp: 10,
    required: true,
    order: 1,
    content: `# What Are Components?

Components are **reusable building blocks** for UI. Instead of one giant HTML file, you split your UI into pieces:

\`\`\`
App
├── Header
├── MainContent
│   ├── SearchBar
│   ├── ProductCard (×many)
│   └── Pagination
└── Footer
\`\`\`

## Why components?

- **Reuse** — Write once, use everywhere
- **Organize** — Each file does one thing
- **Maintain** — Change a button in one place, it updates everywhere

## React components

\`\`\`jsx
function ProductCard({ title, price }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>\${price}</p>
    </div>
  );
}
\`\`\`

- **Props** = inputs (data passed in)
- **State** = internal data that changes (e.g., isOpen, count)

## For your prompts

Tell AI exactly which components you need, what props they take, and how they connect.`,
  },
  {
    id: "L7B2",
    levelId: 7,
    type: "pattern",
    title: "Component Request Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "component-request",
    exercise: {
      goal: "Use the Component Request Pattern to describe a UserCard component",
      template: `Create a ___ React component that:
- Props: ___
- State: ___
- Renders: ___
- Handles: ___
- Styles: ___`,
      exampleFilled: `Create a UserCard React component that:
- Props: name (string), email (string), avatar (string URL)
- State: isFollowing (boolean)
- Renders: card with avatar image, name, email, follow button
- Handles: click follow button toggles isFollowing
- Styles: Tailwind — rounded-xl, shadow-md, p-4, hover:shadow-lg`,
    },
  },
  {
    id: "L7B3",
    levelId: 7,
    type: "prompt",
    title: "Write a Component Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "template",
    goal: "Write a prompt to create a React app with 3+ custom components",
    referencePrompt:
      "Create a React app with at least 3 custom components: 1) A Header component with the app name and navigation links. 2) A ProductCard component that takes props: name (string), price (number), imageUrl (string) — displays them in a styled card with a 'Add to Cart' button. 3) A ProductList component that renders multiple ProductCard components using an array of products stored in state. App.jsx should import and compose all three. Use functional components with hooks.",
    template:
      "Create a React app with at least 3 custom components: 1) A ___ component with ___. 2) A ___ component that takes props: ___ — displays them in ___. 3) A ___ component that renders multiple ___ using ___. App.jsx should import and compose all three.",
    hints: [
      "Name each component and its purpose",
      "Specify props with types for data components",
      "Describe how components connect",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L7B4",
    levelId: 7,
    type: "build",
    title: "Build With Components",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Create a React app with at least 3 custom components. Use props and state. Push to repo.",
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
      "Check for at least 3 custom React components, proper use of props and state. Components should be in separate files or clearly defined.",
    passingScore: 55,
  },
  {
    id: "L7B5",
    levelId: 7,
    type: "review",
    title: "Spot the Component Issues",
    xp: 15,
    required: false,
    order: 5,
    code: "import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      <h1>My App</h1>\n      <div className=\"card\">\n        <h3>Product 1</h3>\n        <p>$10</p>\n        <button>Add to Cart</button>\n      </div>\n      <div className=\"card\">\n        <h3>Product 2</h3>\n        <p>$20</p>\n        <button>Add to Cart</button>\n      </div>\n      <div className=\"card\">\n        <h3>Product 3</h3>\n        <p>$15</p>\n        <button>Add to Cart</button>\n      </div>\n    </div>\n  );\n}\n\nexport default App;",
    language: "jsx",
    description:
      "This React app was generated by AI. It works, but has structural problems. Can you spot them?",
    knownIssues: [
      {
        id: "L7B5I1",
        lineRange: [6, 20],
        description:
          "All three product cards are duplicated code — should be a reusable ProductCard component",
        severity: "critical",
      },
      {
        id: "L7B5I2",
        lineRange: [6, 20],
        description:
          "Product data is hardcoded in JSX — should come from an array and be mapped",
        severity: "warning",
      },
      {
        id: "L7B5I3",
        lineRange: [11, 11],
        description:
          "Button has no onClick handler — click does nothing",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },

  // ─── Level 8: Tailwind Power (4 blocks) ───
  {
    id: "L8B1",
    levelId: 8,
    type: "theory",
    title: "Utility-First CSS",
    xp: 10,
    required: true,
    order: 1,
    content: `# Tailwind CSS: Utility-First Styling

Instead of writing CSS files, Tailwind gives you utility classes:

\`\`\`html
<!-- Old way (custom CSS) -->
<div class="my-card">...</div>
<!-- .my-card { padding: 16px; border-radius: 8px; box-shadow: ... } -->

<!-- Tailwind way -->
<div class="p-4 rounded-lg shadow-md">...</div>
\`\`\`

## Why AI loves Tailwind

Tailwind makes AI-generated code **more consistent** because:
- No naming conflicts (no \`.card\` vs \`.card-wrapper\` confusion)
- Responsive is built in (\`md:flex\`, \`lg:grid-cols-3\`)
- Everything is in the HTML — no separate CSS files to manage

## Key Tailwind groups

| Category | Examples |
|----------|---------|
| Spacing | \`p-4\`, \`m-2\`, \`gap-3\`, \`space-y-4\` |
| Layout | \`flex\`, \`grid\`, \`grid-cols-3\`, \`justify-center\` |
| Size | \`w-full\`, \`h-screen\`, \`max-w-lg\` |
| Colors | \`bg-blue-500\`, \`text-white\`, \`border-gray-200\` |
| Responsive | \`sm:flex\`, \`md:grid-cols-2\`, \`lg:text-xl\` |
| Effects | \`shadow-md\`, \`rounded-xl\`, \`hover:bg-blue-600\` |

## For your prompts

Say "Use Tailwind CSS" and specify responsive breakpoints you need.`,
  },
  {
    id: "L8B2",
    levelId: 8,
    type: "pattern",
    title: "The Layout Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "layout-pattern",
    exercise: {
      goal: "Use the Layout Pattern to describe a responsive page layout",
      template: `Build a ___ layout:
- Structure: ___
- Responsive: mobile: ___, tablet: ___, desktop: ___
- Navigation: ___
- Content areas: ___`,
      exampleFilled: `Build a portfolio layout:
- Structure: sticky header, full-width hero, 2-column content below, footer
- Responsive: mobile: single column stack, tablet: hero shrinks, desktop: sidebar appears
- Navigation: logo left, nav links right, hamburger on mobile
- Content areas: hero has title + CTA, left column is project grid, right is bio sidebar`,
    },
  },
  {
    id: "L8B3",
    levelId: 8,
    type: "build",
    title: "Style With Tailwind",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Style your React app with Tailwind CSS. Build a responsive layout that works on mobile and desktop. No custom CSS files.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["tailwind"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Tailwind CSS usage across components. Look for responsive utilities (sm:, md:, lg:), flexbox/grid layouts, and consistent spacing.",
    passingScore: 55,
  },
  {
    id: "L8B4",
    levelId: 8,
    type: "debug",
    title: "Fix Tailwind Issues",
    xp: 15,
    required: false,
    order: 4,
    scenarios: [
      {
        id: "L8B4D1",
        title: "Missing responsive class",
        description:
          "This card grid shows 3 columns on all screen sizes, even on mobile where it looks cramped.",
        brokenCode: `<div className="grid grid-cols-3 gap-4">
  <div className="bg-white p-4 rounded-lg shadow">Card 1</div>
  <div className="bg-white p-4 rounded-lg shadow">Card 2</div>
  <div className="bg-white p-4 rounded-lg shadow">Card 3</div>
</div>`,
        language: "jsx",
        hint: "On mobile, 3 columns is too many. Use responsive prefixes.",
        expectedFix:
          "Change grid-cols-3 to grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      },
      {
        id: "L8B4D2",
        title: "Flexbox centering issue",
        description: "The content should be centered on the page but it's stuck at the top-left.",
        brokenCode: `<div className="flex">
  <div className="bg-blue-500 text-white p-8 rounded-xl">
    Centered Content
  </div>
</div>`,
        language: "jsx",
        hint: "flex alone isn't enough for centering. What classes handle centering and full height?",
        expectedFix:
          "Add items-center justify-center min-h-screen to the parent flex div",
      },
    ],
    passingCount: 1,
  },

  // ─── Level 9: Router & Navigation (4 blocks) ───
  {
    id: "L9B1",
    levelId: 9,
    type: "theory",
    title: "Client-Side Routing",
    xp: 10,
    required: true,
    order: 1,
    content: `# Client-Side Routing

In old websites, clicking a link loads a whole new page from the server. In modern apps, **routing happens in the browser** — only the content changes, not the whole page.

## React Router

React Router is the standard library for routing in React:

\`\`\`jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
</Routes>
\`\`\`

## Key concepts

- **Route** = URL path → component
- **Link** = navigate without page reload
- **404 page** = \`path="*"\` catches unknown URLs
- **Active links** = highlight the current page in nav

## For your prompts

Specify: how many routes, what each route shows, how navigation looks, and what happens for unknown URLs.`,
  },
  {
    id: "L9B2",
    levelId: 9,
    type: "prompt",
    title: "Write a Routing Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "template",
    goal: "Write a prompt to add routing with at least 3 pages and navigation",
    referencePrompt:
      "Add React Router to my app. Create routes for: Home (/), About (/about), Projects (/projects), and a 404 Not Found page for any other URL. Add a Navigation component with links to all pages — the current page's link should have a different color (active state). Each page should have a unique heading and some placeholder content. Wrap everything in a BrowserRouter.",
    template:
      "Add React Router to my app. Create routes for: ___ (/), ___ (___), ___ (___), and a ___ page for ___. Add a ___ component with links to all pages — the current page should ___. Each page should have ___.",
    hints: [
      "List all routes with their paths",
      "Mention the 404/catch-all route",
      "Describe active link styling",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L9B3",
    levelId: 9,
    type: "build",
    title: "Add Routing",
    xp: 40,
    required: true,
    order: 3,
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
      "Check for React Router setup with at least 3 routes, a navigation component, 404 handling, and active link indication.",
    passingScore: 55,
  },
  {
    id: "L9B4",
    levelId: 9,
    type: "pattern",
    title: "Breaking Down Complexity",
    xp: 15,
    required: true,
    order: 4,
    patternId: "breaking-down-complexity",
    exercise: {
      goal: "Practice breaking a big task into step-by-step prompts",
      template: `I'm building ___. Let's do it step by step.

Step 1: ___
Step 2: ___
Step 3: ___

Start with Step 1 only.`,
      exampleFilled: `I'm building a task manager app. Let's do it step by step.

Step 1: Create a basic TaskList component that renders 3 static tasks
Step 2: Add an input + button to create new tasks with state
Step 3: Add a checkbox to toggle task completion
Step 4: Add a delete button for each task
Step 5: Add routing — separate pages for All, Active, Completed tasks

Start with Step 1 only.`,
    },
  },

  // ─── Level 10: Dashboard Boss (3 blocks) ───
  {
    id: "L10B1",
    levelId: 10,
    type: "quiz",
    title: "World 2 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What does package.json do in a project?",
        options: [
          "Stores the project's database",
          "Lists project metadata, dependencies, and scripts",
          "Compiles JavaScript to machine code",
          "Manages user authentication",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the benefit of React components over a single HTML file?",
        options: [
          "They run faster",
          "Reusable pieces that can be organized, maintained, and composed together",
          "They don't need CSS",
          "They automatically handle routing",
        ],
        correctIndex: 1,
      },
      {
        question: "Why is Tailwind CSS good for AI-generated code?",
        options: [
          "It's the fastest CSS framework",
          "No naming conflicts, built-in responsive, everything in one file",
          "It replaces JavaScript",
          "It's the only CSS framework AI knows",
        ],
        correctIndex: 1,
      },
      {
        question: 'What does the Breaking Down Complexity pattern prevent?',
        options: [
          "Syntax errors",
          "Overwhelming the AI with too much at once, leading to messy output",
          "Using too many npm packages",
          "Server crashes",
        ],
        correctIndex: 1,
      },
      {
        question: 'What does path="*" do in React Router?',
        options: [
          "Matches the home page",
          "Catches all unmatched URLs (404 page)",
          "Makes all routes public",
          "Enables wildcard imports",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 3,
  },
  {
    id: "L10B2",
    levelId: 10,
    type: "prompt",
    title: "Design Your Dashboard Prompt",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "template",
    goal: "Write a comprehensive prompt for a dashboard application",
    referencePrompt:
      "Build a complete dashboard app with React, React Router, and Tailwind CSS. Structure: fixed sidebar (240px) with navigation links (Dashboard, Users, Analytics, Settings), a top header bar with search and user avatar, and a scrollable main content area. Pages: 1) Dashboard — 4 stat cards (users, revenue, orders, growth) with icons and percentage changes, plus a recent activity list. 2) Users — data table with name, email, role, status columns, sortable headers. 3) Analytics — placeholder charts area with stat summaries. 4) Settings — form with profile settings. Responsive: sidebar collapses to hamburger on mobile. Polish: hover effects, smooth transitions, active nav highlighting.",
    template:
      "Build a complete dashboard app with React, React Router, and Tailwind. Structure: ___ sidebar with navigation (___), a top header with ___, and a scrollable main area. Pages: 1) Dashboard — ___ stat cards with ___. 2) ___ — data table with ___. 3) ___ — ___. 4) ___ — ___. Responsive: ___. Polish: ___.",
    hints: [
      "Describe the overall layout structure",
      "List all pages with their content",
      "Specify responsive behavior",
      "Mention polish details (hover, transitions)",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L10B3",
    levelId: 10,
    type: "build",
    title: "Ship Your Dashboard",
    xp: 200,
    required: true,
    order: 3,
    mission:
      "Build a complete dashboard: sidebar nav, 4+ pages, stat cards, data table, responsive design. Think admin panel.",
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
      "Boss level — be thorough. Check for: sidebar nav, 4+ pages/views, stat cards, data table/list, responsive design, Tailwind styling, polished UI.",
    passingScore: 60,
  },
];
