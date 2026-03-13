import Anthropic from "@anthropic-ai/sdk";
import type { Level } from "@/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface AIReviewResult {
  passed: boolean;
  score: number;
  feedback: string;
  suggestions: string[];
}

export async function reviewCode(
  level: Level,
  files: { path: string; content: string }[]
): Promise<AIReviewResult> {
  const filesText = files
    .map(
      (f) =>
        `--- ${f.path} ---\n${f.content.length > 8000 ? f.content.slice(0, 8000) + "\n... (truncated)" : f.content}`
    )
    .join("\n\n");

  const systemPrompt = `You are a code reviewer for vibeclod, a vibe coding learning platform.
You're reviewing a student's submission for Level ${level.id}: "${level.title}".

Requirements for this level:
${level.mission}

Additional review context:
${level.aiReviewPrompt}

Review the code and respond with ONLY valid JSON (no markdown, no code fences):
{
  "passed": boolean,
  "score": number (0-100),
  "feedback": "2-3 sentences of encouraging feedback in markdown",
  "suggestions": ["1-3 specific improvement ideas"]
}

Scoring guide:
- 80-100: Excellent, exceeds requirements
- 60-79: Good, meets requirements
- 40-59: Partial, needs work
- 0-39: Doesn't meet requirements

Passing threshold for this level: ${level.passingScore}

Be encouraging but honest. The student built this with AI — judge the result, not the process. Working code > perfect code.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Review these files for Level ${level.id} "${level.title}":\n\n${filesText}`,
      },
    ],
    system: systemPrompt,
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    // Parse JSON - handle potential markdown fences
    const cleaned = text.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleaned) as AIReviewResult;

    return {
      passed: result.score >= level.passingScore,
      score: Math.min(100, Math.max(0, result.score)),
      feedback: result.feedback || "Review complete.",
      suggestions: Array.isArray(result.suggestions)
        ? result.suggestions.slice(0, 3)
        : [],
    };
  } catch {
    return {
      passed: false,
      score: 0,
      feedback:
        "There was an issue processing the AI review. Please try again.",
      suggestions: [],
    };
  }
}
