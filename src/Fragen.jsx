import { ArrowRight } from 'lucide-react'
import { fragen, links, nummern } from './content.js'
import { Ein, Extern } from './ui.jsx'
import { Worte } from './Bewegung.jsx'

/* Häufige Fragen: ein Band je Frage, alle Antworten sofort lesbar */
export function Fragen() {
  return (
    <section className="nur-start" aria-labelledby="fragen-titel">
      <div className="band band--kopf f-gruen" data-feld="gruen">
        <div className="innen band__innen">
          <Worte id="fragen-titel" className="t-kopf" style={{ gridColumn: '1 / -1' }} text={fragen.titel} />
        </div>
      </div>
      {fragen.liste.map((x, i) => {
        const feld = i % 2 ? 'flaeche' : 'papier'
        return (
          <div key={x.f} className={`band f-${feld}`} data-feld={feld}>
            <div className="innen band__innen">
              <Ein als="h3" className="band__frage">{x.f}</Ein>
              <Ein className="band__antwort" i={1}>
                {x.a.map((p) => <p key={p}>{p}</p>)}
                {x.nummern && (
                  <dl className="nummern">
                    {nummern.map((z) => (
                      <div key={z.nummer}>
                        <dt>{z.name}</dt>
                        <dd className="zahlen"><a href={z.link}>{z.nummer}</a></dd>
                      </div>
                    ))}
                  </dl>
                )}
                {x.link && <Extern className="knopf mt-1" href={links[x.link.href]}>{x.link.text} <ArrowRight aria-hidden="true" /></Extern>}
              </Ein>
            </div>
          </div>
        )
      })}
    </section>
  )
}
