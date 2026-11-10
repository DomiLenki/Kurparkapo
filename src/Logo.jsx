import { LOGO_BOX, KURPARK, APOTHEKE } from './logo-pfade.js'
import { useImBild } from './ui.jsx'

/* Die Pfade liegen einmal unsichtbar auf der Seite; jedes Logo verweist darauf. */
export function LogoVorrat() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <path id="kp-schrift" d={KURPARK} fillRule="evenodd" />
        {APOTHEKE.map((d, i) => <path key={i} id={`kp-b${i}`} d={d} />)}
      </defs>
    </svg>
  )
}

/*
  Das Logo: „Kurpark“ in roter Schreibschrift, darunter „APOTHEKE“.
  schreiben = die Schrift schreibt sich einmal von links, die Buchstaben steigen nach.
  Auf farbigen Feldern färbt --logo-schrift die Schreibschrift um; die Versalien nehmen die Textfarbe.
*/
export function Logo({ schreiben = false, wennImBild = false, className = '', titel = 'Kurpark-Apotheke' }) {
  const [ref, da] = useImBild('0px 0px -15% 0px')
  const an = schreiben && (!wennImBild || da)
  const wartet = schreiben && wennImBild && !da
  return (
    <span ref={ref} className={`logo ${an ? 'logo--schreibt' : ''} ${wartet ? 'logo--wartet' : ''} ${className}`} {...(titel ? { role: 'img', 'aria-label': titel } : { 'aria-hidden': true })}>
      <svg viewBox={LOGO_BOX} aria-hidden="true" focusable="false">
        <g fill="currentColor">
          {APOTHEKE.map((_, i) => <use key={i} href={`#kp-b${i}`} className="logo__b" style={{ '--i': i }} />)}
        </g>
      </svg>
      <svg viewBox={LOGO_BOX} aria-hidden="true" focusable="false" className="logo__schrift">
        <use href="#kp-schrift" />
      </svg>
    </span>
  )
}
