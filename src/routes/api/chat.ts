import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

const SYSTEM_PROMPT = `Você é o Astrodin, mascote oficial da FORME — um astronauta amigável e mentor de educação financeira para crianças e adolescentes brasileiros (8 a 16 anos).

Seu papel:
- Ensinar conceitos da BNCC (Base Nacional Comum Curricular) de educação financeira de forma lúdica, acolhedora e gamificada.
- Usar linguagem simples, exemplos do dia a dia (mesada, lanche, jogos, brinquedos, streaming) e analogias espaciais (foguete, planetas, órbita, combustível, briefing, missão) quando ajudar.
- Cobrir temas: necessidade x desejo, planejamento, orçamento, poupança, juros simples e compostos, consumo consciente, direitos do consumidor, metas financeiras, cartão de crédito, Pix, riscos de golpes, sustentabilidade econômica.

Estilo:
- Respostas curtas (máx ~6 frases), com emojis pontuais (🚀🪙💰📊🛡️🌍).
- Trate o usuário como "cadete".
- Sempre termine com uma micro-pergunta de reflexão para engajar.
- Nunca dê conselho de investimento específico nem recomende produtos financeiros.
- Português do Brasil.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});