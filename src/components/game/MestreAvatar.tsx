import mestreImg from "@/assets/mestre-finan.webp";
import { cn } from "@/lib/utils";

type Mood = "cheer" | "encourage" | "celebrate" | "boss" | "neutral";
type Size = "sm" | "md" | "lg";

const SIZE_PX: Record<Size, string> = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28",
};

const MOOD_RING: Record<Mood, string> = {
  cheer: "border-game-neon [box-shadow:0_0_24px_oklch(0.92_0.29_140/0.55)]",
  encourage: "border-game-gold [box-shadow:0_0_24px_oklch(0.86_0.17_88/0.5)]",
  celebrate: "border-game-gold [box-shadow:0_0_30px_oklch(0.86_0.17_88/0.6)]",
  boss: "border-game-accent [box-shadow:0_0_36px_oklch(0.7_0.32_330/0.7)]",
  neutral: "border-white/20",
};

export function MestreAvatar({
  size = "md",
  mood = "neutral",
  float = true,
  className,
}: {
  size?: Size;
  mood?: Mood;
  float?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full border-2 bg-card/80 backdrop-blur-sm animate-[pop_0.3s_ease-out_both]",
        SIZE_PX[size],
        MOOD_RING[mood],
        className,
      )}
    >
      <img
        src={mestreImg}
        alt="Mestre Finan"
        className={cn(
          "h-[88%] w-[88%] object-contain",
          float && "animate-[float_3s_ease-in-out_infinite]",
        )}
        draggable={false}
      />
    </div>
  );
}

export function MestreSpeech({
  message,
  tone = "neutral",
  className,
}: {
  message: string;
  tone?: "neon" | "gold" | "accent" | "neutral";
  className?: string;
}) {
  const border =
    tone === "neon"
      ? "border-game-neon/50"
      : tone === "gold"
      ? "border-game-gold/50"
      : tone === "accent"
      ? "border-game-accent/50"
      : "border-white/15";
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card/85 px-3 py-2 text-sm text-foreground backdrop-blur-sm animate-fade-in",
        border,
        className,
      )}
    >
      <p className="leading-snug">
        <span className="mr-1 font-display text-[11px] uppercase tracking-wider text-muted-foreground">
          Mestre Finan ·
        </span>
        {message}
      </p>
    </div>
  );
}