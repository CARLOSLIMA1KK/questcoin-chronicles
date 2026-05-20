import { Flame, Shield, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DailyMission = {
  id: string;
  title: string;
  reward: string;
  icon: LucideIcon;
  accent: "neon" | "gold" | "accent";
};

export const DAILY_MISSIONS: DailyMission[] = [
  { id: "daily-1", title: "Complete 1 fase hoje", reward: "+50 Star Coin", icon: Target, accent: "gold" },
  { id: "daily-2", title: "Acerte 5 perguntas seguidas", reward: "+1 Escudo", icon: Shield, accent: "neon" },
  { id: "daily-3", title: "Mantenha o streak", reward: "+30 Star Coin", icon: Flame, accent: "accent" },
];