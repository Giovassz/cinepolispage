import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const HERO_HEIGHT = 420;

/**
 * Header con React Router - Navegación funcional usando NavLink y Link.
 *
 * NavLink: Igual que Link pero añade automáticamente la clase 'active'
 * cuando la ruta coincide con el href. Se usa para indicar visualmente
 * la página activa en el menú de navegación.
 *
 * Link: Navega sin recargar la página (SPA navigation).
 *
 * useLocation: Se usa internamente para detectar si estamos en Home
 * y controlar el efecto transparente sobre el hero.
 */
function Header() {
  const navigate = useNavigate();
  const [isOverHero, setIsOverHero] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Detectar si estamos en la ruta raíz para activar el efecto hero
  const isHome = window.location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setIsOverHero(false);
      return;
    }
    const checkScroll = () => {
      setIsOverHero(window.scrollY < HERO_HEIGHT);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isHome]);

  const closeNav = () => setNavOpen(false);

  // Estilo activo para NavLink - añade clase CSS cuando la ruta coincide
  const getNavClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`;

  return (
    <header className={`header-cinepolis ${isOverHero ? 'header-over-hero' : ''}`}>
      <div className="header-inner">
        {/* Logo como Link para navegar al home */}
        <Link to="/" className="logo logo-btn" onClick={closeNav}>
          cinépolis
        </Link>

        {/* Botón hamburguesa para móvil */}
        <button
          type="button"
          className="header-menu-toggle"
          aria-label="Abrir menú"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {navOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>

        {/* Navegación principal con NavLink */}
        <nav className={`nav-main ${navOpen ? 'is-open' : ''}`}>
          {/*
            NavLink verifica automáticamente si la ruta actual coincide.
            end={true} en "/" evita que "/" esté activo en todas las rutas.
          */}
          <NavLink to="/" className={getNavClass} end onClick={closeNav}>
            Películas
          </NavLink>
          <NavLink to="/cartelera" className={getNavClass} onClick={closeNav}>
            Cartelera
          </NavLink>
          <NavLink to="/alimentos" className={getNavClass} onClick={closeNav}>
            Alimentos
          </NavLink>
          <NavLink to="/otros" className={getNavClass} onClick={closeNav}>
            Otros
          </NavLink>
          <NavLink to="/comprar" className={getNavClass} onClick={closeNav}>
            Boletos
          </NavLink>
          <NavLink to="/sobre-nosotros" className={getNavClass} onClick={closeNav}>
            Nosotros
          </NavLink>
          <NavLink to="/servicios" className={getNavClass} onClick={closeNav}>
            Servicios
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Buscar"
            onClick={() => navigate('/cartelera')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button type="button" className="icon-btn" aria-label="Mi cuenta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
      <div className="header-bar" />
    </header>
  );
}

export default Header;
