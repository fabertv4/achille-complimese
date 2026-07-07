import { motion } from "framer-motion";
import { Heart } from "lucide-react";

/** Stellina a 4 punte in oro */
function TinyStar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z"
        fill="#C9A96A"
      />
    </svg>
  );
}

/** Palloncino salvia con filo dorato */
function Balloon() {
  return (
    <svg width="64" height="120" viewBox="0 0 64 120" fill="none" aria-hidden>
      <path
        d="M32 100 C 26 108, 38 112, 32 120"
        stroke="#A98547"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M28 62 L36 62 L32 70 Z" fill="#7E9478" />
      <ellipse cx="32" cy="34" rx="24" ry="30" fill="#A9BCA0" />
      <ellipse cx="32" cy="34" rx="24" ry="30" fill="url(#shineB)" />
      <ellipse cx="23" cy="22" rx="7" ry="11" fill="#ffffff" opacity="0.35" />
      <defs>
        <radialGradient id="shineB" cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#7E9478" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5C7057" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Fogliolina watercolor */
function Leaf({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M15 105 C 20 55, 60 20, 108 12 C 100 62, 62 98, 15 105 Z"
        fill="#A9BCA0"
        opacity="0.5"
      />
      <path
        d="M15 105 C 45 75, 75 45, 108 12"
        stroke="#7E9478"
        strokeWidth="1.4"
        opacity="0.5"
        fill="none"
      />
    </svg>
  );
}

const STARS: Array<{ top: string; left: string; size: number; delay: number }> = [
  { top: "8%", left: "12%", size: 13, delay: 0 },
  { top: "15%", left: "82%", size: 10, delay: 1.2 },
  { top: "34%", left: "6%", size: 9, delay: 2.1 },
  { top: "46%", left: "90%", size: 12, delay: 0.6 },
  { top: "63%", left: "8%", size: 10, delay: 1.7 },
  { top: "76%", left: "86%", size: 14, delay: 0.3 },
  { top: "90%", left: "16%", size: 9, delay: 2.5 },
];

const DUST: Array<{ left: string; delay: number }> = [
  { left: "10%", delay: 0 },
  { left: "22%", delay: 2.5 },
  { left: "35%", delay: 1.1 },
  { left: "48%", delay: 3.6 },
  { left: "61%", delay: 0.7 },
  { left: "72%", delay: 2.9 },
  { left: "84%", delay: 1.8 },
  { left: "93%", delay: 4.1 },
];

interface Props {
  /** Modalità Baby Luxury: aggiunge pulviscolo dorato che sale */
  luxury: boolean;
}

/** Strato fisso di decorazioni: stelline, cuori, palloncino, foglie watercolor. */
export default function FloatingDecorations({ luxury }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* foglie watercolor sfocate negli angoli */}
      <div className="absolute -top-6 -left-8 blur-[2px] opacity-60 -rotate-12">
        <Leaf />
      </div>
      <div className="absolute -bottom-8 -right-6 blur-[2px] opacity-50 rotate-[160deg]">
        <Leaf flip />
      </div>

      {/* aloni morbidi salvia / cipria */}
      <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-salvia/20 blur-3xl" />
      <div className="absolute bottom-[12%] left-[-12%] h-80 w-80 rounded-full bg-blush/25 blur-3xl" />

      {/* stelline che brillano */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.15, 0.75, 0.15], scale: [0.8, 1.15, 0.8] }}
          transition={{
            duration: 4.5,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <TinyStar size={s.size} />
        </motion.div>
      ))}

      {/* due cuoricini cipria alla deriva */}
      <motion.div
        className="absolute top-[26%] left-[78%] text-blush"
        animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={16} fill="currentColor" strokeWidth={0} />
      </motion.div>
      <motion.div
        className="absolute top-[58%] left-[12%] text-salvia"
        animate={{ y: [0, -10, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Heart size={13} fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* palloncino che ondeggia */}
      <motion.div
        className="absolute bottom-[6%] right-[7%] origin-top"
        animate={{ rotate: [-4, 4, -4], y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Balloon />
      </motion.div>

      {/* pulviscolo dorato — solo in modalità Baby Luxury */}
      {luxury &&
        DUST.map((d, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute bottom-[-2%] h-1 w-1 rounded-full bg-oro"
            style={{ left: d.left }}
            animate={{ y: [0, -window.innerHeight * 0.7], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 9,
              delay: d.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
    </div>
  );
}
