import * as React from "react";
import { cn } from "@/lib/utils";

export const GlassPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border backdrop-blur-md",
        "bg-[color:var(--glass-bg)] border-[color:var(--glass-border)]",
        "shadow-[0_8px_32px_-12px_oklch(0_0_0/0.5)]",
        className,
      )}
      {...props}
    />
  ),
);
GlassPanel.displayName = "GlassPanel";