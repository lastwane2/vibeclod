import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// WORLD 1 — Zero to Link (L2-L5)
// Build → deploy → fix → git
// ═══════════════════════════════════════

export const WORLD_1_BLOCKS: Block[] = [
  // ─── Level 2: AI Builds It ────────────
  {
    id: "L2B1",
    levelId: 2,
    type: "theory",
    title: "References Change Everything",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# AI With a Reference = 10x Better Output

When you say "build me a to-do app," AI gives you its default: purple gradient, generic layout, boring.

When you say "build me a to-do app, **here's a reference: linear.app** — I like their clean dark theme and card-based layout" — AI builds something that actually looks good.

## How to Use References

1. **Find a site you like** — Notion, Linear, Todoist, Vercel, any SaaS
2. **Copy the URL**
3. **Say what you like about it** — "the colors," "the card layout," "the sidebar navigation," "how clean it feels"

You're not copying their product. You're giving AI a visual direction instead of letting it guess.

**Do this every time you're building something visual.**`,
  },
  {
    id: "L2B2",
    levelId: 2,
    type: "prompt",
    title: "Your First Build Prompt",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    scaffold: "full",
    goal: "Write a prompt that turns your PRD into a working first version with a design reference.",
    referencePrompt: `Here's my app plan:
[paste your PRD]

Design reference: [URL]. I like [what specifically — colors, layout, card style, navigation].

Build the first version. Next.js 14 + Tailwind + shadcn/ui.
No database yet — use hardcoded demo data for now.
Must work on mobile.
Start with the main page and one core feature.`,
    hints: [
      "Always include your PRD — AI needs the full context",
      "Mention a specific site as design reference",
      "Say 'no database yet' — we add that in World 2",
      "One feature first, not everything",
    ],
    passingThreshold: 3,
  },
  {
    id: "L2B3",
    levelId: 2,
    type: "build",
    title: "Build & Push",
    xp: 20,
    required: true,
    order: 3,
    estimatedMinutes: 8,
    mission:
      "Run your prompt in your AI tool. Look at the result in the browser. Does it match what you wanted? If not — iterate. Then: git add, commit, push.",
    githubChecks: {
      minCommits: 1,
      hasPackageJson: true,
    },
    aiReviewPrompt:
      "Check for a working Next.js project: package.json with next dependency, at least one page component, Tailwind CSS configured (tailwind.config). The app should have visible content, not a blank starter template.",
    passingScore: 50,
  },

  // ─── Level 3: It's Online ─────────────
  {
    id: "L3B1",
    levelId: 3,
    type: "theory",
    title: "How Deployment Works",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 1,
    content: `# Push Code → Site Updates. That's It.

Vercel watches your GitHub repo. When you push new code:

1. Vercel sees the push
2. Builds your project (takes 1-2 minutes)
3. Gives you a URL: \`yourproject.vercel.app\`

**Every future push updates your site automatically.** No manual deploys. No FTP. No servers.

If the build fails — Vercel shows you the error in the logs. Copy it, paste to AI, fix, push again.`,
  },
  {
    id: "L3B2",
    levelId: 3,
    type: "experiment",
    title: "Deploy to Vercel",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    description: "Get your app live on the internet with a real URL.",
    steps: [
      {
        id: "connect",
        instruction:
          "Go to vercel.com → 'Add New Project' → select your GitHub repo → click 'Deploy'. Vercel auto-detects Next.js and configures everything.",
        expectedOutcome:
          "Vercel starts building your project. You see a build log.",
      },
      {
        id: "wait",
        instruction:
          "Wait 1-2 minutes for the build. If it fails — click on the deployment → Logs. Copy the error. Paste to AI: 'Vercel build failed: [error]. How to fix?'. Fix, push, Vercel tries again automatically.",
        expectedOutcome:
          "Build succeeds. You see a green checkmark and a preview.",
      },
      {
        id: "share",
        instruction:
          "Copy your URL (yourproject.vercel.app). Open it on your phone. Send it to a friend. This is YOUR site, live on the internet.",
        expectedOutcome: "Your site is accessible to anyone with the link.",
      },
    ],
  },
  {
    id: "L3B3",
    levelId: 3,
    type: "build",
    title: "Verify Deployment",
    xp: 15,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    mission:
      "Your site should be live at a .vercel.app URL. Push a small change, wait 1 min, verify the site updated. Auto-deploy works.",
    githubChecks: {
      hasDeploy: true,
      minCommits: 2,
    },
    aiReviewPrompt:
      "Check that the project has a Vercel deployment. At least 2 commits showing the student pushed code and iterated.",
    passingScore: 50,
  },

  // ─── Level 4: It's Broken ─────────────
  {
    id: "L4B1",
    levelId: 4,
    type: "theory",
    title: "Your Job: Verify & Fix",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# AI Writes Code. You Test It.

This is the most important thing you'll learn:

**AI is not perfect.** It writes code that LOOKS right but has bugs. Buttons that don't work. Pages that break on mobile. Links that go nowhere.

**Your job** is to:
1. **Test everything** — every button, every link, every form
2. **Find what's broken** — on mobile AND desktop
3. **Describe the bug clearly** to AI
4. **Verify the fix** — don't just trust it worked

## Your New Best Friend: Browser Console

Press **F12** (or Cmd+Option+I on Mac) → click **Console**.

Red errors here = something is broken. Copy the error, paste to AI with context.

## The Fix Cycle

\`\`\`
Test → Find bug → Describe to AI → AI fixes → Test again → Repeat
\`\`\`

3-5 rounds of this is **completely normal**. This is not failure — this IS the process.`,
  },
  {
    id: "L4B2",
    levelId: 4,
    type: "prompt",
    title: "How to Report a Bug to AI",
    xp: 10,
    required: true,
    order: 2,
    estimatedMinutes: 3,
    scaffold: "full",
    goal: "Write a clear bug report that AI can act on.",
    referencePrompt: `I have a problem:
[what's broken — be specific]

Error from browser console:
[paste the red error text]

This is on page: [which page/URL]
Expected: [what should happen]
Actually happens: [what actually happens]`,
    hints: [
      "Always include the exact error from the console",
      "Say which page and what action triggers it",
      "Tell AI what SHOULD happen, not just what doesn't work",
    ],
    passingThreshold: 3,
  },
  {
    id: "L4B3",
    levelId: 4,
    type: "experiment",
    title: "Test & Fix Cycle",
    xp: 20,
    required: true,
    order: 3,
    estimatedMinutes: 10,
    description:
      "Test your app thoroughly on mobile, find bugs, fix them with AI.",
    steps: [
      {
        id: "mobile",
        instruction:
          "Open your live URL on your phone (real phone, not emulator). Check: text readable? Buttons tappable? Nothing off-screen? Write down every issue.",
        expectedOutcome: "A list of mobile issues to fix.",
      },
      {
        id: "buttons",
        instruction:
          "Click EVERY button and link in your app. Does each one do something? Any 404s? Any buttons that do nothing?",
        expectedOutcome: "All broken interactions identified.",
      },
      {
        id: "console",
        instruction:
          "Open F12 → Console. Any red errors? Copy each one. Paste to AI with the page and context. Fix each bug, commit, push.",
        expectedOutcome:
          "Console errors fixed. At least 2 bug-fix commits pushed.",
      },
    ],
  },
  {
    id: "L4B4",
    levelId: 4,
    type: "build",
    title: "Everything Works",
    xp: 20,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Push all your fixes. Your app should: work on mobile, have no broken buttons/links, no console errors. At least 3 commits showing iteration.",
    githubChecks: {
      minCommits: 3,
      hasDeploy: true,
    },
    aiReviewPrompt:
      "Check for at least 3 commits showing fix iterations (not one big dump). Look for responsive Tailwind classes. Check for obvious issues: broken links, placeholder text like 'Lorem ipsum', missing pages. The app should feel functional, not broken.",
    passingScore: 60,
  },

  // ─── Level 5: Save Your Work ──────────
  {
    id: "L5B1",
    levelId: 5,
    type: "theory",
    title: "Git = Save Points",
    xp: 5,
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content: `# Three Commands. That's All You Need.

\`\`\`bash
git add .                    # Select what to save
git commit -m "description"  # Save it (local)
git push                     # Upload to GitHub
\`\`\`

Think of it like a game:
- **commit** = save your progress
- **push** = backup to the cloud
- **revert** = load an old save

## When Things Go Wrong

Broke something? Two escape hatches:

\`\`\`bash
git checkout -- .     # Undo all unsaved changes
git revert HEAD       # Undo your last commit
\`\`\`

## The One Rule: .gitignore

The file \`.gitignore\` lists things that should NEVER go to GitHub. Most important:

\`\`\`
.env.local    # Your passwords and API keys
\`\`\`

If \`.env.local\` is NOT in your .gitignore — **add it right now**. Secrets on GitHub = hacked.`,
    miniQuiz: [
      {
        question: "What does 'git push' do?",
        options: [
          "Saves changes locally",
          "Uploads your code to GitHub",
          "Deploys your site",
          "Creates a new branch",
        ],
        correctIndex: 1,
      },
      {
        question: "What should NEVER be committed to GitHub?",
        options: [
          "package.json",
          ".gitignore",
          ".env.local (API keys and secrets)",
          "CLAUDE.md",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "L5B2",
    levelId: 5,
    type: "experiment",
    title: "Practice Git",
    xp: 15,
    required: true,
    order: 2,
    estimatedMinutes: 5,
    description: "Practice breaking things and reverting safely.",
    steps: [
      {
        id: "break",
        instruction:
          "Break something on purpose — delete a file or mess up the CSS. Run 'git diff' to see what changed.",
        expectedOutcome: "You see the changes git diff shows.",
      },
      {
        id: "revert",
        instruction:
          "Run 'git checkout -- .' to undo all changes. Check: everything is back to normal.",
        expectedOutcome: "All changes undone. App works again.",
      },
      {
        id: "gitignore",
        instruction:
          "Open .gitignore. Is '.env.local' or '.env*' in there? If not — add it. This is critical for security.",
        expectedOutcome: ".gitignore includes .env entries.",
      },
    ],
  },
  {
    id: "L5B3",
    levelId: 5,
    type: "prompt",
    title: "Update CLAUDE.md",
    xp: 10,
    required: true,
    order: 3,
    estimatedMinutes: 3,
    scaffold: "template",
    goal: "Update your CLAUDE.md with what you've learned about your project so far.",
    referencePrompt: `Update my CLAUDE.md with what's working and what's not:

## What Works
- [list features that work]

## Known Issues
- [what's still broken or missing]

## Workflow Rules
- Small steps. One feature at a time.
- Commit and push after every change.
- Test on mobile before committing.
- If AI makes wrong changes: describe what's wrong and what you want instead.
- If stuck in error loops: clear context (/clear or new chat), try again.`,
    template: `## What Works
- ___
- ___

## Known Issues
- ___

## Workflow Rules
- Small steps. One feature at a time.
- Commit and push after every change.
- ___`,
    passingThreshold: 3,
  },
  {
    id: "L5B4",
    levelId: 5,
    type: "build",
    title: "Clean Workflow",
    xp: 15,
    required: true,
    order: 4,
    estimatedMinutes: 5,
    mission:
      "Push your updated CLAUDE.md. Make sure .gitignore is correct. Your commit history should show at least 3 descriptive commits (not 'update' or 'fix').",
    githubChecks: {
      minCommits: 3,
      fileExists: ["CLAUDE.md", ".gitignore"],
    },
    aiReviewPrompt:
      "Check: .gitignore exists and includes .env entries. CLAUDE.md has project-specific content (not just a template). At least 3 commits with descriptive messages. The workflow shows iteration: multiple small changes, not one big dump.",
    passingScore: 60,
  },
];
