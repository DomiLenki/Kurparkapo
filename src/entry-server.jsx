import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/* Baut die Seite einmal als fertiges HTML (für schnellen Start, Suchmaschinen und Geräte ohne JavaScript) */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
