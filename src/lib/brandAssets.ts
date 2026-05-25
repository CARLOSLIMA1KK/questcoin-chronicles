// Central de assets de marca FORME / Astrodin.
// Para trocar pelas artes oficiais do cliente: substitua o arquivo em
// src/assets/ mantendo o mesmo nome OU troque o import abaixo.
// Veja docs em README.md → "Trocar artes oficiais".

import astrodinHero from "@/assets/astrodin-hero-v2.png";
import astrodinAvatar from "@/assets/astrodin-avatar-v2.png";
import astrodinHappy from "@/assets/astrodin-happy-v2.png";
import astrodinSad from "@/assets/astrodin-sad-v2.png";
import astrodinThinking from "@/assets/astrodin-thinking-v2.png";
import astrodinRocket from "@/assets/astrodin-rocket-v2.png";

import worldBomSenso from "@/assets/world-bom-senso-v3.png";
import worldMesada from "@/assets/world-mesada-v3.png";
import worldJuros from "@/assets/world-juros-v3.png";
import worldConsumidor from "@/assets/world-consumidor-v3.png";
import worldMetas from "@/assets/world-metas-v3.png";
import worldCartao from "@/assets/world-cartao-v3.png";

import starCoin from "@/assets/k-coin-v2.png";

import cadete1 from "@/assets/avatar-cadete-1.png";
import cadete2 from "@/assets/avatar-cadete-2.png";
import cadete3 from "@/assets/avatar-cadete-3.png";
import cadete4 from "@/assets/avatar-cadete-4.png";
import cadete5 from "@/assets/avatar-cadete-5.png";
import cadete6 from "@/assets/avatar-cadete-6.png";

export const ASTRODIN = {
  hero: astrodinHero,
  avatar: astrodinAvatar,
  happy: astrodinHappy,
  sad: astrodinSad,
  thinking: astrodinThinking,
  rocket: astrodinRocket,
} as const;

export const WORLDS_ART = {
  bomSenso: worldBomSenso,
  mesada: worldMesada,
  juros: worldJuros,
  consumidor: worldConsumidor,
  metas: worldMetas,
  cartao: worldCartao,
} as const;

export const CURRENCY_ICON = starCoin;
export const CURRENCY_NAME = "Star Coin";
export const CURRENCY_NAME_PLURAL = "Star Coins";

/** Retorna "Star Coin" no singular (n === 1) ou "Star Coins" no plural. */
export function coinLabel(n: number): string {
  return Math.abs(n) === 1 ? CURRENCY_NAME : CURRENCY_NAME_PLURAL;
}

export const STUDENT_AVATARS: string[] = [
  cadete1,
  cadete2,
  cadete3,
  cadete4,
  cadete5,
  cadete6,
];

/** Sorteia um avatar de cadete de forma estável por id. */
export function avatarForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const idx = Math.abs(hash) % STUDENT_AVATARS.length;
  return STUDENT_AVATARS[idx];
}
