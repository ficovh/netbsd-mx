+++
title = "Comunidad"
description = "Cómo participar en NetBSD y en este sitio: listas de correo, IRC, reportes de errores, documentación y contribuciones."
+++

NetBSD lo construye una comunidad internacional de voluntarios: personas que escriben código, prueban hardware, traducen documentación, empaquetan software y responden preguntas. No hace falta ser desarrollador del kernel para ayudar.

Esta página reúne los canales oficiales y algunas formas concretas de participar, incluido este sitio.

## Empieza por el principio

Antes de preguntar, vale la pena revisar [La Guía de NetBSD](https://www.netbsd.org/docs/guide/en/), las [páginas de manual](https://man.netbsd.org/) y la [wiki](https://wiki.netbsd.org/). La mayoría de los problemas de instalación, red y paquetes están documentados ahí.

Si algo no funciona, reúne la información básica del sistema:

```sh
uname -a
dmesg | tail -n 100
```

Con eso, cualquiera puede darte una mano mucho más rápido.

## Listas de correo

Las [listas de correo](https://www.netbsd.org/mailinglists/) son el canal principal de soporte y desarrollo. Hay listas para usuarios, para desarrollo del kernel, para pkgsrc, para puertos específicos y para anuncios de seguridad.

Algunas de las más útiles para empezar:

- **netbsd-users**: preguntas generales sobre el uso del sistema.
- **netbsd-help**: ayuda para quienes recién llegan.
- **current-users**: seguimiento de NetBSD-current y pruebas.
- **tech-pkg**: desarrollo y discusión de pkgsrc.
- **tech-kern**: diseño e implementación del kernel.

Antes de escribir, busca en los archivos públicos: es muy probable que tu duda ya tenga respuesta. Cuando escribas, incluye versión de NetBSD, arquitectura, hardware relevante y los mensajes de error completos. El texto plano se lee mejor que el HTML y facilita citar fragmentos.

## IRC

El canal **#netbsd** en [Libera.Chat](https://web.libera.chat/#netbsd) sigue activo. Es un buen lugar para dudas rápidas, para seguir el desarrollo en vivo y para conversar con otras personas que usan el sistema a diario. Si usas un cliente IRC, conéctate a `irc.libera.chat` y únete a `#netbsd`.

## Reportar un error

Los errores se documentan en [GNATS](https://gnats.netbsd.org/), el sistema público de seguimiento del proyecto. También puedes usar `send-pr(1)` desde la terminal.

Un buen reporte incluye:

1. Qué intentabas hacer y qué esperabas que ocurriera.
2. Qué ocurrió realmente, con el mensaje de error exacto.
3. Cómo reproducirlo, paso a paso.
4. La salida de `uname -a`, `dmesg` y, si aplica, la configuración relevante.
5. Si es posible, una prueba con la versión estable más reciente.

Evita adjuntar datos personales, contraseñas o volcados enormes. Un reporte claro ahorra días de ida y vuelta.

## Contribuir al proyecto

Hay muchas formas de ayudar, y no todas implican escribir código:

- **Código y drivers**: revisa la [guía de contribución](https://www.netbsd.org/contrib/) y las listas técnicas antes de enviar parches.
- **pkgsrc**: actualiza paquetes, prueba compilaciones y reporta fallos en [tech-pkg](https://www.netbsd.org/mailinglists/).
- **Documentación**: corrige la guía, amplía la wiki o escribe páginas de manual. La claridad también es ingeniería.
- **Pruebas**: instala versiones de desarrollo y candidatas a lanzamiento en hardware real o virtual.
- **Hardware**: dona equipos que el proyecto pueda usar para desarrollo y pruebas.
- **Dinero**: las [donaciones](https://www.netbsd.org/donations/) financian infraestructura, compiladores y hardware de compilación.

## Este sitio

`netbsd.org.mx` es un sitio estático hecho con [Hugo](https://gohugo.io/). Todo el contenido vive en Markdown dentro de un repositorio de GitHub, así que puedes proponer un artículo o una corrección con un *pull request*.

El flujo es sencillo:

1. Haz un *fork* del repositorio.
2. Crea una rama para tu cambio.
3. Agrega o edita un archivo en `content/blog/` con su fecha, descripción y etiquetas.
4. Revisa el resultado en local con `hugo server -D`.
5. Abre el *pull request* explicando qué cambiaste y por qué.

No necesitas tener el sitio completo funcionando para proponer una corrección: un error de ortografía, un comando desactualizado o un enlace roto también son contribuciones valiosas.

## Encuentros en México

No existe un grupo formal de usuarios de NetBSD en México, pero sí hay gente usándolo en servidores, laboratorios, escuelas y proyectos personales. Si organizas un encuentro, una charla o un taller, o si tienes un proyecto con NetBSD que quieras compartir, abre un *issue* en el repositorio del sitio para difundirlo.

## Una aclaración

Este es un sitio comunitario e independiente. No es un canal oficial de The NetBSD Foundation. Las dudas técnicas y los reportes de errores deben ir a las listas de correo y a GNATS, donde está la gente que mantiene el proyecto.

NetBSD® es una marca registrada de The NetBSD Foundation, Inc.
