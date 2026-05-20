import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Trophy } from "lucide-react";
import { Screen } from "@/components/game/Screen";
import { GlassPanel } from "@/components/game/GlassPanel";
import { PodiumCard } from "@/components/game/PodiumCard";
import { RankingRow } from "@/components/game/RankingRow";
import { RankingScopeTabs } from "@/components/game/RankingScopeTabs";
import { MyPositionBar } from "@/components/game/MyPositionBar";
import { getMonthInfo, useRanking, type Scope } from "@/lib/ranking";
import { avatarForId } from "@/lib/brandAssets";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking — Mestre Finan" },
      { name: "description", content: "Veja os melhores aprendizes de finanças por turma, escola e geral." },
      { property: "og:title", content: "Ranking — Mestre Finan" },
      { property: "og:description", content: "Veja os melhores aprendizes de finanças por turma, escola e geral." },
    ],
  }),
  component: RankingPage,
});

function RankingPage() {
  const [scope, setScope] = useState<Scope>("turma");
  const { top, me } = useRanking(scope);
  const month = getMonthInfo();

  const podium = top.slice(0, 3);
  const rest = top.slice(3);

  // Layout do pódio: 2º (esq), 1º (centro/maior), 3º (dir)
  const p1 = podium.find((p) => p.position === 1);
  const p2 = podium.find((p) => p.position === 2);
  const p3 = podium.find((p) => p.position === 3);

  return (
    <Screen>
      <div className="space-y-4">
        <GlassPanel className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--game-gold)] shadow-[var(--shadow-glow-gold)]">
              <Trophy className="h-5 w-5 text-[color:var(--game-purple)]" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-xl text-foreground">Ranking — {month.label}</h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarClock className="h-3 w-3" />
                Termina em {month.daysLeft} {month.daysLeft === 1 ? "dia" : "dias"}
              </div>
            </div>
          </div>
        </GlassPanel>

        <RankingScopeTabs value={scope} onChange={setScope} />

        <GlassPanel className="px-4 pt-8 pb-4">
          <div className="flex items-end justify-center gap-4">
            {p2 && <PodiumCard place={2} name={p2.name} score={p2.score} isMe={p2.isMe} avatarUrl={avatarForId(p2.id)} />}
            {p1 && <PodiumCard place={1} name={p1.name} score={p1.score} isMe={p1.isMe} avatarUrl={avatarForId(p1.id)} />}
            {p3 && <PodiumCard place={3} name={p3.name} score={p3.score} isMe={p3.isMe} avatarUrl={avatarForId(p3.id)} />}
          </div>
        </GlassPanel>

        {rest.length > 0 && (
          <div className="space-y-2">
            {rest.map((p) => (
              <RankingRow
                key={p.id}
                position={p.position}
                name={p.name}
                subtitle={scope === "geral" ? p.school : scope === "escola" ? p.classCode : p.school}
                score={p.score}
                isMe={p.isMe}
                avatarUrl={avatarForId(p.id)}
              />
            ))}
          </div>
        )}

        <GlassPanel className="p-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Como pontuar?</span>{" "}
            XP + fases concluídas + valor investido + rendimento ganho + dias de streak.
            Saldo parado não conta — invista pra render!
          </p>
        </GlassPanel>

        <div className="h-24" aria-hidden />
      </div>

      <MyPositionBar
        position={me.position}
        total={me.total}
        score={me.score}
        deltaToNext={me.deltaToNext}
      />
    </Screen>
  );
}