import { useEffect, useMemo } from "react";
import { Check, X } from "lucide-react";
import { Button3D } from "./Button3D";
import { cn } from "@/lib/utils";
import { MestreAvatar } from "./MestreAvatar";
import { pickLine } from "@/lib/mestreLines";
import { playSfx } from "@/lib/sfx";

export function AnswerFeedback({
  correct,
  explanation,
  onContinue,
}: {
  correct: boolean;
  explanation: string;
  onContinue: () => void;
}) {
  const line = useMemo(() => pickLine(correct ? "correct" : "wrong"), [correct]);
  useEffect(() => {
    playSfx(correct ? "correct" : "wrong");
  }, [correct]);
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 animate-fade-in border-t-2 px-4 pt-4 pb-6",
        correct
          ? "border-game-neon bg-[oklch(0.35_0.18_145/0.95)]"
          : "border-destructive bg-[oklch(0.35_0.2_25/0.95)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="relative">
            <MestreAvatar size="sm" mood={correct ? "cheer" : "encourage"} />
            <span
              className={cn(
                "absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-card",
                correct ? "bg-game-neon text-[color:var(--primary-foreground)]" : "bg-destructive text-white",
              )}
            >
              {correct ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg leading-tight text-white">{line}</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-white/60">Mestre Finan</p>
          </div>
        </div>
        <p className="text-sm text-white/90">{explanation}</p>
        <Button3D variant={correct ? "neon" : "gold"} onClick={onContinue} className="w-full">
          Continuar
        </Button3D>
      </div>
    </div>
  );
}
