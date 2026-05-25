import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PiggyBank,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  AlertTriangle,
  BadgePercent,
  Receipt,
  Target,
  Trophy,
  Sparkles,
  Pencil,
  Trash2,
  Calculator,
  HelpCircle,
} from "lucide-react";
import { CloseX } from "@/components/game/CloseX";
import { Screen } from "@/components/game/Screen";
import { GlassPanel } from "@/components/game/GlassPanel";
import { Button3D } from "@/components/game/Button3D";
import { Confetti } from "@/components/game/Confetti";
import {
  CofrinhoOnboarding,
  shouldShowCofrinhoOnboarding,
} from "@/components/game/CofrinhoOnboarding";
import {
  useWallet,
  wallet,
  DAILY_RATE,
  MIN_DEPOSIT,
  projectedDailyYield,
  lostYieldEstimate,
  devFastForwardDays,
} from "@/lib/wallet";
import type { WalletTx, WalletGoal } from "@/lib/wallet";
import { playSfx } from "@/lib/sfx";
import { coinLabel } from "@/lib/brandAssets";

export const Route = createFileRoute("/cofrinho")({
  head: () => ({
    meta: [
      { title: "Cofrinho — Astrodin" },
      {
        name: "description",
        content:
          "Invista seus Star Coins em um CDB simulado e veja seu dinheiro render todos os dias.",
      },
      { property: "og:title", content: "Cofrinho — Astrodin" },
      {
        property: "og:description",
        content:
          "Invista seus Star Coins em um CDB simulado e veja seu dinheiro render todos os dias.",
      },
    ],
  }),
  component: CofrinhoPage,
});

const fmt = (n: number) =>
  Math.floor(n).toLocaleString("pt-BR");

