import type { PromptEvaluation } from "@/types/blocks";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function evaluatePrompt(
  userPrompt: string,
  referencePrompt: string,
  goal: string
): Promise<PromptEvaluation> {
  const systemPrompt = `You are a prompt evaluation expert. Score the user's AI prompt against a reference prompt on 4 dimensions (each 1-5):

1. **Specificity** — How precise is the request? Does it name exact technologies, files, or values?
2. **Context** — Does it provide relevant background? Tech stack, constraints, existing code?
3. **Format** — Does it specify output format/structure? File names, code style, organization?
4. **Completeness** — Does it cover all requirements? Missing elements, edge cases?

Goal of the prompt: ${goal}

Reference prompt (the ideal):
"""
${referencePrompt}
"""

Respond with ONLY a JSON object:
{
  "specificity": 1-5,
  "context": 1-5,
  "format": 1-5,
  "completeness": 1-5,
  "feedback": "2-3 sentences on what's good and what's missing",
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      temperature: 0.3,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Evaluate this prompt:\n\n"""${userPrompt}"""`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    const specificity = Math.min(5, Math.max(1, parsed.specificity));
    const context = Math.min(5, Math.max(1, parsed.context));
    const format = Math.min(5, Math.max(1, parsed.format));
    const completeness = Math.min(5, Math.max(1, parsed.completeness));
    const average = (specificity + context + format + completeness) / 4;

    return {
      specificity,
      context,
      format,
      completeness,
      average,
      feedback: parsed.feedback || "Evaluation complete.",
      suggestions: parsed.suggestions || [],
    };
  } catch (err) {
    console.error("Prompt evaluation error:", err);
    return {
      specificity: 3,
      context: 3,
      format: 3,
      completeness: 3,
      average: 3,
      feedback: "Could not evaluate prompt. Please try again.",
      suggestions: [],
    };
  }
}
