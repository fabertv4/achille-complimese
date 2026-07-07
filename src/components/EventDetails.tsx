import { CalendarDays, Clock, MapPin, Wine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONFIG, eventDateLabel, eventTimeLabel } from "../config";

interface Row {
  icon: LucideIcon;
  label: string;
  value: string;
}

/** Dettagli evento: data, ora, luogo e formato in righe eleganti. */
export default function EventDetails() {
  const rows: Row[] = [
    { icon: CalendarDays, label: "Data", value: eventDateLabel() },
    { icon: Clock, label: "Ora", value: eventTimeLabel() },
    { icon: MapPin, label: "Dove", value: CONFIG.event.place },
    { icon: Wine, label: "Cosa", value: CONFIG.event.format },
  ];

  return (
    <div className="grid w-full gap-3.5">
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-4 text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oro/35 bg-bianco-caldo/80 text-oro-deep">
            <Icon size={18} strokeWidth={1.7} />
          </span>
          <span className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink/45">
              {label}
            </span>
            <span className="text-lg font-medium leading-tight text-ink">
              {value}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
