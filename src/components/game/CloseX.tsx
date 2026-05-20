import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md";

interface CloseXProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
}

const sizes: Record<Size, { box: string; icon: string }> = {
  sm: { box: "h-7 w-7", icon: "h-3.5 w-3.5" },
  md: { box: "h-9 w-9", icon: "h-4 w-4" },
};

/**
 * Game-styled red 3D close button (X).
 * Use everywhere a modal/sheet/popover needs a close affordance.
 */
export const CloseX = React.forwardRef<HTMLButtonElement, CloseXProps>(
  ({ className, size = "md", "aria-label": ariaLabel = "Fechar", ...props }, ref) => {
    const s = sizes[size];
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(
          "grid place-items-center rounded-full text-white",
          "bg-[image:linear-gradient(180deg,oklch(0.72_0.22_25)_0%,oklch(0.55_0.24_25)_100%)]",
          "border border-[oklch(0.38_0.2_25)]",
          "[box-shadow:inset_0_1px_0_oklch(1_0_0/0.35),0_3px_0_oklch(0.32_0.18_25),0_5px_10px_-2px_oklch(0_0_0/0.5)]",
          "transition-transform duration-100 active:translate-y-[2px]",
          "active:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.25),0_1px_0_oklch(0.32_0.18_25),0_2px_5px_-2px_oklch(0_0_0/0.5)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.22_25)]",
          s.box,
          className,
        )}
        {...props}
      >
        <X className={cn(s.icon)} strokeWidth={3.5} />
      </button>
    );
  },
);
CloseX.displayName = "CloseX";
