/*
  Zeit-Logik der Seite: Uhrzeit in Bad Füssing, Feiertage in Bayern,
  „Haben wir geöffnet?“ und Sonnenstand für das gezeichnete Schaufenster.
  Alles rechnet in der Zeitzone Europe/Berlin – egal, wo das Gerät des Besuchers steht.
*/

export const ZONE = 'Europe/Berlin'
export const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
export const WOCHENTAGE_KURZ = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: ZONE, weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
})
const WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const zwei = (n) => String(n).padStart(2, '0')

/* Datum und Uhrzeit, wie sie gerade in Bad Füssing gelten */
export function ortszeit(date = new Date()) {
  const p = {}
  for (const t of fmt.formatToParts(date)) p[t.type] = t.value
  const y = +p.year, m = +p.month, d = +p.day, h = +p.hour % 24, min = +p.minute
  return { y, m, d, h, min, s: +p.second, wd: WD[p.weekday], minuten: h * 60 + min, key: `${p.year}-${p.month}-${p.day}` }
}

/* Ein Kalendertag (ohne Uhrzeit), mit dem sich gefahrlos rechnen lässt */
export function tag(y, m, d) {
  const dt = new Date(Date.UTC(y, m - 1, d, 12))
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), wd: dt.getUTCDay(), key: `${dt.getUTCFullYear()}-${zwei(dt.getUTCMonth() + 1)}-${zwei(dt.getUTCDate())}` }
}
export const plusTage = (t, n) => tag(t.y, t.m, t.d + n)

/* Ostersonntag (Gauß/Butcher) */
export function ostern(jahr) {
  const a = jahr % 19, b = Math.floor(jahr / 100), c = jahr % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const monat = Math.floor((h + l - 7 * m + 114) / 31), t = ((h + l - 7 * m + 114) % 31) + 1
  return tag(jahr, monat, t)
}

/* Gesetzliche Feiertage in Bayern (Bad Füssing: mit Mariä Himmelfahrt) */
const feiertagsCache = new Map()
export function feiertage(jahr) {
  if (feiertagsCache.has(jahr)) return feiertagsCache.get(jahr)
  const o = ostern(jahr)
  const liste = new Map([
    [tag(jahr, 1, 1).key, 'Neujahr'],
    [tag(jahr, 1, 6).key, 'Heilige Drei Könige'],
    [plusTage(o, -2).key, 'Karfreitag'],
    [o.key, 'Ostersonntag'],
    [plusTage(o, 1).key, 'Ostermontag'],
    [tag(jahr, 5, 1).key, 'Tag der Arbeit'],
    [plusTage(o, 39).key, 'Christi Himmelfahrt'],
    [plusTage(o, 49).key, 'Pfingstsonntag'],
    [plusTage(o, 50).key, 'Pfingstmontag'],
    [plusTage(o, 60).key, 'Fronleichnam'],
    [tag(jahr, 8, 15).key, 'Mariä Himmelfahrt'],
    [tag(jahr, 10, 3).key, 'Tag der Deutschen Einheit'],
    [tag(jahr, 11, 1).key, 'Allerheiligen'],
    [tag(jahr, 12, 25).key, '1. Weihnachtstag'],
    [tag(jahr, 12, 26).key, '2. Weihnachtstag'],
  ])
  feiertagsCache.set(jahr, liste)
  return liste
}
export const feiertagAm = (t) => feiertage(t.y).get(t.key) || null

const inMinuten = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m }

/*
  Öffnungszeiten eines Kalendertags als Liste [von, bis] in Minuten.
  zeiten: { 0..6: [['08:00','18:00'], …] }, sonder: [{ datum:'2026-12-24', zeiten:[['08:00','12:00']], hinweis }]
*/
export function zeitenAm(t, zeiten, sonder = []) {
  const s = sonder.find((x) => x.datum === t.key)
  if (s) return { spannen: (s.zeiten || []).map(([a, b]) => [inMinuten(a), inMinuten(b)]), grund: s.hinweis || 'Sonderöffnungszeit' }
  const f = feiertagAm(t)
  if (f) return { spannen: [], grund: f }
  return { spannen: (zeiten[t.wd] || []).map(([a, b]) => [inMinuten(a), inMinuten(b)]), grund: null }
}

/* Offen oder geschlossen zu einem Zeitpunkt (Kalendertag + Minuten seit Mitternacht) */
export function statusAm(t, minuten, zeiten, sonder = []) {
  const heute = zeitenAm(t, zeiten, sonder)
  const laufend = heute.spannen.find(([a, b]) => minuten >= a && minuten < b)
  if (laufend) {
    return { offen: true, bis: laufend[1], rest: laufend[1] - minuten, grund: heute.grund }
  }
  const spaeter = heute.spannen.find(([a]) => a > minuten)
  if (spaeter) return { offen: false, naechste: { inTagen: 0, tag: t, ab: spaeter[0] }, grund: heute.grund }
  for (let n = 1; n <= 21; n++) {
    const d = plusTage(t, n)
    const z = zeitenAm(d, zeiten, sonder)
    if (z.spannen.length) return { offen: false, naechste: { inTagen: n, tag: d, ab: z.spannen[0][0] }, grund: heute.grund }
  }
  return { offen: false, naechste: null, grund: heute.grund }
}

