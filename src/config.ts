/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIG — tutti i dati dell'evento in un unico posto.
 *
 *  Il progetto genera DUE inviti (due link) dallo stesso codice:
 *   · "mercoledi8" → 8 luglio, ore 19:00  → link root
 *   · "sabato11"   → 11 luglio, ore 17:30 → link /sabato/
 *  La variante si sceglie in build con VITE_EVENT
 *  (vedi .env e .env.sabato; script "build" in package.json).
 * ─────────────────────────────────────────────────────────────
 */

export type EventVariant = "mercoledi8" | "sabato11";

const VARIANT: EventVariant =
  import.meta.env.VITE_EVENT === "sabato11" ? "sabato11" : "mercoledi8";

export interface TimelineStep {
  date: string;
  title: string;
  detail: string;
  icon: "star" | "moon" | "cake";
}

/** Differenze tra le due feste: data/ora, frasi legate al giorno, URL. */
const BY_VARIANT = {
  mercoledi8: {
    day: 8,
    hour: 19,
    minute: 0,
    announce: "L’8 luglio compio 2 mesi!",
    when: "Vi aspetto alle 19:00 a Melegnano.",
    timelineLast: {
      date: "8 luglio",
      title: "Oggi compio 2 mesi!",
      detail: "E voglio festeggiare con tutte le persone che amo.",
      icon: "cake",
    } as TimelineStep,
    shareUrl: "https://fabertv4.github.io/achille-complimese/",
  },
  sabato11: {
    day: 11,
    hour: 17,
    minute: 30,
    announce: "L’8 luglio ho compiuto 2 mesi!",
    when: "Vi aspetto sabato 11 luglio alle 17:30 a Melegnano.",
    timelineLast: {
      date: "8 luglio",
      title: "Ho compiuto 2 mesi!",
      detail: "E sabato 11 festeggio con tutte le persone che amo.",
      icon: "cake",
    } as TimelineStep,
    shareUrl: "https://fabertv4.github.io/achille-complimese/sabato/",
  },
}[VARIANT];

export const CONFIG = {
  baby: {
    name: "Achille",
    monogram: "A",
  },

  event: {
    title: "Complimese di Achille",
    milestone: "2 mesi",
    /** Data e ora locali dell'evento */
    year: 2026,
    month: 7, // luglio
    day: BY_VARIANT.day,
    hour: BY_VARIANT.hour,
    minute: BY_VARIANT.minute,
    durationMinutes: 150,
    place: "Melegnano",
    format: "Aperitivo e qualche dolce",
    description:
      "Aperitivo e qualche dolce per festeggiare i 2 mesi di Achille.",
  },

  copy: {
    envelopeKicker: "Hai ricevuto un invito speciale da",
    envelopeButton: "Apri l'invito",
    hello: "Ciao! Sono",
    announce: BY_VARIANT.announce,
    invite:
      "Vi invito a festeggiare insieme a me questo dolcissimo traguardo.",
    what: "Sarà un aperitivo con qualche dolce.",
    when: BY_VARIANT.when,
    plea: "Non mancate, ci tengo tantissimo!",
    closing: "Preparatevi a coccole, foto e dolcetti.",
    signOff: "Con amore,",
  },

  /** URL foto di Achille (opzionale). Se vuoto: upload dell'utente o placeholder. */
  photo: {
    url: "" as string,
  },

  /**
   * Numero WhatsApp per la conferma, formato internazionale senza "+"
   * (es. "393331234567"). Vuoto = si apre WhatsApp e si sceglie il contatto.
   */
  whatsapp: {
    phone: "" as string,
    message: "Ciao Achille, ci sarò al tuo complimese! ❤️",
  },

  /** URL pubblico dell'invito per il QR code. Vuoto = usa l'indirizzo corrente. */
  share: {
    url: BY_VARIANT.shareUrl as string,
  },

  /** Interruttori delle funzioni extra */
  features: {
    music: true,
    qrCode: true,
    saveImage: true,
    luxuryToggle: true,
  },

  timeline: [
    {
      date: "8 maggio",
      title: "Sono arrivato",
      detail: "Il giorno più bello: il mio debutto nel mondo.",
      icon: "star",
    },
    {
      date: "8 giugno",
      title: "Il mio primo mese",
      detail: "Trenta giorni di nanne, coccole e primi sorrisi.",
      icon: "moon",
    },
    BY_VARIANT.timelineLast,
  ] as TimelineStep[],
};

/** Data/ora dell'evento come oggetto Date (ora locale). */
export function eventDate(): Date {
  const e = CONFIG.event;
  return new Date(e.year, e.month - 1, e.day, e.hour, e.minute, 0);
}

/** "sabato 11 luglio" → "Sabato 11 luglio" */
export function eventDateLabel(): string {
  const label = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(eventDate());
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function eventTimeLabel(): string {
  const e = CONFIG.event;
  return `ore ${e.hour}:${String(e.minute).padStart(2, "0")}`;
}
