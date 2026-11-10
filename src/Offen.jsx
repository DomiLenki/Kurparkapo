import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { apotheke, links, offen as inhalt, zeiten, sonderzeiten } from './content.js'
import { WOCHENTAGE, WOCHENTAGE_KURZ, hhmm, himmel, plusTage, sonne, statusAm, tag, uhr, wannWieder, zeitenAm } from './lib/zeit.js'
import { Ein, Extern, feldWechsel, useSichtbar, useStatus } from './ui.jsx'
import { Laden } from './Laden.jsx'
import { Worte } from './Bewegung.jsx'

const REIHE = [1, 2, 3, 4, 5, 6, 0]
const VON = 6 * 60, BIS = 20 * 60 // Balken zeigen 6 bis 20 Uhr
const anteil = (m) => `${Math.max(0, Math.min(100, ((m - VON) / (BIS - VON)) * 100))}%`
const FELD = { tag: 'blau', daemmerung: 'rosa', nacht: 'nacht' }

/*
  Öffnungszeiten zum Ausprobieren: Tag wählen, Uhrzeit schieben –
  das Schaufenster zeigt, ob die Tür dann offen ist.
*/
export function Offen() {
  const s = useStatus()
  const [wahl, setWahl] = useState(null) // null = jetzt, sonst { wd, minuten }
  const [ref, an] = useSichtbar()

  // Ohne Uhr (fertiges HTML): ein gewöhnlicher Dienstagvormittag
  const heute = s ? s.o : tag(2026, 11, 10)
  const jetztMin = s ? s.o.minuten : 10 * 60
  const t = wahl ? plusTage(heute, (wahl.wd - heute.wd + 7) % 7) : heute
  const minuten = wahl ? wahl.minuten : jetztMin
  const st = statusAm(t, minuten, zeiten, sonderzeiten)
  const h = himmel(minuten, sonne(t, apotheke.breite, apotheke.laenge))
  const feld = FELD[h.phase]

  useEffect(() => { feldWechsel() }, [feld])

  const live = s && !wahl
  const wann = live ? 'Jetzt' : !s && !wahl ? 'Dienstag, 10:00 Uhr' : `${WOCHENTAGE[t.wd]}, ${hhmm(minuten)} Uhr`
  const antwort = st.offen ? `geöffnet bis ${uhr(st.bis)}` : `geschlossen${st.grund ? ` (${st.grund})` : ''}${st.naechste ? `, wieder ${wannWieder(st.naechste)}` : ''}`

  return (
    <section ref={ref} id="oeffnungszeiten" className={`feld kapitel himmel f-${feld} nur-start ${an ? '' : 'ruhe-bitte'}`} data-feld={feld} aria-labelledby="offen-titel">
      <div className="innen">
        <div className="raster" style={{ rowGap: '1.25rem' }}>
          <Worte id="offen-titel" className="t-kopf col-span-12 md:col-span-6" text={inhalt.titel} />
          <Ein als="p" className="col-span-12 md:col-span-5 md:col-start-8 mass" i={1}>{inhalt.text}</Ein>
        </div>
      </div>

      <Ein art="klein" className="innen" style={{ marginBlock: 'clamp(1.5rem, 3vw, 3rem) 0' }}>
        <Laden offen={st.offen} phase={h.phase} lauf={h.lauf} />
      </Ein>

      <div className="feld f-papier" style={{ marginBottom: 'calc(-1 * clamp(4.5rem, 9vw, 8.5rem))', paddingBlock: 'clamp(2rem, 4vw, 3.5rem) clamp(3.5rem, 7vw, 6.5rem)' }}>
        <div className="innen raster" style={{ rowGap: '2.5rem' }}>
          <Ein className="wann col-span-12 md:col-span-6">
            <h3 className="t-lead edel">{inhalt.frage}</h3>
            <div className="tage" role="group" aria-label="Wochentag wählen">
              {REIHE.map((wd) => (
                <button key={wd} type="button" className="tagknopf" aria-pressed={(wahl ? wahl.wd : heute.wd) === wd} aria-label={WOCHENTAGE[wd]} onClick={() => setWahl({ wd, minuten: wahl ? wahl.minuten : Math.round(jetztMin / 15) * 15 })}>
                  {WOCHENTAGE_KURZ[wd]}
                </button>
              ))}
            </div>
            <label className="block">
              <span className="nur-vorlesen">Uhrzeit wählen</span>
              <input id="uhrzeit" className="regler" type="range" min="0" max="1425" step="15" value={Math.round(minuten / 15) * 15} aria-valuetext={`${hhmm(minuten)} Uhr`} onChange={(e) => setWahl({ wd: wahl ? wahl.wd : heute.wd, minuten: +e.target.value })} />
            </label>
            <p className="t-lead zahlen" role="status" style={{ minHeight: '2.6em' }}>
              <span className="stark">{wann}:</span> {antwort}.
            </p>
            <div className="flex flex-wrap gap-2">
              {wahl && <button type="button" className="knopf knopf-zweit" onClick={() => setWahl(null)}>Zurück zu jetzt</button>}
              {!st.offen && <Extern className="knopf" href={links.notdienst}>Notdienst finden <ArrowRight aria-hidden="true" /></Extern>}
            </div>
          </Ein>

          <Ein className="col-span-12 md:col-span-5 md:col-start-8" i={1}>
            <table className="woche zahlen">
              <caption className="nur-vorlesen">Öffnungszeiten der Woche</caption>
              <tbody>
                {REIHE.map((wd) => {
                  const d = plusTage(heute, (wd - heute.wd + 7) % 7)
                  const z = zeitenAm(d, zeiten, sonderzeiten)
                  const istHeute = !!s && wd === heute.wd
                  return (
                    <tr key={wd} data-heute={istHeute} style={{ '--z': REIHE.indexOf(wd) }}>
                      <th scope="row">{WOCHENTAGE[wd]}</th>
                      <td style={{ width: '6.5em' }}>{z.spannen.length ? z.spannen.map(([a, b]) => `${uhr(a).replace(/\u00A0Uhr$/, '')}–${uhr(b)}`).join(', ') : 'geschlossen'}</td>
                      <td aria-hidden="true" className="hidden sm:table-cell">
                        <div className="balken">
                          {z.spannen.map(([a, b]) => <i key={a} style={{ left: anteil(a), width: `calc(${anteil(b)} - ${anteil(a)})` }} />)}
                          {istHeute && s.o.minuten >= VON && s.o.minuten <= BIS && <b style={{ left: anteil(s.o.minuten) }} />}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="t-klein mt-5 mass">{inhalt.geschlossen}</p>
          </Ein>
        </div>
      </div>
    </section>
  )
}
