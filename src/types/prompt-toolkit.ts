// ═══════════════════════════════════════
// Prompt Toolkit — collected patterns
// ═══════════════════════════════════════

export interface PromptPattern {
  id: string;
  name: string;
  description: string;
  worldId: number;
  chapter: number; // 1-5
  template: string; // The pattern template
  example: string; // A filled-in example
  whenToUse: string; // Guidance on when to apply
}

export interface ToolkitChapter {
  id: number;
  worldId: number;
  title: string;
  patterns: PromptPattern[];
}

export const PROMPT_PATTERNS: PromptPattern[] = [
  // ── Chapter 1: World 1 — Hello, Vibe ──
  {
    id: "basic-prompt",
    name: "Basic Prompt Pattern",
    description: "The foundation: task + context + format",
    worldId: 1,
    chapter: 1,
    template: `[TASK]: What you want the AI to build
[CONTEXT]: Background info, tech stack, constraints
[FORMAT]: How the output should be structured`,
    example: `Create an HTML page with a hero section that has a headline "Welcome to My Site" and a blue call-to-action button. Use modern CSS with flexbox centering. Output a single index.html file.`,
    whenToUse: "Every time you start a new prompt. This is your baseline structure.",
  },
  {
    id: "styling-pattern",
    name: "The Styling Pattern",
    description: "How to describe visual design to AI",
    worldId: 1,
    chapter: 1,
    template: `Style [component] with:
- Colors: [specific hex/named colors]
- Layout: [flexbox/grid/positioning]
- Typography: [font family, sizes, weights]
- Spacing: [margins, padding]
- Effects: [shadows, borders, transitions]`,
    example: `Style the hero section with:
- Colors: background #1a1a2e, text white, button #e94560
- Layout: flexbox centered both axes, min-height 100vh
- Typography: Inter font, heading 48px bold, body 18px
- Spacing: 32px padding, 16px gap between elements
- Effects: button hover glow, subtle text shadow`,
    whenToUse: "When AI-generated styling looks generic or you want a specific look.",
  },

  // ── Chapter 2: World 2 — Build Mode ──
  {
    id: "component-request",
    name: "Component Request Pattern",
    description: "How to request a React component",
    worldId: 2,
    chapter: 2,
    template: `Create a [ComponentName] React component that:
- Props: [list props with types]
- State: [what state it manages]
- Renders: [describe the UI]
- Handles: [events/interactions]
- Styles: [Tailwind classes or CSS approach]`,
    example: `Create a TaskCard React component that:
- Props: title (string), completed (boolean), onToggle (function)
- State: isExpanded (boolean) for showing details
- Renders: card with checkbox, title, expand button
- Handles: click to toggle complete, click to expand
- Styles: Tailwind — rounded-lg, shadow-sm, hover:shadow-md`,
    whenToUse: "When you need AI to generate a specific, well-defined component.",
  },
  {
    id: "layout-pattern",
    name: "The Layout Pattern",
    description: "Describe page layouts precisely",
    worldId: 2,
    chapter: 2,
    template: `Build a [page type] layout:
- Structure: [header/sidebar/main/footer arrangement]
- Responsive: [mobile: ..., tablet: ..., desktop: ...]
- Navigation: [what links, where they go]
- Content areas: [what goes in each section]`,
    example: `Build a dashboard layout:
- Structure: fixed sidebar left (240px), top header (64px), scrollable main
- Responsive: mobile: sidebar hidden + hamburger, tablet: collapsed sidebar, desktop: full
- Navigation: Dashboard, Projects, Settings, Profile in sidebar
- Content areas: main has grid of stat cards top, data table below`,
    whenToUse: "When building page layouts. Prevents AI from making weird layout choices.",
  },
  {
    id: "breaking-down-complexity",
    name: "Breaking Down Complexity",
    description: "Split big tasks into small prompts",
    worldId: 2,
    chapter: 2,
    template: `I'm building [big thing]. Let's do it step by step.

Step 1: [smallest working piece]
Step 2: [add next feature]
Step 3: [add next feature]
...

Start with Step 1 only.`,
    example: `I'm building a todo app with React. Let's do it step by step.

Step 1: Create the basic TodoList component that renders a static list of 3 todos
Step 2: Add an input + button to create new todos
Step 3: Add toggle complete functionality
Step 4: Add delete button
Step 5: Add localStorage persistence

Start with Step 1 only.`,
    whenToUse: "When a task is too big for one prompt. Always break it down.",
  },

  // ── Chapter 3: World 3 — Full Stack ──
  {
    id: "database-schema",
    name: "Database Schema Pattern",
    description: "Define data models clearly",
    worldId: 3,
    chapter: 3,
    template: `Create a Prisma schema for [app type]:

Models needed:
- [Model1]: [fields and types]
- [Model2]: [fields and types]

Relations:
- [Model1] has many [Model2]
- [etc.]

Include: id, timestamps, proper types, indexes`,
    example: `Create a Prisma schema for a blog:

Models needed:
- User: email (unique), name, avatar URL
- Post: title, content (long text), published (boolean), slug (unique)
- Comment: body, approved (boolean)

Relations:
- User has many Posts (author)
- User has many Comments
- Post has many Comments

Include: id, createdAt, updatedAt, proper types, indexes on foreign keys`,
    whenToUse: "Before writing any database code. Plan your schema first.",
  },
  {
    id: "api-route",
    name: "API Route Pattern",
    description: "Request API endpoints precisely",
    worldId: 3,
    chapter: 3,
    template: `Create a Next.js API route at [path]:

- Method: [GET/POST/PUT/DELETE]
- Auth: [required/optional/none]
- Input: [body/query params with types]
- Logic: [what it does step by step]
- Response: [success shape + error cases]
- Database: [which Prisma queries]`,
    example: `Create a Next.js API route at /api/posts:

- Method: POST
- Auth: required (check session)
- Input: body { title: string, content: string, published?: boolean }
- Logic: validate input → create post with userId from session → return post
- Response: 201 { post } on success, 400 on validation error, 401 if not auth'd
- Database: prisma.post.create with author connection`,
    whenToUse: "When you need API endpoints. Be specific about inputs, outputs, and errors.",
  },
  {
    id: "integration-pattern",
    name: "Integration Pattern",
    description: "Connect frontend to backend",
    worldId: 3,
    chapter: 3,
    template: `Connect [component] to [API endpoint]:

- Fetch: [when to load data — on mount, on action, etc.]
- Loading: [what to show while loading]
- Error: [how to handle errors]
- Success: [what to do with the data]
- Optimistic: [update UI before server confirms?]`,
    example: `Connect PostList component to GET /api/posts:

- Fetch: on component mount using useEffect
- Loading: show skeleton cards (3 placeholder cards)
- Error: show error message with retry button
- Success: render PostCard for each post
- Optimistic: no, wait for server response`,
    whenToUse: "When connecting UI to API. Prevents the 'it works locally' trap.",
  },

  // ── Chapter 4: World 4 — Ship It ──
  {
    id: "error-fix",
    name: "Error Fix Pattern",
    description: "How to describe errors to AI",
    worldId: 4,
    chapter: 4,
    template: `I'm getting this error:

\`\`\`
[paste exact error message]
\`\`\`

Context:
- File: [which file]
- Line: [approximate line number]
- What I was doing: [action that triggered it]
- What I expected: [what should have happened]
- What I already tried: [previous fix attempts]`,
    example: `I'm getting this error:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'map')
\`\`\`

Context:
- File: src/components/PostList.tsx
- Line: around line 15
- What I was doing: loading the posts page
- What I expected: list of posts to render
- What I already tried: checked the API returns data in Postman, it works there`,
    whenToUse: "Every time you hit an error. Never just paste the error alone.",
  },
  {
    id: "debug-pattern",
    name: "Debug Pattern",
    description: "Systematic debugging with AI",
    worldId: 4,
    chapter: 4,
    template: `Something isn't working right:

Expected behavior: [what should happen]
Actual behavior: [what actually happens]

Here's the relevant code:
\`\`\`
[paste code]
\`\`\`

Environment: [browser, Node version, etc.]
Console output: [any logs or errors]`,
    example: `Something isn't working right:

Expected behavior: clicking "Save" should create a new post and redirect to /posts
Actual behavior: clicking "Save" does nothing, no network request in dev tools

Here's the relevant code:
\`\`\`tsx
<form onSubmit={handleSubmit}>
  <button type="button">Save</button>
</form>
\`\`\`

Environment: Chrome 120, Next.js 14
Console output: no errors, no logs`,
    whenToUse: "When something doesn't work but there's no clear error message.",
  },
  {
    id: "performance-pattern",
    name: "Performance Pattern",
    description: "Optimize with specific constraints",
    worldId: 4,
    chapter: 4,
    template: `Optimize [component/page/route] for performance:

Current issue: [what's slow]
Measurement: [load time, bundle size, etc.]
Constraints: [what can't change]

Areas to check:
- [ ] Unnecessary re-renders
- [ ] Large bundle imports
- [ ] Missing caching
- [ ] Unoptimized images/assets
- [ ] N+1 database queries`,
    example: `Optimize the Dashboard page for performance:

Current issue: takes 3 seconds to load, shows blank screen
Measurement: Lighthouse performance score 45
Constraints: must keep all current features

Areas to check:
- [ ] StatCards re-render on every state change
- [ ] Importing entire chart library for one pie chart
- [ ] No caching on /api/stats endpoint
- [ ] Hero image is 2MB PNG
- [ ] Loading all posts then filtering client-side`,
    whenToUse: "When your app feels slow. Always measure before optimizing.",
  },

  // ── Chapter 5: World 5 — Get Paid ──
  {
    id: "landing-page",
    name: "Landing Page Pattern",
    description: "Structure conversion-optimized pages",
    worldId: 5,
    chapter: 5,
    template: `Build a landing page for [product]:

Sections (in order):
1. Hero: [headline, subheadline, CTA]
2. Problem: [pain point you solve]
3. Solution: [how you solve it]
4. Features: [3-5 key features with icons]
5. Social proof: [testimonials/logos/numbers]
6. Pricing: [plans and prices]
7. FAQ: [common questions]
8. Final CTA: [closing push]

Tone: [professional/casual/bold]
Target audience: [who is this for]`,
    example: `Build a landing page for TaskFlow (project management tool):

Sections (in order):
1. Hero: "Ship projects faster" / "The project tool for small teams" / "Start free"
2. Problem: "Spreadsheets and Slack aren't project management"
3. Solution: "One board for tasks, timelines, and team chat"
4. Features: Kanban boards, Time tracking, Team chat, Auto-reports, Integrations
5. Social proof: "Used by 500+ teams" + 3 testimonials
6. Pricing: Free (5 users), Pro $12/user, Team $8/user
7. FAQ: 5 questions about pricing, data, migration
8. Final CTA: "Start your free trial — no credit card needed"

Tone: professional but friendly
Target audience: startup founders and small team leads`,
    whenToUse: "When building any marketing or landing page.",
  },
  {
    id: "payment-pattern",
    name: "Payment Pattern",
    description: "Integrate payments safely",
    worldId: 5,
    chapter: 5,
    template: `Add [payment provider] to [app]:

Requirements:
- Plans: [list plans with prices]
- Checkout: [embedded/redirect/custom]
- Webhooks: [which events to handle]
- User model: [what to store in DB]
- Gating: [what features are behind paywall]

Security:
- Validate webhook signatures
- Never trust client-side plan status
- Handle failed payments gracefully`,
    example: `Add Stripe to my SaaS app:

Requirements:
- Plans: Free (no card), Pro $12/mo, Team $29/mo
- Checkout: Stripe Checkout redirect
- Webhooks: checkout.session.completed, invoice.paid, invoice.payment_failed, customer.subscription.deleted
- User model: add plan (FREE/PRO/TEAM), stripeCustomerId, stripeSubscriptionId
- Gating: Free = 3 projects, Pro = unlimited, Team = unlimited + team features

Security:
- Validate webhook signatures with STRIPE_WEBHOOK_SECRET
- Check plan in API routes, not just UI
- On payment_failed: downgrade after 3 days grace period`,
    whenToUse: "When adding any payment functionality. Get the webhook handling right.",
  },
  {
    id: "feature-planning",
    name: "Feature Planning Pattern",
    description: "Plan features before building",
    worldId: 5,
    chapter: 5,
    template: `Plan the [feature name] feature:

User story: As a [user type], I want to [action] so that [benefit]

Scope (MVP only):
- Must have: [essential items]
- Nice to have: [can add later]
- Out of scope: [explicitly not doing]

Technical:
- New models: [database changes]
- New routes: [API endpoints]
- New components: [UI pieces]
- Integrations: [external services]`,
    example: `Plan the Team Invites feature:

User story: As a team admin, I want to invite people by email so they can join my workspace

Scope (MVP only):
- Must have: send invite email, accept invite link, join workspace
- Nice to have: bulk invite, role selection, invite expiry
- Out of scope: SSO, domain auto-join, invite approval workflow

Technical:
- New models: Invite (email, workspaceId, invitedBy, status, token, expiresAt)
- New routes: POST /api/invites, GET /api/invites/accept?token=
- New components: InviteForm, InviteList, AcceptInvitePage
- Integrations: Resend for invite emails`,
    whenToUse: "Before building any feature. Prevents scope creep and wasted time.",
  },
];

export const TOOLKIT_CHAPTERS: ToolkitChapter[] = [
  {
    id: 1,
    worldId: 1,
    title: "The Basics",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 1),
  },
  {
    id: 2,
    worldId: 2,
    title: "Building UIs",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 2),
  },
  {
    id: 3,
    worldId: 3,
    title: "Full Stack",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 3),
  },
  {
    id: 4,
    worldId: 4,
    title: "Shipping & Debugging",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 4),
  },
  {
    id: 5,
    worldId: 5,
    title: "Monetization",
    patterns: PROMPT_PATTERNS.filter((p) => p.chapter === 5),
  },
];
