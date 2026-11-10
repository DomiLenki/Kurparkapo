import { ArrowUp } from 'lucide-react'
import { apotheke, links, meta, wissen } from './content.js'
import { Logo } from './Logo.jsx'
import { Ein, Extern } from './ui.jsx'

/* Der Schluss: der Name in voller Breite, darunter Wege, Nachschlagewerke und Rechtliches */
export function Fuss() {
  return (
    <footer className="feld f-tinte fuss" data-feld="tinte">
      <div className="innen" style={{ paddingBlock: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' }}>
        <div className="fuss__marke" style={{ '--logo-b': '100%' }}>
          <Logo schreiben wennImBild titel="Kurpark-Apotheke" />
        </div>

        <div className="raster" style={{ rowGap: '2.5rem', marginTop: 'clamp(2.5rem, 5vw, 5rem)' }}>
          <Ein className="fuss__wege col-span-12 md:col-span-5 grid content-start justify-items-start zahlen">
            <a href={apotheke.telefonLink}>{apotheke.telefon}</a>
            <a href={`mailto:${apotheke.email}`}>{apotheke.email}</a>
            <Extern href={links.route}>{apotheke.strasse}, {apotheke.ort}</Extern>
          </Ein>

          <Ein className="fuss__spalten col-span-12 md:col-span-6 md:col-start-7" i={1}>
            {wissen.map((w) => (
              <nav key={w.titel} aria-label={w.titel}>
                <h2 className="stark mb-2">{w.titel}</h2>
                <ul>{w.links.map(([name, href]) => <li key={name}><Extern href={href}>{name}</Extern></li>)}</ul>
              </nav>
            ))}
            <nav aria-label="Rechtliches">
              <h2 className="stark mb-2">Rechtliches</h2>
              <ul>
                <li><a href="#impressum">Impressum</a></li>
                <li><a href="#datenschutz">Datenschutz</a></li>
                <li><Extern href={links.original}>kurparkapo.de</Extern></li>
              </ul>
            </nav>
          </Ein>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 t-klein" style={{ marginTop: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <p>© 2026 {apotheke.firma} · Nachschlagen und Ratgeber öffnen auf kurparkapo.de</p>
          <p className="flex items-center gap-4">
            <span>made by {meta.macher}</span>
            <a href="#start" className="rundknopf" aria-label="Nach oben"><ArrowUp aria-hidden="true" /></a>
          </p>
        </div>
      </div>
    </footer>
  )
}
