import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,107,157,0.2)',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '600',
          },
          duration: 3000,
        }}
      />
    </HelmetProvider>
  </StrictMode>,
)
