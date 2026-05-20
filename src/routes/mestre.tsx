import { createFileRoute } from "@tanstack/react-router";
import { MestreChat } from "@/components/game/MestreChat";

export const Route = createFileRoute("/mestre")({
  head: () => ({
    meta: [
      { title: "Mestre Finan — Tutor" },
      { name: "description", content: "Converse com o Mestre Finan e receba orientações financeiras." },
      { property: "og:title", content: "Mestre Finan — Tutor" },
      { property: "og:description", content: "Converse com o Mestre Finan e receba orientações financeiras." },
    ],
  }),
  component: MestrePage,
});

function MestrePage() {
  return <MestreChat />;
}