# Cinépolis — Plataforma de Cine

Proyecto de una aplicación web que simula la interfaz de una plataforma de cine (estilo Cinépolis). Incluye carrusel de promociones, cartelera de películas, selector de cine, sección de menús (VIP y Tradicional) y footer con enlaces. Desarrollado como base de una plataforma genérica de cine adaptada visualmente.

---

## ¿Qué es este proyecto?

Es una **single-page application (SPA)** que muestra:

- **Header** con logo, navegación (Películas, Alimentos, Promos, Especiales) e iconos de búsqueda y cuenta. Cambia de estilo según el scroll (azul con texto blanco sobre el hero, blanco con texto oscuro al bajar).
- **Carrusel (hero)** con varias diapositivas, flechas, indicadores y botón de compra de boletos.
- **Pestañas** Cartelera y Horarios, y selector **“Elige tu cine”** con icono de ubicación.
- **Cartelera** en grid de tarjetas de películas (poster, rating, duración, título, “Ver sinopsis”, etiquetas y botón “Ver detalles”).
- **Promos de alimentos**: bloques de Menú VIP y Menú Tradicional con imagen y texto; al hacer clic en la imagen se abre una pantalla mockeada (modal).
- **Footer** con columnas de enlaces (Cartelera, Legales, Políticas, ¿Quiénes somos?, Contacto).

Todo el contenido de películas y slides está definido en el código (sin backend). Las imágenes se sirven desde la carpeta `public/images/`.

---

## Tecnologías utilizadas

| Tecnología        | Uso |
|-------------------|-----|
| **React 18**      | Librería para construir la interfaz con componentes reutilizables y estado. |
| **Vite 5**        | Herramienta de desarrollo y empaquetado: servidor rápido, HMR y build de producción. |
| **JavaScript (JSX)** | Sintaxis para escribir componentes React (HTML en JavaScript). |
| **CSS**           | Estilos globales en `index.css` (sin frameworks: sin Tailwind ni Bootstrap). |
| **npm**           | Gestor de paquetes para instalar dependencias y ejecutar scripts. |

### Dependencias principales

- `react` y `react-dom`: núcleo de React.
- `vite`: servidor de desarrollo y build.
- `@vitejs/plugin-react`: integración de React con Vite (JSX, Fast Refresh).

No se usan router, estado global (Redux, etc.) ni librerías de UI; el proyecto se mantiene en React + Vite + CSS.

---

## Cómo ejecutarlo

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Levantar el servidor de desarrollo
npm run dev
```

Luego abre en el navegador la URL que indique la terminal (por ejemplo **http://localhost:5173**).

### Otros comandos

- `npm run build` — Genera la versión optimizada para producción en la carpeta `dist/`.
- `npm run preview` — Sirve la carpeta `dist/` localmente para probar el build.

---

## Estructura del proyecto (resumen)

```
cinepolis/
├── public/images/     # Imágenes (hero, posters, alimentos)
├── src/
│   ├── components/    # Header, MovieCard, Button, Footer, HeroCarousel, etc.
│   ├── App.jsx        # Componente raíz que integra todo
│   ├── main.jsx       # Punto de entrada
│   └── index.css      # Estilos globales
├── index.html
├── package.json
└── vite.config.js
```

Para una explicación detallada de la estructura y el uso de componentes, ver **ESTRUCTURA_Y_COMPONENTES.md**.
