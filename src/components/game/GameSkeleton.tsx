import { cn } from "@/lib/utils";

export function Shimmer({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "block overflow-hidden rounded-xl border border-white/10 bg-black/30 relative",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,oklch(0.92_0.29_140/0.12),transparent)] before:animate-[shimmer_1.1s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}

export function SlideSkeleton() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-3 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shimmer className="h-10 w-10 rounded-full" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Shimmer className="h-2.5 w-16 rounded-full" />
          <Shimmer className="h-4 w-44 rounded-md" />
        </div>
      </div>
      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <Shimmer className="h-1.5 w-6 rounded-full" />
        <Shimmer className="h-1.5 w-3 rounded-full" />
        <Shimmer className="h-1.5 w-3 rounded-full" />
      </div>
      {/* Illustration */}
      <Shimmer className="mx-auto mt-6 h-40 w-40 rounded-3xl" />
      <Shimmer className="mx-auto mt-6 h-7 w-3/4 rounded-md" />
      <div className="mt-3 space-y-2">
        <Shimmer className="h-4 w-full rounded-md" />
        <Shimmer className="h-4 w-11/12 rounded-md" />
        <Shimmer className="h-4 w-9/12 rounded-md" />
      </div>
      <div className="flex-1" />
      <Shimmer className="mt-6 h-12 w-full rounded-2xl" />
    </div>
  );
}

export function QuestionSkeleton() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-3 pb-32 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shimmer className="h-10 w-10 rounded-full" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Shimmer className="h-2.5 w-20 rounded-full" />
          <Shimmer className="h-4 w-40 rounded-md" />
        </div>
        {/* Shield HUD placeholder */}
        <div className="flex gap-1">
          <Shimmer className="h-6 w-5 rounded" />
          <Shimmer className="h-6 w-5 rounded" />
          <Shimmer className="h-6 w-5 rounded" />
        </div>
      </div>
      {/* Progress bar */}
      <Shimmer className="mt-3 h-1.5 w-full rounded-full" />
      {/* Question */}
      <div className="mt-6 space-y-2">
        <Shimmer className="h-2.5 w-20 rounded-full" />
        <Shimmer className="h-6 w-11/12 rounded-md" />
        <Shimmer className="h-6 w-8/12 rounded-md" />
      </div>
      {/* Options */}
      <div className="mt-5 flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <Shimmer key={i} className="h-14 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 px-6 animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl border border-game-gold/30 bg-card p-6 text-center">
        <Shimmer className="mx-auto -mt-14 h-20 w-20 rounded-full" />
        <Shimmer className="mx-auto mt-5 h-3 w-32 rounded-full" />
        <Shimmer className="mx-auto mt-2 h-6 w-48 rounded-md" />
        <Shimmer className="mx-auto mt-2 h-3 w-56 rounded-full" />
        <div className="mt-4 flex justify-center gap-2">
          <Shimmer className="h-12 w-12 rounded-full" />
          <Shimmer className="h-12 w-12 rounded-full" />
          <Shimmer className="h-12 w-12 rounded-full" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Shimmer className="h-20 rounded-2xl" />
          <Shimmer className="h-20 rounded-2xl" />
        </div>
        <Shimmer className="mt-5 h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
}
