import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/albert-sans/wght.css'
import '@fontsource-variable/bodoni-moda/wght.css'
import './index.css'
import App from './App.jsx'

const wurzel = document.getElementById('root')
const baum = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Die fertige Seite ist schon als HTML da (vorgerendert)? Dann nur „beleben“, sonst neu aufbauen.
if (wurzel.firstElementChild) hydrateRoot(wurzel, baum)
else createRoot(wurzel).render(baum)
