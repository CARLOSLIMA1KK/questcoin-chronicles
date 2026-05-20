import { cn } from "@/lib/utils";
import type { ShopItem } from "@/lib/shop";
import kCoin from "@/assets/k-coin.webp";

type Props = {
  item: ShopItem;
  balance: number;
  onBuy: (item: ShopItem) => void;
};

export function ShopItemCard({ item, balance, onBuy }: Props) {
  const canAfford = balance >= item.price;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-2xl border p-3 backdrop-blur-md transition-all",
        "border-[color:var(--glass-border)] bg-[color:var(--glass-bg)]",
        !canAfford && "opacity-60",
      )}
    >
      <div className="relative grid h-24 w-24 place-items-center">
        <div className="absolute inset-3 rounded-full bg-[color:var(--game-purple-light)]/40 blur-xl" />
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={96}
          height={96}
          className="relative h-24 w-24 object-contain drop-shadow-[0_4px_12px_oklch(0_0_0/0.4)]"
        />
      </div>
      <div className="text-center">
        <h3 className="font-display text-sm leading-tight text-foreground">{item.name}</h3>
        <p className="mt-0.5 text-[10px] leading-snug text-foreground/65 line-clamp-2 min-h-[26px]">
          {item.description}
        </p>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-[color:var(--game-purple)]/60 px-2 py-1">
        <img src={kCoin} alt="" width={14} height={14} className="h-3.5 w-3.5" />
        <span className="font-display text-xs text-[color:var(--game-gold)]">
          K-{item.price}
        </span>
      </div>
      <button
        type="button"
        disabled={!canAfford}
        onClick={() => onBuy(item)}
        className={cn(
          "mt-1 w-full rounded-xl px-3 py-2 font-display text-xs uppercase tracking-wider transition-transform active:translate-y-0.5",
          canAfford
            ? "bg-[color:var(--game-gold)] text-[color:var(--game-purple)] shadow-[var(--shadow-3d-gold)] active:shadow-none"
            : "bg-white/5 text-foreground/40 cursor-not-allowed",
        )}
      >
        {canAfford ? "Comprar" : "Sem saldo"}
      </button>
    </div>
  );
}