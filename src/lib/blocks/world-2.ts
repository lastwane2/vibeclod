import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 2 — Real Tools (Levels 6-10)
// Terminal, Node, npm, Git. Scaffold: "full"
// Patterns: Project Setup
// ═══════════════════════════════════════

export const WORLD_2_BLOCKS: Block[] = [
  // ─── Level 6: The Terminal (4 blocks) ───
  {
    id: "L6B1",
    levelId: 6,
    type: "theory",
    title: "Terminal = Text Chat",
    xp: 10,
    required: true,
    order: 1,
    content: `# Terminal = Text Chat With Your Computer

The terminal is just **another way to talk to your computer**. Instead of clicking around with a mouse, you type short commands.

Think of it as **texting your computer** instead of tapping on it.

| Instead of... | You type... |
|---------------|-------------|
| Clicking through folders | \`cd Desktop\` |
| Right-click → New Folder | \`mkdir my-project\` |
| Dragging files to trash | \`rm old-file.txt\` |

Same computer. Same files. Different interface.

## Why Use It?

- **Faster** for dev work — no hunting through menus
- **AI gives you terminal commands** — you need to know where to paste them
- **All professional tools use it** — npm, git, deployment

It looks intimidating at first. Black screen, blinking cursor. But it's just texting. You'll get used to it fast.`,
    miniQuiz: [
      {
        question: "What is the terminal?",
        options: [
          "A special programming language",
          "Another way to talk to your computer — by typing instead of clicking",
          "A website for downloading code",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L6B2",
    levelId: 6,
    type: "theory",
    title: "5 Commands That Matter",
    xp: 10,
    required: true,
    order: 2,
    content: `# 5 Commands That Matter

You don't need 50 commands. You need **5**.

| Command | Plain English | Example |
|---------|--------------|---------|
| \`cd\` | "Go to folder" | \`cd Desktop\` |
| \`ls\` | "What's in here?" | \`ls\` (shows files) |
| \`mkdir\` | "Make a folder" | \`mkdir my-project\` |
| \`touch\` | "Create a file" | \`touch index.html\` |
| \`npm\` | "Manage project stuff" | \`npm install\` |

That's it. **Five commands.** AI will tell you the rest when you need them.

## The Pattern

Most terminal work follows a simple flow:

1. Go somewhere: \`cd my-project\`
2. Look around: \`ls\`
3. Do something: \`mkdir\`, \`touch\`, \`npm install\`
4. Repeat

If you ever get lost, type \`ls\` to see where you are, or \`cd ..\` to go back up one folder.`,
  },
  {
    id: "L6B3",
    levelId: 6,
    type: "experiment",
    title: "Try the Terminal",
    xp: 15,
    required: true,
    order: 3,
    description:
      "Let's use the terminal for real. It's just typing.",
    steps: [
      {
        id: "L6B3S1",
        instruction:
          "Open your terminal. Type `ls` (or `dir` on Windows). What shows up?",
        expectedOutcome:
          "You'll see a list of files and folders in your current directory — the same stuff you'd see in your file explorer.",
        question: "What files and folders did you see?",
      },
      {
        id: "L6B3S2",
        instruction:
          "Navigate to your Desktop: `cd Desktop`. Create a folder: `mkdir my-project`. Go into it: `cd my-project`. Type `ls` — what do you see?",
        expectedOutcome:
          "The folder is empty because you just created it. `ls` shows nothing.",
        question: "What did `ls` show inside your new empty folder?",
      },
    ],
  },
  {
    id: "L6B4",
    levelId: 6,
    type: "quiz",
    title: "Terminal Concepts",
    xp: 15,
    required: true,
    order: 4,
    questions: [
      {
        question: "What does `cd` do?",
        options: [
          "Creates a new file",
          "Changes to a different folder (go to folder)",
          "Copies a directory",
          "Closes the terminal",
        ],
        correctIndex: 1,
        explanation:
          "`cd` stands for 'change directory' — it moves you into a folder.",
      },
      {
        question: "What does `ls` show you?",
        options: [
          "Your computer's settings",
          "The files and folders in your current location",
          "A list of terminal commands",
          "Your internet connection status",
        ],
        correctIndex: 1,
        explanation:
          "`ls` lists the contents of whatever folder you're currently in.",
      },
      {
        question: "Why do developers use the terminal instead of clicking through folders?",
        options: [
          "It looks cooler",
          "It's faster for development tasks and all professional tools use it",
          "Mice are bad for your wrists",
          "You can't use a mouse with code",
        ],
        correctIndex: 1,
        explanation:
          "Terminal is faster for repetitive dev tasks, and tools like npm and git are terminal-based.",
      },
      {
        question: "Can AI help you with terminal commands you don't know?",
        options: [
          "No, you must memorize them all",
          "Yes — just describe what you want to do and AI will give you the command",
          "Only if you're on Mac",
          "Only for basic commands",
        ],
        correctIndex: 1,
        explanation:
          "This is a core vibe coding skill — describe what you need, and AI tells you the command.",
      },
    ],
    passingScore: 3,
  },

  // ─── Level 7: Projects Have Structure (4 blocks) ───
  {
    id: "L7B1",
    levelId: 7,
    type: "theory",
    title: "Beyond Single Files",
    xp: 10,
    required: true,
    order: 1,
    content: `# Beyond Single Files

So far you've been building with single HTML files. That's like living in a tent — it works, but you can't fit much in there.

Real projects are like **houses**:
- **Rooms** (folders) to organize things
- **Plumbing** (dependencies) that make stuff work behind the scenes
- **A blueprint** (package.json) that describes the whole setup

Single file = tent. Structured project = house.

You need a house to build anything serious. And the good news? Setting one up takes about 30 seconds with the right commands.`,
  },
  {
    id: "L7B2",
    levelId: 7,
    type: "theory",
    title: "npm & package.json",
    xp: 10,
    required: true,
    order: 2,
    content: `# npm & package.json

## package.json = Your Project's Shopping List

It says "this project needs React, Tailwind, etc." When someone gets your project, they run \`npm install\` and npm **goes shopping** for everything on the list. Automatic.

## node_modules = The Shopping Bags

When npm installs packages, they land in a folder called \`node_modules\`. It's **huge** — thousands of files, even for small projects.

Key rule: **never upload node_modules to GitHub**.

Why? Because anyone can re-create it by running \`npm install\`. It's like uploading your grocery bags to the cloud when the shopping list is right there.

That's what \`.gitignore\` is for — you add \`node_modules\` to it, and git pretends the folder doesn't exist.`,
    miniQuiz: [
      {
        question: "Why do we put node_modules in .gitignore?",
        options: [
          "It contains passwords and secrets",
          "It's huge and can be re-created anytime with npm install",
          "It makes the website load slower",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L7B3",
    levelId: 7,
    type: "experiment",
    title: "Create a Project",
    xp: 15,
    required: true,
    order: 3,
    description:
      "Watch npm create your project's foundation.",
    steps: [
      {
        id: "L7B3S1",
        instruction:
          "In your project folder, run `npm init -y`. Open the newly created package.json file. What's inside?",
        expectedOutcome:
          "You'll see a JSON file with your project's name, version, and other metadata. This is the blueprint.",
        question: "What fields did you see in package.json?",
      },
      {
        id: "L7B3S2",
        instruction:
          "Run `npm install confetti-js` (or any small package). Now check node_modules — how many folders are in there?",
        expectedOutcome:
          "Even one tiny package pulls in dozens of sub-packages. node_modules gets big fast — that's why we gitignore it.",
        question: "How many folders appeared in node_modules from just one install?",
      },
    ],
  },
  {
    id: "L7B4",
    levelId: 7,
    type: "build",
    title: "Set Up Your Project",
    xp: 30,
    required: true,
    order: 4,
    mission:
      "Create a project with npm. Must have package.json with at least one dependency and .gitignore excluding node_modules.",
    githubChecks: {
      hasPackageJson: true,
      fileExists: [".gitignore"],
      fileContains: [
        { path: ".gitignore", contains: ["node_modules"] },
        { path: "package.json", contains: ["dependencies"] },
      ],
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for a valid package.json with at least one dependency, a .gitignore that excludes node_modules. Project should be initialized properly.",
    passingScore: 50,
  },

  // ─── Level 8: Save Points (4 blocks) ───
  {
    id: "L8B1",
    levelId: 8,
    type: "theory",
    title: "Git = Game Saves",
    xp: 10,
    required: true,
    order: 1,
    content: `# Git = Game Saves

Git is like **save points in a video game**.

Every commit = a save. You can always go back to any previous save. And each save has a description so you know what changed:

- "Added navigation bar"
- "Fixed broken contact link"
- "Styled the hero section"

## Why Use Git?

1. **Undo mistakes** — restore an old save if something breaks
2. **See what changed** — compare any two saves to see the differences
3. **Required for deployment** — services like Vercel and Railway pull your code from GitHub

Without git, one bad edit could destroy hours of work with no way back. With git, you always have a safety net.

## Common Gotcha: .env Files

Your \`.env\` file contains **secrets** — database passwords, API keys, auth tokens. If you commit it to git, anyone who can see your repo can steal your credentials.

**Always** add \`.env\` to your \`.gitignore\` file. Create a \`.env.example\` with placeholder values so others know what variables are needed — but NEVER commit real secrets.`,
    miniQuiz: [
      {
        question: "What should NEVER be committed to git?",
        options: [
          "package.json",
          ".env files containing real API keys and passwords",
          "README.md",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L8B2",
    levelId: 8,
    type: "theory",
    title: "GitHub = Cloud Saves",
    xp: 10,
    required: true,
    order: 2,
    content: `# GitHub = Cloud Saves

**Git** is local — save points on your computer.
**GitHub** is cloud — save points on the internet.

Like the difference between saving to your hard drive vs saving to Google Drive.

## What GitHub Gives You

- **Backup** — your code survives even if your laptop dies
- **Sharing** — other people can see and use your code
- **Deployment** — services pull directly from your GitHub repo to go live
- **Portfolio** — your repo history IS your resume for tech work

Your repo = your portfolio. Every commit shows that you build things.`,
    miniQuiz: [
      {
        question: "What's the difference between git and GitHub?",
        options: [
          "They're the same thing",
          "Git = local saves on your computer, GitHub = cloud backup and sharing",
          "Git is for code, GitHub is for design files",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L8B3",
    levelId: 8,
    type: "experiment",
    title: "Make Some Saves",
    xp: 15,
    required: true,
    order: 3,
    description:
      "Practice the save-point workflow.",
    steps: [
      {
        id: "L8B3S1",
        instruction:
          "Make a change to any file in your project. Run `git status` — what do you see?",
        expectedOutcome:
          "Changed files show up in red. Git knows something is different from the last save.",
        question: "What color were the changed files? What does that mean?",
      },
      {
        id: "L8B3S2",
        instruction:
          "Run `git add .` then `git commit -m \"your description here\"`. Now run `git log` — what do you see?",
        expectedOutcome:
          "Your commit appears in the log with your message, a timestamp, and a unique ID. That's your save point.",
        question: "Can you see your commit message in the log?",
      },
      {
        id: "L8B3S3",
        instruction:
          "Push to GitHub: `git push`. Go to your repo on github.com — is your latest code there?",
        expectedOutcome:
          "Your code is now in the cloud. Anyone with the link can see it, and deployment services can pull from it.",
        question: "Can you see your files and commit message on GitHub?",
      },
    ],
  },
  {
    id: "L8B4",
    levelId: 8,
    type: "quiz",
    title: "Version Control",
    xp: 15,
    required: true,
    order: 4,
    questions: [
      {
        question: "What is a git commit?",
        options: [
          "A promise to finish your project",
          "A save point — a snapshot of your project at a specific moment",
          "A way to delete old code",
          "A message to your team",
        ],
        correctIndex: 1,
        explanation:
          "Each commit saves the state of your entire project, with a message describing what changed.",
      },
      {
        question: "Why is GitHub useful even for solo developers?",
        options: [
          "It's required by law",
          "Cloud backup, deployment integration, and portfolio visibility",
          "It makes code run faster",
          "It replaces the need for a text editor",
        ],
        correctIndex: 1,
        explanation:
          "Even working alone, GitHub gives you backups, easy deployment, and a visible track record of what you build.",
      },
      {
        question: "What does `git push` do?",
        options: [
          "Deletes your local code",
          "Sends your local commits (saves) to GitHub (the cloud)",
          "Downloads code from the internet",
          "Creates a new branch",
        ],
        correctIndex: 1,
        explanation:
          "Push uploads your local save points to GitHub so they're backed up and accessible online.",
      },
      {
        question: "Why should every commit have a descriptive message?",
        options: [
          "Git won't work without one",
          "So you (and others) can understand what changed at each save point",
          "It makes the code run faster",
          "Messages are optional and don't matter",
        ],
        correctIndex: 1,
        explanation:
          "Good commit messages are like labels on your save files — 'Fixed nav bug' is way more useful than 'update'.",
      },
    ],
    passingScore: 3,
  },

  // ─── Level 9: The Full Workflow (4 blocks) ───
  {
    id: "L9B1",
    levelId: 9,
    type: "theory",
    title: "Your Code Cockpit",
    xp: 10,
    required: true,
    order: 1,
    content: `# Your Code Cockpit

Professional developers have **3 windows** open at all times:

1. **IDE** (VS Code / Cursor) — where you write and edit code
2. **Terminal** — where you run commands (npm, git)
3. **AI chat** (Claude / ChatGPT) — where you prompt

That's your cockpit. IDE + Terminal + AI.

## The Workflow

1. **Ask AI** — describe what you want
2. **Copy to IDE** — paste the generated code into your files
3. **Test in browser** — does it work? Does it look right?
4. **If good → commit** — save your progress with git
5. **Push** — upload to GitHub
6. **Repeat**

This is how real products get built. Not in one giant leap, but in small loops: prompt → generate → test → commit → push. Over and over.`,
  },
  {
    id: "L9B2",
    levelId: 9,
    type: "pattern",
    title: "The Project Setup Pattern",
    xp: 15,
    required: true,
    order: 2,
    patternId: "project-setup",
    exercise: {
      goal: "Use the Project Setup Pattern to describe a new project",
      template: `Set up a new project:
- Name: ___
- Tech: ___
- Structure: ___
- Features: ___
- Styling: ___`,
      exampleFilled: `Set up a new project:
- Name: recipe-app
- Tech: HTML, CSS, JavaScript
- Structure: index.html, styles.css, app.js, /images folder
- Features: recipe cards with image and ingredients, search bar that filters recipes, favorites button
- Styling: warm earthy tones, card-based layout, Google Fonts (Poppins), responsive grid`,
    },
  },
  {
    id: "L9B3",
    levelId: 9,
    type: "prompt",
    title: "Write a Setup Prompt",
    xp: 20,
    required: true,
    order: 3,
    scaffold: "full",
    goal: "Write a prompt to scaffold a complete project from scratch",
    referencePrompt:
      "Set up a new recipe app project. Create these files: index.html (main page with recipe grid), styles.css (warm color scheme, card layout, responsive), app.js (search filtering, favorites toggle). Initialize with npm and create a package.json. Add a .gitignore that excludes node_modules. Organize with a clear folder structure: /css, /js, /images. Include a README.md with project name and short description.",
    template:
      "Set up a new ___ project. Create these files: ___ (___), ___ (___), ___ (___). Initialize with npm and create a ___. Add a ___ that excludes ___. Organize with a clear folder structure: ___. Include a ___ with ___.",
    hints: [
      "Name the project and list all files",
      "Describe what each file does",
      "Mention npm and .gitignore",
      "Specify folder organization",
    ],
    passingThreshold: 2.5,
  },
  {
    id: "L9B4",
    levelId: 9,
    type: "experiment",
    title: "The Complete Loop",
    xp: 15,
    required: true,
    order: 4,
    description:
      "Do the full workflow end-to-end.",
    steps: [
      {
        id: "L9B4S1",
        instruction:
          "Open your AI chat and prompt it to create a simple one-page app (tip calculator, color picker, anything small).",
        expectedOutcome:
          "AI generates the code for your mini app.",
        question: "What did you ask AI to build?",
      },
      {
        id: "L9B4S2",
        instruction:
          "Copy the generated code into your IDE. Save the files in your project folder. Open in browser — does it work?",
        expectedOutcome:
          "Your app is running locally in the browser. You might need to fix small issues.",
        question: "Did it work on the first try, or did you need to fix something?",
      },
      {
        id: "L9B4S3",
        instruction:
          "Commit your changes: `git add .` then `git commit -m \"Add [your app name]\"`. Push: `git push`. Check GitHub — is everything there?",
        expectedOutcome:
          "Your code is on GitHub. Anyone can see it. That's the professional workflow, start to finish.",
        question: "Can you see all your files on GitHub?",
      },
    ],
  },

  // ─── Level 10: Setup Boss (3 blocks) ───
  {
    id: "L10B1",
    levelId: 10,
    type: "quiz",
    title: "World 2 Review",
    xp: 30,
    required: true,
    order: 1,
    questions: [
      {
        question: "What does `mkdir my-project` do in the terminal?",
        options: [
          "Deletes a folder called my-project",
          "Creates a new folder called my-project",
          "Opens a folder called my-project",
          "Renames a folder to my-project",
        ],
        correctIndex: 1,
        explanation:
          "mkdir = 'make directory'. It creates a new folder with the name you specify.",
      },
      {
        question: "What is package.json?",
        options: [
          "A file that styles your website",
          "Your project's blueprint — lists its name, dependencies, and scripts",
          "A JavaScript file that runs your app",
          "A git configuration file",
        ],
        correctIndex: 1,
        explanation:
          "package.json is the shopping list for your project. It tells npm what your project needs.",
      },
      {
        question: "What's the difference between git and GitHub?",
        options: [
          "They're the same tool",
          "Git = local save points, GitHub = cloud storage and sharing",
          "Git is free, GitHub is paid",
          "Git is for JavaScript, GitHub is for all languages",
        ],
        correctIndex: 1,
        explanation:
          "Git saves locally on your computer. GitHub stores those saves in the cloud for backup and collaboration.",
      },
      {
        question: "What are the 3 windows in the developer cockpit?",
        options: [
          "Browser, email, Slack",
          "IDE (code editor), Terminal (commands), AI chat (prompting)",
          "GitHub, StackOverflow, Google",
          "HTML file, CSS file, JS file",
        ],
        correctIndex: 1,
        explanation:
          "IDE + Terminal + AI = your cockpit. That's where all the work happens.",
      },
      {
        question: "Why does .gitignore exist?",
        options: [
          "To hide your code from hackers",
          "To tell git which files to ignore — like node_modules that can be re-created",
          "To speed up your website",
          "To encrypt sensitive files",
        ],
        correctIndex: 1,
        explanation:
          ".gitignore prevents huge or regenerable folders (like node_modules) from cluttering your repo.",
      },
    ],
    passingScore: 3,
  },
  {
    id: "L10B2",
    levelId: 10,
    type: "prompt",
    title: "Design Your Project",
    xp: 30,
    required: true,
    order: 2,
    scaffold: "full",
    goal: "Write a comprehensive project setup prompt with npm, git, and proper structure",
    referencePrompt:
      "Set up a complete project from scratch for a personal bookshelf app. Initialize with npm (package.json with name, description, and at least 2 dependencies). Create a clear folder structure: /src for source files (index.html, styles.css, app.js), /assets for images. Add a .gitignore excluding node_modules, .env, and dist. Create a README.md with project name, description, and setup instructions. Initialize git, make an initial commit. The app should display a grid of book cards with title, author, and cover image — styled with a warm color palette and responsive layout.",
    template:
      "Set up a complete project from scratch for a ___. Initialize with npm (package.json with ___). Create a folder structure: ___. Add a .gitignore excluding ___. Create a README.md with ___. Initialize git. The app should ___.",
    hints: [
      "Name the app and its purpose",
      "Specify the folder structure",
      "List what .gitignore should exclude",
      "Describe the app's main feature",
    ],
    passingThreshold: 3.0,
  },
  {
    id: "L10B3",
    levelId: 10,
    type: "build",
    title: "Ship Your Setup",
    xp: 200,
    required: true,
    order: 3,
    mission:
      "Set up a complete project from scratch: npm, git, organized folders, README, .gitignore, at least 5 meaningful commits.\n\nSuggested project: TaskFlow with npm, git, organized folders",
    githubChecks: {
      hasPackageJson: true,
      fileExists: [".gitignore", "README.md"],
      minCommits: 5,
      minFiles: 8,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level — be thorough. Check for: package.json with dependencies, .gitignore excluding node_modules, README with project description, organized folder structure, at least 5 meaningful commits with descriptive messages, actual app content (not just boilerplate).",
    passingScore: 60,
  },
];
