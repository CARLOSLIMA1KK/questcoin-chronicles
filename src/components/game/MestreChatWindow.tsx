import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export default function MestreChatWindow({
  threadId,
  initialMessages,
  initialPrompt,
  onSync,
}: {
  threadId: string;
  initialMessages: UIMessage[];
  initialPrompt?: string;
  onSync: (messages: UIMessage[]) => void;
}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (err) => {
      console.error("Chat error", err);
      const msg = String(err?.message ?? "");
      if (/\b404\b|not\s*found/i.test(msg)) {
        toast.error("Conexão com o Astrodin indisponível. Recarregue a página.");
      } else {
        toast.error("O Astrodin não conseguiu responder. Tente novamente.");
      }
    },
  });

  const is404 = useMemo(
    () => !!error && /\b404\b|not\s*found/i.test(String(error.message ?? "")),
    [error],
  );

  // Auto-send the initial prompt that triggered the lazy load.
  const sentInitial = useRef(false);
  useEffect(() => {
    if (sentInitial.current) return;
    const trimmed = initialPrompt?.trim();
    if (!trimmed) return;
    sentInitial.current = true;
    void sendMessage({ text: trimmed });
  }, [initialPrompt, sendMessage]);

  const lastSyncedLen = useRef(initialMessages.length);
  useEffect(() => {
    if (messages.length !== lastSyncedLen.current) {
      lastSyncedLen.current = messages.length;
      onSync(messages);
    }
  }, [messages, onSync]);

  useEffect(() => {
    if (status === "ready" || status === undefined) {
      textareaRef.current?.focus();
    }
  }, [status, threadId]);

  const isLoading = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    void sendMessage({ text: trimmed });
  };

  return (
    <>
      <Conversation className="flex-1 px-3">
        <ConversationContent className="pb-4">
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent>
                {m.parts.map((p, i) => {
                  if (p.type === "text") {
                    return m.role === "assistant" ? (
                      <MessageResponse key={i}>{p.text}</MessageResponse>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap text-sm">
                        {p.text}
                      </p>
                    );
                  }
                  return null;
                })}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>O Astrodin está pensando...</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && (
            is404 ? (
              <div className="space-y-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-3 text-sm text-destructive">
                <p className="font-medium">⚠️ O Astrodin está fora de alcance.</p>
                <p className="text-destructive/80">
                  A conexão com o serviço de IA não foi encontrada (404).
                  Recarregue a página para reconectar.
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-1 rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:opacity-90"
                >
                  Recarregar página
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                Algo deu errado. Toque em uma sugestão ou envie sua pergunta novamente.
              </div>
            )
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="px-3 pb-24 pt-2">
        <PromptInput onSubmit={() => send(input)}>
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo ao Astrodin..."
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              status={status}
              disabled={!input.trim() && !isLoading}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}