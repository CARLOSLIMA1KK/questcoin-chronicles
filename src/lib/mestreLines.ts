const LINES = {
  correct: [
    "Excelente! O saber se acende.",
    "Resposta digna de um mestre!",
    "Boa! Você está afiando o instinto.",
    "Brilhante! Continue assim.",
    "Sabedoria reconhecida, jovem.",
  ],
  wrong: [
    "Quase! Erros também ensinam.",
    "Calma, vamos juntos rever isso.",
    "Não desista — todo mestre tropeça.",
    "Fique tranquilo, eu te guio.",
    "Respira e tenta de novo comigo.",
  ],
  contentDone: [
    "Conhecimento absorvido! Pronto para a prática?",
    "Mais uma página do nosso livro virada.",
    "Você desbloqueou um novo saber.",
  ],
  practiceDone: [
    "Prática vencida! Estou orgulhoso.",
    "Você lutou bem, jovem aventureiro.",
    "A jornada continua — e você está mais forte.",
  ],
  bossDone: [
    "Vitória lendária! Conte essa para os netos.",
    "Você derrotou o desafio supremo!",
    "Os ventos do reino sopram a seu favor.",
  ],
} as const;

export type MestreContext = keyof typeof LINES;

export function pickLine(context: MestreContext): string {
  const arr = LINES[context];
  return arr[Math.floor(Math.random() * arr.length)];
}