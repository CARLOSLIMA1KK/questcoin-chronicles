import { WORLDS_ART } from "./brandAssets";

const worldBomSenso = WORLDS_ART.bomSenso;
const worldMesada = WORLDS_ART.mesada;
const worldJuros = WORLDS_ART.juros;
const worldConsumidor = WORLDS_ART.consumidor;
const worldMetas = WORLDS_ART.metas;
const worldCartao = WORLDS_ART.cartao;

export type StageType = "content" | "practice" | "boss";

export type Stage = {
  id: string;
  worldId: string;
  index: number;
  type: StageType;
  title: string;
  description: string;
  bnccCode: string;
  /** id da fase de conteúdo correspondente (apenas para practice) */
  pairWith?: string;
  rewards: { xp: number; coins: number };
};

export type World = {
  id: string;
  index: number;
  name: string;
  axis: string;
  accent: "neon" | "gold" | "accent" | "purple";
  icon: string;
  stages: Stage[];
};

const REWARDS = {
  content: { xp: 15, coins: 20 },
  practice: { xp: 35, coins: 50 },
  boss: { xp: 100, coins: 150 },
} as const;

type StageDef = {
  type: StageType;
  title: string;
  description: string;
  bnccCode: string;
  pairWith?: string;
};

function makeStages(worldId: string, defs: StageDef[]): Stage[] {
  return defs.map((d, i) => ({
    id: `${worldId}-${i + 1}`,
    worldId,
    index: i + 1,
    type: d.type,
    title: d.title,
    description: d.description,
    bnccCode: d.bnccCode,
    pairWith: d.pairWith,
    rewards: REWARDS[d.type],
  }));
}

// MUNDO 1 — completo, em pares Conteúdo → Prática + Boss
const world1: StageDef[] = [
  { type: "content",  title: "Necessidade x Desejo", description: "O que é essencial e o que é supérfluo.", bnccCode: "EF06MA13" },
  { type: "practice", title: "Classifique os gastos", description: "5 itens: necessidade ou desejo?",         bnccCode: "EF06MA13", pairWith: "bom-senso-1" },
  { type: "content",  title: "Compra por impulso",   description: "Gatilhos emocionais e a regra das 24h.",   bnccCode: "EF06MA13" },
  { type: "practice", title: "Pausa antes de comprar", description: "5 cenários: comprar agora ou esperar?",  bnccCode: "EF06MA13", pairWith: "bom-senso-3" },
  { type: "content",  title: "Propaganda e persuasão", description: "Como anúncios criam desejos.",           bnccCode: "EF07LP14" },
  { type: "practice", title: "Cace o apelo",          description: "5 anúncios — qual gatilho está em uso?",  bnccCode: "EF07LP14", pairWith: "bom-senso-5" },
  { type: "content",  title: "Lista de prioridades",  description: "Como montar uma lista consciente.",       bnccCode: "EF06MA14" },
  { type: "practice", title: "Monte sua lista",       description: "Escolha 5 itens dentro do orçamento.",    bnccCode: "EF06MA14", pairWith: "bom-senso-7" },
  { type: "content",  title: "Comparação no mercado", description: "Preço por unidade, marca x genérico.",    bnccCode: "EF06MA14" },
  { type: "practice", title: "Carrinho consciente",   description: "5 escolhas entre dois produtos.",         bnccCode: "EF06MA14", pairWith: "bom-senso-9" },
  { type: "boss",     title: "Mestre do Bom Senso",   description: "8 perguntas misturadas. Cuidado com o tempo!", bnccCode: "EF06MA14" },
];

// Mundos 2-6 — convertidos: quiz→content, challenge→practice. Ordem alternada quando possível.
type LegacyDef = { kind: "q" | "c"; title: string; desc: string; bncc: string };

function buildPaired(worldId: string, items: LegacyDef[], bossTitle: string, bossDesc: string, bossBncc: string): StageDef[] {
  const defs: StageDef[] = [];
  let lastContentIndex: number | null = null;
  items.forEach((it) => {
    if (it.kind === "q") {
      defs.push({ type: "content", title: it.title, description: it.desc, bnccCode: it.bncc });
      lastContentIndex = defs.length; // 1-based
    } else {
      const pair = lastContentIndex ? `${worldId}-${lastContentIndex}` : undefined;
      defs.push({ type: "practice", title: it.title, description: it.desc, bnccCode: it.bncc, pairWith: pair });
    }
  });
  defs.push({ type: "boss", title: bossTitle, description: bossDesc, bnccCode: bossBncc });
  return defs;
}

const world2 = buildPaired("mesada", [
  { kind: "q", title: "O que é orçamento?", desc: "Entradas, saídas e saldo.", bncc: "EF07MA02" },
  { kind: "c", title: "Divida sua mesada",  desc: "Distribua R$100 entre poupar, gastar e doar.", bncc: "EF07MA02" },
  { kind: "q", title: "Gastos fixos x variáveis", desc: "Classifique despesas comuns.", bncc: "EF07MA02" },
  { kind: "c", title: "Mês fechado", desc: "Equilibre o orçamento de uma família.", bncc: "EF08MA04" },
  { kind: "q", title: "Imprevistos", desc: "Por que ter uma reserva?", bncc: "EF08MA04" },
], "Senhor do Orçamento", "Feche um mês inteiro no positivo.", "EF08MA04");

