import { motion } from "framer-motion";
import { CONFIG } from "../config";

/**
 * Firma calligrafica che si "scrive" da sola quando entra in vista:
 * il tratto si disegna (dash-offset), poi il riempimento dorato affiora.
 */
export default function AnimatedSignature() {
  return (
    <motion.svg
      viewBox="0 0 340 150"
      className="mx-auto w-64"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={`Firma di ${CONFIG.baby.name}`}
      role="img"
    >
      <motion.text
        x="170"
        y="98"
        textAnchor="middle"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 84,
          strokeDasharray: 480,
        }}
        stroke="#A98547"
        strokeWidth={1.1}
        fill="#A98547"
        variants={{
          hidden: { strokeDashoffset: 480, fillOpacity: 0 },
          visible: {
            strokeDashoffset: 0,
            fillOpacity: 1,
            transition: {
              strokeDashoffset: { duration: 2.4, ease: "easeInOut" },
              fillOpacity: { delay: 1.8, duration: 1 },
            },
          },
        }}
      >
        {CONFIG.baby.name}
      </motion.text>

      {/* cuoricino finale, come il punto sulla i */}
      <motion.path
        d="M290 52 c -4 -7 -14 -5 -14 3 c 0 6 8 10 14 15 c 6 -5 14 -9 14 -15 c 0 -8 -10 -10 -14 -3 Z"
        fill="#C9A96A"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 2.5, duration: 0.5, type: "spring" },
          },
        }}
        style={{ transformOrigin: "290px 60px" }}
      />
    </motion.svg>
  );
}
