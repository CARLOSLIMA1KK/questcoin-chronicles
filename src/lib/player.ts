export type Player = {
  name: string;
  title: string;
  level: number;
  xp: number;
  xpToNext: number;
  coins: number;
  shields: number;
  maxShields: number;
  school: string;
  classCode: string;
  totalInvested: number;
  totalEarned: number;
  phasesCompleted: number;
  streakDays: number;
};

const MOCK_PLAYER: Player = {
  name: "Ana Beatriz",
  title: "Escola Timbaubense",
  level: 12,
  xp: 340,
  xpToNext: 500,
  coins: 1250,
  shields: 3,
  maxShields: 3,
  school: "E.E. Timbaúba",
  classCode: "TIMB-7A",
  totalInvested: 820,
  totalEarned: 145,
  phasesCompleted: 18,
  streakDays: 6,
};

export function usePlayer(): Player {
  return MOCK_PLAYER;
}
