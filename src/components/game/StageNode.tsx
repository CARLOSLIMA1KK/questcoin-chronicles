import { Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stage } from "@/lib/curriculum";
import type { StageStatus } from "@/lib/progress";
import stageAula from "@/assets/stage-aula.webp";
import stagePratica from "@/assets/stage-pratica.webp";
import stageBoss from "@/assets/stage-boss.webp";

const STAGE_IMG: Record<Stage["type"], string> = {
  content: stageAula,
  practice: stagePratica,
  boss: stageBoss,
};

export function StageNode({
  stage,
  status,
  onClick,
}: {
  stage: Stage;
  status: StageStatus;
  onClick: () => void;
}) {
  const isLocked = status === "locked";
  const isCurrent = status === "current";
  const isCompleted = status === "completed";
  const isBoss = stage.type === "boss";
  const statusLabel = isLocked
    ? "bloqueada"
    : isCurrent
      ? "atual, jogue agora"
      : isCompleted
        ? "concluída"
        : "disponível";
  const typeLabel = isBoss ? "Boss" : stage.type === "content" ? "Aula" : "Prática";

  return (
    <button
      type="button"
      disabled={isLocked}
      onClick={onClick}
      aria-label={`${typeLabel}: ${stage.title}. ${statusLabel}.`}
      className={cn(
        "group relative grid min-h-12 min-w-12 place-items-center rounded-full transition-transform",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-game-neon/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isBoss ? "h-24 w-24 sm:h-28 sm:w-28" : "h-20 w-20 sm:h-[88px] sm:w-[88px]",
        isLocked && "opacity-60",
        !isLocked && "active:translate-y-1",
        isCurrent && "animate-[float_3s_ease-in-out_infinite] motion-reduce:animate-none",
      )}
    >
      {/* Outer ring */}
      <span
        className={cn(
          "absolute inset-0 rounded-full border-4",
          isCurrent && "border-game-gold [box-shadow:var(--shadow-glow-gold)]",
          isCompleted && "border-game-neon/70",
          !isCurrent && !isCompleted && !isLocked && "border-white/30",
          isLocked && "border-white/15",
        )}
      />
      {/* Inner disc */}
      <span
        className={cn(
          "absolute inset-2 rounded-full",
          "bg-[image:var(--gradient-hero)]",
          "[box-shadow:var(--shadow-3d-purple)]",
          isCurrent && "animate-pulse-glow",
        )}
      />
      {/* Content */}
      <span className="relative grid place-items-center">
        {isLocked ? (
          <Lock className="h-7 w-7 text-white/60" />
        ) : (
          <img
            src={STAGE_IMG[stage.type]}
            alt=""
            loading="lazy"
            width={isBoss ? 72 : 56}
            height={isBoss ? 72 : 56}
            className={cn(
              isBoss ? "h-14 w-14 sm:h-[68px] sm:w-[68px]" : "h-11 w-11 sm:h-12 sm:w-12",
              "object-contain drop-shadow-[0_3px_6px_oklch(0_0_0/0.55)]",
            )}
          />
        )}
      </span>

      {/* Stage index pill */}
      <span
        className={cn(
          "absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-2 py-0.5",
          "font-display text-[10px] tracking-wider text-foreground",
        )}
      >
        {isBoss ? "BOSS" : stage.type === "content" ? "AULA" : "PRÁTICA"}
      </span>

      {/* Completed check */}
      {isCompleted && (
        <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-game-neon text-[color:var(--primary-foreground)] [box-shadow:0_0_12px_oklch(0.92_0.29_140/0.7)]">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}