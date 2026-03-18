import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 0 — Setup (Level 0)
// GitHub, Claude Code, repo connection
// Must complete before World 1
// ═══════════════════════════════════════

export const WORLD_0_BLOCKS: Block[] = [
  // ─── Level 0: Get Ready (5 blocks) ───
  {
    id: "L0B1",
    levelId: 0,
    type: "theory",
    title: "Your Toolkit",
    xp: 5,
    required: true,
    order: 1,
    content: `# Your Toolkit

Before you build anything, you need three things. All free.

## 1. GitHub Account

GitHub is where your code lives online. Every project you build in this course gets pushed to your GitHub — it becomes your portfolio.

If you don't have an account: go to **github.com** and sign up. Use a real name — recruiters and clients will see this.

## 2. AI Coding Tool

You need a tool where AI writes code for you. We recommend **Claude Code** — it runs in your terminal, writes files directly, and pushes to GitHub automatically.

Other options that work: **Cursor**, **Windsurf**, **ChatGPT + copy/paste**. Any AI that can write code works. Claude Code is just the fastest because it edits your files directly.

## 3. A Browser

Chrome or any browser with DevTools (F12). You'll use this to test everything you build.

That's it. **GitHub + AI tool + browser.** Let's set them up.`,
    miniQuiz: [
      {
        question: "What three things do you need to start vibe coding?",
        options: [
          "Photoshop, a server, and a domain name",
          "GitHub account, an AI coding tool, and a browser",
          "A computer science degree, 3 monitors, and a mechanical keyboard",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L0B2",
    levelId: 0,
    type: "experiment",
    title: "Create Your GitHub Repository",
    xp: 10,
    required: true,
    order: 2,
    description:
      "Create the repository where all your vibeclod projects will live.",
    steps: [
      {
        id: "L0B2S1",
        instruction:
          "Go to **github.com**. If you don't have an account, click **Sign up** and create one. If you already have one, sign in.\n\n![GitHub signup](/images/setup/github-new-repo.png)",
        expectedOutcome:
          "You're logged into GitHub and can see your dashboard.",
        question: "Are you logged into GitHub?",
      },
      {
        id: "L0B2S2",
        instruction:
          "Click the **+** button in the top-right corner → **New repository**.\n\nFill in:\n- **Repository name:** `vibeclod-projects` (or any name you like)\n- **Description:** \"My vibe coding projects\"\n- **Visibility:** Public (so vibeclod can verify your code)\n- Click **Create repository**\n\n![Create repo form](/images/setup/github-create-form.png)",
        expectedOutcome:
          "GitHub creates your repo and shows you the empty repository page.",
        question: "What did you name your repository?",
      },
      {
        id: "L0B2S3",
        instruction:
          "On the new repo page, you'll see a URL like `https://github.com/yourname/vibeclod-projects`. This is your repo's address.\n\nNow **clone it** to your computer. Open a terminal and run:\n\n```\ngit clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git\ncd YOUR-REPO-NAME\n```\n\n![Repo URL](/images/setup/github-repo-url.png)",
        expectedOutcome:
          "You have a folder on your computer linked to your GitHub repo. Running `git status` shows you're on the main branch.",
        question: "Did `git clone` work? Can you see the folder on your computer?",
      },
    ],
  },
  {
    id: "L0B3",
    levelId: 0,
    type: "experiment",
    title: "Connect Repo to vibeclod",
    xp: 10,
    required: true,
    order: 3,
    description:
      "Link your GitHub repo so vibeclod can verify your code submissions.",
    steps: [
      {
        id: "L0B3S1",
        instruction:
          "In vibeclod, click your **profile picture** in the top-right corner → **Settings**.",
        expectedOutcome:
          "You see the Settings page with a 'Connected Repository' section.",
        question: "Can you see the Settings page?",
      },
      {
        id: "L0B3S2",
        instruction:
          "In the **Connected Repository** section, click the dropdown. You'll see a list of your GitHub repos. Select the one you just created (e.g., `vibeclod-projects`).\n\nClick **Save**.",
        expectedOutcome:
          "The page confirms your repo is connected. You'll see a green checkmark and your repo name.",
        question: "Does it show your repo name with a green checkmark?",
      },
      {
        id: "L0B3S3",
        instruction:
          "Go back to the **Dashboard** (click the logo or 'My Path' in the menu). You should see a banner at the top showing your connected repo instead of 'No repository connected'.",
        expectedOutcome:
          "The dashboard shows your connected repository. You're ready to start building.",
        question: "Is your repo showing on the dashboard?",
      },
    ],
  },
  {
    id: "L0B4",
    levelId: 0,
    type: "theory",
    title: "Set Up Claude Code",
    xp: 5,
    required: true,
    order: 4,
    content: `# Set Up Your AI Coding Tool

You need a tool where AI writes code for you. We recommend **Claude Code** — it runs in your terminal, writes files directly, and pushes to GitHub automatically.

## Claude Code

Follow the official setup guide: **[docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview)**

Once installed, start it inside your project folder:

\`\`\`
cd your-repo-folder
claude
\`\`\`

## Make It Push Automatically

Create a file called **CLAUDE.md** in your project root. This tells Claude Code how to behave:

\`\`\`
# Project Rules

- After making changes, always commit and push to GitHub
- Use descriptive commit messages
- Keep code clean and simple
\`\`\`

Now every time Claude Code makes changes, it will commit and push for you.

## Using a Different Tool?

**Cursor**, **Windsurf**, or any other AI coding tool works too. You'll just need to commit and push manually:

\`\`\`
git add .
git commit -m "describe what changed"
git push
\`\`\`

The important thing is: **your code ends up on GitHub**. That's how vibeclod verifies your work.`,
    miniQuiz: [
      {
        question: "What does CLAUDE.md do?",
        options: [
          "It's a secret file that gives you extra XP",
          "It tells Claude Code how to behave — like always pushing to GitHub after changes",
          "It replaces the need for a GitHub account",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L0B5",
    levelId: 0,
    type: "experiment",
    title: "Test Your Setup",
    xp: 10,
    required: true,
    order: 5,
    description:
      "Verify everything works end-to-end before starting World 1.",
    steps: [
      {
        id: "L0B5S1",
        instruction:
          "Open your terminal in your project folder. If you're using Claude Code, type `claude` and then ask it:\n\n**\"Create a file called hello.txt with the text 'vibeclod setup complete'\"**\n\nIf you're using another tool, create the file manually and save it.",
        expectedOutcome:
          "A file called hello.txt appears in your project folder.",
        question: "Is hello.txt in your project folder?",
      },
      {
        id: "L0B5S2",
        instruction:
          "Push the file to GitHub. If Claude Code has CLAUDE.md set up, it already pushed. Otherwise run:\n\n```\ngit add .\ngit commit -m \"setup complete\"\ngit push\n```\n\nNow go to your repo on **github.com** and check — is hello.txt there?",
        expectedOutcome:
          "hello.txt shows up on GitHub. Your local folder → GitHub pipeline works.",
        question: "Can you see hello.txt on GitHub?",
      },
      {
        id: "L0B5S3",
        instruction:
          "Clean up: delete hello.txt and push again.\n\n```\nrm hello.txt\ngit add .\ngit commit -m \"clean slate for level 1\"\ngit push\n```\n\nYour repo is now empty and ready for your first real project in Level 1.",
        expectedOutcome:
          "Your repo is clean. The full loop works: create → push → verify → clean. You're ready.",
        question: "Is your repo clean and ready for Level 1?",
      },
    ],
  },
];
