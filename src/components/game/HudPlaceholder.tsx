import { Coins, Shield } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

export function HudPlaceholder() {
  const xp = 35;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (xp / 100) * circumference;

  return (
    <GlassPanel className="flex items-center justify-between gap-3 px-3 py-2">
      <div className="relative flex items-center gap-2">
        <div className="relative h-14 w-14">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={radius} className="fill-none stroke-white/10" strokeWidth="4" />
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="fill-none stroke-game-neon"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ filter: "drop-shadow(0 0 4px oklch(0.92 0.29 140 / 0.8))" }}
            />
          </svg>
          <div className="absolute inset-1 rounded-full bg-[image:var(--gradient-hero)] grid place-items-center font-display text-lg text-foreground">
            F
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-game-gold px-1.5 py-px text-[10px] font-bold leading-none text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow-gold)]">
            LVL 1
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 border border-white/10">
        <Coins className="h-5 w-5 text-game-gold animate-coin-spin" />
        <span className="font-display text-base text-game-gold">0</span>
      </div>

      <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 border border-white/10">
        <Shield className="h-5 w-5 text-game-neon" />
        <span className="font-display text-base text-foreground">R$ 0</span>
      </div>
    </GlassPanel>
  );
}