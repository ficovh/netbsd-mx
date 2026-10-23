# netbsd.org.mx

Sitio comunitario en español sobre **NetBSD**, con blog estático y una colección curada de referencias al proyecto.

- Sitio: <https://www.netbsd.org.mx/>
- Generador: [Hugo](https://gohugo.io/) (tema propio, sin dependencias externas)
- Despliegue: GitHub Pages mediante GitHub Actions
- Contenido: Markdown

> Este es un sitio independiente. No está afiliado a The NetBSD Foundation ni habla en su nombre. NetBSD® es una marca registrada de The NetBSD Foundation, Inc.

## Estructura

```text
.
├── archetypes/              # Plantillas para contenido nuevo
│   └── blog.md
├── assets/
│   ├── css/main.css         # Estilos del sitio
│   ├── css/chroma.css       # Resaltado de sintaxis
│   └── js/main.js           # Tema claro/oscuro, menú y copiar código
├── content/
│   ├── blog/                # Entradas del blog (Markdown)
│   ├── comunidad.md
│   └── referencias.md
├── data/
│   └── referencias.yaml     # Enlaces de la página de referencias
├── layouts/                 # Plantillas de Hugo
├── static/
│   ├── CNAME                # Dominio personalizado
│   ├── favicon.svg
│   └── img/og.png           # Imagen para redes sociales
├── .github/workflows/       # CI y despliegue
└── hugo.toml                # Configuración del sitio
```

## Desarrollo local

Necesitas **Hugo extended 0.168 o superior** y Git.

```sh
hugo version
hugo server -D
```

Abre <http://localhost:1313/>. La opción `-D` incluye borradores.

Para compilar la versión final:

```sh
hugo --minify
```

El resultado queda en `public/`, que está ignorado por Git.

## Escribir una entrada

Crea el archivo con el arquetipo incluido:

```sh
hugo new content blog/mi-articulo.md
```

Edita el archivo generado. El *front matter* usa TOML:

```toml
+++
title = "Título de la entrada"
date = 2026-10-22T09:00:00-06:00
draft = true
description = "Resumen breve que aparece en el blog y en los resultados de búsqueda."
tags = ["guías", "pkgsrc"]
+++
```

- `description` es obligatoria en la práctica: se usa en las tarjetas, en el encabezado del artículo y en los metadatos.
- Las entradas se ordenan por `date`; usa la zona horaria de México (`-06:00`).
- Cuando esté lista, cambia `draft = true` a `false` o elimina la línea.
- Las imágenes van en `static/img/` y se referencian como `/img/mi-imagen.png`.

Para agregar un enlace a la página de referencias, edita `data/referencias.yaml`. No hace falta tocar plantillas.

## Publicar en GitHub Pages

### 1. Crear el repositorio

```sh
git init -b main
git add .
git commit -m "Sitio inicial de NetBSD México"
git remote add origin https://github.com/TU-USUARIO/netbsd.org.mx.git
git push -u origin main
```

### 2. Activar GitHub Pages

En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

El flujo `.github/workflows/deploy.yml` compila con Hugo y publica en cada push a `main`. El flujo `ci.yml` compila las *pull requests* para detectar errores antes de fusionar.

### 3. Configurar el dominio

El archivo `static/CNAME` ya contiene:

```text
www.netbsd.org.mx
```

En **Settings → Pages → Custom domain**, escribe `www.netbsd.org.mx` y guarda. Después de que GitHub verifique el DNS, activa **Enforce HTTPS**.

En tu proveedor de DNS:

- Crea un registro **CNAME** para `www` apuntando a `TU-USUARIO.github.io.`
- Si quieres que el dominio sin `www` también llegue al sitio, configura un redireccionamiento desde `netbsd.org.mx` hacia `www.netbsd.org.mx` (o los registros A/AAAA de GitHub Pages, según lo que permita tu proveedor).

La propagación puede tardar desde unos minutos hasta algunas horas.

> **Consejo:** si quieres probar el sitio en `https://TU-USUARIO.github.io/netbsd.org.mx/` antes de configurar el dominio, elimina temporalmente `static/CNAME` y desactiva el dominio personalizado en **Settings → Pages**. Vuelve a agregarlo cuando el DNS esté listo.

### 4. Primer despliegue

Haz push a `main` o ejecuta el flujo manualmente desde **Actions → Publicar en GitHub Pages → Run workflow**. La primera vez puede fallar si Pages todavía no está configurado; vuelve a ejecutarlo cuando lo esté.

## Personalización

Antes de publicar un fork, revisa `hugo.toml`:

```toml
baseURL = "https://www.netbsd.org.mx/"

[params]
  github = "https://github.com/ficovh/netbsd-mx"
  repo = "ficovh/netbsd-mx"
```

Cambia `github` por la URL real del repositorio. Los enlaces de la comunidad y del pie de página se editan en `layouts/partials/footer.html`.

El diseño vive en `assets/css/main.css`. Los colores, tipografías y anchos están definidos como variables CSS al inicio del archivo. El tema oscuro se activa con la preferencia del sistema o con el botón de la cabecera.

## Contribuir

Las contribuciones son bienvenidas: correcciones, guías, traducciones y enlaces nuevos. Abre un *issue* o envía una *pull request*.

Buenas prácticas:

- Una entrada por *pull request*.
- Español claro, con acentos y sin anglicismos innecesarios.
- Comandos probados y versión de NetBSD indicada.
- Enlaces a la documentación oficial cuando aplique.

## Licencia

- El **código** de este repositorio está bajo la licencia [MIT](LICENSE).
- El **contenido editorial** (entradas, guías y textos) está bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es).

NetBSD® es una marca registrada de The NetBSD Foundation, Inc.
