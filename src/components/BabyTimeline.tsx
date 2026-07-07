import { motion } from "framer-motion";
import { Cake, Moon, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONFIG } from "../config";

const ICONS: Record<string, LucideIcon> = {
  star: Star,
  moon: Moon,
  cake: Cake,
};

/** "La mia mini storia": timeline dei primi due mesi di Achille. */
export default function BabyTimeline() {
  const steps = CONFIG.timeline;

  return (
    <div className="pearl relative rounded-[28px] px-6 py-8">
      <div className="relative">
        {/* filo verticale dorato */}
        <div
          className="absolute bottom-5 left-[21px] top-5 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(201,169,106,0.15), rgba(201,169,106,0.6), rgba(126,148,120,0.4))",
          }}
        />

        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? Star;
            const last = i === steps.length - 1;
            return (
              <motion.div
                key={step.date}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.18, ease: "easeOut" }}
              >
                <div className="relative shrink-0">
                  {/* alone pulsante sull'ultima tappa (il complimese!) */}
                  {last && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-oro"
                      animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <span
                    className={`relative flex h-[42px] w-[42px] items-center justify-center rounded-full border ${
                      last
                        ? "border-oro bg-gradient-to-b from-oro-chiaro to-oro text-[#6b5426]"
                        : "border-oro/35 bg-bianco-caldo text-oro-deep"
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="pt-0.5 text-left">
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-oro-deep">
                    {step.date}
                  </p>
                  <p className="mt-0.5 text-xl font-semibold leading-tight text-ink">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[15px] italic leading-snug text-ink/60">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
