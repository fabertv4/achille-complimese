# 💌 Il complimese di Achille — invito digitale

Invito interattivo "baby luxury" per i 2 mesi di Achille (8 luglio, ore 19:00, Melegnano).
Busta animata con sigillo di ceralacca → carta perlata con countdown, timeline, carillon e conferma su WhatsApp.

## Avvio

```bash
npm install
npm run dev        # sviluppo su http://localhost:5173
npm run build      # build di produzione in dist/
npm run preview    # anteprima del build
```

Il build usa percorsi relativi (`base: "./"`), quindi la cartella `dist/` funziona ovunque:
GitHub Pages, Netlify, Vercel o anche aperta da un semplice hosting statico.

## Personalizzazione

Tutti i dati stanno in **`src/config.ts`** (oggetto `CONFIG`):

- **Evento**: data, ora, luogo, formato, durata (usati da countdown, dettagli e file .ics).
- **Copy**: tutte le frasi dell'invito, scritte in prima persona da Achille.
- **Foto**: `photo.url` per una foto fissa via URL; altrimenti chi apre l'invito può
  caricarla dal telefono col bottoncino 📷 (resta salvata nel browser). Senza foto
  compare l'orsacchiotto che dorme.
- **WhatsApp**: `whatsapp.phone` = numero in formato internazionale senza `+`
  (es. `393331234567`) per far arrivare le conferme dritte a mamma/papà.
  Vuoto = si apre WhatsApp e l'invitato sceglie il contatto.
- **QR code**: `share.url` = URL pubblico dell'invito (vuoto = indirizzo corrente).
- **`features`**: interruttori per carillon, QR, salva-immagine e modalità Baby Luxury.

## Funzionalità

- Busta chiusa con sigillo dorato che si apre in 3D, carta che scivola fuori, coriandoli soft
- Countdown live all'evento (giorni/ore/minuti/secondi) con cifre che scattano
- "Aggiungi al calendario" → scarica `.ics` con promemoria 2 ore prima
- "Conferma presenza" → WhatsApp con messaggio precompilato
- Cuoricini che salgono toccando il nome o la foto di Achille
- Timeline "La mia mini storia" (8 maggio → 8 giugno → 8 luglio)
- Firma calligrafica che si scrive da sola
- Carillon (ninna nanna di Brahms, sintetizzata — nessun file audio), **spento di default**
- Modalità **Baby Luxury** ✨: più oro, pulviscolo dorato, carta più luminosa
- "Salva come immagine": esporta la carta d'invito in PNG per condividerla come foto
- QR code per aprire l'invito

## Nota per la condivisione su WhatsApp

L'anteprima del link (Open Graph) è già configurata in `index.html`. Per avere anche
l'immagine di anteprima, aggiungi un `og:image` con un URL assoluto una volta pubblicato.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · lucide-react ·
`qrcode` (QR) · `html-to-image` (export PNG). Nessun backend: tutto client-side.
