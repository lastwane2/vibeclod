export function PathSkeleton() {
  return (
    <div className="min-h-screen pb-8">
      {/* Stats bar skeleton */}
      <StatsSkeleton />

      {/* Repo status skeleton */}
      <div className="mx-auto max-w-md px-4 py-2">
        <div className="h-10 rounded-xl bg-[#E8E0D4]/40 animate-pulse" />
      </div>

      {/* Header skeleton */}
      <div className="mx-auto max-w-md px-4 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-[#E8E0D4]/50 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-28 rounded-lg bg-[#E8E0D4]/50 animate-pulse" />
            <div className="h-3 w-36 rounded-lg bg-[#E8E0D4]/30 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Path skeleton — world banners + circle nodes */}
      <div className="mt-4 space-y-6">
        {[1, 2].map((world) => (
          <div key={world}>
            {/* World banner */}
            <div className="mx-auto max-w-sm px-4 mb-4">
              <div className="h-16 rounded-2xl bg-[#E8E0D4]/30 animate-pulse" />
            </div>

            {/* Level nodes */}
            <div className="flex flex-col items-center gap-6">
              {[1, 2, 3, 4, 5].map((node) => (
                <div key={node} className="flex flex-col items-center">
                  <div
                    className={`rounded-full bg-[#E8E0D4]/40 animate-pulse ${
                      node === 5 ? "h-[72px] w-[72px] rounded-2xl" : "h-[58px] w-[58px]"
                    }`}
                    style={{ animationDelay: `${node * 100}ms` }}
                  />
                  <div
                    className="mt-2 h-3 w-16 rounded bg-[#E8E0D4]/30 animate-pulse"
                    style={{ animationDelay: `${node * 100 + 50}ms` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LevelDetailSkeleton() {
  return (
    <div className="min-h-screen pb-12">
      {/* Hero header skeleton */}
      <div className="relative px-4 pt-6 pb-16 bg-[#E8E0D4]/40">
        <div className="h-4 w-24 rounded bg-white/30 animate-pulse mb-4" />
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-20 rounded-full bg-white/20 animate-pulse" />
          <div className="h-5 w-14 rounded-full bg-white/20 animate-pulse" />
        </div>
        <div className="h-8 w-64 rounded-lg bg-white/25 animate-pulse mt-3" />
        <div className="h-4 w-40 rounded bg-white/15 animate-pulse mt-2" />

        <div className="absolute -bottom-4 left-4">
          <div className="h-9 w-24 rounded-full bg-white/60 animate-pulse" />
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-10">
        {/* Buddy skeleton */}
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-xl bg-[#E8E0D4]/40 animate-pulse" />
        </div>

        {/* Mission card skeleton */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <div className="h-4 w-16 rounded bg-[#E8E0D4]/40 animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-[#E8E0D4]/30 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-[#E8E0D4]/30 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-[#E8E0D4]/30 animate-pulse" />
          </div>
        </div>

        {/* Concepts card skeleton */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <div className="h-4 w-24 rounded bg-[#E8E0D4]/40 animate-pulse mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#E8E0D4]/40 animate-pulse shrink-0" />
                <div className="h-4 w-full rounded bg-[#E8E0D4]/25 animate-pulse mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-12 w-full rounded-xl bg-[#E8E0D4]/40 animate-pulse" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="mx-auto max-w-md px-4 py-3">
      <div className="flex items-center justify-between rounded-2xl bg-white/70 border border-[#E8E0D4] px-4 py-2.5 shadow-sm">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded bg-[#E8E0D4]/40 animate-pulse" />
            <div className="space-y-1">
              <div className="h-2 w-6 rounded bg-[#E8E0D4]/30 animate-pulse" />
              <div className="h-4 w-10 rounded bg-[#E8E0D4]/40 animate-pulse" />
            </div>
            {i < 4 && <div className="h-6 w-px bg-[#E8E0D4] ml-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="min-h-screen pb-12">
      {/* Header skeleton */}
      <div className="mx-auto max-w-lg px-4 pt-8">
        <div className="h-7 w-24 rounded-lg bg-[#E8E0D4]/40 animate-pulse mb-6" />

        {/* Profile card skeleton */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-full bg-[#E8E0D4]/40 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-32 rounded bg-[#E8E0D4]/40 animate-pulse" />
              <div className="h-3 w-44 rounded bg-[#E8E0D4]/30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Repo card skeleton */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm mb-5">
          <div className="h-4 w-32 rounded bg-[#E8E0D4]/40 animate-pulse mb-4" />
          <div className="h-10 w-full rounded-xl bg-[#E8E0D4]/30 animate-pulse mb-3" />
          <div className="h-10 w-full rounded-xl bg-[#E8E0D4]/30 animate-pulse" />
        </div>

        {/* Stats card skeleton */}
        <div className="rounded-2xl bg-white border border-[#E8E0D4] p-5 shadow-sm">
          <div className="h-4 w-16 rounded bg-[#E8E0D4]/40 animate-pulse mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-[#E8E0D4]/25 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
