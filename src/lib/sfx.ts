import { useSyncExternalStore } from "react";

const STORAGE_KEY = "kappa.sfx.muted";

let muted = false;
if (typeof window !== "undefined") {
  try {
    muted = localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    /* ignore */
  }
}

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  return ctx;
}

type Note = {
  freq: number;
  start: number; // s
  dur: number; // s
  type?: OscillatorType;
  vol?: number; // 0-1
};

function playNotes(notes: Note[], masterVol = 0.35) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + 0.01;
  const master = ac.createGain();
  master.gain.value = masterVol;
  master.connect(ac.destination);
  for (const n of notes) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.value = n.freq;
    const start = t0 + n.start;
    const end = start + n.dur;
    const peak = (n.vol ?? 1) * 0.9;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.015, n.dur * 0.2));
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(g);
    g.connect(master);
    osc.start(start);
    osc.stop(end + 0.02);
  }
}

function playNoise(dur: number, freq = 800, q = 6, vol = 0.3) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + 0.01;
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(ac.destination);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

export type SfxName =
  | "correct"
  | "wrong"
  | "lessonComplete"
  | "victory"
  | "bossVictory"
  | "coin"
  | "deposit"
  | "withdraw";

const presets: Record<SfxName, () => void> = {
  // Bip duplo agudo
  correct: () =>
    playNotes([
      { freq: 880, start: 0, dur: 0.1, type: "triangle" },
      { freq: 1320, start: 0.08, dur: 0.16, type: "triangle" },
    ], 0.35),
  // Buzzer descendente
  wrong: () =>
    playNotes([
      { freq: 220, start: 0, dur: 0.18, type: "sawtooth", vol: 0.6 },
      { freq: 165, start: 0.12, dur: 0.22, type: "sawtooth", vol: 0.6 },
    ], 0.25),
  // Jingle de aula concluída
  lessonComplete: () =>
    playNotes([
      { freq: 523.25, start: 0, dur: 0.14, type: "triangle" }, // C5
      { freq: 659.25, start: 0.12, dur: 0.14, type: "triangle" }, // E5
      { freq: 783.99, start: 0.24, dur: 0.22, type: "triangle" }, // G5
    ], 0.32),
  // Fanfarra curta
  victory: () =>
    playNotes([
      { freq: 523.25, start: 0, dur: 0.12, type: "square", vol: 0.7 },
      { freq: 659.25, start: 0.1, dur: 0.12, type: "square", vol: 0.7 },
      { freq: 783.99, start: 0.2, dur: 0.12, type: "square", vol: 0.7 },
      { freq: 1046.5, start: 0.32, dur: 0.32, type: "square", vol: 0.8 },
    ], 0.28),
  // Fanfarra épica
  bossVictory: () =>
    playNotes([
      { freq: 392, start: 0, dur: 0.14, type: "square", vol: 0.7 },
      { freq: 523.25, start: 0.12, dur: 0.14, type: "square", vol: 0.7 },
      { freq: 659.25, start: 0.24, dur: 0.14, type: "square", vol: 0.7 },
      { freq: 783.99, start: 0.36, dur: 0.14, type: "square", vol: 0.8 },
      { freq: 1046.5, start: 0.5, dur: 0.5, type: "square", vol: 0.9 },
      { freq: 1318.5, start: 0.5, dur: 0.5, type: "triangle", vol: 0.6 },
    ], 0.3),
  // Moeda (estilo Mario)
  coin: () =>
    playNotes([
      { freq: 988, start: 0, dur: 0.08, type: "square" },
      { freq: 1318.5, start: 0.06, dur: 0.18, type: "square" },
    ], 0.3),
  // Depósito: cha-ching
  deposit: () => {
    playNotes([
      { freq: 660, start: 0, dur: 0.1, type: "triangle" },
      { freq: 880, start: 0.08, dur: 0.12, type: "triangle" },
      { freq: 1100, start: 0.18, dur: 0.22, type: "triangle" },
    ], 0.32);
    playNoise(0.08, 4000, 8, 0.12);
  },
  // Saque: queda suave
  withdraw: () =>
    playNotes([
      { freq: 660, start: 0, dur: 0.12, type: "triangle" },
      { freq: 494, start: 0.1, dur: 0.18, type: "triangle" },
    ], 0.28),
};

export function playSfx(name: SfxName) {
  if (muted) return;
  if (typeof window === "undefined") return;
  try {
    presets[name]();
  } catch {
    /* ignore */
  }
}

export function setSfxMuted(next: boolean) {
  muted = next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }
  emit();
}

export function toggleSfxMuted() {
  setSfxMuted(!muted);
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
function getSnapshot() {
  return muted;
}
function getServerSnapshot() {
  return false;
}

export function useSfxMuted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}