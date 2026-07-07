import { CalendarPlus } from "lucide-react";
import { downloadICS } from "../lib/ics";

/** Scarica il file .ics per aggiungere il complimese al calendario. */
export default function CalendarButton() {
  return (
    <button
      type="button"
      onClick={downloadICS}
      className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-medium text-ink"
    >
      <CalendarPlus size={18} strokeWidth={1.7} className="text-oro-deep" />
      Aggiungi al calendario
    </button>
  );
}
