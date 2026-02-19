import { useState, useEffect } from 'react';

const HERO_HEIGHT = 420;

function Header({ pantalla = 'inicio', onNavigate }) {
  const [isOverHero, setIsOverHero] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (pantalla !== 'inicio') {
      setIsOverHero(false);
      return;
    }
    const checkScroll = () => {
      setIsOverHero(window.scrollY < HERO_HEIGHT);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [pantalla]);

  const closeNav = () => setNavOpen(false);

  const goTo = (screen) => {
    if (onNavigate) onNavigate(screen);
    closeNav();
  };

  return (
    <header className={`header-cinepolis ${isOverHero ? 'header-over-hero' : ''}`}>
      <div className="header-inner">
        <button type="button" className="logo logo-btn" onClick={() => goTo('inicio')}>cinépolis</button>
        <button
          type="button"
          className="header-menu-toggle"
          aria-label="Abrir menú"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {navOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
        <nav className={`nav-main ${navOpen ? 'is-open' : ''}`}>
          <button type="button" className={`nav-link ${pantalla === 'inicio' ? 'nav-link-active' : ''}`} onClick={() => goTo('inicio')}>Películas</button>
          <button type="button" className={`nav-link ${pantalla === 'alimentos' ? 'nav-link-active' : ''}`} onClick={() => goTo('alimentos')}>Alimentos</button>
          <button type="button" className={`nav-link ${pantalla === 'promos' ? 'nav-link-active' : ''}`} onClick={() => goTo('promos')}>Promos</button>
          <button type="button" className={`nav-link ${pantalla === 'promos' ? 'nav-link-active' : ''}`} onClick={() => goTo('promos')}>Especiales</button>
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-btn" aria-label="Buscar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button type="button" className="icon-btn" aria-label="Mi cuenta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="header-bar"/>
    </header>
  );
}

export default Header;
