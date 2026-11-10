/*
  Schreibt die fertige Seite als HTML in dist/index.html.
  So ist der Inhalt sofort da (schneller Start, Suchmaschinen, Geräte ohne JavaScript);
  das Skript „belebt“ die Seite danach nur noch.
*/
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href)
let html = readFileSync('dist/index.html', 'utf8')
if (!html.includes('<!--inhalt-->')) throw new Error('Platzhalter <!--inhalt--> fehlt in dist/index.html')
html = html.replace('<!--inhalt-->', render())

// Die Schrift früh laden, damit der Text nicht springt
const schrift = readdirSync('dist/assets').find((f) => /albert-sans-latin-wght-normal.*\.woff2$/.test(f))
if (schrift) html = html.replace('</title>', `</title>\n    <link rel="preload" href="/assets/${schrift}" as="font" type="font/woff2" crossorigin />`)
writeFileSync('dist/index.html', html)

// Seite für falsche Adressen
writeFileSync('dist/404.html', `<!doctype html>
<html lang="de"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Seite nicht gefunden · Kurpark-Apotheke Bad Füssing</title><meta name="robots" content="noindex" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#da3222;color:#fff;font:600 1.25rem/1.4 system-ui,sans-serif;text-align:center;padding:2rem}h1{font-size:clamp(2.5rem,9vw,5rem);line-height:1;letter-spacing:-.04em;margin:0 0 1rem}a{display:inline-block;margin-top:2rem;padding:1rem 1.75rem;border-radius:99px;background:#fff;color:#16181d;text-decoration:none}</style></head>
<body><main><h1>Hier ist leider nichts.</h1><p>Die Seite gibt es nicht (mehr).</p><a href="/">Zur Kurpark-Apotheke</a></main></body></html>
`)
rmSync('.ssr', { recursive: true, force: true })
console.log(`vorgerendert: dist/index.html (${Math.round(html.length / 1024)} KB)`)
