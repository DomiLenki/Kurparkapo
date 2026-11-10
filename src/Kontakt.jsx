import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { apotheke, kontakt, links } from './content.js'
import { Ein, Extern } from './ui.jsx'
import { tuer } from './bilder.js'

/* Kontakt: die Adresse in großen Zeilen. Straße, Telefon und E-Mail sind Links. */
export function Kontakt() {
  const pfeil = (I = ArrowRight) => <span className="zeile__pfeil" aria-hidden="true"><I strokeWidth={2.4} /></span>
  return (
    <section id="kontakt" className="nur-start f-gruen" data-feld="gruen" aria-labelledby="kontakt-titel">
      <h2 id="kontakt-titel" className="nur-vorlesen">Kontakt und Anfahrt</h2>

      <div className="zeile f-gruen">
        <Ein className="innen">
          <span className="zeile__text">{apotheke.name}</span>
          <span className="zeile__foto">
            <picture>
              <source type="image/webp" srcSet={tuer.srcSet} sizes="140px" />
              <img src={tuer.src} width={tuer.w} height={tuer.h} alt={kontakt.fotoAlt} loading="lazy" decoding="async" />
            </picture>
          </span>
        </Ein>
      </div>

      <Extern className="zeile f-wald" href={links.route} aria-label={`Route planen: ${apotheke.strasse}, ${apotheke.plz} ${apotheke.ort}`}>
        <Ein className="innen"><span className="zeile__text">{apotheke.strasse}</span>{pfeil(ArrowUpRight)}</Ein>
      </Extern>

      <div className="zeile f-gruen">
        <Ein className="innen"><span className="zeile__text zahlen">{apotheke.plz} {apotheke.ort}</span></Ein>
      </div>

      <div className="zeile f-wald" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Ein className="innen" style={{ flexWrap: 'wrap', justifyContent: 'flex-start', columnGap: '0.6em' }}>
          {kontakt.zeitenKurz.map((z) => <span key={z} className="zeile__text zahlen">{z}</span>)}
        </Ein>
      </div>

      <a className="zeile f-gruen" href={apotheke.telefonLink} aria-label={`Anrufen: ${apotheke.telefon}`}>
        <Ein className="innen"><span className="zeile__text zahlen">{apotheke.telefon}</span>{pfeil()}</Ein>
      </a>

      <a className="zeile f-wald" href={`mailto:${apotheke.email}`} aria-label={`E-Mail schreiben an ${apotheke.email}`}>
        <Ein className="innen"><span className="zeile__text">{apotheke.email}</span>{pfeil()}</Ein>
      </a>

      <div className="feld f-gruen">
        <div className="innen flex flex-wrap gap-x-10 gap-y-1 py-6 zahlen">
          <p>Telefax {apotheke.fax}</p>
          <p>Plus Code {apotheke.pluscode}</p>
        </div>
      </div>
    </section>
  )
}
