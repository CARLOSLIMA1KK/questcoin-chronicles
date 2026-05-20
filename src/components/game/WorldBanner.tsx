import { GlassPanel } from "./GlassPanel";
import { cn } from "@/lib/utils";
import type { World } from "@/lib/curriculum";
import { ChevronDown, Lock } from "lucide-react";

const ACCENT_BORDER: Record<World["accent"], string> = {
  neon: "border-game-neon/40",
  gold: "border-game-gold/40",
  accent: "border-game-accent/40",
  purple: "border-game-purple-light/60",
};

const ACCENT_TEXT: Record<World["accent"], string> = {
  neon: "text-game-neon",
  gold: "text-game-gold",
  accent: "text-game-accent",
  purple: "text-foreground",
};

const ACCENT_DISC: Record<World["accent"], string> = {
  neon: "from-game-neon/30 to-game-neon/5 border-game-neon/50",
  gold: "from-game-gold/30 to-game-gold/5 border-game-gold/50",
  accent: "from-game-accent/30 to-game-accent/5 border-game-accent/50",
  purple: "from-game-purple-light/40 to-game-purple-light/5 border-game-purple-light/60",
};

const ACCENT_BAR_FILL: Record<World["accent"], string> = {
  neon: "bg-game-neon [box-shadow:0_0_10px_oklch(0.92_0.29_140/0.7)]",
  gold: "bg-game-gold [box-shadow:0_0_10px_oklch(0.86_0.17_88/0.7)]",
  accent: "bg-game-accent [box-shadow:0_0_10px_oklch(0.7_0.32_330/0.7)]",
  purple: "bg-game-purple-light [box-shadow:0_0_10px_oklch(0.65_0.2_300/0.7)]",
};

const ACCENT_GLOW: Record<World["accent"], string> = {
  neon: "bg-game-neon/45",
  gold: "bg-game-gold/45",
  accent: "bg-game-accent/45",
  purple: "bg-game-purple-light/55",
};

const ACCENT_ICON_DROP: Record<World["accent"], string> = {
  neon: "drop-shadow-[0_0_14px_oklch(0.92_0.29_140/0.75)]",
  gold: "drop-shadow-[0_0_14px_oklch(0.86_0.17_88/0.75)]",
  accent: "drop-shadow-[0_0_14px_oklch(0.7_0.32_330/0.75)]",
  purple: "drop-shadow-[0_0_14px_oklch(0.65_0.2_300/0.8)]",
};

export function WorldBanner({
  world,
  done,
  total,
  expanded,
  onToggle,
  locked = false,
}: {
  world: World;
  done: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
  locked?: boolean;
}) {
  const pct = total === 0 ? 0 : (done / total) * 100;
  return (
    <button
      type="button"
      onClick={locked ? undefined : onToggle}
      aria-expanded={expanded}
      aria-disabled={locked}
      disabled={locked}
      className={cn("w-full text-left", locked && "cursor-not-allowed")}
    >
    <GlassPanel
      className={cn(
        "flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-white/[0.03] sm:px-6 sm:py-6",
        ACCENT_BORDER[world.accent],
        locked && "opacity-60 grayscale hover:bg-transparent",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={cn(
              "relative grid h-16 w-16 shrink-0 place-items-center rounded-full border bg-gradient-to-br [box-shadow:0_6px_18px_-6px_oklch(0_0_0/0.6)] sm:h-[72px] sm:w-[72px]",
              ACCENT_DISC[world.accent],
            )}
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl opacity-80",
                ACCENT_GLOW[world.accent],
                locked && "opacity-0",
              )}
            />
            <img
              src={world.icon}
              alt=""
              loading="lazy"
              width={64}
              height={64}
              className={cn(
                "relative h-14 w-14 object-contain drop-shadow-[0_3px_5px_oklch(0_0_0/0.5)] sm:h-16 sm:w-16",
                !locked && ACCENT_ICON_DROP[world.accent],
              )}
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              Mundo {world.index}
            </p>
            <h2 className={cn("font-display text-xl font-bold leading-tight tracking-tight line-clamp-1 sm:text-2xl", ACCENT_TEXT[world.accent])}>
              {world.name}
            </h2>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/55">
              {locked ? "Conclua o mundo anterior para desbloquear" : world.axis}
            </p>
          </div>
        </div>
        <div className="flex items-center self-start pt-1">
          {locked ? (
            <Lock className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-300",
                expanded && "rotate-180",
              )}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[11px] uppercase tracking-wider text-white/50">
            Progresso
          </span>
          <span className={cn("font-display text-xs", ACCENT_TEXT[world.accent])}>
            {done}/{total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[oklch(0.18_0.08_290)]">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500 ease-out",
              ACCENT_BAR_FILL[world.accent],
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </GlassPanel>
    </button>
  );
}