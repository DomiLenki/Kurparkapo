import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowDownRight, Menu, Phone, X, Navigation } from 'lucide-react'
import { apotheke, kapitel, links } from './content.js'
import { Logo } from './Logo.jsx'
import { Extern, useStatus } from './ui.jsx'

/*
  Die Kopfzeile erscheint, sobald das Startbild nach oben weg ist,
  und trägt immer die Farbe des Kapitels, das gerade unter ihr liegt.
*/
export function Kopf({ menueAuf }) {
  const [feld, setFeld] = useState('papier')
  const s = useStatus()

  useEffect(() => {
    let bild = 0
    const lesen = () => {
      bild = 0
      const y = 68 // knapp unter der Kopfzeile: sie nimmt die Farbe des Kapitels, das unter ihr beginnt
      let f = 'papier'
      for (const el of document.querySelectorAll('[data-feld]')) {
        const r = el.getBoundingClientRect()
        if (r.height && r.top <= y && r.bottom > y) f = el.dataset.feld
      }
      setFeld(f)
    }
    const an = () => { if (!bild) bild = requestAnimationFrame(lesen) }
    lesen()
    const ereignisse = ['scroll', 'resize', 'feldwechsel', 'hashchange']
    ereignisse.forEach((e) => window.addEventListener(e, an, { passive: true }))
    return () => { ereignisse.forEach((e) => window.removeEventListener(e, an)); cancelAnimationFrame(bild) }
  }, [])

  return (
    <header className={`kopf f-${feld}`}>
      <div className="innen kopf__innen">
        <a href="#start" className="kopf__logo" aria-label="Kurpark-Apotheke, zum Seitenanfang" style={{ '--logo-b': '7.4rem' }}>
          <Logo titel="" />
        </a>
        {s && <p className="t-klein zahlen hidden xl:block mr-auto pl-4">{s.text.kurz}</p>}
        <nav className="kopf__nav" aria-label="Hauptnavigation">
          {kapitel.map((k) => <a key={k.id} href={`#${k.id}`}>{k.name}</a>)}
          <Extern className="knopf hidden sm:inline-flex" href={links.reservieren}>Reservieren</Extern>
          <a className="rundknopf lg:hidden" href={apotheke.telefonLink} aria-label={`Anrufen: ${apotheke.telefon}`}><Phone aria-hidden="true" /></a>
          <button type="button" className="rundknopf kopf__menue" onClick={menueAuf} aria-label="Menü öffnen"><Menu aria-hidden="true" /></button>
        </nav>
      </div>
    </header>
  )
}

/* Das Menü für schmale Bildschirme: dieselben fünf Farbfelder wie am Start */
export function Blatt({ offen, zu }) {
  const knopf = useRef(null)
  const s = useStatus()

  useEffect(() => {
    if (!offen) return
    const vorher = document.activeElement
    knopf.current?.focus()
    const taste = (e) => { if (e.key === 'Escape') zu() }
    document.addEventListener('keydown', taste)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', taste)
      document.documentElement.style.overflow = ''
      if (vorher instanceof HTMLElement) vorher.focus({ preventScroll: true })
    }
  }, [offen, zu])

  return (
    <div className="blatt" hidden={!offen} inert={!offen} role="dialog" aria-modal="true" aria-label="Menü">
      <div className="blatt__kopf" style={{ '--logo-b': '7.4rem' }}>
        <Logo titel="" />
        <button ref={knopf} type="button" className="rundknopf" style={{ background: 'var(--papier)', color: 'var(--schwarz)' }} onClick={zu} aria-label="Menü schließen"><X aria-hidden="true" /></button>
      </div>
      <nav className="verweise" aria-label="Kapitel">
        {kapitel.map((k) => (
          <a key={k.id} href={`#${k.id}`} onClick={zu}>
            <span>{k.name}</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
        ))}
      </nav>
      {s && <p className="zahlen px-3 pb-3">{s.text.kurz}</p>}
      <div className="grid gap-2 sm:grid-cols-3 f-gruen">
        <Extern className="knopf" href={links.reservieren}>Medikament reservieren <ArrowRight aria-hidden="true" /></Extern>
        <a className="knopf knopf-zweit zahlen" href={apotheke.telefonLink}><Phone aria-hidden="true" /> {apotheke.telefon}</a>
        <Extern className="knopf knopf-zweit" href={links.route}><Navigation aria-hidden="true" /> Route planen</Extern>
      </div>
    </div>
  )
}
