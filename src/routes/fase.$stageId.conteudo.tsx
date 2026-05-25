import { createFileRoute, useNavigate, useParams, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button3D } from "@/components/game/Button3D";
import { MestreAvatar } from "@/components/game/MestreAvatar";
import { ResultScreen } from "@/components/game/ResultScreen";
import { Confetti } from "@/components/game/Confetti";
import { SlideSkeleton, ResultSkeleton } from "@/components/game/GameSkeleton";
import { getStage } from "@/lib/curriculum";
import { WORLD1_CONTENT } from "@/lib/world1Content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { coinLabel } from "@/lib/brandAssets";

export const Route = createFileRoute("/fase/$stageId/conteudo")({
  head: () => ({
    meta: [
      { title: "Conteúdo — Astrodin" },
      { name: "description", content: "Aprenda o conteúdo da fase antes da prática." },
    ],
  }),
  component: ContentScreen,
});

function ContentScreen() {
  const { stageId } = useParams({ from: "/fase/$stageId/conteudo" });
  const navigate = useNavigate();
  const { complete } = useProgress();
  const stage = getStage(stageId);
  const lesson = WORLD1_CONTENT[stageId];
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [doneReady, setDoneReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    setDoneReady(false);
    const t = setTimeout(() => setDoneReady(true), 80);
    return () => clearTimeout(t);
  }, [done]);

  if (!stage || stage.type !== "content") return <Navigate to="/" />;
  if (!ready) return <SlideSkeleton />;
  if (!lesson) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="text-foreground">Conteúdo em construção para esta fase.</p>
        <Link to="/" className="mt-4 underline">Voltar ao mapa</Link>
      </div>
    );
  }

  const slides = lesson.slides;
  const isLast = idx === slides.length - 1;
  const slide = slides[idx];

  const next = () => {
    if (isLast) {
      complete(stage.id);
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-3 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Conteúdo</p>
          <h1 className="truncate font-display text-base text-foreground">{stage.title}</h1>
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === idx ? "w-6 bg-game-gold" : i < idx ? "w-3 bg-game-neon" : "w-3 bg-white/15",
            )}
          />
        ))}
      </div>

      {/* Slide */}
      <div key={idx} className="mt-6 flex-1 animate-fade-in">
        <div className="mx-auto grid h-40 w-40 place-items-center rounded-3xl border border-white/10 bg-[image:var(--gradient-hero)] [box-shadow:var(--shadow-3d-purple)]">
          <span className="text-7xl">{slide.emoji}</span>
        </div>
        <h2 className="mt-6 text-center font-display text-2xl leading-tight text-foreground">
          {slide.title}
        </h2>
        <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground">
          {slide.body}
        </p>
        {slide.tip && (
          <div className="mt-6 flex items-end gap-2">
            <MestreAvatar size="sm" mood="encourage" />
            <div className="relative flex-1 rounded-2xl rounded-bl-sm border border-game-gold/40 bg-game-gold/10 px-3 py-2.5 [box-shadow:0_4px_16px_-8px_oklch(0.86_0.17_88/0.5)]">
              <span
                aria-hidden
                className="absolute -left-1.5 bottom-2 h-3 w-3 rotate-45 border-b border-l border-game-gold/40 bg-game-gold/10"
              />
              <p className="text-xs italic text-game-gold/95">
                <span className="font-display not-italic">Mestre:</span> {slide.tip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-4 mt-6">
        <Button3D variant="gold" className="w-full" onClick={next}>
          {isLast ? "Concluir" : "Próximo"}
        </Button3D>
        <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
          BNCC · {stage.bnccCode}
        </p>
      </div>

      {done && (
        <>
          {!doneReady && <ResultSkeleton />}
          {doneReady && <Confetti count={30} />}
          {doneReady && <ResultScreen
            variant="content"
            xp={stage.rewards.xp}
            coins={stage.rewards.coins}
            onContinue={() => {
              toast.success("Prática liberada!", {
                description: `+${stage.rewards.xp} XP · +${stage.rewards.coins} Star Coin`,
              });
              navigate({ to: "/" });
            }}
          />}
        </>
      )}
    </div>
  );
}
