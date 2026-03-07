import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

function CompraBoletoPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const peliculaPreseleccionada = searchParams.get('pelicula') || '';

    const [peliculas, setPeliculas] = useState([]);
    const [compraData, setCompraData] = useState(null);
    const [showConfirmacion, setShowConfirmacion] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        cantidad: '1',
        pelicula: peliculaPreseleccionada,
        horario: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch('/data/peliculas.json');
                const data = await res.json();
                setPeliculas(data);
            } catch {
                setPeliculas([]);
            }
        };
        cargar();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email))
            nuevosErrores.email = 'Por favor ingresa un email válido';
        const cantidad = parseInt(formData.cantidad, 10);
        if (!cantidad || cantidad < 1)
            nuevosErrores.cantidad = 'La cantidad debe ser al menos 1';
        if (cantidad > 10)
            nuevosErrores.cantidad = 'La cantidad máxima es 10';
        if (!formData.nombre.trim())
            nuevosErrores.nombre = 'El nombre es requerido';
        if (!formData.pelicula)
            nuevosErrores.pelicula = 'Debes seleccionar una película';
        if (!formData.horario)
            nuevosErrores.horario = 'Debes seleccionar un horario';
        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmitCompra = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        setCompraData(formData);
        setShowConfirmacion(true);
        setTimeout(() => {
            setFormData({ nombre: '', email: '', cantidad: '1', pelicula: '', horario: '' });
            setErrors({});
        }, 3000);
    };

    const cerrarConfirmacion = () => {
        setShowConfirmacion(false);
        navigate('/');
    };

    return (
        <div className="pantalla-unica">
            <section className="compra-boletos-section">
                <div style={{ marginBottom: '1.5rem' }}>
                    <Link to="/" className="detalle-back-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'var(--color-primary, #e50914)', fontWeight: 600 }}>
                        ← Regresar al inicio
                    </Link>
                </div>
                <h2 className="section-title">Compra de Boletos</h2>

                <form onSubmit={handleSubmitCompra} className="form-compra">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text" id="nombre" name="nombre"
                            value={formData.nombre} onChange={handleInputChange} required
                            placeholder="Ingresa tu nombre"
                            className={errors.nombre ? 'input-error' : ''}
                        />
                        {errors.nombre && <span className="error-mensaje-campo" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.nombre}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email" id="email" name="email"
                            value={formData.email} onChange={handleInputChange} required
                            placeholder="tu@email.com"
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="error-mensaje-campo" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="pelicula">Película</label>
                        <select
                            id="pelicula" name="pelicula"
                            value={formData.pelicula} onChange={handleInputChange} required
                            className={errors.pelicula ? 'input-error' : ''}
                        >
                            <option value="">Selecciona una película</option>
                            {peliculas.map(p => (
                                <option key={p.id} value={p.title}>{p.title}</option>
                            ))}
                        </select>
                        {errors.pelicula && <span className="error-mensaje-campo" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.pelicula}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cantidad">Cantidad de boletos</label>
                        <input
                            type="number" id="cantidad" name="cantidad"
                            value={formData.cantidad} onChange={handleInputChange}
                            min="1" max="10" required
                            className={errors.cantidad ? 'input-error' : ''}
                        />
                        {errors.cantidad && <span className="error-mensaje-campo" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.cantidad}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="horario">Horario</label>
                        <select
                            id="horario" name="horario"
                            value={formData.horario} onChange={handleInputChange} required
                            className={errors.horario ? 'input-error' : ''}
                        >
                            <option value="">Selecciona un horario</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                        </select>
                        {errors.horario && <span className="error-mensaje-campo" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.horario}</span>}
                    </div>

                    <div className="form-actions">
                        <Button label="Comprar Boletos" variant="primary" />
                        <button type="button" className="btn-cinepolis" onClick={() => navigate(-1)}>
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

            {showConfirmacion && compraData && (
                <div className="confirmacion-overlay" onClick={cerrarConfirmacion}>
                    <div className="confirmacion-modal" onClick={e => e.stopPropagation()}>
                        <h2>¡Compra Confirmada!</h2>
                        <div className="confirmacion-content">
                            <p><strong>Gracias {compraData.nombre}!</strong></p>
                            <p>Tu compra de {compraData.cantidad} boleto(s) para <strong>{compraData.pelicula}</strong> ha sido confirmada.</p>
                            <p>Horario: <strong>{compraData.horario}</strong></p>
                            <p>Te hemos enviado la confirmación a: <strong>{compraData.email}</strong></p>
                        </div>
                        <button type="button" className="btn-cinepolis btn-primary" onClick={cerrarConfirmacion}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompraBoletoPage;
