export type Slide = {
  emoji: string;
  title: string;
  body: string;
  tip?: string; // dica do Mestre
};

export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type Lesson = { slides: Slide[] };
type Practice = { questions: Question[] };

export const WORLD1_CONTENT: Record<string, Lesson> = {
  "bom-senso-1": {
    slides: [
      { emoji: "🛒", title: "Necessidade x Desejo", body: "Necessidades são coisas que a gente precisa para viver bem: comida, moradia, transporte, escola. Desejos são coisas que a gente quer ter, mas pode viver sem." },
      { emoji: "🍎", title: "Exemplo do dia a dia", body: "Comprar arroz no mercado é necessidade. Comprar um chocolate caro de marca é desejo. Os dois podem fazer parte da vida — o segredo é o equilíbrio." },
      { emoji: "🧠", title: "A pergunta mágica", body: "Antes de gastar, pergunte: 'Eu PRECISO disso ou só QUERO?' Essa pergunta sozinha já economiza muito dinheiro.", tip: "Não é proibido ter desejos. É proibido confundir os dois." },
    ],
  },
  "bom-senso-3": {
    slides: [
      { emoji: "⚡", title: "Compra por impulso", body: "Acontece quando você compra sem pensar, levado pela emoção do momento: vitrine bonita, promoção piscando, vontade súbita." },
      { emoji: "⏰", title: "Regra das 24 horas", body: "Viu algo que não estava nos seus planos? Espere 24 horas antes de comprar. Se no dia seguinte ainda fizer sentido, compre." },
      { emoji: "🎯", title: "Por que funciona?", body: "O cérebro acalma o impulso e você decide com a razão. A maioria dos 'preciso agora' some em algumas horas.", tip: "Compra por impulso é o ladrão silencioso da mesada." },
    ],
  },
  "bom-senso-5": {
    slides: [
      { emoji: "📺", title: "Propaganda existe pra vender", body: "Toda propaganda tem um objetivo: te convencer a comprar. Ela usa imagens, músicas e palavras que mexem com seus sentimentos." },
      { emoji: "😍", title: "Gatilhos comuns", body: "Urgência ('só hoje!'), escassez ('últimas unidades'), pertencimento ('todo mundo tem'), status ('você merece o melhor')." },
      { emoji: "🛡️", title: "Como se proteger", body: "Reconhecer o gatilho já enfraquece o efeito. Pergunte: 'eu queria isso ANTES de ver o anúncio?'", tip: "Anúncio bom não é o que vende mais, é o que te faz pensar." },
    ],
  },
  "bom-senso-7": {
    slides: [
      { emoji: "📝", title: "Lista é planejamento", body: "Ir ao mercado sem lista é convite a gastar a mais. A lista é seu mapa: o que comprar e quanto isso vai custar." },
      { emoji: "🥇", title: "Priorize", body: "Escreva primeiro o que é necessidade. Depois, se sobrar dinheiro, encaixe um ou dois desejos. Nessa ordem." },
      { emoji: "✅", title: "Cumpra a lista", body: "Comprou tudo da lista? Missão cumprida. Resista a colocar coisas extras só porque estão por perto.", tip: "Carrinho cheio nem sempre é compra inteligente." },
    ],
  },
  "bom-senso-9": {
    slides: [
      { emoji: "🔍", title: "Compare antes de comprar", body: "O mesmo produto pode ter preços muito diferentes. Olhar duas ou três opções economiza dinheiro fácil." },
      { emoji: "⚖️", title: "Preço por unidade", body: "1 kg por R$10 ou 500 g por R$6? O segundo parece mais barato, mas custa R$12 por kg. Sempre veja o preço por unidade." },
      { emoji: "🏷️", title: "Marca x genérico", body: "Muitas vezes o produto sem marca famosa tem a mesma qualidade por menos dinheiro. Vale testar.", tip: "Comparar 30 segundos pode salvar 30% do gasto." },
    ],
  },
};

