import { ArrowLeft } from 'lucide-react'
import { datenschutz, impressum } from './content.js'

function Seite({ id, daten }) {
  return (
    <section id={id} className="recht feld f-papier" data-feld="papier" aria-labelledby={`${id}-titel`}>
      <div className="innen" style={{ paddingBlock: 'calc(var(--kopfzeile) + 2.5rem) clamp(4rem, 8vw, 7rem)' }}>
        <p><a className="knopf knopf-dunkel" href="#start"><ArrowLeft aria-hidden="true" /> Zur Startseite</a></p>
        <h1 id={`${id}-titel`} className="t-kopf" style={{ marginTop: '2.5rem' }}>{daten.titel}</h1>
        <div style={{ maxWidth: '42rem' }}>
          {daten.abschnitte.map((a) => (
            <div key={a.h}>
              <h2>{a.h}</h2>
              {a.p.map((p) => <p key={p}>{p}</p>)}
            </div>
          ))}
          {daten.stand && <p className="t-klein" style={{ marginTop: '2.5rem' }}>Stand: {daten.stand}</p>}
        </div>
      </div>
    </section>
  )
}

/* Impressum und Datenschutz: eigene Ansichten, erreichbar über #impressum und #datenschutz */
export function Recht() {
  return (
    <>
      <Seite id="impressum" daten={impressum} />
      <Seite id="datenschutz" daten={datenschutz} />
    </>
  )
}
