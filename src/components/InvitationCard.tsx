import { forwardRef, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { CONFIG } from "../config";
import PhotoFrame from "./PhotoFrame";
import EventDetails from "./EventDetails";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  color: string;
}

const HEART_COLORS = ["#C9A96A", "#A9BCA0", "#E8CFC2", "#A98547"];

let heartId = 0;

/** La carta d'invito vera e propria: nome, foto, copy e dettagli evento. */
const InvitationCard = forwardRef<HTMLDivElement, object>(function InvitationCard(
  _props,
  ref,
) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  /** Cuoricini che salgono dal punto toccato (nome o foto di Achille) */
  const spawnHearts = (e: React.MouseEvent<HTMLElement>) => {
    const rect = innerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const baseX = e.clientX - rect.left;
    const baseY = e.clientY - rect.top;

    const batch: FloatingHeart[] = Array.from({ length: 6 }, (_, i) => ({
      id: ++heartId,
      x: baseX + (i - 2.5) * 14 + (Math.random() - 0.5) * 18,
      y: baseY,
      size: 12 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 50,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts((prev) => [...prev, ...batch]);
    const ids = new Set(batch.map((b) => b.id));
    window.setTimeout(
      () => setHearts((prev) => prev.filter((h) => !ids.has(h.id))),
      1600,
    );
  };

  return (
    <div ref={ref}>
      <div
        ref={innerRef}
        className="pearl relative overflow-hidden rounded-[30px] px-6 pb-9 pt-9"
      >
        <div className="relative flex flex-col items-center text-center">
          {/* monogramma-sigillo */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #ECD9AC, #C9A96A 55%, #A98547)",
              boxShadow:
                "0 5px 12px -4px rgba(120,90,40,0.5), inset 0 1px 2px rgba(255,255,255,0.5)",
            }}
          >
            <span className="font-calligraphy pt-1 text-2xl leading-none text-[#FFF6DD]">
              {CONFIG.baby.monogram}
            </span>
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-oro-deep">
            · Complimese ·
          </p>

          {/* saluto + nome con luce dorata */}
          <p className="mt-5 text-xl italic text-ink/70">{CONFIG.copy.hello}</p>
          <h1
            className="gold-text font-calligraphy cursor-pointer select-none pb-5 pt-1 text-7xl leading-none"
            onClick={spawnHearts}
            title="Toccami!"
          >
            {CONFIG.baby.name}
          </h1>

          {/* foto (o placeholder orsacchiotto) */}
          <PhotoFrame onTap={spawnHearts} />

          {/* annuncio dei 2 mesi */}
          <p className="mt-7 text-2xl font-medium leading-snug">
            {CONFIG.copy.announce.split(CONFIG.event.milestone)[0]}
            <span className="gold-text font-semibold">
              {CONFIG.event.milestone}
            </span>
            {CONFIG.copy.announce.split(CONFIG.event.milestone)[1]}
          </p>

          {/* copy dell'invito */}
          <div className="mt-4 space-y-2 text-lg italic leading-relaxed text-ink/75">
            <p>{CONFIG.copy.invite}</p>
            <p>{CONFIG.copy.what}</p>
            <p>{CONFIG.copy.when}</p>
          </div>

          <div className="hairline my-7 w-4/5" />

          {/* dettagli strutturati */}
          <EventDetails />

          <p className="mt-7 text-xl font-medium italic text-oro-deep">
            {CONFIG.copy.plea}
          </p>
        </div>

        {/* cuoricini che salgono */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.span
              key={h.id}
              className="pointer-events-none absolute z-20"
              style={{ left: h.x, top: h.y, color: h.color }}
              initial={{ opacity: 0.95, y: 0, x: 0, scale: 0.5 }}
              animate={{
                opacity: 0,
                y: -130 - Math.abs(h.drift),
                x: h.drift,
                scale: 1.15,
                rotate: h.drift * 0.4,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Heart size={h.size} fill="currentColor" strokeWidth={0} />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default InvitationCard;
