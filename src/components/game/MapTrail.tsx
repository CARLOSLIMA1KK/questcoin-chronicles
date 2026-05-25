import type { World } from "@/lib/curriculum";
import type { StageStatus } from "@/lib/progress";
import { StageNode } from "./StageNode";
import { ASTRODIN } from "@/lib/brandAssets";
import { cn } from "@/lib/utils";

const POSITIONS = [15, 50, 85, 50, 15, 50, 85]; // % horizontal, ciclo zig-zag

export function MapTrail({
  world,
  statusOf,
  onStageClick,
}: {
  world: World;
  statusOf: (stage: World["stages"][number]) => StageStatus;
  onStageClick: (stageId: string) => void;
}) {
  const ROW_H = 120;
  const height = world.stages.length * ROW_H + 20;

  // SVG path connecting node centers
  const points = world.stages.map((_, i) => {
    const x = POSITIONS[i % POSITIONS.length];
    const y = ((i + 0.5) * ROW_H);
    return { x, y };
  });

  // Build smooth path via quadratic curves
  let d = "";
  points.forEach((p, i) => {
    if (i === 0) {
      d += `M ${p.x} ${p.y}`;
    } else {
      const prev = points[i - 1];
      const midY = (prev.y + p.y) / 2;
      d += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
    }
  });

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={d}
          fill="none"
          stroke="oklch(1 0 0 / 0.12)"
          strokeWidth="2"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {world.stages.map((stage, i) => {
        const x = POSITIONS[i % POSITIONS.length];
        const top = i * ROW_H + 10;
        const status = statusOf(stage);
        const isCurrent = status === "current";
        // Posiciona o Astrodin do lado oposto à borda mais próxima do nó
        const astrodinOnRight = x < 50;
        return (
          <div
            key={stage.id}
            className="absolute -translate-x-1/2"
            style={{ left: `${x}%`, top }}
          >
            <StageNode
              stage={stage}
              status={status}
              onClick={() => onStageClick(stage.id)}
            />
            {isCurrent && (
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1/2 z-20 -translate-y-1/2",
                  "animate-[float_3s_ease-in-out_infinite] motion-reduce:animate-none",
                  astrodinOnRight ? "left-full ml-2" : "right-full mr-2",
                )}
              >
                <img
                  src={ASTRODIN.rocket}
                  alt=""
                  width={80}
                  height={80}
                  className={cn(
                    "h-20 w-20 object-contain drop-shadow-[0_6px_14px_oklch(0_0_0/0.6)]",
                    !astrodinOnRight && "-scale-x-100",
                  )}
                  draggable={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}