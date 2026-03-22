import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// WORLD 2 — Real Data (L6-L9)
// Supabase → CRUD → states → boss
// ═══════════════════════════════════════

export const WORLD_2_BLOCKS: Block[] = [
  // ─── Level 6: Data Disappears ─────────
  {
    id: "L6B1",
    levelId: 6,
    type: "theory",
    title: "Why Data Disappears",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Your App Has Amnesia

Right now, your app stores data in the browser. Refresh the page — it's gone. Close the tab — gone.

You need a **database** — a place where data lives permanently.

We use **Supabase** — it's a database with a nice visual editor, free tier, and AI knows it inside out.

## Env Vars: Passwords for Services

When you connect Supabase, you'll get two things:
- **Project URL** — the address of your database
- **Anon Key** — the password to access it

These go in a file called \`.env.local\`. **NEVER put them in your code.**

Why? Because code goes to GitHub. GitHub is public. API keys on GitHub = someone finds them and uses your database.

Rules:
- \`.env.local\` = real keys (in .gitignore, never on GitHub)
- \`.env.example\` = same file but with placeholder values (safe to commit)`,
    miniQuiz: [
      {
        question: "Where do API keys go?",
        options: [
          "Directly in the code",
          "In .env.local (which is in .gitignore)",
          "In a comment in the code",
          "In CLAUDE.md",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L6B2",
    levelId: 6,
    type: "experiment",
    title: "Set Up Supabase",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    description: "Create a Supabase project and connect it to your app.",
    steps: [
      {
        id: "create",
        instruction:
          "Go to supabase.com → create a new project. Pick a name and region. Wait for it to spin up (1-2 minutes).",
        expectedOutcome: "You have a Supabase project dashboard open.",
      },
      {
        id: "keys",
        instruction:
          "Go to Settings → API. Copy the Project URL and the anon/public key. Create a file `.env.local` in your project root. Paste them there.",
        expectedOutcome:
          ".env.local exists with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      {
        id: "env-example",
        instruction:
          "Create `.env.example` with the same variable names but placeholder values (no real keys). Check that `.env.local` is in your `.gitignore`.",
        expectedOutcome:
          ".env.example is safe to commit. .env.local is ignored by git.",
      },
    ],
  },
  {
    id: "L6B3",
    levelId: 6,
    type: "prompt",
    title: "Connect Supabase",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to connect Supabase and create the right table for your app.",
    referencePrompt: `Connect Supabase to my project.
I need a table for [describe what you're storing: tasks/entries/habits/etc.].
Create the table schema, set up the Supabase client, and enable RLS with a basic policy.
Just the connection for now — CRUD operations come next.`,
    hints: [
      "Describe WHAT you're storing, not the SQL — AI handles that",
      "Mention RLS — it's important for security later",
      "Keep it to connection only — CRUD is the next level",
    ],
    passingThreshold: 3,
  },
  {
    id: "L6B4",
    levelId: 6,
    type: "build",
    title: "Supabase Connected",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Push your Supabase integration. .env.example should exist with variable names. .gitignore must include .env entries. Code should import and use a Supabase client.",
    githubChecks: {
      minCommits: 2,
      fileExists: [".env.example", ".gitignore"],
    },
    aiReviewPrompt:
      "Check: .env.example exists with Supabase variable names (no real values). .gitignore includes .env entries. Code imports a Supabase client. At least one table referenced in code.",
    passingScore: 60,
  },

  // ─── Level 7: CRUD ────────────────────
  {
    id: "L7B1",
    levelId: 7,
    type: "theory",
    title: "The Four Operations",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 1,
    content: `# CRUD — Every App Does These Four Things

- **C**reate — add new data (form → save to database)
- **R**ead — show data (load from database → display)
- **U**pdate — change data (edit → save changes)
- **D**elete — remove data (delete button → confirm → gone)

Right now your app shows hardcoded demo data. Time to make it real.

You'll tell AI to replace the fake data with real Supabase queries. AI knows how to write these perfectly — your job is to **test every operation**.`,
  },
  {
    id: "L7B2",
    levelId: 7,
    type: "prompt",
    title: "Replace Fake Data",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to replace all hardcoded data with real Supabase CRUD.",
    referencePrompt: `Replace all hardcoded data with real Supabase queries.
I need full CRUD:
- Create: form → save to database → update the list → clear the form
- Read: load all records from database when the page loads
- Update: click an item → edit it → save changes
- Delete: delete button with confirmation
Update the UI immediately, no page reload needed.`,
    hints: [
      "Say 'no page reload' — AI should update the UI in place",
      "Mention 'clear the form' after create — common thing AI forgets",
      "Include 'confirmation' for delete — prevents accidents",
    ],
    passingThreshold: 3,
  },
  {
    id: "L7B3",
    levelId: 7,
    type: "experiment",
    title: "Test Every Operation",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description: "Verify that all CRUD operations actually work.",
    steps: [
      {
        id: "create",
        instruction:
          "Create 3 new items using the form. Do they appear in the list immediately?",
        expectedOutcome: "3 items visible in the list without page refresh.",
      },
      {
        id: "persist",
        instruction:
          "Refresh the page (F5). Are all 3 items still there? If not — data isn't being saved to Supabase.",
        expectedOutcome: "All 3 items survive a page refresh.",
      },
      {
        id: "update",
        instruction: "Edit one item. Change its content. Save. Refresh. Is the change preserved?",
        expectedOutcome: "Edited item shows the new content after refresh.",
      },
      {
        id: "delete",
        instruction:
          "Delete one item. Refresh. Is it gone? Are the other 2 still there?",
        expectedOutcome: "2 items remain. Deleted item is gone permanently.",
      },
    ],
  },
  {
    id: "L7B4",
    levelId: 7,
    type: "build",
    title: "Real Data Works",
    xp: 20,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Full CRUD with Supabase. No hardcoded data remaining. Create, read, update, delete all work. Data persists across page refreshes. At least 3 commits.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for Supabase CRUD operations: insert, select, update, delete queries. No hardcoded/mock data for the main feature. UI should update without full page reload. At least 3 commits showing iteration.",
    passingScore: 60,
  },

  // ─── Level 8: When Things Go Wrong ────
  {
    id: "L8B1",
    levelId: 8,
    type: "theory",
    title: "Three States Every Screen Needs",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Loading, Error, Empty — Never Show a Blank Screen

Open your app in incognito. What does a new user see? Probably a flash of nothing, then data appears. Or maybe a white screen if the database is slow.

**Every screen needs three states:**

1. **Loading** — data is being fetched
   - Show **skeletons** (gray pulsing rectangles), not spinners
   - Skeletons show WHERE content will appear. Spinners just say "wait."

2. **Error** — something broke
   - Show "Something went wrong. Try again."
   - NEVER show the raw error (like \`TypeError: cannot read property...\`)

3. **Empty** — no data yet
   - Show "No items yet. Create your first one!" with a button
   - An empty screen looks broken. An empty state looks intentional.

**Also: form validation.** Don't let users submit empty forms or 10,000-character inputs.`,
  },
  {
    id: "L8B2",
    levelId: 8,
    type: "prompt",
    title: "Add All States",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to add loading, error, empty, and validation states.",
    referencePrompt: `Add state handling everywhere:
1. Loading — show skeleton placeholders while data loads (not a spinner)
2. Error — if a request fails, show "Something went wrong" with a retry button (not the raw error)
3. Empty — if there are no items, show "No items yet. Create your first!" with a create button
4. Validation — empty forms don't submit, text inputs have a reasonable max length`,
    hints: [
      "Say 'skeletons not spinners' — AI defaults to spinners",
      "Say 'not the raw error' — AI often exposes error.message",
      "Empty state needs a call-to-action, not just text",
    ],
    passingThreshold: 3,
  },
  {
    id: "L8B3",
    levelId: 8,
    type: "experiment",
    title: "Test Each State",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description: "Verify all states work by triggering each one.",
    steps: [
      {
        id: "loading",
        instruction:
          "Open DevTools → Network tab → set throttling to 'Slow 3G'. Reload the page. Do you see skeleton loading states?",
        expectedOutcome: "Skeleton placeholders visible during slow load.",
      },
      {
        id: "error",
        instruction:
          "Temporarily change the Supabase URL in .env.local to something wrong. Reload. Do you see a friendly error message (not a raw error)?",
        expectedOutcome:
          "User-friendly error message with retry option. Fix the URL back after testing.",
      },
      {
        id: "empty",
        instruction:
          "Delete all your items (or create a new account with no data). Do you see an empty state with a create button?",
        expectedOutcome:
          "Empty state with helpful message and action button.",
      },
      {
        id: "validation",
        instruction:
          "Try to submit the create form with empty fields. Does it prevent submission?",
        expectedOutcome: "Form shows validation message, doesn't submit empty.",
      },
    ],
  },
  {
    id: "L8B4",
    levelId: 8,
    type: "build",
    title: "All States Handled",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "Push your state handling code. Loading skeletons, error messages, empty states, and form validation — all in place.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Look for: loading states (skeleton/spinner components), error handling (try/catch, user-friendly messages), empty states (conditional rendering when no data), form validation. At least 2 of these 4 should be present.",
    passingScore: 60,
  },

  // ─── Level 9: BOSS — Real App ─────────
  {
    id: "L9B1",
    levelId: 9,
    type: "theory",
    title: "Env Vars in Production",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 1,
    content: `# Your Production Site Can't Read .env.local

\`.env.local\` only exists on YOUR computer. Vercel doesn't have it. So your deployed site has no database connection — it's broken in production even if it works locally.

**Fix:** Add your env vars to Vercel too.

1. Vercel → your project → Settings → Environment Variables
2. Add \`NEXT_PUBLIC_SUPABASE_URL\` and \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
3. Redeploy (Deployments → three dots → Redeploy)

**Every time you add a new env var locally, add it to Vercel too.** This is the #1 reason production breaks.`,
  },
  {
    id: "L9B2",
    levelId: 9,
    type: "experiment",
    title: "Full End-to-End Test",
    xp: 20,
    required: true,
    order: 2,
    estimatedMinutes: 10,
    description:
      "Complete test of your app — mobile, CRUD, states, production.",
    steps: [
      {
        id: "env-vercel",
        instruction:
          "Add your Supabase env vars to Vercel (Settings → Environment Variables). Redeploy. Open the production URL — does data load?",
        expectedOutcome: "Production site loads data from Supabase.",
      },
      {
        id: "crud-test",
        instruction:
          "On the production URL: create 5 items, edit 2, delete 1, refresh. Everything persists?",
        expectedOutcome: "4 items remain after all operations + refresh.",
      },
      {
        id: "mobile-test",
        instruction:
          "Open the production URL on your phone. All pages look good? All buttons work?",
        expectedOutcome: "Fully functional on mobile.",
      },
      {
        id: "states-test",
        instruction:
          "Check: loading state visible on slow connection, empty state visible when no data, error doesn't show raw text.",
        expectedOutcome: "All three states handled properly.",
      },
    ],
  },
  {
    id: "L9B3",
    levelId: 9,
    type: "build",
    title: "Ship It",
    xp: 30,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    mission:
      "Everything works on production: CRUD, states, mobile. Env vars in Vercel. At least 5 commits, 5+ files. This is a real app, not a demo.",
    githubChecks: {
      minCommits: 5,
      minFiles: 5,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Comprehensive review: working Supabase integration, CRUD operations, loading/error/empty states, env vars handled (.env.example exists, .gitignore has .env), deployed and working. Should feel like a real app, not a tutorial project.",
    passingScore: 70,
  },
];
