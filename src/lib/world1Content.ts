export type Slide = {
  emoji: string;
  title: string;
  body: string;
  tip?: string; // dica do Astrodin
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
      { emoji: "🛒", title: "Necessidade x Desejo", body: "Necessidades são o oxigênio da missão: comida, abrigo na base, transporte espacial, treinamento na Academia. Desejos são coisas que o cadete quer ter, mas pode viver sem." },
      { emoji: "🍎", title: "Exemplo na base lunar", body: "Comprar rações no mercado da estação é necessidade. Comprar um chocolate intergaláctico de marca cara é desejo. Os dois cabem na missão — o segredo é o equilíbrio." },
      { emoji: "🧠", title: "A pergunta-radar", body: "Antes de gastar Star Coins, pergunte: 'Eu PRECISO disso ou só QUERO?' Esse radar sozinho já economiza muito combustível.", tip: "Não é proibido ter desejos. É proibido confundir os dois, cadete." },
    ],
  },
  "bom-senso-3": {
    slides: [
      { emoji: "⚡", title: "Compra por impulso", body: "Acontece quando o cadete compra sem pensar, levado pela emoção do momento: vitrine holográfica brilhando, promoção piscando, vontade súbita ao passar pela nave-loja." },
      { emoji: "⏰", title: "Regra das 24 horas terrestres", body: "Viu algo que não estava no plano de voo? Espere 24 horas antes de comprar. Se no próximo ciclo ainda fizer sentido, libere a compra." },
      { emoji: "🎯", title: "Por que funciona?", body: "O cérebro acalma o impulso e você decide com a razão, como um bom comandante. A maioria dos 'preciso agora' some em algumas horas.", tip: "Compra por impulso é o asteroide silencioso que rasga sua mesada." },
    ],
  },
  "bom-senso-5": {
    slides: [
      { emoji: "📺", title: "Propaganda existe pra vender", body: "Todo holoanúncio tem um objetivo: convencer o cadete a comprar. Usa imagens, músicas e palavras que mexem com seus sentimentos." },
      { emoji: "😍", title: "Gatilhos comuns", body: "Urgência ('só nesta órbita!'), escassez ('últimas unidades na estação'), pertencimento ('toda a tripulação tem'), status ('você merece o melhor da galáxia')." },
      { emoji: "🛡️", title: "Escudo de defesa", body: "Reconhecer o gatilho já enfraquece o efeito. Pergunte: 'eu queria isso ANTES de ver o anúncio?'", tip: "Anúncio bom não é o que vende mais — é o que te faz pensar." },
    ],
  },
  "bom-senso-7": {
    slides: [
      { emoji: "📝", title: "Lista é plano de voo", body: "Ir ao mercado da estação sem lista é convite a gastar a mais. A lista é seu mapa estelar: o que comprar e quanto vai custar." },
      { emoji: "🥇", title: "Priorize a missão", body: "Escreva primeiro o que é necessidade. Depois, se sobrarem Star Coins, encaixe um ou dois desejos. Nessa ordem." },
      { emoji: "✅", title: "Cumpra o plano", body: "Comprou tudo da lista? Missão cumprida, cadete. Resista a colocar coisas extras só porque estão flutuando por perto.", tip: "Carrinho cheio nem sempre é compra inteligente." },
    ],
  },
  "bom-senso-9": {
    slides: [
      { emoji: "🔍", title: "Compare antes de decolar", body: "O mesmo produto pode ter preços muito diferentes em estações vizinhas. Olhar duas ou três opções economiza Star Coins fácil." },
      { emoji: "⚖️", title: "Preço por unidade", body: "1 kg por 10 Star Coins ou 500 g por 6? O segundo parece mais barato, mas custa 12 por kg. Sempre veja o preço por unidade." },
      { emoji: "🏷️", title: "Marca x genérico galáctico", body: "Muitas vezes o produto sem marca famosa tem a mesma qualidade por menos Star Coins. Vale testar.", tip: "Comparar 30 segundos pode salvar 30% do gasto." },
    ],
  },
};

