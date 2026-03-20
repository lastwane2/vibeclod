import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 4 — Lock the Door (Levels 12-14)
// Auth, user-scoped data, secrets
// ═══════════════════════════════════════

export const WORLD_4_BLOCKS: Block[] = [
  // ─── Level 12: Authentication (4 blocks) ───
  {
    id: "L12B1",
    levelId: 12,
    type: "theory",
    title: "Auth = Bouncer",
    xp: 10,
    required: true,
    order: 1,
    content: `# Authentication = Who Are You?

Without auth, your app is a public whiteboard. Anyone can see and change everything.

**Authentication** = proving who you are (sign in)
**Authorization** = what you're allowed to do (permissions)

## Why OAuth Beats Passwords

You could build your own login with email + password. Don't.

| DIY passwords | OAuth (Google/GitHub login) |
|---|---|
| You store passwords (security liability) | Google/GitHub stores them |
| You handle password resets | They handle it |
| You deal with breaches | They have billion-dollar security teams |
| Users must create yet another password | One click, they're in |

Rule: **Never build your own password system.** Use OAuth (Google, GitHub) or a magic link (email a login link).

## How OAuth Works (Simplified)

1. User clicks "Sign in with Google"
2. Google shows "Allow this app to see your email?"
3. User clicks Allow
4. Google sends your app a token + user info (email, name, avatar)
5. Your app creates a session — user is logged in

You never see their Google password. Google handles all the hard stuff.

## Supabase Auth

Supabase has auth built in:
- Google OAuth — one toggle to enable
- GitHub OAuth — one toggle to enable
- Magic link — email a login link
- Email/password — if you really want it

We'll use Supabase Auth because it's already connected to your database. When a user signs up, they automatically get a row in Supabase's auth.users table.`,
    miniQuiz: [
      {
        question: "Why should you use OAuth instead of building your own password system?",
        options: [
          "OAuth is faster to load",
          "You avoid storing passwords — Google/GitHub handle security for you",
          "OAuth looks cooler",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L12B2",
    levelId: 12,
    type: "theory",
    title: "Protected Routes",
    xp: 10,
    required: true,
    order: 2,
    content: `# Protected Routes — Keep Strangers Out

Once you have auth, you need to decide: which pages can anyone see, and which require login?

## Public vs Protected

| Page | Access | Why |
|---|---|---|
| Landing page | Public | Everyone should see your marketing |
| Pricing | Public | People browse before signing up |
| Login / Sign up | Public | Obviously |
| Dashboard | **Protected** | Only logged-in users |
| Settings | **Protected** | User's personal data |
| API routes | **Protected** | Data endpoints need auth checks |

## How Protection Works

When someone visits a protected page:

1. Check: is there a session? (is the user logged in?)
2. If **yes** → show the page
3. If **no** → redirect to /login

In Next.js with Supabase Auth, this looks like middleware that checks the session on every request to protected routes.

## The API Route Trap

UI protection isn't enough. If your /dashboard is protected but your API route /api/tasks isn't, anyone can call the API directly and get data.

**ALWAYS check auth in API routes too.** Not just in the UI.

\`\`\`
// Every API route that returns user data:
const session = await getSession();
if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
\`\`\``,
    miniQuiz: [
      {
        question: "Why isn't protecting just the UI enough?",
        options: [
          "The UI is always secure enough",
          "Someone can call your API routes directly — bypassing the UI entirely",
          "Protected UI is slower than public UI",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L12B3",
    levelId: 12,
    type: "prompt",
    title: "Add Authentication",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "template",
    goal: "Add Supabase Auth to your app with sign up, sign in, sign out, and protected routes.",
    referencePrompt: `Add authentication to my Next.js app using Supabase Auth.

Requirements:
1. Sign-in page (/login) with Google OAuth button and email magic link option
2. Sign-up redirects to /login (same page handles both)
3. After successful login, redirect to /dashboard
4. Sign-out button in the top nav bar
5. Protect /dashboard and all /app/* routes — redirect to /login if not signed in
6. Show user's email and avatar in the nav bar when logged in

Use @supabase/ssr for server-side auth. Set up middleware.ts for route protection.

My Supabase project is already configured in .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`,
    template: `Add authentication to my Next.js app using Supabase Auth.

Requirements:
1. Sign-in page at ___ with ___
2. After login, redirect to ___
3. Sign-out button in ___
4. Protect these routes: ___
5. Show user info in ___

Use @supabase/ssr for server-side auth.`,
    passingThreshold: 2.5,
  },
  {
    id: "L12B4",
    levelId: 12,
    type: "build",
    title: "Sign In Flow",
    xp: 40,
    required: true,
    order: 4,
    mission:
      "Add authentication: sign up, sign in, sign out. Protected routes redirect to login. Deploy and test.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for authentication: sign-in page, sign-out functionality, at least one protected route that redirects to login. Should use Supabase Auth, NextAuth, or similar — not a DIY password system.",
    passingScore: 55,
  },

  // ─── Level 13: Your Data, Their Data (4 blocks) ───
  {
    id: "L13B1",
    levelId: 13,
    type: "theory",
    title: "User-Scoped Data",
    xp: 10,
    required: true,
    order: 1,
    content: `# Your Data, Their Data

Right now, if two users sign in, they see the SAME data. That's a bug — and a privacy disaster.

**User-scoped data** = each user only sees their own stuff.

## How to Scope Data

Every table that has user data needs a \`user_id\` column:

| id | title | user_id |
|---|---|---|
| 1 | "Buy groceries" | user-abc |
| 2 | "Ship feature" | user-abc |
| 3 | "Call dentist" | user-xyz |

When user-abc loads their tasks, the query filters by their user_id:

\`\`\`javascript
const { data } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', session.user.id)  // Only MY tasks
\`\`\`

User-abc sees tasks 1 and 2. User-xyz sees task 3. They never see each other's data.

## Row Level Security (RLS)

Supabase has a feature called **Row Level Security** — it enforces data isolation at the DATABASE level. Even if your code has a bug and forgets the .eq('user_id', ...) filter, the database itself blocks access.

Enable RLS on every table and add a policy:
- "Users can only see rows where user_id = their auth.uid()"

This is your safety net. Code bugs happen. RLS catches them.`,
    miniQuiz: [
      {
        question: "What is Row Level Security (RLS)?",
        options: [
          "A CSS feature for responsive layouts",
          "Database-level rules that enforce who can see which rows — even if your code has bugs",
          "A way to encrypt your data at rest",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L13B2",
    levelId: 13,
    type: "theory",
    title: "Secrets Stay Secret",
    xp: 10,
    required: true,
    order: 2,
    content: `# Secrets Management — The #1 Security Mistake

If you put API keys in your code and push to GitHub, anyone can find and use them. Bots scan GitHub for exposed keys 24/7.

## The Rules

### 1. Secrets go in .env.local (your machine only)
\`\`\`
# .env.local — NEVER committed to git
NEXT_PUBLIC_SUPABASE_URL=https://abc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...secret...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

### 2. .env.example goes in git (template for others)
\`\`\`
# .env.example — committed to git, no real values
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
\`\`\`

### 3. Production secrets go in Vercel
Vercel dashboard → Settings → Environment Variables. Add all your secrets there. Vercel injects them at build time.

### 4. .gitignore must include .env
\`\`\`
# .gitignore
.env
.env.local
.env.production
\`\`\`

## If You Already Pushed .env to GitHub

1. **Rotate all keys immediately** — go to Supabase/Stripe/etc and generate new keys
2. Remove the file from git history (or accept that old keys are exposed)
3. Add .env to .gitignore
4. Put new keys in .env.local

The old keys are compromised forever — anyone who saw the commit has them.`,
    miniQuiz: [
      {
        question: "What do you do if you accidentally pushed .env to GitHub?",
        options: [
          "Delete the file and push again — problem solved",
          "Rotate ALL keys immediately (generate new ones), add .env to .gitignore",
          "Nothing — .env files are automatically encrypted by GitHub",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L13B3",
    levelId: 13,
    type: "experiment",
    title: "Test Data Isolation",
    xp: 15,
    required: true,
    order: 3,
    description: "Verify that users can only see their own data.",
    steps: [
      {
        id: "L13B3S1",
        instruction:
          "Create two separate accounts in your app (use two different emails or browsers). Log in as User A and create some data (tasks, projects, etc.).",
        expectedOutcome: "User A has data in the app.",
        question: "How many items did User A create?",
      },
      {
        id: "L13B3S2",
        instruction:
          "Now log in as User B (different browser or incognito). Can User B see User A's data?\n\nIf User B CAN see User A's data — you have a bug. Your queries aren't filtering by user_id.",
        expectedOutcome: "User B sees ONLY their own data (or an empty state if they haven't created anything).",
        question: "Can User B see User A's data? (Should be NO)",
      },
      {
        id: "L13B3S3",
        instruction:
          "Check your secrets:\n\n1. Is `.env.local` in your `.gitignore`?\n2. Do you have a `.env.example` file (with empty values)?\n3. Search your code for any hardcoded keys: look for strings starting with `sk_`, `eyJ`, `whsec_`\n\nIf you find hardcoded secrets, move them to .env.local immediately.",
        expectedOutcome: "No secrets in committed code. .env.local is gitignored. .env.example exists.",
        question: "Are all your secrets safely in .env.local?",
      },
    ],
  },
  {
    id: "L13B4",
    levelId: 13,
    type: "debug",
    title: "Fix Auth Issues",
    xp: 20,
    required: true,
    order: 4,
    scenarios: [
      {
        id: "L13B4S1",
        title: "Redirect loop",
        description:
          "After signing in, the user gets stuck in an infinite redirect loop between /login and /dashboard. The page never loads.",
        brokenCode: `// middleware.ts
export async function middleware(request) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// This middleware runs on ALL routes, including /login itself
export const config = {
  matcher: ['/:path*'],
}`,
        language: "typescript",
        hint: "The middleware runs on /login too, but /login doesn't have a session (user isn't logged in yet). So it redirects to /login, which redirects to /login... Exclude /login from the matcher.",
        expectedFix:
          "Middleware should exclude public routes (/login, /, /pricing) from the matcher. Only protect specific paths like /dashboard, /app, /api.",
      },
      {
        id: "L13B4S2",
        title: "Missing environment variable",
        description:
          "The app works locally but crashes on Vercel with 'NEXT_PUBLIC_SUPABASE_URL is undefined'. The .env.local file has the right values.",
        brokenCode: `// The error in Vercel deployment logs:
Error: supabaseUrl is required.
// NEXT_PUBLIC_SUPABASE_URL is undefined in production`,
        language: "text",
        hint: ".env.local is only on your machine. Vercel needs the same variables added to its Environment Variables settings.",
        expectedFix:
          "Add all required environment variables to Vercel: Settings → Environment Variables. .env.local is local-only — Vercel doesn't have it.",
      },
    ],
    passingCount: 2,
  },

  // ─── Level 14: Auth Boss (3 blocks) ───
  {
    id: "L14B1",
    levelId: 14,
    type: "review",
    title: "Find Auth Holes",
    xp: 20,
    required: true,
    order: 1,
    code: `// app/api/tasks/route.ts
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();

  const { data } = await supabase
    .from("tasks")
    .insert({
      title: body.title,
      description: body.description,
    });

  return Response.json(data);
}`,
    language: "typescript",
    description:
      "This API route handles tasks. The UI is behind a login page, so only logged-in users can see it. Is that enough?",
    knownIssues: [
      {
        id: "no-auth-check",
        lineRange: [4, 4],
        description:
          "No authentication check — anyone can call GET /api/tasks directly (with curl, Postman, etc.) and get ALL tasks from ALL users. UI protection is not enough.",
        severity: "critical",
      },
      {
        id: "no-user-filter",
        lineRange: [6, 6],
        description:
          "No user_id filter — returns ALL tasks from the database, not just the current user's. Every user sees everyone's data.",
        severity: "critical",
      },
      {
        id: "no-user-id-on-create",
        lineRange: [17, 20],
        description:
          "POST doesn't set user_id — new tasks have no owner. They'll show up for everyone (or no one).",
        severity: "critical",
      },
    ],
    minIssuesFound: 2,
  },
  {
    id: "L14B2",
    levelId: 14,
    type: "audit",
    title: "Auth Security Checklist",
    xp: 25,
    required: true,
    order: 2,
    description: "Audit your app's authentication and data isolation.",
    checklist: [
      {
        id: "auth-on-api",
        category: "security",
        title: "Auth on API Routes",
        description: "Every API route that returns or modifies user data checks for a valid session first.",
        severity: "critical",
        howToCheck: "Try calling your API routes with curl or Postman (no cookie/token). Do they return 401 Unauthorized?",
      },
      {
        id: "user-scoped-queries",
        category: "security",
        title: "User-Scoped Queries",
        description: "Every database query filters by the current user's ID. No user can see another user's data.",
        severity: "critical",
        howToCheck: "Log in as User A, note the data. Log in as User B — can you see User A's data?",
      },
      {
        id: "env-not-in-git",
        category: "security",
        title: "No Secrets in Git",
        description: ".env files are in .gitignore. No API keys, passwords, or secrets in committed code.",
        severity: "critical",
        howToCheck: "Search your repo for strings starting with sk_, eyJ, whsec_. Check that .gitignore includes .env.",
      },
      {
        id: "env-example-exists",
        category: "code-quality",
        title: ".env.example Exists",
        description: "A .env.example file with empty values documents which environment variables are needed.",
        severity: "warning",
        howToCheck: "Check if .env.example exists in the repo root with all required variable names (but no values).",
      },
      {
        id: "protected-routes",
        category: "security",
        title: "Protected Routes Work",
        description: "Visiting /dashboard (or any protected page) without being logged in redirects to /login.",
        severity: "critical",
        howToCheck: "Open an incognito window and navigate directly to /dashboard. Do you get redirected to /login?",
      },
    ],
    minPassed: 4,
  },
  {
    id: "L14B3",
    levelId: 14,
    type: "build",
    title: "Multi-User SaaS",
    xp: 200,
    required: true,
    order: 3,
    mission:
      "Boss level: multi-user app with auth, user-scoped data, .env.example, no exposed secrets. Test with 2 different accounts.",
    githubChecks: {
      fileExists: [".env.example", ".gitignore"],
      minCommits: 5,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: working auth (sign up/in/out), protected routes, user-scoped data (queries filter by user_id), .env.example, .gitignore with .env. No secrets in committed code. Auth check on API routes.",
    passingScore: 60,
  },
];
