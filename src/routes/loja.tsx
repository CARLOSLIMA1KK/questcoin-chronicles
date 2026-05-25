import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Store } from "lucide-react";
import { toast } from "sonner";
import { Screen } from "@/components/game/Screen";
import { GlassPanel } from "@/components/game/GlassPanel";
import { ShopItemCard } from "@/components/game/ShopItemCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button3D } from "@/components/game/Button3D";
import { SHOP_ITEMS, MOCK_FRIENDS, appendHistory, type ShopItem, type Friend } from "@/lib/shop";
import { useWallet, wallet } from "@/lib/wallet";
import { playSfx } from "@/lib/sfx";
import kCoin from "@/assets/k-coin-v2.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: "Loja do Astrodin — Astrodin" },
      { name: "description", content: "Gaste seus Star Coins com sabedoria: escudos, presentes e boosts pra sua jornada." },
      { property: "og:title", content: "Loja do Astrodin — Astrodin" },
      { property: "og:description", content: "Gaste seus Star Coins com sabedoria: escudos, presentes e boosts pra sua jornada." },
    ],
  }),
  component: LojaPage,
});

function LojaPage() {
  const { balance } = useWallet();
  const [pending, setPending] = useState<ShopItem | null>(null);
  const [pickFriendFor, setPickFriendFor] = useState<ShopItem | null>(null);
  const [chosenFriend, setChosenFriend] = useState<Friend | null>(null);

  function handleBuy(item: ShopItem) {
    if (item.needsFriend) {
      setPickFriendFor(item);
      setChosenFriend(null);
    } else {
      setPending(item);
    }
  }

  function confirmPurchase() {
    if (!pending) return;
    try {
      wallet.spend(pending.price, pending.id);
      playSfx("coin");
      appendHistory({
        id: `${Date.now()}-${pending.id}`,
        itemId: pending.id,
        price: pending.price,
        friendId: chosenFriend?.id,
        friendName: chosenFriend?.name,
        at: Date.now(),
      });
      if (pending.id === "gift-shield" && chosenFriend) {
        toast.success(`🎁 Você presenteou ${chosenFriend.name}!`);
      } else {
        toast.success(`${pending.name} adicionado à mochila!`);
      }
      setPending(null);
      setChosenFriend(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao comprar");
    }
  }

  function confirmFriendPick() {
    if (!pickFriendFor || !chosenFriend) return;
    setPending(pickFriendFor);
    setPickFriendFor(null);
  }

  return (
    <Screen>
      <div className="space-y-4">
        <GlassPanel className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--game-gold)] shadow-[var(--shadow-glow-gold)]">
              <Store className="h-5 w-5 text-[color:var(--game-purple)]" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-xl text-foreground">Loja do Astrodin</h1>
              <p className="text-xs text-foreground/65">Gaste com sabedoria — investir é melhor!</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[color:var(--game-purple)]/60 px-3 py-1.5">
              <img src={kCoin} alt="" width={16} height={16} className="h-4 w-4" />
              <span className="font-display text-sm text-[color:var(--game-gold)] tabular-nums">
                {Math.floor(balance).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-2 gap-3">
          {SHOP_ITEMS.map((item) => (
            <ShopItemCard key={item.id} item={item} balance={balance} onBuy={handleBuy} />
          ))}
        </div>

        <GlassPanel className="p-3">
          <p className="text-[11px] leading-relaxed text-foreground/65">
            <span className="font-semibold text-foreground">Dica do Astrodin:</span>{" "}
            cada Star Coin investido rende todo dia. Pense duas vezes antes de gastar! 💡
          </p>
        </GlassPanel>
      </div>

      {/* Confirmação de compra */}
      <Sheet open={!!pending} onOpenChange={(o) => !o && setPending(null)}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl border-t border-game-gold/25 bg-card p-0"
        >
          {pending && (
            <div className="mx-auto w-full max-w-md px-5 pb-6 pt-5">
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/20" />
              <div className="flex items-center gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] [box-shadow:var(--shadow-3d-purple)]">
                  <img
                    src={pending.image}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain drop-shadow-[0_3px_6px_oklch(0_0_0/0.55)]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Confirmar compra
                  </p>
                  <SheetHeader className="space-y-1 p-0 text-left">
                    <SheetTitle className="font-display text-xl text-foreground">
                      {pending.name}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                      {pending.description}
                    </SheetDescription>
                  </SheetHeader>
                </div>
              </div>

              {chosenFriend && (
                <p className="mt-3 text-xs text-muted-foreground">
                  🎁 Presente para{" "}
                  <span className="font-semibold text-game-neon">{chosenFriend.name}</span>
                </p>
              )}

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <img src={kCoin} alt="Star Coin" width={24} height={24} className="h-6 w-6" />
                <span className="font-display text-sm text-game-gold">
                  −{pending.price}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  Saldo após: {Math.max(0, Math.floor(balance) - pending.price).toLocaleString("pt-BR")}
                </span>
              </div>

              <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                Lembre: investir rende todo dia 💡
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button3D
                  variant="purple"
                  onClick={() => setPending(null)}
                  className="w-full text-sm"
                >
                  Cancelar
                </Button3D>
                <Button3D
                  variant="gold"
                  onClick={confirmPurchase}
                  className="w-full text-sm"
                >
                  Confirmar
                </Button3D>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Seleção de amigo (presente) */}
      <Sheet open={!!pickFriendFor} onOpenChange={(o) => !o && setPickFriendFor(null)}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl border-t border-game-gold/25 bg-card p-0"
        >
          <div className="mx-auto w-full max-w-md px-5 pb-6 pt-5">
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/20" />
            <SheetHeader className="space-y-1 p-0 text-left">
              <SheetTitle className="font-display text-xl text-foreground">
                Pra quem é o presente?
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Escolha um amigo da sua turma.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 grid gap-2 max-h-[280px] overflow-y-auto">
            {MOCK_FRIENDS.map((f) => {
              const active = chosenFriend?.id === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setChosenFriend(f)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                    active
                      ? "border-[color:var(--game-neon)] bg-[color:var(--game-neon)]/15"
                      : "border-[color:var(--glass-border)] bg-white/5 hover:bg-white/10",
                  )}
                >
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--game-purple-light)] font-display text-sm">
                    {f.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                  </div>
                  <span className="flex-1 text-sm font-semibold text-foreground">{f.name}</span>
                  {active && (
                    <span className="text-[10px] font-bold text-[color:var(--game-neon)]">SELECIONADO</span>
                  )}
                </button>
              );
            })}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button3D
                variant="purple"
                onClick={() => setPickFriendFor(null)}
                className="w-full text-sm"
              >
                Cancelar
              </Button3D>
              <Button3D
                variant="gold"
                disabled={!chosenFriend}
                onClick={confirmFriendPick}
                className={cn("w-full text-sm", !chosenFriend && "opacity-40")}
              >
                Continuar
              </Button3D>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Screen>
  );
}