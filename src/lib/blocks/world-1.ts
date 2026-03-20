import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 1 — Idea to Internet (Levels 1-4)
// PRD → first build → deploy → verify
// ═══════════════════════════════════════

export const WORLD_1_BLOCKS: Block[] = [
  // ─── Level 1: What is Vibe Coding (4 blocks) ───
  {
    id: "L1B1",
    levelId: 1,
    type: "theory",
    title: "What is Vibe Coding?",
    xp: 10,
    required: true,
    order: 1,
    content: `# What is Vibe Coding?

Vibe coding = you describe what you want, AI builds it, you verify it works.

You're not a programmer. You're a **director**. AI is your team — it writes the code, sets up the project, deploys to the internet. Your job: tell it what to build and check that it built the right thing.

## The Loop

Every feature you build follows the same loop:

1. **Describe** what you want (a prompt)
2. **AI builds** it (code appears)
3. **You test** — does it work? Does it look right?
4. **You iterate** — "change the button color" / "the link is broken"
5. **You ship** — push to GitHub, live on the internet

That's it. You'll do this loop hundreds of times. The better you get at step 1 (describing), the less time you spend on step 4 (fixing).

## What This Course Teaches

This is NOT a coding course. You won't memorize JavaScript syntax or CSS properties. AI knows all of that better than any human.

What you WILL learn:
- How to describe what you want so AI builds the right thing
- How to spot when AI messes up (it will — a lot)
- How to manage a real project: database, auth, payments, deploy
- How to go from idea to live SaaS that takes money`,
    miniQuiz: [
      {
        question: "What's the most important skill for a vibe coder?",
        options: [
          "Memorizing JavaScript syntax",
          "Describing what you want clearly and verifying the result",
          "Writing code faster than AI",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L1B2",
    levelId: 1,
    type: "theory",
    title: "How AI Thinks",
    xp: 10,
    required: true,
    order: 2,
    content: `# How AI Thinks (And Why It Gives You Purple Gradients)

AI has **defaults**. When you say "make it look good," AI reaches for what it's seen most often in its training data:

- **Font:** Inter (safe, everywhere)
- **Colors:** Purple/indigo gradient (most common in AI demos)
- **Framework:** React + Tailwind (what 90% of tutorials use)
- **Database:** Whatever the AI prefers that week

This isn't wrong — it's just not YOUR brand. If you don't tell AI what you want, it fills in the blanks with the most popular choice.

## The Fix: Be Specific

| Vague prompt | What AI gives you | Better prompt |
|---|---|---|
| "make it look good" | Purple gradient, Inter font | "Dark navy (#0F172A), cyan accents (#22D3EE), Inter font, minimal" |
| "add a database" | Random ORM setup | "Use Supabase. Create a 'projects' table with: name, description, user_id" |
| "make it responsive" | Broken on some screens | "Must work on mobile 375px. Stack cards vertically on mobile, 3-column grid on desktop" |
| "add login" | DIY password hashing | "Use Supabase Auth with Google OAuth. Redirect to /dashboard after login" |

## Tools You'll Use

There's no single "best" tool. Different tools for different jobs:

| Tool | Best for | How it works |
|---|---|---|
| **Lovable / Bolt.new** | Quick MVP in a day | Describe, see result, deploy. Browser-based |
| **Cursor** | Building production apps | VS Code + AI. You see and edit the code |
| **Claude Code** | Complex features, big changes | Terminal-based. AI reads entire codebase, makes multi-file changes |

Most founders use **Lovable/Bolt to validate the idea**, then **Cursor or Claude Code to build the real product**.`,
    miniQuiz: [
      {
        question:
          "Why does AI give you Inter font and purple gradients by default?",
        options: [
          "Purple is objectively the best color",
          "AI fills in defaults from training data — override with your own specifics",
          "Your monitor is probably miscalibrated",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L1B3",
    levelId: 1,
    type: "pattern",
    title: "The PRD Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "prd-pattern",
    exercise: {
      goal: "Write a PRD for your SaaS idea using the template",
      template: `# [Your Product Name]

## Problem
[What pain does this solve?]

## Target User
[Who specifically?]

## Core Features (MVP)
1. ___
2. ___
3. ___

## Out of Scope
- ___

## Success Criteria
[How do you know it works?]`,
      exampleFilled: `# FocusFlow — Pomodoro Timer for Remote Teams

## Problem
Remote workers lose track of focus time. Managers interrupt deep work because they can't see who's busy.

## Target User
Remote team leads at startups (5-20 people) who want to protect focus time.

## Core Features (MVP)
1. Personal Pomodoro timer — 25 min focus / 5 min break
2. Team dashboard — see who's in focus mode right now
3. Focus score — weekly report of deep work vs meetings

## Out of Scope
- Calendar integration, Slack bot, mobile app

## Success Criteria
A team lead can see their team's focus time at a glance. Each member runs their own timer.`,
    },
  },
  {
    id: "L1B4",
    levelId: 1,
    type: "quiz",
    title: "Vibe Coding Basics",
    xp: 15,
    required: true,
    order: 4,
    questions: [
      {
        question: "What's the vibe coding loop?",
        options: [
          "Learn syntax → write code → debug → deploy",
          "Describe → AI builds → you test → you iterate → you ship",
          "Copy code from Stack Overflow → paste → pray",
        ],
        correctIndex: 1,
        explanation:
          "Vibe coding = describe what you want, let AI build it, verify, iterate, ship.",
      },
      {
        question: "What should you do BEFORE your first line of code?",
        options: [
          "Learn React and TypeScript",
          "Write a PRD — define the problem, user, and features",
          "Pick a color scheme",
        ],
        correctIndex: 1,
        explanation:
          "A PRD gives AI clear direction. Without it, you get generic output.",
      },
      {
        question: "What is Lovable/Bolt best for?",
        options: [
          "Building production-ready apps with millions of users",
          "Quick MVP validation — see if the idea works before investing time",
          "Writing backend APIs",
        ],
        correctIndex: 1,
        explanation:
          "Lovable/Bolt are great for quick prototypes. Use Cursor or Claude Code for production.",
      },
      {
        question:
          "Why does AI give you Inter font and purple gradients by default?",
        options: [
          "Those are the best design choices",
          "AI fills in defaults from training data — override with your own specifics",
          "Your design brief was too detailed",
        ],
        correctIndex: 1,
        explanation:
          "AI uses what it's seen most. Be specific about YOUR colors, fonts, and style.",
      },
    ],
    passingScore: 3,
  },

  // ─── Level 2: Your Idea on Paper (4 blocks) ───
  {
    id: "L2B1",
    levelId: 2,
    type: "theory",
    title: "Start with a Plan",
    xp: 10,
    required: true,
    order: 1,
    content: `# Start with a Plan, Not a Prompt

The #1 mistake: opening your AI tool and typing "build me a SaaS."

AI without a plan builds **generic garbage.** AI with a PRD builds **your product.**

## The Peter Yang Rule

> "Vibe coding starts with vibe PMing."

Before you touch any AI tool:
1. **Write down your idea** — even 3 sentences
2. **Give it to AI** — "turn this into a proper PRD"
3. **Review the PRD** — does it match your vision?
4. **NOW start building** — with the PRD as context

Your PRD is the most important document in your project. Every prompt you write later will reference it.

## What Makes a Good PRD

A good PRD answers 5 questions:
1. **What problem** does this solve?
2. **Who** has this problem?
3. **What features** solve it? (just 3-5 for MVP)
4. **What are you NOT building** yet?
5. **How do you know** it works?

The "Not building" section is the most important. It prevents scope creep — the #1 project killer.`,
    miniQuiz: [
      {
        question: "What's the most important section of a PRD?",
        options: [
          "The feature list — the more features, the better",
          "The 'Out of Scope' section — it prevents building too much",
          "The color scheme",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L2B2",
    levelId: 2,
    type: "prompt",
    title: "Write Your PRD",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "full",
    goal: "Write a PRD for your SaaS idea. Include: problem, target user, 3-5 core features, out of scope, success criteria.",
    referencePrompt: `I have an idea for a SaaS product. Here's my rough concept:

[FocusFlow — a Pomodoro timer for remote teams. Team leads can see who's in deep work. Weekly focus reports.]

Turn this into a proper PRD with these sections:
1. Product name and one-line description
2. Problem (what pain does this solve?)
3. Target user (who specifically — not "everyone")
4. Core features — MVP only, max 5
5. Out of scope — what we're NOT building yet
6. Success criteria — how do we know it works?

Keep it concrete and specific. No fluff.`,
    passingThreshold: 2.5,
  },
  {
    id: "L2B3",
    levelId: 2,
    type: "pattern",
    title: "The Design Brief",
    xp: 15,
    required: true,
    order: 3,
    patternId: "design-brief",
    exercise: {
      goal: "Write a design brief for your SaaS — colors, fonts, mood, layout",
      template: `## Visual Style
- Mood: ___
- Inspiration: ___

## Colors
- Primary: #___
- Background: #___
- Accent: #___

## Typography
- Font: ___

## Layout
- Style: ___
- Responsive: mobile-first, works on 375px`,
      exampleFilled: `## Visual Style
- Mood: clean, professional, slightly techy
- Inspiration: Linear.app, Vercel.com

## Colors
- Primary: #6366F1 (indigo)
- Background: #0F172A (dark navy)
- Accent: #22D3EE (cyan)

## Typography
- Font: Inter

## Layout
- Style: clean whitespace, card-based features
- Responsive: mobile-first, works on 375px`,
    },
  },
  {
    id: "L2B4",
    levelId: 2,
    type: "prompt",
    title: "Write Your Design Brief",
    xp: 20,
    required: true,
    order: 4,
    scaffold: "full",
    goal: "Write a design brief that prevents AI from giving you generic styling. Include specific hex codes, font, mood, and layout preferences.",
    referencePrompt: `I need a design brief for my SaaS app called FocusFlow. Here's what I want:

Visual style: Clean and professional, inspired by Linear.app and Vercel.com. Not playful — this is a B2B tool.

Colors:
- Primary: #6366F1 (indigo) — main buttons and links
- Background: #0F172A (dark navy) — dark theme
- Accent: #22D3EE (cyan) — highlights and CTAs
- Text: #F8FAFC (off-white)

Typography: Inter font. Large bold headings, no ALL CAPS.

Layout: Clean with generous whitespace. Card-based for features. Must work on mobile 375px — stack cards vertically.

Tone: Professional but approachable. No corporate jargon.`,
    passingThreshold: 2.5,
  },

  // ─── Level 3: First Deploy (4 blocks) ───
  {
    id: "L3B1",
    levelId: 3,
    type: "theory",
    title: "Deploy = Share with the World",
    xp: 10,
    required: true,
    order: 1,
    content: `# Your Site, Live on the Internet

The single most motivating moment: clicking a link and seeing YOUR site on the internet.

## How Deployment Works

1. You push code to **GitHub**
2. **Vercel** watches your GitHub repo
3. Every push = Vercel rebuilds and deploys automatically
4. You get a URL like \`your-app.vercel.app\`

That's it. No servers to configure. No FTP. No SSH. Push, it's live.

## Vercel Free Tier

Vercel's free tier is generous:
- Unlimited personal projects
- Automatic HTTPS (secure)
- Auto-deploy on every git push
- Custom domains (add your own later)

Free is enough to launch and get your first users. You'll only pay when you scale.

## Why Deploy NOW (Level 3, Not Level 30)

Most courses teach deployment last. That's backwards.

- Deploying early forces you to **fix real issues** (not just "works on my machine")
- You can **share your URL** with anyone for feedback
- Every level from here builds on something that's **live on the internet**
- Motivation: seeing your work live is the best fuel`,
    miniQuiz: [
      {
        question: "When should you first deploy your app?",
        options: [
          "After all features are done",
          "As early as possible — even a landing page",
          "Only when you're ready for paying users",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L3B2",
    levelId: 3,
    type: "experiment",
    title: "Set Up Vercel",
    xp: 15,
    required: true,
    order: 2,
    description: "Create a Vercel account and connect your GitHub repo.",
    steps: [
      {
        id: "L3B2S1",
        instruction:
          "Go to **vercel.com** and click **Sign Up**. Use your **GitHub account** to sign up — this connects them automatically.",
        expectedOutcome:
          "You're logged into Vercel and can see the dashboard.",
        question: "Are you logged into Vercel?",
      },
      {
        id: "L3B2S2",
        instruction:
          'Click **Add New Project**. Select **Import Git Repository**. Find your vibeclod projects repo and click **Import**.\n\nLeave all settings as default and click **Deploy**.',
        expectedOutcome:
          "Vercel builds and deploys your repo. You see a success screen with a URL.",
        question: "What URL did Vercel give you?",
      },
      {
        id: "L3B2S3",
        instruction:
          "Click your new URL — you should see your site. Now push any change to GitHub and watch Vercel auto-deploy within seconds.\n\n**Every push = your site updates.** This is the magic.",
        expectedOutcome:
          "Your site is live on the internet. You can share the URL with anyone.",
        question: "Can you open your site on your phone?",
      },
    ],
  },
  {
    id: "L3B3",
    levelId: 3,
    type: "prompt",
    title: "Build Your Landing Page",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "full",
    goal: "Use your PRD and design brief to prompt AI to build a landing page. Should have: headline, description, features, CTA.",
    referencePrompt: `Build a landing page for FocusFlow based on this PRD and design brief:

PRD: FocusFlow is a Pomodoro timer for remote teams. Team leads see who's in deep work. Weekly focus reports. Target: remote team leads at startups.

Design: Dark navy (#0F172A) background, indigo (#6366F1) primary, cyan (#22D3EE) accent. Inter font. Clean whitespace. Mobile-first (375px).

The page needs:
- Hero: headline "Your team's focus time, protected", subheadline, one "Start Free" CTA button
- 3 feature cards: Focus Timer, Team Dashboard, Weekly Reports
- Footer with copyright

Single index.html file with inline CSS. Keep it simple — we'll improve it later.`,
    passingThreshold: 2.5,
  },
  {
    id: "L3B4",
    levelId: 3,
    type: "build",
    title: "Push & Deploy",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Build a landing page using your PRD and design brief. Push to GitHub. Verify it's live on Vercel. Share the URL.",
    githubChecks: {
      fileExists: ["index.html"],
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for a landing page with: clear headline, product description, at least one feature section, CTA button. Custom styling (not default). Should be a real landing page, not a hello-world template.",
    passingScore: 50,
  },

  // ─── Level 4: Trust But Verify — Boss (4 blocks) ───
  {
    id: "L4B1",
    levelId: 4,
    type: "theory",
    title: "AI Makes Mistakes",
    xp: 10,
    required: true,
    order: 1,
    content: `# AI Makes Mistakes — Your Job is to Catch Them

45% of AI-generated code has issues. Not "might have" — **does have.** Common problems:

## The Usual Suspects

1. **Dead buttons** — looks like a button, does nothing when clicked
2. **Broken links** — href="#" or links to pages that don't exist
3. **Not responsive** — looks great on desktop, garbage on mobile
4. **Hardcoded data** — "Lorem ipsum" or duplicate content instead of real data
5. **Missing states** — no loading indicator, no error message, no empty state

## Your Secret Weapon: DevTools

Every browser has built-in developer tools. Right-click, **Inspect** (or press F12).

### Console Tab
Shows JavaScript errors in red. If something doesn't work, check here first:
- \`TypeError: Cannot read property...\` = something is undefined
- \`404 Not Found\` = a file or page is missing
- \`CORS error\` = API request blocked

### Elements Tab
Shows HTML structure. Hover over elements to see size and spacing. Useful for layout issues.

### Network Tab
Shows every request your page makes. If data isn't loading, check if the API call succeeded (200) or failed (400, 500).

You don't need to understand everything in DevTools. Just check Console for red errors. That catches 80% of issues.`,
    miniQuiz: [
      {
        question:
          "What's the first thing to check when something doesn't work?",
        options: [
          "Rewrite the entire feature from scratch",
          "Check the DevTools Console for red error messages",
          "Change the font to something nicer",
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
<head>
  <title>TaskFlow</title>
  <style>
    body { font-family: Arial; margin: 0; background: #1a1a2e; color: white; }
    .hero { text-align: center; padding: 80px 20px; }
    .hero h1 { font-size: 48px; }
    .hero p { font-size: 18px; color: #aaa; }
    .btn { background: #6C63FF; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; }
    .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 40px; }
    .card { background: #16213e; padding: 24px; border-radius: 12px; }
    .card h3 { color: #6C63FF; }
    .nav { display: flex; justify-content: space-between; padding: 20px 40px; }
    .nav a { color: white; text-decoration: none; }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="/">TaskFlow</a>
    <div>
      <a href="#features">Features</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#pricing">Pricing</a>
    </div>
  </nav>
  <div class="hero">
    <h1>Ship Projects Faster</h1>
    <p>The project tool for small teams who hate complexity.</p>
    <button class="btn">Watch Demo</button>
  </div>
  <div class="features" id="features">
    <div class="card">
      <h3>Kanban Boards</h3>
      <p>Drag and drop tasks across columns. Simple as sticky notes.</p>
    </div>
    <div class="card">
      <h3>Time Tracking</h3>
      <p>Know where your team's hours go. Built-in, not bolted on.</p>
    </div>
    <div class="card">
      <h3>Kanban Boards</h3>
      <p>Drag and drop tasks across columns. Simple as sticky notes.</p>
    </div>
  </div>
</body>
</html>`,
    language: "html",
    description:
      "This is a landing page AI generated for TaskFlow. Find the problems before shipping it.",
    knownIssues: [
      {
        id: "broken-link",
        lineRange: [26, 26],
        description:
          "Link to #testimonials but there's no testimonials section — clicking it does nothing.",
        severity: "warning",
      },
      {
        id: "dead-button",
        lineRange: [33, 33],
        description:
          "Watch Demo button has no onclick handler — clicking it does nothing.",
        severity: "critical",
      },
      {
        id: "no-responsive",
        lineRange: [10, 10],
        description:
          "Features grid is always 3 columns. On mobile (375px) cards will be crushed. No responsive breakpoint.",
        severity: "critical",
      },
      {
        id: "duplicate-card",
        lineRange: [40, 43],
        description:
          "Third feature card is a copy-paste of the first (Kanban Boards). AI duplicated instead of creating a unique third feature.",
        severity: "warning",
      },
    ],
    minIssuesFound: 3,
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
        id: "L4B3S1",
        title: "Dead button",
        description:
          "The 'Watch Demo' button looks great but does nothing when clicked.",
        brokenCode: `<button class="btn">Watch Demo</button>`,
        language: "html",
        hint: "Add an onclick that does something — scroll to a section, open a modal, or navigate to a page.",
        expectedFix:
          "Button should have an onclick handler or be wrapped in an anchor tag that does something when clicked.",
      },
      {
        id: "L4B3S2",
        title: "Broken on mobile",
        description:
          "The features grid forces 3 columns even on a 375px phone. Cards are crushed and text overflows.",
        brokenCode: `.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 40px; }`,
        language: "css",
        hint: "Add a responsive approach: 1 column on mobile, 3 on desktop.",
        expectedFix:
          "Should have responsive grid: single column on mobile, 3 columns on desktop. Cards readable on 375px.",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L4B4",
    levelId: 4,
    type: "build",
    title: "Ship a Polished Landing Page",
    xp: 100,
    required: true,
    order: 4,
    mission:
      "Boss level: fix all issues in your landing page. All links work, buttons function, responsive on mobile, no duplicates. Deploy to Vercel.",
    githubChecks: {
      fileExists: ["index.html"],
      minCommits: 4,
      minFiles: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: all links go somewhere real, all buttons have actions, responsive on mobile (375px), no duplicate content, no placeholder text. Should look professional and work completely.",
    passingScore: 60,
  },
];
