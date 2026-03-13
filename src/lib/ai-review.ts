import type { Level } from "@/types";

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

  // Use OpenAI API (or Anthropic if ANTHROPIC_API_KEY is set)
  const useOpenAI = !!process.env.OPENAI_API_KEY;

  let text = "";

  if (useOpenAI) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Review these files for Level ${level.id} "${level.title}":\n\n${filesText}`,
          },
        ],
        max_tokens: 1024,
        temperature: 0.3,
      }),
    });
    const data = await res.json();
    text = data.choices?.[0]?.message?.content ?? "";
  } else {
    // Anthropic fallback
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
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
    text =
      message.content[0].type === "text" ? message.content[0].text : "";
  }

  try {
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
