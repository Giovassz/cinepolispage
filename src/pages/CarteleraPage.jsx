import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CarteleraPage() {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroGenero, setFiltroGenero] = useState('Todos');
    const [filtroTag, setFiltroTag] = useState('Todos');

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch('/data/peliculas.json');
                if (!res.ok) throw new Error();
                const data = await res.json();
                setPeliculas(data);
            } catch {
                setPeliculas([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const generos = ['Todos', ...new Set(peliculas.map(p => p.genre).filter(Boolean))];
    const tags = ['Todos', ...new Set(peliculas.map(p => p.tag).filter(Boolean))];

    const peliculasFiltradas = peliculas.filter(p => {
        const matchBusqueda = p.title?.toLowerCase().includes(busqueda.toLowerCase());
        const matchGenero = filtroGenero === 'Todos' || p.genre === filtroGenero;
        const matchTag = filtroTag === 'Todos' || p.tag === filtroTag;
        return matchBusqueda && matchGenero && matchTag;
    });

    return (
        <div className="pantalla-unica">
            <section className="cartelera-page-section">
                <h2 className="section-title">Cartelera</h2>
                <p className="section-subtitle">Todas las películas disponibles hoy en Cinépolis</p>

                {/* Filtros */}
                <div className="cartelera-filtros">
                    <input
                        type="text"
                        className="input-busqueda"
                        placeholder="🔍  Buscar película..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                    <select
                        className="filtro-select"
                        value={filtroGenero}
                        onChange={e => setFiltroGenero(e.target.value)}
                    >
                        {generos.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <select
                        className="filtro-select"
                        value={filtroTag}
                        onChange={e => setFiltroTag(e.target.value)}
                    >
                        {tags.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', padding: '3rem' }}>Cargando películas...</p>
                ) : peliculasFiltradas.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                        No se encontraron películas con esos filtros.
                    </p>
                ) : (
                    <>
                        <p className="resultado-count">{peliculasFiltradas.length} película(s) encontrada(s)</p>
                        <div className="cartelera-lista">
                            {peliculasFiltradas.map(p => (
                                <Link
                                    to={`/pelicula/${p.id}`}
                                    key={p.id}
                                    className="cartelera-item"
                                >
                                    <div
                                        className="cartelera-item-poster"
                                        style={p.imageUrl ? { backgroundImage: `url(${p.imageUrl})` } : undefined}
                                    >
                                        {!p.imageUrl && <span className="poster-placeholder">Poster</span>}
                                        <span className={`tag ${p.tag === 'Estreno' ? 'tag-estreno' : p.tag === 'Muy Pronto' ? 'tag-pronto' : 'tag-cartelera'}`}>
                                            {p.tag}
                                        </span>
                                    </div>
                                    <div className="cartelera-item-info">
                                        <h3 className="cartelera-item-title">{p.title}</h3>
                                        <div className="cartelera-item-meta">
                                            <span className={`rating-badge rating-${p.rating?.toLowerCase()}`}>{p.rating}</span>
                                            <span className="duration">{p.duration}</span>
                                            {p.genre && <span className="genero-badge">{p.genre}</span>}
                                            {p.year && <span className="year-badge">{p.year}</span>}
                                        </div>
                                        {p.description && (
                                            <p className="cartelera-item-desc">{p.description.substring(0, 120)}...</p>
                                        )}
                                        <span className="ver-detalle-link">Ver detalles →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}

export default CarteleraPage;
