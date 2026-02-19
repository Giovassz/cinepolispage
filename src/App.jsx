import { useState } from 'react';
import Header from './components/Header.jsx';
import HeroCarousel from './components/HeroCarousel.jsx';
import MovieCard from './components/MovieCard.jsx';
import AlimentosSeccion from './components/AlimentosSeccion.jsx';
import SeccionOtros from './components/SeccionOtros.jsx';
import Footer from './components/Footer.jsx';
import Button from './components/Button.jsx';
import IconLocation from './components/IconLocation.jsx';

const peliculas = [
  { id: 1, title: 'El Día Del Fin Del Mundo: Migración', genre: 'Ciencia ficción', year: 2024, rating: 'B', duration: '98 min', tag: 'Estreno', imageUrl: '/images/posters/ps1.jpg' },
  { id: 2, title: '¡Ayuda!', genre: 'Comedia', year: 2024, rating: 'B15', duration: '113 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps2.jpg' },
  { id: 3, title: 'Aún Es De Noche En Caracas', genre: 'Drama', year: 2024, rating: 'B15', duration: '96 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps3.jpg' },
  { id: 4, title: 'Hamnet', genre: 'Drama', year: 2024, rating: 'B', duration: '126 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps4.jpg' },
  { id: 5, title: 'Arco', genre: 'Drama', year: 2024, rating: 'A', duration: '88 min', tag: 'Estreno', imageUrl: '/images/posters/ps5.jpg' },
  { id: 6, title: 'Duna: Parte dos', genre: 'Ciencia ficción', year: 2024, rating: 'B15', duration: '166 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps6.jpg' },
  { id: 7, title: 'La Cabra Que Cambió El Juego Goat', genre: 'Comedia', year: 2024, rating: 'TBC', duration: '100 min', tag: 'Muy Pronto', imageUrl: '/images/posters/ps7.jpg' },
  { id: 8, title: 'Pecadores', genre: 'Drama', year: 2024, rating: 'B15', duration: '137 min', tag: 'Estreno', imageUrl: '/images/posters/ps8.jpg' },
  { id: 9, title: 'Valor Sentimental', genre: 'Drama', year: 2024, rating: 'B', duration: '135 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps9.jpg' },
  { id: 10, title: 'El Sonido De La Muerte', genre: 'Terror', year: 2024, rating: 'C', duration: '101 min', tag: 'Estreno', imageUrl: '/images/posters/ps10.jpg' },
];

const PANTALLA = { INICIO: 'inicio', ALIMENTOS: 'alimentos', PROMOS: 'promos' };

function App() {
  const [tabActivo, setTabActivo] = useState('cartelera');
  const [pantalla, setPantalla] = useState(PANTALLA.INICIO);

  return (
    <div className="app-cinepolis">
      <Header pantalla={pantalla} onNavigate={setPantalla} />
      {pantalla === PANTALLA.INICIO && (
        <>
          <HeroCarousel />
          <main id="peliculas" className="main-cinepolis">
            <div className="tabs-cinepolis">
              <button
                type="button"
                className={`tab ${tabActivo === 'cartelera' ? 'tab-active' : ''}`}
                onClick={() => setTabActivo('cartelera')}
              >
                Cartelera
              </button>
              <button
                type="button"
                className={`tab ${tabActivo === 'horarios' ? 'tab-active' : ''}`}
                onClick={() => setTabActivo('horarios')}
              >
                Horarios
              </button>
            </div>
            <div className="selector-cine">
              <div className="selector-cine-icon">
                <IconLocation />
              </div>
              <div className="selector-cine-label-wrap">
                <span className="label">Cines</span>
                <input type="text" className="input-cine" placeholder="Elige tu cine" readOnly />
              </div>
            </div>
            {tabActivo === 'cartelera' && (
              <section className="movie-grid-cinepolis">
                {peliculas.map((p) => (
                  <MovieCard
                    key={p.id}
                    title={p.title}
                    genre={p.genre}
                    year={p.year}
                    rating={p.rating}
                    duration={p.duration}
                    tag={p.tag}
                    imageUrl={p.imageUrl}
                  />
                ))}
              </section>
            )}
            {tabActivo === 'horarios' && (
              <p className="horarios-placeholder">Selecciona un cine para ver horarios.</p>
            )}
          </main>
        </>
      )}
      {pantalla === PANTALLA.ALIMENTOS && (
        <div className="pantalla-unica">
          <AlimentosSeccion />
        </div>
      )}
      {pantalla === PANTALLA.PROMOS && (
        <div className="pantalla-unica">
          <SeccionOtros />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
