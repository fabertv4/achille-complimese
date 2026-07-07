import { MessageCircleHeart } from "lucide-react";
import { CONFIG } from "../config";

/** Conferma presenza: apre WhatsApp con il messaggio già scritto. */
export default function WhatsAppRSVP() {
  const text = encodeURIComponent(CONFIG.whatsapp.message);
  const href = CONFIG.whatsapp.phone
    ? `https://wa.me/${CONFIG.whatsapp.phone}?text=${text}`
    : `https://wa.me/?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-lg font-medium tracking-wide text-bianco-caldo"
    >
      <MessageCircleHeart size={21} strokeWidth={1.8} />
      Conferma presenza
    </a>
  );
}
