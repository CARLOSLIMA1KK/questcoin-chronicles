import { Volume2, VolumeX } from "lucide-react";
import { toggleSfxMuted, useSfxMuted } from "@/lib/sfx";
import { cn } from "@/lib/utils";

export function SfxToggle({ className }: { className?: string }) {
  const muted = useSfxMuted();
  return (
    <button
      type="button"
      onClick={toggleSfxMuted}
      aria-label={muted ? "Ativar sons" : "Silenciar sons"}
      aria-pressed={muted}
      className={cn(
        "grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-all hover:bg-white/10 active:scale-95",
        className,
      )}
    >
      {muted ? (
        <VolumeX className="h-3.5 w-3.5" strokeWidth={2.25} />
      ) : (
        <Volume2 className="h-3.5 w-3.5 text-game-neon" strokeWidth={2.25} />
      )}
    </button>
  );
}