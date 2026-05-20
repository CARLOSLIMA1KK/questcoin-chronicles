import { School } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  position: number;
  name: string;
  subtitle: string;
  score: number;
  isMe?: boolean;
};

export function RankingRow({ position, name, subtitle, score, isMe }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5",
        "border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] backdrop-blur-md",
        isMe && "border-[color:var(--game-neon)] bg-[color:var(--game-neon)]/15 shadow-[0_0_12px_oklch(0.92_0.29_140/0.35)]",
      )}
    >
      <div className={cn(
        "w-7 text-center font-display text-sm",
        isMe ? "text-[color:var(--game-neon)]" : "text-foreground/80",
      )}>{position}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">
          {name}
          {isMe && <span className="ml-2 rounded-md bg-[color:var(--game-neon)] px-1.5 py-0.5 text-[10px] font-bold text-[color:var(--primary-foreground)]">VOCÊ</span>}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-foreground/65">
          <School className="h-3 w-3" />
          <span className="truncate">{subtitle}</span>
        </div>
      </div>
      <div className="text-sm font-display text-[color:var(--game-gold)]">
        {score.toLocaleString("pt-BR")}
      </div>
    </div>
  );
}