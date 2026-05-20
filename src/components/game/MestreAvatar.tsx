import { ASTRODIN } from "@/lib/brandAssets";
import { cn } from "@/lib/utils";

const astrodinDefault = ASTRODIN.avatar;
const astrodinHappy = ASTRODIN.happy;
const astrodinSad = ASTRODIN.sad;
const astrodinThinking = ASTRODIN.thinking;

type Mood = "cheer" | "encourage" | "celebrate" | "boss" | "neutral";
type Size = "sm" | "md" | "lg";

const SIZE_PX: Record<Size, string> = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28",
};

const MOOD_RING: Record<Mood, string> = {
  cheer: "border-game-neon [box-shadow:0_0_24px_oklch(0.84_0.16_85/0.55)]",
  encourage: "border-game-gold [box-shadow:0_0_24px_oklch(0.70_0.20_45/0.5)]",
  celebrate: "border-game-gold [box-shadow:0_0_30px_oklch(0.70_0.20_45/0.6)]",
  boss: "border-game-accent [box-shadow:0_0_36px_oklch(0.55_0.18_290/0.7)]",
  neutral: "border-white/20",
};

const MOOD_IMG: Record<Mood, string> = {
  cheer: astrodinHappy,
  celebrate: astrodinHappy,
  encourage: astrodinSad,
  boss: astrodinThinking,
  neutral: astrodinDefault,
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
        src={MOOD_IMG[mood]}
        alt="Astrodin"
        className={cn(
          "h-[92%] w-[92%] object-contain",
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
          Astrodin ·
        </span>
        {message}
      </p>
    </div>
  );
}
