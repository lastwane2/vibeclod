import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 4 — Level Up (Levels 16-20)
// Deeper React + TypeScript
// Patterns: Breaking Down Complexity
// ═══════════════════════════════════════

export const WORLD_4_BLOCKS: Block[] = [
  // ─── Level 16: Multiple Pages (4 blocks) ───
  {
    id: "L16B1",
    levelId: 16,
    type: "theory",
    title: "Routing = TV Channels",
    xp: 10,
    required: true,
    order: 1,
    content: `# Routing = TV Channels

Think of URLs as TV channels:

- \`/home\` = Channel 1
- \`/about\` = Channel 2
- \`/settings\` = Channel 3

The URL decides what content shows on screen. **Routing** is just setting up these channels.

## How it works

When a user clicks a link, the URL changes. Your app sees the new URL and shows the matching page — without reloading the whole browser. It feels instant.

## For your prompts

Tell AI: **"Add routing with 4 pages"** and list what each page shows. AI creates the channel system for you. You just name the channels and describe what plays on each one.`,
  },
  {
    id: "L16B2",
    levelId: 16,
    type: "theory",
    title: "Navigation Patterns",
    xp: 10,
    required: true,
    order: 2,
    content: `# Navigation Patterns

Navigation is how users **switch between pages**. There are a few common patterns, and each fits different types of apps:

## Top bar
Links across the top of the page. Best for: blogs, landing pages, marketing sites. Simple and familiar.

## Sidebar
Links on the left side. Best for: dashboards, admin panels, tools. Gives room for many links and nested sections.

## Tabs
Switches within a single page. Best for: settings pages, profile sections. Keeps related content grouped together.

## Bottom bar
Icons at the bottom of the screen. Best for: mobile apps. Thumb-friendly and always visible.

## For your prompts

Name the pattern explicitly: **"Add a sidebar navigation with links to Dashboard, Users, and Settings."**

Don't just say "add navigation" — tell AI which pattern fits your app. The right navigation makes or breaks the user experience.`,
    miniQuiz: [
      {
        question: "Which navigation pattern is best for a dashboard?",
        options: [
          "Bottom bar",
          "Sidebar — gives room for many links and nested sections",
          "No navigation",
          "A single back button",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L16B3",
    levelId: 16,
    type: "prompt",
    title: "Write a Routing Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "template",
    goal: "Add routing and navigation to your React app",
    referencePrompt:
      "Add React Router to my app. Create 4 pages: Home (/), About (/about), Projects (/projects), Contact (/contact). Add a top navigation bar with links to all pages — highlight the current page with a different color. Add a 404 page for unknown URLs that says 'Page not found' with a link back to Home. Each page should have a unique heading and relevant placeholder content.",
    template:
      "Add React Router to my app. Create ___ pages: ___ (___), ___ (___), ___ (___), ___ (___). Add a ___ navigation bar with links to all pages — highlight the current page with ___. Add a ___ page for unknown URLs that ___. Each page should have ___.",
    passingThreshold: 2.5,
  },
  {
    id: "L16B4",
    levelId: 16,
    type: "build",
    title: "Add Navigation",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add routing with 4+ pages, navigation, active link styling, and a 404 page.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["react-router"] },
      ],
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for React Router with 4+ routes, a navigation component, active link highlighting, and a 404 catch-all page.",
    passingScore: 55,
  },

  // ─── Level 17: Talking to the Internet (4 blocks) ───
  {
    id: "L17B1",
    levelId: 17,
    type: "theory",
    title: "APIs = Asking Other Computers",
    xp: 10,
    required: true,
    order: 1,
    content: `# APIs = Asking Other Computers

Your weather app doesn't measure temperature. It **asks** a weather service.

An API is like a **phone number** your app calls:

"Hey weather API, what's the temp in London?" → "It's 12°C."

## APIs are everywhere

- Weather data, news headlines, movie databases
- Crypto prices, stock market, exchange rates
- Cat facts, random jokes, NASA photos
- Thousands of free public APIs exist

## For your prompts

Tell AI which API to use and what data you want. AI writes the code that makes the phone call and displays the answer.

You just say: **"Fetch movies from the OMDB API and display them in a grid."** AI handles the wiring.`,
  },
  {
    id: "L17B2",
    levelId: 17,
    type: "theory",
    title: "The Three States",
    xp: 10,
    required: true,
    order: 2,
    content: `# The Three States of Data Fetching

Every time your app asks for data, **three things** can happen:

## 1. Loading — "Hold on, asking..."

The request is in flight. Show a spinner, skeleton, or "Loading..." text. Never leave the screen blank.

## 2. Success — "Got it!"

Data arrived. Show it — a list of movies, a weather card, user profiles, whatever was requested.

## 3. Error — "Something went wrong"

The API is down, the internet cut out, or the request was bad. Show a message and a **retry button**.

## The golden rule

**ALWAYS tell AI to handle all 3 states.** This is the single biggest quality difference between amateur and professional apps.

**Bad prompt:** "Fetch and display users."

**Good prompt:** "Fetch users from the API. Show a loading spinner while fetching, display them in a grid on success, show an error message with a retry button on failure."

One extra sentence. Massively better result.`,
    miniQuiz: [
      {
        question: "How many states does every data request have?",
        options: [
          "1 — just show the data",
          "2 — loading and success",
          "3 — loading, success, and error",
          "5 — loading, success, error, timeout, retry",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "L17B3",
    levelId: 17,
    type: "prompt",
    title: "Write a Data Fetching Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "template",
    goal: "Build an app that fetches and displays data from an API",
    referencePrompt:
      "Build a movie search app that fetches from the OMDB API. Features: 1) Search input — when the user types and hits enter, fetch movies matching the query. 2) Loading state — show 'Searching...' with a spinner while fetching. 3) Results — show movie posters in a responsive grid with title and year below each poster. 4) Error state — if the API fails, show 'Something went wrong' with a retry button. 5) Empty state — if no results, show 'No movies found for [query]'.",
    template:
      "Build a ___ app that fetches from the ___ API. Features: 1) ___ input — when the user ___, fetch ___ matching ___. 2) Loading state — show '___' with a ___. 3) Results — show ___ in a responsive grid with ___. 4) Error state — if ___ fails, show '___' with a ___ button. 5) Empty state — if no results, show '___'.",
    passingThreshold: 2.5,
  },
  {
    id: "L17B4",
    levelId: 17,
    type: "build",
    title: "Fetch Real Data",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Build an app that fetches data from a public API. Must handle all three states: loading, success, and error.",
    githubChecks: {
      hasPackageJson: true,
      minFiles: 6,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for API data fetching from a real public API. Must show: loading state (spinner/skeleton), success state (data displayed), and error state (message + retry). All three are required.",
    passingScore: 55,
  },

  // ─── Level 18: TypeScript = Better Prompts (4 blocks) ───
  {
    id: "L18B1",
    levelId: 18,
    type: "theory",
    title: "Types = Labels for Data",
    xp: 10,
    required: true,
    order: 1,
    content: `# Types = Labels for Data

Imagine a moving box labeled: **"Kitchen — Plates (fragile)"**

You know exactly what's inside and how to handle it.

TypeScript does this for code. Instead of mystery data floating around, everything gets a **label**:

- This is a **User** with name (text) and age (number)
- This is a **Product** with title (text), price (number), and inStock (true/false)

## Why you should care

**YOU don't write TypeScript — AI does.** But saying **"use TypeScript"** in your prompts makes AI output dramatically better:

- **Fewer bugs** — TypeScript catches mistakes before they happen
- **Better autocomplete** — your editor knows what data is available
- **Clearer code** — anyone can read the labels and understand the data

## The one change to your prompts

Just add two words: **"Use TypeScript."**

That's it. Same React app, same components, same logic. But AI writes cleaner, safer code because it has to label everything.`,
  },
  {
    id: "L18B2",
    levelId: 18,
    type: "theory",
    title: ".tsx = .jsx + Safety",
    xp: 10,
    required: true,
    order: 2,
    content: `# .tsx = .jsx + Safety

Two file extensions that do the same thing, with one key difference:

- **.jsx** files = React components **without** labels
- **.tsx** files = React components **with** labels (TypeScript)

## Think of it like driving

Same car. Same road. But **.tsx** is driving with a GPS that catches wrong turns early, while **.jsx** is driving without one — you might get there, but you'll miss errors until they crash your app.

## For your prompts

Just say **"Use TypeScript"** or **"use .tsx files"**. AI handles the rest.

The only difference you'll notice: better error messages in your editor and fewer mysterious bugs in your app. TypeScript won't slow you down — it speeds you up by preventing problems before they happen.`,
    miniQuiz: [
      {
        question: "What does TypeScript add to your code?",
        options: [
          "Faster performance",
          "Labels (types) that describe data and catch errors early",
          "Better colors in the editor",
          "Automatic deployment",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L18B3",
    levelId: 18,
    type: "experiment",
    title: "See the Difference",
    xp: 15,
    required: true,
    order: 3,
    description:
      "Compare JavaScript and TypeScript output from AI to see what TypeScript adds.",
    steps: [
      {
        id: "L18B3S1",
        instruction:
          "Ask your AI: \"Create a UserCard component in React (.jsx) that shows name, email, and avatar.\" Save or screenshot the output.",
        expectedOutcome:
          "AI creates a component that works but has no type annotations — props are untyped.",
        question:
          "Looking at the code, can you tell what data types name, email, and avatar should be?",
      },
      {
        id: "L18B3S2",
        instruction:
          "Now ask AI the exact same thing but \"in TypeScript (.tsx)\". Compare both outputs side by side.",
        expectedOutcome:
          "The TypeScript version has type definitions (like an interface or type alias) that explicitly describe what data the component expects — name: string, email: string, avatarUrl: string.",
        question:
          "What extra information does the TypeScript version include that the JavaScript version doesn't?",
      },
    ],
  },
  {
    id: "L18B4",
    levelId: 18,
    type: "quiz",
    title: "TypeScript Concepts",
    xp: 15,
    required: true,
    order: 4,
    questions: [
      {
        question: "What does TypeScript add to JavaScript?",
        options: [
          "A new programming language with different syntax",
          "Type labels that describe data and catch errors before runtime",
          "Faster execution speed",
          "Built-in database support",
        ],
        correctIndex: 1,
        explanation:
          "TypeScript adds type annotations — labels that describe your data — helping catch bugs before you even run the code.",
      },
      {
        question: "What's the difference between .tsx and .jsx?",
        options: [
          ".tsx is for mobile, .jsx is for web",
          ".tsx includes TypeScript type checking, .jsx does not",
          ".tsx is newer and faster",
          "There is no difference",
        ],
        correctIndex: 1,
        explanation:
          ".tsx files are React components with TypeScript type safety. .jsx files are React components without it.",
      },
      {
        question: "Do YOU need to write TypeScript yourself?",
        options: [
          "Yes, you must learn all TypeScript syntax",
          "No — just say 'use TypeScript' in your prompts and AI handles it",
          "Only for backend code",
          "Only for CSS files",
        ],
        correctIndex: 1,
        explanation:
          "You direct AI with 'use TypeScript' and it writes the typed code. You benefit from the safety without memorizing syntax.",
      },
      {
        question: "Why does AI write better code when you say 'use TypeScript'?",
        options: [
          "TypeScript makes the AI think faster",
          "AI is forced to label all data, which reduces bugs and makes the code more predictable",
          "TypeScript files are smaller",
          "It doesn't — there's no difference",
        ],
        correctIndex: 1,
        explanation:
          "TypeScript forces AI to be explicit about data shapes, leading to fewer bugs and clearer component contracts.",
      },
    ],
    passingScore: 3,
  },

  // ─── Level 19: Smart Prompting (4 blocks) ───
  {
    id: "L19B1",
    levelId: 19,
    type: "theory",
    title: "Don't Build Everything at Once",
    xp: 10,
    required: true,
    order: 1,
    content: `# Don't Build Everything at Once

Asking AI to build a whole app in one prompt is like telling a contractor **"build me a house"** with no plans.

You'll get *something*. But probably not what you want.

## The professional approach

Break it down into steps:

1. **Step 1:** Create the header component
2. **Step 2:** Add the product list below the header
3. **Step 3:** Add search functionality
4. **Step 4:** Style everything with Tailwind
5. **Step 5:** Make it responsive

Each step: **verify it works** → then move to the next.

## Why this works

- Each prompt is small and focused — AI handles it better
- You catch mistakes early, not after 500 lines of broken code
- You can change direction without throwing everything away
- You build confidence as each piece clicks into place

## The mindset shift

Don't think: "Build me a task manager."

Think: "First, show me a list of 3 static tasks. Great, now let me add new tasks. Good, now add completion checkboxes..."

**Small steps. Verify each one. Build up.**`,
  },
  {
    id: "L19B2",
    levelId: 19,
    type: "pattern",
    title: "Breaking Down Complexity",
    xp: 15,
    required: true,
    order: 2,
    patternId: "breaking-down-complexity",
    exercise: {
      goal: "Practice breaking a big task into step-by-step prompts",
      template: `I'm building ___. Let's do it step by step.

Step 1: ___
Step 2: ___
Step 3: ___

Start with Step 1 only.`,
      exampleFilled: `I'm building a task manager. Let's do it step by step.

Step 1: Create a TaskList component that shows 3 static tasks with titles
Step 2: Add an input and "Add" button to create new tasks
Step 3: Add a checkbox to toggle task completion (crosses out the text)
Step 4: Add a delete button on each task
Step 5: Add filter tabs: All, Active, Done

Start with Step 1 only.`,
    },
  },
  {
    id: "L19B3",
    levelId: 19,
    type: "review",
    title: "Evaluate AI's Approach",
    xp: 20,
    required: true,
    order: 3,
    code: `Build me a complete admin dashboard with:
- Sidebar navigation with Dashboard, Users, Products, Orders, Analytics, and Settings pages
- User authentication with login, register, forgot password, and email verification
- Dashboard page with 6 stat cards, 2 charts (line and bar), recent orders table, and activity feed
- Users page with a searchable, sortable, paginated data table with inline editing
- Products page with CRUD, image upload, categories, tags, and inventory tracking
- Orders page with status management, filtering by date/status/customer, and export to CSV
- Analytics page with date range picker, multiple chart types, and comparison view
- Settings page with profile form, notification preferences, theme toggle, and API key management
- Fully responsive with dark mode toggle
- All data fetched from REST APIs with loading, error, and empty states
- Form validation on every input
- Keyboard shortcuts for power users
- Toast notifications for all actions`,
    language: "text",
    description:
      "Someone wrote this as a single prompt to AI. What's wrong with this approach?",
    knownIssues: [
      {
        id: "L19B3I1",
        lineRange: [1, 14],
        description:
          "Too many features in one prompt — AI will produce inconsistent, buggy output trying to do everything at once",
        severity: "critical",
      },
      {
        id: "L19B3I2",
        lineRange: [1, 14],
        description:
          "No priority order — if any one feature breaks, the whole output is compromised with no way to isolate the problem",
        severity: "warning",
      },
      {
        id: "L19B3I3",
        lineRange: [1, 14],
        description:
          "No way to verify each piece works before moving on — you can't test authentication separately from charts separately from data tables",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L19B4",
    levelId: 19,
    type: "debug",
    title: "Fix Complex Issues",
    xp: 20,
    required: true,
    order: 4,
    scenarios: [
      {
        id: "L19B4D1",
        title: "Data not displaying",
        description:
          "This component fetches data from an API but the screen stays blank. The data arrives but the component renders before it's ready.",
        brokenCode: `function UserList() {
  const [users, setUsers] = useState([]);

  fetch("/api/users")
    .then(res => res.json())
    .then(data => setUsers(data));

  return (
    <div>
      <h2>Users ({users.length})</h2>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}`,
        language: "jsx",
        hint: "The fetch runs on every render, causing an infinite loop. It also has no loading state. Data fetching should happen inside useEffect.",
        expectedFix:
          "Wrap the fetch call in useEffect with an empty dependency array so it only runs once, and add a loading state to show while data is being fetched",
      },
      {
        id: "L19B4D2",
        title: "State not updating",
        description:
          "Clicking 'Add' adds an item to the array, but the list on screen never changes. The data updates but React doesn't re-render.",
        brokenCode: `function TodoList() {
  const [todos, setTodos] = useState(["Buy milk", "Walk dog"]);
  const [input, setInput] = useState("");

  function addTodo() {
    todos.push(input);
    setTodos(todos);
    setInput("");
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo, i) => <p key={i}>{todo}</p>)}
    </div>
  );
}`,
        language: "jsx",
        hint: "React only re-renders when it detects a NEW array, not a mutated one. array.push changes the same array in place.",
        expectedFix:
          "Replace todos.push(input) + setTodos(todos) with setTodos([...todos, input]) — the spread operator creates a new array, which React detects as a change and re-renders",
      },
    ],
    passingCount: 1,
  },

  // ─── Level 20: Dashboard Boss (3 blocks) ───
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
        question: "What is routing in a React app?",
        options: [
          "A way to send emails",
          "Mapping URLs to pages — like TV channels, each URL shows different content",
          "A database optimization",
          "A type of CSS animation",
        ],
        correctIndex: 1,
        explanation:
          "Routing maps URLs to components. /home shows the Home page, /about shows the About page — like switching TV channels.",
      },
      {
        question:
          "What are the three states every data request should handle?",
        options: [
          "Open, closed, pending",
          "Loading, success, and error",
          "Start, middle, end",
          "Read, write, delete",
        ],
        correctIndex: 1,
        explanation:
          "Every API request can be loading, successful, or failed. Your app should handle all three with appropriate UI.",
      },
      {
        question: "Why should you add 'use TypeScript' to your prompts?",
        options: [
          "It makes the app load faster",
          "AI writes cleaner code with fewer bugs because it has to label all data types",
          "TypeScript is required for React",
          "It reduces the file size",
        ],
        correctIndex: 1,
        explanation:
          "TypeScript forces AI to be explicit about data shapes, resulting in fewer bugs and more predictable code.",
      },
      {
        question:
          "Why should you break a big app into small prompts instead of one giant prompt?",
        options: [
          "AI has a word limit",
          "Small prompts are more focused — you can verify each step works before moving on",
          "It makes the code run faster",
          "Big prompts cost more money",
        ],
        correctIndex: 1,
        explanation:
          "Small, focused prompts give AI clearer instructions and let you catch errors early instead of debugging a massive broken output.",
      },
      {
        question:
          "What's wrong with using array.push() to update React state?",
        options: [
          "push() is too slow",
          "push() mutates the same array — React needs a NEW array to detect the change and re-render",
          "push() only works with numbers",
          "push() deletes the old data",
        ],
        correctIndex: 1,
        explanation:
          "React compares old and new state references. push() modifies the same array (same reference), so React thinks nothing changed. Use spread: [...array, newItem].",
      },
    ],
    passingScore: 3,
  },
  {
    id: "L20B2",
    levelId: 20,
    type: "prompt",
    title: "Design Your Dashboard",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "template",
    goal: "Write a step-by-step prompt for a dashboard application",
    referencePrompt:
      "Build a dashboard app with React, React Router, Tailwind, and TypeScript. Step-by-step: Step 1 — Sidebar navigation with links to Dashboard, Users, Analytics, and Settings pages. Highlight the active page. Step 2 — Dashboard page with 4 stat cards (total users, revenue, orders, growth rate) showing an icon, number, and percentage change. Step 3 — Users page with a data table showing name, email, role, and status columns. Add a search bar to filter rows. Step 4 — Analytics page with placeholder chart areas and summary stats. Step 5 — Settings page with a profile form (name, email, bio). Responsive: sidebar collapses to a hamburger on mobile. All data can be mock/static for now.",
    template:
      "Build a dashboard app with React, React Router, Tailwind, and TypeScript. Step-by-step: Step 1 — ___ navigation with links to ___. Step 2 — Dashboard page with ___ stat cards showing ___. Step 3 — ___ page with a data table showing ___. Add ___. Step 4 — ___ page with ___. Step 5 — ___ page with a ___ form. Responsive: ___.",
    passingThreshold: 3.0,
  },
  {
    id: "L20B3",
    levelId: 20,
    type: "build",
    title: "Ship Your Dashboard",
    xp: 300,
    required: true,
    order: 3,
    mission:
      "Build a polished dashboard: sidebar nav, 4+ pages, stat cards, data table, responsive design, TypeScript. Think admin panel or analytics dashboard.",
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
      "Boss level — be thorough. Check for: sidebar navigation, 4+ pages with routing, stat cards, data table, responsive design (sidebar collapses on mobile), TypeScript usage (.tsx files). Should feel like a real dashboard, not a skeleton.",
    passingScore: 60,
  },
];
