// ═══════════════════════════════════════
// Block Types — 8 block types for levels
// ═══════════════════════════════════════

export type BlockType =
  | "theory"
  | "quiz"
  | "prompt"
  | "build"
  | "debug"
  | "review"
  | "experiment"
  | "pattern";

export type ScaffoldLevel = "full" | "template" | "hints" | "none";

export const BLOCK_ICONS: Record<BlockType, string> = {
  theory: "📖",
  quiz: "❓",
  prompt: "✏️",
  build: "🔨",
  debug: "🐛",
  review: "🔍",
  experiment: "🧪",
  pattern: "📚",
};

export const BLOCK_LABELS: Record<BlockType, string> = {
  theory: "Theory",
  quiz: "Quiz",
  prompt: "Prompt",
  build: "Build",
  debug: "Debug",
  review: "Review",
  experiment: "Experiment",
  pattern: "Pattern",
};

// ─── Base Block ────────────────────────

export interface BaseBlock {
  id: string; // "L1B1", "L1B2", etc.
  levelId: number;
  type: BlockType;
  title: string;
  xp: number;
  required: boolean; // must complete to finish level
  order: number; // display order within level
}

// ─── Theory Block ──────────────────────

export interface TheoryBlock extends BaseBlock {
  type: "theory";
  content: string; // Markdown content
  miniQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

// ─── Quiz Block ────────────────────────

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizBlock extends BaseBlock {
  type: "quiz";
  questions: QuizQuestion[];
  passingScore: number; // e.g. 3 out of 5
}

// ─── Prompt Block ──────────────────────

export interface PromptBlock extends BaseBlock {
  type: "prompt";
  scaffold: ScaffoldLevel;
  goal: string; // What the prompt should achieve
  referencePrompt: string; // The ideal prompt
  template?: string; // For scaffold: "template" — prompt with ___ blanks
  hints?: string[]; // For scaffold: "hints"
  passingThreshold: number; // Minimum average score (1-5) across dimensions
}

export interface PromptEvaluation {
  specificity: number; // 1-5
  context: number; // 1-5
  format: number; // 1-5
  completeness: number; // 1-5
  average: number;
  feedback: string;
  suggestions: string[];
}

// ─── Build Block ───────────────────────

export interface BuildBlock extends BaseBlock {
  type: "build";
  mission: string;
  githubChecks: import("@/types").GitHubCheck;
  aiReviewPrompt: string;
  passingScore: number;
}

// ─── Debug Block ───────────────────────

export interface DebugScenario {
  id: string;
  title: string;
  description: string;
  brokenCode: string;
  language: string;
  hint?: string;
  expectedFix: string; // Description of what the fix should address
}

export interface DebugBlock extends BaseBlock {
  type: "debug";
  scenarios: DebugScenario[];
  passingCount: number; // How many scenarios must be fixed
}

// ─── Review Block ──────────────────────

export interface ReviewIssue {
  id: string;
  lineRange: [number, number]; // start, end line
  description: string;
  severity: "critical" | "warning" | "suggestion";
}

export interface ReviewBlock extends BaseBlock {
  type: "review";
  code: string;
  language: string;
  description: string; // Context about the code
  knownIssues: ReviewIssue[];
  minIssuesFound: number; // How many must be identified
}

// ─── Experiment Block ──────────────────

export interface ExperimentStep {
  id: string;
  instruction: string;
  expectedOutcome: string;
  question?: string; // Optional reflection question
}

export interface ExperimentBlock extends BaseBlock {
  type: "experiment";
  description: string;
  steps: ExperimentStep[];
}

// ─── Pattern Block ─────────────────────

export interface PatternBlock extends BaseBlock {
  type: "pattern";
  patternId: string; // References PromptPattern
  exercise: {
    goal: string;
    template: string; // Pattern template to fill
    exampleFilled: string; // Completed example
  };
}

// ─── Union Type ────────────────────────

export type Block =
  | TheoryBlock
  | QuizBlock
  | PromptBlock
  | BuildBlock
  | DebugBlock
  | ReviewBlock
  | ExperimentBlock
  | PatternBlock;

// ─── Block Completion Data ─────────────

export interface BlockCompletionData {
  blockId: string;
  score?: number;
  completed: boolean;
  data?: Record<string, unknown>;
}

// ─── Level with Blocks ─────────────────

export interface LevelBlocks {
  levelId: number;
  blocks: Block[];
}

// ─── Scaffold helpers ──────────────────

export function getScaffoldLevel(levelId: number): ScaffoldLevel {
  if (levelId <= 10) return "full";
  if (levelId <= 20) return "template";
  if (levelId <= 30) return "hints";
  return "none";
}
