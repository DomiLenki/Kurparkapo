import { leistungen } from './content.js'
import { Ein } from './ui.jsx'
import { Worte } from './Bewegung.jsx'
import { eingang } from './bilder.js'

/* Das vollständige Verzeichnis: Gruppen in großer Schrift, darunter die einzelnen Leistungen */
export function Leistungen() {
  return (
    <section id="leistungen" className="feld kapitel f-papier nur-start" data-feld="papier" aria-labelledby="leistungen-titel">
      <div className="innen">
        <div className="leistungen__kopf">
          <Worte id="leistungen-titel" className="t-kopf" text={leistungen.titel} />
          <Ein art="bild" className="leistungen__foto">
            <picture>
              <source type="image/webp" srcSet={eingang.srcSet} sizes="(min-width: 820px) 18rem, 60vw" />
              <img src={eingang.src} width={eingang.w} height={eingang.h} alt={leistungen.fotoAlt} loading="lazy" decoding="async" />
            </picture>
          </Ein>
        </div>
        <div className="verzeichnis">
          {leistungen.gruppen.map((g, i) => {
            return (
              <Ein key={g.name} className="gruppe" i={i % 5}>
                <h3 className="gruppe__kopf">
                  <span>{g.name}</span>
                  <span className="zahlen" aria-hidden="true">{g.punkte.length}</span>
                </h3>
                <ul className="gruppe__punkte">
                  {g.punkte.map((p, n) => <li key={p} style={{ '--n': n }}>{p}</li>)}
                </ul>
              </Ein>
            )
          })}
        </div>
      </div>
    </section>
  )
}
