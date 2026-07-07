import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CONFIG } from "./config";
import EnvelopeIntro from "./components/EnvelopeIntro";
import InvitationCard from "./components/InvitationCard";
import Countdown from "./components/Countdown";
import CalendarButton from "./components/CalendarButton";
import WhatsAppRSVP from "./components/WhatsAppRSVP";
import SaveImageButton from "./components/SaveImageButton";
import BabyTimeline from "./components/BabyTimeline";
import AnimatedSignature from "./components/AnimatedSignature";
import FloatingDecorations from "./components/FloatingDecorations";
import ConfettiEffect from "./components/ConfettiEffect";
import MusicToggle from "./components/MusicToggle";
import QRCodeSection from "./components/QRCodeSection";

/** Titoletto di sezione: filo dorato · testo in maiuscoletto · filo dorato */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="hairline flex-1" />
      <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-oro-deep">
        {children}
      </span>
      <span className="hairline flex-1" />
    </div>
  );
}

/** Sezione che entra dolcemente quando scorre in vista */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [luxury, setLuxury] = useState(() => {
    try {
      return localStorage.getItem("achille-luxury") === "1";
    } catch {
      return false;
    }
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpened(true);
    setConfetti(true);
  };

  const toggleLuxury = () => {
    const next = !luxury;
    setLuxury(next);
    try {
      localStorage.setItem("achille-luxury", next ? "1" : "0");
    } catch {
      /* storage non disponibile: pazienza */
    }
  };

  return (
    <div
      data-luxury={luxury ? "true" : "false"}
      className="relative min-h-dvh overflow-x-hidden bg-panna font-elegant text-ink"
    >
      <FloatingDecorations luxury={luxury} />
      <ConfettiEffect trigger={confetti} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeIntro key="envelope" onOpen={handleOpen} />
        ) : (
          <motion.main
            key="invito"
            className="relative z-10 mx-auto max-w-md px-5 pb-16 pt-16"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* controlli in alto: carillon + modalità Baby Luxury */}
            <div className="fixed right-4 top-4 z-40 flex gap-2.5">
              {CONFIG.features.music && <MusicToggle />}
              {CONFIG.features.luxuryToggle && (
                <button
                  type="button"
                  onClick={toggleLuxury}
                  aria-pressed={luxury}
                  aria-label="Modalità Baby Luxury"
                  title="Modalità Baby Luxury"
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                    luxury
                      ? "border-oro bg-gradient-to-b from-oro-chiaro to-oro text-[#6b5426]"
                      : "border-oro/35 bg-bianco-caldo/90 text-oro-deep"
                  } shadow-md`}
                >
                  <Sparkles size={17} />
                </button>
              )}
            </div>

            <div className="space-y-11">
              <InvitationCard ref={cardRef} />

              <Reveal>
                <div className="space-y-4">
                  <SectionHeading>Il conto alla rovescia</SectionHeading>
                  <Countdown />
                </div>
              </Reveal>

              <Reveal>
                <div className="space-y-3">
                  <WhatsAppRSVP />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <CalendarButton />
                    {CONFIG.features.saveImage && (
                      <SaveImageButton target={cardRef} />
                    )}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="space-y-4">
                  <SectionHeading>La mia mini storia</SectionHeading>
                  <BabyTimeline />
                </div>
              </Reveal>

              {/* chiusura + firma animata */}
              <Reveal>
                <div className="text-center">
                  <p className="text-xl italic leading-relaxed text-ink/75">
                    {CONFIG.copy.closing}
                  </p>
                  <p className="mt-6 text-lg italic text-ink/60">
                    {CONFIG.copy.signOff}
                  </p>
                  <AnimatedSignature />
                </div>
              </Reveal>

              {CONFIG.features.qrCode && (
                <Reveal>
                  <QRCodeSection />
                </Reveal>
              )}

              <footer className="pt-2 text-center text-xs italic text-ink/40">
                Invito digitale fatto con 🤍 per {CONFIG.baby.name} ·{" "}
                {CONFIG.event.day} luglio, {CONFIG.event.hour}:00
              </footer>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
