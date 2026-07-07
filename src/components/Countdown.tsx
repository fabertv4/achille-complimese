import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { eventDate } from "../config";
import { useCountdown } from "../hooks/useCountdown";

const target = eventDate();

function Tile({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="pearl-lite flex flex-col items-center rounded-2xl py-3.5">
      <div className="relative h-9 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block text-3xl font-semibold leading-9 text-ink tabular-nums"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink/50">
        {label}
      </span>
    </div>
  );
}

/** Conto alla rovescia fino all'evento; quando arriva il giorno, festeggia. */
export default function Countdown() {
  const left = useCountdown(target);

  if (left.expired) {
    return (
      <div className="pearl-lite flex items-center justify-center gap-3 rounded-3xl px-6 py-6 text-center">
        <PartyPopper size={22} className="shrink-0 text-oro-deep" />
        <p className="text-xl font-medium italic text-ink">
          Il grande giorno è arrivato: si festeggia!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2.5">
      <Tile value={left.days} label="Giorni" />
      <Tile value={left.hours} label="Ore" />
      <Tile value={left.minutes} label="Minuti" />
      <Tile value={left.seconds} label="Secondi" />
    </div>
  );
}
