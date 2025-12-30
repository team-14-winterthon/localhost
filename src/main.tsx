import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { HashRouter } from 'react-router-dom'
import { queryClient } from './shared/api/queryClient'
import './styles/index.css'
import App from './app/App.tsx'

defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>,
)
