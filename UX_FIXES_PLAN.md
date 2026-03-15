# Vibeclod UX Fixes Plan

16 issues to fix, ordered by priority. Each one has context, what to do, and which files to touch.

---

## CRITICAL

### 1. No onboarding after login
**Problem:** User logs in → lands on dashboard → has no idea what to do. No welcome, no explanation.
**Fix:** Welcome modal on first login:
- "Welcome to Vibeclod! You'll learn to build real apps with AI."
- Quick 3-step explanation: Learn concepts → Write prompts → Push code
- "Start Level 1" CTA button
- Set `hasSeenOnboarding` flag in DB or localStorage so it only shows once

**Files:**
- `src/components/onboarding/WelcomeModal.tsx` — CREATE
- `src/app/(dashboard)/dashboard/DashboardClient.tsx` — add modal trigger
- `prisma/schema.prisma` — optional: add `hasSeenOnboarding` to User model (or use localStorage)

---

### 2. "Connect a repository" — unclear for non-tech users
**Problem:** After first login user sees "Connect a repository" — non-tech people don't know what a repository is or why they need one.
**Fix:**
- Rename to "Connect your project" or "Set up your workspace"
- Add explanation: "This is where your code will live. Think of it as a folder in the cloud."
- Step-by-step wizard with screenshots/illustrations:
  1. Create GitHub account (if needed) — link to signup
  2. Create a new repository (with exact steps)
  3. Paste the repo URL
- Consider: auto-create repo via GitHub API for zero-friction setup

**Files:**
- `src/app/(dashboard)/dashboard/DashboardClient.tsx` — update copy
- `src/components/repo/RepoSetupWizard.tsx` — CREATE (step-by-step guide)
- Possibly `src/app/api/github/create-repo/route.ts` — CREATE (auto-create)

---

### 3. Paywall too early (after 5 free levels)
**Problem:** Only 5 free levels = user barely understands vibe coding before hitting paywall. Not enough value demonstrated.
**Fix:**
- Expand free tier to World 1 + World 2 = **10 free levels**
- User completes "Hello, Vibe" (5 levels) + "Real Tools" (5 levels) before paywall
- By level 10 they've: written prompts, used terminal, pushed to GitHub — enough to see value
- Update paywall messaging: "You've built X projects! Unlock 30 more levels..."

**Files:**
- `src/lib/levels.ts` — change `requiredPlan` for World 2 from "pro" to "free"
- `src/app/(marketing)/page.tsx` — update pricing copy ("10 free levels", "30 pro levels")
- `src/app/(dashboard)/settings/SettingsClient.tsx` — update free tier description
- `src/components/paywall/PaywallModal.tsx` — update copy if exists

---

### 4. Build block without repo = dead end
**Problem:** User reaches a build block but hasn't connected a repo → stuck with no guidance.
**Fix:**
- Before build block starts, check if repo is connected
- If not: show inline prompt "You need a project to push code to" with link to repo setup
- Don't lock the entire level — let user complete non-build blocks first
- Show repo setup as a prerequisite card, not an error

**Files:**
- `src/components/blocks/BuildBlock.tsx` — add repo check before rendering
- `src/app/(dashboard)/level/[id]/LevelDetailClient.tsx` — handle missing repo state

---

## SERIOUS

### 5. Verify takes 5-15 seconds with fake delay
**Problem:** Verification has artificial delay (setTimeout). Users wait for nothing. Feels broken.
**Fix:**
- Remove all artificial delays
- Show real-time progress: "Checking GitHub..." → "Reviewing code..." → "Done!"
- Use streaming or polling to show actual progress steps
- If verification is genuinely fast (<1s), just show result immediately

**Files:**
- `src/app/api/levels/[id]/verify/route.ts` — remove setTimeout/delays
- `src/components/blocks/BuildBlock.tsx` — add real progress steps
- `src/lib/block-verification.ts` — ensure no artificial delays

---

