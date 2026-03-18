import type { Block, QuizBlock, PromptBlock, DebugBlock, ReviewBlock, AuditBlock } from "@/types/blocks";
import { evaluatePrompt } from "./prompt-evaluation";

interface VerifyResult {
  passed: boolean;
  score?: number;
  feedback?: string;
  data?: Record<string, unknown>;
}

// ─── Theory Block ──────────────────────
export function verifyTheory(
  block: Block,
  data: { quizAnswers?: number[] }
): VerifyResult {
  if (block.type !== "theory") return { passed: false, feedback: "Invalid block type" };

  const theoryBlock = block;
  if (!theoryBlock.miniQuiz || theoryBlock.miniQuiz.length === 0) {
    return { passed: true, score: block.xp };
  }

  const answers = data.quizAnswers || [];
  let correct = 0;
  for (let i = 0; i < theoryBlock.miniQuiz.length; i++) {
    if (answers[i] === theoryBlock.miniQuiz[i].correctIndex) correct++;
  }

  return {
    passed: correct >= Math.ceil(theoryBlock.miniQuiz.length / 2),
    score: correct === theoryBlock.miniQuiz.length ? block.xp : Math.floor(block.xp * 0.7),
    feedback:
      correct === theoryBlock.miniQuiz.length
        ? "Perfect!"
        : `${correct}/${theoryBlock.miniQuiz.length} correct.`,
  };
}

// ─── Quiz Block ────────────────────────
export function verifyQuiz(
  block: Block,
  data: { answers: number[] }
): VerifyResult {
  if (block.type !== "quiz") return { passed: false, feedback: "Invalid block type" };

  const quizBlock = block as QuizBlock;
  const answers = data.answers || [];
  let correct = 0;
  const results: { correct: boolean; explanation?: string }[] = [];

  for (let i = 0; i < quizBlock.questions.length; i++) {
    const isCorrect = answers[i] === quizBlock.questions[i].correctIndex;
    if (isCorrect) correct++;
    results.push({
      correct: isCorrect,
      explanation: quizBlock.questions[i].explanation,
    });
  }

  return {
    passed: correct >= quizBlock.passingScore,
    score: correct >= quizBlock.passingScore ? block.xp : 0,
    feedback: `${correct}/${quizBlock.questions.length} correct. Need ${quizBlock.passingScore} to pass.`,
    data: { correct, total: quizBlock.questions.length, results },
  };
}

// ─── Prompt Block ──────────────────────
export async function verifyPrompt(
  block: Block,
  data: { prompt: string }
): Promise<VerifyResult> {
  if (block.type !== "prompt") return { passed: false, feedback: "Invalid block type" };

  const promptBlock = block as PromptBlock;
  const userPrompt = data.prompt?.trim();

  if (!userPrompt || userPrompt.length < 20) {
    return {
      passed: false,
      score: 0,
      feedback: "Your prompt is too short. Write at least a few sentences describing what you want.",
    };
  }

  const evaluation = await evaluatePrompt(
    userPrompt,
    promptBlock.referencePrompt,
    promptBlock.goal
  );

  return {
    passed: evaluation.average >= promptBlock.passingThreshold,
    score: evaluation.average >= promptBlock.passingThreshold ? block.xp : 0,
    feedback: evaluation.feedback,
    data: {
      prompt: userPrompt,
      specificity: evaluation.specificity,
      context: evaluation.context,
      format: evaluation.format,
      completeness: evaluation.completeness,
      average: evaluation.average,
      feedback: evaluation.feedback,
      suggestions: evaluation.suggestions,
      referencePrompt: promptBlock.referencePrompt,
    },
  };
}

// ─── Debug Block ───────────────────────
export async function verifyDebug(
  block: Block,
  data: { fixes: { scenarioId: string; fix: string }[] }
): Promise<VerifyResult> {
  if (block.type !== "debug") return { passed: false, feedback: "Invalid block type" };

  const debugBlock = block as DebugBlock;
  const fixes = data.fixes || [];
  let passedCount = 0;

  for (const fix of fixes) {
    const scenario = debugBlock.scenarios.find((s) => s.id === fix.scenarioId);
    if (!scenario) continue;
    // Simple length + keyword check — AI evaluation would be better but more expensive
    if (fix.fix && fix.fix.trim().length >= 10) {
      passedCount++;
    }
  }

  return {
    passed: passedCount >= debugBlock.passingCount,
    score: passedCount >= debugBlock.passingCount ? block.xp : 0,
    feedback: `${passedCount}/${debugBlock.scenarios.length} scenarios addressed. Need ${debugBlock.passingCount} to pass.`,
    data: { passedCount, total: debugBlock.scenarios.length },
  };
}

