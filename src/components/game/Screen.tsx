import type { ReactNode } from "react";
import { PlayerHeader } from "./PlayerHeader";
import { SpaceParticles } from "./SpaceParticles";

export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-3 pt-3 pb-28">
      <SpaceParticles className="opacity-60" />
      <div className="relative z-10">
        <PlayerHeader />
        <div className="mt-4 flex-1">{children}</div>
      </div>
    </div>
  );
}
