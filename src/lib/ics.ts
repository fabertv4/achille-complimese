import { CONFIG, eventDate } from "../config";

const pad = (n: number) => String(n).padStart(2, "0");

/** Data in formato ICS "floating" locale: YYYYMMDDTHHMMSS */
function icsLocal(d: Date): string {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

/** Escape richiesto da RFC 5545 per i campi testo */
function esc(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** Genera e scarica il file .ics con l'evento del complimese. */
export function downloadICS(): void {
  const start = eventDate();
  const end = new Date(start.getTime() + CONFIG.event.durationMinutes * 60_000);
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Achille//Complimese//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:complimese-achille-${icsLocal(start)}@invito`,
    `DTSTAMP:${icsLocal(now)}`,
    `DTSTART:${icsLocal(start)}`,
    `DTEND:${icsLocal(end)}`,
    `SUMMARY:${esc(CONFIG.event.title)}`,
    `LOCATION:${esc(CONFIG.event.place)}`,
    `DESCRIPTION:${esc(CONFIG.event.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(CONFIG.event.title)} tra due ore!`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "complimese-achille.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
