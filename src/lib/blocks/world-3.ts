import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 3 — Full Stack (Levels 11-15)
// Patterns: Database Schema, API Route, Integration
// ═══════════════════════════════════════

export const WORLD_3_BLOCKS: Block[] = [
  // ─── Level 11: Next.js Setup (4 blocks) ───
  {
    id: "L11B1",
    levelId: 11,
    type: "theory",
    title: "Why Next.js?",
    xp: 10,
    required: true,
    order: 1,
    content: `# Why Next.js?

Next.js is the framework most startups use. It gives you everything in one package:

- **React** for UI
- **Server-side rendering** for speed and SEO
- **File-based routing** — create a file, get a URL
- **API routes** — backend in the same project
- **Built-in deployment** with Vercel

## App Router

Next.js uses folders for routing:

\`\`\`
src/app/
├── layout.tsx      → shared layout (nav, footer)
├── page.tsx        → / (home page)
├── about/
│   └── page.tsx    → /about
├── blog/
│   ├── page.tsx    → /blog (list)
│   └── [id]/
│       └── page.tsx → /blog/123 (dynamic)
\`\`\`

## Server vs Client Components

- **Server components** (default) — render on server, fast, can access DB
- **Client components** (\`"use client"\`) — run in browser, handle clicks/state

## For your prompts

Say "Next.js with App Router" and specify "server components" vs "client components" for each file.`,
  },
  {
    id: "L11B2",
    levelId: 11,
    type: "prompt",
    title: "Write a Next.js Setup Prompt",
    xp: 15,
    required: true,
    order: 2,
    scaffold: "hints",
    goal: "Write a prompt to create a Next.js project with App Router",
    referencePrompt:
      "Create a Next.js project with the App Router. Set up: 1) Root layout.tsx with a Navigation component (server component) that has links to Home, About, and Dashboard. 2) Three pages: home (page.tsx), about (about/page.tsx), and dashboard (dashboard/page.tsx). 3) The dashboard page should be a client component with a counter button using useState. 4) Use Tailwind CSS for styling. 5) Shared layout should wrap all pages with the nav and a footer.",
    hints: [
      "Specify App Router (not Pages Router)",
      "List which pages to create with their file paths",
      "Mention server vs client components",
      "Include styling approach",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L11B3",
    levelId: 11,
    type: "build",
    title: "Create Your Next.js App",
    xp: 35,
    required: true,
    order: 3,
    mission:
      "Create a Next.js project with App Router. At least 3 pages with a shared layout and navigation.",
    githubChecks: {
      hasPackageJson: true,
      fileContains: [
        { path: "package.json", contains: ["next"] },
      ],
      fileExists: ["src/app/layout.tsx"],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for proper Next.js App Router structure: layout.tsx, at least 3 page.tsx files, shared navigation component.",
    passingScore: 50,
  },
  {
    id: "L11B4",
    levelId: 11,
    type: "experiment",
    title: "Server vs Client Components",
    xp: 15,
    required: false,
    order: 4,
    description: "See the difference between server and client components.",
    steps: [
      {
        id: "L11B4S1",
        instruction:
          'Try adding useState to a server component (one without "use client" at the top). What happens?',
        expectedOutcome:
          "You'll get an error: useState only works in client components.",
        question: "What error message did you get?",
      },
      {
        id: "L11B4S2",
        instruction:
          'Add "use client" to the top of the file and try again.',
        expectedOutcome: "useState works now because it's a client component.",
        question: "Why can't server components use useState?",
      },
    ],
  },

  // ─── Level 12: Database Time (6 blocks) ───
  {
    id: "L12B1",
    levelId: 12,
    type: "theory",
    title: "What is a Database?",
    xp: 10,
    required: true,
    order: 1,
    content: `# What is a Database?

A database stores your app's data permanently. Without one, all data disappears when the page refreshes.

## Types

- **SQL databases** (PostgreSQL, MySQL) — structured tables with rows and columns
- **NoSQL databases** (MongoDB) — flexible document storage

We use **PostgreSQL** + **Prisma ORM**.

## Prisma

Prisma lets you define your data in a schema file:

\`\`\`prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  name  String
  posts Post[]
}

model Post {
  id      String @id @default(cuid())
  title   String
  content String
  author  User   @relation(fields: [authorId], references: [id])
  authorId String
}
\`\`\`

Then query it with TypeScript:

\`\`\`typescript
const users = await prisma.user.findMany();
const post = await prisma.post.create({
  data: { title: "Hello", content: "World", authorId: user.id }
});
\`\`\`

## Key concepts

- **Models** = tables (User, Post, Comment)
- **Fields** = columns (name, email, createdAt)
- **Relations** = connections between models (User has many Posts)
- **Migrations** = database updates when you change the schema`,
    miniQuiz: [
      {
        question: "What does @relation in Prisma define?",
        options: [
          "A CSS relationship",
          "A connection between two models (e.g., User has Posts)",
          "A database backup",
          "An API endpoint",
        ],
        correctIndex: 1,
      },
      {
        question: "Why do you need a database?",
        options: [
          "To make the page load faster",
          "To store data permanently so it survives page refreshes",
          "To add styling to components",
          "To handle routing",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L12B2",
    levelId: 12,
    type: "quiz",
    title: "Schema Concepts",
    xp: 20,
    required: true,
    order: 2,
    questions: [
      {
        question: "What does @unique mean on a field?",
        options: [
          "The field is optional",
          "No two records can have the same value for this field",
          "The field is the primary key",
          "The field is automatically generated",
        ],
        correctIndex: 1,
      },
      {
        question: 'In Prisma, what does @default(cuid()) do?',
        options: [
          "Creates a default color",
          "Auto-generates a unique ID for new records",
          "Sets the default language",
          "Connects to the default database",
        ],
        correctIndex: 1,
      },
      {
        question: "What is a migration?",
        options: [
          "Moving your app to a new server",
          "A script that updates the database structure to match your schema changes",
          "Deleting all data",
          "A type of API route",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 2,
  },
  {
    id: "L12B3",
    levelId: 12,
    type: "prompt",
    title: "Write a Schema Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Write a prompt for a Prisma schema with 2+ related models",
    referencePrompt:
      "Create a Prisma schema for a task management app. Models: 1) User — id (cuid), email (unique string), name (string), createdAt (datetime). 2) Task — id (cuid), title (string), description (optional string), completed (boolean, default false), priority (enum: LOW, MEDIUM, HIGH), createdAt, updatedAt. 3) User has many Tasks relation. Add proper indexes on foreign keys.",
    hints: [
      "Name your models and list their fields with types",
      "Specify which fields are unique, optional, or have defaults",
      "Describe the relations between models",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L12B4",
    levelId: 12,
    type: "build",
    title: "Add Your Database",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add Prisma to your Next.js project. Define at least 2 models with a relation between them.",
    githubChecks: {
      fileExists: ["prisma/schema.prisma"],
      fileContains: [
        { path: "prisma/schema.prisma", contains: ["model", "@relation"] },
        { path: "package.json", contains: ["prisma"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check the Prisma schema for at least 2 models with proper fields, types, and a relation between them.",
    passingScore: 55,
  },
  {
    id: "L12B5",
    levelId: 12,
    type: "experiment",
    title: "Change a Field Type",
    xp: 15,
    required: false,
    order: 5,
    description:
      "See what Prisma does when you change a field type — this teaches you about migrations.",
    steps: [
      {
        id: "L12B5S1",
        instruction:
          "In your schema, change a String field to an Int (e.g., change `name String` to `name Int`). Try to run `npx prisma migrate dev`.",
        expectedOutcome:
          "Prisma will warn you about data loss because changing a String to Int could break existing data.",
        question: "What warning did Prisma give you?",
      },
      {
        id: "L12B5S2",
        instruction: "Change the field back to String and run the migration again.",
        expectedOutcome: "Migration succeeds without warnings.",
        question: "Why does Prisma warn about type changes?",
      },
    ],
  },
  {
    id: "L12B6",
    levelId: 12,
    type: "pattern",
    title: "Database Schema Pattern",
    xp: 15,
    required: true,
    order: 6,
    patternId: "database-schema",
    exercise: {
      goal: "Use the Database Schema Pattern to plan a schema",
      template: `Create a Prisma schema for ___:

Models needed:
- ___: ___
- ___: ___

Relations:
- ___

Include: id, timestamps, proper types, indexes`,
      exampleFilled: `Create a Prisma schema for a blog:

Models needed:
- User: email (unique), name, avatar URL
- Post: title, content (long text), published (boolean), slug (unique)
- Comment: body, approved (boolean)

Relations:
- User has many Posts
- User has many Comments
- Post has many Comments

Include: id, createdAt, updatedAt, proper types, indexes on foreign keys`,
    },
  },

  // ─── Level 13: API Routes (5 blocks) ───
  {
    id: "L13B1",
    levelId: 13,
    type: "theory",
    title: "What Are API Routes?",
    xp: 10,
    required: true,
    order: 1,
    content: `# API Routes

API routes let your frontend talk to your database. They're the "backend" of your app.

## In Next.js

\`\`\`
src/app/api/
├── users/
│   └── route.ts     → GET/POST /api/users
├── users/[id]/
│   └── route.ts     → GET/PUT/DELETE /api/users/123
└── posts/
    └── route.ts     → GET/POST /api/posts
\`\`\`

## HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | Get all users |
| POST | Create data | Create new user |
| PUT | Update data | Update user name |
| DELETE | Remove data | Delete a user |

## Example route

\`\`\`typescript
// src/app/api/users/route.ts
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return Response.json(user, { status: 201 });
}
\`\`\`

## For your prompts

Specify: the endpoint path, which HTTP methods, what the input/output looks like, and which database queries to use.`,
  },
  {
    id: "L13B2",
    levelId: 13,
    type: "pattern",
    title: "API Route Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "api-route",
    exercise: {
      goal: "Use the API Route Pattern to describe a CRUD endpoint",
      template: `Create a Next.js API route at ___:

- Method: ___
- Auth: ___
- Input: ___
- Logic: ___
- Response: ___
- Database: ___`,
      exampleFilled: `Create a Next.js API route at /api/tasks:

- Method: POST
- Auth: required (check session)
- Input: body { title: string, priority: "LOW" | "MEDIUM" | "HIGH" }
- Logic: validate title is not empty → create task with userId from session
- Response: 201 { task } on success, 400 if title empty, 401 if not logged in
- Database: prisma.task.create with user connection`,
    },
  },
  {
    id: "L13B3",
    levelId: 13,
    type: "prompt",
    title: "Write an API Prompt",
    xp: 25,
    required: true,
    order: 3,
    scaffold: "hints",
    goal: "Write a prompt for CRUD API routes",
    referencePrompt:
      "Create Next.js API routes for full CRUD on a Task model. 1) GET /api/tasks — return all tasks for the current user, sorted by createdAt desc. 2) POST /api/tasks — create a new task from body { title, description?, priority }. Validate title is not empty. 3) PUT /api/tasks/[id] — update task fields. Only allow the task owner to update. 4) DELETE /api/tasks/[id] — delete a task. Only owner can delete. All routes should return proper status codes (200, 201, 400, 401, 404) and JSON responses.",
    hints: [
      "List each endpoint with its HTTP method and path",
      "Describe input validation for POST/PUT",
      "Mention authorization (who can access what)",
      "Specify response formats and status codes",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L13B4",
    levelId: 13,
    type: "build",
    title: "Build Your API",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Create API routes for full CRUD on one of your models. GET, POST, PUT, DELETE with Prisma queries.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next", "prisma"] },
      ],
      minFiles: 10,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Next.js API route handlers with CRUD operations. Look for proper HTTP method handling, Prisma queries, error handling.",
    passingScore: 55,
  },
  {
    id: "L13B5",
    levelId: 13,
    type: "pattern",
    title: "Integration Pattern",
    xp: 15,
    required: true,
    order: 5,
    patternId: "integration-pattern",
    exercise: {
      goal: "Plan how your frontend connects to your API",
      template: `Connect ___ to ___:

- Fetch: ___
- Loading: ___
- Error: ___
- Success: ___
- Optimistic: ___`,
      exampleFilled: `Connect TaskList component to GET /api/tasks:

- Fetch: on mount using useEffect + fetch()
- Loading: show 3 skeleton task cards
- Error: show "Failed to load tasks" with a retry button
- Success: map over tasks array, render TaskCard for each
- Optimistic: no, wait for server confirmation`,
    },
  },

  // ─── Level 14: Auth Flow (4 blocks) ───
  {
    id: "L14B1",
    levelId: 14,
    type: "theory",
    title: "How Auth Works",
    xp: 10,
    required: true,
    order: 1,
    content: `# Authentication

Auth answers one question: **"Who is this user?"**

## OAuth (recommended)

Instead of handling passwords yourself, let users sign in with GitHub, Google, etc:

1. User clicks "Sign in with GitHub"
2. GitHub asks "Allow this app?"
3. User says yes → GitHub sends a token
4. Your app uses the token to identify the user

## NextAuth.js

NextAuth makes this easy in Next.js:

\`\`\`typescript
// auth.ts
export const { auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({ clientId: "...", clientSecret: "..." })
  ],
});
\`\`\`

## Key concepts

- **Session** = proof that a user is logged in
- **Provider** = the service that verifies identity (GitHub, Google)
- **Protected route** = a page that requires login
- **Callback** = where the user returns after signing in

## For your prompts

Specify: which auth provider, what user data to store, which routes are protected, what happens to unauthenticated users.`,
  },
  {
    id: "L14B2",
    levelId: 14,
    type: "prompt",
    title: "Write an Auth Prompt",
    xp: 25,
    required: true,
    order: 2,
    scaffold: "hints",
    goal: "Write a prompt to add authentication to your app",
    referencePrompt:
      "Add NextAuth.js authentication to my Next.js app. Set up GitHub OAuth provider. Create: 1) Auth configuration in src/lib/auth.ts. 2) API route at /api/auth/[...nextauth]. 3) Sign-in page at /login with a 'Sign in with GitHub' button. 4) User session display in the header (show name + avatar when logged in, 'Sign in' button when not). 5) Protected dashboard route that redirects to /login if not authenticated. 6) Sign-out button in user dropdown. Store user data (id, email, name, image) in the session.",
    hints: [
      "Specify the auth provider (GitHub, Google, etc.)",
      "List all auth-related files to create",
      "Describe the sign-in flow",
      "Mention which routes need protection",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L14B3",
    levelId: 14,
    type: "build",
    title: "Add Authentication",
    xp: 50,
    required: true,
    order: 3,
    mission:
      "Add authentication. Users can sign in, see profile, sign out. Protected routes redirect unauthenticated users.",
    githubChecks: {
      fileContains: [
        { path: "package.json", contains: ["next-auth"] },
      ],
      minFiles: 12,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for auth setup: sign-in page, sign-out, session handling, protected routes, profile display.",
    passingScore: 55,
  },
  {
    id: "L14B4",
    levelId: 14,
    type: "debug",
    title: "Fix Auth Errors",
    xp: 20,
    required: false,
    order: 4,
    scenarios: [
      {
        id: "L14B4D1",
        title: "Missing environment variable",
        description: "The auth sign-in fails with 'OAuthCallback error' in the console.",
        brokenCode: `// .env.local
GITHUB_ID=your_github_client_id
GITHUB_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=`,
        language: "bash",
        hint: "Look at the empty values. What's missing?",
        expectedFix:
          "GITHUB_SECRET and NEXTAUTH_SECRET are empty — they need actual values",
      },
      {
        id: "L14B4D2",
        title: "Protected route not redirecting",
        description: "The dashboard page loads even when not signed in.",
        brokenCode: `// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}`,
        language: "tsx",
        hint: "There's no auth check. What's missing at the top?",
        expectedFix:
          "Need to add auth() check at the top and redirect to /login if no session",
      },
    ],
    passingCount: 1,
  },

  // ─── Level 15: SaaS Boss (3 blocks) ───
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
        question: "What makes Next.js different from plain React?",
        options: [
          "It uses a different programming language",
          "Built-in server rendering, file routing, and API routes",
          "It's only for mobile apps",
          "It doesn't use components",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the purpose of a Prisma migration?",
        options: [
          "Moving files between folders",
          "Updating the database structure to match schema changes",
          "Importing data from CSV",
          "Backing up the server",
        ],
        correctIndex: 1,
      },
      {
        question: "Which HTTP method should you use to create a new resource?",
        options: ["GET", "POST", "DELETE", "PATCH"],
        correctIndex: 1,
      },
      {
        question: "Why is OAuth better than handling passwords yourself?",
        options: [
          "It's faster",
          "You don't store passwords — the provider handles security",
          "It uses less bandwidth",
          "It works offline",
        ],
        correctIndex: 1,
      },
      {
        question: "What happens if an API route returns status 401?",
        options: [
          "The data was created successfully",
          "The user is not authenticated — access denied",
          "The server crashed",
          "The page was not found",
        ],
        correctIndex: 1,
      },
    ],
    passingScore: 3,
  },
  {
    id: "L15B2",
    levelId: 15,
    type: "prompt",
    title: "Design Your SaaS Prompt",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "hints",
    goal: "Write a comprehensive prompt for a full-stack SaaS app",
    referencePrompt:
      "Build a complete task management SaaS with Next.js, Prisma, and NextAuth. Features: 1) GitHub OAuth login. 2) Prisma schema with User, Project, and Task models (User has many Projects, Project has many Tasks). 3) Dashboard showing user's projects with task counts. 4) Project detail page with task list — create, complete, delete tasks. 5) CRUD API routes for projects and tasks with auth protection. 6) Responsive UI with Tailwind — sidebar nav, clean cards, proper forms with validation. 7) Empty states for no projects and no tasks. 8) Error handling with try/catch in API routes and error boundaries in UI.",
    hints: [
      "Describe the full user journey",
      "Specify database models and relations",
      "List API endpoints needed",
      "Mention error handling and edge cases",
    ],
    passingThreshold: 3.5,
  },
  {
    id: "L15B3",
    levelId: 15,
    type: "build",
    title: "Ship Your SaaS",
    xp: 250,
    required: true,
    order: 3,
    mission:
      "Build a complete SaaS: auth, database, CRUD, 3+ pages, responsive UI. Think: todo app, notes, or expense tracker.",
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
      "Boss level — be thorough. Check for: auth flow, Prisma schema with relations, CRUD API routes, 3+ pages, forms with validation, responsive Tailwind UI.",
    passingScore: 60,
  },
];
