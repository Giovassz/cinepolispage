import React from 'react';

function SobreNosotrosPage() {
  return (
    <div className="main-cinepolis" style={{ minHeight: '60vh', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#0d2137', fontWeight: 800, marginBottom: '1.5rem', fontSize: '2.5rem' }}>Sobre Nosotros</h1>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: '#374151', lineHeight: '1.8', fontSize: '1.05rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>Cinépolis®</strong> es una empresa mexicana fundada en Morelia, Michoacán en 1971. Hoy en día nos mantenemos como la cuarta cadena a nivel mundial, con más de 800 complejos de cines a nivel global, siempre con el objetivo de brindar la mejor experiencia.
        </p>
        <h2 style={{ color: '#2563eb', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Misión</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Ser la mejor opción de entretenimiento, fortaleciendo nuestro liderazgo en la industria cinematográfica a nivel internacional, ofreciendo diversión, innovación y un servicio estelar a todos nuestros invitados.
        </p>
        <h2 style={{ color: '#2563eb', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Visión</h2>
        <p>
          Iluminar la película de la vida de nuestros clientes con sonrisas y momentos inolvidables.
        </p>
      </div>
    </div>
  );
}

export default SobreNosotrosPage;
