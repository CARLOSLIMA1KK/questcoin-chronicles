import { createFileRoute } from "@tanstack/react-router";
import { MestreChat } from "@/components/game/MestreChat";

export const Route = createFileRoute("/mestre")({
  head: () => ({
    meta: [
      { title: "Astrodin — Tutor FORME" },
      { name: "description", content: "Converse com o Astrodin e receba orientações financeiras da FORME." },
      { property: "og:title", content: "Astrodin — Tutor FORME" },
      { property: "og:description", content: "Converse com o Astrodin e receba orientações financeiras da FORME." },
    ],
  }),
  component: MestrePage,
});

function MestrePage() {
  return <MestreChat />;
}