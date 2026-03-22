import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// WORLD 3 — Users (L10-L13)
// Auth → data isolation → security → boss
// ═══════════════════════════════════════

export const WORLD_3_BLOCKS: Block[] = [
  // ─── Level 10: Anyone Sees Everything ──
  {
    id: "L10B1",
    levelId: 10,
    type: "theory",
    title: "The Privacy Problem",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Everyone Sees Everyone's Data

Open your app in Chrome. Open it in Firefox. Same data, right?

That means: if 10 people use your app, they ALL see each other's tasks/notes/whatever. No accounts. No privacy. Anyone can delete anyone's stuff.

You need **authentication** — a way for users to create accounts and log in.

We use **Supabase Auth** — it comes built into Supabase, no extra setup. AI knows it well.

After this level, your app will have:
- /login and /signup pages
- Logout button
- Protected routes (if not logged in → redirect to /login)
- User's email in the navigation`,
  },
  {
    id: "L10B2",
    levelId: 10,
    type: "prompt",
    title: "Add Authentication",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to add Supabase Auth with login, signup, and protected routes.",
    referencePrompt: `Add authentication with Supabase Auth:
- /login and /signup pages with email/password
- Logout button in the navigation bar
- If not logged in — redirect to /login
- Show the user's email in the navigation when logged in`,
    hints: [
      "Supabase Auth is built-in — no extra package needed",
      "Protected routes = middleware or layout check",
      "Test both login AND signup flows",
    ],
    passingThreshold: 3,
  },
  {
    id: "L10B3",
    levelId: 10,
    type: "experiment",
    title: "Test Auth Flow",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 5,
    description: "Verify every auth scenario works correctly.",
    steps: [
      {
        id: "signup",
        instruction:
          "Go to /signup. Create a new account with email + password. Did it work? Are you logged in?",
        expectedOutcome: "New account created, redirected to dashboard.",
      },
      {
        id: "nav",
        instruction:
          "Check the navigation bar. Does it show your email? Is there a logout button?",
        expectedOutcome: "Email visible in nav, logout button present.",
      },
      {
        id: "logout",
        instruction:
          "Click logout. Are you redirected to /login? Can you still see the dashboard?",
        expectedOutcome: "Redirected to /login. Dashboard not accessible.",
      },
      {
        id: "protect",
        instruction:
          "Without logging in, go directly to /dashboard (type it in the URL bar). Are you redirected to /login?",
        expectedOutcome: "Redirected to /login. Protected routes work.",
      },
    ],
  },
  {
    id: "L10B4",
    levelId: 10,
    type: "build",
    title: "Auth Works",
    xp: 20,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Push your auth implementation. Login, signup, logout, and protected routes all working. At least 3 commits.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for: auth pages (login/signup routes), session handling (Supabase Auth), protected routes (redirect if not authenticated), logout functionality. The auth flow should be complete.",
    passingScore: 60,
  },

  // ─── Level 11: Mine vs Yours ──────────
  {
    id: "L11B1",
    levelId: 11,
    type: "theory",
    title: "Auth ≠ Data Privacy",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Login Doesn't Mean Private

You have auth now. Users can log in. Great.

But log in as User A, create some items. Now log in as User B. Can User B see User A's items?

**Probably yes.** Auth checks WHO you are, but doesn't filter WHAT you see.

Two things fix this:

1. **user_id on every record** — when someone creates an item, attach their ID to it. When reading, only show items with THEIR ID.

2. **RLS (Row Level Security)** — database-level rules that say "users can only see rows where user_id = their ID." Even if your code has a bug, the DATABASE won't leak data.

**Always test with 2 accounts in 2 different browsers.** This is the only way to know data is truly separated.`,
  },
  {
    id: "L11B2",
    levelId: 11,
    type: "prompt",
    title: "Isolate User Data",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Tell AI to add user_id to records and set up RLS.",
    referencePrompt: `Make data private to each user:
- Add user_id to all records in the database
- When creating a record — automatically set user_id to the current user
- When reading — only show records belonging to the current user
- Set up RLS policies in Supabase so users can only see/edit/delete their own data`,
    hints: [
      "AI knows how to write RLS policies — just tell it what you want",
      "user_id should be set automatically, not by the user",
      "Test with TWO accounts — that's the only real test",
    ],
    passingThreshold: 3,
  },
  {
    id: "L11B3",
    levelId: 11,
    type: "experiment",
    title: "Two-Account Test",
    xp: 20,
    required: true,
    order: 3,
    estimatedMinutes: 8,
    description:
      "The most important test: verify data isolation with 2 separate accounts.",
    steps: [
      {
        id: "user-a",
        instruction:
          "Browser 1 (normal): Log in as User A. Create 3 items. Note what you created.",
        expectedOutcome: "User A has 3 items visible.",
      },
      {
        id: "user-b",
        instruction:
          "Browser 2 (incognito): Sign up as a NEW User B. Create 2 different items.",
        expectedOutcome: "User B has 2 items visible.",
      },
      {
        id: "isolation",
        instruction:
          "User A sees exactly 3 items (their own)? User B sees exactly 2 items (their own)? No crossover?",
        expectedOutcome:
          "Complete data isolation. Each user sees only their own data.",
      },
      {
        id: "verify",
        instruction:
          "Refresh both browsers. Data still separated? If User A sees User B's items — RLS is not working. Tell AI to fix it.",
        expectedOutcome: "Data isolation persists across refreshes.",
      },
    ],
  },
  {
    id: "L11B4",
    levelId: 11,
    type: "build",
    title: "Data Isolated",
    xp: 20,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Push your data isolation code. user_id on records, RLS enabled, tested with 2 accounts. At least 3 commits.",
    githubChecks: {
      minCommits: 3,
    },
    aiReviewPrompt:
      "Check for: user_id in database queries (insert and select), RLS policies referenced in code or SQL, data filtering by authenticated user. The app should isolate data per user.",
    passingScore: 60,
  },

  // ─── Level 12: Security Checklist ─────
  {
    id: "L12B1",
    levelId: 12,
    type: "theory",
    title: "The 6-Point Security Check",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Before Going Further — Check for Holes

You have auth and data isolation. But are there gaps? Let's check.

## The Checklist

1. **Secrets in code?** Search your repo for: \`sk_\`, \`eyJ\`, \`password\`, \`secret\`. Found something? Move it to .env.local.

2. **API routes without auth?** Every file in \`app/api/\` should check the session first. No session → return 401.

3. **\`.env\` in .gitignore?** Open .gitignore. Is \`.env*\` or \`.env.local\` in there?

4. **\`.env.example\` exists?** With placeholder values only — no real keys.

5. **Error messages safe?** Search for \`error.message\` in API responses. Replace with "Something went wrong."

6. **RLS enabled?** Check Supabase Dashboard → each table → RLS enabled?

If all 6 pass — you're in good shape. If not — fix before moving on.`,
  },
  {
    id: "L12B2",
    levelId: 12,
    type: "audit",
    title: "Security Audit",
    xp: 20,
    required: true,
    order: 2,
    estimatedMinutes: 8,
    description:
      "Run through the security checklist and fix any issues found.",
    checklist: [
      {
        id: "secrets",
        category: "security",
        title: "No hardcoded secrets",
        description:
          "Search repo for sk_, eyJ, password, secret. Nothing found in code files.",
        severity: "critical",
        howToCheck:
          "Use your editor's search (Ctrl+Shift+F) to search the entire project for: sk_, eyJ, password, secret. Ignore .env.local (that's where they SHOULD be).",
      },
      {
        id: "api-auth",
        category: "security",
        title: "API routes check auth",
        description:
          "Every file in app/api/ checks for a valid session before doing anything. No session → 401.",
        severity: "critical",
        howToCheck:
          "Open each file in app/api/. Look for session/auth check near the top. If missing — ask AI to add it.",
      },
      {
        id: "gitignore",
        category: "security",
        title: ".env in .gitignore",
        description:
          ".gitignore contains .env* or .env.local — secrets never go to GitHub.",
        severity: "critical",
        howToCheck:
          "Open .gitignore. Search for .env. If not there — add .env.local and .env on separate lines.",
      },
      {
        id: "env-example",
        category: "security",
        title: ".env.example exists",
        description:
          ".env.example has variable names with placeholder values — no real keys.",
        severity: "warning",
        howToCheck:
          "Open .env.example. It should have lines like NEXT_PUBLIC_SUPABASE_URL=your-url-here — no actual keys or tokens.",
      },
      {
        id: "error-messages",
        category: "security",
        title: "Safe error messages",
        description:
          "API responses don't expose raw error details. Users see 'Something went wrong,' not stack traces.",
        severity: "warning",
        howToCheck:
          "Search for error.message or err.message in API route responses. Replace with generic messages.",
      },
      {
        id: "rls",
        category: "security",
        title: "RLS enabled",
        description:
          "Every table in Supabase has Row Level Security enabled.",
        severity: "critical",
        howToCheck:
          "Go to Supabase Dashboard → Table Editor → click each table → check that RLS is enabled (toggle should be ON).",
      },
    ],
    minPassed: 5,
  },
  {
    id: "L12B3",
    levelId: 12,
    type: "prompt",
    title: "AI Security Audit",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Ask AI to audit your code for security issues.",
    referencePrompt: `Check my code for security issues:
1. Are there any hardcoded secrets or API keys?
2. Do all API routes check for authentication?
3. Do all database queries filter by user_id?
4. Are there any error messages that leak internal details?
For each issue — tell me the file, the line, and how to fix it.`,
    hints: [
      "AI can search your entire codebase at once",
      "Ask for specific file + line for each issue",
      "Fix every critical issue before moving on",
    ],
    passingThreshold: 3,
  },
  {
    id: "L12B4",
    levelId: 12,
    type: "build",
    title: "Security Passed",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 3,
    mission:
      "All security issues fixed and committed. At least 5 out of 6 checklist items passed.",
    githubChecks: {
      minCommits: 2,
    },
    aiReviewPrompt:
      "Security check: no hardcoded secrets, API routes have auth checks, .gitignore includes .env, .env.example exists, error messages don't expose internals, RLS referenced in code. At least 4 of 6 should pass.",
    passingScore: 60,
  },

  // ─── Level 13: BOSS — Multi-User App ──
  {
    id: "L13B1",
    levelId: 13,
    type: "experiment",
    title: "Complete Multi-User Test",
    xp: 25,
    required: true,
    order: 1,
    estimatedMinutes: 10,
    description:
      "Full test on production: two users, data isolation, auth, mobile.",
    steps: [
      {
        id: "production",
        instruction:
          "Open your PRODUCTION URL (not localhost). Register User A. Create 5 items.",
        expectedOutcome: "User A has 5 items on the production site.",
      },
      {
        id: "user-b",
        instruction:
          "In incognito: register User B at the production URL. Create 3 items.",
        expectedOutcome: "User B has 3 items.",
      },
      {
        id: "isolation",
        instruction:
          "User A sees only 5 items? User B sees only 3? No data leaked?",
        expectedOutcome: "Complete data isolation on production.",
      },
      {
        id: "auth-flow",
        instruction:
          "Log out User A → redirects to /login? Try to access /dashboard without auth → redirects?",
        expectedOutcome: "Auth protection works on production.",
      },
      {
        id: "mobile",
        instruction:
          "Open the production URL on your phone. All pages work? All buttons? Forms? Loading states?",
        expectedOutcome: "Fully functional on mobile.",
      },
    ],
  },
  {
    id: "L13B2",
    levelId: 13,
    type: "build",
    title: "Ship Multi-User App",
    xp: 40,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    mission:
      "Production-ready multi-user app. Auth, data isolation, security, mobile, all states. At least 5 commits, 8+ files.",
    githubChecks: {
      minCommits: 5,
      minFiles: 8,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Comprehensive review: auth (login/signup/logout), data isolation (user_id + RLS), security (no secrets, auth on API routes), states (loading/error/empty), mobile responsive, deployed. This should work as a real multi-user application.",
    passingScore: 70,
  },
];
