import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 2 — Your Toolkit (Levels 5-7)
// Git, CLAUDE.md, code reading, DevTools
// ═══════════════════════════════════════

export const WORLD_2_BLOCKS: Block[] = [
  // ─── Level 5: Save Your Work (4 blocks) ───
  {
    id: "L5B1",
    levelId: 5,
    type: "theory",
    title: "Git = Game Saves",
    xp: 10,
    required: true,
    order: 1,
    content: `# Git = Save Points for Your Code

Imagine playing a game for 3 hours without saving. Then your computer crashes. Everything gone.

That's coding without git.

## The Three Commands

| Command | What it does | Game analogy |
|---|---|---|
| \`git add .\` | Select which changes to save | Choose save slot |
| \`git commit -m "message"\` | Save a snapshot | Save the game |
| \`git push\` | Upload to GitHub | Backup to cloud |

## Why Messages Matter

Bad: \`git commit -m "update"\`
Good: \`git commit -m "add pricing section to landing page"\`

When something breaks, you'll scroll through your commits looking for what changed. "update" tells you nothing. "add pricing section" tells you exactly what happened.

## The Golden Rule

Commit often. After every working change. Not at the end of the day.

- Added a feature? Commit.
- Fixed a bug? Commit.
- Changed the design? Commit.

Small commits = easy rollbacks. One giant commit = impossible to undo.`,
    miniQuiz: [
      {
        question: "How often should you commit?",
        options: [
          "Once at the end of the day",
          "After every working change",
          "Only when the project is done",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L5B2",
    levelId: 5,
    type: "theory",
    title: "When AI Breaks Everything",
    xp: 10,
    required: true,
    order: 2,
    content: `# When AI Breaks Everything (And It Will)

AI will occasionally destroy your project. It'll rewrite a file you didn't ask it to touch, delete something important, or introduce a bug that cascades everywhere.

Don't panic. Git has your back.

## Undo Last Commit

\`\`\`
git revert HEAD
\`\`\`
Creates a NEW commit that undoes the last one. Safe — doesn't delete history.

## See What Changed

\`\`\`
git diff
\`\`\`
Shows every line that changed since your last commit. Useful to see what AI actually did.

## Stash (Pocket Save)

\`\`\`
git stash
\`\`\`
Puts your current changes in a pocket. Your code goes back to the last commit. When you want the changes back: \`git stash pop\`.

## .gitignore — What NOT to Save

Some files should NEVER go to GitHub:

\`\`\`
# .gitignore
node_modules/
.env
.env.local
.next/
dist/
\`\`\`

- \`node_modules/\` — huge folder of dependencies (anyone can recreate with \`npm install\`)
- \`.env\` / \`.env.local\` — YOUR secrets (API keys, database passwords)
- \`.next/\` — build output (Vercel rebuilds this)

If you push .env to GitHub, your secrets are public. **This is the #1 security mistake.**`,
    miniQuiz: [
      {
        question: "What should NEVER be committed to GitHub?",
        options: [
          "package.json",
          ".env files with API keys and passwords",
          "index.html",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L5B3",
    levelId: 5,
    type: "experiment",
    title: "Practice Git Saves",
    xp: 15,
    required: true,
    order: 3,
    description: "Make commits, break something, roll it back.",
    steps: [
      {
        id: "L5B3S1",
        instruction:
          "Make a change to your project (add a paragraph to your page, change a color — anything). Then:\n\n```\ngit add .\ngit commit -m \"add new paragraph to hero section\"\ngit push\n```\n\nCheck GitHub — your change should be there.",
        expectedOutcome: "Your commit appears on GitHub with the correct message.",
        question: "Can you see your commit on GitHub?",
      },
      {
        id: "L5B3S2",
        instruction:
          "Now deliberately break something — delete a section of your page or change colors to something ugly. Commit it:\n\n```\ngit add .\ngit commit -m \"break something on purpose\"\n```\n\nNow undo it:\n\n```\ngit revert HEAD\n```\n\nGit creates a new commit that undoes the break. Your page is back to normal.",
        expectedOutcome: "Your page is restored. Git log shows the break AND the revert.",
        question: "Did git revert fix the break?",
      },
      {
        id: "L5B3S3",
        instruction:
          "Check your `.gitignore` file. Make sure it contains at least:\n\n```\nnode_modules/\n.env\n.env.local\n.next/\n```\n\nIf you don't have a .gitignore, create one now and commit it.",
        expectedOutcome: "Your .gitignore protects sensitive files and large folders from being committed.",
        question: "Does your .gitignore have .env listed?",
      },
    ],
  },
  {
    id: "L5B4",
    levelId: 5,
    type: "quiz",
    title: "Version Control",
    xp: 15,
    required: true,
    order: 4,
    questions: [
      {
        question: "What does `git commit` do?",
        options: [
          "Uploads your code to the internet",
          "Creates a save point (snapshot) of your code",
          "Deletes old versions of your files",
        ],
        correctIndex: 1,
        explanation: "git commit = save point. git push = upload to GitHub.",
      },
      {
        question: "How do you undo the last commit safely?",
        options: [
          "Delete the project and start over",
          "git revert HEAD — creates a new commit that undoes the last one",
          "git push --force — overwrites everything",
        ],
        correctIndex: 1,
        explanation: "git revert is safe — it creates a new undo commit without deleting history.",
      },
      {
        question: "Why should .env files be in .gitignore?",
        options: [
          "They're too large for GitHub",
          "They contain secrets (API keys, passwords) that should never be public",
          "GitHub doesn't support .env files",
        ],
        correctIndex: 1,
        explanation: "If .env files get pushed to GitHub, anyone can see your API keys and passwords.",
      },
      {
        question: "What makes a good commit message?",
        options: [
          "\"update\" or \"fix\"",
          "A specific description: \"add pricing section to landing page\"",
          "The current date and time",
        ],
        correctIndex: 1,
        explanation: "Specific messages help you find exactly when something changed — \"update\" is useless.",
      },
    ],
    passingScore: 3,
  },

  // ─── Level 6: Master Your AI (4 blocks) ───
  {
    id: "L6B1",
    levelId: 6,
    type: "theory",
    title: "CLAUDE.md — Your Project's Brain",
    xp: 10,
    required: true,
    order: 1,
    content: `# CLAUDE.md — The Most Important File in Your Project

Every time you start a new conversation with AI, it forgets everything. New chat = blank slate.

**CLAUDE.md** fixes this. It's a file in your project root that AI reads automatically at the start of every conversation.

## What Goes in CLAUDE.md

Your project's rules, stack, and conventions:

\`\`\`markdown
# Project Rules

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (database + auth)
- Stripe (payments)

## Commands
- Dev: npm run dev
- Build: npm run build
- Deploy: git push (Vercel auto-deploys)

## Conventions
- All data queries go through lib/supabase.ts
- Always handle loading, error, and empty states
- Never put secrets in code — use .env.local

## After Changes
- Always commit and push to GitHub
- Use descriptive commit messages
- Test on mobile (375px) before committing
\`\`\`

## Why This Matters

Without CLAUDE.md:
- AI guesses your stack (might use wrong framework)
- AI forgets your conventions (inconsistent code)
- AI doesn't know your project structure (creates duplicate files)

With CLAUDE.md:
- AI knows exactly what tools you use
- AI follows YOUR rules consistently
- AI makes changes that fit your existing code

## Keep It Updated

As your project grows, update CLAUDE.md. Added Stripe? Add it to the stack. Have a new convention? Write it down. Under 200 lines — keep it focused.`,
    miniQuiz: [
      {
        question: "Why does AI need CLAUDE.md?",
        options: [
          "It's a required configuration file for deployment",
          "AI forgets everything between conversations — CLAUDE.md gives it persistent project context",
          "It's where you store your API keys",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L6B2",
    levelId: 6,
    type: "pattern",
    title: "The CLAUDE.md Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "claudemd-pattern",
    exercise: {
      goal: "Write a CLAUDE.md for your project with your actual stack and rules",
      template: `# Project Rules

## Stack
- ___

## Commands
- Dev: ___
- Build: ___
- Deploy: ___

## Conventions
- ___
- ___

## After Changes
- Always commit and push to GitHub
- ___`,
      exampleFilled: `# Project Rules

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (database + auth)

## Commands
- Dev: npm run dev
- Build: npm run build
- Deploy: git push (Vercel auto-deploys)

## Conventions
- All data queries through lib/supabase.ts
- Always handle loading, error, and empty states
- Never put secrets in code

## After Changes
- Always commit and push to GitHub
- Test on mobile before committing`,
    },
  },
  {
    id: "L6B3",
    levelId: 6,
    type: "theory",
    title: "Small Steps Win",
    xp: 10,
    required: true,
    order: 3,
    content: `# The #1 Rule: Small Steps

The biggest mistake in vibe coding: asking for too much at once.

## Bad: One Giant Prompt

> "Build me a SaaS with auth, database, payments, dashboard, admin panel, and email notifications"

What you get: a mess. Broken imports, missing files, half-implemented features.

## Good: Step by Step

> "Step 1: Create a sign-in page with email and password using Supabase Auth"

What you get: one working feature. Test it. Then move to step 2.

## The Rule

**Each prompt = one thing that you can test immediately.**

Not "add auth and database and payments." Instead:
1. Add sign-in page
2. Test sign-in — does it work?
3. Add sign-out button
4. Test sign-out — does it redirect?
5. Protect the dashboard route
6. Test — does it redirect to login?

Six small steps > one giant prompt. Every time.

## Screenshots Help

When something looks wrong, don't describe it — **screenshot it.**

AI can see images. A screenshot showing "the button is below the fold on mobile" is 10x clearer than trying to describe the layout issue in words.`,
    miniQuiz: [
      {
        question: "How should you ask AI to build a feature?",
        options: [
          "One giant prompt describing everything at once",
          "Step by step — one testable change per prompt",
          "Just say 'build it' and see what happens",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L6B4",
    levelId: 6,
    type: "pattern",
    title: "Breaking Down Complexity",
    xp: 15,
    required: true,
    order: 4,
    patternId: "breaking-down-complexity",
    exercise: {
      goal: "Break a big feature into 5 small, testable steps",
      template: `I'm building [feature]. Step by step:

Step 1: ___
Step 2: ___
Step 3: ___
Step 4: ___
Step 5: ___

Start with Step 1 only.`,
      exampleFilled: `I'm adding user authentication. Step by step:

Step 1: Add sign-in page with email/password using Supabase Auth
Step 2: Add sign-up page with email confirmation
Step 3: Add sign-out button to the nav bar
Step 4: Protect /dashboard — redirect to /login if not signed in
Step 5: Show user's email in the nav when logged in

Start with Step 1 only.`,
    },
  },

  // ─── Level 7: Pro Setup — Boss (4 blocks) ───
  {
    id: "L7B1",
    levelId: 7,
    type: "theory",
    title: "Reading AI's Code",
    xp: 10,
    required: true,
    order: 1,
    content: `# Reading Code (Not Writing It)

You don't need to write code. But you need to **read** it — enough to understand what AI did and spot when something's off.

## The 30-Second Scan

When AI creates or changes a file, scan for these things:

### 1. The Return Statement
In any component file, scroll to the \`return\` statement. That's the UI — what the user sees. Everything above it is logic.

\`\`\`
function PricingPage() {
  // ... logic up here (data, state, etc.)

  return (
    // THIS is what appears on screen
    <div>
      <h1>Pricing</h1>
      ...
    </div>
  )
}
\`\`\`

### 2. Imports at the Top
The first few lines show what the file depends on. If you see \`import { supabase }\` — this file talks to the database. If you see \`import Stripe\` — this file handles payments.

### 3. File Names and Folders
- \`page.tsx\` = a URL route in Next.js
- \`layout.tsx\` = wrapper around pages
- \`api/\` folder = server endpoints
- \`components/\` = reusable UI pieces
- \`lib/\` = utility functions

### 4. Hardcoded vs Dynamic
Look for actual data vs placeholders:
- \`"Lorem ipsum"\` = placeholder (needs real content)
- \`{user.name}\` = dynamic (pulls from data)
- \`"sk-1234..."\` = DANGER: hardcoded secret!

You don't need to understand every line. Just know: where's the UI, what's it connected to, and is anything hardcoded that shouldn't be.`,
  },
  {
    id: "L7B2",
    levelId: 7,
    type: "review",
    title: "Spot Problems in AI Code",
    xp: 20,
    required: true,
    order: 2,
    code: `import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Submitted:", name, email);
    alert("Thank you!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Contact Us</h2>
      <form>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Send Message
        </button>
      </form>
    </div>
  );
}`,
    language: "tsx",
    description:
      "AI generated this contact form. It looks fine at first glance. Can you spot what's wrong?",
    knownIssues: [
      {
        id: "console-log-submission",
        lineRange: [8, 9],
        description:
          "Form 'submits' to console.log — data goes nowhere. Should call an API or send an email.",
        severity: "critical",
      },
      {
        id: "button-type",
        lineRange: [26, 26],
        description:
          "Button type is 'button' not 'submit'. The form's onSubmit will never fire. Should be type='submit' with form onSubmit handler.",
        severity: "warning",
      },
      {
        id: "no-validation",
        lineRange: [7, 10],
        description:
          "No validation — empty name and email will 'submit' successfully. Should check fields before sending.",
        severity: "warning",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L7B3",
    levelId: 7,
    type: "debug",
    title: "Fix Code Issues",
    xp: 20,
    required: true,
    order: 3,
    scenarios: [
      {
        id: "L7B3S1",
        title: "Form sends data nowhere",
        description:
          "The contact form logs to console instead of actually sending the data somewhere useful. Users fill it out and nothing happens.",
        brokenCode: `const handleSubmit = () => {
    console.log("Submitted:", name, email);
    alert("Thank you!");
  };`,
        language: "tsx",
        hint: "Replace console.log with a fetch() call to an API endpoint, or use a service like Resend to send the email.",
        expectedFix:
          "handleSubmit should send data to an API endpoint or email service. Not just console.log.",
      },
      {
        id: "L7B3S2",
        title: "No input validation",
        description:
          "Users can submit the form with empty fields or invalid email. No feedback about what's wrong.",
        brokenCode: `const handleSubmit = () => {
    // no checks at all
    sendEmail(name, email);
  };`,
        language: "tsx",
        hint: "Check that name is not empty and email contains @ before submitting. Show an error message if validation fails.",
        expectedFix:
          "Should validate: name not empty, email contains @. Show user-friendly error messages for invalid fields.",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L7B4",
    levelId: 7,
    type: "build",
    title: "Ship a Clean Project",
    xp: 100,
    required: true,
    order: 4,
    mission:
      "Boss level: project with CLAUDE.md (real rules), .gitignore, meaningful commit history, organized file structure. Fix any issues from the review. Deploy to Vercel.",
    githubChecks: {
      fileExists: ["CLAUDE.md", ".gitignore"],
      minCommits: 5,
      minFiles: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: CLAUDE.md with real project-specific rules (not a template), .gitignore (excludes node_modules and .env), meaningful commit messages (not 'update'), organized file structure. Code should be clean.",
    passingScore: 60,
  },
];
