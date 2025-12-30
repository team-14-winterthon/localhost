import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { HashRouter } from 'react-router-dom'
import './styles/index.css'
import App from './app/App.tsx'

defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
