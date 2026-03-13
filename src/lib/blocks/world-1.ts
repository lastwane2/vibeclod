import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 1 — Hello, Vibe (Levels 1-5)
// Patterns: Basic Prompt, The Styling Pattern
// ═══════════════════════════════════════

export const WORLD_1_BLOCKS: Block[] = [
  // ─── Level 1: Your First Prompt (5 blocks) ───
  {
    id: "L1B1",
    levelId: 1,
    type: "theory",
    title: "What is Vibe Coding?",
    xp: 10,
    required: true,
    order: 1,
    content: `# What is Vibe Coding?

Vibe coding is a new way to build software. Instead of writing every line of code yourself, you **describe what you want** to an AI — and it writes the code for you.

## How it works

1. You write a **prompt** — a description of what you want
2. The AI generates **working code**
3. You review, tweak, and **push it live**

## Why it matters

- You don't need years of coding experience
- You can build real products in hours, not months
- The skill is in **knowing what to ask for**

## The catch

AI isn't perfect. It makes mistakes, writes buggy code, and sometimes misunderstands you completely. The difference between a good vibe coder and a bad one? **Knowing how to guide the AI and catch its mistakes.**

That's what this course teaches you.`,
    miniQuiz: [
      {
        question: "What is the most important skill in vibe coding?",
        options: [
          "Memorizing programming syntax",
          "Knowing how to describe what you want to AI",
          "Writing code faster than AI",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L1B2",
    levelId: 1,
    type: "pattern",
    title: "The Basic Prompt Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "basic-prompt",
    exercise: {
      goal: "Write a prompt using the Basic Pattern to create a simple webpage",
      template: `[TASK]: ___
[CONTEXT]: ___
[FORMAT]: ___`,
      exampleFilled: `[TASK]: Create an HTML page with a headline and a blue button
[CONTEXT]: Simple static page, no frameworks, modern clean design
[FORMAT]: Single index.html file with inline CSS`,
    },
  },
  {
    id: "L1B3",
    levelId: 1,
    type: "prompt",
    title: "Write Your First Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "full",
    goal: "Write a prompt that asks AI to create an HTML page with a headline and a button",
    referencePrompt:
      "Create an HTML page with a large headline that says 'Hello World' and a styled button below it. Use inline CSS for styling — center everything on the page, use a clean sans-serif font, and make the button blue with white text and rounded corners. Output a single index.html file.",
    template:
      "Create an HTML page with a large headline that says '___' and a styled ___ below it. Use inline CSS for styling — center everything on the page, use a clean ___ font, and make the button ___ with white text and ___ corners. Output a single ___ file.",
    hints: [
      "Describe what elements should be on the page",
      "Specify the styling approach (inline CSS)",
      "Mention the output format (single file)",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L1B4",
    levelId: 1,
    type: "build",
    title: "Push Your First Page",
    xp: 30,
    required: true,
    order: 4,
    mission:
      "Use the prompt you wrote (or the reference) to generate an HTML page with AI. Push it to your repo as index.html.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [{ path: "index.html", contains: ["<button", "<h1"] }],
      minCommits: 1,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check if index.html is a valid HTML page with a visible heading and a button. It should look intentional, not a blank template.",
    passingScore: 50,
  },
  {
    id: "L1B5",
    levelId: 1,
    type: "theory",
    title: "What You Just Built",
    xp: 10,
    required: false,
    order: 5,
    content: `# What You Just Built

You just completed the core vibe coding loop:

1. **Prompt** — You described what you wanted
2. **Generate** — AI wrote the code
3. **Push** — You shipped it to GitHub

## Breaking it down

Your \`index.html\` file contains:
- **HTML** — The structure (headings, buttons, paragraphs)
- **CSS** — The styling (colors, layout, fonts)
- They work together: HTML says *what*, CSS says *how it looks*

## What to notice

The AI probably gave you more than you asked for. That's normal. The key is:
- Did it do what you asked? ✓
- Does it work? ✓
- Can you understand the output? (That's what we'll work on)

Next up: making it look actually good.`,
  },

  // ─── Level 2: Style It Up (4 blocks) ───
  {
    id: "L2B1",
    levelId: 2,
    type: "theory",
    title: "Why Styling Matters",
    xp: 10,
    required: true,
    order: 1,
    content: `# Why Styling Matters

Default HTML looks like it's from 1995. Users judge your site in **3 seconds**. Good styling = trust.

## CSS Basics (for prompting)

You don't need to memorize CSS. You need to know the right **words** to use in prompts:

| What you want | Words to use in prompts |
|---------------|------------------------|
| Colors | "hex colors", "color palette", "gradient" |
| Layout | "centered", "flexbox", "grid layout" |
| Fonts | "sans-serif", "Google Fonts", "font weight" |
| Spacing | "padding", "margin", "gap" |
| Polish | "box shadow", "border radius", "hover effect" |

## The trick

Be **specific** about styling. "Make it look good" → generic AI output. "Navy background, white text, Inter font, centered with 32px padding" → exactly what you want.`,
    miniQuiz: [
      {
        question: "Which prompt will give better styling results?",
        options: [
          '"Make the page look nice"',
          '"Style with navy (#1a1a2e) background, white text, Inter font, centered layout with 32px padding"',
          '"Add some CSS to make it pretty"',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L2B2",
    levelId: 2,
    type: "pattern",
    title: "The Styling Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "styling-pattern",
    exercise: {
      goal: "Use the Styling Pattern to describe how your page should look",
      template: `Style the page with:
- Colors: ___
- Layout: ___
- Typography: ___
- Spacing: ___
- Effects: ___`,
      exampleFilled: `Style the page with:
- Colors: background #0f172a, text #e2e8f0, accent #3b82f6
- Layout: centered vertically and horizontally, max-width 600px
- Typography: Inter font, heading 40px bold, body 16px
- Spacing: 24px padding, 16px gap between elements
- Effects: button hover brightens, subtle text shadow on heading`,
    },
  },
  {
    id: "L2B3",
    levelId: 2,
    type: "prompt",
    title: "Write a Styling Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "full",
    goal: "Write a prompt to add CSS styling to your index.html — colors, fonts, layout",
    referencePrompt:
      "Update my index.html to look like a modern landing page. Use a dark navy background (#0f172a), light gray text (#e2e8f0), and a bright blue accent (#3b82f6) for the button. Center everything with flexbox. Use the Inter font from Google Fonts, heading at 48px bold, body at 18px. Add 32px padding, 16px gap between elements. Button should have rounded corners, padding 12px 24px, and a hover effect that brightens the color. Add a subtle box shadow to the main container.",
    template:
      "Update my index.html to look like a modern landing page. Use a dark ___ background (___), light ___ text (___), and a bright ___ accent (___) for the button. Center everything with ___. Use the ___ font from Google Fonts. Add ___ padding. Button should have ___ corners and a ___ effect.",
    hints: [
      "Specify exact colors with hex codes",
      "Name a specific font",
      "Describe the layout method (flexbox/grid)",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L2B4",
    levelId: 2,
    type: "build",
    title: "Push Your Styled Page",
    xp: 30,
    required: true,
    order: 4,
    mission:
      "Add CSS styling to your index.html — custom colors, fonts, centered layout. Push to your repo.",
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
  },

  // ─── Level 3: Multi-Page Magic (4 blocks) ───
  {
    id: "L3B1",
    levelId: 3,
    type: "theory",
    title: "How Pages Link Together",
    xp: 10,
    required: true,
    order: 1,
    content: `# How Pages Link Together

A website isn't just one page. It's multiple pages connected by links.

## HTML Links

\`\`\`html
<a href="about.html">About</a>
\`\`\`

That's it. The \`href\` attribute points to another file, and the text between the tags is what users click.

## Navigation Bars

Most sites have a **nav bar** — a row of links at the top of every page:

\`\`\`html
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
\`\`\`

## The key insight

When asking AI to build multi-page sites, you need to specify:
1. **Which pages** to create
2. **What links** between them
3. **Consistent styling** across all pages (same nav, same CSS)

AI often forgets to make the nav bar identical on every page. Always mention "shared navigation" in your prompt.`,
  },
  {
    id: "L3B2",
    levelId: 3,
    type: "prompt",
    title: "Write a Multi-Page Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "full",
    goal: "Write a prompt for a 3-page website with shared navigation",
    referencePrompt:
      "Create a 3-page website with index.html, about.html, and contact.html. Every page should have an identical navigation bar at the top with links to all 3 pages. The current page's link should be visually highlighted. Use consistent styling across all pages — same color scheme, fonts, and layout. Each page should have unique content relevant to its purpose.",
    template:
      "Create a ___-page website with ___, ___, and ___. Every page should have an identical ___ at the top with links to all ___ pages. The current page's link should be visually ___. Use consistent ___ across all pages.",
    hints: [
      "List all page filenames",
      "Mention shared navigation",
      "Ask for consistent styling",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L3B3",
    levelId: 3,
    type: "build",
    title: "Build Your Multi-Page Site",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Create at least 3 HTML pages with shared navigation. All pages should link to each other.",
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
  },
  {
    id: "L3B4",
    levelId: 3,
    type: "experiment",
    title: "Break a Link, See What Happens",
    xp: 15,
    required: false,
    order: 4,
    description:
      "Let's see what happens when things go wrong with links — this is how you learn to debug.",
    steps: [
      {
        id: "L3B4S1",
        instruction:
          'Open your about.html and change one link\'s href to a file that doesn\'t exist, like "oops.html". Open it in your browser and click the broken link.',
        expectedOutcome:
          "You should see a 404 error or 'file not found' page.",
        question: "What did the browser show when you clicked the broken link?",
      },
      {
        id: "L3B4S2",
        instruction:
          "Now fix the link back. Notice how easy it is to break things with a small typo.",
        expectedOutcome: "The link works again.",
        question:
          "Why is it important to test all links after AI generates multi-page sites?",
      },
    ],
  },

  // ─── Level 4: Make It Interactive (4 blocks) ───
  {
    id: "L4B1",
    levelId: 4,
    type: "theory",
    title: "Adding Interactivity",
    xp: 10,
    required: true,
    order: 1,
    content: `# Adding Interactivity with JavaScript

HTML = structure. CSS = style. JavaScript = **behavior**.

JavaScript makes things happen when users interact:
- Click a button → show/hide content
- Type in a field → validate input
- Scroll the page → animate elements

## How to prompt for JavaScript

Be specific about **what triggers what**:

❌ "Add some JavaScript"
✅ "When the user clicks the 'Show More' button, toggle the visibility of the details section below it"

## Common interactive patterns

| Pattern | Prompt keywords |
|---------|----------------|
| Show/hide | "toggle visibility", "show/hide on click" |
| Counter | "increment/decrement on click", "display count" |
| Form validation | "validate email format", "show error message" |
| Dark mode | "toggle dark/light theme", "save preference" |
| Accordion | "expand/collapse sections", "one open at a time" |

Always tell AI **exactly** what the interaction should do.`,
    miniQuiz: [
      {
        question: "Which prompt will produce better JavaScript?",
        options: [
          '"Add JavaScript to make the page interactive"',
          '"When clicking the Submit button, validate the email field — show a red error message below if empty, green success if valid format"',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L4B2",
    levelId: 4,
    type: "prompt",
    title: "Write an Interactivity Prompt",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "full",
    goal: "Write a prompt that adds specific interactive behavior to your site",
    referencePrompt:
      "Add JavaScript interactivity to my index.html: 1) A counter section with a number display starting at 0, a '+' button that increments, and a '-' button that decrements (don't go below 0). 2) A 'Show More' button that toggles the visibility of a hidden details section. 3) The counter value should change color — green above 5, red at 0. Use vanilla JavaScript, no frameworks.",
    template:
      "Add JavaScript interactivity to my index.html: 1) A ___ section with ___ starting at ___, a ___ button that ___, and a ___ button that ___. 2) A ___ button that toggles ___. Use vanilla JavaScript, no frameworks.",
    hints: [
      "Describe each interactive element",
      "Specify what triggers what",
      "Mention edge cases (e.g., don't go below 0)",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L4B3",
    levelId: 4,
    type: "build",
    title: "Push Interactive Features",
    xp: 30,
    required: true,
    order: 3,
    mission:
      "Add JavaScript interactivity — a button that shows/hides content, a counter, or a form that validates. Push to repo.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["<script", "function"] },
      ],
      minCommits: 4,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review the JavaScript. Is there genuine interactivity? Look for event listeners, DOM manipulation, user-triggered behavior.",
    passingScore: 55,
  },
  {
    id: "L4B4",
    levelId: 4,
    type: "experiment",
    title: "What Breaks If You Remove the Script?",
    xp: 15,
    required: false,
    order: 4,
    description:
      "Understanding what JavaScript does by removing it temporarily.",
    steps: [
      {
        id: "L4B4S1",
        instruction:
          "Comment out the entire <script> tag in your index.html (wrap it in <!-- -->). Open in browser.",
        expectedOutcome:
          "The page loads but buttons do nothing. The structure (HTML) and style (CSS) still work.",
        question: "What still works without JavaScript? What doesn't?",
      },
      {
        id: "L4B4S2",
        instruction: "Uncomment the script tag to restore functionality.",
        expectedOutcome: "Everything works again.",
        question:
          "Why is it important that pages still look good even without JavaScript?",
      },
    ],
  },

  // ─── Level 5: Portfolio Boss (3 blocks) ───
  {
    id: "L5B1",
    levelId: 5,
    type: "quiz",
    title: "World 1 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What are the three parts of the Basic Prompt Pattern?",
        options: [
          "HTML, CSS, JavaScript",
          "Task, Context, Format",
          "Input, Process, Output",
          "Header, Body, Footer",
        ],
        correctIndex: 1,
        explanation:
          "The Basic Prompt Pattern structures your AI requests: Task (what to build), Context (background info), Format (how to output it).",
      },
      {
        question: "Why should you use specific hex colors in styling prompts?",
        options: [
          "AI can only understand hex colors",
          "Specific colors give you predictable, intentional results instead of generic defaults",
          "Hex colors load faster",
          "It's required by HTML standards",
        ],
        correctIndex: 1,
        explanation:
          "Vague styling requests give vague results. Specific hex codes ensure AI generates exactly the look you want.",
      },
      {
        question:
          "When building a multi-page site, what should you always mention in your prompt?",
        options: [
          "The file size limit",
          "Shared navigation and consistent styling across all pages",
          "The server configuration",
          "The browser compatibility",
        ],
        correctIndex: 1,
        explanation:
          "AI often generates inconsistent navigation across pages. Explicitly asking for shared nav prevents this.",
      },
      {
        question:
          'What\'s wrong with the prompt: "Add some JavaScript to make it interactive"?',
        options: [
          "JavaScript is the wrong language",
          "It's too vague — AI doesn't know what interactions to create",
          "You should use TypeScript instead",
          "Nothing, it's a good prompt",
        ],
        correctIndex: 1,
        explanation:
          "Good prompts specify exactly what interaction should happen: what the trigger is and what the result should be.",
      },
      {
        question:
          "What happens to a page if you remove all JavaScript but keep HTML and CSS?",
        options: [
          "The page crashes",
          "The page shows structure and style but interactive features stop working",
          "Nothing changes",
          "The page goes blank",
        ],
        correctIndex: 1,
        explanation:
          "HTML provides structure, CSS provides styling — both work without JavaScript. JS adds behavior/interactivity on top.",
      },
    ],
    passingScore: 3,
  },
  {
    id: "L5B2",
    levelId: 5,
    type: "prompt",
    title: "Design Your Portfolio Prompt",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "full",
    goal: "Write a comprehensive prompt for building a complete portfolio site",
    referencePrompt:
      "Build a complete personal portfolio website as a single index.html file with inline CSS and JavaScript. Include: 1) Hero section with my name, title, and a professional tagline. 2) About section with a brief bio. 3) Projects section with at least 2 project cards — each with a title, description, and a link. 4) Contact section with a form (name, email, message fields) with client-side validation. 5) Responsive design that works on mobile. Style: modern dark theme, sans-serif font, smooth scroll between sections, subtle hover animations on cards and buttons.",
    template:
      "Build a complete personal portfolio website as a single ___ file with ___. Include: 1) Hero section with ___. 2) About section with ___. 3) Projects section with at least ___ project cards. 4) Contact section with a form (___) with ___. 5) Responsive design. Style: ___.",
    hints: [
      "List all sections you need",
      "Describe each section's content",
      "Specify responsive behavior",
      "Define the overall style/theme",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L5B3",
    levelId: 5,
    type: "build",
    title: "Ship Your Portfolio",
    xp: 200,
    required: true,
    order: 3,
    mission:
      "Build a complete personal portfolio site: hero, about, projects (2+), contact form, responsive design. This is your first real ship.",
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
      "Boss level — be thorough. Check for: hero section, about section, at least 2 project cards, contact form, responsive design, polished CSS. Should look like a real portfolio.",
    passingScore: 60,
  },
];
