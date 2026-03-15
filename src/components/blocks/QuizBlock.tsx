"use client";

import { useState } from "react";
import type { QuizBlock as QuizBlockType } from "@/types/blocks";

interface Props {
  block: QuizBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

export function QuizBlock({ block, worldColor, completed, onComplete }: Props) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [hintsShown, setHintsShown] = useState<Set<number>>(new Set());
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState<{
    correct: number;
    total: number;
    passed: boolean;
    results: { correct: boolean; explanation?: string }[];
  } | null>(null);

  const handleSubmit = () => {
    let correct = 0;
    const results: { correct: boolean; explanation?: string }[] = [];

    for (let i = 0; i < block.questions.length; i++) {
      const isCorrect = answers[i] === block.questions[i].correctIndex;
      if (isCorrect) correct++;
      results.push({
        correct: isCorrect,
        explanation: block.questions[i].explanation,
      });
    }

    const passed = correct >= block.passingScore;
    setResult({ correct, total: block.questions.length, passed, results });
    setSubmitted(true);
    setAttempts((a) => a + 1);

    if (passed) {
      onComplete({ answers, attempts: attempts + 1 });
    }
  };

  const handleRetry = () => {
    setAnswers([]);
    setSubmitted(false);
    setResult(null);
  };

  const toggleHint = (qi: number) => {
    setHintsShown((prev) => {
      const next = new Set(prev);
      if (next.has(qi)) next.delete(qi);
      else next.add(qi);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#8B7355]">
        Answer {block.passingScore} of {block.questions.length} correctly to pass
      </p>

      {block.questions.map((q, qi) => (
        <div
          key={qi}
          className={`rounded-xl border p-4 space-y-2 ${
            submitted && result
              ? result.results[qi].correct
                ? "border-[#C8E6C8] bg-[#E8F5E8]/50"
                : "border-[#F5D5D5] bg-[#FFF5F5]/50"
              : "border-[#E8E0D4] bg-white"
          }`}
        >
          <p className="text-sm font-medium text-[#2D2016]">
            {qi + 1}. {q.question}
          </p>
          <div className="space-y-1.5">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => {
                  if (submitted) return;
                  const newAnswers = [...answers];
                  newAnswers[qi] = oi;
                  setAnswers(newAnswers);
                }}
                disabled={submitted}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  submitted && oi === block.questions[qi].correctIndex
                    ? "border-2 border-[#4CAF50] bg-[#E8F5E8] text-[#2D6A2D] font-medium"
                    : submitted && answers[qi] === oi && oi !== block.questions[qi].correctIndex
                      ? "border-2 border-[#E06B6B] bg-[#FFF5F5] text-[#B8553A]"
                      : answers[qi] === oi
                        ? "border-2 font-medium"
                        : "border border-[#E8E0D4] hover:bg-[#FAF6F0]"
                }`}
                style={
                  !submitted && answers[qi] === oi
                    ? { borderColor: worldColor, color: worldColor, backgroundColor: `${worldColor}10` }
                    : undefined
                }
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Hint button — before submit only */}
          {!submitted && q.hint && (
            <button
              onClick={() => toggleHint(qi)}
              className="text-xs text-[#8B7355] hover:text-[#2D2016] underline underline-offset-2 transition-colors"
            >
              {hintsShown.has(qi) ? "Hide hint" : "Need a hint?"}
            </button>
          )}
          {!submitted && hintsShown.has(qi) && q.hint && (
            <p className="text-xs text-[#8B7355] bg-[#FAF6F0] rounded-lg px-3 py-2">
              💡 {q.hint}
            </p>
          )}

          {/* Explanation after submit */}
          {submitted && result && !result.results[qi].correct && result.results[qi].explanation && (
            <div className="text-xs text-[#4A3728] bg-[#FFF5F5] rounded-lg px-3 py-2 mt-1">
              <span className="font-medium text-[#B8553A]">Why:</span>{" "}
              {result.results[qi].explanation}
            </div>
          )}
          {submitted && result && result.results[qi].correct && result.results[qi].explanation && (
            <p className="text-xs text-[#2D6A2D] mt-1 pl-1">
              {result.results[qi].explanation}
            </p>
          )}
        </div>
      ))}

      {/* Result */}
      {submitted && result && (
        <div
          className={`rounded-xl p-4 text-center ${
            result.passed
              ? "bg-[#E8F5E8] text-[#2D6A2D]"
              : "bg-[#FFF5F5] text-[#B8553A]"
          }`}
        >
          <p className="text-lg font-bold">
            {result.correct}/{result.total}
          </p>
          <p className="text-sm">
            {result.passed
              ? "Passed! Great job."
              : `Need ${block.passingScore} correct. Read the explanations above and try again!`}
          </p>
        </div>
      )}

      {/* Actions */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={answers.filter((a) => a !== undefined).length < block.questions.length}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: worldColor }}
        >
          Submit Answers
        </button>
      )}

      {submitted && result && !result.passed && (
        <button
          onClick={handleRetry}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: worldColor }}
        >
          Try Again
        </button>
      )}

      {completed && (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F5E8] text-[#2D6A2D] text-sm font-semibold">
          ✓ Completed
        </div>
      )}
    </div>
  );
}
