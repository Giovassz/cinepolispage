import { useState } from 'react';

const categoriasAlimentos = {
  bebidas: [
    { id: 1, name: 'Refresco', detail: '500 ml', imageUrl: '/images/alimentos/bebidas1.jpg' },
    { id: 2, name: 'Agua natural', detail: '600 ml', imageUrl: '/images/alimentos/agua.jpg' },
    { id: 3, name: 'Café', detail: 'Caliente o frío', imageUrl: '/images/alimentos/cafe.jpg' },
  ],
  comestibles: [
    { id: 1, name: 'Hot dog', detail: 'Con papas', imageUrl: '/images/alimentos/hotdog.webp' },
    { id: 2, name: 'Nachos', detail: 'Con queso y jalapeño', imageUrl: '/images/alimentos/nacho.jpg' },
    { id: 3, name: 'Pizza slice', detail: 'Pepperoni o hawaiana', imageUrl: '/images/alimentos/pizzas.jpg' },
  ],
  snacks: [
    { id: 1, name: 'Palomitas medianas', detail: 'Sal o mantequilla', imageUrl: '/images/alimentos/palomitaschicas.jpg' },
    { id: 2, name: 'Palomitas grandes', detail: 'Caramelo o natural', imageUrl: '/images/alimentos/palomitasgrandes.jpg' },
    { id: 3, name: 'Dulces', detail: 'Variedad en dulcería', imageUrl: '/images/alimentos/dulces.jpg' },
  ],
};

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

function AlimentosSeccion() {
  const [mockScreen, setMockScreen] = useState(null);
  const [alimentosSeleccionados, setAlimentosSeleccionados] = useState([]);

  const handleMenuClick = (menu) => {
    setMockScreen(menu);
  };

  const closeMock = () => setMockScreen(null);

  const toggleAlimento = (categoria, itemId) => {
    const key = `${categoria}-${itemId}`;
    setAlimentosSeleccionados(prev => {
      if (prev.includes(key)) {
        return prev.filter(id => id !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const getAlimentoKey = (categoria, itemId) => `${categoria}-${itemId}`;

  return (
    <>
      <section id="alimentos" className="section-alimentos promos-alimentos">
        <h2 className="section-title">Alimentos</h2>

        {alimentosSeleccionados.length > 0 && (
          <div className="alimentos-seleccionados-info">
            <p>Alimentos seleccionados: <strong>{alimentosSeleccionados.length}</strong></p>
          </div>
        )}
        <div className="alimentos-categorias">
          <h3 className="alimentos-categoria-title">Bebidas</h3>
          <div className="alimentos-categorias-grid">
            {categoriasAlimentos.bebidas.map((item) => {
              const key = getAlimentoKey('bebidas', item.id);
              const isSelected = alimentosSeleccionados.includes(key);
              return (
                <div 
                  key={`b-${item.id}`} 
                  className={`alimento-item ${isSelected ? 'alimento-seleccionado' : ''}`}
                  onClick={() => toggleAlimento('bebidas', item.id)}
                >
                  {item.imageUrl && (
                    <div className="alimento-item-img" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                  )}
                  <p className="alimento-item-name">{item.name}</p>
                  <p className="alimento-item-detail">{item.detail}</p>
                  {isSelected && <span className="alimento-check">✓</span>}
                </div>
              );
            })}
          </div>

          <h3 className="alimentos-categoria-title">Comestibles</h3>
          <div className="alimentos-categorias-grid">
            {categoriasAlimentos.comestibles.map((item) => {
              const key = getAlimentoKey('comestibles', item.id);
              const isSelected = alimentosSeleccionados.includes(key);
              return (
                <div 
                  key={`c-${item.id}`} 
                  className={`alimento-item ${isSelected ? 'alimento-seleccionado' : ''}`}
                  onClick={() => toggleAlimento('comestibles', item.id)}
                >
                  {item.imageUrl && (
                    <div className="alimento-item-img" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                  )}
                  <p className="alimento-item-name">{item.name}</p>
                  <p className="alimento-item-detail">{item.detail}</p>
                  {isSelected && <span className="alimento-check">✓</span>}
                </div>
              );
            })}
          </div>

          <h3 className="alimentos-categoria-title">Snacks y dulces</h3>
          <div className="alimentos-categorias-grid">
            {categoriasAlimentos.snacks.map((item) => {
              const key = getAlimentoKey('snacks', item.id);
              const isSelected = alimentosSeleccionados.includes(key);
              return (
                <div 
                  key={`s-${item.id}`} 
                  className={`alimento-item ${isSelected ? 'alimento-seleccionado' : ''}`}
                  onClick={() => toggleAlimento('snacks', item.id)}
                >
                  {item.imageUrl && (
                    <div className="alimento-item-img" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                  )}
                  <p className="alimento-item-name">{item.name}</p>
                  <p className="alimento-item-detail">{item.detail}</p>
                  {isSelected && <span className="alimento-check">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="alimentos-menus-title">Menús completos</h3>
        <div className="promos-inner">
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

export default AlimentosSeccion;
