# Kurpark-Apotheke Bad Füssing – Webseite

Gebaut mit Vite, React, Tailwind CSS, Lucide React und Framer Motion. made by Dominik Lengdobler.

## Inhalte ändern

Alle Angaben stehen in **`src/content.js`**: Öffnungszeiten, Telefon, Texte, Leistungen, Bewertung, Fragen, Impressum, Datenschutz.

- **Öffnungszeiten:** `zeiten` (0 = Sonntag … 6 = Samstag).
- **Abweichende Tage** (Heiligabend, Betriebsurlaub): `sonderzeiten`, Beispiele stehen im Kommentar.
- **Hinweis ganz oben auf der Seite:** `hinweis`.
- Gesetzliche Feiertage in Bayern kennt die Seite selbst (`src/lib/zeit.js`).

## Befehle

```bash
npm install        # einmalig
npm run dev        # Vorschau auf dem eigenen Rechner
npm test           # prüft die Öffnungszeiten-Logik
npm run build      # fertige Seite nach dist/ (inklusive vorgerendertem HTML)
```

Der Ordner `dist/` zusammen mit `vercel.json` ist das, was auf Vercel gehört.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `src/content.js` | alle Texte und Fakten |
| `src/lib/zeit.js` | Ortszeit Bad Füssing, Feiertage, „geöffnet?“, Sonnenstand |
| `src/Start.jsx` | Startbild mit Türschild und Farbfeldern |
| `src/Blick.jsx`, `Spezial.jsx`, `Leistungen.jsx`, `AppKapitel.jsx`, `Offen.jsx`, `Stimmen.jsx`, `Film.jsx`, `Fragen.jsx`, `Kontakt.jsx`, `Fuss.jsx` | die Kapitel |
| `src/Laden.jsx`, `src/Bilder.jsx` | Zeichnungen (Schaufenster, Spezialitäten) |
| `src/Recht.jsx` | Impressum und Datenschutz (`#impressum`, `#datenschutz`) |
| `src/index.css` | Farben, Schrift, Gestaltung, Bewegung |
| `tools/prerender.mjs` | schreibt die fertige Seite als HTML in `dist/index.html` |

## Datenschutz und Technik

Keine Cookies, keine Analyse, keine Inhalte fremder Server. Schrift (Albert Sans, SIL Open Font License) und Medien liegen im Projekt.
