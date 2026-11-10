import { Bluete } from './Bilder.jsx'

/*
  Das gezeichnete Schaufenster der Kurallee 18:
  Die Schiebetür steht offen, wenn die Apotheke geöffnet hat; Sonne, Mond und Licht folgen der Uhrzeit.
  offen: Tür auf · phase: 'tag' | 'daemmerung' | 'nacht' · lauf: 0…1 (Weg von Sonne oder Mond)
*/
export function Laden({ offen, phase, lauf }) {
  const nacht = phase === 'nacht', tag = phase === 'tag'
  const hellInnen = offen
  const glas = hellInnen ? '#f2e4a0' : nacht ? '#16261f' : '#d9e2dc'
  const oben = nacht ? '#16261f' : '#d9e2dc'
  const lampen = !tag
  // Bahn des Gestirns über dem Haus (in Prozent der Bühne)
  const x = 6 + lauf * 88
  const y = 62 - Math.sin(Math.PI * lauf) * 54

  return (
    <div className="laden" aria-hidden="true">
      <div className="laden__gestirn gestirn" style={{ left: `${x}%`, top: `${y}%` }}>
        <span className={`laden__sonne ${nacht ? 'ist-mond' : ''}`} />
      </div>
      {[[12, 16], [27, 7], [71, 11], [88, 20], [52, 4], [40, 18]].map(([l, t], i) => (
        <span key={i} className={`laden__stern ${nacht ? 'an' : ''}`} style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.6}s` }} />
      ))}
      <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMax slice" focusable="false">
        {/* Wolken, nur am Tag */}
        <g className="licht" style={{ opacity: tag ? 1 : 0 }} fill="#fff">
          <g style={{ animation: 'treiben 26s ease-in-out infinite alternate' }}><rect x="230" y="52" width="150" height="34" rx="17" /><rect x="262" y="32" width="84" height="40" rx="20" /></g>
          <g style={{ animation: 'treiben 34s ease-in-out -8s infinite alternate-reverse' }}><rect x="800" y="28" width="170" height="36" rx="18" /><rect x="842" y="10" width="78" height="38" rx="19" /></g>
        </g>

        {/* Pflaster */}
        <rect x="-3000" y="478" width="7200" height="100" fill="#c3c9c2" />

        {/* Obergeschoss */}
        <rect x="170" y="110" width="860" height="110" fill="#b4bcb4" />
        {[230, 420, 660, 850].map((fx, i) => (
          <rect key={fx} className="farbwechsel" x={fx} y="134" width="120" height="62" rx="4" fill={nacht && i === 1 ? '#f2e4a0' : oben} />
        ))}

        {/* Innenraum hinter der Tür */}
        <rect className="farbwechsel" x="505" y="300" width="190" height="178" fill={hellInnen ? '#f2e4a0' : '#16261f'} />
        <g className="licht" style={{ opacity: hellInnen ? 1 : 0 }}>
          <rect x="530" y="318" width="140" height="10" fill="#98a199" />
          {[536, 556, 578, 604, 626, 648].map((bx, i) => <rect key={bx} x={bx} y={i % 2 ? 296 : 290} width="14" height={i % 2 ? 22 : 28} rx="3" fill={['var(--rot)', 'var(--gruen)', 'var(--blau)', 'var(--rosa)', 'var(--gruen)', 'var(--rot)'][i]} />)}
          <rect x="530" y="364" width="140" height="10" fill="#98a199" />
          {[540, 566, 590, 612, 640].map((bx, i) => <rect key={bx} x={bx} y={i % 2 ? 338 : 344} width="16" height={i % 2 ? 26 : 20} rx="3" fill={['var(--blau)', 'var(--rosa)', 'var(--rot)', 'var(--gruen)', 'var(--blau)'][i]} />)}
          <rect x="520" y="408" width="160" height="70" fill="var(--rot)" />
          <rect x="520" y="408" width="160" height="12" fill="#fff" />
        </g>

        {/* Schiebetür: zwei Flügel */}
        <g className="tuer" style={{ transform: offen ? 'translateX(-86px)' : 'none' }}>
          <rect className="farbwechsel" x="505" y="300" width="95" height="178" fill={glas === '#f2e4a0' ? '#d9e2dc' : glas} />
          <rect x="586" y="368" width="7" height="46" rx="3.5" fill="#26332d" />
        </g>
        <g className="tuer" style={{ transform: offen ? 'translateX(86px)' : 'none' }}>
          <rect className="farbwechsel" x="600" y="300" width="95" height="178" fill={glas === '#f2e4a0' ? '#d9e2dc' : glas} />
          <rect x="607" y="368" width="7" height="46" rx="3.5" fill="#26332d" />
        </g>

        {/* Wand des Erdgeschosses (verdeckt die offenen Türflügel) */}
        <rect x="170" y="280" width="335" height="198" fill="#98a199" />
        <rect x="695" y="280" width="335" height="198" fill="#98a199" />
        <rect x="170" y="280" width="860" height="20" fill="#98a199" />
        <rect x="497" y="292" width="8" height="186" fill="#26332d" /><rect x="695" y="292" width="8" height="186" fill="#26332d" /><rect x="497" y="292" width="206" height="8" fill="#26332d" />

        {/* Vordach mit dem Schild */}
        <rect x="140" y="214" width="920" height="70" rx="6" fill="#f3f4f1" />
        <g transform="translate(382.4 196.9) scale(0.09)" fill="var(--rot)"><use href="#kp-schrift" /></g>
        <g transform="translate(556.6 150.2) scale(0.11)" fill="#6f7572">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <use key={i} href={`#kp-b${i}`} />)}</g>
        {[250, 600, 950].map((lx) => <circle key={lx} className="licht" cx={lx} cy="292" r="7" fill="var(--gelb)" style={{ opacity: lampen ? 1 : 0 }} />)}

        {/* Schaufenster links */}
        <rect x="212" y="306" width="250" height="140" rx="6" fill="#26332d" />
        <rect className="farbwechsel" x="220" y="314" width="234" height="124" fill={glas} />
        <g className="licht" style={{ opacity: hellInnen ? 1 : nacht ? 0.15 : 0.5 }}>
          <rect x="234" y="372" width="206" height="8" fill="#98a199" />
          {[244, 268, 290, 318, 344, 372, 398, 420].map((bx, i) => <rect key={bx} x={bx} y={i % 3 ? 344 : 336} width="16" height={i % 3 ? 28 : 36} rx="4" fill={['var(--rot)', 'var(--blau)', 'var(--gruen)', 'var(--rosa)', 'var(--blau)', 'var(--rot)', 'var(--gruen)', 'var(--rosa)'][i]} />)}
          <circle cx="262" cy="412" r="16" fill="var(--rot)" /><circle cx="300" cy="418" r="11" fill="var(--gelb)" /><circle cx="336" cy="414" r="14" fill="var(--rot)" />
          <rect x="380" y="392" width="52" height="42" rx="6" fill="var(--rosa)" />
        </g>

        {/* Fenster rechts mit Plakat */}
        <rect x="770" y="306" width="200" height="140" rx="6" fill="#26332d" />
        <rect className="farbwechsel" x="778" y="314" width="184" height="124" fill={glas} />
        <g className="licht" style={{ opacity: hellInnen ? 1 : nacht ? 0.2 : 0.6 }}>
          <rect x="800" y="328" width="70" height="96" rx="6" fill="var(--rosa)" />
          <Bluete x={835} y={366} r={22} />
          <rect x="816" y="398" width="38" height="8" rx="4" fill="#fff" />
          <rect x="888" y="328" width="56" height="96" rx="6" fill="var(--gruen)" />
          <rect x="900" y="344" width="32" height="8" rx="4" fill="#fff" /><rect x="900" y="360" width="22" height="8" rx="4" fill="#fff" />
        </g>

        {/* Pflanzkübel mit weißen Blüten, links und rechts der Tür */}
        {[472, 728].map((px, i) => (
          <g key={px}>
            <g style={{ transformOrigin: `${px}px 430px`, animation: `wiegen ${5 + i}s ease-in-out ${i * -1.5}s infinite` }}>
              <circle cx={px} cy="398" r="30" fill="var(--gruen)" /><circle cx={px - 20} cy="414" r="20" fill="var(--gruen)" /><circle cx={px + 20} cy="414" r="20" fill="var(--gruen)" />
              <Bluete x={px - 14} y={390} r={11} /><Bluete x={px + 15} y={398} r={10} /><Bluete x={px} y={416} r={9} /><Bluete x={px - 26} y={412} r={8} />
            </g>
            <path d={`M${px - 27} 428 h54 l-5 50 h-44z`} fill="var(--schwarz)" />
          </g>
        ))}

        {/* Fußmatte */}
        <rect x="528" y="478" width="144" height="10" rx="3" fill="#26332d" />
      </svg>
    </div>
  )
}
