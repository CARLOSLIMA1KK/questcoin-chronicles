## Melhorias de usabilidade e acessibilidade

Foco: público infantil (8–14 anos). Sem alterar regras de negócio (XP, Cofrinho, missões, progressão).

### 1) Reordenar e refinar o BottomNav

Nova ordem com Mapa no centro:

```
Ranking | Cofrinho | Mapa | Loja | Mochila
```

- Mapa central com leve destaque permanente (badge/elevação) além do estado ativo.
- `<nav aria-label="Navegação principal">` e `aria-current="page"` no item ativo.
- Tap target ≥ 44×44 (`min-h-12 py-2`, ícone `h-6 w-6`, label `text-[11px]`).
- `focus-visible:ring-2 ring-game-neon ring-offset-2 ring-offset-background` em cada link.
- Label inativo com contraste melhor (`text-foreground/70`).

### 2) Skip link e landmark

- Em `__root.tsx`, adicionar skip link "Pular para o conteúdo" oculto até receber foco.
- Envolver `<Outlet />` em `<main id="conteudo">` (um único `main` por página).

### 3) PlayerHeader

- Avatar vira `<button>` com `aria-label="Perfil de {nome}"` (sem mudar comportamento — apenas semântica).
- Anel de XP com `aria-label="Nível {n}, {xp} de {xpToNext} XP"`.
- Bloco de escudos com `role="group"` e label já presente; adicionar `aria-live="polite"` no estado "Pronto!".

### 4) MapOnboarding

- Botão "Pular" → "Pular tutorial", `min-h-11 px-3`, foco visível.
- Garantir `aria-label` nos pontos de etapa (já existe) e foco inicial no botão "Próximo" ao montar.

### 5) StageNode

- `aria-label` descritivo: `"Fase {n} — {status}, vale {xp} XP"`.
- Garantir `min-h-12 min-w-12` no alvo de toque.

### 6) MestreFAB

- Offset acima do BottomNav (margin-bottom extra ~80px) pra não cobrir nav.
- `aria-label="Falar com o Mestre Finan"`.

### 7) prefers-reduced-motion

- No `index.tsx`, trocar `behavior: "smooth"` por `"auto"` quando `matchMedia('(prefers-reduced-motion: reduce)')` for verdadeiro.
- Adicionar `motion-reduce:animate-none` nos pontos com `animate-coin-spin` e animações de pulse no header/escudos.

### Arquivos afetados

- `src/components/game/BottomNav.tsx`
- `src/routes/__root.tsx`
- `src/components/game/PlayerHeader.tsx`
- `src/components/game/MapOnboarding.tsx`
- `src/components/game/StageNode.tsx`
- `src/components/game/MestreFAB.tsx`
- `src/routes/index.tsx`

### Fora de escopo

- Tokens de cor / tema.
- Lógica de progresso, XP, wallet, missões.
- Novas dependências.
