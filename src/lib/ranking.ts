import { usePlayer, type Player } from "./player";

export type RankedPlayer = {
  id: string;
  name: string;
  school: string;
  classCode: string;
  xp: number;
  phasesCompleted: number;
  totalInvested: number;
  totalEarned: number;
  streakDays: number;
  isMe?: boolean;
};

export type Scope = "turma" | "escola" | "geral";

export function computeScore(p: Pick<RankedPlayer, "xp" | "phasesCompleted" | "totalInvested" | "totalEarned" | "streakDays">) {
  return Math.round(
    p.xp * 1 +
      p.phasesCompleted * 50 +
      p.totalInvested * 0.5 +
      p.totalEarned * 2 +
      p.streakDays * 20,
  );
}

const MOCK_PLAYERS: RankedPlayer[] = [
  // Turma TIMB-7A (do jogador)
  { id: "p1", name: "Ana Beatriz", school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 920, phasesCompleted: 28, totalInvested: 1450, totalEarned: 320, streakDays: 14 },
  { id: "p2", name: "João Pedro",  school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 780, phasesCompleted: 24, totalInvested: 980,  totalEarned: 210, streakDays: 11 },
  { id: "p3", name: "Marina Souza",school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 610, phasesCompleted: 22, totalInvested: 1100, totalEarned: 180, streakDays: 9 },
  { id: "p4", name: "Pedro Alves", school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 540, phasesCompleted: 19, totalInvested: 720,  totalEarned: 95,  streakDays: 7 },
  { id: "p5", name: "Sofia Mendes",school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 480, phasesCompleted: 17, totalInvested: 540,  totalEarned: 60,  streakDays: 5 },
  { id: "p6", name: "Lucas Rocha", school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 410, phasesCompleted: 15, totalInvested: 380,  totalEarned: 40,  streakDays: 4 },
  { id: "p7", name: "Helena Dias", school: "E.E. Timbaúba", classCode: "TIMB-7A", xp: 320, phasesCompleted: 12, totalInvested: 220,  totalEarned: 18,  streakDays: 3 },
  { id: "p8", name: "Gabriel Nunes",school:"E.E. Timbaúba", classCode: "TIMB-7A", xp: 220, phasesCompleted: 8,  totalInvested: 90,   totalEarned: 6,   streakDays: 2 },

  // Turma TIMB-7B (mesma escola)
  { id: "p9",  name: "Rafaela Lima", school: "E.E. Timbaúba", classCode: "TIMB-7B", xp: 850, phasesCompleted: 26, totalInvested: 1320, totalEarned: 280, streakDays: 12 },
  { id: "p10", name: "Diego Martins",school: "E.E. Timbaúba", classCode: "TIMB-7B", xp: 700, phasesCompleted: 23, totalInvested: 880,  totalEarned: 160, streakDays: 10 },
  { id: "p11", name: "Camila Reis",  school: "E.E. Timbaúba", classCode: "TIMB-7B", xp: 560, phasesCompleted: 20, totalInvested: 640,  totalEarned: 95,  streakDays: 8 },
  { id: "p12", name: "Bruno Castro", school: "E.E. Timbaúba", classCode: "TIMB-7B", xp: 430, phasesCompleted: 16, totalInvested: 400,  totalEarned: 50,  streakDays: 6 },
  { id: "p13", name: "Larissa Ramos",school: "E.E. Timbaúba", classCode: "TIMB-7B", xp: 300, phasesCompleted: 11, totalInvested: 200,  totalEarned: 14,  streakDays: 3 },

  // Escola Recife — Turma REC-8A
  { id: "p14", name: "Mateus Lopes", school: "C.E. Recife",   classCode: "REC-8A",  xp: 980, phasesCompleted: 30, totalInvested: 1600, totalEarned: 380, streakDays: 16 },
  { id: "p15", name: "Júlia Ferraz", school: "C.E. Recife",   classCode: "REC-8A",  xp: 870, phasesCompleted: 27, totalInvested: 1280, totalEarned: 260, streakDays: 13 },
  { id: "p16", name: "Thiago Brito", school: "C.E. Recife",   classCode: "REC-8A",  xp: 720, phasesCompleted: 23, totalInvested: 940,  totalEarned: 175, streakDays: 11 },
  { id: "p17", name: "Beatriz Cunha",school: "C.E. Recife",   classCode: "REC-8A",  xp: 590, phasesCompleted: 20, totalInvested: 700,  totalEarned: 110, streakDays: 8 },
  { id: "p18", name: "Felipe Aragão",school: "C.E. Recife",   classCode: "REC-8A",  xp: 460, phasesCompleted: 17, totalInvested: 460,  totalEarned: 55,  streakDays: 6 },
  { id: "p19", name: "Isabela Moura",school: "C.E. Recife",   classCode: "REC-8A",  xp: 350, phasesCompleted: 13, totalInvested: 260,  totalEarned: 22,  streakDays: 4 },

  // Escola Recife — Turma REC-8B
  { id: "p20", name: "Caio Barbosa", school: "C.E. Recife",   classCode: "REC-8B",  xp: 810, phasesCompleted: 25, totalInvested: 1180, totalEarned: 230, streakDays: 12 },
  { id: "p21", name: "Vitória Pires",school: "C.E. Recife",   classCode: "REC-8B",  xp: 670, phasesCompleted: 21, totalInvested: 820,  totalEarned: 140, streakDays: 9 },
  { id: "p22", name: "André Silva",  school: "C.E. Recife",   classCode: "REC-8B",  xp: 520, phasesCompleted: 18, totalInvested: 580,  totalEarned: 80,  streakDays: 7 },
  { id: "p23", name: "Luana Teixeira",school:"C.E. Recife",   classCode: "REC-8B",  xp: 380, phasesCompleted: 14, totalInvested: 320,  totalEarned: 30,  streakDays: 5 },
  { id: "p24", name: "Renato Faria", school: "C.E. Recife",   classCode: "REC-8B",  xp: 250, phasesCompleted: 10, totalInvested: 150,  totalEarned: 10,  streakDays: 2 },
];

