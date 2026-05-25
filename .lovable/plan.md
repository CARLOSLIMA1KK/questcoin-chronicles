## Objetivo

Trocar a arte atual do Astrodin (cadete dentro do traje) pela arte oficial enviada (capacete azul translúcido, mochila/foguete laranja). Manter o mesmo personagem em todas as telas e gerar variações fiéis de humor para os feedbacks.

## Passos

1. **Salvar a arte oficial**
   - Copiar `user-uploads://Captura_de_Tela_2026-05-25_às_09.50.16-removebg-preview.png` para `src/assets/astrodin-oficial.png` (base canônica do personagem, fundo transparente).

2. **Gerar variações de humor com `imagegen--edit_image`** a partir da arte oficial — mesma silhueta, mesmas cores, mudando só expressão/pose. Todas com fundo transparente:
   - `src/assets/astrodin-avatar-v2.png` — pose neutra, olhar pra frente (default do chat).
   - `src/assets/astrodin-happy-v2.png` — expressão alegre, leve celebração (acerto, conquista).
   - `src/assets/astrodin-sad-v2.png` — expressão preocupada/encorajadora (erro, escudo perdido).
   - `src/assets/astrodin-thinking-v2.png` — pose pensativa, mão no capacete (boss, dica).
   - `src/assets/astrodin-hero-v2.png` — pose heroica em maior destaque (telas hero/onboarding).
   - `src/assets/astrodin-rocket-v2.png` — Astrodin oficial decolando com o foguete laranja (loader/animações).

3. **Atualizar `src/lib/brandAssets.ts`**
   - Trocar os 6 imports `astrodin-*.png` pelas novas versões `*-v2.png`.
   - Manter a estrutura do objeto `ASTRODIN` igual — nenhum consumidor precisa mudar.

4. **QA visual**
   - Conferir cada PNG gerado: silhueta consistente, fundo realmente transparente, cores fiéis (azul translúcido + laranja + branco).
   - Validar `MestreAvatar` no chat, em `ResultScreen` (acerto/erro/boss) e no `GlobalLoader`.
   - Confirmar que não há referência sobrevivente à arte antiga.

## Detalhes técnicos

- Os arquivos antigos (`astrodin-avatar.png`, `-happy`, `-sad`, `-thinking`, `-hero`, `-rocket`) ficam no repositório mas deixam de ser importados — sem risco de quebra; podem ser removidos numa limpeza posterior.
- `MestreAvatar.tsx`, `GlobalLoader.tsx` e demais consumidores leem via `ASTRODIN.*` em `brandAssets.ts`, então a troca é centralizada num único arquivo.
- Aspect ratio das edições: `1:1` (compatível com os ringues circulares do avatar). Para `hero-v2` usar `1:1` também por consistência com layout atual.

## Fora de escopo

- Nenhuma mudança em copy, rotas, lógica de quizzes ou economia de Star Coins.
- Animações do loader continuam como estão (só o sprite é trocado).
