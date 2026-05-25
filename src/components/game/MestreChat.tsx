import { lazy, Suspense, useState } from "react";
import { Plus, MessagesSquare, Trash2, Send } from "lucide-react";
import type { UIMessage } from "ai";
import { ASTRODIN } from "@/lib/brandAssets";

const mestreAvatar = ASTRODIN.avatar;
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// AI SDK lives in this chunk — only loaded when the user actually opens the chat.
const MestreChatWindow = lazy(() => import("./MestreChatWindow"));

const SUGGESTIONS = [
  {
    short: "Necessidade x desejo",
    text: "Qual a diferença entre necessidade e desejo?",
    greeting: `Saudações, cadete!\n\nVamos explorar juntos a diferença entre necessidade e desejo — um dos saberes mais valiosos para quem navega o cosmos do dinheiro consciente.\n\nMe conte: o que despertou a sua curiosidade sobre esse tema?`,
  },
  {
    short: "Mesada",
    text: "Como começar uma poupança com a mesada?",
    greeting: `Saudações, cadete!\n\nA mesada é o seu primeiro combustível nesta missão — e aprender a guardá-la é o início de toda grande jornada financeira.\n\nQuanto você costuma receber, e o que gostaria de conquistar com a sua poupança?`,
  },
  {
    short: "Juros",
    text: "O que é juros e por que eles crescem?",
    greeting: `Saudações, cadete!\n\nOs juros são como gravidade cósmica: podem te impulsionar quando você poupa, ou te puxar pra um buraco negro quando se endivida.\n\nPor onde prefere começar — entender como eles nascem ou como evitá-los?`,
  },
  {
    short: "Consumidor",
    text: "Quais meus direitos como consumidor?",
    greeting: `Saudações, cadete!\n\nTodo consumidor carrega um escudo invisível: o Código de Defesa do Consumidor, que protege você em cada compra.\n\nQual situação você gostaria de entender melhor para usar bem esse escudo?`,
  },
  {
    short: "Metas",
    text: "Como planejar uma meta de compra?",
    greeting: `Saudações, cadete!\n\nToda grande conquista começa com uma meta clara — um destino no mapa estelar para guiar seus Star Coins.\n\nO que você sonha em conquistar? Vamos transformar esse sonho em um plano.`,
  },
  {
    short: "Cartão",
    text: "Cartão de crédito é dinheiro?",
    greeting: `Saudações, cadete!\n\nO cartão de crédito parece dinheiro, mas é, na verdade, um empréstimo disfarçado — uma ferramenta poderosa que exige sabedoria.\n\nO que você gostaria de descobrir primeiro sobre ele?`,
  },
];

// Saudação padrão do Astrodin — usada quando o usuário abre o chat sem escolher tema.
const DEFAULT_GREETING = `Saudações, cadete!\n\nEu sou o Astrodin, mascote da FORME e seu guia pela galáxia do dinheiro.\n\nPosso te ajudar com mesada, poupança, juros, consumo consciente e direitos do consumidor.\n\nPor onde começamos a sua missão?`;

const buildGreeting = (text: string = DEFAULT_GREETING): UIMessage => ({
  id: `greet_${Math.random().toString(36).slice(2, 9)}`,
  role: "assistant",
  parts: [{ type: "text", text }],
});

type Thread = {
  id: string;
  title: string;
  messages: UIMessage[];
  updatedAt: number;
  // Set on first interaction to mount the AI-powered window.
  opened?: boolean;
  initialPrompt?: string;
};