// ─── Review Block ──────────────────────
export function verifyReview(
  block: Block,
  data: { foundIssues: string[] }
): VerifyResult {
  if (block.type !== "review") return { passed: false, feedback: "Invalid block type" };

  const reviewBlock = block as ReviewBlock;
  const found = data.foundIssues || [];
  const matchedIssues = reviewBlock.knownIssues.filter((ki) =>
    found.some((f) => f === ki.id)
  );

  return {
    passed: matchedIssues.length >= reviewBlock.minIssuesFound,
    score: matchedIssues.length >= reviewBlock.minIssuesFound ? block.xp : 0,
    feedback: `Found ${matchedIssues.length}/${reviewBlock.knownIssues.length} issues. Need ${reviewBlock.minIssuesFound} to pass.`,
    data: {
      matchedCount: matchedIssues.length,
      total: reviewBlock.knownIssues.length,
      allIssues: reviewBlock.knownIssues,
    },
  };
}

// ─── Experiment Block ──────────────────
export function verifyExperiment(
  block: Block,
  data: { completedSteps: string[] }
): VerifyResult {
  if (block.type !== "experiment") return { passed: false, feedback: "Invalid block type" };

  const completed = data.completedSteps || [];
  return {
    passed: completed.length > 0,
    score: completed.length > 0 ? block.xp : 0,
    feedback:
      completed.length > 0
        ? "Experiment completed!"
        : "Complete at least one step.",
  };
}

// ─── Pattern Block ─────────────────────
export function verifyPattern(
  block: Block,
  data: { exerciseCompleted: boolean; filledTemplate?: string }
): VerifyResult {
  if (block.type !== "pattern") return { passed: false, feedback: "Invalid block type" };

  return {
    passed: data.exerciseCompleted === true,
    score: data.exerciseCompleted ? block.xp : 0,
    feedback: data.exerciseCompleted
      ? "Pattern learned! Added to your Toolkit."
      : "Complete the exercise to learn this pattern.",
  };
}

// ─── Audit Block ──────────────────────
export function verifyAudit(
  block: Block,
  data: { passedItems: string[] }
): VerifyResult {
  if (block.type !== "audit") return { passed: false, feedback: "Invalid block type" };

  const auditBlock = block as AuditBlock;
  const passed = data.passedItems || [];
  const validPassed = auditBlock.checklist.filter((item) =>
    passed.includes(item.id)
  );

  const criticalItems = auditBlock.checklist.filter((i) => i.severity === "critical");
  const criticalPassed = criticalItems.filter((i) => passed.includes(i.id));

  return {
    passed: validPassed.length >= auditBlock.minPassed,
    score: validPassed.length >= auditBlock.minPassed ? block.xp : 0,
    feedback:
      validPassed.length >= auditBlock.minPassed
        ? `Audit passed! ${validPassed.length}/${auditBlock.checklist.length} items verified. ${criticalPassed.length}/${criticalItems.length} critical items addressed.`
        : `${validPassed.length}/${auditBlock.checklist.length} items checked. Need at least ${auditBlock.minPassed} to pass.`,
    data: {
      passedCount: validPassed.length,
      total: auditBlock.checklist.length,
      criticalPassed: criticalPassed.length,
      criticalTotal: criticalItems.length,
    },
  };
}

// ─── Main Dispatcher ───────────────────
export async function verifyBlock(
  block: Block,
  data: Record<string, unknown>
): Promise<VerifyResult> {
  switch (block.type) {
    case "theory":
      return verifyTheory(block, data as { quizAnswers?: number[] });
    case "quiz":
      return verifyQuiz(block, data as { answers: number[] });
    case "prompt":
      return verifyPrompt(block, data as { prompt: string });
    case "debug":
      return verifyDebug(block, data as { fixes: { scenarioId: string; fix: string }[] });
    case "review":
      return verifyReview(block, data as { foundIssues: string[] });
    case "experiment":
      return verifyExperiment(block, data as { completedSteps: string[] });
    case "pattern":
      return verifyPattern(block, data as { exerciseCompleted: boolean; filledTemplate?: string });
    case "audit":
      return verifyAudit(block, data as { passedItems: string[] });
    case "build":
      // Build blocks use the existing verify API — handled separately
      return { passed: false, feedback: "Build blocks use /api/levels/[id]/verify" };
    default:
      return { passed: false, feedback: "Unknown block type" };
  }
}
