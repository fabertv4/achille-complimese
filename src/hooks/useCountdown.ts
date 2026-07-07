import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function compute(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    expired: false,
  };
}

/** Conto alla rovescia aggiornato ogni secondo fino a `target`. */
export function useCountdown(target: Date): TimeLeft {
  const [left, setLeft] = useState<TimeLeft>(() => compute(target));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(compute(target)), 1000);
    return () => window.clearInterval(id);
    // target è stabile (deriva da CONFIG), ma teniamo la dipendenza corretta
  }, [target.getTime()]); // eslint-disable-line react-hooks/exhaustive-deps

  return left;
}
