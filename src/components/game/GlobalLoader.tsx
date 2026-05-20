import { motion, useReducedMotion } from "motion/react";
import { ASTRODIN, CURRENCY_ICON } from "@/lib/brandAssets";
import { useLoading } from "@/lib/loading";
import { cn } from "@/lib/utils";

export function GlobalLoader() {
  const { visible, label } = useLoading();
  const reduce = useReducedMotion();

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
        <div className="relative h-36 w-32 overflow-hidden">
          {/* Star Coin (3D toss) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1 h-9 w-9 -translate-x-12 [animation:coin-toss_1.2s_ease-in-out_infinite] [perspective:200px]"
          >
            <img
              src={CURRENCY_ICON}
              alt=""
              className="h-full w-full [animation:coin-spin3d_1.2s_linear_infinite] [transform-style:preserve-3d] drop-shadow-[0_0_8px_oklch(0.70_0.20_45/0.6)]"
            />
          </div>

          {/* Astrodin foguete decolando */}
          <motion.img
            src={ASTRODIN.rocket}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute bottom-2 left-1/2 h-24 w-24 -translate-x-1/2 drop-shadow-[0_8px_18px_oklch(0.70_0.20_45/0.45)]"
            animate={
              reduce
                ? { y: 0 }
                : { y: [0, -6, 0, -4, 0], rotate: [-2, 2, -2] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Trilha de fumaça/chamas */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-1/2 h-3 w-10 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.84_0.16_85/0.7),transparent_70%)] blur-[2px]"
              animate={{ scaleX: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-foreground/80 [animation:shimmer_2s_linear_infinite] bg-[linear-gradient(90deg,transparent,white,transparent)] bg-[length:200%_100%] bg-clip-text text-transparent">
          {label ?? "Decolando…"}
        </p>
      </div>
    </div>
  );
}
