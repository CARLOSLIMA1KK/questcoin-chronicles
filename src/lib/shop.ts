import shieldImg from "@/assets/shop-shield.webp";
import giftImg from "@/assets/shop-gift.webp";
import hintImg from "@/assets/shop-hint.webp";
import rocketImg from "@/assets/shop-rocket.png";

export type ShopItemId = "shield" | "gift-shield" | "hint" | "potion-xp";

export type ShopItem = {
  id: ShopItemId;
  name: string;
  description: string;
  price: number;
  image: string;
  needsFriend?: boolean;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "shield",
    name: "Escudo",
    description: "+1 escudo de proteção pra suas próximas fases.",
    price: 50,
    image: shieldImg,
  },
  {
    id: "gift-shield",
    name: "Presentear Escudo",
    description: "Mande um escudo pra um amigo da sua turma.",
    price: 60,
    image: giftImg,
    needsFriend: true,
  },
  {
    id: "hint",
    name: "Dica do Mestre",
    description: "Use numa pergunta difícil pra eliminar uma alternativa.",
    price: 40,
    image: hintImg,
  },
  {
    id: "potion-xp",
    name: "Foguete XP 2x",
    description: "Sua próxima fase rende o dobro de XP.",
    price: 120,
    image: rocketImg,
  },
];

export type Friend = { id: string; name: string };

export const MOCK_FRIENDS: Friend[] = [
  { id: "p1", name: "Ana Beatriz" },
  { id: "p2", name: "João Pedro" },
  { id: "p3", name: "Marina Souza" },
  { id: "p4", name: "Pedro Alves" },
  { id: "p5", name: "Sofia Mendes" },
];

export type ShopHistoryEntry = {
  id: string;
  itemId: ShopItemId;
  price: number;
  friendId?: string;
  friendName?: string;
  at: number;
};

const HISTORY_KEY = "kappa.shop.history";

export function appendHistory(entry: ShopHistoryEntry) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list: ShopHistoryEntry[] = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 50)));
  } catch {
    /* ignore */
  }
}