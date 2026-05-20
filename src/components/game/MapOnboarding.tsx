import { useState } from "react";
import { Map as MapIcon, Trophy, Shield, X, Lock, Star } from "lucide-react";
import { Button3D } from "./Button3D";

const STORAGE_KEY = "kappa.mapa.onboarded.v1";

export function markMapaOnboarded() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function shouldShowMapaOnboarding() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return false;
  }
}

type Step = {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  preview: React.ReactNode;
};

const steps: Step[] = [
  {
    icon: <MapIcon className="h-7 w-7" />,
    iconBg: "bg-game-neon/15",
    iconColor: "text-game-neon",
    title: "Sua jornada em mundos 🗺️",
    desc: "Cada mundo tem várias fases. Conclua uma pra liberar a próxima e avance pelo mapa do Mestre Finan.",
    preview: (
      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
        <p className="text-[10px] uppercase tracking-wider text-game-neon">Mundo 1 · Iniciante</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-game-neon/20 text-game-neon ring-2 ring-game-neon">
            <Star className="h-4 w-4" fill="currentColor" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-game-purple-light/60 text-foreground">
            2
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white/40">
            <Lock className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-2 text-center text-[10px] text-white/50">conclua → libera próxima</p>
      </div>
    ),
  },
  {
    icon: <Trophy className="h-7 w-7" />,
    iconBg: "bg-game-gold/15",
    iconColor: "text-game-gold",
    title: "Missões diárias 🏆",
    desc: "Todo dia tem desafios novos pra ganhar K-Coin e XP extra. Volte sempre pra não perder!",
    preview: (
      <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-foreground">Conclua 1 fase hoje</span>
          <span className="font-display tabular-nums text-game-gold">+50</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
          <div className="h-full w-[40%] rounded-full bg-game-gold" />
        </div>
      </div>
    ),
  },
  {
    icon: <Shield className="h-7 w-7" />,
    iconBg: "bg-game-accent/15",
    iconColor: "text-game-accent",
    title: "Cuidado com os escudos 🛡️",
    desc: "Você tem 3 escudos. Errou uma resposta? Perde um. Sem escudos, espera um tempinho pra recuperar.",
    preview: (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 p-3">
        {[true, true, false].map((filled, i) => (
          <Shield
            key={i}
            className={`h-7 w-7 ${filled ? "text-game-accent" : "text-white/20"}`}
            fill={filled ? "currentColor" : "none"}
          />
        ))}
      </div>
    ),
  },
];

export function MapOnboarding({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;
  const s = steps[step];

  const finish = () => {
    markMapaOnboarded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Conhecendo o Mapa"
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-game-purple p-6 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.8)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            {step + 1} de {steps.length}
          </span>
          <button
            type="button"
            onClick={finish}
            aria-label="Pular tutorial"
            className="flex min-h-11 items-center gap-1 rounded-md px-3 text-[12px] text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-neon"
          >
            Pular tutorial <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl ${s.iconBg} ${s.iconColor}`}>
          {s.icon}
        </div>

        <h2 className="text-center font-display text-xl text-foreground">{s.title}</h2>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm text-white/70">{s.desc}</p>

        <div className="mt-4">{s.preview}</div>

        <div className="mt-5 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Ir para etapa ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-game-neon" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <Button3D
          variant="neon"
          onClick={() => (isLast ? finish() : setStep(step + 1))}
          className="mt-5 w-full"
        >
          {isLast ? "Começar jornada" : "Próximo →"}
        </Button3D>
      </div>
    </div>
  );
}
