import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ortszeit, statusAm, statusText } from './lib/zeit.js'
import { zeiten, sonderzeiten } from './content.js'

const imBrowser = typeof window !== 'undefined'
/* Wurde die Seite als fertiges HTML ausgeliefert? Dann zeigt der erste Durchlauf dasselbe wie der Server. */
export const vorgerendert = imBrowser && !!document.getElementById('root')?.firstElementChild
export const useIso = imBrowser ? useLayoutEffect : useEffect

/* ---------- Uhr: eine für die ganze Seite ---------- */
const Zeit = createContext(null)

export function Uhr({ children }) {
  const [jetzt, setJetzt] = useState(() => (!imBrowser || vorgerendert ? null : new Date()))
  useEffect(() => {
    const tick = () => setJetzt(new Date())
    tick()
    const id = setInterval(tick, 15000)
    const wach = () => { if (!document.hidden) tick() }
    document.addEventListener('visibilitychange', wach)
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', wach) }
  }, [])
  return <Zeit.Provider value={jetzt}>{children}</Zeit.Provider>
}

/* Liefert null, solange die Uhrzeit noch nicht bekannt ist (Server), sonst Ortszeit + Status + Texte */
export function useStatus() {
  const jetzt = useContext(Zeit)
  if (!jetzt) return null
  const o = ortszeit(jetzt)
  const st = statusAm(o, o.minuten, zeiten, sonderzeiten)
  return { o, st, text: statusText(st) }
}

/* ---------- Einblenden beim Scrollen ---------- */
let io
function beobachter() {
  if (io === undefined) {
    io = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver((treffer) => {
      for (const t of treffer) if (t.isIntersecting) { t.target.dispatchEvent(new CustomEvent('ein')); io.unobserve(t.target) }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.02 })
  }
  return io
}

/* 0 = wartet, 1 = war beim Laden schon im Bild (ohne Bewegung zeigen), 2 = eingeblendet */
export function useEin() {
  const ref = useRef(null)
  const [stand, setStand] = useState(0)
  useIso(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.96 && r.bottom > 0) { setStand(1); return }
    const b = beobachter()
    if (!b) { setStand(1); return }
    const da = () => setStand(2)
    el.addEventListener('ein', da)
    b.observe(el)
    return () => { el.removeEventListener('ein', da); b.unobserve(el) }
  }, [])
  return [ref, stand]
}

export function Ein({ als: Tag = 'div', art = '', i = 0, className = '', style, children, ...rest }) {
  const [ref, stand] = useEin()
  return (
    <Tag ref={ref} data-ein={art} className={`${className}${stand ? ' da' : ''}${stand === 1 ? ' sofort' : ''}`} style={{ '--i': i, ...style }} {...rest}>
      {children}
    </Tag>
  )
}

/* true, sobald das Element einmal im Bild war */
export function useImBild(rand = '0px 0px -12% 0px') {
  const ref = useRef(null)
  const [da, setDa] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setDa(true); return }
    const b = new IntersectionObserver(([t]) => { if (t.isIntersecting) { setDa(true); b.disconnect() } }, { rootMargin: rand })
    b.observe(el)
    return () => b.disconnect()
  }, [rand])
  return [ref, da]
}

/* true, solange das Element im Bild ist (um Dauerbewegungen außerhalb anzuhalten) */
export function useSichtbar() {
  const ref = useRef(null)
  const [an, setAn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setAn(true); return }
    const b = new IntersectionObserver(([t]) => setAn(t.isIntersecting), { rootMargin: '10% 0px' })
    b.observe(el)
    return () => b.disconnect()
  }, [])
  return [ref, an]
}

export function useWenigBewegung() {
  const [wenig, setWenig] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setWenig(m.matches)
    f()
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return wenig
}

/* Zahl, die beim ersten Erscheinen einmal hochzählt (ohne Skript steht sie einfach da) */
export function Zahl({ wert, stellen = 0, className }) {
  const [ref, da] = useImBild()
  const wenig = useWenigBewegung()
  const [z, setZ] = useState(wert)
  const lief = useRef(false)
  useEffect(() => {
    if (!da || lief.current || wenig) return
    lief.current = true
    const t0 = performance.now(), dauer = 1100
    let id
    const schritt = (t) => {
      const p = Math.min(1, (t - t0) / dauer)
      setZ(wert * (1 - Math.pow(1 - p, 4)))
      if (p < 1) id = requestAnimationFrame(schritt)
    }
    setZ(0)
    id = requestAnimationFrame(schritt)
    return () => cancelAnimationFrame(id)
  }, [da, wenig, wert])
  return <span ref={ref} className={className}>{z.toFixed(stellen).replace('.', ',')}</span>
}

/* Link nach draußen: neuer Tab, ohne Rückverweis */
export function Extern({ href, children, ...rest }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
}

/* Meldet der Kopfzeile, dass sich die Farbe eines Kapitels geändert hat */
export const feldWechsel = () => { if (imBrowser) window.dispatchEvent(new Event('feldwechsel')) }
