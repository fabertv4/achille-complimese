import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { CONFIG } from "../config";

interface Props {
  /** Chiamata quando la busta ha finito l'animazione di apertura */
  onOpen: () => void;
}

/** Schermata iniziale: busta chiusa con sigillo, si apre in 3D e la carta scivola fuori. */
export default function EnvelopeIntro({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  // a metà apertura la linguetta passa dietro alla carta
  const [flapBehind, setFlapBehind] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setFlapBehind(true), 380);
    window.setTimeout(onOpen, 1900);
  };

  return (
    <motion.div
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <motion.p
        className="text-lg italic text-ink/70"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {CONFIG.copy.envelopeKicker}
      </motion.p>

      <motion.h1
        className="gold-text font-calligraphy mt-1 pb-4 text-[64px] leading-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
      >
        {CONFIG.baby.name}
      </motion.h1>

      {/* ————— la busta ————— */}
      <motion.div
        className="relative mt-6 cursor-pointer select-none"
        style={{ width: 310, height: 212, perspective: 1200 }}
        role="button"
        aria-label="Apri l'invito"
        onClick={handleOpen}
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: opening ? 0 : [0, -6, 0],
        }}
        transition={
          opening
            ? { duration: 0.3 }
            : {
                opacity: { duration: 0.9, delay: 0.35 },
                y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
              }
        }
      >
        {/* retro busta */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-beige to-beige-deep shadow-[0_28px_50px_-22px_rgba(120,100,60,0.5)]" />

        {/* carta che scivola fuori (larghezza esplicita: inset-x qui è inaffidabile) */}
        <motion.div
          className="pearl absolute top-2 bottom-3 z-10 flex flex-col items-center justify-center rounded-xl"
          style={{ left: 16, width: 278 }}
          animate={{ y: opening ? -168 : 6 }}
          transition={{ duration: 0.95, delay: 0.55, ease: [0.22, 0.9, 0.3, 1] }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-oro/50 bg-bianco-caldo">
            <span className="gold-text font-calligraphy pt-2 text-4xl leading-none">
              {CONFIG.baby.monogram}
            </span>
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-oro-deep">
            Complimese
          </p>
          <p className="mt-0.5 font-medium italic text-ink/70">
            {CONFIG.event.milestone} · {CONFIG.event.day} luglio
          </p>
        </motion.div>

        {/* tasca frontale a “V” */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 bg-gradient-to-b from-crema to-beige"
            style={{
              clipPath: "polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
          {/* pieghe laterali appena accennate */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(115deg, rgba(169,133,71,0.18), transparent 30%), linear-gradient(-115deg, rgba(169,133,71,0.18), transparent 30%)",
              clipPath: "polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* linguetta superiore, due facce 3D */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[54%]"
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            zIndex: flapBehind ? 5 : 30,
          }}
          animate={{ rotateX: opening ? -180 : 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          {/* faccia esterna */}
          <div
            className="absolute inset-0 overflow-hidden rounded-t-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-beige to-beige-deep"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </div>
          {/* faccia interna: fodera salvia a pois */}
          <div
            className="absolute inset-0 overflow-hidden rounded-t-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
            <div
              className="absolute inset-0 bg-crema"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backgroundImage:
                  "radial-gradient(rgba(126,148,120,0.5) 1.2px, transparent 1.6px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>
        </motion.div>

        {/* sigillo di ceralacca dorato */}
        <motion.div
          className="absolute left-1/2 top-[54%] z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #ECD9AC, #C9A96A 55%, #A98547)",
            boxShadow:
              "0 6px 14px -4px rgba(120,90,40,0.55), inset 0 1px 2px rgba(255,255,255,0.5)",
          }}
          animate={
            opening
              ? { scale: 0, opacity: 0, rotate: 30 }
              : { scale: [1, 1.04, 1] }
          }
          transition={
            opening
              ? { duration: 0.35, ease: "easeIn" }
              : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#fff6dd66]">
            <span className="font-calligraphy pt-1.5 text-3xl leading-none text-[#FFF6DD]">
              {CONFIG.baby.monogram}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ————— bottone ————— */}
      <motion.button
        type="button"
        onClick={handleOpen}
        className="btn-primary mt-12 inline-flex items-center gap-2.5 rounded-full px-9 py-3.5 text-lg tracking-wide text-bianco-caldo"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        disabled={opening}
      >
        <Mail size={19} strokeWidth={1.8} />
        {CONFIG.copy.envelopeButton}
      </motion.button>

      <motion.p
        className="mt-4 text-sm italic text-ink/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        una piccola sorpresa ti aspetta…
      </motion.p>
    </motion.div>
  );
}
