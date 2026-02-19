import { useState, useEffect } from 'react';
import Button from './Button.jsx';

const slides = [
  {
    id: 1,
    title: 'Inspirada en la aclamada novela',
    description: 'Un poderoso drama sobre el amor, la pérdida y cómo el dolor puede transformarse en creación.',
    cta: 'Obtener boletos',
    imageUrl: '/images/hero/slide1.jpg',
    posterTitle: 'HAMNET',
    posterSub: 'Momentos abriendo tu corazón',
  },
  {
    id: 2,
    title: 'El Ciclo de Nominadas está aquí',
    description: 'En esta Temporada de Premios, las mejores películas se ven en el cine.',
    cta: 'Comprar Boletos',
    imageUrl: '/images/hero/slide2.jpg',
    posterTitle: 'Nominadas',
    posterSub: '11ª Temporada',
  },
  {
    id: 3,
    title: 'Las historias que te mueven',
    description: 'Descubre lo mejor de la cartelera en tu cine más cercano.',
    cta: 'Obtener boletos',
    imageUrl: '/images/hero/slide3.jpg',
    posterTitle: 'En cines',
    posterSub: 'Sólo en cines',
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goPrev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const goNext = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="hero-carousel">
      <button type="button" className="hero-arrow hero-arrow-left" onClick={goPrev} aria-label="Slide anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button type="button" className="hero-arrow hero-arrow-right" onClick={goNext} aria-label="Slide siguiente">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <div className="hero-slide">
        <div className="hero-slide-inner">
          <div className="hero-poster-area">
            <div
              className={`hero-poster-img ${slide.imageUrl ? 'has-bg' : ''}`}
              style={slide.imageUrl ? { backgroundImage: `url(${slide.imageUrl})` } : undefined}
            >
              <div className="hero-poster-placeholder">
                <span className="hero-poster-title">{slide.posterTitle}</span>
                <span className="hero-poster-sub">{slide.posterSub}</span>
              </div>
            </div>
          </div>
          <div className="hero-text-area">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Button label={slide.cta} onClick={() => alert(slide.cta)} variant="primary" />
          </div>
        </div>
      </div>

      <div className="hero-indicators">
        {slides.map((_, i) => (
          <button
            key={slides[i].id}
            type="button"
            className={`hero-dot ${i === current ? 'hero-dot-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