function CofrinhoPage() {
  const { balance, invested, totalEarned, transactions, goal } = useWallet();
  const [sheet, setSheet] = useState<"deposit" | "withdraw" | null>(null);
  const [depositPrefill, setDepositPrefill] = useState<number | undefined>(undefined);
  const [goalSheet, setGoalSheet] = useState(false);
  const [simSheet, setSimSheet] = useState(false);
  const [onboarding, setOnboarding] = useState(false);

  const openDeposit = (prefill?: number) => {
    setDepositPrefill(prefill);
    setSheet("deposit");
  };

  useEffect(() => {
    wallet.accrue();
    if (shouldShowCofrinhoOnboarding()) setOnboarding(true);
  }, []);

  const dailyYield = useMemo(() => projectedDailyYield(invested), [invested]);

  return (
    <Screen>
      <h1 className="sr-only">Cofrinho Star Coins</h1>

      {/* Card principal */}
      <GlassPanel className="relative overflow-hidden bg-[image:var(--gradient-hero)] p-5">
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-game-neon/20 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-game-purple-light/60 ring-1 ring-game-neon/40">
            <PiggyBank className="h-8 w-8 text-game-neon drop-shadow-[0_0_10px_oklch(0.92_0.29_140/0.8)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wider text-white/60">
              Meu Cofrinho
            </p>
            <p className="font-display text-3xl leading-none text-foreground tabular-nums">
              {fmt(invested)}
              <span className="ml-1 text-sm text-white/60">{coinLabel(invested)}</span>
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-game-neon">
              <TrendingUp className="h-3.5 w-3.5" />
              Rende {(DAILY_RATE * 100).toFixed(1)}% ao dia (CDB) · +{fmt(dailyYield)} /dia
            </p>
          </div>
          <button
            onClick={() => setOnboarding(true)}
            aria-label="Como funciona o Cofrinho"
            className="relative grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/30 text-white/60 hover:text-white"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </GlassPanel>

      {/* Resumo */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <StatChip label="Saldo livre" value={fmt(balance)} accent="text-game-gold" />
        <StatChip label="Investido" value={fmt(invested)} accent="text-game-neon" />
        <StatChip label="Ganho total" value={`+${fmt(totalEarned)}`} accent="text-game-accent" />
      </div>

      {/* Ações */}
      <div className="mt-4 mb-4 grid grid-cols-2 gap-3">
        <Button3D
          variant="neon"
          onClick={() => openDeposit()}
          disabled={balance < MIN_DEPOSIT}
          className="text-sm"
        >
          <ArrowDownToLine className="h-4 w-4" /> Investir
        </Button3D>
        <Button3D
          variant="gold"
          onClick={() => setSheet("withdraw")}
          disabled={invested <= 0}
          className="text-sm"
        >
          <ArrowUpFromLine className="h-4 w-4" /> Resgatar
        </Button3D>
      </div>

      {/* Separador para evitar toque acidental nos cards abaixo */}
      <div aria-hidden className="my-2 h-px bg-white/5" />

      {/* Meta de poupança */}
      <GoalPanel
        goal={goal}
        invested={invested}
        onOpen={() => setGoalSheet(true)}
      />

      {/* Simulador (atalho) */}
      <GlassPanel className="mt-4 p-4">
        <button
          onClick={() => setSimSheet(true)}
          className="flex w-full items-center gap-3 text-left"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-game-accent/15 text-game-accent">
            <Calculator className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <p className="text-sm text-foreground">Simulador</p>
            <p className="text-[11px] text-white/50">
              E se eu investir? Veja quanto renderia
            </p>
          </span>
          <span className="text-xs text-game-accent">Abrir →</span>
        </button>
      </GlassPanel>

      {/* Extrato */}
      <GlassPanel className="mt-4 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <Receipt className="h-4 w-4 text-game-gold" />
          <h2 className="font-display text-sm uppercase tracking-wider text-foreground">
            Extrato
          </h2>
          <span className="ml-auto text-[10px] uppercase tracking-wider text-white/40">
            {transactions.length} {transactions.length === 1 ? "movimento" : "movimentos"}
          </span>
        </div>
        {transactions.length === 0 ? (
          <p className="px-4 py-6 text-center text-xs text-white/50">
            Nenhum movimento ainda. Faça seu primeiro investimento!
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {transactions.slice(0, 15).map((tx) => (
              <TxRow key={tx.id} tx={tx} />
            ))}
          </ul>
        )}
      </GlassPanel>

      {/* Educativo */}
      <GlassPanel className="mt-4 p-4">
        <p className="text-[11px] uppercase tracking-wider text-game-gold">
          Você sabia?
        </p>
        <p className="mt-1 text-sm text-white/80">
          <strong>CDB</strong> é como emprestar dinheiro pro banco. Em troca,
          ele te paga juros todos os dias. Quanto mais tempo você deixa,
          maior o rendimento — isso é o famoso{" "}
          <span className="text-game-neon">juros compostos</span>.
        </p>
      </GlassPanel>

      {/* Dev shortcut: avança 7 dias */}
      {import.meta.env.DEV && (
        <button
          onClick={() => devFastForwardDays(7)}
          className="mt-3 w-full rounded-lg border border-dashed border-white/15 px-3 py-2 text-[11px] uppercase tracking-wider text-white/40 hover:text-white/70"
        >
          [dev] avançar 7 dias
        </button>
      )}

      {sheet && (
        <ActionSheet
          mode={sheet}
          balance={balance}
          invested={invested}
          prefill={sheet === "deposit" ? depositPrefill : undefined}
          onClose={() => {
            setSheet(null);
            setDepositPrefill(undefined);
          }}
        />
      )}

      {goalSheet && (
        <GoalSheet goal={goal} onClose={() => setGoalSheet(false)} />
      )}

      {simSheet && (
        <SimulatorSheet
          maxAmount={balance}
          onInvest={(v) => {
            setSimSheet(false);
            openDeposit(v);
          }}
          onClose={() => setSimSheet(false)}
        />
      )}

      {onboarding && (
        <CofrinhoOnboarding onClose={() => setOnboarding(false)} />
      )}
    </Screen>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-2.5 text-center">
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`font-display text-base leading-tight tabular-nums ${accent}`}>
        {value}
      </p>
    </div>
  );
}

const txDateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function TxRow({ tx }: { tx: WalletTx }) {
  const meta = (() => {
    if (tx.type === "deposit")
      return {
        icon: <ArrowDownToLine className="h-4 w-4" />,
        label: "Investimento",
        sign: "+",
        color: "text-game-neon",
        bg: "bg-game-neon/15",
        valueColor: "text-game-neon",
      };
    if (tx.type === "withdraw")
      return {
        icon: <ArrowUpFromLine className="h-4 w-4" />,
        label: "Resgate",
        sign: "-",
        color: "text-destructive",
        bg: "bg-destructive/15",
        valueColor: "text-destructive",
      };
    return {
      icon: <BadgePercent className="h-4 w-4" />,
      label: "Rendimento",
      sign: "+",
      color: "text-game-gold",
      bg: "bg-game-gold/15",
      valueColor: "text-game-gold",
    };
  })();

  return (
    <li className="flex items-center gap-3 px-4 py-2.5">
      <span className={`grid h-8 w-8 place-items-center rounded-full ${meta.bg} ${meta.color}`}>
        {meta.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-tight text-foreground">{meta.label}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/40">
          {txDateFmt.format(tx.at)}
        </p>
      </div>
      <span className={`font-display text-sm tabular-nums ${meta.valueColor}`}>
        {meta.sign}
        {fmt(tx.amount)}
      </span>
    </li>
  );
}

function ActionSheet({
  mode,
  balance,
  invested,
  prefill,
  onClose,
}: {
  mode: "deposit" | "withdraw";
  balance: number;
  invested: number;
  prefill?: number;
  onClose: () => void;
}) {
  const max = mode === "deposit" ? Math.floor(balance) : Math.floor(invested);
  const [value, setValue] = useState<string>(
    prefill && prefill > 0 ? String(Math.min(Math.floor(prefill), max)) : "",
  );
  const [error, setError] = useState<string | null>(null);

  const numeric = Number(value) || 0;
  const lost = mode === "withdraw" && numeric > 0 ? lostYieldEstimate(numeric, 30) : 0;

  const submit = () => {
    setError(null);
    try {
      if (mode === "deposit") {
        wallet.deposit(numeric);
        playSfx("deposit");
      } else {
        wallet.withdraw(numeric);
        playSfx("withdraw");
      }
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro");
    }
  };

  const setPct = (pct: number) => setValue(String(Math.floor((max * pct) / 100)));

  const title = mode === "deposit" ? "Investir Star Coins" : "Resgatar Star Coins";
  const cta = mode === "deposit" ? "Confirmar investimento" : "Resgatar agora";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl border-t border-white/10 bg-game-purple p-5 pb-8 shadow-[0_-20px_60px_-20px_oklch(0_0_0/0.8)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg text-foreground">{title}</h2>
          <CloseX onClick={onClose} />
        </div>

        <p className="text-xs text-white/60">
          Disponível:{" "}
          <span className="font-display text-foreground">{fmt(max)} {coinLabel(max)}</span>
        </p>

        <div className="mt-3">
          <input
            type="number"
            inputMode="numeric"
            min={mode === "deposit" ? MIN_DEPOSIT : 1}
            max={max}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center font-display text-2xl tabular-nums text-foreground outline-none focus:border-game-neon"
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((p) => (
            <button
              key={p}
              onClick={() => setPct(p)}
              className="rounded-lg border border-white/10 bg-black/30 py-1.5 text-xs text-white/80 hover:border-game-gold/40"
            >
              {p}%
            </button>
          ))}
        </div>

        {mode === "withdraw" && numeric > 0 && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-game-gold/30 bg-game-gold/10 px-3 py-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-game-gold" />
            <p className="text-xs text-white/80">
              Você deixará de ganhar{" "}
              <span className="font-display text-game-gold">~{fmt(lost)} {coinLabel(lost)}</span>{" "}
              nos próximos 30 dias.
            </p>
          </div>
        )}

        {mode === "deposit" && (
          <p className="mt-3 text-[11px] text-white/50">
            Mínimo {MIN_DEPOSIT} {coinLabel(MIN_DEPOSIT)} · rende {(DAILY_RATE * 100).toFixed(1)}%/dia
          </p>
        )}

        {error && (
          <p className="mt-3 text-xs text-destructive">{error}</p>
        )}

        <Button3D
          variant={mode === "deposit" ? "neon" : "gold"}
          onClick={submit}
          disabled={numeric <= 0}
          className="mt-4 w-full"
        >
          {cta}
        </Button3D>
      </div>
    </div>
  );
}

