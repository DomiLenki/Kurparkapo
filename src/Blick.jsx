import { ArrowUpRight, Phone } from 'lucide-react'
import { apotheke, bewertung, blick, links } from './content.js'
import { Ein, Extern, Zahl } from './ui.jsx'
import { Worte } from './Bewegung.jsx'
import { schild } from './bilder.js'

/* „Auf einen Blick“: ein Mosaik aus ungleichen Kacheln – Zahl, Liste, Satz und ein Foto */
export function Blick() {
  return (
    <section className="feld f-papier nur-start" data-feld="papier" aria-labelledby="blick-titel" style={{ padding: 'clamp(1.5rem, 3vw, 3rem) max(var(--rand), env(safe-area-inset-left, 0px)) clamp(4rem, 8vw, 8rem)' }}>
      <div className="mosaik">
        <div className="kachel k-titel f-flaeche">
          <Worte id="blick-titel" className="t-kopf" text={blick.titel} />
        </div>

        <Ein art="bild" className="kachel kachel--bild k-bild" i={1}>
          <picture className="bildkern block w-full h-full">
            <source type="image/webp" srcSet={schild.srcSet} sizes="(min-width: 820px) 50vw, 100vw" />
            <img src={schild.src} width={schild.w} height={schild.h} alt={blick.fotoAlt} loading="lazy" decoding="async" />
          </picture>
        </Ein>

        <Ein als={Extern} href={links.karte} className="kachel k-note f-gruen" i={1} aria-label={`${bewertung.note} ${bewertung.von} bei Google, ${bewertung.anzahl} Rezensionen. Rezensionen bei Google lesen`}>
          <span className="kachel__zahl zahlen"><Zahl wert={4.4} stellen={1} /></span>
          <span className="t-klein mt-auto pr-6">{bewertung.von} bei Google, {bewertung.anzahl}&nbsp;Rezensionen</span>
          <ArrowUpRight aria-hidden="true" className="absolute right-4 bottom-4 w-5 h-5" />
        </Ein>

        <Ein className="kachel k-sprachen f-flaeche" i={2}>
          <h3 className="t-klein">{blick.sprachenTitel}</h3>
          <ul className="mt-auto t-lead edel" style={{ lineHeight: 1.25 }}>
            {blick.sprachen.map((s, n) => <li key={s} lang={['de', 'en', 'fr', 'ru'][n]}>{s}</li>)}
          </ul>
        </Ein>

        <Ein className="kachel k-karten f-flaeche" i={2}>
          <p className="t-text mt-auto" style={{ maxWidth: '18ch' }}>{blick.kartenTitel} {blick.karten}.</p>
        </Ein>

        <Ein als="a" href={apotheke.telefonLink} className="kachel k-telefon f-weiss" i={3}>
          <span className="kachel__zahl zahlen" style={{ fontSize: 'var(--mittel)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>08531&nbsp;/ 20&nbsp;22</span>
          <span className="t-klein mt-auto flex items-center gap-2"><Phone aria-hidden="true" className="w-4 h-4" /> {blick.telefonHinweis}</span>
        </Ein>

        <Ein className="kachel k-satz f-gruen" i={2}>
          <p className="kachel__satz">{blick.durchgehend}</p>
        </Ein>
      </div>
    </section>
  )
}
