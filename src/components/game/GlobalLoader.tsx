import mestreImg from "@/assets/mestre-finan.webp";
import kCoin from "@/assets/k-coin.webp";
import { useLoading } from "@/lib/loading";
import { cn } from "@/lib/utils";

export function GlobalLoader() {
  const { visible, label } = useLoading();
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label ?? "Carregando"}
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-black/55 backdrop-blur-sm transition-opacity duration-200",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0",
      )}
    >
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-card/80 px-8 py-7 shadow-2xl">
        <div className="relative h-32 w-28">
          {/* Coin (3D toss) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2 h-9 w-9 [animation:coin-toss_1.2s_ease-in-out_infinite] [perspective:200px]"
          >
            <img
              src={kCoin}
              alt=""
              className="h-full w-full [animation:coin-spin3d_1.2s_linear_infinite] [transform-style:preserve-3d] drop-shadow-[0_0_8px_oklch(0.86_0.17_88/0.6)]"
            />
          </div>
          {/* Owl */}
          <img
            src={mestreImg}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute bottom-3 left-1/2 h-20 w-20 -translate-x-1/2 origin-bottom [animation:owl-squash_1.2s_ease-in-out_infinite]"
          />
          {/* Ground shadow */}
          <span className="absolute bottom-1 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-black/50 blur-[2px] [animation:shadow-pulse_1.2s_ease-in-out_infinite]" />
        </div>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-foreground/80 [animation:shimmer_2s_linear_infinite] bg-[linear-gradient(90deg,transparent,white,transparent)] bg-[length:200%_100%] bg-clip-text text-transparent">
          {label ?? "Carregando…"}
        </p>
      </div>
    </div>
  );
}