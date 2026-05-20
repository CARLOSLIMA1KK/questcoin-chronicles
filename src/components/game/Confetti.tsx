export function Confetti({ count = 40 }: { count?: number }) {
  const colors = [
    "var(--game-gold)",
    "var(--game-neon)",
    "var(--game-accent)",
    "var(--game-purple-light)",
  ];
  const pieces = Array.from({ length: count });
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 1.6 + Math.random() * 1.6;
        const size = 6 + Math.random() * 6;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              top: "-5vh",
              width: size,
              height: size * 1.6,
              background: color,
              animation: `confetti-fall ${duration}s ${delay}s linear forwards`,
            }}
            className="absolute rounded-sm"
          />
        );
      })}
    </div>
  );
}
