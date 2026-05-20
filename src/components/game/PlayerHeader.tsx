import { Shield, Clock, PiggyBank } from "lucide-react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePlayer } from "@/lib/player";
import { useProgress } from "@/lib/progress";
import { useShieldReady } from "@/lib/useShieldReady";
import { useWallet, wallet } from "@/lib/wallet";
import { GlassPanel } from "./GlassPanel";
import { SfxToggle } from "./SfxToggle";
import { cn } from "@/lib/utils";
import kCoin from "@/assets/k-coin-v2.png";
import avatarCarlos from "@/assets/avatar-carlos.webp";

export function PlayerHeader() {
  const { name, title, level, xp, xpToNext } = usePlayer();
  const { shields, maxShields, lockUntil } = useProgress();
  const ready = useShieldReady(shields, lockUntil);
  const { balance, invested } = useWallet();

  // Aplica rendimento ao montar e a cada minuto
  useEffect(() => {
    wallet.accrue();
    const t = setInterval(() => wallet.accrue(), 60_000);
    return () => clearInterval(t);
  }, []);

  const showTimer = shields === 0 && !!lockUntil && lockUntil > Date.now();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!showTimer) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [showTimer]);
  const remainingMs = showTimer ? (lockUntil as number) - now : 0;
  const remainingLabel = (() => {
    const total = Math.max(0, Math.floor(remainingMs / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (h > 0) return `${h}h${String(m).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  })();

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, xp / xpToNext));
  const offset = circumference - progress * circumference;

  return (
    <GlassPanel className="flex items-center gap-3 px-3 py-2">
      {/* Avatar + LVL badge */}
      <button
        type="button"
        aria-label={`Perfil de ${name}, nível ${level}, ${xp} de ${xpToNext} XP`}
        className="group relative flex flex-col items-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative h-16 w-16 transition-transform group-hover:scale-105 motion-reduce:transition-none">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r={radius}
              className="fill-none stroke-white/10"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              className="fill-none stroke-game-neon"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                filter: "drop-shadow(0 0 4px oklch(0.92 0.29 140 / 0.8))",
              }}
            />
          </svg>
          <div className="absolute inset-[6px] overflow-hidden rounded-full bg-game-purple-light">
            <img
              src={avatarCarlos}
              alt={name}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <span className="-mt-2 rounded-md border border-game-gold/60 bg-game-purple-light px-2 py-0.5 font-display text-[11px] font-bold leading-none tracking-wider text-game-gold">
          LVL {level}
        </span>
      </button>

      {/* Identidade + escudos */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate font-display text-base leading-none text-foreground">
          {name}
        </p>
        <p className="text-[10px] uppercase leading-none tracking-wider text-muted-foreground">
          {title}
        </p>
        <div
          className="mt-1 flex items-center gap-2"
          aria-label={`Escudos de proteção: ${shields} de ${maxShields}`}
        >
          <div className="flex items-center gap-1">
          {Array.from({ length: maxShields }).map((_, i) => {
            const filled = i < shields;
            return (
              <Shield
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  filled
                    ? "fill-game-neon/30 text-game-neon drop-shadow-[0_0_4px_oklch(0.92_0.29_140/0.7)]"
                    : "text-white/20",
                  ready && filled && "animate-[shield-ready-pulse_0.5s_ease-out]",
                )}
                strokeWidth={2.25}
              />
            );
          })}
          </div>
          {showTimer && (
            <div
              aria-label={`Escudos voltam em ${remainingLabel}`}
              className="flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 px-1.5 py-0.5"
            >
              <Clock className="h-3 w-3 text-destructive" />
              <span className="font-display text-[10px] tabular-nums leading-none text-destructive">
                {remainingLabel}
              </span>
            </div>
          )}
          {ready && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-1 rounded-full border border-game-neon/50 bg-game-neon/15 px-1.5 py-0.5 animate-[shield-ready-bounce_0.6s_cubic-bezier(0.34,1.56,0.64,1)]"
            >
              <Check className="h-3 w-3 text-game-neon" strokeWidth={3} />
              <span className="font-display text-[10px] uppercase leading-none tracking-wider text-game-neon">
                Pronto!
              </span>
            </div>
          )}
          <SfxToggle className="ml-auto" />
        </div>
      </div>

      {/* K-Coin: Saldo + Investimento (flat sobre o glass do header) */}
      <Link
        to="/cofrinho"
        aria-label={`Cofrinho. Saldo ${Math.floor(balance)} K-Coin, investido ${Math.floor(invested)} K-Coin`}
        className="flex flex-col gap-1.5 transition-transform active:scale-95"
      >
        {/* Saldo */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[9px] uppercase leading-none tracking-wider text-white/40">
              Saldo
            </span>
            <img
              src={kCoin}
              alt=""
              width={16}
              height={16}
              loading="eager"
              decoding="async"
              className="h-4 w-4 animate-coin-spin"
            />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-[10px] font-bold leading-none text-game-gold">
              K-
            </span>
            <span className="font-display text-sm font-bold leading-none text-foreground tabular-nums">
              {Math.floor(balance).toLocaleString("pt-BR")}
            </span>
          </div>
        </div>

        <div aria-hidden className="h-px w-full bg-white/10" />

        {/* Investido */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[9px] uppercase leading-none tracking-wider text-white/40">
              Investido
            </span>
            <PiggyBank className="h-3.5 w-3.5 text-game-neon drop-shadow-[0_0_4px_oklch(0.92_0.29_140/0.7)]" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-[10px] font-bold leading-none text-game-neon">
              K-
            </span>
            <span className="font-display text-sm font-bold leading-none text-foreground tabular-nums">
              {Math.floor(invested).toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </Link>
    </GlassPanel>
  );
}
