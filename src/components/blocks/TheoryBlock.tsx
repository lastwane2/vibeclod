"use client";

import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <div className="space-y-5">
      {/* Markdown content with custom components */}
      <div className="theory-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold text-[#2D2016] mb-3 mt-1">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-base font-bold text-[#2D2016] mb-2 mt-5 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: worldColor }} />
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-bold text-[#2D2016] mb-1.5 mt-4">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-sm text-[#4A3728] leading-relaxed mb-3">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-[#2D2016]">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-[#6B5A48]">{children}</em>
            ),
            ul: ({ children }) => (
              <ul className="space-y-1.5 mb-3 ml-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-1.5 mb-3 ml-1 list-none counter-reset-[item]">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-2 text-sm text-[#4A3728]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: worldColor }} />
                <span className="leading-relaxed">{children}</span>
              </li>
            ),
            a: ({ href, children }) => (
              <a href={href} className="underline decoration-1 underline-offset-2" style={{ color: worldColor }} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            code: ({ className, children }) => {
              const isBlock = className?.includes("language-");
              if (isBlock) {
                return (
                  <code className="text-[13px] leading-relaxed">{children}</code>
                );
              }
              return (
                <code className="bg-[#F5EDE0] text-[#8B5E3C] px-1.5 py-0.5 rounded text-[13px] font-mono">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <div className="rounded-xl bg-[#1E1E2E] border border-[#2D2D3D] overflow-hidden mb-3 mt-1">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#2D2D3D]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
                </div>
                <pre className="p-4 overflow-x-auto text-[#E8E0D4]">{children}</pre>
              </div>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto rounded-xl border border-[#E8E0D4] mb-3 mt-1">
                <table className="w-full text-sm">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-[#FAF6F0] border-b border-[#E8E0D4]">{children}</thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-[#F0E8DA]">{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-[#FAF6F0]/50 transition-colors">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2 text-left text-xs font-bold text-[#8B7355] uppercase tracking-wider whitespace-nowrap">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2.5 text-sm text-[#4A3728]">{children}</td>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-3 pl-4 my-3 text-sm text-[#6B5A48] italic" style={{ borderColor: worldColor }}>
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr className="border-[#E8E0D4] my-4" />
            ),
          }}
        >
          {block.content}
        </ReactMarkdown>
      </div>

      {/* Mini quiz */}
      {showQuiz && block.miniQuiz && (
        <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF6F0] p-5 space-y-4">
          <h3 className="text-xs font-bold text-[#8B7355] uppercase tracking-wider flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md text-[10px]" style={{ backgroundColor: `${worldColor}15`, color: worldColor }}>
              ❓
            </span>
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
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                      quizAnswers[qi] === oi
                        ? "border-2 font-medium shadow-sm"
                        : "border border-[#E8E0D4] bg-white hover:bg-white hover:shadow-sm"
                    }`}
                    style={
                      quizAnswers[qi] === oi
                        ? { borderColor: worldColor, color: worldColor, backgroundColor: `${worldColor}08` }
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
            <p className="text-sm text-[#B8553A] text-center">Not quite — try again!</p>
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
          className="w-full py-3 rounded-xl text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
          style={{ backgroundColor: worldColor, boxShadow: `0 4px 14px ${worldColor}40` }}
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