function GoalPanel({
  goal,
  invested,
  onOpen,
}: {
  goal: WalletGoal | undefined;
  invested: number;
  onOpen: () => void;
}) {
  const [celebrated, setCelebrated] = useState(false);
  const reached = !!goal && invested >= goal.amount;
  const prevReachedRef = useRef(reached);
  useEffect(() => {
    if (reached && !prevReachedRef.current) {
      setCelebrated(true);
      const t = setTimeout(() => setCelebrated(false), 2800);
      return () => clearTimeout(t);
    }
    prevReachedRef.current = reached;
  }, [reached]);

  if (!goal) {
    return (
      <GlassPanel className="mt-4 p-4">
        <button
          onClick={onOpen}
          className="flex w-full items-center gap-3 text-left"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-game-gold/15 text-game-gold">
            <Target className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <p className="text-sm text-foreground">Definir minha meta</p>
            <p className="text-[11px] text-white/50">
              Escolha um objetivo e acompanhe o progresso
            </p>
          </span>
          <span className="text-xs text-game-gold">Criar →</span>
        </button>
      </GlassPanel>
    );
  }

  const pct = Math.min(100, (invested / goal.amount) * 100);
  const remaining = Math.max(0, goal.amount - invested);
  const dailyYield = projectedDailyYield(invested);
  const etaDays =
    remaining > 0 && dailyYield > 0
      ? Math.ceil(remaining / dailyYield)
      : null;

  return (
    <>
      {celebrated && <Confetti count={60} />}
      <GlassPanel className="mt-4 p-4">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-10 w-10 place-items-center rounded-full ${
              reached ? "bg-game-gold/20 text-game-gold" : "bg-game-neon/15 text-game-neon"
            }`}
          >
            {reached ? <Trophy className="h-5 w-5" /> : <Target className="h-5 w-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-foreground">
              {goal.label || "Minha meta"}
            </p>
            <p className="text-[11px] text-white/50 tabular-nums">
              {fmt(invested)} / {fmt(goal.amount)} {coinLabel(goal.amount)}
            </p>
          </div>
          <button
            onClick={onOpen}
            aria-label="Editar meta"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/40">
          <div
            className={`h-full rounded-full transition-all ${
              reached
                ? "bg-gradient-to-r from-game-gold to-game-accent"
                : "bg-gradient-to-r from-game-neon to-game-accent"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className={reached ? "text-game-gold" : "text-game-neon"}>
            {pct.toFixed(0)}%{reached && " · meta atingida! 🎉"}
          </span>
          {!reached && etaDays !== null && (
            <span className="text-white/50">
              ~{etaDays} {etaDays === 1 ? "dia" : "dias"} no ritmo atual
            </span>
          )}
          {!reached && etaDays === null && (
            <span className="text-white/40">invista pra ver o ritmo</span>
          )}
        </div>
      </GlassPanel>
    </>
  );
}

function GoalSheet({
  goal,
  onClose,
}: {
  goal: WalletGoal | undefined;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState<string>(goal ? String(goal.amount) : "");
  const [label, setLabel] = useState<string>(goal?.label ?? "");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    setError(null);
    try {
      wallet.setGoal(Number(amount) || 0, label);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro");
    }
  };

  const remove = () => {
    wallet.clearGoal();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Definir meta"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl border-t border-white/10 bg-game-purple p-5 pb-8 shadow-[0_-20px_60px_-20px_oklch(0_0_0/0.8)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg text-foreground">
            {goal ? "Editar meta" : "Definir minha meta"}
          </h2>
          <CloseX onClick={onClose} />
        </div>

        <label className="block text-[11px] uppercase tracking-wider text-white/50">
          Pra que é? (opcional)
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          maxLength={40}
          placeholder="Ex: comprar item da Loja"
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-foreground outline-none focus:border-game-gold"
        />

        <label className="mt-3 block text-[11px] uppercase tracking-wider text-white/50">
          Valor da meta (Star Coins)
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center font-display text-2xl tabular-nums text-foreground outline-none focus:border-game-neon"
        />

        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

        <Button3D
          variant="neon"
          onClick={submit}
          disabled={!Number(amount)}
          className="mt-4 w-full"
        >
          {goal ? "Salvar meta" : "Criar meta"}
        </Button3D>

        {goal && (
          <button
            onClick={remove}
            className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs text-white/50 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remover meta
          </button>
        )}
      </div>
    </div>
  );
}

const SIM_DAYS = [7, 30, 90, 180, 365] as const;

function SimulatorSheet({
  maxAmount,
  onInvest,
  onClose,
}: {
  maxAmount: number;
  onInvest: (value: number) => void;
  onClose: () => void;
}) {
  const cap = Math.max(100, Math.floor(maxAmount));
  const [amount, setAmount] = useState<number>(Math.min(500, cap));
  const [days, setDays] = useState<number>(30);

  const projected = amount * (1 + DAILY_RATE) ** days;
  const gain = projected - amount;
  const pct = amount > 0 ? (gain / amount) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Simulador"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl border-t border-white/10 bg-game-purple p-5 pb-8 shadow-[0_-20px_60px_-20px_oklch(0_0_0/0.8)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-game-accent" />
            <h2 className="font-display text-lg text-foreground">
              Simulador
            </h2>
          </div>
          <CloseX onClick={onClose} />
        </div>
        <p className="text-[11px] text-white/50">
          Brinque com os valores e veja quanto seu dinheiro renderia.
        </p>

      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-wider text-white/50">
            Valor
          </span>
          <span className="font-display text-lg tabular-nums text-game-neon">
            {fmt(amount)} <span className="text-xs text-white/50">{coinLabel(amount)}</span>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={cap}
          step={50}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 w-full accent-game-neon"
        />
      </div>

      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wider text-white/50">
          Por quanto tempo?
        </p>
        <div className="mt-1 grid grid-cols-5 gap-1.5">
          {SIM_DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-lg border py-1.5 text-xs transition ${
                d === days
                  ? "border-game-accent bg-game-accent/15 text-game-accent"
                  : "border-white/10 bg-black/30 text-white/70 hover:border-white/30"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Resumo da projeção */}
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <div className="border-b border-white/10 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-white/50">
            Resumo da projeção · {days} {days === 1 ? "dia" : "dias"}
          </p>
        </div>
        <dl className="divide-y divide-white/5 text-sm">
          <div className="flex items-center justify-between px-3 py-2">
            <dt className="text-white/60">Valor inicial</dt>
            <dd className="font-display tabular-nums text-foreground">
              {fmt(amount)} <span className="text-xs text-white/50">{coinLabel(amount)}</span>
            </dd>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <dt className="text-white/60">Rendimento estimado</dt>
            <dd className="font-display tabular-nums text-game-gold">
              +{fmt(gain)}{" "}
              <span className="text-xs text-white/50">({pct.toFixed(2)}%)</span>
            </dd>
          </div>
          <div className="flex items-center justify-between bg-game-neon/5 px-3 py-2.5">
            <dt className="text-foreground">Valor final</dt>
            <dd className="font-display text-lg tabular-nums text-game-neon">
              {fmt(projected)} <span className="text-xs text-white/50">{coinLabel(projected)}</span>
            </dd>
          </div>
        </dl>
        <div className="flex items-start gap-2 border-t border-white/10 bg-game-gold/5 px-3 py-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-game-gold" />
          <p className="text-[11px] leading-snug text-white/60">
            Apenas uma projeção estimada com base na taxa atual de{" "}
            {(DAILY_RATE * 100).toFixed(1)}%/dia. O rendimento real pode variar.
          </p>
        </div>
      </div>

      <Button3D
        variant="neon"
        onClick={() => onInvest(amount)}
        disabled={amount < MIN_DEPOSIT || amount > Math.floor(maxAmount)}
        className="mt-3 w-full text-sm"
      >
        <ArrowDownToLine className="h-4 w-4" /> Investir {fmt(amount)} agora
      </Button3D>
      </div>
    </div>
  );
}