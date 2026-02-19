import { useState } from 'react';

const menus = [
  {
    id: 'vip',
    title: 'Menú VIP',
    description: 'Conoce todos los productos, alimentos y preparaciones especiales que tenemos para tu experiencia VIP.',
    imageUrl: '/images/alimentos/menu-vip.png',
    imageAlt: 'Menú VIP - Palomitas Cinépolis',
  },
  {
    id: 'tradicional',
    title: 'Menú Tradicional',
    description: 'Disfruta de todos los alimentos y bebidas que tanto te encantan para vivir al máximo tu experiencia en nuestras salas.',
    imageUrl: '/images/alimentos/menu-tradicional.png',
    imageAlt: 'Menú Tradicional - Palomitas Cinépolis',
  },
];

function PromosAlimentos() {
  const [mockScreen, setMockScreen] = useState(null);

  const handleMenuClick = (menu) => {
    setMockScreen(menu);
  };

  const closeMock = () => setMockScreen(null);

  return (
    <>
      <section className="promos-alimentos">
        <div className="promos-inner">
          {/* Menú VIP: texto izq, imagen der */}
          <article className="promo-card promo-vip">
            <div className="promo-text">
              <h3>Menú VIP</h3>
              <p>{menus[0].description}</p>
            </div>
            <button
              type="button"
              className="promo-image-wrap"
              onClick={() => handleMenuClick(menus[0])}
              aria-label={`Ver ${menus[0].title}`}
            >
              <div
                className="promo-image promo-image-vip"
                style={menus[0].imageUrl ? { backgroundImage: `url(${menus[0].imageUrl})` } : undefined}
              >
                {!menus[0].imageUrl && (
                  <span className="promo-image-placeholder">Menú VIP</span>
                )}
              </div>
            </button>
          </article>

          {/* Menú Tradicional: imagen izq, texto der */}
          <article className="promo-card promo-tradicional">
            <button
              type="button"
              className="promo-image-wrap"
              onClick={() => handleMenuClick(menus[1])}
              aria-label={`Ver ${menus[1].title}`}
            >
              <div
                className="promo-image promo-image-tradicional"
                style={menus[1].imageUrl ? { backgroundImage: `url(${menus[1].imageUrl})` } : undefined}
              >
                {!menus[1].imageUrl && (
                  <span className="promo-image-placeholder">Menú Tradicional</span>
                )}
              </div>
            </button>
            <div className="promo-text">
              <h3>Menú Tradicional</h3>
              <p>{menus[1].description}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Pantalla mockeada (modal) */}
      {mockScreen && (
        <div className="mock-overlay" onClick={closeMock} role="dialog" aria-modal="true" aria-label="Pantalla mockeada">
          <div className="mock-screen" onClick={(e) => e.stopPropagation()}>
            <h2>{mockScreen.title}</h2>
            <p className="mock-subtitle">Pantalla en construcción (mock)</p>
            <p>Aquí iría el contenido real de {mockScreen.title}.</p>
            <button type="button" className="btn-cinepolis mock-close" onClick={closeMock}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PromosAlimentos;
