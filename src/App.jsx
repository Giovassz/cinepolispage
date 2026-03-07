import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Importación de páginas (vistas principales del sistema de navegación)
import HomePage from './pages/HomePage.jsx';
import CarteleraPage from './pages/CarteleraPage.jsx';
import AlimentosPage from './pages/AlimentosPage.jsx';
import OtrosPage from './pages/OtrosPage.jsx';
import PeliculaDetallePage from './pages/PeliculaDetallePage.jsx';
import CompraBoletoPage from './pages/CompraBoletoPage.jsx';

/**
 * App.jsx - Ahora actúa como el layout raíz + configuración de rutas.
 *
 * Routes: Contenedor de rutas. React Router renderiza solo la primera
 * <Route> que coincida con la URL actual.
 *
 * Route: Define la asociación URL → Componente.
 *   - path="/": Ruta exacta para Home
 *   - path="/cartelera": Lista completa de películas
 *   - path="/alimentos": Sección de dulcería
 *   - path="/otros": Promos, membresías y especiales
 *   - path="/pelicula/:id": Ruta dinámica con parámetro :id
 *   - path="/comprar": Página extra de compra de boletos
 *   - path="*": Catch-all para 404
 */
function App() {
  return (
    <div className="app-cinepolis">
      {/* Header siempre visible en todas las rutas */}
      <Header />

      {/* 
        Zona de contenido: Routes renderiza la página activa según la URL.
        Solo un Route se renderiza a la vez (el primero que coincide).
      */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cartelera" element={<CarteleraPage />} />
        <Route path="/alimentos" element={<AlimentosPage />} />
        <Route path="/otros" element={<OtrosPage />} />
        {/* Ruta dinámica: :id es un parámetro variable que se extrae con useParams() */}
        <Route path="/pelicula/:id" element={<PeliculaDetallePage />} />
        {/* Página adicional: Compra de boletos con soporte para query params */}
        <Route path="/comprar" element={<CompraBoletoPage />} />
        {/* 404 Catch-all */}
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>

      {/* Footer siempre visible en todas las rutas */}
      <Footer />
    </div>
  );
}

/** Página 404 inline para rutas no encontradas */
function PaginaNoEncontrada() {
  return (
    <div className="pantalla-unica" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#e50914', margin: 0 }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Página no encontrada</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        La página que buscas no existe o fue movida.
      </p>
      <a href="/" className="btn-cinepolis btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.75rem 2rem' }}>
        Ir al inicio
      </a>
    </div>
  );
}

export default App;
