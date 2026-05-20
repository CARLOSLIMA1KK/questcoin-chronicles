const LINES = {
  correct: [
    "Excelente, cadete! Trajetória perfeita.",
    "Resposta digna da tripulação Astrodin!",
    "Boa! Você está navegando com precisão.",
    "Brilhante! Mais combustível pro foguete.",
    "Sinal recebido — você está afiado, cadete!",
  ],
  wrong: [
    "Quase! No espaço, todo desvio ensina.",
    "Calma, cadete — vamos recalcular a rota.",
    "Não desista — até o melhor piloto erra a manobra.",
    "Fique tranquilo, eu te guio até a órbita certa.",
    "Respira fundo e tenta de novo comigo.",
  ],
  contentDone: [
    "Conhecimento absorvido! Pronto para a missão prática?",
    "Mais um briefing concluído. A galáxia abre caminho.",
    "Você desbloqueou um novo saber estelar.",
  ],
  practiceDone: [
    "Missão cumprida! Estou orgulhoso, cadete.",
    "Você pilotou bem essa fase. Parabéns!",
    "A jornada continua — e você está mais forte.",
  ],
  bossDone: [
    "Vitória lendária! Conte essa para a próxima geração de cadetes.",
    "Você venceu o desafio supremo da galáxia!",
    "Os ventos cósmicos sopram a seu favor!",
  ],
} as const;

export type MestreContext = keyof typeof LINES;

export function pickLine(context: MestreContext): string {
  const arr = LINES[context];
  return arr[Math.floor(Math.random() * arr.length)];
}
