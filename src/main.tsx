import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Use Vite's BASE_URL (set from `vite.config.ts` base) as the router basename.
// `import.meta.env.BASE_URL` is '/' by default or '/my-app/' when building for GitHub Pages.
const rawBase = import.meta.env.BASE_URL || '/'
// BrowserRouter expects a basename without a trailing slash (except root '/').
const basename = rawBase === '/' ? undefined : rawBase.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
