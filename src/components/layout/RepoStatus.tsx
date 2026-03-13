"use client";

interface RepoStatusProps {
  repoName: string | null;
}

export function RepoStatus({ repoName }: RepoStatusProps) {
  if (!repoName) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-2">
        <div className="rounded-lg border border-dashed border-[#D4C4A8] bg-[#F5EDE0] px-3 py-2 text-center text-sm text-[#8B7355]">
          No repository connected.{" "}
          <a href="/settings" className="font-medium underline">
            Connect one
          </a>{" "}
          to start.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-2">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E8] px-3 py-1 text-sm text-[#2D6A2D]">
        <span className="h-2 w-2 rounded-full bg-[#4CAF50]" />
        Repository connected: <span className="font-mono font-medium">{repoName}</span>
      </div>
    </div>
  );
}
