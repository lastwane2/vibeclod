"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Sad pixel buddy face */}
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-[#F5EDE0] border-2 border-[#E8E0D4] flex items-center justify-center shadow-sm">
          {/* Face */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Left eye */}
            <rect x="14" y="16" width="6" height="6" rx="1" fill="#B8A898" />
            {/* Right eye */}
            <rect x="28" y="16" width="6" height="6" rx="1" fill="#B8A898" />
            {/* Sad mouth */}
            <path
              d="M16 34 C20 30, 28 30, 32 34"
              stroke="#B8A898"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Teardrop */}
            <circle cx="12" cy="24" r="2" fill="#5B8DEF" opacity="0.6" />
          </svg>
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#2D2016] mb-2">Oops!</h3>
      <p className="text-sm text-[#8B7355] max-w-xs leading-relaxed mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl bg-[#2D2016] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4A3728] transition-colors shadow-sm active:scale-[0.97]"
        >
          Try again
        </button>
      )}
    </div>
  );
}
