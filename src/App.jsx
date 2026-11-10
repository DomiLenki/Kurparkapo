import { useCallback, useEffect, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { LogoVorrat } from './Logo.jsx'
import { Uhr, useIso } from './ui.jsx'
import { Kopf, Blatt } from './Kopf.jsx'
import { Start } from './Start.jsx'
import { Blick } from './Blick.jsx'
import { Spezial } from './Spezial.jsx'
import { Leistungen } from './Leistungen.jsx'
import { AppKapitel } from './AppKapitel.jsx'
import { Offen } from './Offen.jsx'
import { Stimmen } from './Stimmen.jsx'
import { Laufband, Vorhang, Fortschritt } from './Bewegung.jsx'
import { Fragen } from './Fragen.jsx'
import { Kontakt } from './Kontakt.jsx'
import { Fuss } from './Fuss.jsx'
import { Recht } from './Recht.jsx'

const RECHT = ['#impressum', '#datenschutz']

export default function App() {
  const [menue, setMenue] = useState(false)
  const auf = useCallback(() => setMenue(true), [])
  const zu = useCallback(() => setMenue(false), [])

  // Erst wenn das Skript läuft, dürfen Kapitel beim Scrollen einblenden.
  useIso(() => { document.documentElement.classList.add('bewegt') }, [])

  // Impressum und Datenschutz sind eigene Ansichten (auch für Browser ohne :has)
  useEffect(() => {
    const ansicht = () => {
      const recht = RECHT.includes(window.location.hash)
      document.documentElement.classList.toggle('ansicht-recht', recht)
      if (recht) window.scrollTo(0, 0)
    }
    ansicht()
    window.addEventListener('hashchange', ansicht)
    return () => window.removeEventListener('hashchange', ansicht)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <Uhr>
        <LogoVorrat />
        <Vorhang />
        <Fortschritt />
        <a className="sprung" href="#inhalt">Zum Inhalt springen</a>
        <Kopf menueAuf={auf} />
        <Blatt offen={menue} zu={zu} />
        <main id="inhalt">
          <Start />
          <Blick />
          <Spezial />
          <Leistungen />
          <Laufband />
          <AppKapitel />
          <Offen />
          <Stimmen />
          <Fragen />
          <Kontakt />
          <Recht />
        </main>
        <Fuss />
      </Uhr>
    </MotionConfig>
    </LazyMotion>
  )
}
