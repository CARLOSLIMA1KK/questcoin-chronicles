import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Screen } from "@/components/game/Screen";
import { DailyMissions } from "@/components/game/DailyMissions";
import { WorldBanner } from "@/components/game/WorldBanner";
import { MapTrail } from "@/components/game/MapTrail";
import { StageSheet } from "@/components/game/StageSheet";
import { Shimmer } from "@/components/game/GameSkeleton";
import { WORLDS, getStage, type Stage } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { MapOnboarding, shouldShowMapaOnboarding } from "@/components/game/MapOnboarding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galáxia FORME — Astrodin" },
      { name: "description", content: "Sua jornada financeira pelo cosmos começa aqui, cadete." },
      { property: "og:title", content: "Galáxia FORME — Astrodin" },
      { property: "og:description", content: "Sua jornada financeira pelo cosmos começa aqui, cadete." },
    ],
  }),
  component: Index,
});

function Index() {
  const { statusOf, worldProgress } = useProgress();

  // Dev seed: zera progresso e restaura escudos uma única vez,
  // mantendo os 2 últimos mundos travados via override visual abaixo.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const FLAG = "mf:devseed:v2";
    if (localStorage.getItem(FLAG)) return;
    localStorage.setItem(
      "mf:progress:v2",
      JSON.stringify({ completed: [], shields: 3, lockUntil: null }),
    );
    localStorage.setItem(FLAG, "1");
    window.location.reload();
  }, []);

  // Override de teste: libera fases dos primeiros 4 mundos para jogo livre.
  // Worlds 5 e 6 permanecem bloqueados.
  const LAST_LOCKED = 2;
  const statusOfDisplay: typeof statusOf = (stage) => {
    const w = WORLDS.find((x) => x.id === stage.worldId);
    if (w && w.index > WORLDS.length - LAST_LOCKED) return "locked";
    const real = statusOf(stage);
    return real === "locked" ? "available" : real;
  };
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && shouldShowMapaOnboarding()) setOnboarding(true);
  }, [mounted]);
  const selected: Stage | null = openId ? getStage(openId) ?? null : null;

  const currentWorldId = useMemo(() => {
    for (const w of WORLDS) {
      if (w.stages.some((s) => statusOf(s) === "current")) return w.id;
    }
    return WORLDS[0]?.id ?? null;
  }, [statusOf]);

  const [expandedWorlds, setExpandedWorlds] = useState<Set<string>>(new Set());
  const didInitExpand = useRef(false);
  useEffect(() => {
    if (!mounted || didInitExpand.current || !currentWorldId) return;
    didInitExpand.current = true;
    setExpandedWorlds(new Set([currentWorldId]));
  }, [mounted, currentWorldId]);

  const toggleWorld = (id: string) =>
    setExpandedWorlds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const currentRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!mounted || !currentWorldId) return;
    if (currentWorldId === WORLDS[0]?.id) {
      window.scrollTo({ top: 0 });
      return;
    }
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      currentRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 200);
    return () => clearTimeout(t);
  }, [mounted, currentWorldId]);

  if (!mounted) {
    return (
      <Screen>
        <div className="flex flex-col gap-5">
          <Shimmer className="h-24 w-full rounded-3xl" />
          <div className="grid grid-cols-2 gap-3">
            <Shimmer className="h-20 rounded-2xl" />
            <Shimmer className="h-20 rounded-2xl" />
          </div>
          <Shimmer className="h-32 w-full rounded-3xl" />
          <div className="flex flex-col items-center gap-6 pt-2">
            <Shimmer className="h-20 w-20 rounded-full" />
            <Shimmer className="ml-24 h-20 w-20 rounded-full" />
            <Shimmer className="-ml-24 h-20 w-20 rounded-full" />
            <Shimmer className="h-20 w-20 rounded-full" />
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="flex flex-col gap-5">
        <DailyMissions />
        {WORLDS.map((world) => {
          const { done, total } = worldProgress(world.id);
          const expanded = expandedWorlds.has(world.id);
          const locked = world.index > WORLDS.length - LAST_LOCKED;
          return (
            <section
              key={world.id}
              ref={world.id === currentWorldId ? currentRef : undefined}
              className="flex flex-col gap-3 scroll-mt-4"
            >
              <WorldBanner
                world={world}
                done={done}
                total={total}
                expanded={expanded && !locked}
                onToggle={() => toggleWorld(world.id)}
                locked={locked}
              />
              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  expanded && !locked ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <MapTrail
                    world={world}
                    statusOf={statusOfDisplay}
                    onStageClick={(id) => setOpenId(id)}
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <StageSheet
        stage={selected}
        status={selected ? statusOfDisplay(selected) : null}
        open={!!openId}
        onOpenChange={(v) => !v && setOpenId(null)}
      />

      {onboarding && <MapOnboarding onClose={() => setOnboarding(false)} />}
    </Screen>
  );
}
