# Rebrand Mestre Finan → FORME / Astrodin

Transformar o jogo atual numa demo white-label para apresentar ao cliente **FORME Educação Financeira**, com o personagem **Astrodin** e narrativa de jornada espacial. Conteúdo pedagógico (fases, quizzes, BNCC) é preservado — só a "skin" muda.

---

## 1. Identidade visual (design tokens)

Atualizar `src/styles.css` com paleta FORME:

- `--background`: azul-marinho profundo `oklch` (~ `#0d1b3d`)
- `--primary`: laranja vibrante FORME (~ `#ff6a1f`)
- `--accent`: amarelo Astrodin (~ `#ffc83d`) e roxo espacial (~ `#6b4ec9`) como secundários para gamificação
- `--card` / `--muted`: tons de marinho mais claros para painéis
- Gradientes novos: `--gradient-cosmic` (marinho → roxo), `--gradient-forme` (laranja → amarelo)
- Sombras "neon" suaves para reforçar atmosfera espacial

Tipografia: manter pilha atual (system / Inter) com peso forte nos títulos, próxima ao site FORME.

Logo: substituir wordmark "Mestre Finan" por lockup "FORME — Astrodin" no topo do app e splash/loader.

## 2. Personagem Astrodin (gerado por IA)

Usar as 3 imagens enviadas como referência visual (astronauta cartoon roxo/azul + amarelo, foguete, cenário espacial). Gerar com `imagegen` em qualidade premium, fundo transparente:

- `astrodin-hero.png` — corpo inteiro, pose de boas-vindas (splash, onboarding)
- `astrodin-avatar.png` — busto circular (substitui `mestre-finan.webp` no header, chat FAB, mensagens)
- `astrodin-thinking.png` — pensando (estado de loading / dica)
- `astrodin-happy.png` — comemorando (acertos, conclusão de fase)
- `astrodin-sad.png` — triste (erro / vida perdida)
- `astrodin-rocket.png` — dentro do foguete (transição entre mundos)

Substituições de código:
- `MestreAvatar.tsx`, `MestreChat.tsx`, `MestreFAB.tsx`, `MestreChatWindow.tsx` → usam Astrodin
- Renomear o "Mestre" nas strings de UI para **Astrodin** (capitão, guia da missão)

## 3. Mundos → Missões espaciais

Cada um dos 6 mundos vira um destino na galáxia. Conteúdo BNCC permanece; muda só nome, arte e copy.

| Mundo atual    | Nova missão Astrodin            |
| -------------- | ------------------------------- |
| Mesada         | Planeta Mesada                  |
| Bom Senso      | Lua do Bom Senso                |
| Metas          | Estação Órbita das Metas        |
| Juros          | Galáxia dos Juros               |
| Cartão         | Cinturão do Cartão              |
| Consumidor     | Nebulosa do Consumidor Consciente |

Gerar 6 novas artes `world-*.webp` (planetas/estações estilizadas, paleta FORME + acentos do mundo). Atualizar `WorldBanner.tsx` e dados de mundos (procurar em `src/data/` ou onde os mundos estão definidos) com novos nomes + descrições temáticas.

## 4. Ícones e itens

Regerar como elementos espaciais mantendo função:
- `k-coin.webp` → "Crédito Estelar" (moeda dourada com símbolo `$` ou logo FORME)
- `icon-quiz.webp` → holograma / painel de comando
- `icon-challenge.webp` → meteoro / desafio cósmico
- `icon-boss.webp` → alienígena chefão financeiro
- `stage-aula.webp`, `stage-pratica.webp`, `stage-boss.webp` → nós da trilha estilo satélite/planetoide
- Loja (`shop-*.webp`): poção→ "tanque de oxigênio", escudo→ "escudo de naveg", dica→ "transmissão do controle", presente→ "cápsula", streak→ "propulsor"

Avatares de alunos podem ganhar capacetes/uniformes da tripulação Astrodin (opcional na próxima iteração).

## 5. Telas-chave atualizadas

- **Splash / Loader**: Astrodin no foguete decolando, logo FORME
- **Onboarding (`MapOnboarding`, `CofrinhoOnboarding`)**: copy reescrito na voz do Astrodin ("Olá, cadete! Bem-vindo à Academia FORME…")
- **Header (`PlayerHeader`)**: trocar avatar mestre e cor da barra de XP para laranja FORME
- **MapTrail**: fundo cósmico (estrelas, nebulosa sutil), trilha conectando planetas
- **Chat (`MestreChatWindow` → `AstrodinChatWindow`)**: rename componente + bolha com avatar Astrodin
- **ResultScreen**: Astrodin feliz/triste conforme resultado
- **Ranking, Loja, Missões Diárias**: aplicar tokens novos; títulos com vocabulário espacial ("Tripulação", "Hangar", "Briefing diário")

## 6. Memória do projeto

Criar `mem://index.md` + `mem://design/forme-astrodin.md` documentando paleta, vocabulário (cadete, missão, planeta, crédito estelar) e personagem, para manter consistência em iterações futuras.

---

## Detalhes técnicos

- **Arquivos novos**: assets em `src/assets/astrodin-*.png` e `src/assets/world-*-v2.webp`. Ícones em `src/assets/icon-*-v2.webp`.
- **Não removo** os arquivos antigos no primeiro pass (deixo como fallback). Substituo os `import` nos componentes.
- **Geração**: `imagegen--generate_image` com `model: "premium"` e `transparent_background: true` para personagem/ícones; `model: "standard"` para artes de mundo (fundo cheio).
- **Refs**: passo as 3 imagens enviadas via `imagegen--edit_image` para manter coerência do Astrodin entre poses.
- **Sem mexer no backend / lógica**: progressão, BNCC, persistência localStorage, quizzes — intocados.
- **Auth e Cloud**: fora do escopo deste rebrand. Continua mock.

## Ordem de execução

1. Atualizar `src/styles.css` (tokens FORME)
2. Gerar Astrodin (6 poses) + substituir nos componentes Mestre*
3. Gerar 6 novos backgrounds de mundo + atualizar dados/labels
4. Gerar novos ícones (moeda, quiz, boss, stage, loja)
5. Atualizar copy do onboarding, chat e telas de resultado
6. QA visual no preview (todas as telas) + memória do projeto

## Fora do escopo (para depois)

- Avatares de alunos com uniforme espacial
- Animações Motion adicionais (foguete decolando, partículas)
- Substituir as artes geradas pelas oficiais quando o cliente enviar
- Trocar narrativa de quizzes (texto pedagógico continua igual)
