import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
};

/** Partículas estelares de fundo. Posições estáveis por seed. */
export function SpaceParticles({ count = 28, className }: Props) {
  const reduce = useReducedMotion();
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // hash determinístico — evita pulo entre renders
      const s = Math.sin(i * 9301 + 49297) * 233280;
      const x = ((s - Math.floor(s)) * 100);
      const t = Math.sin(i * 7919 + 12345) * 233280;
      const y = ((t - Math.floor(t)) * 100);
      const size = 1 + ((i * 13) % 5) * 0.6;
      const delay = (i * 0.13) % 4;
      const dur = 2.4 + ((i * 7) % 30) / 10;
      return { x, y, size, delay, dur, key: i };
    });
  }, [count]);

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
    >
      {stars.map((s) => (
        <motion.span
          key={s.key}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px oklch(0.95 0.05 280 / 0.8)",
          }}
          initial={{ opacity: 0.15, scale: 0.8 }}
          animate={
            reduce
              ? { opacity: 0.4 }
              : { opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.1, 0.8] }
          }
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
