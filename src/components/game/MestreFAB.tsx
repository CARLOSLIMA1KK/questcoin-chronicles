import { useEffect, useMemo, useState } from "react";
import { CloseX } from "@/components/game/CloseX";
import { useNavigate } from "@tanstack/react-router";
import mestreImg from "@/assets/mestre-finan.webp";

const GREETINGS = [
  "Olá, bem-vindo de volta! Como está, jovem aventureiro?",
  "Pronto para continuar a jornada? Que tal o Mundo 1?",
  "Que bom te ver! Bora investir um pouco hoje?",
  "Saudações! Já visitou seu cofrinho hoje?",
  "Olá, herói! Posso te dar uma dica de mesada?",
  "Bem-vindo! Quer entender juros de forma simples?",
  "Ei, aventureiro! Vamos planejar uma meta de compra?",
  "Olá! Que tal aprender sobre necessidade x desejo?",
];

function pickGreeting() {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

export function MestreFAB() {
  const navigate = useNavigate();
  const greeting = useMemo(pickGreeting, []);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  // Mostra a bolha após pequeno delay e esconde após ~12s.
  useEffect(() => {
    const inT = setTimeout(() => setBubbleOpen(true), 800);
    const outT = setTimeout(() => setBubbleOpen(false), 12_000);
    return () => {
      clearTimeout(inT);
      clearTimeout(outT);
    };
  }, []);

  const goToMestre = () => {
    setBubbleOpen(false);
    navigate({ to: "/mestre" });
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-40 flex items-end gap-2">
        {/* Speech bubble */}
        {bubbleOpen && (
          <div
            role="status"
            aria-live="polite"
            className="relative max-w-[220px] animate-fade-in rounded-2xl rounded-br-sm border border-game-gold/40 bg-card/95 px-3 py-2 pr-7 text-[12px] leading-snug text-foreground shadow-[var(--shadow-glow-gold)] backdrop-blur-sm"
          >
            <CloseX
              size="sm"
              aria-label="Fechar mensagem"
              onClick={(e) => {
                e.stopPropagation();
                setBubbleOpen(false);
              }}
              className="absolute -right-1 -top-1"
            />
            <p className="font-display text-[10px] uppercase tracking-wider text-game-gold">
              Mestre Finan
            </p>
            <button
              type="button"
              onClick={goToMestre}
              className="mt-0.5 block text-left"
            >
              {greeting}
              <span className="mt-1 block text-[11px] font-semibold text-game-gold underline-offset-2 hover:underline">
                Conversar →
              </span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={goToMestre}
          aria-label="Falar com o Mestre Finan"
          className="relative grid h-16 w-16 place-items-center rounded-full border-2 border-game-gold bg-[image:var(--gradient-hero)] shadow-[var(--shadow-glow-gold)] transition-transform hover:scale-105 active:scale-95"
        >
          <img
            src={mestreImg}
            alt=""
            className="h-[88%] w-[88%] rounded-full object-contain animate-[float_3s_ease-in-out_infinite]"
            draggable={false}
          />
          <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-game-gold bg-card font-display text-[10px] text-game-gold">
            ?
          </span>
        </button>
      </div>
    </>
  );
}