const world3 = buildPaired("juros", [
  { kind: "q", title: "O que são juros?", desc: "Conceito básico de juros.", bncc: "EF08MA04" },
  { kind: "q", title: "Juros simples", desc: "Cálculo direto.", bncc: "EF08MA04" },
  { kind: "c", title: "Parcelar ou à vista?", desc: "Compare o custo total.", bncc: "EF09MA05" },
  { kind: "q", title: "Juros compostos", desc: "A bola de neve da dívida.", bncc: "EM13MAT104" },
  { kind: "c", title: "Saindo do vermelho", desc: "Plano para quitar uma dívida.", bncc: "EM13MAT104" },
  { kind: "q", title: "CET — custo efetivo total", desc: "O que entra na taxa real.", bncc: "EM13MAT104" },
], "Dragão dos Juros", "Vença a dívida no menor tempo.", "EM13MAT104");

const world4 = buildPaired("consumidor", [
  { kind: "q", title: "O que é empreender?", desc: "Mentalidade e atitude empreendedora.", bncc: "EF09GE03" },
  { kind: "q", title: "Identificando oportunidades", desc: "Como enxergar problemas como negócio.", bncc: "EF09GE03" },
  { kind: "c", title: "Sua primeira ideia", desc: "Monte um mini plano de negócio.", bncc: "EF09LP10" },
  { kind: "q", title: "Custos x preço de venda", desc: "Como precificar para ter lucro.", bncc: "EF08MA04" },
  { kind: "c", title: "Cliente em primeiro lugar", desc: "Conquiste e fidelize clientes.", bncc: "EF09LP10" },
], "Jovem Empreendedor", "Resolva 5 desafios seguidos.", "EF09LP10");

const world5 = buildPaired("metas", [
  { kind: "q", title: "Metas SMART", desc: "Como definir um objetivo.", bncc: "EF09MA05" },
  { kind: "c", title: "Sonho do videogame", desc: "Quanto poupar por mês para alcançar.", bncc: "EF09MA05" },
  { kind: "q", title: "Curto x longo prazo", desc: "Diferentes horizontes.", bncc: "EM13MAT104" },
  { kind: "c", title: "Cofre digital", desc: "Distribua aportes em metas.", bncc: "EM13MAT104" },
  { kind: "q", title: "Rendimento", desc: "Por que poupar rende mais com tempo.", bncc: "EM13MAT104" },
], "Guardião das Metas", "Atinja 3 metas no mesmo ano.", "EM13MAT104");

const world6 = buildPaired("cartao", [
  { kind: "q", title: "Débito x crédito", desc: "Quando usar cada um.", bncc: "EF09MA05" },
  { kind: "q", title: "Como funciona a fatura", desc: "Ciclo, vencimento e mínimo.", bncc: "EF09MA05" },
  { kind: "c", title: "Pix seguro", desc: "Identifique golpes comuns.", bncc: "EF09LP10" },
  { kind: "q", title: "Rotativo do cartão", desc: "A pior dívida do Brasil.", bncc: "EM13MAT104" },
  { kind: "c", title: "Limite saudável", desc: "Defina um limite que cabe no orçamento.", bncc: "EM13MAT104" },
  { kind: "q", title: "Pontos e cashback", desc: "Vale a pena?", bncc: "EM13MAT104" },
], "Imperador do Plástico", "Use o cartão sem cair em armadilhas.", "EM13MAT104");

export const WORLDS: World[] = [
  { id: "bom-senso", index: 1, name: "Lua do Bom Senso",        axis: "Necessidade × Desejo / Consumo Consciente", accent: "neon",   icon: worldBomSenso,  stages: makeStages("bom-senso", world1) },
  { id: "mesada",    index: 2, name: "Planeta Mesada",          axis: "Planejamento e Orçamento Pessoal",         accent: "gold",   icon: worldMesada,    stages: makeStages("mesada", world2) },
  { id: "juros",     index: 3, name: "Buraco Negro das Dívidas", axis: "Juros, Dívida e Crédito",                  accent: "accent", icon: worldJuros,     stages: makeStages("juros", world3) },
  { id: "consumidor",index: 4, name: "Constelação Empreender",   axis: "Empreendedorismo e Mentalidade de Negócio", accent: "purple", icon: worldConsumidor,stages: makeStages("consumidor", world4) },
  { id: "metas",     index: 5, name: "Estação das Metas",       axis: "Metas e Poupança",                          accent: "gold",   icon: worldMetas,     stages: makeStages("metas", world5) },
  { id: "cartao",    index: 6, name: "Cinturão do Cartão",      axis: "Cartão, Pix e Meios de Pagamento",          accent: "neon",   icon: worldCartao,    stages: makeStages("cartao", world6) },
];

export function getStage(id: string): Stage | undefined {
  for (const w of WORLDS) {
    const s = w.stages.find((s) => s.id === id);
    if (s) return s;
  }
  return undefined;
}

export function getWorld(id: string): World | undefined {
  return WORLDS.find((w) => w.id === id);
}
