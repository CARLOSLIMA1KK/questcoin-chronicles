import { ArrowUp, Trophy } from "lucide-react";

type Props = {
  position: number;
  total: number;
  score: number;
  deltaToNext: number | null;
};

export function MyPositionBar({ position, total, score, deltaToNext }: Props) {
  return (
    <div className="fixed bottom-20 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 px-3">
      <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--game-neon)]/40 bg-[color:var(--game-purple)]/95 px-4 py-3 backdrop-blur-md shadow-[var(--shadow-glow-neon)]">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--game-neon)]/15">
          <Trophy className="h-4 w-4 text-[color:var(--game-neon)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground">
            Sua posição: <span className="font-display text-[color:var(--game-neon)]">{position}º</span>
            <span className="text-xs text-muted-foreground"> / {total}</span>
          </div>
          <div className="text-[11px] text-muted-foreground">
            {score.toLocaleString("pt-BR")} pts
            {deltaToNext !== null && (
              <>
                {" • "}
                <span className="text-foreground">
                  +{deltaToNext.toLocaleString("pt-BR")}
                </span>{" "}
                pra subir
              </>
            )}
          </div>
        </div>
        {deltaToNext !== null && (
          <ArrowUp className="h-5 w-5 text-[color:var(--game-neon)]" />
        )}
      </div>
    </div>
  );
}