/* „8 Uhr“, „8:30 Uhr“ */
export function uhr(minuten) {
  const h = Math.floor(minuten / 60), m = minuten % 60
  return m ? `${h}:${zwei(m)} Uhr` : `${h} Uhr`
}
export const hhmm = (minuten) => `${zwei(Math.floor(minuten / 60) % 24)}:${zwei(minuten % 60)}`

export function dauer(minuten) {
  const h = Math.floor(minuten / 60), m = minuten % 60
  if (h && m) return `${h} Std. ${m} Min.`
  if (h) return h === 1 ? '1 Stunde' : `${h} Stunden`
  return m === 1 ? '1 Minute' : `${m} Minuten`
}

/* Wann wieder geöffnet ist, in Worten: „heute um 8 Uhr“, „morgen ab 8 Uhr“, „Montag ab 8 Uhr“ */
export function wannWieder(n) {
  if (!n) return ''
  if (n.inTagen === 0) return `heute um ${uhr(n.ab)}`
  if (n.inTagen === 1) return `morgen ab ${uhr(n.ab)}`
  if (n.inTagen < 7) return `${WOCHENTAGE[n.tag.wd]} ab ${uhr(n.ab)}`
  return `am ${n.tag.d}.${n.tag.m}. ab ${uhr(n.ab)}`
}

/* Texte für die Seite */
export function statusText(st) {
  if (st.offen) {
    const knapp = st.rest <= 30
    return {
      zeile1: 'Jetzt geöffnet',
      zeile2: knapp ? `noch ${dauer(st.rest)}` : `bis ${uhr(st.bis)}`,
      kurz: `Geöffnet bis ${uhr(st.bis)}`,
      satz: knapp ? `Wir haben noch ${dauer(st.rest)} geöffnet, bis ${uhr(st.bis)}.` : `Wir haben geöffnet, heute bis ${uhr(st.bis)}.`,
    }
  }
  const w = wannWieder(st.naechste)
  const feiertag = st.grund && !st.naechste?.inTagen ? '' : st.grund ? ` Heute ist ${st.grund}.` : ''
  if (st.naechste && st.naechste.inTagen === 0) {
    return { zeile1: 'Wir öffnen', zeile2: w, kurz: `Öffnet ${w}`, satz: `Wir öffnen ${w}.` }
  }
  return {
    zeile1: 'Jetzt geschlossen',
    zeile2: w,
    kurz: w ? `Geschlossen, ${w} wieder da` : 'Geschlossen',
    satz: `Wir haben gerade geschlossen.${feiertag}${w ? ` Wir sind ${w} wieder für Sie da.` : ''}`,
  }
}

/* Gruß nach Tageszeit */
export function gruss(h) {
  if (h < 5) return 'Gute Nacht'
  if (h < 11) return 'Guten Morgen'
  if (h < 18) return 'Grüß Gott'
  return 'Guten Abend'
}

/* Abstand der Ortszeit zu UTC in Minuten (60 im Winter, 120 im Sommer) */
export function utcAbstand(t) {
  const mittagUTC = new Date(Date.UTC(t.y, t.m - 1, t.d, 12))
  return ortszeit(mittagUTC).minuten - 12 * 60
}

/* Sonnenauf- und -untergang in Ortszeit (Minuten seit Mitternacht), Formeln der NOAA */
export function sonne(t, breite, laenge) {
  const start = Date.UTC(t.y, 0, 1, 12)
  const n = Math.round((Date.UTC(t.y, t.m - 1, t.d, 12) - start) / 86400000) + 1
  const g = (2 * Math.PI / 365) * (n - 1)
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g))
  const dek = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g)
  const rad = Math.PI / 180
  const cosH = Math.cos(90.833 * rad) / (Math.cos(breite * rad) * Math.cos(dek)) - Math.tan(breite * rad) * Math.tan(dek)
  const H = Math.acos(Math.max(-1, Math.min(1, cosH))) / rad
  const ab = utcAbstand(t)
  return { auf: Math.round(720 - 4 * (laenge + H) - eq + ab), unter: Math.round(720 - 4 * (laenge - H) - eq + ab) }
}

/*
  Himmel zu einer Uhrzeit: phase = 'nacht' | 'daemmerung' | 'tag',
  lauf = 0…1 (Weg der Sonne von Aufgang bis Untergang bzw. des Mondes durch die Nacht)
*/
export function himmel(minuten, so) {
  const D = 35
  if (minuten >= so.auf + D && minuten <= so.unter - D) return { phase: 'tag', lauf: (minuten - so.auf) / (so.unter - so.auf) }
  if (minuten > so.auf - D && minuten < so.auf + D) return { phase: 'daemmerung', lauf: Math.max(0, (minuten - so.auf) / (so.unter - so.auf)), frueh: true }
  if (minuten > so.unter - D && minuten < so.unter + D) return { phase: 'daemmerung', lauf: Math.min(1, (minuten - so.auf) / (so.unter - so.auf)), frueh: false }
  const nacht = 1440 - so.unter + so.auf
  const seit = minuten >= so.unter ? minuten - so.unter : minuten + 1440 - so.unter
  return { phase: 'nacht', lauf: seit / nacht }
}
