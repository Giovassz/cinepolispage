import Button from './Button.jsx';

function MovieCard({ title, genre, year, rating = 'B', duration = '98 min', tag = 'En Cartelera', imageUrl }) {
  const handleVerSinopsis = () => {
    alert(title);
  };

  const ratingClass = {
    A: 'rating-a',
    B: 'rating-b',
    B15: 'rating-b15',
    C: 'rating-c',
    TBC: 'rating-tbc',
  }[rating] || 'rating-b';

  return (
    <article className="movie-card-cinepolis">
      <div className="movie-poster" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}>
        {!imageUrl && <span className="poster-placeholder">Poster</span>}
      </div>
      <div className="movie-meta">
        <span className={`rating-badge ${ratingClass}`}>{rating}</span>
        <span className="duration">{duration}</span>
      </div>
      <h3 className="movie-title">{title}</h3>
      <button type="button" className="link-sinopsis" onClick={handleVerSinopsis}>
        Ver sinopsis
      </button>
      <div className="movie-tags">
        <span className={`tag ${
          tag === 'Estreno' ? 'tag-estreno' :
          tag === 'Muy Pronto' ? 'tag-pronto' : 'tag-cartelera'
        }`}>
          {tag}
        </span>
      </div>
      <Button label="Ver detalles" onClick={handleVerSinopsis} />
    </article>
  );
}

export default MovieCard;