export const WORLD1_PRACTICE: Record<string, Practice> = {
  "bom-senso-2": {
    questions: [
      { question: "Comprar passagem de ônibus para ir à escola é:", options: ["Necessidade", "Desejo", "Luxo", "Investimento"], correctIndex: 0, explanation: "Transporte para a escola é essencial — necessidade." },
      { question: "Comprar o último tênis lançado da marca famosa é:", options: ["Necessidade", "Desejo", "Obrigação", "Imposto"], correctIndex: 1, explanation: "Você pode ter um tênis bom sem ser o último lançamento. É desejo." },
      { question: "Pagar a conta de luz de casa é:", options: ["Desejo", "Bobagem", "Necessidade", "Sorte"], correctIndex: 2, explanation: "Luz é serviço essencial. Sem ela, faltam coisas básicas." },
      { question: "Comprar um jogo novo no lançamento por R$300:", options: ["Necessidade", "Desejo", "Urgência", "Dever"], correctIndex: 1, explanation: "Diversão é importante, mas o jogo no lançamento é desejo, não necessidade." },
      { question: "Comprar remédio receitado pelo médico:", options: ["Desejo", "Luxo", "Necessidade", "Vontade"], correctIndex: 2, explanation: "Saúde é necessidade. Remédio prescrito é prioridade." },
    ],
  },
  "bom-senso-4": {
    questions: [
      { question: "Você passa na loja e vê um item em promoção que não estava nos planos. O melhor é:", options: ["Comprar agora antes que acabe", "Esperar 24h e decidir com calma", "Pedir emprestado para comprar", "Comprar dois para garantir"], correctIndex: 1, explanation: "A regra das 24h reduz a compra por impulso." },
      { question: "Qual sinal indica compra por impulso?", options: ["Você planejou no mês passado", "Você comparou três lojas", "Bate uma vontade súbita ao ver o produto", "O produto está na sua lista"], correctIndex: 2, explanation: "Vontade súbita sem planejamento é impulso clássico." },
      { question: "Promoção 'só nas próximas 2 horas' usa qual gatilho?", options: ["Curiosidade", "Urgência", "Calma", "Comparação"], correctIndex: 1, explanation: "Urgência é o gatilho mais comum para forçar decisão rápida." },
      { question: "Você está triste e dá vontade de comprar algo caro online. O melhor é:", options: ["Comprar para se sentir melhor", "Adiar a decisão e fazer outra coisa", "Comprar dois para dobrar a alegria", "Pedir cartão emprestado"], correctIndex: 1, explanation: "Compras emocionais quase sempre viram arrependimento." },
      { question: "Como reduzir compras por impulso no celular?", options: ["Salvar cartão no app", "Tirar notificações de loja e desinstalar apps de compra fáceis", "Seguir mais influenciadores", "Ativar 1-clique"], correctIndex: 1, explanation: "Reduzir gatilhos visuais e atrito de compra ajuda muito." },
    ],
  },
  "bom-senso-6": {
    questions: [
      { question: "'Últimas 3 unidades em estoque!' é um gatilho de:", options: ["Status", "Escassez", "Pertencimento", "Conforto"], correctIndex: 1, explanation: "Escassez cria medo de perder a oportunidade." },
      { question: "'Você merece o melhor' apela para:", options: ["Status / autoestima", "Necessidade básica", "Educação", "Saúde"], correctIndex: 0, explanation: "É um gatilho de status e autoimagem." },
      { question: "'Todos os seus amigos já têm' usa:", options: ["Urgência", "Pertencimento", "Comparação de preço", "Garantia"], correctIndex: 1, explanation: "Pertencimento — medo de ficar de fora do grupo." },
      { question: "'Só hoje 70% off!' é gatilho de:", options: ["Urgência", "Pertencimento", "Status", "Curiosidade"], correctIndex: 0, explanation: "Tempo limitado força decisão rápida — urgência." },
      { question: "Qual a melhor defesa contra propaganda?", options: ["Comprar para testar", "Perguntar se você queria isso ANTES do anúncio", "Seguir a marca", "Confiar no influenciador"], correctIndex: 1, explanation: "Se a vontade só apareceu por causa do anúncio, é desejo criado." },
    ],
  },
  "bom-senso-8": {
    questions: [
      { question: "Você tem R$50 e precisa comprar comida para a semana. O primeiro item da lista deve ser:", options: ["Refrigerante de marca", "Arroz e feijão", "Doces", "Sorvete"], correctIndex: 1, explanation: "Itens básicos de alimentação vêm primeiro." },
      { question: "Por que ir ao mercado com lista pronta?", options: ["Para gastar mais", "Para evitar esquecer e comprar a mais", "Porque é regra do mercado", "Para impressionar"], correctIndex: 1, explanation: "A lista é seu plano — sem ela, gasta-se mais." },
      { question: "Sobrou dinheiro depois das necessidades. O ideal é:", options: ["Encaixar 1-2 desejos com calma", "Gastar tudo em besteira", "Comprar para os colegas", "Devolver no caixa"], correctIndex: 0, explanation: "Necessidade primeiro, depois 1-2 desejos planejados." },
      { question: "Você vê algo gostoso na fila do caixa fora da lista. O melhor é:", options: ["Sempre colocar", "Pensar: estava na lista? Cabe no orçamento?", "Comprar dois", "Pedir desconto"], correctIndex: 1, explanation: "A fila do caixa é armadilha clássica de impulso." },
      { question: "O que NÃO precisa estar na lista?", options: ["Quanto você quer gastar no total", "Itens necessários", "Quantidades", "O nome do caixa"], correctIndex: 3, explanation: "Quantidade, itens e orçamento total — esses sim." },
    ],
  },
  "bom-senso-10": {
    questions: [
      { question: "1 kg de arroz por R$8 ou 5 kg por R$35. Qual sai mais barato por kg?", options: ["1 kg por R$8", "5 kg por R$35", "Os dois iguais", "Impossível saber"], correctIndex: 1, explanation: "5kg por R$35 = R$7/kg. Mais barato por unidade." },
      { question: "O produto de marca custa R$12; o genérico R$6 com mesmo conteúdo. O mais inteligente é:", options: ["Sempre marca", "Avaliar o genérico — pode valer 50% menos", "Sempre o mais caro", "Não comprar nenhum"], correctIndex: 1, explanation: "Genéricos costumam ter qualidade similar por bem menos." },
      { question: "Para comparar dois produtos do mesmo tipo, o mais útil é:", options: ["A cor da embalagem", "O preço por unidade (kg, litro, un)", "Quem patrocina o anúncio", "O tamanho da embalagem só"], correctIndex: 1, explanation: "Preço por unidade é o comparativo justo." },
      { question: "Você está com pressa. Vale a pena comparar preços?", options: ["Não, perde tempo", "Sim, 30 segundos podem economizar muito", "Só se for produto caro", "Só no fim do mês"], correctIndex: 1, explanation: "Pequena comparação rende economia grande." },
      { question: "Promoção 'leve 3 e pague 2' é boa quando:", options: ["Sempre", "Você ia comprar os 3 mesmo, e cabe no orçamento", "Você não precisa do produto", "O produto está vencendo amanhã"], correctIndex: 1, explanation: "Só vale se você usaria as 3 unidades de qualquer jeito." },
    ],
  },
  "bom-senso-11": {
    questions: [
      { question: "Comida básica para casa é:", options: ["Desejo", "Necessidade", "Luxo", "Impulso"], correctIndex: 1, explanation: "Alimentação básica = necessidade." },
      { question: "'Só hoje 50% off' é gatilho de:", options: ["Urgência", "Pertencimento", "Status", "Saúde"], correctIndex: 0, explanation: "Tempo limitado = urgência." },
      { question: "Regra das 24h serve para:", options: ["Esperar entrega", "Reduzir compras por impulso", "Ganhar desconto", "Devolver produto"], correctIndex: 1, explanation: "Pausa que ajuda a decidir com a razão." },
      { question: "Ir ao mercado sem lista geralmente faz você:", options: ["Economizar", "Gastar a mais", "Ganhar pontos", "Ficar mais rápido"], correctIndex: 1, explanation: "Sem plano, gasta-se mais." },
      { question: "Marca famosa é SEMPRE melhor que genérico?", options: ["Sim", "Não, depende do produto", "Só se for cara", "Só com cupom"], correctIndex: 1, explanation: "Genéricos podem ter qualidade igual por menos." },
      { question: "O preço por unidade serve para:", options: ["Calcular imposto", "Comparar produtos com tamanhos diferentes", "Ganhar fidelidade", "Pagar gorjeta"], correctIndex: 1, explanation: "Permite comparação justa entre embalagens." },
      { question: "'Você merece o melhor' é gatilho de:", options: ["Status", "Necessidade", "Saúde", "Educação"], correctIndex: 0, explanation: "Apela para autoimagem — status." },
      { question: "Compra consciente é:", options: ["Comprar tudo que vê", "Pensar antes — preciso disso? cabe no orçamento?", "Nunca comprar nada", "Sempre o mais caro"], correctIndex: 1, explanation: "Avaliar antes é a essência do consumo consciente." },
    ],
  },
};
