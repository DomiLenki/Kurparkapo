import { ArrowRight, Phone } from 'lucide-react'
import { apotheke, links, start, hinweis } from './content.js'
import { Extern, useStatus } from './ui.jsx'
import { aussen } from './bilder.js'

/*
  Der erste Bildschirm: das Foto der Tür über die ganze Breite,
  davor eine dunkelgrüne Tafel mit dem Stand von jetzt – wie ein Schild an der Tür.
*/
export function Start() {
  const s = useStatus()
  // Ohne Uhrzeit (fertiges HTML, kein JavaScript) zeigt die Tafel die Öffnungszeiten.
  const zeilen = s ? [s.text.zeile1, s.text.zeile2] : ['Mo–Fr 8–18 Uhr', 'Sa 8–12 Uhr']
  const laenge = Math.max(...zeilen.map((z) => z.length))
  const zu = s && !s.st.offen

  return (
    <section id="start" className="start nur-start" aria-label="Kurpark-Apotheke Bad Füssing">
      {hinweis && <p className="start__hinweis" role="note">{hinweis}</p>}

      <p className="start__satz">{start.satz}</p>

      <div className="start__bild">
        <picture>
          <source type="image/webp" srcSet={aussen.srcSet} sizes="100vw" />
          <img src={aussen.src} width={aussen.w} height={aussen.h} alt={start.fotoAlt} fetchPriority="high" decoding="async" />
        </picture>
      </div>

      <div className="start__tafel f-gruen">
        <h1 className="nur-vorlesen">Kurpark-Apotheke Bad Füssing</h1>
        <p key={zeilen.join('')} className="status zahlen" style={{ '--n': laenge }} role="status">
          <span><i>{zeilen[0]}</i></span>
          <span><i>{zeilen[1]}</i></span>
        </p>
        <div className="start__knoepfe">
          {zu ? (
            <>
              <Extern className="knopf" href={links.notdienst}>Notdienst finden <ArrowRight aria-hidden="true" /></Extern>
              <Extern className="knopf knopf-zweit" href={links.reservieren}>Medikament reservieren</Extern>
            </>
          ) : (
            <>
              <Extern className="knopf" href={links.reservieren}>Medikament reservieren <ArrowRight aria-hidden="true" /></Extern>
              <a className="knopf knopf-zweit zahlen" href={apotheke.telefonLink}><Phone aria-hidden="true" /> {apotheke.telefon}</a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
