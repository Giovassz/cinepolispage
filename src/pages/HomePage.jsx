import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel.jsx';
import MovieCard from '../components/MovieCard.jsx';
import IconLocation from '../components/IconLocation.jsx';

function HomePage() {
  const navigate = useNavigate();

  const [tabActivo, setTabActivo] = useState('cartelera');
  const [favoritos, setFavoritos] = useState([]);
  const [peliculasSeleccionadas, setPeliculasSeleccionadas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [loadingPeliculas, setLoadingPeliculas] = useState(true);
  const [promociones, setPromociones] = useState([]);
  const [loadingPromos, setLoadingPromos] = useState(false);
  const [errorPromos, setErrorPromos] = useState(null);

  useEffect(() => {
    const cargarPeliculas = async () => {
      setLoadingPeliculas(true);
      try {
        const response = await fetch('/data/peliculas.json');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setPeliculas(data);
      } catch (error) {
        console.error('Error al cargar películas:', error);
        setPeliculas([]);
      } finally {
        setLoadingPeliculas(false);
      }
    };
    cargarPeliculas();
  }, []);

  useEffect(() => {
    const cargarPromociones = async () => {
      setLoadingPromos(true);
      setErrorPromos(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        const promosTransformadas = data.map((post, index) => ({
          id: post.id,
          titulo: `Promoción Especial ${index + 1}`,
          descripcion: post.body.substring(0, 100) + '...',
          fecha: new Date().toLocaleDateString('es-MX'),
        }));
        setPromociones(promosTransformadas);
      } catch (error) {
        setErrorPromos('No se pudieron cargar las promociones.');
        setPromociones([
          { id: 1, titulo: '2x1 en Martes', descripcion: 'Disfruta de 2x1 en boletos todos los martes del mes.', fecha: '2026-03-07' },
          { id: 2, titulo: 'Combo Familiar', descripcion: 'Ahorra con nuestro combo familiar: 4 boletos + palomitas + 4 refrescos.', fecha: '2026-03-07' },
          { id: 3, titulo: 'Estudiantes', descripcion: 'Descuento especial del 20% presentando credencial de estudiante.', fecha: '2026-03-07' },
        ]);
      } finally {
        setLoadingPromos(false);
      }
    };
    cargarPromociones();
  }, []);

  const handleToggleFavorite = (movieId) => {
    setFavoritos(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  const handleSeleccionarPelicula = (peliculaId) => {
    setPeliculasSeleccionadas(prev =>
      prev.includes(peliculaId) ? prev.filter(id => id !== peliculaId) : [...prev, peliculaId]
    );
  };

  return (
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
          <>
            <div className="acciones-rapidas">
              <button
                type="button"
                className="btn-cinepolis btn-primary"
                onClick={() => navigate('/comprar')}
              >
                Comprar Boletos
              </button>
              {peliculasSeleccionadas.length > 0 && (
                <span className="contador-seleccionadas">
                  {peliculasSeleccionadas.length} película(s) seleccionada(s)
                </span>
              )}
            </div>

            {favoritos.length > 0 && (
              <div className="favoritos-section">
                <h3 className="favoritos-title">Mis Películas Favoritas ({favoritos.length})</h3>
                <div className="favoritos-list">
                  {favoritos.map(favId => {
                    const pelicula = peliculas.find(p => p.id === favId);
                    return pelicula ? (
                      <span key={favId} className="favorito-badge">{pelicula.title}</span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <section className="movie-grid-cinepolis">
              {loadingPeliculas ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                  Cargando películas...
                </p>
              ) : peliculas.length === 0 ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                  No hay películas disponibles en este momento.
                </p>
              ) : (
                peliculas.map((p) => (
                  <MovieCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    genre={p.genre}
                    year={p.year}
                    rating={p.rating}
                    duration={p.duration}
                    tag={p.tag}
                    imageUrl={p.imageUrl}
                    description={p.description}
                    isFavorite={favoritos.includes(p.id)}
                    onToggleFavorite={handleToggleFavorite}
                    isSelected={peliculasSeleccionadas.includes(p.id)}
                    onSelect={handleSeleccionarPelicula}
                  />
                ))
              )}
            </section>
          </>
        )}

        {tabActivo === 'horarios' && (
          <div className="horarios-section">
            <p className="horarios-placeholder">Selecciona un cine para ver horarios.</p>
            <div className="promociones-dinamicas">
              <h3 className="promociones-title">Promociones Disponibles</h3>
              {loadingPromos ? (
                <p>Cargando promociones...</p>
              ) : errorPromos ? (
                <div className="error-mensaje" style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>
                  <strong>Error:</strong> {errorPromos}
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Se están mostrando promociones locales como respaldo.</p>
                </div>
              ) : null}
              {promociones.length > 0 && (
                <div className="promociones-grid">
                  {promociones.map(promo => (
                    <div key={promo.id} className="promocion-card">
                      <h4>{promo.titulo}</h4>
                      <p>{promo.descripcion}</p>
                      <span className="promocion-fecha">{promo.fecha}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default HomePage;
