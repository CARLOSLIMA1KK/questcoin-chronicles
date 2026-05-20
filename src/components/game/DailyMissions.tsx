import { DAILY_MISSIONS } from "@/lib/dailyMissions";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, string> = {
  neon: "border-game-neon/40 text-game-neon",
  gold: "border-game-gold/40 text-game-gold",
  accent: "border-game-accent/40 text-game-accent",
};

export function DailyMissions() {
  return (
    <section aria-label="Missões diárias" className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-display text-sm uppercase tracking-wider text-foreground/80">
          Missões diárias
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          renovam à meia-noite
        </span>
      </div>
      <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DAILY_MISSIONS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className={cn(
                "flex min-w-[180px] shrink-0 items-center gap-3 rounded-2xl border bg-[color:var(--glass-bg)] px-3 py-2 backdrop-blur-md",
                ACCENT[m.accent],
              )}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black/30">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-xs text-foreground">{m.title}</p>
                <p className="font-display text-sm">{m.reward}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}