const newThreadId = () =>
  `thr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

const newThread = (): Thread => ({
  id: newThreadId(),
  title: "Nova jornada",
  messages: [],
  updatedAt: Date.now(),
});

function extractText(m: UIMessage): string {
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .trim();
}

export function MestreChat() {
  const [threads, setThreads] = useState<Thread[]>(() => [newThread()]);
  const [activeId, setActiveId] = useState<string>(() => threads[0]!.id);
  const [sheetOpen, setSheetOpen] = useState(false);

  const active = threads.find((t) => t.id === activeId) ?? threads[0]!;

  const handleNewThread = () => {
    const t = newThread();
    setThreads((prev) => [t, ...prev]);
    setActiveId(t.id);
    setSheetOpen(false);
  };

  const handleDeleteThread = (id: string) => {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) {
        const t = newThread();
        setActiveId(t.id);
        return [t];
      }
      if (id === activeId) setActiveId(next[0]!.id);
      return next;
    });
  };

  const handleThreadSync = (id: string, messages: UIMessage[]) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const firstUser = messages.find((m) => m.role === "user");
        const title = firstUser
          ? extractText(firstUser).slice(0, 38) || t.title
          : t.title;
        return { ...t, messages, title, updatedAt: Date.now() };
      }),
    );
  };

  const openActiveWith = (prompt?: string, greetingText?: string) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? {
              ...t,
              opened: true,
              initialPrompt: prompt,
              // Seed greeting as the first message when the thread opens.
              messages:
                t.messages.length === 0
                  ? [buildGreeting(greetingText)]
                  : t.messages,
            }
          : t,
      ),
    );
  };

  // Preload the chat chunk when the user shows intent (hover/focus on composer area).
  const preload = () => {
    void import("./MestreChatWindow");
  };

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-md flex-col">
      {/* Header */}
      <header className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[image:var(--gradient-hero)] shadow-[var(--shadow-glow-gold)]">
            <img
              src={mestreAvatar}
              alt="Astrodin"
              width={512}
              height={512}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <h1 className="font-display text-xl text-game-gold">Astrodin</h1>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Mentor FORME · BNCC
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleNewThread}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/30 text-game-gold transition-colors hover:bg-black/50"
            aria-label="Nova conversa"
          >
            <Plus className="h-5 w-5" />
          </button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/30 text-foreground transition-colors hover:bg-black/50"
                aria-label="Conversas"
              >
                <MessagesSquare className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card p-0 text-foreground">
              <SheetHeader className="border-b border-white/10 p-4">
                <SheetTitle className="font-display text-lg text-game-gold">
                  Suas jornadas
                </SheetTitle>
              </SheetHeader>
              <div className="p-3">
                <button
                  type="button"
                  onClick={handleNewThread}
                  className="mb-3 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-medium text-game-gold hover:bg-black/50"
                >
                  <Plus className="h-4 w-4" /> Nova jornada
                </button>
                <ul className="space-y-1">
                  {threads.map((t) => (
                    <li
                      key={t.id}
                      className={cn(
                        "group flex items-center gap-1 rounded-xl border px-2 py-1.5 transition-colors",
                        t.id === activeId
                          ? "border-game-gold/50 bg-[image:var(--gradient-hero)]"
                          : "border-white/10 hover:bg-white/5",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveId(t.id);
                          setSheetOpen(false);
                        }}
                        className="flex-1 truncate text-left text-sm"
                      >
                        {t.title}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteThread(t.id)}
                        className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive"
                        aria-label="Apagar conversa"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {active.opened ? (
        <Suspense fallback={<ChatSkeleton />}>
          <MestreChatWindow
            key={active.id}
            threadId={active.id}
            initialMessages={active.messages}
            initialPrompt={active.initialPrompt}
            onSync={(msgs) => handleThreadSync(active.id, msgs)}
          />
        </Suspense>
      ) : (
        <EmptyState
          onPick={(text, greeting) => openActiveWith(text, greeting)}
          onCompose={() => openActiveWith(undefined)}
          onIntent={preload}
        />
      )}
    </div>
  );
}

function ChatSkeleton() {
  return (
    <>
      <div className="flex-1 space-y-4 px-3 pt-4">
        {/* assistant bubble */}
        <div className="flex items-end gap-2">
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded-md bg-white/10" />
            <div className="h-3 w-5/6 animate-pulse rounded-md bg-white/10" />
            <div className="h-3 w-2/3 animate-pulse rounded-md bg-white/10" />
          </div>
        </div>
        {/* user bubble */}
        <div className="flex justify-end">
          <div className="max-w-[70%] space-y-2 rounded-2xl bg-primary/20 px-4 py-3">
            <div className="h-3 w-32 animate-pulse rounded-md bg-white/15" />
            <div className="h-3 w-20 animate-pulse rounded-md bg-white/15" />
          </div>
        </div>
        {/* assistant typing */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-white/10" />
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-game-gold [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-game-gold [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-game-gold" />
            <span className="ml-2">Carregando o Astrodin...</span>
          </span>
        </div>
      </div>
      {/* composer placeholder */}
      <div className="px-3 pb-24 pt-2">
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
          <div className="h-10 flex-1 animate-pulse rounded-lg bg-white/5" />
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-game-gold/30">
            <Send className="h-4 w-4 text-game-gold/70" />
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyState({
  onPick,
  onCompose,
  onIntent,
}: {
  onPick: (text: string, greeting?: string) => void;
  onCompose: () => void;
  onIntent: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Centered greeting */}
      <div className="flex flex-col items-center px-6 pt-6 text-center">
        <h2 className="font-display text-xl text-foreground">
          Olá, cadete!
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Escolha uma missão para começar sua jornada
        </p>
      </div>

      {/* Suggestion topics — destaque principal */}
      <div className="px-3 pt-4">
        <div className="grid grid-cols-2 gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.text}
              type="button"
              onMouseEnter={onIntent}
              onTouchStart={onIntent}
              onClick={() => onPick(s.text, s.greeting)}
              className="rounded-2xl border border-game-gold/30 bg-[image:var(--gradient-hero)] px-3 py-3 text-center text-sm font-semibold text-foreground shadow-[var(--shadow-glow-gold)] transition-all hover:border-game-gold hover:scale-[1.02] active:scale-[0.98]"
            >
              {s.short}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer pushes composer toward the bottom */}
      <div className="flex-1" />

      {/* Visible composer (preview) — clicking loads the real AI chat */}
      <div className="px-3 pb-24 pt-1">
        <button
          type="button"
          onMouseEnter={onIntent}
          onFocus={onIntent}
          onTouchStart={onIntent}
          onClick={onCompose}
          className="flex w-full items-center gap-2 rounded-2xl border border-game-gold/40 bg-black/40 px-3 py-2.5 text-left shadow-[var(--shadow-glow-gold)] transition-colors hover:border-game-gold hover:bg-black/60"
        >
          <span className="flex-1 truncate px-1 text-sm text-muted-foreground">
            Pergunte algo ao Astrodin...
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-hero)]">
            <Send className="h-4 w-4 text-game-gold" />
          </span>
        </button>
      </div>
    </div>
  );
}