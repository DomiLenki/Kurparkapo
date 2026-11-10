import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { apotheke, zeiten, meta, links } from './src/content.js'

/* Angaben für Suchmaschinen (schema.org) – aus denselben Daten wie die Seite */
const tage = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Pharmacy',
  name: `${apotheke.name} ${apotheke.ort}`,
  legalName: apotheke.firma,
  telephone: '+49 8531 2022',
  faxNumber: '+49 8531 980777',
  email: apotheke.email,
  address: { '@type': 'PostalAddress', streetAddress: apotheke.strasse, postalCode: apotheke.plz, addressLocality: apotheke.ort, addressRegion: 'Bayern', addressCountry: 'DE' },
  geo: { '@type': 'GeoCoordinates', latitude: apotheke.breite, longitude: apotheke.laenge },
  openingHoursSpecification: Object.entries(zeiten).flatMap(([wd, spannen]) => spannen.map(([opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${tage[wd]}`, opens, closes }))),
  hasMap: links.karte,
  sameAs: [links.original],
  founder: { '@type': 'Person', name: apotheke.inhaber },
  knowsLanguage: ['de', 'en', 'fr', 'ru'],
  paymentAccepted: 'Bargeld, EC-Karte, Mastercard, Visa',
  currenciesAccepted: 'EUR',
}

const kopf = () => ({
  name: 'kopf',
  transformIndexHtml: (html) => html
    .replaceAll('%TITEL%', meta.titel)
    .replaceAll('%BESCHREIBUNG%', meta.beschreibung)
    .replace('<!--json-ld-->', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`),
})

export default defineConfig(({ mode }) => ({
  base: mode === 'single' ? './' : '/',
  plugins: [react(), kopf(), ...(mode === 'single' ? [viteSingleFile({ useRecommendedBuildConfig: false })] : [])],
  build: mode === 'single'
    ? {
        outDir: 'dist-single',
        assetsDir: '',
        cssCodeSplit: false,
        // Schriften kommen in die Datei, Bilder bleiben eigene Dateien
        assetsInlineLimit: (datei) => /\.woff2?$/.test(datei),
        rollupOptions: { output: { inlineDynamicImports: true } },
      }
    : { assetsInlineLimit: 0 },
}))
