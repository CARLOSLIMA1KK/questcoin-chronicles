import type { ReactNode } from "react";
import { PlayerHeader } from "./PlayerHeader";

export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-3 pt-3 pb-28">
      <PlayerHeader />
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}