### 6. Verify failure — unclear what's wrong
**Problem:** Verification fails → user sees generic "try again" message. No idea what to fix.
**Fix:**
- Show specific checklist of what was checked and what failed:
  - [x] Repository connected
  - [x] Code pushed
  - [ ] Missing file: `index.html` ← **this is the problem**
  - [ ] File should contain: `<h1>` tag
- For AI review failures: show the specific feedback, not just "needs improvement"
- Add "Common issues" expandable section with tips

**Files:**
- `src/app/api/levels/[id]/verify/route.ts` — return structured failure reasons
- `src/components/blocks/BuildBlock.tsx` — render checklist UI
- `src/lib/block-verification.ts` — return detailed check results

---

### 7. Prompt block feedback too abstract
**Problem:** User writes a prompt → gets scores like "Specificity: 3/5" → doesn't understand what to improve.
**Fix:**
- Show side-by-side diff: user's prompt vs reference prompt
- Highlight what's missing with annotations: "You didn't specify the color scheme"
- Show concrete improvement suggestions, not just scores
- "Your prompt" | "Better version" columns with highlighted differences

**Files:**
- `src/components/blocks/PromptBlock.tsx` — add diff view
- `src/components/blocks/PromptDiff.tsx` — CREATE (annotated diff component)
- `src/lib/prompt-evaluation.ts` — return specific missing elements, not just scores

---

### 8. Quiz block — no hints before answering
**Problem:** User gets quiz question → picks wrong answer → sees "Wrong" → no learning happens.
**Fix:**
- After wrong answer: show explanation of why it's wrong AND why the right answer is right
- Add "Hint" button that gives a clue without revealing the answer
- Allow retry after reading explanation (max 2 attempts before showing answer)
- Each question in block data should have: `hint`, `explanation` fields

**Files:**
- `src/types/blocks.ts` — add `hint` and `explanation` to QuizQuestion type
- `src/components/blocks/QuizBlock.tsx` — add hint button, explanation display, retry logic
- `src/lib/blocks/world-*.ts` — add hints and explanations to all quiz questions

---

### 9. No time estimates per block
**Problem:** User doesn't know if a block takes 2 minutes or 20 minutes. Can't plan their time.
**Fix:**
- Add `estimatedMinutes` field to Block type
- Show on block card: "~3 min" or "~15 min"
- Show total level time: "This level takes about 25 minutes"
- Guidelines: theory=2-3min, quiz=3-5min, prompt=5-10min, build=10-20min, debug=5-10min, review=5min, experiment=5-10min, pattern=3-5min

**Files:**
- `src/types/blocks.ts` — add `estimatedMinutes` to Block type
- `src/lib/blocks/world-*.ts` — add time estimates to all blocks
- `src/components/blocks/BlockNavigator.tsx` — show time per block
- `src/app/(dashboard)/level/[id]/LevelDetailClient.tsx` — show total level time

---

## UX / DESIGN

### 10. Pixel buddy is useless/generic
**Problem:** The mascot says generic things like "You're doing great!" — adds no value, takes up space.
**Fix:**
- Make pixel buddy context-aware:
  - On theory blocks: "Read this carefully, there's a quiz next!"
  - On prompt blocks: "Try to be as specific as possible"
  - On build blocks: "Don't forget to push your changes"
  - On failures: specific tips related to the current block
- Add personality: make it feel like a mentor, not a cheerleader
- If we can't make it useful → remove it entirely (less is more)

**Files:**
- `src/components/blocks/PixelBuddy.tsx` — rewrite with context-aware messages
- Each block component — pass context to PixelBuddy

---

### 11. Zigzag path — no auto-scroll to current level
**Problem:** User completes level 8 → path doesn't scroll to show level 9. User has to manually scroll.
**Fix:**
- Auto-scroll to current level on page load
- Smooth scroll animation to the first incomplete level
- Add "Jump to current" button if user scrolls away
- Current level node should have a subtle pulse/glow animation

