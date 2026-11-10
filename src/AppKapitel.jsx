import { useState } from 'react'
import { ArrowRight, Check, Download, ShoppingBag } from 'lucide-react'
import { app, links } from './content.js'
import { Ein, Extern } from './ui.jsx'
import { Worte } from './Bewegung.jsx'

/* Vereinfachte Handy-Bildschirme zu den vier Schritten (keine echten Bildschirmfotos) */
function Handy({ children }) {
  return (
    <div data-ui className="fach__bild" aria-hidden="true">
      <div style={{ background: 'var(--schwarz)', borderRadius: '1.9rem', padding: '0.45rem', aspectRatio: '9 / 15' }}>
        <div className="h-full flex flex-col justify-center gap-3" style={{ background: 'var(--papier)', color: 'var(--schwarz)', borderRadius: '1.5rem', padding: '1rem 0.9rem', fontSize: '0.875rem', lineHeight: 1.25 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
const zeile = { background: 'var(--flaeche)', borderRadius: 0, padding: '0.6rem 0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }
const haken = (farbe = 'var(--gruen)') => <span style={{ flex: 'none', display: 'grid', placeItems: 'center', width: '1.4rem', height: '1.4rem', borderRadius: '50%', background: farbe, color: '#fff' }}><Check size={14} strokeWidth={3} /></span>
const pille = (text, farbe = 'var(--gruen)', icon) => <span style={{ alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: farbe, color: '#fff', borderRadius: 0, padding: '0.55rem 1rem', fontWeight: 500 }}>{icon}{text}</span>

const SCHIRME = {
  laden: (
    <Handy>
      <span style={{ alignSelf: 'center', display: 'grid', placeItems: 'center', width: '4.2rem', height: '4.2rem', borderRadius: '1.1rem', background: 'var(--gruen)', color: 'var(--gelb)' }}><ShoppingBag size={30} strokeWidth={1.5} /></span>
      <strong style={{ textAlign: 'center' }}>ApothekenApp</strong>
      {pille('Laden', 'var(--gruen)', <Download size={14} strokeWidth={2.5} />)}
    </Handy>
  ),
  plz: (
    <Handy>
      <span>Postleitzahl</span>
      <div style={{ ...zeile, fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.04em' }} className="zahlen">94072</div>
      <div style={{ ...zeile, background: 'var(--gelb)' }}><span><strong>Kurpark-Apotheke</strong><br />Kurallee 18</span>{haken()}</div>
    </Handy>
  ),
  reservieren: (
    <Handy>
      <div style={zeile}><span>Ihr Medikament</span>{haken()}</div>
      <div style={zeile}><span>Ihr E-Rezept</span>{haken()}</div>
      {pille('Reservieren')}
    </Handy>
  ),
  abholen: (
    <Handy>
      <span style={{ alignSelf: 'center', display: 'grid', placeItems: 'center', width: '4.6rem', height: '4.6rem', borderRadius: '50%', background: 'var(--gruen)', color: '#fff' }}><Check size={38} strokeWidth={3} /></span>
      <strong style={{ textAlign: 'center' }}>Liegt für Sie bereit</strong>
      <span style={{ textAlign: 'center' }}>Kurallee 18</span>
    </Handy>
  ),
}

/* Vier Schritte als Fächer: eines ist offen, die anderen warten als schmale Streifen */
export function AppKapitel() {
  const [offen, setOffen] = useState(0)
  return (
    <section id="app" className="feld kapitel f-flaeche nur-start" data-feld="flaeche" aria-labelledby="app-titel">
      <div className="innen">
        <div className="raster" style={{ rowGap: '1.25rem', marginBottom: 'clamp(2rem, 4.5vw, 4rem)' }}>
          <Worte id="app-titel" className="t-kopf col-span-12 md:col-span-6" text={app.titel} />
          <Ein className="col-span-12 md:col-span-5 md:col-start-8 grid gap-5 content-start justify-items-start" i={1}>
            <p className="mass">{app.text}</p>
            <div className="flex flex-wrap gap-2">
              <Extern className="knopf" href={links.appStore}>Für iPhone <ArrowRight aria-hidden="true" /></Extern>
              <Extern className="knopf" href={links.googlePlay}>Für Android <ArrowRight aria-hidden="true" /></Extern>
            </div>
          </Ein>
        </div>

        <Ein als="ol" art="klein" className="faecher">
          {app.schritte.map((s, i) => (
            <li key={s.name} className={`fach f-rose${i + 1}`} data-offen={offen === i} onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOffen(i) }}>
              <button type="button" className="fach__lasche" aria-expanded={offen === i} aria-controls={`fach-${i}`} onClick={() => setOffen(i)} onFocus={() => setOffen(i)}>
                <span>{s.name}</span>
              </button>
              <div id={`fach-${i}`} className="fach__inhalt">
                <h3 className="fach__name">{s.name}</h3>
                <p className="fach__text">{s.text}</p>
                {SCHIRME[s.bild]}
              </div>
            </li>
          ))}
        </Ein>

        <Ein className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2" i={1}>
          <p><Extern className="link stark" href={links.reservieren}>{app.ohneApp}</Extern></p>
          <p className="t-klein">{app.anbieter}</p>
        </Ein>
      </div>
    </section>
  )
}
