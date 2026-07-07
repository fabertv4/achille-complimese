import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import { QrCode } from "lucide-react";
import { CONFIG } from "../config";

/** QR code opzionale che porta all'invito: comodo da stampare o mostrare. */
export default function QRCodeSection() {
  const [open, setOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open || dataUrl) return;
    const url = CONFIG.share.url || window.location.href;
    QRCode.toDataURL(url, {
      width: 440,
      margin: 1,
      color: { dark: "#5C7057", light: "#FFFDF9" },
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(null));
  }, [open, dataUrl]);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm italic text-ink/55 underline-offset-4 transition-colors hover:text-oro-deep hover:underline"
      >
        <QrCode size={15} />
        {open ? "Nascondi il QR code" : "Mostra il QR code dell'invito"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pearl-lite mt-4 rounded-3xl p-5 text-center">
              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt="QR code che apre l'invito di Achille"
                  className="mx-auto h-44 w-44 rounded-xl"
                />
              ) : (
                <p className="px-4 py-8 text-sm italic text-ink/50">
                  Genero il QR code…
                </p>
              )}
              <p className="mt-3 text-xs italic text-ink/50">
                Inquadra per aprire l'invito di {CONFIG.baby.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
