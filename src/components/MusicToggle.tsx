import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { Carillon } from "../lib/carillon";

/** Carillon soft on/off — parte SEMPRE spento, si attiva solo su tocco. */
export default function MusicToggle() {
  const carillonRef = useRef<Carillon | null>(null);
  const [on, setOn] = useState(false);

  const toggle = () => {
    if (!carillonRef.current) carillonRef.current = new Carillon();
    if (on) {
      carillonRef.current.stop();
    } else {
      carillonRef.current.start();
    }
    setOn(!on);
  };

  // spegne il carillon se il componente viene smontato
  useEffect(() => () => carillonRef.current?.stop(), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Spegni il carillon" : "Accendi il carillon"}
      title={on ? "Spegni il carillon" : "Carillon della nanna"}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
        on
          ? "border-oro bg-gradient-to-b from-oro-chiaro to-oro text-[#6b5426]"
          : "border-oro/35 bg-bianco-caldo/90 text-oro-deep"
      } shadow-md`}
    >
      {on && (
        <motion.span
          className="absolute inset-0 rounded-full border border-oro"
          animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {on ? <Music size={17} /> : <VolumeX size={17} />}
    </button>
  );
}
