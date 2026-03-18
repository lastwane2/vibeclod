import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 3 — Components (Levels 11-15)
// React as LEGO blocks
// Patterns: Component Request, Layout, Iteration
// ═══════════════════════════════════════

export const WORLD_3_BLOCKS: Block[] = [
  // ─── Level 11: Building Blocks (4 blocks) ───
  {
    id: "L11B1",
    levelId: 11,
    type: "theory",
    title: "Components = LEGO",
    xp: 10,
    required: true,
    order: 1,
    content: `# Components = LEGO

Think of any website you use. It's not one giant blob — it's built from **pieces**.

A card. A button. A navigation bar. A footer. Each piece is a **component**.

## The LEGO analogy

LEGO gives you different bricks — flat ones, tall ones, wheels, windows. You snap them together to build anything: a house, a car, a spaceship.

Components work the same way. You have different UI pieces — headers, cards, lists, forms. You snap them together to build any app.

## React

React is the most popular way to build with components. When you tell AI **"Create a React app"**, you're saying: "build me something from components."

You don't need to write components yourself. You **describe what blocks you need**, and AI assembles them.

## What this means for you

Your job isn't to code components. It's to **decide which pieces your app needs** and how they fit together — like being the architect, not the bricklayer.`,
  },
  {
    id: "L11B2",
    levelId: 11,
    type: "theory",
    title: "React: What to Tell AI",
    xp: 10,
    required: true,
    order: 2,
    content: `# React: What to Tell AI

When prompting AI for a React app, you need to communicate three things:

## 1. What components you need

Name them like real objects: Header, ProductCard, SearchBar, ShoppingCart. The name should instantly explain what it does.

## 2. What data each component shows

A ProductCard shows: image, title, price, rating. A UserProfile shows: avatar, name, bio. Be specific about what information lives inside each piece.

## 3. How they connect

- A ProductList contains many ProductCards
- A Header appears on every page
- A SearchBar filters what the ProductList shows

That's it. Don't worry about import/export, useState, or any syntax. **AI handles the code. YOU decide the architecture.**`,
    miniQuiz: [
      {
        question:
          "When prompting AI for a React app, what do you describe?",
        options: [
          "The exact JavaScript syntax to use",
          "What components you need, what data they show, and how they connect",
          "Which CSS framework is fastest",
          "The server configuration",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L11B3",
    levelId: 11,
    type: "pattern",
    title: "Component Request Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "component-request",
    exercise: {
      goal: "Use the Component Request Pattern to describe a React component to AI",
      template: `Create a ___ React component that:
- Props: ___
- Shows: ___
- Handles: ___
- Style: ___`,
      exampleFilled: `Create a UserCard React component that:
- Props: name, email, avatarUrl
- Shows: a card with the avatar image on the left, name and email on the right, and a "Follow" button
- Handles: clicking "Follow" toggles between "Follow" and "Following"
- Style: Tailwind — rounded card with shadow, hover effect, responsive`,
    },
  },
  {
    id: "L11B4",
    levelId: 11,
    type: "build",
    title: "Your First React App",
    xp: 30,
    required: true,
    order: 4,
    mission:
      "Create a React app with at least 3 custom components. Each should do one thing well.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [{ path: "package.json", contains: ["react"] }],
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for at least 3 custom React components. Each component should have a clear purpose. Look for proper structure and clean code.",
    passingScore: 55,
  },

  // ─── Level 12: Things That Change (4 blocks) ───
  {
    id: "L12B1",
    levelId: 12,
    type: "theory",
    title: "State = Memory Inside Components",
    xp: 10,
    required: true,
    order: 1,
    content: `# State = Memory Inside Components

Some things in your app **change**: a counter goes up, a menu opens, a form fills in.

This is **state** — the component's short-term memory.

## Think of it like a whiteboard

Each component has a small whiteboard. It can write things on it (update state) and read what's there (display state). When the whiteboard changes, the component automatically re-draws itself.

- Counter component's whiteboard: "count = 7"
- Menu component's whiteboard: "isOpen = true"
- Form component's whiteboard: "name = 'Sarah', email = 's@email.com'"

## What this means for prompting

When you tell AI **"add a counter that goes up when clicked"**, AI uses state automatically behind the scenes. You just need to describe:

1. **WHAT changes** — the counter value, the menu visibility, the form data
2. **WHEN it changes** — on click, on type, on submit

That's your whole job. AI wires up the state management.`,
  },
  {
    id: "L12B2",
    levelId: 12,
    type: "theory",
    title: "Events = Triggers",
    xp: 10,
    required: true,
    order: 2,
    content: `# Events = Triggers

Events are the **triggers** that cause things to happen:

- **Click** → counter goes up
- **Type** → input updates
- **Hover** → color changes
- **Submit** → form sends data

## The prompt formula

Always describe the **trigger** AND the **result**:

**Bad:** "add a form"

**Good:** "add a form with name and email fields. When submitted, show a success message and clear the form."

**Bad:** "add a button"

**Good:** "add a 'Save' button. When clicked, save the data and change the button text to 'Saved!' for 2 seconds."

## Common trigger → result pairs

| Trigger | Result |
|---------|--------|
| Click button | Add item, toggle state, navigate |
| Submit form | Validate, send data, show confirmation |
| Type in input | Filter list, search, validate |
| Hover element | Show tooltip, change color |
| Scroll page | Load more items, show/hide header |

Every interactive element needs both halves: **what triggers it** and **what happens**.

## Side Effects — When Components Do Things Automatically

Events are things users trigger. But some things happen **automatically** — like fetching data when a page loads or starting a timer.

These are called **side effects**, and React uses \`useEffect\` for them.

**Think of it this way:**
- **Events** = you press a button (manual)
- **Effects** = your alarm goes off at 7am (automatic)

Common use cases:
- **Fetch data** when a page loads
- **Update the page title** when something changes
- **Start a timer** and clean it up when the page closes

You don't write useEffect yourself — just tell AI: **"When the page loads, fetch users from the API"** and AI uses useEffect behind the scenes.`,
    miniQuiz: [
      {
        question: "What's missing from the prompt: \"add a button\"?",
        options: [
          "The button color",
          "What happens when you click it",
          "The button size",
          "The CSS class name",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L12B3",
    levelId: 12,
    type: "prompt",
    title: "Write an Interactive Component Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "template",
    goal: "Write a prompt for a React app with interactive components",
    referencePrompt:
      "Create a React task manager with: 1) An input field and 'Add' button — when clicked, adds the task to a list below. 2) Each task shows the text and a 'Done' checkbox — clicking it crosses out the task. 3) A counter at the top showing 'X tasks remaining' (only counting unchecked tasks). 4) A 'Clear completed' button that removes all checked tasks.",
    template:
      "Create a React ___ with: 1) An input field and '___' button — when clicked, ___. 2) Each ___ shows ___ and a '___' ___ — clicking it ___. 3) A counter showing ___. 4) A '___' button that ___.",
    passingThreshold: 2.5,
  },
  {
    id: "L12B4",
    levelId: 12,
    type: "build",
    title: "Build Something Interactive",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Build a React app with interactive components — at least one counter/toggle and one form that does something.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [{ path: "package.json", contains: ["react"] }],
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for interactive React components. Look for at least one counter or toggle and one form. State should update on user actions.",
    passingScore: 55,
  },

  // ─── Level 13: Modern Styling (4 blocks) ───
  {
    id: "L13B1",
    levelId: 13,
    type: "theory",
    title: "Tailwind = Words Instead of CSS Files",
    xp: 10,
    required: true,
    order: 1,
    content: `# Tailwind = Words Instead of CSS Files

Remember CSS files from World 1? Tailwind replaces them with a simpler idea.

Instead of writing styles in a separate file, you add **descriptive words** directly to your HTML:

\`bg-blue-500 text-white p-4 rounded-lg\`

## It's like labeling boxes

Imagine labeling a moving box: "blue, white text, padded, rounded corners." That's exactly what Tailwind classes are — labels that describe how something looks.

## Why AI loves Tailwind

Tailwind is **predictable**. The same class always does the same thing. No naming conflicts, no wondering what \`.card-wrapper-inner\` does. AI generates cleaner, more consistent code with Tailwind.

## For your prompts

Just say **"use Tailwind CSS"** and then describe what you want visually:

"A blue card with white text, padding, rounded corners, and a shadow"

AI translates your description into the right Tailwind classes. You never need to memorize them.`,
  },
  {
    id: "L13B2",
    levelId: 13,
    type: "theory",
    title: "Responsive = Every Screen Size",
    xp: 10,
    required: true,
    order: 2,
    content: `# Responsive = Every Screen Size

Your app should work on phones, tablets, and desktops. "Responsive design" means the layout adapts to the screen.

## How Tailwind handles it

Tailwind uses prefixes for screen sizes:
- **No prefix** → applies to all screens (start here — mobile first)
- **sm:** → small screens and up (phones in landscape)
- **md:** → medium screens and up (tablets)
- **lg:** → large screens and up (desktops)

## You don't write this — AI does

You just describe what you want at each size:

**"Responsive design, single column on mobile, 2 columns on tablet, 3 columns on desktop."**

That one sentence gives AI everything it needs. It translates your intent into the right responsive classes.

## Common responsive patterns

| Pattern | What to say |
|---------|-------------|
| Stack → Grid | "single column on mobile, grid on desktop" |
| Hide/show | "hide sidebar on mobile, show on desktop" |
| Font size | "larger headings on desktop" |
| Navigation | "hamburger menu on mobile, full nav bar on desktop" |`,
    miniQuiz: [
      {
        question:
          "What do you tell AI to make your app work on all screen sizes?",
        options: [
          "Write separate CSS files for each device",
          "Use responsive design — describe mobile and desktop layouts",
          "Only build for desktop, phones will figure it out",
          "Add a zoom setting",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L13B3",
    levelId: 13,
    type: "pattern",
    title: "The Layout Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "layout-pattern",
    exercise: {
      goal: "Use the Layout Pattern to describe a responsive page layout",
      template: `Build a ___ layout:
- Structure: ___
- Responsive: mobile: ___, desktop: ___
- Navigation: ___
- Content: ___`,
      exampleFilled: `Build a portfolio layout:
- Structure: sticky header, full-width hero section, grid content area, footer
- Responsive: mobile: single column stack, hamburger menu. Desktop: sidebar appears, 3-column project grid
- Navigation: logo on the left, links on the right, hamburger menu on mobile
- Content: hero with name and tagline, project cards in a grid, about section below`,
    },
  },
  {
    id: "L13B4",
    levelId: 13,
    type: "build",
    title: "Style with Tailwind",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Style your React app with Tailwind CSS. Responsive layout for mobile and desktop. No custom CSS files.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [{ path: "package.json", contains: ["tailwind"] }],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Tailwind CSS usage. Look for responsive utilities (sm:, md:, lg:), proper layout (flex/grid), and consistent styling. No custom CSS files.",
    passingScore: 55,
  },

  // ─── Level 14: AI Makes Mistakes (4 blocks) ───
  {
    id: "L14B1",
    levelId: 14,
    type: "theory",
    title: "Common React Mistakes AI Makes",
    xp: 10,
    required: true,
    order: 1,
    content: `# Common React Mistakes AI Makes

AI is fast but careless. Here are the patterns to watch for:

## 1. Duplicate code

AI loves copying and pasting. Three identical product cards? Should be **one** ProductCard component used three times. If you see the same chunk of JSX repeated, that's a red flag.

## 2. Missing states

AI builds the "happy path" — everything works perfectly. But what about:
- **Loading** — what shows while data loads?
- **Error** — what if something fails?
- **Empty** — what if there's no data yet?

Always check: did AI handle all three?

## 3. Dead buttons

Buttons that look clickable but **do nothing**. AI generates the visual button but forgets to wire up the behavior. Click every button and verify something actually happens.

## 4. Giant files

One 500-line file instead of organized components. If a file is doing more than one thing, ask AI to split it up.

## Your job

You're the **quality inspector**. Spot these patterns, then tell AI specifically what to fix.

## Reading AI's Code

You don't need to write code, but you DO need to **scan** it. Here's how:

### 1. Find the return statement
Scroll to the \`return (\` line — that's where the UI lives. Everything inside is what the user sees.

### 2. Spot the components
Look for capitalized tags like \`<Header />\`, \`<TaskCard />\`. These are the building blocks. Each one should do ONE thing.

### 3. Change simple things yourself
Want to change a color? Find \`bg-blue-500\` and change \`blue\` to \`red\`. Want different text? Find the string in quotes and edit it. Small edits are faster than re-prompting.

### 4. Understand imports
The top of the file shows \`import ... from ...\` lines. These tell you what external pieces the component uses. If something is missing, the import is probably wrong.`,
  },
  {
    id: "L14B2",
    levelId: 14,
    type: "review",
    title: "Spot the Problems",
    xp: 20,
    required: true,
    order: 2,
    code: `import React from 'react';

function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Product Store</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <img src="/shoes.jpg" alt="Running Shoes" className="w-full h-48 object-cover rounded" />
          <h3 className="font-bold mt-2">Running Shoes</h3>
          <p className="text-gray-600">$89.99</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add to Cart</button>
        </div>

        <div className="border rounded-lg p-4">
          <img src="/jacket.jpg" alt="Winter Jacket" className="w-full h-48 object-cover rounded" />
          <h3 className="font-bold mt-2">Winter Jacket</h3>
          <p className="text-gray-600">$149.99</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add to Cart</button>
        </div>

        <div className="border rounded-lg p-4">
          <img src="/hat.jpg" alt="Baseball Hat" className="w-full h-48 object-cover rounded" />
          <h3 className="font-bold mt-2">Baseball Hat</h3>
          <p className="text-gray-600">$24.99</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default App;`,
    language: "jsx",
    description:
      "This React app works but has structural problems. Can you spot them?",
    knownIssues: [
      {
        id: "L14B2I1",
        lineRange: [8, 28],
        description:
          "Three product cards are copy-pasted — should be a reusable ProductCard component",
        severity: "critical",
      },
      {
        id: "L14B2I2",
        lineRange: [8, 28],
        description:
          "Product data is hardcoded in JSX — should come from an array and be mapped over",
        severity: "warning",
      },
      {
        id: "L14B2I3",
        lineRange: [14, 14],
        description:
          "Button has no onClick handler — clicking 'Add to Cart' does nothing",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L14B3",
    levelId: 14,
    type: "debug",
    title: "Fix React Issues",
    xp: 20,
    required: true,
    order: 3,
    scenarios: [
      {
        id: "L14B3D1",
        title: "Missing responsive class",
        description:
          "This card grid shows 3 columns on all screen sizes, even on mobile where it looks cramped and unreadable.",
        brokenCode: `<div className="grid grid-cols-3 gap-4">
  <div className="bg-white p-4 rounded-lg shadow">Card 1</div>
  <div className="bg-white p-4 rounded-lg shadow">Card 2</div>
  <div className="bg-white p-4 rounded-lg shadow">Card 3</div>
</div>`,
        language: "jsx",
        hint: "On mobile, 3 columns is too many. Tailwind has responsive prefixes like sm: and lg: to change layout at different screen sizes.",
        expectedFix:
          "Change grid-cols-3 to grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 so it stacks on mobile and expands on larger screens",
      },
      {
        id: "L14B3D2",
        title: "Counter goes negative",
        description:
          "This counter lets you click minus below 0, showing negative numbers which doesn't make sense for a quantity selector.",
        brokenCode: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
        language: "jsx",
        hint: "The minus button should check if count is already 0 before subtracting.",
        expectedFix:
          "Add a check to prevent going below 0: onClick={() => setCount(Math.max(0, count - 1))} or disable the button when count is 0",
      },
    ],
    passingCount: 1,
  },
  {
    id: "L14B4",
    levelId: 14,
    type: "pattern",
    title: "The Iteration Pattern",
    xp: 15,
    required: true,
    order: 4,
    patternId: "iteration-pattern",
    exercise: {
      goal: "Use the Iteration Pattern to ask AI to fix a specific problem in its output",
      template: `The output has this issue: ___
What I expected: ___
Please fix by: ___`,
      exampleFilled: `The output has this issue: the product cards are all copy-pasted HTML with hardcoded data.
What I expected: a reusable ProductCard component that takes props, used in a loop over a products array.
Please fix by: creating a ProductCard component that accepts title, price, and image as props, then mapping over a products array to render them.`,
    },
  },

  // ─── Level 15: App Boss (3 blocks) ───
  {
    id: "L15B1",
    levelId: 15,
    type: "quiz",
    title: "World 3 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What is a React component?",
        options: [
          "A type of database",
          "A reusable piece of UI — like a LEGO brick you can snap together with others",
          "A CSS animation",
          "A server configuration file",
        ],
        correctIndex: 1,
        explanation:
          "Components are reusable UI pieces. You describe which ones you need and AI builds them.",
      },
      {
        question: "What is 'state' in a component?",
        options: [
          "The geographic location of the server",
          "The component's short-term memory — data that changes over time",
          "A CSS property",
          "The file extension",
        ],
        correctIndex: 1,
        explanation:
          "State is data inside a component that can change — like a counter value or whether a menu is open.",
      },
      {
        question:
          "What should you always describe when prompting for interactive elements?",
        options: [
          "The file size",
          "The trigger (what the user does) AND the result (what happens)",
          "The server port number",
          "The database schema",
        ],
        correctIndex: 1,
        explanation:
          "Every interactive element needs both: what triggers it and what happens as a result.",
      },
      {
        question: "Why does AI produce better code with Tailwind CSS?",
        options: [
          "Tailwind is faster than CSS",
          "Tailwind classes are predictable — same class always does the same thing, no naming conflicts",
          "Tailwind is the only CSS AI understands",
          "Tailwind files are smaller",
        ],
        correctIndex: 1,
        explanation:
          "Tailwind's predictable utility classes help AI generate consistent, conflict-free styling.",
      },
      {
        question: "What's the most common mistake AI makes with React?",
        options: [
          "Using the wrong programming language",
          "Duplicating code instead of making reusable components",
          "Making the app too fast",
          "Adding too many tests",
        ],
        correctIndex: 1,
        explanation:
          "AI often copy-pastes similar blocks instead of creating one reusable component. Always check for duplication.",
      },
    ],
    passingScore: 3,
  },
  {
    id: "L15B2",
    levelId: 15,
    type: "prompt",
    title: "Design Your React App",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "template",
    goal: "Write a comprehensive prompt for a complete React + Tailwind app",
    referencePrompt:
      "Create a recipe app with React and Tailwind CSS. Components: 1) Header with app name 'Tasty Recipes' and a search bar. 2) RecipeCard showing recipe image, title, cook time, and a heart icon to favorite. 3) RecipeList that displays RecipeCards in a responsive grid. 4) SearchBar that filters recipes by name as you type. State: search query filters the recipe list in real-time, clicking the heart toggles the recipe as a favorite. Styling: responsive — single column on mobile, 2 columns on tablet, 3 on desktop. Clean white cards with subtle shadows, rounded corners. Show a 'No recipes found' message when search matches nothing.",
    template:
      "Create a ___ app with React and Tailwind CSS. Components: 1) Header with ___. 2) ___ showing ___. 3) ___ that displays ___ in a responsive grid. 4) ___ that ___. State: ___. Styling: responsive — ___. Show a '___' message when ___.",
    passingThreshold: 3.0,
  },
  {
    id: "L15B3",
    levelId: 15,
    type: "build",
    title: "Ship Your App",
    xp: 250,
    required: true,
    order: 3,
    mission:
      "Build a polished React + Tailwind app: 3+ views/sections, interactive components, responsive design. Think: recipe app, task list, weather dashboard, movie browser.\n\nSuggested project: TaskFlow React app (TaskCard, TaskList, AddTask components)",
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
      "Boss level — be thorough. Check for: 3+ custom components, interactive features (state changes on user actions), responsive Tailwind styling, clean code structure. Should feel like a real app, not a demo.",
    passingScore: 60,
  },
];
