import { createFileRoute, useNavigate, useParams, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ShieldHUD } from "@/components/game/ShieldHUD";
import { AnswerFeedback } from "@/components/game/AnswerFeedback";
import { LockedOverlay } from "@/components/game/LockedOverlay";
import { ResultScreen } from "@/components/game/ResultScreen";
import { Confetti } from "@/components/game/Confetti";
import { QuestionSkeleton, ResultSkeleton } from "@/components/game/GameSkeleton";
import { getStage } from "@/lib/curriculum";
import { WORLD1_PRACTICE, type Question } from "@/lib/world1Content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fase/$stageId/pratica")({
  head: () => ({
    meta: [
      { title: "Prática — Mestre Finan" },
      { name: "description", content: "Coloque o que aprendeu em prática." },
    ],
  }),
  component: PracticeScreen,
});

function PracticeScreen() {
  const { stageId } = useParams({ from: "/fase/$stageId/pratica" });
  const navigate = useNavigate();
  const { complete, loseShield, restoreShields, shields, maxShields, lockUntil } = useProgress();

  const stage = getStage(stageId);
  const practice = WORLD1_PRACTICE[stageId];

  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [errors, setErrors] = useState(0);
  const [breaking, setBreaking] = useState(false);
  const [locked, setLocked] = useState(false);
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

  if (!stage || (stage.type !== "practice" && stage.type !== "boss")) return <Navigate to="/" />;
  if (!ready) return <QuestionSkeleton />;
  if (!practice) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="text-foreground">Prática em construção para esta fase.</p>
        <Link to="/" className="mt-4 underline">Voltar ao mapa</Link>
      </div>
    );
  }

  const questions: Question[] = practice.questions;
  const q = questions[qIdx];
  const isCorrect = picked === q.correctIndex;

  const onPick = (i: number) => {
    if (showFeedback || locked) return;
    setPicked(i);
    if (i !== q.correctIndex) {
      setErrors((e) => e + 1);
      setBreaking(true);
      setTimeout(() => setBreaking(false), 500);
      const result = loseShield();
      if (result.locked) {
        // Bloqueia imediatamente — sem feedback nem continuar
        setLocked(true);
        return;
      }
    }
    setShowFeedback(true);
  };

  const onContinue = () => {
    setShowFeedback(false);
    setPicked(null);
    if (qIdx + 1 >= questions.length) {
      // win
      complete(stage.id);
      restoreShields();
      setDone(true);
    } else {
      setQIdx((i) => i + 1);
    }
  };

  const stars = errors === 0 ? 3 : errors === 1 ? 2 : 1;
  const isBoss = stage.type === "boss";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-3 pb-32">
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
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {isBoss ? "Boss" : "Prática"} · {qIdx + 1}/{questions.length}
          </p>
          <h1 className="truncate font-display text-base text-foreground">{stage.title}</h1>
        </div>
        <ShieldHUD shields={shields} max={maxShields} breaking={breaking} lockUntil={lockUntil} />
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-game-gold transition-all"
          style={{ width: `${((qIdx + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div key={qIdx} className="mt-6 flex-1 animate-fade-in">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Pergunta {qIdx + 1}
        </p>
        <h2 className="mt-1 font-display text-xl leading-tight text-foreground">
          {q.question}
        </h2>

        <div className="mt-5 flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const showCorrect = showFeedback && i === q.correctIndex;
            const showWrong = showFeedback && isPicked && i !== q.correctIndex;
            return (
              <button
                key={i}
                type="button"
                disabled={showFeedback}
                onClick={() => onPick(i)}
                className={cn(
                  "rounded-2xl border-2 px-4 py-3.5 text-left text-base transition-all",
                  "border-white/15 bg-black/30 text-foreground",
                  !showFeedback && "active:translate-y-0.5 hover:border-white/35",
                  showCorrect && "border-game-neon bg-game-neon/15 text-foreground animate-[pop_0.3s_ease-out]",
                  showWrong && "border-destructive bg-destructive/15 text-foreground",
                )}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 font-display text-xs">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <AnswerFeedback correct={isCorrect} explanation={q.explanation} onContinue={onContinue} />
      )}

      {locked && lockUntil && (
        <LockedOverlay unlockAt={lockUntil} onClose={() => navigate({ to: "/" })} />
      )}

      {done && (
        <>
          {!doneReady && <ResultSkeleton />}
          {doneReady && <Confetti count={isBoss ? 80 : 40} />}
          {doneReady && <ResultScreen
            variant={isBoss ? "boss" : "practice"}
            stars={stars}
            xp={isBoss ? stage.rewards.xp + 50 : stage.rewards.xp}
            coins={isBoss ? stage.rewards.coins + 100 : stage.rewards.coins}
            onContinue={() => {
              toast.success(isBoss ? "Boss derrotado!" : "Fase concluída!", {
                description: `+${stage.rewards.xp} XP · +${stage.rewards.coins} K-Coin`,
              });
              navigate({ to: "/" });
            }}
          />}
        </>
      )}
    </div>
  );
}