function playerToRanked(p: Player): RankedPlayer {
  return {
    id: "me",
    name: p.name,
    school: p.school,
    classCode: p.classCode,
    xp: p.xp,
    phasesCompleted: p.phasesCompleted,
    totalInvested: p.totalInvested,
    totalEarned: p.totalEarned,
    streakDays: p.streakDays,
    isMe: true,
  };
}

export type RankingResult = {
  top: Array<RankedPlayer & { score: number; position: number }>;
  me: { score: number; position: number; total: number; deltaToNext: number | null };
};

export function useRanking(scope: Scope): RankingResult {
  const player = usePlayer();
  const me = playerToRanked(player);

  let pool: RankedPlayer[] = [me, ...MOCK_PLAYERS];
  if (scope === "turma") pool = pool.filter((p) => p.classCode === me.classCode);
  else if (scope === "escola") pool = pool.filter((p) => p.school === me.school);

  const ranked = pool
    .map((p) => ({ ...p, score: computeScore(p) }))
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, position: i + 1 }));

  const myEntry = ranked.find((p) => p.isMe)!;
  const above = ranked[myEntry.position - 2];
  const deltaToNext = above ? above.score - myEntry.score + 1 : null;

  return {
    top: ranked.slice(0, 10),
    me: {
      score: myEntry.score,
      position: myEntry.position,
      total: ranked.length,
      deltaToNext,
    },
  };
}

export function getMonthInfo() {
  const now = new Date();
  const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const label = `${months[now.getMonth()]}/${now.getFullYear()}`;
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = Math.max(0, lastDay - now.getDate());
  return { label, daysLeft };
}