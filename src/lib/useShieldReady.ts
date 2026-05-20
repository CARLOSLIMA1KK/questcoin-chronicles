import { useEffect, useRef, useState } from "react";

/**
 * Detecta a transição "sem escudos com timer ativo" → "escudos recarregados"
 * e mantém um flag `ready` ligado por ~1.6s para animar feedback visual.
 */
export function useShieldReady(shields: number, lockUntil: number | null | undefined) {
  const wasLocked = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isLocked = shields === 0 && !!lockUntil && lockUntil > Date.now();
    if (isLocked) {
      wasLocked.current = true;
      return;
    }
    if (wasLocked.current && shields > 0) {
      wasLocked.current = false;
      setReady(true);
      const t = setTimeout(() => setReady(false), 1600);
      return () => clearTimeout(t);
    }
  }, [shields, lockUntil]);

  return ready;
}