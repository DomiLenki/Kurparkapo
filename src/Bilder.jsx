/*
  Die Zeichnungen der Seite: flach, ohne Umrisslinien, nur in den Farben der Apotheke.
  Jede Zeichnung sitzt in einem Feld von 400 × 400 und steht vor der hellen Scheibe.
*/
const ROT = 'var(--rot)', GELB = '#d8c75c', GRUEN = '#4c7862', BLAU = 'var(--gruen)', ROSA = '#b9c9bb', SCHWARZ = 'var(--nacht)', PAPIER = 'var(--papier)', WEISS = '#fff'

/* Kleine Margerite wie in den Kübeln vor der Tür */
export function Bluete({ x = 0, y = 0, r = 14, mitte = GELB, blatt = WEISS }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 45, 90, 135].map((w) => <ellipse key={w} rx={r} ry={r * 0.36} fill={blatt} transform={`rotate(${w})`} />)}
      <circle r={r * 0.38} fill={mitte} />
    </g>
  )
}

function platzen(e) {
  const el = e.currentTarget
  if (el.animate) el.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.9)', opacity: 0 }], { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
}

/* Blasen, die aufsteigen; antippen lässt sie platzen */
function Blasen({ liste }) {
  return liste.map(([x, y, r, farbe, dauer, start], i) => (
    <g key={i} style={{ animation: `steigen ${dauer}s linear ${start}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }}>
      <circle cx={x} cy={y} r={r} fill={farbe} onPointerDown={platzen} style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: 'pointer', pointerEvents: 'auto' }} />
    </g>
  ))
}

function Wanne() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Badewanne mit aufsteigenden Blasen">
      <Blasen liste={[[150, 150, 13, BLAU, 4.6, 0], [205, 140, 9, ROSA, 3.8, 1.1], [250, 152, 16, BLAU, 5.2, 0.5], [118, 158, 8, ROSA, 4.2, 2.2], [290, 150, 10, ROSA, 4.9, 1.7], [180, 156, 7, BLAU, 3.5, 2.8]]} />
      {/* Füße */}
      <path d="M96 318 l-16 44 h30 l14 -36z" fill={SCHWARZ} />
      <path d="M304 318 l16 44 h-30 l-14 -36z" fill={SCHWARZ} />
      {/* Wanne */}
      <path d="M44 188 h312 v22 c0 76 -44 126 -110 126 h-92 c-66 0 -110 -50 -110 -126z" fill={BLAU} />
      {/* Wasser mit Schaum */}
      <path d="M58 188 h284 v10 c0 6 -4 10 -10 10 h-264 c-6 0 -10 -4 -10 -10z" fill={GELB} />
      <circle cx="96" cy="184" r="17" fill={WEISS} /><circle cx="126" cy="176" r="22" fill={WEISS} /><circle cx="160" cy="184" r="15" fill={WEISS} />
      <circle cx="262" cy="182" r="18" fill={WEISS} /><circle cx="292" cy="176" r="13" fill={WEISS} /><circle cx="232" cy="186" r="11" fill={WEISS} />
      {/* Rand */}
      <rect x="30" y="184" width="340" height="24" rx="12" fill={SCHWARZ} />
      {/* Handtuch */}
      <path d="M60 180 h62 v104 c0 6 -4 10 -10 10 h-42 c-6 0 -10 -4 -10 -10z" fill={ROT} />
      <rect x="60" y="252" width="62" height="12" fill={WEISS} />
      {/* Hahn */}
      <path d="M318 184 v-52 c0 -26 -44 -26 -44 0 v10 h18 v-8 c0 -6 8 -6 8 0 v50z" fill={SCHWARZ} />
      <circle cx="283" cy="160" r="6" fill={BLAU} style={{ animation: 'tropfen 1.8s ease-in-out infinite' }} />
      <Bluete x={332} y={262} r={20} />
    </svg>
  )
}

function Strumpf() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Kompressionsstrumpf mit Maßband">
      {/* Strumpf */}
      <path d="M138 24 h112 v214 c0 24 10 40 36 50 l42 16 c40 16 34 62 -6 62 h-118 c-40 0 -66 -24 -66 -64z" fill={ROSA} />
      <path d="M138 24 h112 v44 h-112z" fill={ROT} />
      <rect x="150" y="34" width="8" height="24" rx="4" fill={WEISS} /><rect x="170" y="34" width="8" height="24" rx="4" fill={WEISS} /><rect x="190" y="34" width="8" height="24" rx="4" fill={WEISS} /><rect x="210" y="34" width="8" height="24" rx="4" fill={WEISS} /><rect x="230" y="34" width="8" height="24" rx="4" fill={WEISS} />
      {/* Ferse und Spitze */}
      <path d="M138 300 c0 44 28 66 66 66 h10 c-34 -8 -52 -32 -52 -66z" fill={ROT} />
      <path d="M318 366 c44 0 48 -46 10 -62 l-8 -3 c20 26 14 52 -18 65z" fill={ROT} />
      {/* Maßband um die Wade */}
      <g style={{ transformBox: 'fill-box', transformOrigin: '20% 50%', animation: 'wiegen 7s ease-in-out infinite' }}>
        <path d="M112 150 h170 c10 0 18 8 18 18 v0 c0 10 -8 18 -18 18 h-170z" fill={GELB} />
        {[128, 150, 172, 194, 216, 238, 260].map((x, i) => <rect key={x} x={x} y={i % 2 ? 150 : 150} width="5" height={i % 2 ? 12 : 20} fill={SCHWARZ} />)}
        <path d="M282 150 c26 0 44 16 44 40 c0 26 -20 44 -46 44 c-22 0 -38 -14 -38 -34 c0 -16 12 -28 28 -28 v14 c-8 0 -14 6 -14 14 c0 10 10 18 24 18 c16 0 30 -12 30 -28 c0 -14 -12 -24 -28 -24z" fill={GELB} />
      </g>
      <circle cx="96" cy="168" r="26" fill={BLAU} />
      <circle cx="96" cy="168" r="9" fill={PAPIER} />
    </svg>
  )
}

function Tropfen() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Blutstropfen und Messgerät">
      {/* Messgerät */}
      <g transform="rotate(9 262 250)">
        <rect x="236" y="92" width="48" height="96" rx="6" fill={GELB} />
        <rect x="250" y="92" width="20" height="30" fill={WEISS} />
        <rect x="186" y="160" width="150" height="212" rx="34" fill={SCHWARZ} />
        <rect x="206" y="186" width="110" height="84" rx="14" fill={PAPIER} />
        <path d="M236 232 l16 16 l34 -38" fill="none" stroke={GRUEN} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="261" cy="318" r="24" fill={GELB} />
      </g>
      {/* Tropfen */}
      <g style={{ animation: 'tropfen 3.2s ease-in-out infinite' }}>
        <path d="M150 28 c0 0 -92 112 -92 182 a92 92 0 0 0 184 0 c0 -70 -92 -182 -92 -182z" fill={ROT} />
        <path d="M104 216 a46 46 0 0 0 30 44" fill="none" stroke={WEISS} strokeWidth="13" strokeLinecap="round" />
      </g>
      <circle cx="232" cy="64" r="11" fill={ROT} style={{ animation: 'tropfen 2.4s ease-in-out 0.4s infinite' }} />
    </svg>
  )
}

function Waage() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Babywaage mit gefalteten Tüchern">
      {/* gefaltetes Tuch */}
      <path d="M118 150 h164 c10 0 18 8 18 18 v30 h-200 v-30 c0 -10 8 -18 18 -18z" fill={GRUEN} />
      <rect x="100" y="172" width="200" height="12" fill={PAPIER} />
      <path d="M150 112 h100 c8 0 14 6 14 14 v26 h-128 v-26 c0 -8 6 -14 14 -14z" fill={ROSA} />
      {/* Schale */}
      <path d="M36 196 h328 c8 0 14 6 14 14 c0 34 -30 56 -68 56 h-220 c-38 0 -68 -22 -68 -56 c0 -8 6 -14 14 -14z" fill={ROSA} />
      {/* Sockel mit Anzeige */}
      <rect x="150" y="262" width="100" height="26" fill={SCHWARZ} />
      <rect x="72" y="284" width="256" height="92" rx="24" fill={SCHWARZ} />
      <circle cx="200" cy="330" r="34" fill={PAPIER} />
      <g style={{ transformOrigin: '200px 330px', animation: 'zeiger 3.4s ease-in-out infinite' }}>
        <rect x="197" y="302" width="6" height="32" rx="3" fill={ROT} />
      </g>
      <circle cx="200" cy="330" r="7" fill={SCHWARZ} />
      <rect x="96" y="322" width="44" height="16" rx="8" fill={GELB} /><rect x="260" y="322" width="44" height="16" rx="8" fill={BLAU} />
    </svg>
  )
}

function Tiegel() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Cremetiegel und Tube">
      {/* Tube */}
      <g transform="rotate(-10 110 230)">
        <path d="M72 96 h76 l10 228 h-96z" fill={GELB} />
        <rect x="66" y="80" width="88" height="22" rx="6" fill={SCHWARZ} />
        <rect x="76" y="318" width="68" height="36" rx="8" fill={SCHWARZ} />
        <rect x="84" y="150" width="52" height="86" rx="10" fill={PAPIER} />
        <Bluete x={110} y={193} r={19} blatt={ROSA} mitte={ROT} />
      </g>
      {/* Tiegel */}
      <rect x="176" y="222" width="196" height="142" rx="26" fill={ROSA} />
      <rect x="164" y="186" width="220" height="58" rx="18" fill={SCHWARZ} />
      <rect x="204" y="268" width="140" height="66" rx="12" fill={PAPIER} />
      <path d="M244 318 c0 -24 14 -40 36 -40 c0 24 -12 40 -36 40z" fill={GRUEN} />
      <path d="M306 318 c0 -18 -10 -30 -26 -30 c0 18 8 30 26 30z" fill={GRUEN} />
      {/* Funkeln */}
      {[[300, 96, 30, 0], [228, 136, 17, 0.9], [352, 160, 14, 1.6]].map(([x, y, r, d], i) => (
        <path key={i} d={`M${x} ${y - r} q${r * 0.14} ${r * 0.86} ${r} ${r} q${-r * 0.86} ${r * 0.14} ${-r} ${r} q${-r * 0.14} ${-r * 0.86} ${-r} ${-r} q${r * 0.86} ${-r * 0.14} ${r} ${-r}z`} fill={GELB} style={{ animation: `blinken 2.6s ease-in-out ${d}s infinite` }} />
      ))}
    </svg>
  )
}

function Flasche() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Flasche mit Tabletten">
      {/* Flasche */}
      <rect x="150" y="26" width="100" height="56" rx="12" fill={ROT} />
      <rect x="166" y="76" width="68" height="30" fill={GRUEN} />
      <path d="M116 138 c0 -22 16 -38 38 -38 h92 c22 0 38 16 38 38 v196 c0 20 -16 36 -36 36 h-96 c-20 0 -36 -16 -36 -36z" fill={GRUEN} />
      <rect x="116" y="170" width="168" height="130" fill={PAPIER} />
      <rect x="138" y="192" width="78" height="16" rx="8" fill={SCHWARZ} />
      <rect x="138" y="220" width="124" height="10" rx="5" fill={ROSA} />
      <rect x="138" y="240" width="96" height="10" rx="5" fill={ROSA} />
      <circle cx="244" cy="270" r="14" fill={GELB} />
      {/* Tabletten */}
      {[[62, 344, GELB, 0], [96, 316, ROSA, 0.6], [318, 350, ROSA, 0.3], [346, 312, GELB, 0.9], [322, 268, PAPIER, 1.3], [72, 276, PAPIER, 1.7]].map(([x, y, f, d], i) => (
        <g key={i} style={{ animation: `tropfen 3s ease-in-out ${d}s infinite` }}>
          <ellipse cx={x} cy={y} rx="20" ry="12" fill={f} />
        </g>
      ))}
    </svg>
  )
}

const ALLE = { wanne: Wanne, strumpf: Strumpf, tropfen: Tropfen, waage: Waage, tiegel: Tiegel, flasche: Flasche }
export function Zeichnung({ name }) {
  const Z = ALLE[name]
  return Z ? <Z /> : null
}
