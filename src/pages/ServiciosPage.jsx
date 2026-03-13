import React from 'react';

function ServiciosPage() {
  return (
    <div className="main-cinepolis" style={{ minHeight: '60vh', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#0d2137', fontWeight: 800, marginBottom: '1.5rem', fontSize: '2.5rem' }}>Nuestros Servicios</h1>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: '#374151', lineHeight: '1.8', fontSize: '1.05rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          En Cinépolis, nos innovamos constantemente para ofrecerte siempre la mejor experiencia. Descubre nuestros distintos formatos y servicios corporativos pensados especialmente para ti, tu familia o tu empresa.
        </p>
        <h2 style={{ color: '#2563eb', marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Ventas Corporativas</h2>
        <p style={{ marginBottom: '2rem' }}>
          Brindamos soluciones integrales para tus eventos de empresa, premieres exclusivas, compra de boletos al por mayor y funciones privadas. Te ayudamos a crear el ambiente perfecto para tus colaboradores o clientes.
        </p>
        <h2 style={{ color: '#2563eb', marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Cinépolis VIP</h2>
        <p style={{ marginBottom: '2rem' }}>
          El formato que transformó la forma de ir al cine, ofreciendo mayor comodidad con butacas completamente reclinables, atención directa y una cartelera exclusiva con alimentos gourmet. ¡Vive el cine como nunca antes!
        </p>
        <h2 style={{ color: '#2563eb', marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1.5rem' }}>4DX</h2>
        <p>
          La tecnología que involucra absolutamente todos tus sentidos. Siente efectos de viento, agua, luz y movimiento sincronizados con la película para lograr la máxima inmersión cinematográfica de principio a fin.
        </p>
      </div>
    </div>
  );
}

export default ServiciosPage;
