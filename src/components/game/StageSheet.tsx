import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button3D } from "./Button3D";
import type { Stage } from "@/lib/curriculum";
import type { StageStatus } from "@/lib/progress";
import kCoin from "@/assets/k-coin.webp";
import { Sparkles, Lock } from "lucide-react";
import stageAula from "@/assets/stage-aula.webp";
import stagePratica from "@/assets/stage-pratica.webp";
import stageBoss from "@/assets/stage-boss.webp";
import { useNavigate } from "@tanstack/react-router";

const STAGE_IMG: Record<Stage["type"], string> = {
  content: stageAula,
  practice: stagePratica,
  boss: stageBoss,
};
const TYPE_LABEL: Record<Stage["type"], string> = {
  content: "Aula — Conteúdo",
  practice: "Prática",
  boss: "Boss do mundo",
};

export function StageSheet({
  stage,
  status,
  open,
  onOpenChange,
}: {
  stage: Stage | null;
  status: StageStatus | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  if (!stage) return null;
  const isCompleted = status === "completed";
  const isLocked = status === "locked";
  const iconSrc = STAGE_IMG[stage.type];

  const onPlay = () => {
    onOpenChange(false);
    if (stage.type === "content") {
      navigate({ to: "/fase/$stageId/conteudo", params: { stageId: stage.id } });
    } else {
      navigate({ to: "/fase/$stageId/pratica", params: { stageId: stage.id } });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl border-t border-game-gold/25 bg-card p-0"
      >
        <div className="mx-auto w-full max-w-md px-5 pb-6 pt-5">
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/20" />

          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] [box-shadow:var(--shadow-3d-purple)]">
              <img
                src={iconSrc}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-contain drop-shadow-[0_3px_6px_oklch(0_0_0/0.55)]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {TYPE_LABEL[stage.type]}
              </p>
              <SheetHeader className="space-y-1 p-0 text-left">
                <SheetTitle className="font-display text-xl text-foreground">
                  {stage.title}
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  {stage.description}
                </SheetDescription>
              </SheetHeader>
            </div>
          </div>

          {(stage.type === "practice" || stage.type === "boss") && !isLocked && (
            <p className="mt-3 text-xs text-muted-foreground">
              ⚠️ Cada erro custa 1 escudo. Sem escudos, a fase trava por 1h.
            </p>
          )}

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <Sparkles className="h-5 w-5 text-game-neon" />
            <span className="font-display text-sm text-foreground">
              +{stage.rewards.xp} XP
            </span>
            <span className="text-muted-foreground">·</span>
            <img src={kCoin} alt="K-Coin" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-sm text-game-gold">
              +{stage.rewards.coins}
            </span>
          </div>

          <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/80">
            BNCC · {stage.bnccCode}
          </p>

          <Button3D
            variant={stage.type === "content" ? "neon" : "gold"}
            disabled={isLocked}
            onClick={onPlay}
            className="mt-5 w-full"
          >
            {isLocked ? (
              <>
                <Lock className="h-4 w-4" /> Bloqueada
              </>
            ) : isCompleted ? (
              "Jogar de novo"
            ) : stage.type === "content" ? (
              "Começar aula"
            ) : (
              "Jogar"
            )}
          </Button3D>
        </div>
      </SheetContent>
    </Sheet>
  );
}
