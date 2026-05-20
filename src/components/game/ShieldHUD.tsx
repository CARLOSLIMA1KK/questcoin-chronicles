import { Shield, Clock, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useShieldReady } from "@/lib/useShieldReady";

function formatRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h${String(m).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ShieldHUD({
  shields,
  max,
  breaking,
  lockUntil,
}: {
  shields: number;
  max: number;
  breaking?: boolean;
  lockUntil?: number | null;
}) {
  const empty = shields === 0;
  const showTimer = empty && !!lockUntil && lockUntil > Date.now();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!showTimer) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [showTimer]);
  const remaining = showTimer ? (lockUntil as number) - now : 0;
  const ready = useShieldReady(shields, lockUntil);

  return (
    <div className="flex items-center gap-2" aria-label={`Escudos: ${shields} de ${max}`}>
      <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < shields;
        const isBreakingThis = breaking && i === shields; // o que acabou de quebrar
        return (
          <Shield
            key={i}
            strokeWidth={2.5}
            className={cn(
              "h-5 w-5 transition-all",
              filled && "fill-game-neon/30 text-game-neon drop-shadow-[0_0_6px_oklch(0.92_0.29_140/0.7)]",
              !filled && "text-white/20",
              isBreakingThis && "animate-[shake_0.4s_ease-in-out] text-destructive",
              ready && filled && "animate-[shield-ready-pulse_0.5s_ease-out]",
            )}
          />
        );
      })}
      </div>
      {showTimer && (
        <div
          aria-label={`Escudos voltam em ${formatRemaining(remaining)}`}
          className="flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 [box-shadow:0_0_12px_-4px_oklch(0.65_0.25_25/0.5)]"
        >
          <Clock className="h-3 w-3 text-destructive" />
          <span className="font-display text-[11px] tabular-nums text-destructive">
            {formatRemaining(remaining)}
          </span>
        </div>
      )}
      {ready && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-1 rounded-full border border-game-neon/50 bg-game-neon/15 px-2 py-0.5 animate-[shield-ready-bounce_0.6s_cubic-bezier(0.34,1.56,0.64,1)]"
        >
          <Check className="h-3 w-3 text-game-neon" strokeWidth={3} />
          <span className="font-display text-[11px] uppercase tracking-wider text-game-neon">
            Pronto!
          </span>
        </div>
      )}
    </div>
  );
}
