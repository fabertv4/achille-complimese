/**
 * Carillon sintetizzato con Web Audio API: nessun file audio,
 * timbro "music box" (sinusoide + parziale acuto, decadimento lungo).
 * Melodia: ninna nanna di Brahms (Wiegenlied), primo periodo.
 */

const SEMITONES: Record<string, number> = {
  C: -9,
  D: -7,
  E: -5,
  F: -4,
  G: -2,
  A: 0,
  B: 2,
};

function freq(note: string): number {
  const m = note.match(/^([A-G])(#?)(\d)$/);
  if (!m) return 440;
  const semi =
    SEMITONES[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) - 4) * 12;
  return 440 * Math.pow(2, semi / 12);
}

/** [nota, durata in battiti] */
const MELODY: Array<[string, number]> = [
  ["E5", 1], ["E5", 1], ["G5", 2],
  ["E5", 1], ["E5", 1], ["G5", 2],
  ["E5", 1], ["G5", 1], ["C6", 1.5], ["B5", 0.5],
  ["A5", 2], ["G5", 2],
  ["D5", 1], ["E5", 1], ["F5", 2],
  ["D5", 1], ["E5", 1], ["F5", 2],
  ["D5", 1], ["F5", 1], ["B5", 1.5], ["A5", 0.5],
  ["G5", 2], ["C6", 2],
];

const BEAT = 0.45; // secondi per battito
const LOOP_GAP = 1.6; // pausa tra un giro e l'altro

export class Carillon {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private playing = false;

  get isPlaying(): boolean {
    return this.playing;
  }

  start(): void {
    if (this.playing) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    void this.ctx.resume();

    this.master = this.ctx.createGain();
    this.master.gain.value = 0.22;
    this.master.connect(this.ctx.destination);

    this.playing = true;
    this.scheduleLoop(this.ctx.currentTime + 0.15);
  }

  stop(): void {
    this.playing = false;
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.master && this.ctx) {
      // dissolvenza dolce, poi scollega il bus (le note già in coda spariscono)
      const g = this.master;
      g.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      window.setTimeout(() => g.disconnect(), 800);
      this.master = null;
    }
  }

  private scheduleLoop(t0: number): void {
    if (!this.ctx || !this.master || !this.playing) return;

    let t = t0;
    for (const [note, beats] of MELODY) {
      this.pluck(freq(note), t, beats * BEAT);
      t += beats * BEAT;
    }
    const total = t - t0 + LOOP_GAP;

    const delayMs = Math.max(
      200,
      (t0 + total - this.ctx.currentTime - 0.3) * 1000,
    );
    this.timer = window.setTimeout(() => {
      if (this.playing) this.scheduleLoop(t0 + total);
    }, delayMs);
  }

  /** Una nota di carillon: attacco immediato, lunga coda cristallina. */
  private pluck(f: number, t: number, dur: number): void {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const release = Math.max(dur * 2.2, 1.2);

    const fundamental = ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.value = f;

    const sparkle = ctx.createOscillator();
    sparkle.type = "sine";
    sparkle.frequency.value = f * 4; // parziale due ottave sopra → timbro metallico

    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0, t);
    g1.gain.linearRampToValueAtTime(0.9, t + 0.008);
    g1.gain.exponentialRampToValueAtTime(0.0001, t + release);

    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(0.12, t + 0.005);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + release * 0.5);

    fundamental.connect(g1).connect(this.master);
    sparkle.connect(g2).connect(this.master);

    fundamental.start(t);
    fundamental.stop(t + release + 0.1);
    sparkle.start(t);
    sparkle.stop(t + release * 0.5 + 0.1);
  }
}
