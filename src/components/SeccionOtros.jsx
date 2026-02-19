const otrosItems = [
  {
    id: 'promociones',
    title: 'Promociones',
    description: 'Días de 2x1, precios especiales en dulcería y combos para que disfrutes más por menos. Revisa las promociones vigentes en tu cine.',
    imageUrl: '/images/promos/promo.png',
  },
  {
    id: 'membresias',
    title: 'Membresías',
    description: 'Cinépolis Plus y otros programas de lealtad: acumula puntos, obtén beneficios exclusivos y descuentos en boletos y alimentos.',
    imageUrl: '/images/promos/membresias.jpg',
  },
  {
    id: 'preventas',
    title: 'Preventas',
    description: 'Sé el primero en asegurar tu lugar para los estrenos más esperados. Compra tus boletos con anticipación y elige tu butaca.',
    imageUrl: '/images/promos/preventa.jpg',
  },
  {
    id: 'formatos',
    title: 'Formatos especiales',
    description: '4DX, Macro XE, Sala de Arte y más. Vive el cine en pantallas IMAX, sonido envolvente y experiencias inmersivas.',
    imageUrl: '/images/promos/formatoespeciales.png',
  },
];

function SeccionOtros() {
  return (
    <section id="promos" className="section-otros">
      <h2 className="section-title">Promos y más</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem' }}>
        Promociones, membresías, preventas y formatos de sala para que aproveches al máximo tu visita.
      </p>
      <div className="otros-grid">
        {otrosItems.map((item) => (
          <article key={item.id} className="otros-card">
            <div
              className="otros-card-img-wrap"
              style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SeccionOtros;
