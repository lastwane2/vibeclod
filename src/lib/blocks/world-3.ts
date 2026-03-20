import type { Block } from "@/types/blocks";

// ═══════════════════════════════════════
// World 3 — Give It Memory (Levels 8-11)
// Supabase database, CRUD, states
// ═══════════════════════════════════════

export const WORLD_3_BLOCKS: Block[] = [
  // ─── Level 8: Your App Needs a Brain (4 blocks) ───
  {
    id: "L8B1",
    levelId: 8,
    type: "theory",
    title: "What is a Database?",
    xp: 10,
    required: true,
    order: 1,
    content: `# Your App Needs a Brain

Right now your app is like a whiteboard. Write something, close the browser, it's gone. Refresh the page — gone.

A **database** is permanent memory. Data stays even when:
- The user closes the browser
- The server restarts
- You deploy a new version

## Supabase — Your Free Database

You don't need to set up a server. **Supabase** gives you:

- **PostgreSQL database** — the industry standard, free tier is generous
- **Visual dashboard** — create tables by clicking, not writing SQL
- **Auto-generated API** — your app talks to the database through simple function calls
- **Built-in auth** — sign up/sign in (we'll use this in World 4)
- **Free tier** — enough for your first 50,000 users

This is what 90% of indie SaaS founders use in 2026. It's the default for a reason.

## What is Data Modeling?

Before you create tables, think about your **entities** — the things your app deals with.

For a project management tool:
- **Users** — people who sign in
- **Projects** — collections of tasks
- **Tasks** — individual to-do items

Each entity becomes a **table**. Connections between them become **relationships**.

Users → have many → Projects → have many → Tasks

Think about this on paper (or Excalidraw) BEFORE asking AI to create anything.`,
    miniQuiz: [
      {
        question: "Why does your app need a database?",
        options: [
          "To make the app load faster",
          "To permanently store data — so it survives browser refreshes and server restarts",
          "To add animations to the UI",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L8B2",
    levelId: 8,
    type: "theory",
    title: "Think About Data First",
    xp: 10,
    required: true,
    order: 2,
    content: `# Think About Data First

The second biggest mistake (after no PRD): jumping straight to UI without thinking about data.

## Entities = Things in Your App

Ask yourself: what "things" does my app deal with?

| App Type | Entities |
|---|---|
| Task manager | Users, Projects, Tasks, Comments |
| SaaS invoicing | Users, Clients, Invoices, LineItems |
| Booking system | Users, Services, Appointments, Reviews |

## Relationships = Connections

How do these things connect?

- A **User** has many **Projects**
- A **Project** has many **Tasks**
- A **Task** belongs to one **Project** and one **User** (assignee)

## Fields = Details About Each Thing

Each entity has fields (columns):

**Tasks table:**
| Field | Type | Notes |
|---|---|---|
| id | uuid | Auto-generated unique ID |
| title | text | The task name |
| description | text | Optional details |
| completed | boolean | Done or not |
| project_id | uuid | Which project this belongs to |
| user_id | uuid | Who created this |
| created_at | timestamp | When it was created |

## The Rule

**Design your data BEFORE writing any code.** Changes to your database later are painful — much harder than changing UI.`,
    miniQuiz: [
      {
        question: "When should you design your database tables?",
        options: [
          "After the UI is built",
          "Before writing any code — data design comes first",
          "Only when you run out of local storage",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L8B3",
    levelId: 8,
    type: "pattern",
    title: "The Data Schema Pattern",
    xp: 15,
    required: true,
    order: 3,
    patternId: "data-schema",
    exercise: {
      goal: "Design the database schema for your SaaS — tables, fields, and relationships",
      template: `Database for [my app]:

Tables:
- [Table1]: [field1, field2, ...]
- [Table2]: [field1, field2, ...]

Relationships:
- [Table1] has many [Table2]
- ___

Rules:
- Every table has: id, created_at
- ___`,
      exampleFilled: `Database for FocusFlow:

Tables:
- users: id, email, name, avatar_url, plan (free/pro)
- teams: id, name, owner_id
- focus_sessions: id, user_id, team_id, started_at, duration_minutes, completed

Relationships:
- A user has many focus_sessions
- A team has many users (through team_members join table)
- A focus_session belongs to one user and one team

Rules:
- Every table has: id (uuid), created_at (timestamp)
- Focus sessions must be 1-60 minutes
- A free user can only be in 1 team`,
    },
  },
  {
    id: "L8B4",
    levelId: 8,
    type: "experiment",
    title: "Set Up Supabase",
    xp: 15,
    required: true,
    order: 4,
    description: "Create a Supabase project and your first tables.",
    steps: [
      {
        id: "L8B4S1",
        instruction:
          "Go to **supabase.com** and sign up with your GitHub account. Click **New Project**. Give it a name and pick a region close to you. Set a database password (save it somewhere!).",
        expectedOutcome:
          "Your Supabase project is created. You see the project dashboard.",
        question: "Can you see your Supabase project dashboard?",
      },
      {
        id: "L8B4S2",
        instruction:
          "Go to **Table Editor** in the left sidebar. Create your first table based on the schema you designed. Use the visual editor — no SQL needed.\n\nFor each table:\n- Click **New Table**\n- Add columns with the right types (text, boolean, uuid, timestamptz)\n- Enable **Row Level Security** (RLS) — we'll configure it in World 4",
        expectedOutcome:
          "Your tables exist in Supabase. You can see them in the Table Editor.",
        question: "How many tables did you create?",
      },
      {
        id: "L8B4S3",
        instruction:
          "Go to **Settings → API** in Supabase. Copy your **Project URL** and **anon public key**.\n\nCreate a `.env.local` file in your project:\n\n```\nNEXT_PUBLIC_SUPABASE_URL=your-project-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n```\n\nMake sure `.env.local` is in your `.gitignore`!",
        expectedOutcome:
          "Your app can now connect to Supabase using environment variables.",
        question: "Is .env.local in your .gitignore?",
      },
    ],
  },

  // ─── Level 9: The Only 4 Things (4 blocks) ───
  {
    id: "L9B1",
    levelId: 9,
    type: "theory",
    title: "CRUD — The Only 4 Things",
    xp: 10,
    required: true,
    order: 1,
    content: `# CRUD — Every Feature is One of Four Things

Every feature in every app ever built does one of these:

| Operation | What it does | Example |
|---|---|---|
| **C**reate | Add new data | "New Task" button, sign-up form |
| **R**ead | Show existing data | Task list, user profile, dashboard |
| **U**pdate | Change existing data | Edit task, mark as done, update settings |
| **D**elete | Remove data | Delete task, remove team member |

That's it. CRUD. Every app is just these four things in different combinations.

## Supabase Makes CRUD Simple

\`\`\`javascript
// CREATE — insert a new row
const { data } = await supabase
  .from('tasks')
  .insert({ title: 'Buy milk', user_id: userId })

// READ — get rows
const { data } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', userId)

// UPDATE — change a row
const { data } = await supabase
  .from('tasks')
  .update({ completed: true })
  .eq('id', taskId)

// DELETE — remove a row
await supabase
  .from('tasks')
  .delete()
  .eq('id', taskId)
\`\`\`

You don't need to memorize this. AI writes these queries. But knowing that every feature is CRUD helps you **describe what you want** clearly:

- "I need a form that **creates** a new project" ← AI knows exactly what to build
- "The dashboard should **read** all tasks for the current user" ← clear intent
- "Clicking the checkbox should **update** the task's completed status" ← specific action`,
    miniQuiz: [
      {
        question: "Marking a task as 'done' is which CRUD operation?",
        options: [
          "Create — you're creating a 'done' status",
          "Update — you're changing an existing task's status",
          "Delete — you're removing it from the list",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L9B2",
    levelId: 9,
    type: "prompt",
    title: "Connect Your App to Supabase",
    xp: 20,
    required: true,
    order: 2,
    scaffold: "template",
    goal: "Write a prompt to connect your app to Supabase and implement CRUD for your main entity.",
    referencePrompt: `Connect my Next.js app to Supabase and add CRUD for the tasks table.

My Supabase tables:
- tasks: id (uuid), title (text), description (text), completed (boolean), user_id (uuid), created_at (timestamptz)

What I need:
1. Install @supabase/supabase-js
2. Create lib/supabase.ts with the client (using env vars from .env.local)
3. A page that shows all tasks (READ)
4. A form to add new tasks (CREATE)
5. A checkbox to mark tasks as done (UPDATE)
6. A delete button on each task (DELETE)

Use the NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from my .env.local.`,
    template: `Connect my Next.js app to Supabase and add CRUD for the ___ table.

My Supabase tables:
- ___: [fields]

What I need:
1. Install @supabase/supabase-js
2. Create lib/supabase.ts with the client
3. A page that shows all ___ (READ)
4. A form to add new ___ (CREATE)
5. ___ (UPDATE)
6. A delete button (DELETE)`,
    passingThreshold: 2.5,
  },
  {
    id: "L9B3",
    levelId: 9,
    type: "build",
    title: "Save Real Data",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Connect your app to Supabase. Users can create, view, edit, and delete data. Real data from the database, not hardcoded.",
    githubChecks: {
      minCommits: 3,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for Supabase integration with real CRUD operations. Data should come from Supabase, not be hardcoded. Should have: create (form/button), read (list/display), update (edit/toggle), and delete (remove button).",
    passingScore: 55,
  },
  {
    id: "L9B4",
    levelId: 9,
    type: "experiment",
    title: "Test Your CRUD",
    xp: 15,
    required: true,
    order: 4,
    description: "Verify all four CRUD operations work end-to-end.",
    steps: [
      {
        id: "L9B4S1",
        instruction:
          "**Create:** Add 3 items using your form. Check the Supabase Table Editor — are they there?",
        expectedOutcome: "All 3 items appear both in your app and in the Supabase dashboard.",
        question: "Do items appear in both your app and Supabase?",
      },
      {
        id: "L9B4S2",
        instruction:
          "**Update:** Edit one item (change text, toggle status, etc). Refresh the page. Is the change still there?",
        expectedOutcome: "The update persists after refresh — it's saved in the database.",
        question: "Does the update survive a page refresh?",
      },
      {
        id: "L9B4S3",
        instruction:
          "**Delete:** Delete one item. Refresh. Is it gone? Check Supabase — is it gone there too?",
        expectedOutcome: "The item is permanently deleted from both your app and the database.",
        question: "Is the deleted item gone from both app and database?",
      },
    ],
  },

  // ─── Level 10: Handle Everything (4 blocks) ───
  {
    id: "L10B1",
    levelId: 10,
    type: "theory",
    title: "The Three States",
    xp: 10,
    required: true,
    order: 1,
    content: `# Loading, Success, Error — Always Handle All Three

Every time your app fetches data, there are three possible outcomes:

1. **Loading** — data is on the way (show a spinner or skeleton)
2. **Success** — data arrived (show it)
3. **Error** — something broke (show a helpful message)

AI almost always forgets states 1 and 3. It builds the happy path (data is there) and ignores everything else.

## What Users See Without Proper States

| State | Without handling | With handling |
|---|---|---|
| Loading | Blank white screen for 2 seconds | Skeleton animation or spinner |
| Error | App crashes or shows nothing | "Something went wrong. Try again." |
| Empty | Blank page, user confused | "No tasks yet. Create your first one!" |

## The Empty State — The Forgotten Fourth

What does a **brand new user** see? They have no data. If you show a blank table, they'll think the app is broken.

Good empty states:
- "No projects yet. Click 'New Project' to get started!"
- An illustration + CTA button
- A quick tutorial or example

## The Rule

Every component that fetches data needs ALL of these:
\`\`\`
if (loading) return <Skeleton />
if (error) return <ErrorMessage />
if (data.length === 0) return <EmptyState />
return <DataList data={data} />
\`\`\`

Ask AI: "Make sure to handle loading, error, and empty states." Say this in EVERY prompt that involves data.`,
    miniQuiz: [
      {
        question: "What three states must every data-fetching component handle?",
        options: [
          "Open, closed, and minimized",
          "Loading, success (with data), and error",
          "Light mode, dark mode, and auto",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "L10B2",
    levelId: 10,
    type: "debug",
    title: "Fix Missing States",
    xp: 20,
    required: true,
    order: 2,
    scenarios: [
      {
        id: "L10B2S1",
        title: "No loading state",
        description:
          "The task list shows a blank screen for 1-2 seconds while data loads. Users think the app is broken.",
        brokenCode: `export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    supabase.from('tasks').select('*').then(({ data }) => {
      setTasks(data || []);
    });
  }, []);

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}`,
        language: "tsx",
        hint: "Add a loading state (useState for isLoading) and show a spinner or skeleton while data is being fetched.",
        expectedFix:
          "Should have isLoading state set to true initially, show a loading indicator while fetching, and set to false when data arrives.",
      },
      {
        id: "L10B2S2",
        title: "No error handling",
        description:
          "If the Supabase query fails (network issue, wrong table name), the app shows nothing. No error message, no way to retry.",
        brokenCode: `useEffect(() => {
    supabase.from('tasks').select('*').then(({ data }) => {
      setTasks(data || []);
    });
  }, []);`,
        language: "tsx",
        hint: "Check for the error in the Supabase response: const { data, error } = await supabase... If error, show a message to the user.",
        expectedFix:
          "Should destructure { data, error } from Supabase response. If error, set an error state and display a user-friendly message with a retry option.",
      },
    ],
    passingCount: 2,
  },
  {
    id: "L10B3",
    levelId: 10,
    type: "build",
    title: "Bulletproof Data",
    xp: 40,
    required: true,
    order: 3,
    mission:
      "Add loading indicators, error messages, and empty states to ALL data-fetching features. A new user should see helpful guidance, not a blank page.",
    githubChecks: {
      minCommits: 2,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Check for loading states (spinner/skeleton), error handling (user-friendly messages with retry), and empty states (helpful guidance for new users). No blank screens, no raw error dumps.",
    passingScore: 55,
  },
  {
    id: "L10B4",
    levelId: 10,
    type: "experiment",
    title: "Break It On Purpose",
    xp: 15,
    required: true,
    order: 4,
    description: "Test your error handling by intentionally breaking things.",
    steps: [
      {
        id: "L10B4S1",
        instruction:
          "**Test empty state:** Delete ALL data from your Supabase table (or create a new user). Open your app. Do you see helpful guidance, or a blank page?",
        expectedOutcome: "The app shows an empty state with clear instructions on what to do next.",
        question: "What does your app show when there's no data?",
      },
      {
        id: "L10B4S2",
        instruction:
          "**Test error state:** Temporarily change your Supabase URL to something wrong in .env.local. Reload the app. Does it show an error message, or just crash?",
        expectedOutcome: "The app shows a user-friendly error message, not a crash or blank screen.",
        question: "Does the app show a helpful error message?",
      },
    ],
  },

  // ─── Level 11: Data Boss (3 blocks) ───
  {
    id: "L11B1",
    levelId: 11,
    type: "review",
    title: "Spot Data Problems",
    xp: 20,
    required: true,
    order: 1,
    code: `import { supabase } from "@/lib/supabase";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const { data } = await supabase.from("projects").select("*");
    setProjects(data);
  }

  async function createProject(name) {
    await supabase.from("projects").insert({ name: name });
    loadProjects();
  }

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        createProject(e.target.name.value);
      }}>
        <input name="name" placeholder="Project name" />
        <button>Create</button>
      </form>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
    language: "tsx",
    description:
      "This component loads and creates projects. It works in the happy path but has several data handling issues.",
    knownIssues: [
      {
        id: "no-loading-state",
        lineRange: [5, 5],
        description:
          "No loading state — the list will be empty/flash before data arrives. Should show a skeleton or spinner.",
        severity: "warning",
      },
      {
        id: "no-error-handling",
        lineRange: [11, 11],
        description:
          "Error from Supabase is ignored — `{ data }` without checking `error`. If the query fails, data will be null and the app crashes.",
        severity: "critical",
      },
      {
        id: "no-empty-state",
        lineRange: [28, 28],
        description:
          "If there are no projects, the user sees an empty <ul> — no guidance on what to do next.",
        severity: "warning",
      },
      {
        id: "no-input-validation",
        lineRange: [23, 23],
        description:
          "No validation on the input — user can create a project with an empty name.",
        severity: "warning",
      },
    ],
    minIssuesFound: 3,
  },
  {
    id: "L11B2",
    levelId: 11,
    type: "audit",
    title: "Data Layer Checklist",
    xp: 25,
    required: true,
    order: 2,
    description: "Audit your app's data handling against these 5 requirements.",
    checklist: [
      {
        id: "loading-states",
        category: "ux",
        title: "Loading States",
        description: "Every data-fetching component shows a loading indicator (spinner, skeleton) while data is being fetched.",
        severity: "critical",
        howToCheck: "Throttle your network to Slow 3G in DevTools, reload each page. Do you see a loading state or a blank screen?",
      },
      {
        id: "error-handling",
        category: "ux",
        title: "Error Handling",
        description: "Every data fetch checks for errors and shows a user-friendly message with a retry option.",
        severity: "critical",
        howToCheck: "Temporarily break your Supabase URL. Does each page show an error message, or crash?",
      },
      {
        id: "empty-states",
        category: "ux",
        title: "Empty States",
        description: "Every list/table shows helpful guidance when there's no data — not a blank space.",
        severity: "warning",
        howToCheck: "Delete all data from your tables. Does each page guide the user on what to do next?",
      },
      {
        id: "input-validation",
        category: "code-quality",
        title: "Input Validation",
        description: "All forms validate input before submitting — no empty required fields, no invalid formats.",
        severity: "warning",
        howToCheck: "Try submitting every form with empty fields. Does it prevent submission and show an error?",
      },
      {
        id: "data-persistence",
        category: "ux",
        title: "Data Persistence",
        description: "All CRUD operations actually save to the database. Data survives page refresh.",
        severity: "critical",
        howToCheck: "Create, update, and delete items. Refresh the page after each. Are changes persisted?",
      },
    ],
    minPassed: 4,
  },
  {
    id: "L11B3",
    levelId: 11,
    type: "build",
    title: "Ship Your App with Real Data",
    xp: 150,
    required: true,
    order: 3,
    mission:
      "Boss level: app with Supabase CRUD, all states handled (loading/error/empty), input validation, deployed to Vercel.",
    githubChecks: {
      minCommits: 5,
      minFiles: 5,
      commitAfter: "level_start",
    },
    aiReviewPrompt:
      "Boss level. Check for: Supabase integration with real CRUD operations, loading states (spinner/skeleton), error handling (user-friendly messages), empty states (guidance for new users), input validation on forms. No hardcoded data. App should feel solid and complete.",
    passingScore: 60,
  },
];
