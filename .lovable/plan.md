## Plano

Vou ajustar o mapa para o Astrodin aparecer de forma confiável ao lado da fase atual, sem depender de cache ou de estados escondidos.

### O que encontrei
- A arte `astrodin-rocket-v2.png` existe e está correta.
- O código atual só mostra o foguete quando a fase tem status `current`.
- Na sua tela, depois de limpar storage/cache, o mapa aparece com placeholders/esqueletos e não há imagem do Astrodin no DOM do mapa; isso indica que a condição atual não está encontrando uma fase `current` visível naquele momento.
- O Astrodin visível no canto inferior direito parece ser o botão flutuante/chat, não o marcador da trilha.

### Ajuste proposto
1. Em `MapTrail.tsx`, calcular dentro do próprio mundo qual fase deve receber o marcador:
   - priorizar a fase com status `current`;
   - se não existir `current`, usar a primeira fase `available`;
   - se também não existir, usar a última fase `completed`.
2. Renderizar o Astrodin uma única vez nessa fase escolhida, em vez de depender exclusivamente de `status === "current"`.
3. Manter o asset centralizado `ASTRODIN.rocket`, garantindo consistência global do personagem.
4. Melhorar a posição no mobile para não ficar cortado nem escondido pelo botão do chat/rodapé.
5. Validar no preview mobile que o Astrodin aparece ao lado da fase correta.