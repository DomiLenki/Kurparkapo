import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { bewertung, links } from './content.js'
import { Ein, Extern } from './ui.jsx'

/* Kundenstimmen: links, wer spricht – rechts, was gesagt wird */
export function Stimmen() {
  const [n, setN] = useState(0)
  const { stimmen } = bewertung
  const st = stimmen[n]
  const weiter = (d) => setN((n + d + stimmen.length) % stimmen.length)
  return (
    <section className="stimmen nur-start" aria-labelledby="stimmen-titel">
      <div className="feld f-tinte stimmen__wer" data-feld="tinte">
        <Ein>
          <h2 id="stimmen-titel" className="t-lead edel">Kundenstimmen</h2>
          <p className="mt-3 flex items-center gap-1" aria-hidden="true" style={{ color: 'var(--gelb)' }}>
            {[0, 1, 2, 3].map((i) => <Star key={i} size={26} fill="currentColor" strokeWidth={0} />)}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <Star size={26} fill="color-mix(in srgb, var(--papier) 26%, transparent)" strokeWidth={0} />
              <span style={{ position: 'absolute', inset: 0, width: '40%', overflow: 'hidden' }}><Star size={26} fill="currentColor" strokeWidth={0} /></span>
            </span>
          </p>
          <p className="mt-3 mass">{bewertung.note} {bewertung.von} bei {bewertung.anzahl}&nbsp;{bewertung.quelle}, Stand {bewertung.stand}.</p>
        </Ein>
        <Ein i={1} className="grid gap-5 justify-items-start">
          <p aria-live="polite">{st.von}</p>
          <div className="flex items-center gap-2">
            <button type="button" className="rundknopf" onClick={() => weiter(-1)} aria-label="Vorherige Stimme"><ArrowLeft aria-hidden="true" /></button>
            <button type="button" className="rundknopf" onClick={() => weiter(1)} aria-label="Nächste Stimme"><ArrowRight aria-hidden="true" /></button>
            <span className="t-klein zahlen pl-2">{n + 1} von {stimmen.length}</span>
          </div>
          <Extern className="link" href={links.karte}>Alle Rezensionen bei Google lesen <ArrowUpRight aria-hidden="true" className="inline w-4 h-4" /></Extern>
        </Ein>
      </div>
      <div className="feld f-flaeche stimmen__zitat">
        <Ein>
          <blockquote key={n} className="zitat" aria-live="polite" aria-label={`„${st.text}“`}>
            {`„${st.text}“`.split(' ').map((w, i) => <span key={i} aria-hidden="true" style={{ '--w': i }}>{w} </span>)}
          </blockquote>
        </Ein>
      </div>
    </section>
  )
}
