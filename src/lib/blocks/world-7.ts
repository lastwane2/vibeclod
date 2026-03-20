import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 7 — Don't Get Hacked (Levels 23-25)
// Security, .env, legal
// ═══════════════════════════════════════

export const WORLD_7_BLOCKS: Block[] = [
  // ─── Level 23: Top 5 Vibe Code Fails (4 blocks) ───
  {
    id: "L23B1",
    levelId: 23,
    type: "theory",
    title: "The Top 5 Security Mistakes",
    xp: 10,
    required: true,
    order: 1,
    content: `# 45% of AI-Generated Code Has Security Flaws

That's not a scare tactic — it's a real statistic. AI writes code that WORKS but doesn't think about security. Your job: catch these before someone exploits them.

## Mistake #1: Secrets in Code

AI sometimes hardcodes API keys directly in source files:
\`\`\`javascript
// NEVER do this — anyone can see it on GitHub
const stripe = new Stripe('sk_live_abc123...');
\`\`\`

**Fix:** Always use environment variables (\`.env.local\`).

## Mistake #2: No Auth on API Routes

AI protects the UI (hides buttons) but forgets the API:
\`\`\`javascript
// Anyone can call this directly with curl
export async function GET() {
  return Response.json(await db.query('SELECT * FROM users'));
}
\`\`\`

**Fix:** Check session/auth at the start of every API route.

## Mistake #3: No Input Validation

AI trusts all input:
\`\`\`javascript
// What if someone sends { title: "<script>alert('hacked')</script>" } ?
const { title } = await request.json();
await db.insert({ title });
\`\`\`

**Fix:** Validate and sanitize all input. Use a library like Zod.

## Mistake #4: Leaking Error Details

\`\`\`javascript
// Tells attackers your database structure
catch (error) {
  return Response.json({ error: error.message });
}
\`\`\`

**Fix:** Log the real error server-side. Show users a generic message.

## Mistake #5: No Rate Limiting

Without rate limiting, a bot can hit your API 1000 times per second — racking up database costs or brute-forcing passwords.

**Fix:** Add rate limiting to public API endpoints (Vercel has built-in options, or use upstash/ratelimit).`,
    miniQuiz: [
      {
        question: "What's the #1 security mistake in vibe-coded apps?",
        options: [
          "Using too many npm packages",
          "Hardcoding secrets (API keys, passwords) in source code that gets pushed to GitHub",
          "Not using TypeScript",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L23B2",
    levelId: 23,
    type: "theory",
    title: "The .env Disaster",
    xp: 10,
    required: true,
    order: 2,
    content: `# What Happens When .env Leaks

Bots scan every new GitHub commit for secrets. Within **minutes** of pushing a .env file:

1. Bots find your API keys
2. They use your Stripe key to create test charges (or real ones)
3. They use your Supabase key to read/delete your entire database
4. They use your OpenAI key to run up thousands in API costs
5. You get an email from Stripe/Supabase/OpenAI about suspicious activity

This is not hypothetical. It happens every day.

## Prevention Checklist

1. **.gitignore includes .env** — before your first commit
2. **.env.example in repo** — with empty values, so others know what's needed
3. **Secrets in Vercel** — production env vars set in Vercel dashboard
4. **Never put secrets in NEXT_PUBLIC_ vars** — those are visible in browser JS
5. **Rotate keys after any exposure** — old keys are compromised forever

## NEXT_PUBLIC_ Warning

In Next.js, any env var starting with \`NEXT_PUBLIC_\` is embedded in the frontend JavaScript. Anyone can see it in browser DevTools.

- \`NEXT_PUBLIC_SUPABASE_URL\` — OK, this is meant to be public
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` — OK, this is the public key
- \`SUPABASE_SERVICE_ROLE_KEY\` — NEVER add NEXT_PUBLIC_ to this. It bypasses RLS!
- \`STRIPE_SECRET_KEY\` — NEVER. This gives full access to your Stripe account.

## If You Already Leaked

1. **Rotate ALL keys immediately** — new keys from every service
2. **Check for damage** — unauthorized charges, data access, API usage
3. **Add .env to .gitignore** — prevent future leaks
4. The old keys are compromised forever, even if you delete the file from GitHub (it's in git history)`,
    miniQuiz: [
      {
        question: "What does NEXT_PUBLIC_ prefix mean for environment variables?",
        options: [
          "The variable is encrypted and extra secure",
          "The variable is embedded in frontend JavaScript — anyone can see it in the browser",
          "The variable is only available during build time",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L23B3",
    levelId: 23,
    type: "debug",
    title: "Close Security Holes",
    xp: 20,
    required: true,
    order: 3,
    scenarios: [
      {
        id: "L23B3S1",
        title: "Exposed API route",
        description:
          "The /api/admin/users route returns all users with their emails and plan status. It has no authentication check. Anyone can call it.",
        brokenCode: `// api/admin/users/route.ts
export async function GET() {
  const { data } = await supabase
    .from('users')
    .select('id, email, plan, created_at');

  return Response.json(data);
}`,
        language: "typescript",
        hint: "Add auth check AND admin role check. Not every logged-in user should see all users — only admins.",
        expectedFix:
          "Should check session authentication AND verify the user has admin role before returning data. Return 401 for unauthenticated, 403 for non-admin.",
      },
      {
        id: "L23B3S2",
        title: "Error message leaks info",
        description:
          "When the database query fails, the error response includes the full Supabase error with table names, column names, and query details.",
        brokenCode: `try {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return Response.json(data);
} catch (err) {
  return Response.json({ error: err.message, details: err }, { status: 500 });
}`,
        language: "typescript",
        hint: "Never send internal error details to the client. Log the real error server-side, send a generic message to the user.",
        expectedFix:
          "Should console.error the real error for debugging, but return a generic message to the client like 'Something went wrong. Please try again.'",
      },
      {
        id: "L23B3S3",
        title: "XSS vulnerability",
        description:
          "User input is rendered directly in HTML without sanitization. A user could submit a task title containing a script tag.",
        brokenCode: `// Rendering user input directly
<div dangerouslySetInnerHTML={{ __html: task.title }} />`,
        language: "tsx",
        hint: "Never use dangerouslySetInnerHTML with user input. Use regular text rendering — React escapes it automatically.",
        expectedFix:
          "Replace dangerouslySetInnerHTML with regular JSX text rendering: <div>{task.title}</div>. React auto-escapes HTML entities.",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L23B4",
    levelId: 23,
    type: "review",
    title: "Spot Vulnerabilities",
    xp: 20,
    required: true,
    order: 4,
    code: `// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://abc123.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyMyIsInJvbGUiOiJzZXJ2aWNlX3JvbGUifQ.fake-key'
);

export default supabase;

// api/tasks/route.ts
export async function DELETE(request) {
  const { id } = await request.json();
  await supabase.from('tasks').delete().eq('id', id);
  return Response.json({ success: true });
}`,
    language: "typescript",
    description:
      "This code connects to Supabase and has a delete endpoint. It was generated by AI. Find the security issues.",
    knownIssues: [
      {
        id: "hardcoded-url",
        lineRange: [4, 4],
        description:
          "Supabase URL is hardcoded instead of using process.env.NEXT_PUBLIC_SUPABASE_URL. Minor but makes it hard to change environments.",
        severity: "warning",
      },
      {
        id: "service-role-key-exposed",
        lineRange: [5, 5],
        description:
          "This is a SERVICE ROLE KEY (not anon key) — it bypasses Row Level Security. If this file is in the frontend bundle, anyone can access ALL data in the database. Service role should only be used in server-side code with extreme caution.",
        severity: "critical",
      },
      {
        id: "no-auth-on-delete",
        lineRange: [11, 14],
        description:
          "No authentication check on the DELETE endpoint. Anyone can delete any task by ID. No ownership check either — user A could delete user B's task.",
        severity: "critical",
      },
    ],
    minIssuesFound: 2,
  },

  // ─── Level 24: The Full Audit (4 blocks) ───
  {
    id: "L24B1",
    levelId: 24,
    type: "audit",
    title: "Security Checklist",
    xp: 25,
    required: true,
    order: 1,
    description: "The 10-point security audit for your app.",
    checklist: [
      {
        id: "no-secrets-in-code",
        category: "security",
        title: "No Secrets in Code",
        description: "No API keys, passwords, or tokens in any committed file.",
        severity: "critical",
        howToCheck: "Search your repo for: sk_, eyJ, whsec_, password=, secret=. Check that .env is in .gitignore.",
      },
      {
        id: "auth-on-routes",
        category: "security",
        title: "Auth on All API Routes",
        description: "Every API route that returns or modifies user data checks for a valid session.",
        severity: "critical",
        howToCheck: "Use curl or Postman to call each API route without a session cookie. All should return 401.",
      },
      {
        id: "user-data-isolation",
        category: "security",
        title: "User Data Isolation",
        description: "Every query filters by user_id. No user can access another user's data.",
        severity: "critical",
        howToCheck: "Log in as User A. Try to access User B's data by changing IDs in API calls.",
      },
      {
        id: "input-validation",
        category: "security",
        title: "Input Validation",
        description: "All user inputs are validated before processing. No SQL injection or XSS possible.",
        severity: "critical",
        howToCheck: "Try submitting forms with: empty fields, very long strings, HTML tags, SQL-like strings.",
      },
      {
        id: "webhook-verification",
        category: "security",
        title: "Webhook Signature Verification",
        description: "Stripe webhooks verify the signature before processing events.",
        severity: "critical",
        howToCheck: "Check webhook code for stripe.webhooks.constructEvent() with STRIPE_WEBHOOK_SECRET.",
      },
      {
        id: "feature-gating-server",
        category: "security",
        title: "Server-Side Feature Gating",
        description: "Pro features are checked in API routes, not just hidden in the UI.",
        severity: "warning",
        howToCheck: "As a free user, call pro-only API routes directly. Do they return 403?",
      },
      {
        id: "env-example",
        category: "code-quality",
        title: ".env.example Exists",
        description: "A .env.example documents required environment variables without real values.",
        severity: "warning",
        howToCheck: "Check repo for .env.example. Does it list all required variables?",
      },
      {
        id: "safe-error-messages",
        category: "security",
        title: "Safe Error Messages",
        description: "Error responses don't leak internal details (table names, stack traces, query details).",
        severity: "warning",
        howToCheck: "Trigger errors (bad input, missing auth) and check the response body. No internal details?",
      },
      {
        id: "no-next-public-secrets",
        category: "security",
        title: "No Secrets in NEXT_PUBLIC_ Vars",
        description: "Secret keys (service role, Stripe secret) are NOT prefixed with NEXT_PUBLIC_.",
        severity: "critical",
        howToCheck: "Check .env.local — only public/anon keys should have NEXT_PUBLIC_ prefix.",
      },
      {
        id: "https-only",
        category: "security",
        title: "HTTPS Only",
        description: "Your deployed site uses HTTPS (Vercel does this automatically).",
        severity: "critical",
        howToCheck: "Visit your deployed URL. Does it show the lock icon in the browser bar?",
      },
    ],
    minPassed: 7,
  },
  {
    id: "L24B2",
    levelId: 24,
    type: "theory",
    title: "Rate Limiting & Legal",
    xp: 10,
    required: true,
    order: 2,
    content: `# Rate Limiting

Without rate limiting, a single bot can:
- Hit your API 10,000 times per minute
- Rack up database costs
- Brute-force passwords
- Scrape all your data

## Simple Rate Limiting

Use \`@upstash/ratelimit\` with a Redis store (Upstash has a free tier):

\`\`\`javascript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
});

// In your API route:
const { success } = await ratelimit.limit(userId || ip);
if (!success) return Response.json({ error: "Too many requests" }, { status: 429 });
\`\`\`

Start with rate limiting on: sign up, login, and any public API endpoints.

# Legal Pages

Stripe requires a Terms of Service and Privacy Policy before you can accept real payments.

## AI Can Draft These

Ask AI: "Write a Terms of Service and Privacy Policy for [your app]. It's a SaaS that stores [what data] and processes payments via Stripe."

AI generates a reasonable draft. Have a lawyer review it later when you're making real money. For launch, an AI-drafted version is fine — most indie SaaS companies start this way.

## Required Pages
- \`/terms\` — Terms of Service
- \`/privacy\` — Privacy Policy
- Link to both in your footer`,
  },
  {
    id: "L24B3",
    levelId: 24,
    type: "prompt",
    title: "AI Security Audit",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "none",
    goal: "Ask AI to perform a thorough security audit of your codebase.",
    referencePrompt: `Do a security audit of my entire codebase. Check every file for these issues:

1. Hardcoded secrets — any API keys, passwords, or tokens in source code
2. Unprotected API routes — routes that don't check authentication
3. Missing user_id filters — queries that could return other users' data
4. Input validation — forms and API endpoints that don't validate input
5. Dangerous patterns — dangerouslySetInnerHTML, eval(), unsanitized SQL
6. Error leaking — error responses that include internal details
7. NEXT_PUBLIC_ misuse — secret keys with NEXT_PUBLIC_ prefix
8. Missing rate limiting on public endpoints

For each issue found, tell me:
- File and line number
- What's wrong
- How to fix it
- Severity (critical/warning)

Also check: is .env in .gitignore? Does .env.example exist?`,
    passingThreshold: 3.0,
  },
  {
    id: "L24B4",
    levelId: 24,
    type: "build",
    title: "Add Legal Pages",
    xp: 30,
    required: true,
    order: 4,
    mission:
      "Add Terms of Service and Privacy Policy pages. Link to them from the footer. Fix any security issues found in the audit.",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Terms of Service and Privacy Policy pages (or links to them). Footer should link to both. Any obvious security issues in the codebase should be addressed.",
    passingScore: 50,
  },

  // ─── Level 25: Security Boss (3 blocks) ───
  {
    id: "L25B1",
    levelId: 25,
    type: "debug",
    title: "Stop the Attacks",
    xp: 25,
    required: true,
    order: 1,
    scenarios: [
      {
        id: "L25B1S1",
        title: "Auth bypass via direct API call",
        description:
          "A hacker noticed your /api/users endpoint doesn't check auth. They call it directly and get every user's email and plan status.",
        brokenCode: `// api/users/route.ts
export async function GET() {
  const { data } = await supabase
    .from('users')
    .select('id, email, name, plan, stripe_customer_id');
  return Response.json(data);
}`,
        language: "typescript",
        hint: "Add session check. Also: even for authed users, only return THEIR data. And never return stripe_customer_id to the frontend.",
        expectedFix:
          "Add auth check (return 401 if no session). Filter by user_id (return only their own data). Remove sensitive fields like stripe_customer_id from the select.",
      },
      {
        id: "L25B1S2",
        title: "Data leak via ID guessing",
        description:
          "Tasks use sequential integer IDs. A user can change the task ID in the URL (/api/tasks/42 → /api/tasks/41) and see other users' tasks.",
        brokenCode: `// api/tasks/[id]/route.ts
export async function GET(request, { params }) {
  const { data } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', params.id)
    .single();
  return Response.json(data);
}`,
        language: "typescript",
        hint: "Even if the user is authenticated, you must verify they OWN this task. Add .eq('user_id', session.user.id) to the query.",
        expectedFix:
          "Add auth check AND ownership check: .eq('id', params.id).eq('user_id', session.user.id). If no result, return 404 (not 403 — don't reveal that the task exists).",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L25B2",
    levelId: 25,
    type: "pattern",
    title: "The Debug Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "error-fix",
    exercise: {
      goal: "Practice the systematic debugging pattern for a production issue",
      template: `I'm getting this error in production:

\`\`\`
[error]
\`\`\`

Context:
- File: ___
- What I was doing: ___
- Expected: ___
- Already tried: ___`,
      exampleFilled: `I'm getting this error in production:

\`\`\`
500 Internal Server Error on POST /api/stripe/webhook
Stripe webhook event: checkout.session.completed
\`\`\`

Context:
- File: api/stripe/webhook/route.ts
- What I was doing: completing a test payment through Stripe Checkout
- Expected: webhook processes the event, updates user plan to 'pro' in database
- Already tried: checked Stripe dashboard — event was sent. Checked Vercel logs — "STRIPE_WEBHOOK_SECRET is undefined"

The env var exists in .env.local but I forgot to add it to Vercel's environment variables.`,
    },
  },
  {
    id: "L25B3",
    levelId: 25,
    type: "build",
    title: "Hardened Product",
    xp: 200,
    required: true,
    order: 3,
    mission:
      "Boss level: pass the 10-point security audit. Auth on all API routes, user data isolation, no secrets in code, safe error messages, ToS and Privacy Policy. Deploy a hardened app.",
    githubChecks: {
      fileExists: [".env.example", ".gitignore"],
      minCommits: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Security audit: no secrets in committed code, auth on all API routes, user data isolation (queries filter by user_id), input validation, safe error messages (no internal details leaked), .env.example exists, .gitignore includes .env. Terms/Privacy pages are a bonus.",
    passingScore: 60,
  },
];
