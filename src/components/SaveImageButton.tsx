import { useState } from "react";
import { toPng } from "html-to-image";
import { Check, Download } from "lucide-react";

interface Props {
  /** Ref del nodo della carta d'invito da esportare */
  target: React.RefObject<HTMLDivElement | null>;
}

/** Salva la carta d'invito come immagine PNG ad alta risoluzione. */
export default function SaveImageButton({ target }: Props) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const save = async () => {
    const node = target.current;
    if (!node || busy) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#FAF6EF",
        // esclude i controlli di editing (bottone fotocamera, pannello foto)
        filter: (n) =>
          !(n instanceof HTMLElement && n.hasAttribute("data-no-export")),
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "invito-achille.png";
      a.click();
      setDone(true);
      window.setTimeout(() => setDone(false), 2500);
    } catch {
      // foto da URL esterni senza CORS possono bloccare l'export
      window.alert(
        "Non riesco a salvare l'immagine: se hai usato una foto da URL esterno, prova a caricarla dal telefono.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={save}
      disabled={busy}
      className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-medium text-ink disabled:opacity-60"
    >
      {done ? (
        <Check size={18} className="text-salvia-deep" />
      ) : (
        <Download size={18} strokeWidth={1.7} className="text-oro-deep" />
      )}
      {done ? "Salvata!" : busy ? "Un attimo…" : "Salva come immagine"}
    </button>
  );
}