**Files:**
- `src/app/(dashboard)/dashboard/DashboardClient.tsx` — add auto-scroll logic
- `src/components/levels/LevelNode.tsx` — add pulse animation for current level
- `src/components/levels/LevelPath.tsx` — add scroll-to-current logic + "Jump to current" button

---

### 12. "Optional" blocks confusing
**Problem:** Blocks marked "optional" → users skip them thinking they're unimportant. They actually have valuable content.
**Fix:**
- Replace "Optional" label with "Bonus +15 XP" (or whatever XP amount)
- Show as slightly different style (gold border? star icon?) but not grayed out
- Make it clear they're extra credit, not skippable filler
- Tooltip: "Not required to complete the level, but earns you extra XP"

**Files:**
- `src/components/blocks/BlockNavigator.tsx` — change "Optional" to "Bonus +XP"
- `src/components/blocks/BlockCard.tsx` — update optional block styling

---

### 13. Toolkit page — dead zone for free users
**Problem:** Free users see "Prompt Toolkit" in nav → click it → empty page or paywall. Wasted click.
**Fix:**
- Show all pattern names/descriptions to free users (teaser)
- Lock the detailed content/exercises for pro patterns
- Show what they'll unlock: "Complete World 3 to unlock the Component Request Pattern"
- First 2-3 patterns (from World 1) should be fully free

**Files:**
- `src/app/(dashboard)/toolkit/ToolkitClient.tsx` — add teaser mode for locked patterns
- `src/lib/blocks/patterns.ts` — mark which patterns are free vs pro

---

### 14. Landing page testimonials — fake
**Problem:** Obviously fake testimonials with stock-feeling names/photos. Kills trust.
**Fix:**
- Remove fake testimonials entirely for now
- Replace with:
  - Stats: "X users have completed Y levels" (real data from DB)
  - Example projects: screenshots of what users build in each world
  - Or: "Join X people learning to vibe code" with just the number
- Add real testimonials later when we have actual users

**Files:**
- `src/app/(marketing)/page.tsx` — replace testimonials section

---

## CONTENT

### 15. World 1 too basic
**Status:** Partially addressed by the 8-world curriculum redesign. World 1 now has 5 levels with proper progression.
**Remaining:** Review World 1 content to ensure it's engaging, not boring. First impression matters most.
**Action:** Review and polish World 1 block content for tone, clarity, and engagement.

**Files:**
- `src/lib/blocks/world-1.ts` — review and polish content

---

### 16. Debug/review blocks — stubs
**Status:** Addressed by the curriculum redesign. All debug/review blocks now have real content with scenarios, code snippets, and expected fixes.
**Action:** Verify that debug/review block rendering components handle the content properly.

**Files:**
- `src/components/blocks/DebugBlock.tsx` — verify it renders scenarios correctly
- `src/components/blocks/ReviewBlock.tsx` — verify it renders issues correctly

---

## Implementation Order

Recommended sequence (dependencies + impact):

1. **#3 Paywall → 10 free levels** — quick config change, big impact on retention
2. **#1 Welcome modal** — first thing users see, sets the tone
3. **#2 Repo setup wizard** — unblocks the biggest confusion point
4. **#4 Build block repo check** — prevents dead ends
5. **#5 Remove fake delays** — quick fix, immediate improvement
6. **#6 Verify failure checklist** — major learning improvement
7. **#7 Prompt diff view** — major learning improvement
8. **#8 Quiz hints** — learning improvement, needs content updates
9. **#9 Time estimates** — needs content updates across all blocks
10. **#11 Auto-scroll path** — UX polish
11. **#12 Optional → Bonus XP** — UX copy fix
12. **#14 Remove fake testimonials** — trust improvement
13. **#10 Pixel buddy** — nice to have, can defer
14. **#13 Toolkit teaser** — nice to have
15. **#15 Polish World 1** — content review
16. **#16 Verify debug/review** — QA check
