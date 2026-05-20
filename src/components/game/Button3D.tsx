import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "neon" | "purple";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  gold: "bg-[image:var(--gradient-gold)] text-[color:var(--primary-foreground)] [box-shadow:var(--shadow-3d-gold)]",
  neon: "bg-[image:var(--gradient-neon)] text-[color:var(--primary-foreground)] [box-shadow:var(--shadow-3d-neon)]",
  purple: "bg-[image:var(--gradient-hero)] text-foreground [box-shadow:var(--shadow-3d-purple)]",
};

export const Button3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant = "gold", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "font-display inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg uppercase tracking-wide",
        "transition-transform duration-100 active:translate-y-1 active:[box-shadow:none]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
Button3D.displayName = "Button3D";