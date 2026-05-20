# Plano — Polimento FORME / Astrodin

Quatro frentes independentes. Podem ser feitas em ordem ou em paralelo — sugiro nessa sequência (impacto visual → conteúdo).

---

## 1. Avatares de alunos com uniforme espacial

**Hoje:** `src/assets/avatar-student-{1,2,3}.webp` são avatares genéricos usados no `PodiumCard` e na lista do ranking (`src/routes/ranking.tsx`).

**O que fazer:**
- Gerar 6 novos avatares de cadetes (3 atuais + 3 extras pra variedade), estilo 3D coerente com Astrodin: capacete transparente, traje branco com detalhes laranja FORME (`#ff6a1f`) e amarelo Astrodin (`#ffc83d`), patch da FORME no peito, diversidade étnica e de gênero, fundo transparente, círculo redondo (combina com o avatar circular do podium).
- Salvar como `avatar-cadete-{1..6}.png` em `src/assets/`.
- Trocar imports em `ranking.tsx` e expandir `PODIUM_AVATARS` para sortear entre os 6 nos demais nomes da lista (hoje só os 3 primeiros têm imagem).
- Adicionar leve `ring-2 ring-astrodin-yellow/30` nos avatares dos top-3 para reforçar identidade.

**Fora de escopo:** sistema de seleção/personalização de avatar pelo usuário.

---

## 2. Animações Motion adicionais

**Hoje:** Motion já instalado (`motion` v12), uso pontual no `shimmer.tsx`. O resto usa keyframes CSS.

**O que adicionar:**
- **Foguete decolando** no `GlobalLoader` e na transição de início de fase: SVG/PNG do Astrodin foguete subindo com trilha de fumaça (Motion `animate` em `y`+`opacity`, easing `easeOut`, ~1.2s).
- **Partículas estelares** de fundo no Header e no Map (`src/routes/index.tsx`): 20–30 pontos com `motion` em `opacity`+`scale` em loop infinito, distribuídos aleatoriamente, respeitando `prefers-reduced-motion`.
- **Confete espacial** no `ResultScreen` quando acerta o boss: estrelas e mini-foguetes em vez de confete genérico.
- **Pulse cósmico** nos `StageNode` da fase atual: aro de luz pulsando em vez do `animate-[float]` atual.
- **Transição entre mundos**: ao expandir um mundo no `WorldBanner`, fade+slide com Motion em vez do CSS atual.

Todas as animações: desabilitadas via `useReducedMotion()` do Motion.

**Fora de escopo:** sistema de partículas WebGL, parallax 3D.

---

## 3. Pipeline pra substituir artes geradas pelas oficiais

**Hoje:** Todas as artes (Astrodin, mundos, moeda) são imports diretos em `src/lib/curriculum.ts`, `MestreAvatar.tsx`, etc.

**O que fazer:**
- Centralizar todos os assets de marca em **um único arquivo** `src/lib/brandAssets.ts`:
  ```ts
  export const ASTRODIN = { hero, avatar, happy, sad, thinking, rocket };
  export const WORLDS_ART = { bomSenso, mesada, juros, ... };
  export const CURRENCY_ICON = starCoin;
  export const STUDENT_AVATARS = [...];
  ```
- Refatorar `curriculum.ts`, `MestreAvatar.tsx`, `GlobalLoader.tsx`, `ResultScreen.tsx`, `PlayerHeader.tsx`, `ranking.tsx` para consumirem desse módulo.
- Quando o cliente enviar arte oficial: basta substituir o arquivo em `src/assets/` (mesmo nome) ou trocar **uma linha** em `brandAssets.ts`. Zero busca por código.
- Criar `src/assets/official/` como pasta-alvo padrão e documentar no `README.md` (seção "Trocar artes oficiais") o passo-a-passo: nome esperado, dimensão, formato, fundo transparente.

**Fora de escopo:** CMS / upload via interface; tudo continua via commit no repo.

---

## 4. Revisão da narrativa dos quizzes (texto pedagógico mantido)

**Hoje:** `src/lib/world1Content.ts` (e provavelmente world2+) tem perguntas em linguagem neutra ("João recebeu mesada…"). Conteúdo didático fica intacto — só a moldura narrativa muda.

**O que fazer:**
- Ler `world1Content.ts` completo + mapear se existem world2/3 etc.
- Reescrever **apenas** os enunciados narrativos (cabeçalhos, nomes de personagens, cenários) para o universo Astrodin:
  - "João recebeu R$50 de mesada" → "O cadete Theo recebeu 50 Star Coins da Federação"
  - "Maria quer comprar um celular" → "A cadete Lia quer comprar um novo holocomunicador"
  - Cenários: estação espacial, base lunar, mercado intergaláctico
- **NÃO mudar:** valores numéricos, conceitos financeiros, opções de resposta, explicações pedagógicas, dificuldade.
- Atualizar o system prompt do chat (`src/routes/api/chat.ts`) caso ainda use exemplos antigos.

**Fora de escopo:** criar novas perguntas, mudar gabarito, alterar XP/coins.

---

## Detalhes técnicos

- **Geração de imagens:** `imagegen--generate_image` quality `standard` para avatares, `premium` só se cliente pedir hero novo. Fundo transparente sempre.
- **Motion:** importar de `motion/react`, usar `useReducedMotion`, `LazyMotion`+`domAnimation` no `__root.tsx` pra reduzir bundle.
- **Sem mudanças no backend** (sem Cloud, sem novas rotas, sem migrações).
- **Sem mudanças em rotas/routing.**

## Ordem sugerida e esforço relativo

1. Avatares (rápido — 1 batch de geração + 1 refactor)
2. Pipeline `brandAssets.ts` (médio — refactor mecânico em ~6 arquivos)
3. Narrativa quizzes (médio — depende de quantos mundos têm conteúdo escrito)
4. Animações Motion (mais longo — várias telas, precisa QA visual)
