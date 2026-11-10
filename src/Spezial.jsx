import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { spezialitaeten } from './content.js'
import { Zeichnung } from './Bilder.jsx'
import { Ein, useSichtbar } from './ui.jsx'
import { Siegel } from './Bewegung.jsx'

const RAUS = [0.23, 1, 0.32, 1]

/*
  Sechs Spezialitäten zum Antippen: Der Name wählt, die Zeichnung wechselt
  und das ganze Kapitel nimmt die Farbe der Spezialität an.
*/
export function Spezial() {
  const { liste, titel } = spezialitaeten
  const [n, setN] = useState(0)
  const [ref, an] = useSichtbar()
  const it = liste[n]

  const taste = (e) => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!d) return
    e.preventDefault()
    const neu = (n + d + liste.length) % liste.length
    setN(neu)
    document.getElementById(`spezial-${liste[neu].id}`)?.focus()
  }

  return (
    <section ref={ref} id="spezialitaeten" className={`feld kapitel spezial f-gruen nur-start ${an ? '' : 'ruhe-bitte'}`} data-feld="gruen" aria-labelledby="spezial-titel">
      <div className="innen">
        <div className="spezial__raum">
          <div className="spezial__liste">
            <Ein als="h2" id="spezial-titel">{titel}</Ein>
            <div role="tablist" aria-orientation="vertical" aria-labelledby="spezial-titel" className="flex flex-col items-start">
              {liste.map((x, i) => (
                <Ein key={x.id} art="links" i={i + 1}>
                  <button type="button" role="tab" id={`spezial-${x.id}`} aria-selected={i === n} aria-controls="spezial-fakt" tabIndex={i === n ? 0 : -1} className="spezial__name" onClick={() => setN(i)} onKeyDown={taste}>
                    <span>{x.name}</span>
                  </button>
                </Ein>
              ))}
            </div>
            <div id="spezial-fakt" role="tabpanel" aria-labelledby={`spezial-${it.id}`} className="spezial__fakt t-text">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={it.id} initial={{ opacity: 0, transform: 'translateY(10px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} exit={{ opacity: 0, transform: 'translateY(-6px)' }} transition={{ duration: 0.22, ease: RAUS }}>
                  <p>{it.text}</p>
                  {it.notiz && <p className="t-klein mt-3">{it.notiz}</p>}
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          <Ein art="klein" className="spezial__buehne">
            <Siegel text="Kurpark-Apotheke · Bad Füssing · Kurallee 18 · Kurpark-Apotheke · Bad Füssing · Kurallee 18 · " />
            <div className="spezial__scheibe" />
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={it.id} className="spezial__bild" initial={{ opacity: 0, transform: 'scale(0.96)' }} animate={{ opacity: 1, transform: 'scale(1)' }} exit={{ opacity: 0, transform: 'scale(0.98)' }} transition={{ duration: 0.3, ease: RAUS }}>
                <Zeichnung name={it.bild} />
              </m.div>
            </AnimatePresence>
          </Ein>
        </div>
      </div>
    </section>
  )
}
