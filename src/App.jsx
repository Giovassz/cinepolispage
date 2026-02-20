import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HeroCarousel from './components/HeroCarousel.jsx';
import MovieCard from './components/MovieCard.jsx';
import AlimentosSeccion from './components/AlimentosSeccion.jsx';
import SeccionOtros from './components/SeccionOtros.jsx';
import Footer from './components/Footer.jsx';
import Button from './components/Button.jsx';
import IconLocation from './components/IconLocation.jsx';

const peliculas = [
  { id: 1, title: 'El Día Del Fin Del Mundo: Migración', genre: 'Ciencia ficción', year: 2024, rating: 'B', duration: '98 min', tag: 'Estreno', imageUrl: '/images/posters/ps1.jpg', description: 'Una épica aventura sobre la migración masiva de animales que deben encontrar un nuevo hogar mientras enfrentan peligros inimaginables en su viaje.' },
  { id: 2, title: '¡Ayuda!', genre: 'Comedia', year: 2024, rating: 'B15', duration: '113 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps2.jpg', description: 'Una comedia hilarante sobre un grupo de amigos que se encuentran en situaciones cada vez más absurdas mientras intentan ayudar a un compañero en apuros.' },
  { id: 3, title: 'Aún Es De Noche En Caracas', genre: 'Drama', year: 2024, rating: 'B15', duration: '96 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps3.jpg', description: 'Un conmovedor drama que explora la vida nocturna en Caracas, mostrando las historias de personas que buscan esperanza en medio de la oscuridad.' },
  { id: 4, title: 'Hamnet', genre: 'Drama', year: 2024, rating: 'B', duration: '126 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps4.jpg', description: 'Basada en la aclamada novela, esta película cuenta la historia del hijo de William Shakespeare y cómo su pérdida transformó la vida y obra del dramaturgo.' },
  { id: 5, title: 'Arco', genre: 'Drama', year: 2024, rating: 'A', duration: '88 min', tag: 'Estreno', imageUrl: '/images/posters/ps5.jpg', description: 'Un íntimo drama familiar que sigue a una madre y su hijo mientras navegan por las complejidades del amor, la pérdida y la reconciliación.' },
  { id: 6, title: 'Duna: Parte dos', genre: 'Ciencia ficción', year: 2024, rating: 'B15', duration: '166 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps6.jpg', description: 'La continuación épica de la saga de Dune, donde Paul Atreides continúa su viaje para cumplir su destino y liberar a Arrakis de sus opresores.' },
  { id: 7, title: 'La Cabra Que Cambió El Juego Goat', genre: 'Comedia', year: 2024, rating: 'TBC', duration: '100 min', tag: 'Muy Pronto', imageUrl: '/images/posters/ps7.jpg', description: 'Una comedia deportiva sobre una cabra que accidentalmente se convierte en la mascota de un equipo de fútbol y cambia su suerte para siempre.' },
  { id: 8, title: 'Pecadores', genre: 'Drama', year: 2024, rating: 'B15', duration: '137 min', tag: 'Estreno', imageUrl: '/images/posters/ps8.jpg', description: 'Un intenso drama psicológico que explora los límites entre el bien y el mal, la redención y la condena en un mundo moralmente ambiguo.' },
  { id: 9, title: 'Valor Sentimental', genre: 'Drama', year: 2024, rating: 'B', duration: '135 min', tag: 'En Cartelera', imageUrl: '/images/posters/ps9.jpg', description: 'Una historia conmovedora sobre cómo los objetos que guardamos pueden contener recuerdos poderosos y cómo estos definen quiénes somos.' },
  { id: 10, title: 'El Sonido De La Muerte', genre: 'Terror', year: 2024, rating: 'C', duration: '101 min', tag: 'Estreno', imageUrl: '/images/posters/ps10.jpg', description: 'Un thriller de terror psicológico donde los sonidos del pasado regresan para atormentar a quienes intentan escapar de sus secretos más oscuros.' },
];

const PANTALLA = { INICIO: 'inicio', ALIMENTOS: 'alimentos', PROMOS: 'promos', COMPRA: 'compra' };

