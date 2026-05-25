import { useEffect, useMemo } from "react";
import { Star, Sparkles, Crown, Trophy, BookOpen } from "lucide-react";
import { Button3D } from "./Button3D";
import kCoin from "@/assets/k-coin-v2.png";
import { cn } from "@/lib/utils";
import { MestreAvatar, MestreSpeech } from "./MestreAvatar";
import { pickLine } from "@/lib/mestreLines";
import { playSfx } from "@/lib/sfx";

export function ResultScreen({
  stars,
  xp,
  coins,
  onContinue,
  variant = "practice",
  title,
  subtitle,
}: {
  stars?: number;
  xp: number;
  coins: number;
  onContinue: () => void;
  variant?: "content" | "practice" | "boss";
  title?: string;
  subtitle?: string;
}) {
  const isBoss = variant === "boss";
  const isContent = variant === "content";
  const mood = isBoss ? "boss" : isContent ? "cheer" : "celebrate";
  const tone = isBoss ? "accent" : isContent ? "neon" : "gold";
  const line = useMemo(
    () => pickLine(isBoss ? "bossDone" : isContent ? "contentDone" : "practiceDone"),
    [isBoss, isContent],
  );
  useEffect(() => {
    playSfx(isBoss ? "bossVictory" : isContent ? "lessonComplete" : "victory");
  }, [isBoss, isContent]);
  const heading =
    title ?? (isBoss ? "Chefão derrotado!" : isContent ? "Briefing dominado!" : "Missão concluída!");
  const sub =
    subtitle ??
    (isBoss
      ? "Você venceu o desafio supremo — recompensa estelar!"
      : isContent
      ? "Você desbloqueou a próxima Prática."
      : "Mandou muito bem nessa órbita, cadete!");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 px-6 animate-fade-in">
      <div
        className={cn(
          "w-full max-w-sm rounded-3xl border bg-card p-6 text-center animate-[pop_0.28s_ease-out_both]",
          isBoss
            ? "border-game-accent/60 [box-shadow:0_0_60px_oklch(0.7_0.32_330/0.55)]"
            : isContent
            ? "border-game-neon/50 [box-shadow:0_0_40px_oklch(0.92_0.29_140/0.35)]"
            : "border-game-gold/40 [box-shadow:0_0_40px_oklch(0.86_0.17_88/0.4)]",
        )}
      >
        {/* Astrodin */}
        <div className="relative mx-auto -mt-16 w-fit">
          <MestreAvatar size="lg" mood={mood} />
          <span
            className={cn(
              "absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-2 border-card",
              isBoss
                ? "bg-game-accent"
                : isContent
                ? "bg-game-neon"
                : "bg-game-gold",
            )}
          >
            <span className="inline-block animate-[shake_0.45s_ease-in-out_0.25s_both]">
              {isBoss ? (
                <Crown className="h-5 w-5 fill-white text-white" strokeWidth={2} />
              ) : isContent ? (
                <BookOpen className="h-5 w-5 text-[color:var(--primary-foreground)]" strokeWidth={2.5} />
              ) : (
                <Trophy className="h-5 w-5 fill-white text-white" strokeWidth={2} />
              )}
            </span>
          </span>
        </div>

        <MestreSpeech message={line} tone={tone} className="mx-auto mt-4 max-w-[18rem]" />

        <p
          className={cn(
            "mt-3 font-display text-[11px] uppercase tracking-[0.25em]",
            isBoss ? "text-game-accent" : isContent ? "text-game-neon" : "text-game-gold",
          )}
        >
          {isBoss ? "Vitória estelar" : isContent ? "Briefing concluído" : "Missão concluída"}
        </p>
        <h2 className="mt-1 font-display text-2xl text-foreground">{heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>

        {typeof stars === "number" && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              className={cn(
                "h-12 w-12 transition-all",
                n <= stars
                  ? "fill-game-gold text-game-gold drop-shadow-[0_0_10px_oklch(0.86_0.17_88/0.7)] animate-[pop_0.25s_ease-out_both]"
                  : "text-white/20",
              )}
              style={{ animationDelay: `${120 + n * 70}ms` }}
              strokeWidth={2}
            />
          ))}
        </div>
        )}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 animate-[pop_0.25s_ease-out_0.18s_both]">
            <Sparkles className="mx-auto h-6 w-6 text-game-neon" />
            <p className="mt-1 font-display text-xl text-foreground">+{xp}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">XP</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 animate-[pop_0.25s_ease-out_0.26s_both]">
            <img src={kCoin} alt="Star Coin" width={32} height={32} className="mx-auto h-7 w-7" />
            <p className="mt-1 font-display text-xl text-game-gold">+{coins}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{coinLabel(coins)}</p>
          </div>
        </div>
        {!isContent && (
          <p className="mt-4 text-xs text-game-neon">
            {isBoss ? "Escudos restaurados +1 bônus!" : "Escudos restaurados!"}
          </p>
        )}
        <Button3D variant={isBoss ? "neon" : "gold"} className="mt-5 w-full" onClick={onContinue}>
          Continuar
        </Button3D>
      </div>
    </div>
  );
}
