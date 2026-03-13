import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  return (
    <section className="hero-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;
