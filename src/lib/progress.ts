import { useCallback, useSyncExternalStore } from "react";
import { WORLDS, type Stage } from "./curriculum";

const KEY = "mf:progress:v2";
const MAX_SHIELDS = 3;
const LOCK_DURATION_MS = 60 * 60 * 1000; // 1h

export type StageStatus = "locked" | "available" | "current" | "completed";

type Persisted = {
  completed: string[];
  shields: number;
  lockUntil: number | null;
};

const DEFAULT: Persisted = { completed: [], shields: MAX_SHIELDS, lockUntil: null };

// ---------- Module-level store (single source of truth) ----------
let cache: Persisted = DEFAULT;
let initialized = false;
const listeners = new Set<() => void>();

function readFromStorage(): Persisted {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    const p = JSON.parse(raw) as Partial<Persisted>;
    return {
      completed: Array.isArray(p.completed) ? p.completed : [],
      shields: typeof p.shields === "number" ? p.shields : MAX_SHIELDS,
      lockUntil: typeof p.lockUntil === "number" ? p.lockUntil : null,
    };
  } catch {
    return DEFAULT;
  }
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  cache = readFromStorage();
  // Auto-clear expired lock on first read
  if (cache.lockUntil && cache.lockUntil <= Date.now()) {
    cache = { ...cache, lockUntil: null, shields: MAX_SHIELDS };
    persist(cache);
  }
  initialized = true;
}

function persist(p: Persisted) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

function setState(updater: (prev: Persisted) => Persisted) {
  ensureInit();
  const next = updater(cache);
  if (next === cache) return;
  cache = next;
  persist(next);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  ensureInit();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = readFromStorage();
      listeners.forEach((l) => l());
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function getSnapshot(): Persisted {
  ensureInit();
  return cache;
}

function getServerSnapshot(): Persisted {
  return DEFAULT;
}

// ---------- Hook ----------
export function useProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const completedSet = new Set(state.completed);
  const allStages: Stage[] = WORLDS.flatMap((w) => w.stages);

  const isPracticeUnlockedByPair = (stage: Stage): boolean => {
    if (stage.type !== "practice" || !stage.pairWith) return true;
    return completedSet.has(stage.pairWith);
  };

  const firstUncompletedIdx = allStages.findIndex((s) => !completedSet.has(s.id));

  const statusOf = (stage: Stage): StageStatus => {
    if (completedSet.has(stage.id)) return "completed";
    const idx = allStages.findIndex((s) => s.id === stage.id);
    if (idx === -1) return "locked";
    if (!isPracticeUnlockedByPair(stage)) return "locked";
    if (idx === firstUncompletedIdx) return "current";
    if (idx < firstUncompletedIdx) return "available";
    const allBeforeDone = allStages.slice(0, idx).every((s) => completedSet.has(s.id));
    return allBeforeDone ? "available" : "locked";
  };

  const worldProgress = (worldId: string) => {
    const world = WORLDS.find((w) => w.id === worldId);
    if (!world) return { done: 0, total: 0 };
    const done = world.stages.filter((s) => completedSet.has(s.id)).length;
    return { done, total: world.stages.length };
  };

  const complete = useCallback((stageId: string) => {
    setState((prev) => {
      if (prev.completed.includes(stageId)) return prev;
      return { ...prev, completed: [...prev.completed, stageId], shields: MAX_SHIELDS };
    });
  }, []);

  const loseShield = useCallback((): { shields: number; locked: boolean } => {
    let result = { shields: MAX_SHIELDS, locked: false };
    setState((prev) => {
      const newShields = Math.max(0, prev.shields - 1);
      const locked = newShields === 0;
      const next: Persisted = {
        ...prev,
        shields: locked ? 0 : newShields,
        lockUntil: locked ? Date.now() + LOCK_DURATION_MS : prev.lockUntil,
      };
      result = { shields: next.shields, locked };
      return next;
    });
    return result;
  }, []);

  const restoreShields = useCallback(() => {
    setState((prev) => ({ ...prev, shields: MAX_SHIELDS }));
  }, []);

  const reset = useCallback(() => {
    setState(() => ({ ...DEFAULT }));
  }, []);

  const isLocked = !!state.lockUntil && state.lockUntil > Date.now();

  return {
    completed: completedSet,
    shields: state.shields,
    maxShields: MAX_SHIELDS,
    lockUntil: state.lockUntil,
    isLocked,
    statusOf,
    worldProgress,
    complete,
    loseShield,
    restoreShields,
    reset,
  };
}

export const SHIELD_LOCK_DURATION_MS = LOCK_DURATION_MS;
