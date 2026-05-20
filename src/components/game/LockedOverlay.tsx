import { ShieldOff, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button3D } from "./Button3D";

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function LockedOverlay({
  unlockAt,
  onClose,
}: {
  unlockAt: number;
  onClose: () => void;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const remaining = unlockAt - now;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 px-6 animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl border border-destructive/40 bg-card p-6 text-center [box-shadow:0_0_40px_oklch(0.65_0.25_25/0.4)]">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-destructive/20">
          <ShieldOff className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="mt-4 font-display text-2xl text-foreground">Sem escudos!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Você perdeu todos os seus escudos. Reveja o conteúdo e volte mais forte.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
          <Clock className="h-5 w-5 text-game-gold" />
          <span className="font-display text-2xl text-game-gold">{formatRemaining(remaining)}</span>
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          Escudos voltam em
        </p>
        <Button3D variant="gold" className="mt-5 w-full" onClick={onClose}>
          Voltar ao mapa
        </Button3D>
      </div>
    </div>
  );
}
