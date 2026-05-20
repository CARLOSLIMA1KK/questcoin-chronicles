import { Crown, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  place: 1 | 2 | 3;
  name: string;
  score: number;
  isMe?: boolean;
  avatarUrl?: string;
};

const STYLES = {
  1: {
    glow: "shadow-[var(--shadow-glow-gold)]",
    ring: "ring-[color:var(--game-gold)]",
    bg: "bg-gradient-to-b from-[color:var(--game-gold)]/85 to-[color:var(--game-gold-dark)]/90",
    badge: "bg-[color:var(--primary-foreground)] text-[color:var(--game-gold)]",
    height: "h-28",
    avatar: "h-16 w-16 text-2xl",
    icon: Crown,
    label: "1º",
  },
  2: {
    glow: "shadow-[0_0_18px_oklch(0.92_0.02_280/0.5)]",
    ring: "ring-[oklch(0.92_0.02_280)]",
    bg: "bg-gradient-to-b from-[oklch(0.92_0.02_280)]/85 to-[oklch(0.7_0.02_280)]/90",
    badge: "bg-[color:var(--primary-foreground)] text-[oklch(0.4_0.02_280)]",
    height: "h-22",
    avatar: "h-14 w-14 text-xl",
    icon: Medal,
    label: "2º",
  },
  3: {
    glow: "shadow-[0_0_18px_oklch(0.7_0.15_55/0.55)]",
    ring: "ring-[oklch(0.72_0.15_55)]",
    bg: "bg-gradient-to-b from-[oklch(0.72_0.15_55)]/90 to-[oklch(0.5_0.13_45)]/90",
    badge: "bg-[color:var(--primary-foreground)] text-[oklch(0.55_0.16_45)]",
    height: "h-20",
    avatar: "h-14 w-14 text-xl",
    icon: Medal,
    label: "3º",
  },
} as const;

export function PodiumCard({ place, name, score, isMe, avatarUrl }: Props) {
  const s = STYLES[place];
  const Icon = s.icon;
  const initials = name.split(" ").slice(0, 2).map((p) => p[0]).join("");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Icon
          className={cn(
            "absolute -top-5 left-1/2 -translate-x-1/2 drop-shadow",
            place === 1 ? "h-7 w-7 text-[color:var(--game-gold)]" : "h-5 w-5",
            place === 2 && "text-[oklch(0.85_0.02_280)]",
            place === 3 && "text-[oklch(0.62_0.13_55)]",
          )}
        />
        <div
          className={cn(
            "rounded-full ring-4 grid place-items-center font-display text-foreground overflow-hidden",
            "bg-[color:var(--game-purple-light)]",
            s.avatar,
            s.ring,
            s.glow,
            isMe && "outline outline-2 outline-[color:var(--game-neon)] outline-offset-2",
          )}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              loading="lazy"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-semibold text-foreground line-clamp-1 max-w-[88px]">
          {name}
          {isMe && <span className="ml-1 text-[color:var(--game-neon)]">•</span>}
        </div>
        <div className="text-[10px] text-foreground/70">{score.toLocaleString("pt-BR")} pts</div>
      </div>
      <div
        className={cn(
          "w-20 rounded-t-xl border border-[color:var(--glass-border)] grid place-items-start justify-center pt-2",
          s.bg,
          s.height,
        )}
      >
        <span className={cn("rounded-md px-2 py-0.5 text-xs font-display", s.badge)}>{s.label}</span>
      </div>
    </div>
  );
}