import { useSyncExternalStore } from "react";

export const DAILY_RATE = 0.001; // 0.1% ao dia (CDB simulado)
export const MIN_DEPOSIT = 10;
const STORAGE_KEY = "kappa.wallet.v1";
const DAY_MS = 86_400_000;

export type WalletState = {
  balance: number;
  invested: number;
  lastAccrualAt: number;
  totalEarned: number;
  transactions: WalletTx[];
  goal?: WalletGoal;
};

export type WalletTxType = "deposit" | "withdraw" | "yield";

export type WalletTx = {
  id: string;
  type: WalletTxType;
  amount: number;
  at: number;
};

export type WalletGoal = {
  amount: number;
  label?: string;
  createdAt: number;
};

const MAX_TX = 50;

const initial: WalletState = {
  balance: 1250,
  invested: 0,
  lastAccrualAt: Date.now(),
  totalEarned: 0,
  transactions: [],
};

function load(): WalletState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<WalletState>;
    return {
      balance: Number(parsed.balance ?? initial.balance),
      invested: Number(parsed.invested ?? 0),
      lastAccrualAt: Number(parsed.lastAccrualAt ?? Date.now()),
      totalEarned: Number(parsed.totalEarned ?? 0),
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions.slice(0, MAX_TX) : [],
      goal: parsed.goal && typeof parsed.goal === "object" ? (parsed.goal as WalletGoal) : undefined,
    };
  } catch {
    return initial;
  }
}

let state: WalletState = load();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function setState(next: WalletState) {
  state = next;
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return initial;
}

/** Aplica rendimento composto pelos dias inteiros decorridos. Retorna ganho. */
function accrueState(s: WalletState, now = Date.now()): { next: WalletState; gained: number } {
  if (s.invested <= 0) {
    return { next: { ...s, lastAccrualAt: now }, gained: 0 };
  }
  const days = Math.floor((now - s.lastAccrualAt) / DAY_MS);
  if (days <= 0) return { next: s, gained: 0 };
  const factor = (1 + DAILY_RATE) ** days;
  const newInvested = s.invested * factor;
  const gained = newInvested - s.invested;
  const tx: WalletTx = {
    id: `${now}-y`,
    type: "yield",
    amount: round2(gained),
    at: now,
  };
  return {
    next: {
      ...s,
      invested: round2(newInvested),
      lastAccrualAt: s.lastAccrualAt + days * DAY_MS,
      totalEarned: round2(s.totalEarned + gained),
      transactions: [tx, ...s.transactions].slice(0, MAX_TX),
    },
    gained: round2(gained),
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function projectedDailyYield(invested: number) {
  return round2(invested * DAILY_RATE);
}

export function lostYieldEstimate(amount: number, days = 30) {
  // estimativa simples (juros simples) só para exibição
  return round2(amount * DAILY_RATE * days);
}

export const wallet = {
  get state() {
    return state;
  },
  accrue() {
    const { next, gained } = accrueState(state);
    if (gained > 0 || next.lastAccrualAt !== state.lastAccrualAt) setState(next);
    return gained;
  },
  deposit(amount: number) {
    const amt = Math.floor(amount);
    if (amt < MIN_DEPOSIT) throw new Error(`Mínimo ${MIN_DEPOSIT} K-Coin`);
    if (amt > state.balance) throw new Error("Saldo insuficiente");
    const { next } = accrueState(state);
    const tx: WalletTx = { id: `${Date.now()}-d`, type: "deposit", amount: amt, at: Date.now() };
    setState({
      ...next,
      balance: round2(next.balance - amt),
      invested: round2(next.invested + amt),
      lastAccrualAt: Date.now(),
      transactions: [tx, ...next.transactions].slice(0, MAX_TX),
    });
  },
  withdraw(amount: number) {
    const amt = Math.floor(amount);
    if (amt <= 0) throw new Error("Valor inválido");
    const { next } = accrueState(state);
    if (amt > next.invested) throw new Error("Investimento insuficiente");
    const tx: WalletTx = { id: `${Date.now()}-w`, type: "withdraw", amount: amt, at: Date.now() };
    setState({
      ...next,
      balance: round2(next.balance + amt),
      invested: round2(next.invested - amt),
      lastAccrualAt: Date.now(),
      transactions: [tx, ...next.transactions].slice(0, MAX_TX),
    });
  },
  reset() {
    setState({ ...initial, lastAccrualAt: Date.now() });
  },
  spend(amount: number, label?: string) {
    const amt = Math.floor(amount);
    if (amt <= 0) throw new Error("Valor inválido");
    if (amt > state.balance) throw new Error("Saldo insuficiente");
    const tx: WalletTx = { id: `${Date.now()}-s-${label ?? ""}`, type: "withdraw", amount: amt, at: Date.now() };
    setState({
      ...state,
      balance: round2(state.balance - amt),
      transactions: [tx, ...state.transactions].slice(0, MAX_TX),
    });
  },
  setGoal(amount: number, label?: string) {
    const amt = Math.floor(amount);
    if (amt <= 0) throw new Error("Valor inválido");
    setState({
      ...state,
      goal: {
        amount: amt,
        label: label?.trim() || undefined,
        createdAt: state.goal?.createdAt ?? Date.now(),
      },
    });
  },
  clearGoal() {
    const { goal: _g, ...rest } = state;
    setState({ ...rest });
  },
};

export function useWallet() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Para testes / dev: força ganho de N dias. */
export function devFastForwardDays(days: number) {
  setState({ ...state, lastAccrualAt: state.lastAccrualAt - days * DAY_MS });
  wallet.accrue();
}