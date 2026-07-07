import { useEffect, useRef } from "react";

/** Palette dei coriandoli: oro, salvia, panna, cipria — mai colori accesi. */
const COLORS = ["#C9A96A", "#A9BCA0", "#F3ECDD", "#E8CFC2", "#ECD9AC", "#FFFDF9"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: "circle" | "rect";
  sway: number;
  born: number;
}

interface Props {
  /** Quando passa a true, parte una pioggia di coriandoli soft (una tantum). */
  trigger: boolean;
}

const LIFE_MS = 4200;

/** Coriandoli delicati su canvas: partono all'apertura dell'invito. */
export default function ConfettiEffect({ trigger }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const now = performance.now();
    const particles: Particle[] = Array.from({ length: 130 }, () => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.25,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 1 + Math.random() * 1.8,
      size: 4 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.45 ? "rect" : "circle",
      sway: Math.random() * Math.PI * 2,
      born: now,
    }));

    let raf = 0;
    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;

      for (const p of particles) {
        const age = t - p.born;
        if (age > LIFE_MS || p.y > h + 20) continue;
        alive = true;

        p.sway += 0.02;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        p.rot += p.vr;

        const alpha = age > LIFE_MS - 900 ? (LIFE_MS - age) / 900 : 1;
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha) * 0.9;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) {
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
    />
  );
}
