import { cn } from "@/lib/utils";
import type { Scope } from "@/lib/ranking";

const TABS: Array<{ id: Scope; label: string }> = [
  { id: "geral", label: "Geral" },
  { id: "escola", label: "Escola" },
  { id: "turma", label: "Turma" },
];

export function RankingScopeTabs({ value, onChange }: { value: Scope; onChange: (s: Scope) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-1 backdrop-blur-md">
      {TABS.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-bold transition-all",
              active
                ? "bg-[color:var(--game-gold)] text-[color:var(--game-purple)] shadow-[var(--shadow-glow-gold)]"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}