/* Die Fotos der Seite in mehreren Größen – der Browser wählt die passende. */
import a720 from './assets/aussen-720.webp'
import a1060 from './assets/aussen-1060.webp'
import a1420 from './assets/aussen-1420.webp'
import a2120 from './assets/aussen-2120.webp'
import aJpg from './assets/aussen-1060.jpg'
import s700 from './assets/schild-700.webp'
import s1220 from './assets/schild-1220.webp'
import sJpg from './assets/schild-700.jpg'
import t260 from './assets/tuer-260.webp'
import t520 from './assets/tuer-520.webp'
import tJpg from './assets/tuer-260.jpg'
import e400 from './assets/eingang-400.webp'
import e640 from './assets/eingang-640.webp'
import eJpg from './assets/eingang-400.jpg'

export const aussen = { srcSet: `${a720} 720w, ${a1060} 1060w, ${a1420} 1420w, ${a2120} 2120w`, src: aJpg, w: 2120, h: 1630 }
export const schild = { srcSet: `${s700} 700w, ${s1220} 1220w`, src: sJpg, w: 1220, h: 900 }
export const tuer = { srcSet: `${t260} 260w, ${t520} 520w`, src: tJpg, w: 520, h: 520 }
export const eingang = { srcSet: `${e400} 400w, ${e640} 640w`, src: eJpg, w: 640, h: 850 }