function App() {
  const [tabActivo, setTabActivo] = useState('cartelera');
  const [pantalla, setPantalla] = useState(PANTALLA.INICIO);
  const [favoritos, setFavoritos] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [compraData, setCompraData] = useState(null);
  const [promociones, setPromociones] = useState([]);
  const [loadingPromos, setLoadingPromos] = useState(false);
  const [peliculasSeleccionadas, setPeliculasSeleccionadas] = useState([]);
  
  // Formulario de compra de boletos
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cantidad: '1',
    pelicula: '',
    horario: ''
  });

  // Escuchar evento de compra de boletos desde MovieCard
  useEffect(() => {
    const handleComprarBoletos = (e) => {
      const pelicula = peliculas.find(p => p.id === e.detail.id);
      if (pelicula) {
        handleSeleccionarPeliculaParaCompra(pelicula);
      }
    };

    window.addEventListener('comprarBoletos', handleComprarBoletos);
    return () => window.removeEventListener('comprarBoletos', handleComprarBoletos);
  }, []);

  // Consumo de datos dinámicos con fetch y useEffect
  useEffect(() => {
    const cargarPromociones = async () => {
      setLoadingPromos(true);
      try {
        // Usando JSONPlaceholder como ejemplo de API pública
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        const data = await response.json();
        // Transformamos los datos de la API a formato de promociones
        const promosTransformadas = data.map((post, index) => ({
          id: post.id,
          titulo: `Promoción Especial ${index + 1}`,
          descripcion: post.body.substring(0, 100) + '...',
          fecha: new Date().toLocaleDateString('es-MX')
        }));
        setPromociones(promosTransformadas);
      } catch (error) {
        console.error('Error al cargar promociones:', error);
        // Fallback: usar datos locales si la API falla
        setPromociones([
          { id: 1, titulo: '2x1 en Martes', descripcion: 'Disfruta de 2x1 en boletos todos los martes del mes.', fecha: '2024-02-20' },
          { id: 2, titulo: 'Combo Familiar', descripcion: 'Ahorra con nuestro combo familiar: 4 boletos + palomitas grandes + 4 refrescos.', fecha: '2024-02-20' },
          { id: 3, titulo: 'Estudiantes', descripcion: 'Descuento especial del 20% presentando credencial de estudiante.', fecha: '2024-02-20' }
        ]);
      } finally {
        setLoadingPromos(false);
      }
    };

    cargarPromociones();
  }, []);

  // Manejar favoritos
  const handleToggleFavorite = (movieId) => {
    setFavoritos(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  // Manejar selección de película para compra
  const handleSeleccionarPeliculaParaCompra = (pelicula) => {
    setPeliculaSeleccionada(pelicula);
    setFormData(prev => ({ ...prev, pelicula: pelicula.title }));
    setPantalla(PANTALLA.COMPRA);
  };

  // Manejar cambios en el formulario (onChange)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario (onSubmit)
  const handleSubmitCompra = (e) => {
    e.preventDefault();
    setCompraData(formData);
    setShowConfirmacion(true);
    // Resetear formulario después de un momento
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        cantidad: '1',
        pelicula: '',
        horario: ''
      });
    }, 3000);
  };

  const cerrarConfirmacion = () => {
    setShowConfirmacion(false);
    setPantalla(PANTALLA.INICIO);
  };

  // Manejar selección activa de películas
  const handleSeleccionarPelicula = (peliculaId) => {
    setPeliculasSeleccionadas(prev => {
      if (prev.includes(peliculaId)) {
        return prev.filter(id => id !== peliculaId);
      } else {
        return [...prev, peliculaId];
      }
    });
  };

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
              <>
                <div className="acciones-rapidas">
                  <button
                    type="button"
                    className="btn-cinepolis btn-primary"
                    onClick={() => setPantalla(PANTALLA.COMPRA)}
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
                  {peliculas.map((p) => (
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
                  ))}
                </section>
              </>
            )}
            {tabActivo === 'horarios' && (
              <div className="horarios-section">
                <p className="horarios-placeholder">Selecciona un cine para ver horarios.</p>
                {promociones.length > 0 && (
                  <div className="promociones-dinamicas">
                    <h3 className="promociones-title">Promociones Disponibles</h3>
                    {loadingPromos ? (
                      <p>Cargando promociones...</p>
                    ) : (
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
                )}
              </div>
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
      {pantalla === PANTALLA.COMPRA && (
        <div className="pantalla-unica">
          <section className="compra-boletos-section">
            <h2 className="section-title">Compra de Boletos</h2>
            <form onSubmit={handleSubmitCompra} className="form-compra">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pelicula">Película</label>
                <select
                  id="pelicula"
                  name="pelicula"
                  value={formData.pelicula}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona una película</option>
                  {peliculas.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="cantidad">Cantidad de boletos</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="horario">Horario</label>
                <select
                  id="horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un horario</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
              <div className="form-actions">
                <Button label="Comprar Boletos" variant="primary" />
                <button
                  type="button"
                  className="btn-cinepolis"
                  onClick={() => setPantalla(PANTALLA.INICIO)}
                >
                  Cancelar
                </button>
              </div>
            </form>
            {compraData && (
              <div className="compra-resumen">
                <h3>Resumen de tu compra:</h3>
                <p><strong>Nombre:</strong> {compraData.nombre}</p>
                <p><strong>Email:</strong> {compraData.email}</p>
                <p><strong>Película:</strong> {compraData.pelicula}</p>
                <p><strong>Cantidad:</strong> {compraData.cantidad}</p>
                <p><strong>Horario:</strong> {compraData.horario}</p>
              </div>
            )}
          </section>
        </div>
      )}
      {showConfirmacion && compraData && (
        <div className="confirmacion-overlay" onClick={cerrarConfirmacion}>
          <div className="confirmacion-modal" onClick={(e) => e.stopPropagation()}>
            <h2>¡Compra Confirmada!</h2>
            <div className="confirmacion-content">
              <p><strong>Gracias {compraData.nombre}!</strong></p>
              <p>Tu compra de {compraData.cantidad} boleto(s) para <strong>{compraData.pelicula}</strong> ha sido confirmada.</p>
              <p>Horario: <strong>{compraData.horario}</strong></p>
              <p>Te hemos enviado la confirmación a: <strong>{compraData.email}</strong></p>
            </div>
            <button
              type="button"
              className="btn-cinepolis btn-primary"
              onClick={cerrarConfirmacion}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