export const WORLD1_PRACTICE: Record<string, Practice> = {
  "bom-senso-2": {
    questions: [
      { question: "O cadete Theo paga a passagem do ônibus orbital para ir à Academia. Isso é:", options: ["Necessidade", "Desejo", "Luxo", "Investimento"], correctIndex: 0, explanation: "Transporte para a Academia é essencial — necessidade." },
      { question: "A cadete Lia quer comprar o último modelo de holotênis de marca famosa. Isso é:", options: ["Necessidade", "Desejo", "Obrigação", "Imposto"], correctIndex: 1, explanation: "Dá pra ter um tênis bom sem ser o último lançamento. É desejo." },
      { question: "Pagar a conta de energia solar da casa-cápsula é:", options: ["Desejo", "Bobagem", "Necessidade", "Sorte"], correctIndex: 2, explanation: "Energia é serviço essencial. Sem ela, faltam coisas básicas na missão." },
      { question: "Comprar um holojogo novo no lançamento por 300 Star Coins:", options: ["Necessidade", "Desejo", "Urgência", "Dever"], correctIndex: 1, explanation: "Diversão é importante, mas o jogo no lançamento é desejo, não necessidade." },
      { question: "Comprar o cápsula-remédio receitado pelo médico da estação:", options: ["Desejo", "Luxo", "Necessidade", "Vontade"], correctIndex: 2, explanation: "Saúde é necessidade. Remédio prescrito é prioridade." },
    ],
  },
  "bom-senso-4": {
    questions: [
      { question: "Theo passa na nave-loja e vê um item em promoção fora do plano de voo. O melhor é:", options: ["Comprar agora antes que acabe", "Esperar 24h e decidir com calma", "Pedir Star Coins emprestadas pra comprar", "Comprar dois pra garantir"], correctIndex: 1, explanation: "A regra das 24h reduz a compra por impulso." },
      { question: "Qual sinal indica compra por impulso?", options: ["Você planejou no ciclo passado", "Você comparou três estações", "Bate uma vontade súbita ao ver o produto", "O produto está na sua lista"], correctIndex: 2, explanation: "Vontade súbita sem planejamento é impulso clássico." },
      { question: "Promoção 'só nas próximas 2 órbitas' usa qual gatilho?", options: ["Curiosidade", "Urgência", "Calma", "Comparação"], correctIndex: 1, explanation: "Urgência é o gatilho mais comum para forçar decisão rápida." },
      { question: "Lia está triste e bate vontade de comprar algo caro no holomercado. O melhor é:", options: ["Comprar pra se sentir melhor", "Adiar a decisão e fazer outra coisa", "Comprar dois pra dobrar a alegria", "Pedir cartão emprestado"], correctIndex: 1, explanation: "Compras emocionais quase sempre viram arrependimento." },
      { question: "Como reduzir compras por impulso no holocomunicador?", options: ["Salvar cartão no app", "Tirar notificações de loja e desinstalar apps de compra fácil", "Seguir mais influenciadores espaciais", "Ativar compra com 1 clique"], correctIndex: 1, explanation: "Reduzir gatilhos visuais e atrito de compra ajuda muito." },
    ],
  },
  "bom-senso-6": {
    questions: [
      { question: "'Últimas 3 unidades na estação!' é um gatilho de:", options: ["Status", "Escassez", "Pertencimento", "Conforto"], correctIndex: 1, explanation: "Escassez cria medo de perder a oportunidade." },
      { question: "'Você merece o melhor da galáxia' apela para:", options: ["Status / autoestima", "Necessidade básica", "Educação", "Saúde"], correctIndex: 0, explanation: "É um gatilho de status e autoimagem." },
      { question: "'Toda a tripulação já tem' usa:", options: ["Urgência", "Pertencimento", "Comparação de preço", "Garantia"], correctIndex: 1, explanation: "Pertencimento — medo de ficar de fora do grupo." },
      { question: "'Só nesta órbita: 70% off!' é gatilho de:", options: ["Urgência", "Pertencimento", "Status", "Curiosidade"], correctIndex: 0, explanation: "Tempo limitado força decisão rápida — urgência." },
      { question: "Qual a melhor defesa contra propaganda?", options: ["Comprar pra testar", "Perguntar se você queria isso ANTES do anúncio", "Seguir a marca", "Confiar no influenciador"], correctIndex: 1, explanation: "Se a vontade só apareceu por causa do anúncio, é desejo criado." },
    ],
  },
  "bom-senso-8": {
    questions: [
      { question: "Theo tem 50 Star Coins e precisa comprar ração da semana. O primeiro item da lista deve ser:", options: ["Refrigerante de marca", "Arroz e feijão espacial", "Doces da galáxia", "Sorvete intergaláctico"], correctIndex: 1, explanation: "Itens básicos de alimentação vêm primeiro." },
      { question: "Por que ir ao mercado da estação com lista pronta?", options: ["Pra gastar mais", "Pra evitar esquecer e comprar a mais", "Porque é regra da Federação", "Pra impressionar"], correctIndex: 1, explanation: "A lista é seu plano — sem ela, gasta-se mais." },
      { question: "Sobraram Star Coins depois das necessidades. O ideal é:", options: ["Encaixar 1-2 desejos com calma", "Gastar tudo em besteira", "Comprar pros colegas de tripulação", "Devolver no caixa"], correctIndex: 0, explanation: "Necessidade primeiro, depois 1-2 desejos planejados." },
      { question: "Lia vê algo gostoso na fila do caixa fora da lista. O melhor é:", options: ["Sempre colocar", "Pensar: estava na lista? Cabe no orçamento?", "Comprar dois", "Pedir desconto"], correctIndex: 1, explanation: "A fila do caixa é armadilha clássica de impulso." },
      { question: "O que NÃO precisa estar na lista?", options: ["Quanto você quer gastar no total", "Itens necessários", "Quantidades", "O nome do atendente"], correctIndex: 3, explanation: "Quantidade, itens e orçamento total — esses sim." },
    ],
  },
  "bom-senso-10": {
    questions: [
      { question: "1 kg de arroz por 8 Star Coins ou 5 kg por 35. Qual sai mais barato por kg?", options: ["1 kg por 8", "5 kg por 35", "Os dois iguais", "Impossível saber"], correctIndex: 1, explanation: "5kg por 35 = 7 por kg. Mais barato por unidade." },
      { question: "O produto de marca custa 12 Star Coins; o genérico 6, com mesmo conteúdo. O mais inteligente é:", options: ["Sempre marca", "Avaliar o genérico — pode valer 50% menos", "Sempre o mais caro", "Não comprar nenhum"], correctIndex: 1, explanation: "Genéricos costumam ter qualidade similar por bem menos." },
      { question: "Pra comparar dois produtos do mesmo tipo, o mais útil é:", options: ["A cor da embalagem", "O preço por unidade (kg, litro, un)", "Quem patrocina o anúncio", "O tamanho da embalagem só"], correctIndex: 1, explanation: "Preço por unidade é o comparativo justo." },
      { question: "Você está com pressa. Vale comparar preços?", options: ["Não, perde tempo", "Sim, 30 segundos podem economizar muito", "Só se for produto caro", "Só no fim do mês"], correctIndex: 1, explanation: "Pequena comparação rende economia grande." },
      { question: "Promoção 'leve 3 e pague 2' é boa quando:", options: ["Sempre", "Você ia comprar os 3 mesmo, e cabe no orçamento", "Você não precisa do produto", "O produto está vencendo amanhã"], correctIndex: 1, explanation: "Só vale se você usaria as 3 unidades de qualquer jeito." },
    ],
  },
  "bom-senso-11": {
    questions: [
      { question: "Ração básica pra casa-cápsula é:", options: ["Desejo", "Necessidade", "Luxo", "Impulso"], correctIndex: 1, explanation: "Alimentação básica = necessidade." },
      { question: "'Só nesta órbita: 50% off' é gatilho de:", options: ["Urgência", "Pertencimento", "Status", "Saúde"], correctIndex: 0, explanation: "Tempo limitado = urgência." },
      { question: "Regra das 24h serve para:", options: ["Esperar entrega da nave", "Reduzir compras por impulso", "Ganhar desconto", "Devolver produto"], correctIndex: 1, explanation: "Pausa que ajuda a decidir com a razão." },
      { question: "Ir ao mercado da estação sem lista geralmente faz você:", options: ["Economizar", "Gastar a mais", "Ganhar pontos", "Ficar mais rápido"], correctIndex: 1, explanation: "Sem plano, gasta-se mais." },
      { question: "Marca famosa é SEMPRE melhor que genérico?", options: ["Sim", "Não, depende do produto", "Só se for cara", "Só com cupom"], correctIndex: 1, explanation: "Genéricos podem ter qualidade igual por menos." },
      { question: "O preço por unidade serve para:", options: ["Calcular imposto", "Comparar produtos com tamanhos diferentes", "Ganhar fidelidade", "Pagar gorjeta"], correctIndex: 1, explanation: "Permite comparação justa entre embalagens." },
      { question: "'Você merece o melhor' é gatilho de:", options: ["Status", "Necessidade", "Saúde", "Educação"], correctIndex: 0, explanation: "Apela para autoimagem — status." },
      { question: "Compra consciente é:", options: ["Comprar tudo que vê", "Pensar antes — preciso disso? cabe no orçamento?", "Nunca comprar nada", "Sempre o mais caro"], correctIndex: 1, explanation: "Avaliar antes é a essência do consumo consciente." },
    ],
  },
};
