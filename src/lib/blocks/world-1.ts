import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 1 — Hello, Vibe (Levels 1-5)
// First HTML/CSS/JS sites. Scaffold: "full"
// Patterns: Basic Prompt, Styling
// ═══════════════════════════════════════

export const WORLD_1_BLOCKS: Block[] = [
  // ─── Level 1: Your First Prompt (4 blocks) ───
  {
    id: "L1B1",
    levelId: 1,
    type: "theory",
    title: "What is Vibe Coding?",
    xp: 10,
    required: true,
    order: 1,
    content: `# What is Vibe Coding?

Think of it like being a **movie director**. You don't act in the scenes, but you need to know exactly what movie you want to make.

**You describe → AI builds → you ship.**

The skill isn't writing code. It's **knowing what to ask for**. A great director doesn't need to operate the camera — but they need a crystal-clear vision.

This course teaches you to be a great director.

## The Loop

1. **Describe** what you want (the prompt)
2. **Generate** — AI writes the code
3. **Verify** — you check it works
4. **Ship** — push it live

That's it. Every level, every project, every real thing you build follows this loop.`,
    miniQuiz: [
      {
        question: "What's the most important skill in vibe coding?",
        options: [
          "Memorizing programming syntax",
          "Knowing how to describe what you want",
          "Typing faster than the AI",
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
      goal: "Write a prompt using [TASK] + [CONTEXT] + [FORMAT]",
      template: `[TASK]: ___
[CONTEXT]: ___
[FORMAT]: ___`,
      exampleFilled: `[TASK]: Create an HTML page with a headline and a blue button
[CONTEXT]: Simple static page, modern clean design
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
    goal: "Write a prompt for an HTML page with headline and button",
    referencePrompt:
      "Create an HTML page with a large headline that says 'Hello World' and a styled button below it. Use inline CSS — center everything, clean sans-serif font, blue button with white text and rounded corners. Single index.html file.",
    template:
      "Create an HTML page with a large headline that says '___' and a styled ___ below it. Use inline CSS — center everything, ___ font, ___ button with ___ text. Single ___ file.",
    hints: [
      "Describe what elements should be on the page",
      "Specify the styling approach",
      "Mention the output format",
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
      "Use AI to generate an HTML page. Push it to your repo as index.html.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["<button", "<h1"] },
      ],
      minCommits: 1,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check if index.html is a valid HTML page with visible heading and button. Should look intentional.",
    passingScore: 50,
  },

  // ─── Level 2: Make It Pretty (4 blocks) ───
  {
    id: "L2B1",
    levelId: 2,
    type: "theory",
    title: "Styling Vocabulary",
    xp: 10,
    required: true,
    order: 1,
    content: `# Styling Vocabulary

You don't need to know CSS. You need the **right words**.

It's like ordering food — you don't need to cook, but "grilled salmon with lemon butter sauce" gets way better results than "fish, make it good."

## Words That Work

| Category | Good words for prompts |
|----------|----------------------|
| **Colors** | hex codes (#0f172a), gradient, palette |
| **Layout** | centered, flexbox, grid, max-width |
| **Fonts** | sans-serif, Inter, Google Fonts, font-weight |
| **Spacing** | padding 24px, margin, gap between elements |
| **Effects** | box-shadow, rounded corners, hover effect |

## The Key Insight

Be **SPECIFIC**.

- "dark navy background #0f172a" beats "dark background"
- "Inter font at 18px" beats "nice font"
- "blue button #3b82f6 with white text" beats "colored button"

The more specific your words, the closer the AI gets to what you imagined.`,
    miniQuiz: [
      {
        question: "Which styling prompt will get better results?",
        options: [
          '"Make the page look nice with good colors"',
          '"Dark navy background #0f172a, white text, Inter font, centered with 32px padding"',
          '"Add CSS please"',
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
      goal: "Use the Styling Pattern to describe your page's look",
      template: `Style the page with:
- Colors: ___
- Layout: ___
- Typography: ___
- Spacing: ___
- Effects: ___`,
      exampleFilled: `Style the page with:
- Colors: background #0f172a, text #e2e8f0, accent #3b82f6
- Layout: centered vertically and horizontally, max-width 600px
- Typography: Inter font from Google Fonts, heading 48px bold, body 18px
- Spacing: 32px padding, 16px gap between elements
- Effects: button hover brightens, subtle box-shadow on container, rounded-lg corners`,
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
    goal: "Add CSS styling to your page with specific colors, fonts, and layout",
    referencePrompt:
      "Update my index.html to look like a modern landing page. Dark navy background (#0f172a), light gray text (#e2e8f0), bright blue accent (#3b82f6) for the button. Center everything with flexbox. Inter font from Google Fonts — heading at 48px bold, body at 18px. 32px padding, 16px gap between elements. Button: rounded corners, padding 12px 24px, hover effect that brightens the color. Subtle box-shadow on the main container.",
    template:
      "Update my index.html to look like a modern landing page. ___ background (___), ___ text (___), ___ accent (___) for the button. Center everything with ___. ___ font from Google Fonts. ___ padding, ___ gap. Button: ___ corners, ___ hover effect.",
    hints: [
      "Specify exact colors with hex codes",
      "Name a specific font",
      "Describe the layout method (flexbox or grid)",
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
      "Add CSS styling — custom colors, fonts, centered layout. Push to your repo.",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        { path: "index.html", contains: ["style", "color", "font"] },
      ],
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Review the CSS styling. Does it look intentional and polished? Check for custom colors, proper fonts, centered layout. Should not look like unstyled default HTML.",
    passingScore: 55,
  },

  // ─── Level 3: Pages & Clicks (4 blocks) ───
  {
    id: "L3B1",
    levelId: 3,
    type: "theory",
    title: "Bigger Projects",
    xp: 10,
    required: true,
    order: 1,
    content: `# Bigger Projects

Real websites aren't one page. They're a collection of pages connected by a **navigation bar** — the row of links at the top.

## Two Key Concepts for Your Prompts

### 1. Multi-Page = Shared Navigation

When you ask AI to build multiple pages, ALWAYS mention:
- **"Shared navigation"** — identical nav bar on every page
- **"Consistent styling"** — same colors, fonts, spacing everywhere

AI loves to make each page look slightly different. Pin it down.

### 2. Interactivity = Trigger + Result

For anything interactive, describe the **trigger** and the **result**:

- "When user clicks the menu icon, **show** the mobile nav"
- "When user clicks 'Read More', **expand** the hidden text"
- "When user clicks the counter button, **increment** the number"

Trigger → Result. That's how AI understands what you want.`,
    miniQuiz: [
      {
        question:
          "What should you always mention when prompting for a multi-page site?",
        options: [
          "The server configuration",
          "Shared navigation and consistent styling",
          "The JavaScript framework to use",
        ],
        correctIndex: 1,
      },
    ],
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
    goal: "Write a prompt for a 3-page site with navigation and interactivity",
    referencePrompt:
      "Create a 3-page website: index.html, about.html, and projects.html. Every page must have an identical navigation bar at the top with links to all 3 pages. The current page's link should be visually highlighted (bold or different color). Use consistent styling across all pages — same color scheme, fonts, and layout. On the home page, add a click counter: a button that shows a number starting at 0, incrementing on each click. Use vanilla JavaScript, no frameworks.",
    template:
      "Create a ___-page website: ___, ___, and ___. Every page must have an identical ___ at the top with links to all ___ pages. The current page's link should be visually ___. Use consistent ___ across all pages. On the home page, add a ___: a ___ that ___.",
    hints: [
      "List all page filenames",
      "Mention shared navigation",
      "Describe one interactive feature with trigger and result",
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
      "Create 3+ HTML pages with shared navigation and at least one interactive JavaScript feature.",
    githubChecks: {
      fileExists: ["index.html", "about.html"],
      fileContains: [
        { path: "index.html", contains: ["<a", "href", "<script"] },
      ],
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for 3+ HTML pages with working navigation between them. Should have consistent styling, a shared nav bar, and at least one JavaScript interaction.",
    passingScore: 55,
  },
  {
    id: "L3B4",
    levelId: 3,
    type: "experiment",
    title: "Break Something, See What Happens",
    xp: 15,
    required: true,
    order: 4,
    description:
      "Understanding what happens when things go wrong helps you debug later.",
    steps: [
      {
        id: "L3B4S1",
        instruction:
          "Change a link's href to a file that doesn't exist (e.g., \"oops.html\"). Click it in your browser. What shows up?",
        expectedOutcome:
          "You'll see a 404 error or 'file not found' page. Links only work when the target file actually exists.",
        question: "What did the browser show when you clicked the broken link?",
      },
      {
        id: "L3B4S2",
        instruction:
          "Comment out the <script> tag by wrapping it in <!-- -->. Reload the page. What still works?",
        expectedOutcome:
          "The structure (HTML) and styling (CSS) still work fine. Only the interactive features (buttons, counters) stop working.",
        question:
          "What's the difference between what HTML/CSS do and what JavaScript does?",
      },
    ],
  },

  // ─── Level 4: Trust But Verify (4 blocks) ───
  {
    id: "L4B1",
    levelId: 4,
    type: "theory",
    title: "Don't Blindly Trust AI",
    xp: 10,
    required: true,
    order: 1,
    content: `# Don't Blindly Trust AI

AI is like a **fast but careless intern**. It delivers quick, but it makes mistakes. Every. Single. Time.

## Common AI Mistakes

- **Broken links** — wrong filenames (about.html vs About.html)
- **Dead buttons** — looks clickable, does nothing (missing event handler)
- **Inconsistent styling** — page 1 looks different from page 2
- **Duplicate code** — copy-pasted blocks instead of reusing

## Your Job: Always Test

After AI generates code, you are the **quality inspector**:

1. **Click every link** — do they all go where they should?
2. **Press every button** — does something actually happen?
3. **Check on mobile** — resize the browser window. Does it still look good?
4. **Compare pages** — is the nav identical? Same fonts and colors?

The vibe coder who tests is the vibe coder who ships working products. The one who doesn't... ships broken ones.

## Your Browser Has Superpowers: DevTools

Your browser has a built-in toolkit that makes verification 10x easier. Right-click anywhere on a page and click **Inspect** (or press F12).

### Console tab
Shows **errors** in red. If a button does nothing, the Console usually tells you why. This is the first place to look when something breaks.

### Elements tab
Shows the **HTML structure** of the page. You can see every element, its classes, and its styles. Great for checking if AI put the right CSS on things.

### Network tab
Shows every **request** your page makes — API calls, images, scripts. If data isn't loading, check here to see if the request failed (red = bad).

### How to use it
1. Right-click → **Inspect** (or press F12)
2. **Console** for errors
3. **Elements** for HTML/CSS inspection
4. **Network** for API calls and loading issues

DevTools is your verification superpower. Use it every time you test AI-generated code.`,
    miniQuiz: [
      {
        question: "What should you do AFTER AI generates code?",
        options: [
          "Immediately push it to GitHub",
          "Test everything: click links, press buttons, check mobile",
          "Rewrite it from scratch",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L4B2",
    levelId: 4,
    type: "review",
    title: "Spot the Problems",
    xp: 20,
    required: true,
    order: 2,
    code: `<!DOCTYPE html>
<html>
<head><title>My Site</title></head>
<body>
  <nav>
    <a href="index.html">Home</a>
    <a href="About.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>

  <h1>Welcome to My Site</h1>
  <button id="cta-btn">Click Me</button>

  <style>
    body { font-family: Arial; background: #1a1a2e; color: white; }
    nav a { color: #8888ff; margin-right: 16px; }
  </style>
</body>
</html>`,
    language: "html",
    description:
      "This HTML page was generated by AI. It looks fine at first glance — but there are real problems hiding in it. Can you find them?",
    knownIssues: [
      {
        id: "L4B2I1",
        lineRange: [7, 7],
        description:
          "Broken link: 'About.html' has a capital A but the actual file is probably 'about.html' — case sensitivity breaks links on most servers",
        severity: "critical",
      },
      {
        id: "L4B2I2",
        lineRange: [12, 12],
        description:
          "Button has no onclick handler or event listener — clicking it does absolutely nothing",
        severity: "critical",
      },
      {
        id: "L4B2I3",
        lineRange: [5, 9],
        description:
          "No way to tell which page is currently active — the nav looks identical on every page",
        severity: "warning",
      },
      {
        id: "L4B2I4",
        lineRange: [14, 17],
        description:
          "No responsive styling — this will look bad on mobile devices (no viewport meta tag, no media queries)",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L4B3",
    levelId: 4,
    type: "debug",
    title: "Fix What AI Broke",
    xp: 20,
    required: true,
    order: 3,
    scenarios: [
      {
        id: "L4B3D1",
        title: "Navigation link points to wrong file",
        description:
          "The 'About' link in the nav doesn't work. Clicking it gives a 404 error. The actual file is named 'about.html' (lowercase).",
        brokenCode: `<nav>
  <a href="index.html">Home</a>
  <a href="About.html">About</a>
  <a href="contact.html">Contact</a>
</nav>`,
        language: "html",
        hint: "Look at the capitalization of the filename. Most web servers are case-sensitive.",
        expectedFix:
          "Change 'About.html' to 'about.html' — filenames must match exactly, including case",
      },
      {
        id: "L4B3D2",
        title: "Button has onclick but function doesn't exist",
        description:
          "Clicking the 'Subscribe' button throws an error in the browser console: 'handleSubscribe is not defined'.",
        brokenCode: `<button onclick="handleSubscribe()">Subscribe</button>

<script>
  function handleSubscription() {
    alert("Subscribed!");
  }
</script>`,
        language: "html",
        hint: "Compare the function name in onclick with the function name in the script. Read carefully.",
        expectedFix:
          "The onclick calls 'handleSubscribe()' but the function is named 'handleSubscription()' — the names don't match",
      },
    ],
    passingCount: 1,
  },
  {
    id: "L4B4",
    levelId: 4,
    type: "quiz",
    title: "World 1 Review",
    xp: 25,
    required: true,
    order: 4,
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
          "The Basic Prompt Pattern: [TASK] what to build + [CONTEXT] background details + [FORMAT] how to output it.",
      },
      {
        question: "Why should you use specific hex color codes in styling prompts?",
        options: [
          "AI can only understand hex colors",
          "Specific colors give predictable results instead of generic defaults",
          "Hex colors load faster in browsers",
          "It's required by HTML standards",
        ],
        correctIndex: 1,
        explanation:
          "Vague requests like 'nice colors' give random results. Specific hex codes like #0f172a get you exactly what you want.",
      },
      {
        question:
          "When building a multi-page site, what should you always mention?",
        options: [
          "The JavaScript framework",
          "Shared navigation and consistent styling",
          "The server hosting provider",
          "Browser compatibility requirements",
        ],
        correctIndex: 1,
        explanation:
          "AI often makes each page look slightly different. Explicitly mentioning shared nav and consistent styling prevents this.",
      },
      {
        question: "What's a common AI mistake with buttons?",
        options: [
          "Making them too big",
          "Adding a button that looks clickable but has no event handler",
          "Using the wrong color",
          "Placing them at the bottom of the page",
        ],
        correctIndex: 1,
        explanation:
          "AI frequently generates buttons that look perfect but do nothing — always click every button to check.",
      },
      {
        question: "What is the core philosophy of vibe coding?",
        options: [
          "Write code faster than anyone else",
          "Memorize every programming language",
          "Describe what you want, let AI build it, verify and ship",
          "Never look at the code AI generates",
        ],
        correctIndex: 2,
        explanation:
          "Vibe coding is about being a great director: describe clearly, generate with AI, verify it works, then ship.",
      },
    ],
    passingScore: 3,
  },

  // ─── Level 5: Portfolio Boss (3 blocks) ───
  {
    id: "L5B1",
    levelId: 5,
    type: "prompt",
    title: "Design Your Portfolio",
    xp: 30,
    required: true,
    order: 1,
    scaffold: "full",
    goal: "Write a comprehensive prompt for a complete portfolio site",
    referencePrompt:
      "Build a complete personal portfolio website as a single index.html file with inline CSS and JavaScript. Include: 1) Hero section — my name in large text, a professional title, and a one-line tagline. 2) About section — short bio paragraph. 3) Projects section — at least 2 project cards, each with title, description, and a link. 4) Contact section — form with name, email, and message fields with basic validation (required fields). 5) Responsive design — works on mobile (single column) and desktop (wider layout). Style: modern dark theme (#0f172a background), sans-serif font, smooth scroll between sections, subtle hover animations on project cards and buttons.",
    template:
      "Build a complete personal portfolio website as a single ___ file with inline CSS and JavaScript. Include: 1) Hero section — ___. 2) About section — ___. 3) Projects section — at least ___ project cards with ___. 4) Contact section — form with ___ with ___. 5) Responsive design — ___. Style: ___.",
    hints: [
      "List every section and what goes in it",
      "Specify the form fields and validation",
      "Mention responsive behavior",
      "Describe the overall theme and style",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L5B2",
    levelId: 5,
    type: "build",
    title: "Ship Your Portfolio",
    xp: 200,
    required: true,
    order: 2,
    mission:
      "Build a complete portfolio: hero, about, 2+ projects, contact form, responsive. Your first real ship.\n\nSuggested project: TaskFlow landing page (hero, features, contact form)",
    githubChecks: {
      fileExists: ["index.html"],
      fileContains: [
        {
          path: "index.html",
          contains: ["<form", "project", "style"],
        },
      ],
      minCommits: 5,
      minFiles: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level — be thorough. Check for: hero section with name/title, about section, at least 2 project cards, contact form with validation, responsive design, polished CSS. Should look like a real portfolio someone would be proud of.",
    passingScore: 60,
  },
  {
    id: "L5B3",
    levelId: 5,
    type: "theory",
    title: "What You Just Built",
    xp: 10,
    required: true,
    order: 3,
    content: `# What You Just Built

You've now completed the vibe coding loop **five times**. Look at what you can do:

1. Write a clear prompt
2. Get AI to generate working code
3. Verify it actually works
4. Ship it to the world

That's the foundation for **everything**. Every startup, every app, every product follows this same loop — just at a bigger scale.

## What's Next

You've been building with raw HTML files. That works for simple sites, but real projects need **professional tools**: a terminal, a package manager, version control.

Don't worry — they're not scary. They're just tools that make bigger projects possible.

You're not learning to code. You're learning to **build**.`,
  },
];
