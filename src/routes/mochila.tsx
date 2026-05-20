import { createFileRoute } from "@tanstack/react-router";
import { Backpack } from "lucide-react";
import { Screen } from "@/components/game/Screen";
import { PagePlaceholder } from "@/components/game/PagePlaceholder";

export const Route = createFileRoute("/mochila")({
  head: () => ({
    meta: [
      { title: "Mochila — Mestre Finan" },
      { name: "description", content: "Itens, conquistas e bens que você acumulou na jornada." },
      { property: "og:title", content: "Mochila — Mestre Finan" },
      { property: "og:description", content: "Itens, conquistas e bens que você acumulou na jornada." },
    ],
  }),
  component: MochilaPage,
});

function MochilaPage() {
  return (
    <Screen>
      <PagePlaceholder
        title="Mochila"
        subtitle="Seu patrimônio digital: escudos, poderes e troféus conquistados."
        icon={Backpack}
      />
    </Screen>
  );
}