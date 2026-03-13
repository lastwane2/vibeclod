import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Neutral pixel buddy */}
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-[#F5EDE0] border-2 border-[#E8E0D4] flex items-center justify-center shadow-sm">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Left eye */}
            <rect x="14" y="16" width="6" height="6" rx="1" fill="#B8A898" />
            {/* Right eye */}
            <rect x="28" y="16" width="6" height="6" rx="1" fill="#B8A898" />
            {/* Neutral mouth */}
            <rect x="16" y="32" width="16" height="2.5" rx="1" fill="#B8A898" />
          </svg>
        </div>
        {/* Shrug arms */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-[#B8A898] text-lg select-none">
          \
        </div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-[#B8A898] text-lg select-none">
          /
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#2D2016] mb-2">{title}</h3>
      <p className="text-sm text-[#8B7355] max-w-xs leading-relaxed mb-6">
        {description}
      </p>

      {action && (
        <Link
          href={action.href}
          className="rounded-xl bg-[#E8A445] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#D4932E] transition-colors shadow-sm shadow-[#E8A445]/30 active:scale-[0.97]"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
