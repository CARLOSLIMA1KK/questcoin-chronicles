import type { LucideIcon } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

interface PagePlaceholderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bullets?: string[];
}

export function PagePlaceholder({ title, subtitle, icon: Icon, bullets }: PagePlaceholderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="mb-6 grid h-28 w-28 place-items-center rounded-3xl bg-[image:var(--gradient-hero)] animate-float"
        style={{ boxShadow: "var(--shadow-glow-gold)" }}
      >
        <Icon className="h-14 w-14 text-game-gold" strokeWidth={2.2} />
      </div>
      <h1 className="font-display text-4xl text-game-gold drop-shadow-[0_2px_0_oklch(0.62_0.13_75)]">
        {title}
      </h1>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{subtitle}</p>

      {bullets && bullets.length > 0 && (
        <GlassPanel className="mt-6 w-full p-4 text-left">
          <p className="font-display text-sm uppercase tracking-wider text-game-neon">
            Trilhas em construção
          </p>
          <ul className="mt-3 space-y-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm"
              >
                <span className="h-2 w-2 rounded-full bg-game-neon shadow-[var(--shadow-glow-neon)]" />
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      )}

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-game-accent animate-pulse" />
        Em breve
      </div>
    </div>
  );
}