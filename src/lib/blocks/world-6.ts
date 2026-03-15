import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 6 — Full Stack (Levels 26-30)
// Database, API, Auth — concepts first
// ═══════════════════════════════════════

export const WORLD_6_BLOCKS: Block[] = [
  // ─── Level 26: Your App Needs Memory (4 blocks) ───
  {
    id: "L26B1",
    levelId: 26,
    type: "theory",
    title: "What is a Database?",
    xp: 10,
    required: true,
    order: 1,
    content: `# What is a Database?

Right now your app has **amnesia**. Refresh the page → everything resets. Close the browser → gone forever.

A database gives your app **permanent memory**.

Think of it like the difference between writing on a **whiteboard** (erased daily) and writing in a **notebook** (permanent).

## Every real app has one

- Instagram stores photos + users + likes
- Twitter stores tweets + follows + likes
- A task manager stores users + projects + tasks

Your app will store whatever **you** decide. That decision is the first step of going full stack.`,
  },
  {
    id: "L26B2",
    levelId: 26,
    type: "theory",
    title: "Think About Data First",
    xp: 10,
    required: true,
    order: 2,
    content: `# Think About Data First

Before writing a single prompt, ask: **"What data does my app need?"**

## Think in entities

A recipe app needs: **Recipes**, **Users**, **Ingredients**, **Reviews**.

A task manager needs: **Users**, **Projects**, **Tasks**, **Labels**.

## Then think about connections

- User CREATES recipes
- Recipe HAS ingredients
- User WRITES reviews about recipes

This thinking is called **data modeling**. Do it on paper BEFORE prompting AI. A few minutes of planning saves hours of rework.

## The process

1. List your entities (nouns in your app)
2. List their connections (verbs between them)
3. THEN tell AI what to build`,
    miniQuiz: [
      {
        question:
          "What should you do before prompting AI about your database?",
        options: [
          "Install every possible database package",
          "Think about what entities you need and how they connect",
          "Write all the SQL queries by hand first",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L26B3",
    levelId: 26,
    type: "pattern",
    title: "Database Schema Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "database-schema",
    exercise: {
      goal: "Plan your database schema using the Database Schema Pattern",
      template: `Create a Prisma schema for ___:

Models needed:
- ___: fields...
- ___: fields...

Relations:
- ___

Include: id, timestamps, proper types`,
      exampleFilled: `Create a Prisma schema for a blog platform:

Models needed:
- User: email (unique), name, avatar
- Post: title, content, published (boolean)
- Comment: body, createdAt

Relations:
- User has many Posts
- User has many Comments
- Post has many Comments

Include: id, timestamps, proper types`,
    },
  },
  {
    id: "L26B4",
    levelId: 26,
    type: "experiment",
    title: "Design on Paper",
    xp: 15,
    required: true,
    order: 4,
    description: "Practice data modeling before touching code.",
    steps: [
      {
        id: "L26B4S1",
        instruction:
          "Pick a simple app idea (recipe book, expense tracker, bookmark manager). Write down: what data does it store? List every 'thing' your app needs to remember.",
        expectedOutcome:
          "You identify 3-5 entities (nouns) that your app needs — like User, Recipe, Ingredient, Review.",
      },
      {
        id: "L26B4S2",
        instruction:
          "Draw boxes for each entity. Draw arrows showing how they connect. Write the verb on each arrow: 'User → has many → Recipes'. This IS your database design.",
        expectedOutcome:
          "You have a visual map of your data: entities as boxes, relationships as arrows with labels.",
        question:
          "What entities did you identify and how do they connect?",
      },
    ],
  },

  // ─── Level 27: Connected Data (4 blocks) ───
  {
    id: "L27B1",
    levelId: 27,
    type: "theory",
    title: "Prisma = Your Data Translator",
    xp: 10,
    required: true,
    order: 1,
    content: `# Prisma = Your Data Translator

Prisma sits between your app and the database. You describe your data in a simple schema file, and Prisma handles all the database communication.

Like a **translator at a UN conference** — you speak your language, the database speaks its language, Prisma translates between them.

## How it works

1. You describe your data in a schema file (plain English-like syntax)
2. Prisma creates the database tables for you
3. Prisma gives you functions to create, read, update, and delete data
4. You never write raw database queries

## In your prompts

Tell AI: "Add Prisma with these models..." and describe your data in plain English. Prisma turns your description into a working database.`,
  },
  {
    id: "L27B2",
    levelId: 27,
    type: "theory",
    title: "Relations = Connections",
    xp: 10,
    required: true,
    order: 2,
    content: `# Relations = Connections

The power of databases is **connections** between data.

## Three types of connections

**One-to-many** (most common): One user has MANY posts. One project has MANY tasks. Think: parent with children.

**Many-to-many**: A post has MANY tags, AND a tag has MANY posts. Think: students and classes — each student takes many classes, each class has many students.

**One-to-one**: One user has ONE profile. Think: a person and their passport — exactly one each.

## In your prompts

Describe relationships in plain English: "User has many Tasks. Each Task belongs to one User. Tasks have a title, description, and completed status."

AI knows how to turn that into the right database structure.`,
    miniQuiz: [
      {
        question:
          '"One User has many Posts" is which type of relation?',
        options: ["One-to-one", "One-to-many", "Many-to-many"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L27B3",
    levelId: 27,
    type: "prompt",
    title: "Write a Schema Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Write a prompt for a Prisma schema with related models",
    referencePrompt:
      "Add Prisma to my Next.js app. Create a schema with these models: 1) User — id, email (unique), name, createdAt. 2) Project — id, title, description, createdAt. 3) Task — id, title, completed (default false), priority (LOW/MEDIUM/HIGH), createdAt. Relations: User has many Projects. Project has many Tasks. Add proper indexes on frequently queried fields.",
    hints: [
      "Name each model and its fields",
      "Specify which fields are unique or optional",
      "Describe relations in plain English",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L27B4",
    levelId: 27,
    type: "build",
    title: "Add Your Database",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add Prisma with at least 2 models connected by a relation. Generate the client.",
    githubChecks: {
      fileExists: ["prisma/schema.prisma"],
      fileContains: [
        {
          path: "prisma/schema.prisma",
          contains: ["model", "@relation"],
        },
        { path: "package.json", contains: ["prisma"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check Prisma schema: at least 2 models, proper types, at least one relation, ids and timestamps on each model.",
    passingScore: 55,
  },

  // ─── Level 28: The API Layer (4 blocks) ───
  {
    id: "L28B1",
    levelId: 28,
    type: "theory",
    title: "API = The Waiter",
    xp: 10,
    required: true,
    order: 1,
    content: `# API = The Waiter

Your frontend (the dining room) can't walk into the kitchen (database) directly. It needs a **waiter** (API).

## The flow

1. User clicks "Create Task"
2. Frontend tells the API: "hey, new task please"
3. API creates the task in the database
4. API sends back: "done, here's the new task!"
5. Frontend shows the new task on screen

Every app feature goes through this loop. The API is the **middleman** that keeps things organized and secure.

## Why not talk to the database directly?

Security. If the frontend talked to the database directly, anyone could open their browser console and delete everything. The API is the gatekeeper.`,
  },
  {
    id: "L28B2",
    levelId: 28,
    type: "theory",
    title: "CRUD = The Only 4 Things",
    xp: 10,
    required: true,
    order: 2,
    content: `# CRUD = The Only 4 Things

Every app in the world does exactly **4 operations** with data:

- **C**reate = add new (new task, new post, new user)
- **R**ead = get existing (show tasks, display profile)
- **U**pdate = change (edit task title, mark as done)
- **D**elete = remove (delete task, remove account)

That's it. **CRUD.** Every feature you build is just one of these dressed up in a nice UI.

## Real-world examples

- An Instagram "like" is a **Create** (creating a like record)
- An "unlike" is a **Delete** (removing that like record)
- Editing your profile is an **Update**
- Scrolling your feed is a **Read**

## In your prompts

Tell AI: "Create CRUD API routes for Tasks" — and it knows exactly what to build: endpoints to create, read, update, and delete.`,
    miniQuiz: [
      {
        question:
          "When a user marks a task as 'done', which CRUD operation is that?",
        options: ["Create", "Read", "Update", "Delete"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "L28B3",
    levelId: 28,
    type: "pattern",
    title: "API Route Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "api-route",
    exercise: {
      goal: "Plan an API route using the API Route Pattern",
      template: `Create a Next.js API route at ___:

- Method: ___
- Auth: ___
- Input: ___
- Logic: ___
- Response: ___`,
      exampleFilled: `Create a Next.js API route at /api/tasks:

- Method: POST
- Auth: required (user must be logged in)
- Input: { title: string, priority: "LOW" | "MEDIUM" | "HIGH" }
- Logic: validate title is not empty, create task in database linked to logged-in user
- Response: 201 with the created task on success, 400 if title is empty, 401 if not logged in`,
    },
  },
  {
    id: "L28B4",
    levelId: 28,
    type: "build",
    title: "Build Your API",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Create CRUD API routes for one model. GET (list), POST (create), PUT (update), DELETE. Connected to Prisma.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next", "prisma"] },
      ],
      minFiles: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for CRUD API routes: GET list, POST create, PUT update, DELETE. Prisma queries, proper HTTP methods, error handling with try/catch.",
    passingScore: 55,
  },

  // ─── Level 29: Who Are You? (4 blocks) ───
  {
    id: "L29B1",
    levelId: 29,
    type: "theory",
    title: "Auth = Bouncer at the Door",
    xp: 10,
    required: true,
    order: 1,
    content: `# Auth = Bouncer at the Door

Some pages are open to everyone (landing page, pricing). Some are only for logged-in users (dashboard, settings).

Auth is the **bouncer** who checks:

- Are you logged in? → **Yes**: come in, here's your data.
- Not logged in? → **No**: go to the login page.

## Why auth matters

Without auth, anyone could see everyone's data. With auth, each user sees only **their** data. Your task manager shows YOUR tasks, not everyone's tasks.

## Two parts

1. **Authentication** = "Who are you?" (login/signup)
2. **Authorization** = "What can you do?" (permissions)

Most apps start with just authentication. Authorization comes later when you have different user roles (admin, member, viewer).`,
  },
  {
    id: "L29B2",
    levelId: 29,
    type: "theory",
    title: "OAuth = Someone Else Checks IDs",
    xp: 10,
    required: true,
    order: 2,
    content: `# OAuth = Someone Else Checks IDs

You COULD build login with email + password. But then YOU handle passwords — risky, complex, and users hate creating new accounts.

**Better**: let Google or GitHub check IDs for you.

## How it works

1. User clicks "Sign in with GitHub"
2. GitHub asks: "Is this really you?" (user enters GitHub password on GitHub's site)
3. GitHub confirms identity → sends a token to your app
4. Your app knows who they are. Done.

This is **OAuth**. Think of it like a nightclub that accepts government IDs — the club doesn't issue IDs, they just check the ones issued by a trusted authority.

## Why it's better

- **Safer** — GitHub/Google handles the security, not you
- **Easier** — one click sign-in, no passwords to manage
- **Better UX** — users already have these accounts

## In your prompts

Tell AI: "Add NextAuth with GitHub OAuth provider." That single sentence gets you a full auth system.`,
    miniQuiz: [
      {
        question:
          "Why use OAuth instead of handling passwords yourself?",
        options: [
          "It's required by law",
          "Safer — the provider handles security, users don't need new accounts",
          "It makes the app faster",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L29B3",
    levelId: 29,
    type: "prompt",
    title: "Write an Auth Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Add authentication to your Next.js app",
    referencePrompt:
      "Add NextAuth.js to my Next.js app with GitHub OAuth. Create: 1) Auth config in src/lib/auth.ts with GitHub provider. 2) API route at /api/auth/[...nextauth]. 3) Sign-in page at /login with a 'Sign in with GitHub' button. 4) Header shows user name + avatar when logged in, 'Sign in' button when not. 5) Dashboard page is protected — redirects to /login if not authenticated. 6) Sign-out button in the header.",
    hints: [
      "Specify the auth provider (GitHub, Google, etc.)",
      "List all auth-related pages (login, signup, profile)",
      "Describe what logged-in vs logged-out looks like",
      "Mention which routes are protected",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L29B4",
    levelId: 29,
    type: "build",
    title: "Add Auth",
    xp: 50,
    required: true,
    order: 4,
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
      "Check for auth: sign-in page, sign-out functionality, session handling, protected routes that redirect unauthenticated users, user profile display.",
    passingScore: 55,
  },

  // ─── Level 30: Full Stack Boss (3 blocks) ───
  {
    id: "L30B1",
    levelId: 30,
    type: "quiz",
    title: "World 6 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What does a database do for your app?",
        options: [
          "Makes the UI look better",
          "Gives your app permanent memory — data survives refreshes and restarts",
          "Speeds up JavaScript execution",
          "Replaces the need for an API",
        ],
        correctIndex: 1,
      },
      {
        question:
          "A User has many Posts, and a Post belongs to one User. What type of relation is this?",
        options: [
          "Many-to-many",
          "One-to-one",
          "One-to-many",
          "No relation",
        ],
        correctIndex: 2,
      },
      {
        question: "What does CRUD stand for?",
        options: [
          "Code, Run, Upload, Deploy",
          "Create, Read, Update, Delete",
          "Connect, Route, Use, Design",
          "Compile, Render, Undo, Debug",
        ],
        correctIndex: 1,
      },
      {
        question: "Why does the frontend talk to the database through an API instead of directly?",
        options: [
          "Databases don't support JavaScript",
          "Security — the API is the gatekeeper that controls who can do what",
          "It's required by Next.js",
          "APIs are faster than direct connections",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the main advantage of OAuth (Sign in with GitHub/Google)?",
        options: [
          "It's the only way to do authentication",
          "Someone else handles password security, and users don't need new accounts",
          "It makes your app open source",
          "It's faster than any other login method",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 3,
  },
  {
    id: "L30B2",
    levelId: 30,
    type: "prompt",
    title: "Design Your SaaS",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "hints",
    goal: "Write a comprehensive prompt for a full-stack SaaS application",
    referencePrompt:
      "Build a full-stack task management SaaS with Next.js, Prisma, and NextAuth. Auth: GitHub OAuth, session-based, protected dashboard. Database: User (email, name, image), Project (title, description, belongsTo User), Task (title, completed, priority LOW/MEDIUM/HIGH, belongsTo Project). API routes: CRUD for Projects (/api/projects) and Tasks (/api/tasks). Each route validates input and checks auth. Pages: Landing page (public), Dashboard (shows user's projects with task counts), Project Detail (shows tasks, can add/complete/delete), Settings (update profile). Responsive Tailwind styling. Error handling: loading.tsx skeletons, error.tsx with retry, proper API error responses.",
    hints: [
      "Describe the complete user journey from landing to using the app",
      "List database models and their relations",
      "Specify API endpoints and what each does",
      "Include error handling and edge cases",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L30B3",
    levelId: 30,
    type: "build",
    title: "Ship Your SaaS",
    xp: 350,
    required: true,
    order: 3,
    mission:
      "Build a complete SaaS: auth, database with relations, CRUD API, 3+ pages, responsive UI. Users sign in, create data, see their data.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: ["prisma/schema.prisma", "src/app/layout.tsx"],
      fileContains: [
        {
          path: "package.json",
          contains: ["next", "prisma", "next-auth"],
        },
      ],
      minFiles: 15,
      minCommits: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level — full stack audit. Check: auth working (sign in/out, protected routes), Prisma schema with relations, CRUD API routes with error handling, 3+ pages, responsive Tailwind UI, data is scoped to the logged-in user.",
    passingScore: 60,
  },
];
