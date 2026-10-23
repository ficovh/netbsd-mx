+++
title = "Cómo colaborar con NetBSD sin ser desarrollador del kernel"
date = 2026-10-22T08:00:00-06:00
description = "Formas concretas de aportar al proyecto y a este sitio: documentación, pruebas, paquetes, reportes y difusión."
tags = ["comunidad", "contribuir"]
+++

Una idea equivocada muy común es que para contribuir a un sistema operativo hay que escribir código de kernel. NetBSD necesita desarrolladores, por supuesto, pero también necesita documentación clara, personas que prueben hardware, mantenedores de paquetes, traductores y usuarios que reporten errores con precisión.

Esta entrada reúne formas concretas de ayudar, ordenadas de menor a mayor compromiso.

## 1. Usa el sistema y cuenta lo que pasa

La contribución más valiosa empieza por usar NetBSD en serio: en una laptop, un servidor casero, una máquina virtual o un equipo recuperado. Cuando algo funciona o falla, documenta el modelo de hardware, la versión y los pasos.

Un reporte de éxito también sirve. Si una tarjeta de red funciona sin ajustes, si una laptop suspende correctamente o si un port corre en un equipo raro, esa información ayuda a otras personas a decidir.

## 2. Participa en las listas de correo

Las [listas de correo](https://www.netbsd.org/mailinglists/) son el corazón del proyecto. Para empezar:

- **netbsd-users**: uso general y preguntas.
- **netbsd-help**: ayuda para principiantes.
- **current-users**: seguimiento de NetBSD-current.
- **tech-pkg**: pkgsrc.
- **tech-kern** y **tech-net**: desarrollo del kernel y de la pila de red.

Antes de preguntar, revisa los archivos. Cuando respondas, hazlo con respeto y con contexto: versión, arquitectura y mensajes de error. El texto plano y las citas mínimas facilitan la lectura.

Participar en una lista también es contribuir: una buena respuesta ahorra tiempo a mucha gente y queda archivada para el futuro.

## 3. Reporta errores con calidad

El [GNATS](https://gnats.netbsd.org/) es el sistema público de seguimiento. Un reporte útil incluye:

1. Descripción breve y específica.
2. Pasos para reproducir el problema.
3. Comportamiento esperado y comportamiento real.
4. Versión de NetBSD, arquitectura y hardware relevante.
5. Salida de `uname -a`, `dmesg` y registros del servicio afectado.
6. Si es posible, una prueba con la versión estable más reciente o con NetBSD-current.

Evita reportes duplicados buscando primero. Si encuentras uno existente, agrega tu información en lugar de abrir otro. Si el problema se resuelve, actualiza el reporte: eso también es parte del trabajo.

## 4. Mejora la documentación

La documentación oficial incluye la [Guía de NetBSD](https://www.netbsd.org/docs/guide/en/), las páginas de manual, la [wiki](https://wiki.netbsd.org/) y el propio sitio del proyecto. Siempre hay tareas pendientes: errores, ejemplos desactualizados, procedimientos incompletos.

Puedes empezar por algo pequeño:

- Corregir un comando que ya no funciona.
- Aclarar un párrafo confuso.
- Agregar una nota sobre una versión nueva.
- Traducir una guía al español y publicarla en este sitio, enlazando siempre la fuente original.

La [guía de contribución](https://www.netbsd.org/contrib/) explica el flujo para enviar cambios.

## 5. Mantén o prueba paquetes de pkgsrc

pkgsrc tiene miles de paquetes y no todos reciben la misma atención. Si usas un paquete con frecuencia, puedes:

- Actualizarlo a la versión más reciente.
- Corregir un fallo de compilación en tu arquitectura.
- Probar una actualización y reportar el resultado en `tech-pkg`.
- Revisar que las dependencias y opciones sean correctas.

Herramientas como `pkglint` ayudan a validar el estilo y las reglas de pkgsrc antes de enviar un cambio. La [guía de pkgsrc](https://www.netbsd.org/docs/pkgsrc/) tiene un capítulo completo sobre cómo crear y modificar paquetes.

## 6. Prueba versiones de desarrollo

NetBSD publica *release candidates* y snapshots de la rama actual. Instalarlos en hardware real —no sólo en máquinas virtuales— es una de las mejores formas de encontrar problemas antes del lanzamiento.

No necesitas un laboratorio enorme. Una laptop, una Raspberry Pi o una máquina antigua que puedas reiniciar sin consecuencias son suficientes. Reporta lo que falle y lo que funcione.

## 7. Dona hardware o dinero

El proyecto depende de hardware para compilar y probar. Las [donaciones](https://www.netbsd.org/donations/) financian servidores de compilación, infraestructura y desarrollo. También se aceptan equipos que los desarrolladores puedan usar.

Si tienes hardware interesante —una arquitectura poco común, una tarjeta de red, una estación de trabajo antigua— pregunta en las listas antes de enviarlo. El espacio y el transporte también cuestan.

## 8. Contribuye a este sitio

`netbsd.org.mx` es un sitio estático construido con [Hugo](https://gohugo.io/). Todo el contenido está en Markdown y el repositorio está pensado para recibir *pull requests*.

El flujo completo:

```sh
git clone https://github.com/ficovh/netbsd-mx.git
cd netbsd-mx
hugo new content blog/mi-articulo.md
hugo server -D
```

Edita el archivo generado en `content/blog/`, escribe tu artículo y revisa el resultado en `http://localhost:1313/`. Cuando estés conforme:

```sh
git checkout -b mi-articulo
git add content/blog/mi-articulo.md
git commit -m "blog: agrega mi artículo"
git push origin mi-articulo
```

Después abre un *pull request* en GitHub explicando el cambio. No necesitas permisos especiales ni formar parte de ningún grupo.

También puedes contribuir sin escribir un artículo completo:

- Corregir un enlace roto.
- Actualizar un comando que cambió de versión.
- Mejorar la redacción de una guía.
- Proponer una referencia nueva.
- Traducir una entrada al inglés o al revés.

Cada entrada tiene fecha, descripción y etiquetas. Si tu texto es técnico, incluye los comandos exactos que probaste y la versión de NetBSD. Esa precisión es lo que hace útil una guía.

## Una comunidad pequeña, pero abierta

NetBSD no es el sistema operativo más popular del mundo, y no necesita serlo. Es un proyecto con una comunidad técnica, directa y acostumbrada a recibir contribuciones bien hechas. La mejor forma de empezar es elegir una cosa pequeña, hacerla bien y compartirla.

Si este sitio te sirve, considera devolver algo: una corrección, una guía, una respuesta en la lista o una donación al proyecto. Todo suma.
