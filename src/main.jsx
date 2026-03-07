import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * BrowserRouter: Provee el contexto de enrutamiento a toda la aplicación.
 * Debe envolver el componente raíz para que React Router pueda funcionar.
 * Usa la History API del navegador (sin hash en la URL) para SPA real.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
