/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIG — tutti i dati dell'evento in un unico posto.
 *  Modifica qui e l'intero invito si aggiorna da solo.
 * ─────────────────────────────────────────────────────────────
 */

export interface TimelineStep {
  date: string;
  title: string;
  detail: string;
  icon: "star" | "moon" | "cake";
}

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
    day: 8,
    hour: 19,
    minute: 0,
    durationMinutes: 150,
    place: "Casa di Andreino",
    format: "Aperitivo e qualche dolce",
    description:
      "Aperitivo e qualche dolce per festeggiare i 2 mesi di Achille.",
  },

  copy: {
    envelopeKicker: "Hai ricevuto un invito speciale da",
    envelopeButton: "Apri l'invito",
    hello: "Ciao! Sono",
    announce: "L’8 luglio compio 2 mesi!",
    invite:
      "Vi invito a festeggiare insieme a me questo dolcissimo traguardo.",
    what: "Sarà un aperitivo con qualche dolce.",
    when: "Vi aspetto alle 19:00 a Casa di Andreino.",
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
    url: "https://fabertv4.github.io/achille-complimese/" as string,
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
    {
      date: "8 luglio",
      title: "Oggi compio 2 mesi!",
      detail: "E voglio festeggiare con tutte le persone che amo.",
      icon: "cake",
    },
  ] as TimelineStep[],
};

/** Data/ora dell'evento come oggetto Date (ora locale). */
export function eventDate(): Date {
  const e = CONFIG.event;
  return new Date(e.year, e.month - 1, e.day, e.hour, e.minute, 0);
}

/** "mercoledì 8 luglio" → "Mercoledì 8 luglio" */
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
