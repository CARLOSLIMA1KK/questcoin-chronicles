import { Link, useRouterState } from "@tanstack/react-router";
import { Map, Store, Trophy, PiggyBank, Backpack, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  to: "/" | "/loja" | "/mochila" | "/ranking" | "/cofrinho";
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
};

// Ordem otimizada para o público infantil: Mapa no centro como ação principal,
// finanças (Cofrinho) ao lado, social (Ranking) à esquerda, consumo à direita.
const items: NavItem[] = [
  { to: "/ranking", label: "Ranking", icon: Trophy },
  { to: "/cofrinho", label: "Cofrinho", icon: PiggyBank },
  { to: "/", label: "Mapa", icon: Map, highlight: true },
  { to: "/loja", label: "Loja", icon: Store },
  { to: "/mochila", label: "Mochila", icon: Backpack },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-3 pb-3 pt-2"
    >
      <ul
        role="list"
        className="flex items-stretch justify-between gap-1 rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-2 py-2 backdrop-blur-md shadow-[0_-8px_32px_-12px_oklch(0_0_0/0.6)]"
      >
        {items.map(({ to, label, icon: Icon, highlight }) => {
          const active = pathname === to;
          const ariaLabel = active ? `${label} — página atual` : label;
          return (
            <li key={to} className="flex flex-1">
              <Link
                to={to}
                aria-label={ariaLabel}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "bg-[image:var(--gradient-hero)] shadow-[var(--shadow-glow-neon)]"
                    : "text-foreground/70 hover:text-foreground",
                  highlight && !active && "-mt-3 rounded-2xl border border-game-gold/40 bg-game-purple-light/40 shadow-[var(--shadow-glow-gold)]",
                  highlight && "scale-105",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "h-6 w-6 transition-transform group-active:scale-90 motion-reduce:transition-none",
                    active && "text-game-neon",
                    highlight && !active && "text-game-gold",
                  )}
                />
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-wide",
                    active ? "text-foreground" : "",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}