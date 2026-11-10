import { marken } from './content.js'
import { Logo } from './Logo.jsx'
import { Bluete } from './Bilder.jsx'
import { Ein, useSichtbar } from './ui.jsx'

/*
  Bewegte Bausteine der Seite. Alles läuft über CSS (transform, opacity, clip-path)
  und hält still, wenn jemand „weniger Bewegung“ eingestellt hat.
*/

/* Vorhang beim Laden: Das Logo schreibt sich, dann hebt sich das Grün. Reines CSS, braucht kein Skript. */
export function Vorhang() {
  return (
    <div className="vorhang f-gruen" aria-hidden="true">
      <Logo schreiben titel="" />
    </div>
  )
}

/* Feiner Balken ganz oben: wie weit die Seite gelesen ist */
export function Fortschritt() {
  return <div className="fortschritt" aria-hidden="true" />
}

/* Überschrift, deren Wörter nacheinander aus der Zeile steigen */
export function Worte({ als = 'h2', text, className = '', style, ...rest }) {
  const worte = text.split(' ')
  return (
    <Ein als={als} art="worte" className={className} style={style} aria-label={text} {...rest}>
      {worte.map((w, i) => (
        <span key={i} className="wort" aria-hidden="true"><i style={{ '--w': i }}>{w}</i>{i < worte.length - 1 ? ' ' : ''}</span>
      ))}
    </Ein>
  )
}

/* Laufband mit den Marken der Hautpflege, getrennt durch die Blüte aus den Kübeln vor der Tür */
export function Laufband() {
  const [ref, an] = useSichtbar()
  const reihe = (versteckt) => (
    <ul className="laufband__reihe" aria-hidden={versteckt || undefined}>
      {marken.map((m) => (
        <li key={m}>
          <span>{m}</span>
          <svg viewBox="-20 -20 40 40" aria-hidden="true"><Bluete r={15} blatt="var(--papier)" mitte="var(--gelb)" /></svg>
        </li>
      ))}
    </ul>
  )
  return (
    <section ref={ref} className={`feld f-gruen laufband nur-start ${an ? '' : 'ruhe-bitte'}`} data-feld="gruen" aria-label="Marken unserer Hautpflege">
      <div className="laufband__spur">
        {reihe(false)}
        {reihe(true)}
      </div>
    </section>
  )
}

/* Drehendes Siegel um die Scheibe der Spezialitäten */
export function Siegel({ text }) {
  return (
    <svg className="siegel" viewBox="0 0 400 400" aria-hidden="true">
      <defs><path id="siegel-kreis" d="M200 200 m-186 0 a186 186 0 1 1 372 0 a186 186 0 1 1 -372 0" /></defs>
      <text><textPath href="#siegel-kreis" startOffset="0" textLength="1162" lengthAdjust="spacing">{text}</textPath></text>
    </svg>
  )
}
