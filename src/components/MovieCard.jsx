import { useState } from 'react';
import Button from './Button.jsx';

/**
 * MovieCard - Componente reutilizable para mostrar información de una película
 * 
 * PROPS: Las props permiten pasar datos y funciones desde el componente padre (App).
 * - Props de datos: id, title, genre, etc. → información a mostrar
 * - Props de callbacks: onToggleFavorite, onSelect → funciones para comunicar cambios al padre
 * - Props de estado: isFavorite, isSelected → estado visual controlado por el padre
 * 
 * Este componente es reutilizable: se puede usar múltiples veces con diferentes props.
 */
function MovieCard({ 
  id, 
  title, 
  genre, 
  year, 
  rating = 'B', 
  duration = '98 min', 
  tag = 'En Cartelera', 
  imageUrl,
  description,
  isFavorite = false,
  onToggleFavorite,
  isSelected = false,
  onSelect
}) {
  // useState local para manejar el estado de visibilidad de la descripción
  // Este estado es interno al componente y no afecta al padre
  const [showDescription, setShowDescription] = useState(false);

  const handleVerSinopsis = () => {
    setShowDescription(!showDescription);
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const ratingClass = {
    A: 'rating-a',
    B: 'rating-b',
    B15: 'rating-b15',
    C: 'rating-c',
    TBC: 'rating-tbc',
  }[rating] || 'rating-b';

  return (
    <article className={`movie-card-cinepolis ${isSelected ? 'movie-selected' : ''}`}>
      <div className="movie-poster" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}>
        {!imageUrl && <span className="poster-placeholder">Poster</span>}
        <button
          type="button"
          className={`movie-favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="movie-meta">
        <span className={`rating-badge ${ratingClass}`}>{rating}</span>
        <span className="duration">{duration}</span>
      </div>
      <h3 className="movie-title">{title}</h3>
      <button type="button" className="link-sinopsis" onClick={handleVerSinopsis}>
        {showDescription ? 'Ocultar sinopsis' : 'Ver sinopsis'}
      </button>
      {showDescription && description && (
        <div className="movie-description">
          <p>{description}</p>
        </div>
      )}
      <div className="movie-tags">
        <span className={`tag ${
          tag === 'Estreno' ? 'tag-estreno' :
          tag === 'Muy Pronto' ? 'tag-pronto' : 'tag-cartelera'
        }`}>
          {tag}
        </span>
      </div>
      <div className="movie-actions">
        <Button label="Ver detalles" onClick={handleVerSinopsis} />
        {/* CustomEvent se utiliza para comunicación entre componentes sin prop drilling.
            El evento 'comprarBoletos' es escuchado por App.jsx mediante useEffect */}
        <Button label="Comprar boletos" onClick={() => window.dispatchEvent(new CustomEvent('comprarBoletos', { detail: { id, title } }))} />
        {onSelect && (
          <button
            type="button"
            className={`btn-seleccionar ${isSelected ? 'seleccionado' : ''}`}
            onClick={handleSelect}
          >
            {isSelected ? '✓ Seleccionada' : 'Seleccionar'}
          </button>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
