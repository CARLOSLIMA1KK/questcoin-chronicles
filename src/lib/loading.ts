import { useSyncExternalStore } from "react";

type State = { count: number; visible: boolean; label: string | null };

const MIN_DELAY = 150;
const MIN_VISIBLE = 300;

let state: State = { count: 0, visible: false, label: null };
const listeners = new Set<() => void>();
let showTimer: ReturnType<typeof setTimeout> | null = null;
let shownAt: number | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function emit() {
  for (const l of listeners) l();
}

function setState(next: Partial<State>) {
  state = { ...state, ...next };
  emit();
}

function maybeShow(label: string | null) {
  if (showTimer || state.visible) {
    if (label) setState({ label });
    return;
  }
  showTimer = setTimeout(() => {
    showTimer = null;
    if (state.count > 0) {
      shownAt = Date.now();
      setState({ visible: true, label });
    }
  }, MIN_DELAY);
}

function maybeHide() {
  if (state.count > 0) return;
  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
    return;
  }
  if (!state.visible) return;
  const elapsed = shownAt ? Date.now() - shownAt : MIN_VISIBLE;
  const remaining = Math.max(0, MIN_VISIBLE - elapsed);
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    hideTimer = null;
    shownAt = null;
    setState({ visible: false, label: null });
  }, remaining);
}

export function showLoader(label?: string) {
  setState({ count: state.count + 1 });
  maybeShow(label ?? state.label ?? null);
}

export function hideLoader() {
  setState({ count: Math.max(0, state.count - 1) });
  maybeHide();
}

export async function withLoading<T>(p: Promise<T> | (() => Promise<T>), label?: string): Promise<T> {
  showLoader(label);
  try {
    return await (typeof p === "function" ? p() : p);
  } finally {
    hideLoader();
  }
}

export function setRouteLoading(active: boolean, label?: string) {
  if (active) {
    if (state.count === 0) showLoader(label);
  } else {
    if (state.count > 0) hideLoader();
  }
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return state;
}

export function useLoading() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}