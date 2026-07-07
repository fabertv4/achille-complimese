import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Link2, Trash2, Upload, X } from "lucide-react";
import { CONFIG } from "../config";

const STORAGE_KEY = "achille-photo";

/** Ridimensiona la foto prima di salvarla in localStorage (evita quota piena). */
function downscale(dataUrl: string, max = 900): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      if (scale === 1) return resolve(dataUrl);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function persist(value: string | null) {
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // quota piena o storage disabilitato: la foto resta comunque in pagina
  }
}

/** Placeholder elegante: orsacchiotto che dorme sotto luna e stelline. */
function TeddyPlaceholder() {
  return (
    <svg viewBox="0 0 200 256" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="phBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF6EB" />
          <stop offset="100%" stopColor="#F0E7D3" />
        </linearGradient>
      </defs>
      <rect width="200" height="256" fill="url(#phBg)" />

      {/* luna dorata */}
      <path
        d="M150 40 a20 20 0 1 0 14 34 a15 15 0 1 1 -14 -34 Z"
        fill="#C9A96A"
        opacity="0.85"
      />
      {/* stelline */}
      <g fill="#C9A96A">
        <path d="M45 42 l2.2 6.3 6.3 2.2 -6.3 2.2 -2.2 6.3 -2.2 -6.3 -6.3 -2.2 6.3 -2.2 Z" />
        <path d="M92 26 l1.6 4.6 4.6 1.6 -4.6 1.6 -1.6 4.6 -1.6 -4.6 -4.6 -1.6 4.6 -1.6 Z" opacity="0.7" />
        <path d="M162 108 l1.6 4.6 4.6 1.6 -4.6 1.6 -1.6 4.6 -1.6 -4.6 -4.6 -1.6 4.6 -1.6 Z" opacity="0.6" />
      </g>

      {/* orsacchiotto */}
      <g>
        {/* orecchie */}
        <circle cx="66" cy="128" r="17" fill="#E7DBC6" stroke="#A98547" strokeWidth="1.6" />
        <circle cx="134" cy="128" r="17" fill="#E7DBC6" stroke="#A98547" strokeWidth="1.6" />
        <circle cx="66" cy="128" r="8" fill="#E8CFC2" />
        <circle cx="134" cy="128" r="8" fill="#E8CFC2" />
        {/* testa */}
        <circle cx="100" cy="160" r="46" fill="#E7DBC6" stroke="#A98547" strokeWidth="1.8" />
        {/* occhi chiusi (dorme) */}
        <path d="M78 154 q6 6 12 0" stroke="#3E4A39" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M110 154 q6 6 12 0" stroke="#3E4A39" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* guanciotte */}
        <circle cx="72" cy="170" r="6.5" fill="#E8CFC2" opacity="0.75" />
        <circle cx="128" cy="170" r="6.5" fill="#E8CFC2" opacity="0.75" />
        {/* muso */}
        <ellipse cx="100" cy="176" rx="17" ry="13" fill="#FBF6EB" stroke="#A98547" strokeWidth="1.2" />
        <path d="M96 171 q4 -3.5 8 0 q0 4.5 -4 4.5 q-4 0 -4 -4.5 Z" fill="#A98547" />
        <path d="M100 176 v4 M100 180 q-4 4 -8 1 M100 180 q4 4 8 1" stroke="#A98547" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* zzz */}
        <g fill="#7E9478" fontFamily="Georgia, serif" fontStyle="italic">
          <text x="146" y="140" fontSize="15">z</text>
          <text x="156" y="128" fontSize="12">z</text>
          <text x="164" y="118" fontSize="9">z</text>
        </g>
      </g>
    </svg>
  );
}

interface Props {
  /** Propaga il click (per far salire i cuoricini dalla foto) */
  onTap: (e: React.MouseEvent<HTMLElement>) => void;
}

/** Cornice ad arco con la foto di Achille: upload locale, URL o placeholder. */
export default function PhotoFrame({ onTap }: Props) {
  const [photo, setPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || CONFIG.photo.url || null;
    } catch {
      return CONFIG.photo.url || null;
    }
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const small = await downscale(String(reader.result));
      setPhoto(small);
      persist(small);
      setPanelOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrl = () => {
    const clean = url.trim();
    if (!clean) return;
    setPhoto(clean);
    persist(clean);
    setUrl("");
    setPanelOpen(false);
  };

  const handleRemove = () => {
    setPhoto(null);
    persist(null);
    setPanelOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* doppia cornice: filo oro esterno + passe-partout bianco */}
        <div
          className="rounded-t-full rounded-b-[34px] p-[3px]"
          style={{
            background:
              "linear-gradient(160deg, #ECD9AC, #C9A96A 45%, #A98547 90%)",
            boxShadow: "0 18px 38px -18px rgba(120,100,60,0.5)",
          }}
        >
          <div className="rounded-t-full rounded-b-[31px] bg-bianco-caldo p-1.5">
            <div
              className="h-56 w-44 cursor-pointer overflow-hidden rounded-t-full rounded-b-[26px]"
              onClick={onTap}
            >
              {photo ? (
                <img
                  src={photo}
                  alt={`Foto di ${CONFIG.baby.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <TeddyPlaceholder />
              )}
            </div>
          </div>
        </div>

        {/* bottoncino per cambiare foto (escluso dal salvataggio immagine) */}
        <button
          type="button"
          data-no-export
          onClick={() => setPanelOpen((v) => !v)}
          aria-label="Aggiungi o cambia la foto"
          className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border border-oro/40 bg-bianco-caldo text-oro-deep shadow-md transition-transform hover:scale-105"
        >
          {panelOpen ? <X size={17} /> : <Camera size={17} />}
        </button>
      </div>

      {/* pannellino foto */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            data-no-export
            className="pearl-lite mt-4 w-full max-w-xs rounded-2xl p-4 text-left"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-ink"
            >
              <Upload size={15} className="text-oro-deep" />
              Carica una foto di {CONFIG.baby.name}
            </button>

            <div className="my-3 flex items-center gap-3 text-xs italic text-ink/45">
              <span className="hairline flex-1" />
              oppure da URL
              <span className="hairline flex-1" />
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
                />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUrl()}
                  placeholder="https://…"
                  className="w-full rounded-full border border-oro/30 bg-bianco-caldo py-2 pl-8 pr-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-oro"
                />
              </div>
              <button
                type="button"
                onClick={handleUrl}
                className="btn-primary rounded-full px-4 text-sm text-bianco-caldo"
              >
                Usa
              </button>
            </div>

            {photo && (
              <button
                type="button"
                onClick={handleRemove}
                className="mt-3 flex items-center gap-1.5 text-xs text-ink/50 underline-offset-2 hover:underline"
              >
                <Trash2 size={13} />
                Rimuovi la foto
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
