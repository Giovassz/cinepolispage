import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HeroCarousel from './components/HeroCarousel.jsx';
import MovieCard from './components/MovieCard.jsx';
import AlimentosSeccion from './components/AlimentosSeccion.jsx';
import SeccionOtros from './components/SeccionOtros.jsx';
import Footer from './components/Footer.jsx';
import Button from './components/Button.jsx';
import IconLocation from './components/IconLocation.jsx';

const PANTALLA = { INICIO: 'inicio', ALIMENTOS: 'alimentos', PROMOS: 'promos', COMPRA: 'compra' };

/**
 * 🔄 FLUJO REACT: Evento → Estado → Re-renderizado
 * 
 * Este componente demuestra el ciclo de vida de React:
 * 
 * 1. EVENTO: El usuario interactúa con la UI (onClick, onChange, onSubmit)
 * 2. HANDLER: Se ejecuta una función handler que actualiza el estado con setState
 * 3. RE-RENDER: React detecta el cambio de estado y re-renderiza automáticamente
 * 4. UI ACTUALIZADA: La interfaz refleja el nuevo estado
 * 
 * Ejemplo práctico:
 * - Usuario hace clic en "Comprar boletos" → onClick dispara setPantalla('compra')
 * - React detecta cambio en 'pantalla' → re-renderiza mostrando el formulario
 * - Usuario escribe en input → onChange actualiza formData → input muestra el valor
 */
