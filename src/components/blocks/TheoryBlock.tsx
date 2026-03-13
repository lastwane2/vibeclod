"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { TheoryBlock as TheoryBlockType } from "@/types/blocks";

interface Props {
  block: TheoryBlockType;
  worldColor: string;
  completed: boolean;
  onComplete: (data: Record<string, unknown>) => void;
}

export function TheoryBlock({ block, worldColor, completed, onComplete }: Props) {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  const hasQuiz = block.miniQuiz && block.miniQuiz.length > 0;

  const handleFinishReading = () => {
    if (hasQuiz) {
      setShowQuiz(true);
    } else {
      onComplete({});
    }
  };

  const handleQuizSubmit = () => {
    if (!block.miniQuiz) return;
    let correct = 0;
    for (let i = 0; i < block.miniQuiz.length; i++) {
      if (quizAnswers[i] === block.miniQuiz[i].correctIndex) correct++;
    }
    const passed = correct >= Math.ceil(block.miniQuiz.length / 2);
    setQuizResult(passed);
    if (passed) {
      onComplete({ quizAnswers });
    }
  };

  return (
    <div className="space-y-4">
      {/* Markdown content */}
      <div className="prose prose-sm max-w-none prose-headings:text-[#2D2016] prose-p:text-[#4A3728] prose-strong:text-[#2D2016] prose-code:bg-[#F5EDE0] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-[#2D2016] prose-pre:text-[#E8E0D4] prose-table:text-sm">
        <ReactMarkdown>{block.content}</ReactMarkdown>
      </div>

      {/* Mini quiz */}
      {showQuiz && block.miniQuiz && (
        <div className="rounded-2xl border border-[#E8E0D4] bg-white p-5 space-y-4">
          <h3 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider">
            Quick Check
          </h3>
          {block.miniQuiz.map((q, qi) => (
            <div key={qi} className="space-y-2">
              <p className="text-sm font-medium text-[#2D2016]">{q.question}</p>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => {
                      const newAnswers = [...quizAnswers];
                      newAnswers[qi] = oi;
                      setQuizAnswers(newAnswers);
                      setQuizResult(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      quizAnswers[qi] === oi
                        ? "border-2 font-medium"
                        : "border border-[#E8E0D4] hover:bg-[#FAF6F0]"
                    }`}
                    style={
                      quizAnswers[qi] === oi
                        ? { borderColor: worldColor, color: worldColor, backgroundColor: `${worldColor}10` }
                        : undefined
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {quizResult === false && (
            <p className="text-sm text-[#B8553A]">Not quite — try again!</p>
          )}

          <button
            onClick={handleQuizSubmit}
            disabled={quizAnswers.length < (block.miniQuiz?.length ?? 0)}
            className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{ backgroundColor: worldColor }}
          >
            Check Answers
          </button>
        </div>
      )}

      {/* Complete button (no quiz) */}
      {!completed && !showQuiz && (
        <button
          onClick={handleFinishReading}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: worldColor }}
        >
          {hasQuiz ? "Take Quick Quiz →" : "I've Read This ✓"}
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
