import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PeliculaDetallePage() {
    // useParams extrae el parámetro dinámico :id de la URL (/pelicula/:id)
    const { id } = useParams();
    const navigate = useNavigate();

    const [pelicula, setPelicula] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relacionadas, setRelacionadas] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch('/data/peliculas.json');
                if (!res.ok) throw new Error();
                const data = await res.json();
                // Buscar por id (comparación como string y número)
                const encontrada = data.find(p => String(p.id) === String(id));
                setPelicula(encontrada || null);
                // Películas relacionadas: misma saga o género pero sin la actual
                if (encontrada) {
                    const rel = data
                        .filter(p => String(p.id) !== String(id) && p.genre === encontrada.genre)
                        .slice(0, 3);
                    setRelacionadas(rel);
                }
            } catch {
                setPelicula(null);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]);

    const ratingColor = {
        A: '#22c55e',
        B: '#3b82f6',
        B15: '#f59e0b',
        C: '#ef4444',
        TBC: '#8b5cf6',
    };

    if (loading) {
        return (
            <div className="pantalla-unica" style={{ padding: '4rem', textAlign: 'center' }}>
                <p>Cargando película...</p>
            </div>
        );
    }

    if (!pelicula) {
        return (
            <div className="pantalla-unica" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Película no encontrada</h2>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                    No existe una película con el ID <strong>{id}</strong> en nuestra cartelera.
                </p>
                <button
                    type="button"
                    className="btn-cinepolis btn-primary"
                    onClick={() => navigate('/cartelera')}
                >
                    Ver toda la cartelera
                </button>
            </div>
        );
    }

    return (
        <div className="pantalla-unica">
            <section className="detalle-pelicula-section">
                {/* Hero banner con poster */}
                <div
                    className="detalle-hero"
                    style={pelicula.imageUrl ? { backgroundImage: `url(${pelicula.imageUrl})` } : undefined}
                >
                    <div className="detalle-hero-overlay">
                        <button
                            type="button"
                            className="detalle-back-btn"
                            onClick={() => navigate(-1)}
                        >
                            ← Regresar
                        </button>
                        <div className="detalle-hero-content">
                            <span className={`tag ${pelicula.tag === 'Estreno' ? 'tag-estreno' : pelicula.tag === 'Muy Pronto' ? 'tag-pronto' : 'tag-cartelera'}`}>
                                {pelicula.tag}
                            </span>
                            <h1 className="detalle-titulo">{pelicula.title}</h1>
                            <div className="detalle-meta">
                                <span
                                    className="rating-badge"
                                    style={{ backgroundColor: ratingColor[pelicula.rating] || '#6b7280' }}
                                >
                                    {pelicula.rating}
                                </span>
                                {pelicula.duration && <span className="detalle-duracion">⏱ {pelicula.duration}</span>}
                                {pelicula.year && <span className="detalle-year">📅 {pelicula.year}</span>}
                                {pelicula.genre && <span className="detalle-genero">🎭 {pelicula.genre}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido detalle */}
                <div className="detalle-body">
                    {pelicula.description && (
                        <div className="detalle-sinopsis">
                            <h2>Sinopsis</h2>
                            <p>{pelicula.description}</p>
                        </div>
                    )}

                    {/* Horarios disponibles */}
                    <div className="detalle-horarios">
                        <h2>Horarios disponibles</h2>
                        <div className="horarios-chips">
                            {['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].map(h => (
                                <button key={h} type="button" className="horario-chip">
                                    {h}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Acción principal */}
                    <div className="detalle-acciones">
                        <button
                            type="button"
                            className="btn-cinepolis btn-primary btn-lg"
                            onClick={() => navigate(`/comprar?pelicula=${encodeURIComponent(pelicula.title)}`)}
                        >
                            🎟 Comprar Boletos
                        </button>
                        <Link to="/cartelera" className="btn-cinepolis">
                            Ver toda la cartelera
                        </Link>
                    </div>

                    {/* Películas relacionadas */}
                    {relacionadas.length > 0 && (
                        <div className="detalle-relacionadas">
                            <h2>También te puede interesar</h2>
                            <div className="relacionadas-grid">
                                {relacionadas.map(r => (
                                    <Link to={`/pelicula/${r.id}`} key={r.id} className="relacionada-card">
                                        <div
                                            className="relacionada-poster"
                                            style={r.imageUrl ? { backgroundImage: `url(${r.imageUrl})` } : undefined}
                                        >
                                            {!r.imageUrl && <span>Poster</span>}
                                        </div>
                                        <p className="relacionada-title">{r.title}</p>
                                        <span className="relacionada-genre">{r.genre}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default PeliculaDetallePage;
