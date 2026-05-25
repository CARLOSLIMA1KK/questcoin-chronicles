import { useState } from "react";
import { Target, Calculator, Receipt, X, ArrowDownToLine, ArrowUpFromLine, BadgePercent } from "lucide-react";
import { Button3D } from "./Button3D";

const STORAGE_KEY = "kappa.cofrinho.onboarded.v1";

export function markCofrinhoOnboarded() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function shouldShowCofrinhoOnboarding() {
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
    icon: <Target className="h-7 w-7" />,
    iconBg: "bg-game-neon/15",
    iconColor: "text-game-neon",
    title: "Defina sua meta 🎯",
    desc: "Escolha um objetivo (ex: comprar um item da Loja) e acompanhe seu progresso até alcançá-lo.",
    preview: (
      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-game-neon/15 text-game-neon">
            <Target className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-foreground">Comprar item lendário</p>
            <p className="text-[10px] text-white/50 tabular-nums">3.000 / 5.000 Star Coins</p>
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
          <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-game-neon to-game-accent" />
        </div>
        <p className="mt-1 text-[10px] text-game-neon">60% · ~32 dias no ritmo atual</p>
      </div>
    ),
  },
  {
    icon: <Calculator className="h-7 w-7" />,
    iconBg: "bg-game-accent/15",
    iconColor: "text-game-accent",
    title: "Brinque com o Simulador 🔮",
    desc: "Veja quanto seu dinheiro renderia em 7, 30 ou 365 dias antes de investir de verdade. Aprenda os juros compostos na prática.",
    preview: (
      <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Valor inicial</span>
          <span className="font-display tabular-nums text-foreground">500</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-white/60">Rendimento (30d)</span>
          <span className="font-display tabular-nums text-game-gold">+15 (3,04%)</span>
        </div>
        <div className="mt-1 flex items-center justify-between rounded-lg bg-game-neon/5 px-2 py-1.5">
          <span className="text-foreground">Valor final</span>
          <span className="font-display tabular-nums text-game-neon">515</span>
        </div>
      </div>
    ),
  },
  {
    icon: <Receipt className="h-7 w-7" />,
    iconBg: "bg-game-gold/15",
    iconColor: "text-game-gold",
    title: "Acompanhe tudo no Extrato 📜",
    desc: "Cada investimento, resgate e rendimento aparece aqui. Verde pra entradas, vermelho pra resgates, dourado pro que rendeu.",
    preview: (
      <ul className="overflow-hidden rounded-xl border border-white/10 bg-black/40 text-xs">
        <PreviewTx icon={<ArrowDownToLine className="h-3 w-3" />} bg="bg-game-neon/15" color="text-game-neon" label="Investimento" value="+200" />
        <PreviewTx icon={<BadgePercent className="h-3 w-3" />} bg="bg-game-gold/15" color="text-game-gold" label="Rendimento" value="+0,60" />
        <PreviewTx icon={<ArrowUpFromLine className="h-3 w-3" />} bg="bg-destructive/15" color="text-destructive" label="Resgate" value="-50" />
      </ul>
    ),
  },
];

function PreviewTx({ icon, bg, color, label, value }: { icon: React.ReactNode; bg: string; color: string; label: string; value: string }) {
  return (
    <li className="flex items-center gap-2 border-b border-white/5 px-2.5 py-1.5 last:border-0">
      <span className={`grid h-6 w-6 place-items-center rounded-full ${bg} ${color}`}>{icon}</span>
      <span className="flex-1 text-foreground">{label}</span>
      <span className={`font-display tabular-nums ${color}`}>{value}</span>
    </li>
  );
}

export function CofrinhoOnboarding({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;
  const s = steps[step];

  const finish = () => {
    markCofrinhoOnboarded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Conhecendo o Cofrinho"
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-game-purple p-6 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.8)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            {step + 1} de {steps.length}
          </span>
          <button
            onClick={finish}
            aria-label="Pular"
            className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white"
          >
            Pular <X className="h-3.5 w-3.5" />
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
          {isLast ? "Começar" : "Próximo →"}
        </Button3D>
      </div>
    </div>
  );
}
