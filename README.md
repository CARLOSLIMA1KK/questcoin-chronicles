
## Trocar artes oficiais (FORME / Astrodin)

Todos os assets de marca estão centralizados em `src/lib/brandAssets.ts`.

Pra substituir uma arte gerada pela oficial enviada pelo cliente:

1. Salve o arquivo oficial em `src/assets/official/` (ou substitua diretamente o arquivo em `src/assets/` mantendo o mesmo nome).
2. Se o nome do arquivo mudar, edite **apenas uma linha** do import em `src/lib/brandAssets.ts`.
3. Recomendado: PNG com fundo transparente, 512×512 pra ícones e avatares, 1024×1024 pra hero.

Categorias:
- `ASTRODIN` — personagem em 6 poses (hero, avatar, happy, sad, thinking, rocket)
- `WORLDS_ART` — 6 planetas/mundos
- `CURRENCY_ICON` — Star Coin
- `STUDENT_AVATARS` — 6 cadetes do ranking (sorteados via `avatarForId`)