function App() {
  // ========== ESTADOS CON useState ==========
  // useState se utiliza para manejar el estado local del componente.
  // Cada estado representa una pieza de información que puede cambiar y afectar el renderizado.
  
  const [tabActivo, setTabActivo] = useState('cartelera'); // Controla qué tab está visible (Cartelera/Horarios)
  const [pantalla, setPantalla] = useState(PANTALLA.INICIO); // Controla qué pantalla mostrar (inicio/alimentos/promos/compra)
  const [favoritos, setFavoritos] = useState([]); // Array de IDs de películas marcadas como favoritas
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null); // Película seleccionada para compra
  const [showConfirmacion, setShowConfirmacion] = useState(false); // Controla visibilidad del modal de confirmación
  const [compraData, setCompraData] = useState(null); // Datos de la compra realizada (para mostrar en resumen)
  const [promociones, setPromociones] = useState([]); // Array de promociones cargadas dinámicamente desde API
  const [loadingPromos, setLoadingPromos] = useState(false); // Estado de carga de promociones
  const [errorPromos, setErrorPromos] = useState(null); // Mensaje de error si falla la carga de promociones
  const [peliculasSeleccionadas, setPeliculasSeleccionadas] = useState([]); // Array de IDs de películas seleccionadas
  const [peliculas, setPeliculas] = useState([]); // Array de películas cargadas desde JSON
  const [loadingPeliculas, setLoadingPeliculas] = useState(true); // Estado de carga de películas
  
  // Formulario de compra de boletos - objeto de estado para manejar múltiples campos
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cantidad: '1',
    pelicula: '',
    horario: ''
  });

  // Estados para validación del formulario
  const [errors, setErrors] = useState({});

  // ========== useEffect PARA CARGAR PELÍCULAS DESDE JSON ==========
  // useEffect se utiliza para ejecutar efectos secundarios (como cargar datos) cuando el componente se monta.
  // El array de dependencias vacío [] asegura que solo se ejecute una vez al montar el componente.
  useEffect(() => {
    const cargarPeliculas = async () => {
      setLoadingPeliculas(true);
      try {
        const response = await fetch('/data/peliculas.json');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setPeliculas(data);
      } catch (error) {
        console.error('Error al cargar películas:', error);
        // Fallback: usar array vacío si falla la carga
        setPeliculas([]);
      } finally {
        setLoadingPeliculas(false);
      }
    };

    cargarPeliculas();
  }, []);

  // ========== useEffect PARA ESCUCHAR EVENTOS PERSONALIZADOS ==========
  // CustomEvent se utiliza para comunicación entre componentes sin prop drilling.
  // MovieCard dispara un evento 'comprarBoletos' que este componente escucha.
  // El cleanup function (return) elimina el listener cuando el componente se desmonta para evitar memory leaks.
  useEffect(() => {
    const handleComprarBoletos = (e) => {
      // 🔄 FLUJO: Evento → Buscar película → Actualizar estado → Re-render
      const pelicula = peliculas.find(p => p.id === e.detail.id);
      if (pelicula) {
        handleSeleccionarPeliculaParaCompra(pelicula);
      }
    };

    window.addEventListener('comprarBoletos', handleComprarBoletos);
    // Cleanup: remover el listener al desmontar el componente
    return () => window.removeEventListener('comprarBoletos', handleComprarBoletos);
  }, [peliculas]); // Dependencia: peliculas debe estar disponible

  // ========== useEffect PARA CARGAR PROMOCIONES CON MANEJO DE ERRORES ==========
  // useEffect se utiliza para consumir datos externos mediante fetch.
  // Incluye manejo robusto de errores con estado de error y mensajes al usuario.
  useEffect(() => {
    const cargarPromociones = async () => {
      setLoadingPromos(true);
      setErrorPromos(null); // Limpiar errores previos
      try {
        // Usando JSONPlaceholder como ejemplo de API pública
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - No se pudieron cargar las promociones`);
        }
        
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
        // Estado de error para mostrar mensaje al usuario
        setErrorPromos('No se pudieron cargar las promociones. Por favor, intenta más tarde.');
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

  // ========== HANDLERS - FLUJO: Evento → Estado → Re-render ==========

  /**
   * 🔄 FLUJO: onClick en favorito → handleToggleFavorite → setFavoritos → Re-render
   * Maneja el toggle de favoritos usando inmutabilidad (no muta el array directamente).
   */
  const handleToggleFavorite = (movieId) => {
    setFavoritos(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId); // Remover: nuevo array sin el ID
      } else {
        return [...prev, movieId]; // Agregar: nuevo array con el ID agregado
      }
    });
    // React detecta el cambio y re-renderiza MovieCard con el nuevo estado isFavorite
  };

  /**
   * 🔄 FLUJO: CustomEvent 'comprarBoletos' → handleSeleccionarPeliculaParaCompra → Actualiza múltiples estados → Re-render
   * Actualiza el estado de película seleccionada y cambia la pantalla a compra.
   */
  const handleSeleccionarPeliculaParaCompra = (pelicula) => {
    setPeliculaSeleccionada(pelicula); // Estado: película seleccionada
    setFormData(prev => ({ ...prev, pelicula: pelicula.title })); // Estado: pre-llenar formulario
    setPantalla(PANTALLA.COMPRA); // Estado: cambiar pantalla → React re-renderiza mostrando formulario
  };

  /**
   * 🔄 FLUJO: onChange en input → handleInputChange → setFormData → Re-render del input
   * Maneja cambios en el formulario controlado, actualizando el estado en tiempo real.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Actualiza solo el campo específico usando spread operator
    }));
    // React re-renderiza el input con el nuevo valor (formulario controlado)
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Validación del formulario
   * Valida email con regex y cantidad mínima antes de enviar.
   */
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validación de email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Por favor ingresa un email válido';
    }
    
    // Validación de cantidad mínima
    const cantidad = parseInt(formData.cantidad, 10);
    if (!cantidad || cantidad < 1) {
      nuevosErrores.cantidad = 'La cantidad debe ser al menos 1';
    }
    if (cantidad > 10) {
      nuevosErrores.cantidad = 'La cantidad máxima es 10';
    }
    
    // Validación de campos requeridos
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    if (!formData.pelicula) {
      nuevosErrores.pelicula = 'Debes seleccionar una película';
    }
    if (!formData.horario) {
      nuevosErrores.horario = 'Debes seleccionar un horario';
    }
    
    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * 🔄 FLUJO: onSubmit → preventDefault → validar → setCompraData → setShowConfirmacion → Re-render con modal
   * Maneja el envío del formulario con validación y muestra confirmación.
   */
  const handleSubmitCompra = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
    
    // Validar antes de enviar
    if (!validarFormulario()) {
      return; // Detener el envío si hay errores
    }
    
    // Actualizar estados: compraData y showConfirmacion
    setCompraData(formData);
    setShowConfirmacion(true);
    // React re-renderiza mostrando el modal de confirmación
    
    // Resetear formulario después de un momento
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        cantidad: '1',
        pelicula: '',
        horario: ''
      });
      setErrors({}); // Limpiar errores
    }, 3000);
  };

  /**
   * 🔄 FLUJO: onClick en cerrar → cerrarConfirmacion → Actualiza estados → Re-render sin modal
   * Cierra el modal de confirmación y regresa a la pantalla inicial.
   */
  const cerrarConfirmacion = () => {
    setShowConfirmacion(false); // Estado: ocultar modal
    setPantalla(PANTALLA.INICIO); // Estado: cambiar pantalla → React re-renderiza mostrando inicio
  };

  /**
   * 🔄 FLUJO: onClick en seleccionar → handleSeleccionarPelicula → setPeliculasSeleccionadas → Re-render con estado visual
   * Maneja la selección múltiple de películas para acciones en lote.
   */
  const handleSeleccionarPelicula = (peliculaId) => {
    setPeliculasSeleccionadas(prev => {
      if (prev.includes(peliculaId)) {
        return prev.filter(id => id !== peliculaId); // Remover selección
      } else {
        return [...prev, peliculaId]; // Agregar selección
      }
    });
    // React re-renderiza MovieCard con el nuevo estado isSelected
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
                    <div className="error-mensaje" style={{ 
                      padding: '1rem', 
                      background: '#fee2e2', 
                      color: '#991b1b', 
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}>
                      <strong>Error:</strong> {errorPromos}
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        Se están mostrando promociones locales como respaldo.
                      </p>
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
                  className={errors.nombre ? 'input-error' : ''}
                />
                {errors.nombre && (
                  <span className="error-mensaje-campo" style={{ 
                    color: '#dc2626', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.nombre}
                  </span>
                )}
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
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && (
                  <span className="error-mensaje-campo" style={{ 
                    color: '#dc2626', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="pelicula">Película</label>
                <select
                  id="pelicula"
                  name="pelicula"
                  value={formData.pelicula}
                  onChange={handleInputChange}
                  required
                  className={errors.pelicula ? 'input-error' : ''}
                >
                  <option value="">Selecciona una película</option>
                  {peliculas.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
                {errors.pelicula && (
                  <span className="error-mensaje-campo" style={{ 
                    color: '#dc2626', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.pelicula}
                  </span>
                )}
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
                  className={errors.cantidad ? 'input-error' : ''}
                />
                {errors.cantidad && (
                  <span className="error-mensaje-campo" style={{ 
                    color: '#dc2626', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.cantidad}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="horario">Horario</label>
                <select
                  id="horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  required
                  className={errors.horario ? 'input-error' : ''}
                >
                  <option value="">Selecciona un horario</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
                {errors.horario && (
                  <span className="error-mensaje-campo" style={{ 
                    color: '#dc2626', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.horario}
                  </span>
                )}
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
