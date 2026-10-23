+++
title = "pkgsrc: el gestor de paquetes que va más allá de NetBSD"
date = 2026-10-14T09:30:00-06:00
description = "Cómo funciona pkgsrc, cuándo usar binarios y cuándo compilar, y los comandos que conviene dominar."
tags = ["pkgsrc", "paquetes", "guías"]
+++

Una de las mayores fortalezas de NetBSD no está en el sistema base, sino en **pkgsrc**: su colección de paquetes portable. Con pkgsrc puedes instalar desde un navegador hasta un servidor de bases de datos, y hacerlo no sólo en NetBSD, sino también en Linux, macOS, illumos y otros sistemas Unix.

Esta entrada explica cómo está organizado, cuándo conviene usar paquetes binarios y cuáles son los comandos que vas a usar todos los días.

## Dos formas de instalar software

pkgsrc ofrece dos caminos:

1. **Paquetes binarios**, gestionados con `pkgin` o `pkg_add`. Son rápidos de instalar y no requieren compilador.
2. **Compilación desde el árbol de pkgsrc**, con `make`. Es más lento, pero permite cambiar opciones de compilación y ajustar el paquete a tus necesidades.

Para la mayoría de los usuarios, los binarios son la mejor opción. El árbol de pkgsrc queda para quienes necesitan una opción específica, trabajan con hardware menos común o desarrollan paquetes.

## Instalación con pkgin

`pkgin` es la herramienta recomendada para manejar binarios. Si instalaste NetBSD con `sysinst` y aceptaste la opción de pkgin, ya deberías tenerla.

El archivo de configuración está en `/usr/pkg/etc/pkgin/repositories.conf`. Debe apuntar a un repositorio compatible con tu arquitectura y versión. Para NetBSD 11.0 en amd64:

```text
https://cdn.NetBSD.org/pub/pkgsrc/packages/NetBSD/x86_64/11.0/All
```

Cambia `x86_64` por `aarch64`, `i386`, `sparc64` o la arquitectura que uses. Si tu sistema es más antiguo, cambia también `11.0` por la versión correspondiente.

Los comandos esenciales:

```sh
pkgin update                 # actualiza el índice de paquetes
pkgin search firefox         # busca por nombre o descripción
pkgin install firefox        # instala un paquete y sus dependencias
pkgin list                   # lista los paquetes instalados
pkgin upgrade                # actualiza los paquetes instalados
pkgin full-upgrade           # resuelve también cambios de dependencias
pkgin remove firefox         # desinstala
pkgin clean                  # limpia la caché de paquetes
```

Antes de actualizar todo el sistema, revisa las notas de la versión de NetBSD y de pkgsrc. Un `full-upgrade` puede reemplazar bibliotecas compartidas y afectar servicios en ejecución.

## Ramas trimestrales

pkgsrc publica una rama estable cada tres meses: 2026Q1, 2026Q2, 2026Q3, y así sucesivamente. Las ramas trimestrales reciben correcciones importantes, pero no actualizaciones mayores de versión. Eso las hace predecibles para servidores.

Los repositorios binarios de NetBSD suelen ofrecer tanto la rama asociada a la versión del sistema (`11.0`) como ramas trimestrales (`11.0_2026Q3`). Si necesitas estabilidad, una rama trimestral es una buena elección. Si quieres lo más reciente, usa la rama de la versión.

Puedes ver qué hay disponible en el [CDN de pkgsrc](https://cdn.netbsd.org/pub/pkgsrc/packages/NetBSD/).

## Compilar desde el árbol

Si quieres compilar, necesitas el árbol de pkgsrc. La forma más directa es descargar la rama trimestral actual:

```sh
ftp https://cdn.netbsd.org/pub/pkgsrc/pkgsrc-2026Q3/pkgsrc-2026Q3.tar.gz
tar -xzf pkgsrc-2026Q3.tar.gz -C /usr
```

El árbol queda en `/usr/pkgsrc`. Para instalar un paquete:

```sh
cd /usr/pkgsrc/www/firefox
make install clean
```

`make` descarga las fuentes, aplica parches, compila e instala en `/usr/pkg`. Necesitas el set `comp` y, dependiendo del paquete, herramientas adicionales. Como root:

```sh
su -
cd /usr/pkgsrc/www/firefox
make install clean
```

Para cambiar opciones de compilación, edita `/etc/mk.conf` o usa variables en la línea de comandos. Primero consulta las opciones disponibles:

```sh
make show-options
```

Después ajusta las que necesites; sustituye `<paquete>` y `<opciones>` por los valores reales:

```sh
make PKG_OPTIONS.<paquete>="<opciones>" install clean
```

Por ejemplo, para compilar nginx con soporte de HTTP/3:

```sh
make PKG_OPTIONS.nginx="nginx-http3" install clean
```

La lista de opciones y su sintaxis exacta está en el `options.mk` de cada paquete.

## Mantener paquetes compilados

Si instalas desde el árbol, `pkgin` no es suficiente para actualizar: necesita saber qué versión tienes y qué dependencias se recompilaron. Para eso existe `pkg_rolling-replace`, disponible en pkgsrc:

```sh
pkgin install pkg_rolling-replace
pkg_rolling-replace -u
```

El comando recompila los paquetes en el orden correcto cuando cambian sus dependencias. Es más lento que usar binarios, pero es la forma recomendada de mantener un sistema compilado desde pkgsrc.

## pkgsrc en otros sistemas

Una de las gracias de pkgsrc es que no está atado a NetBSD. En Linux, macOS o illumos puedes usar el *bootstrap*:

```sh
./bootstrap --prefix /opt/pkg
```

Si no tienes privilegios de root:

```sh
./bootstrap --prefix "$HOME/pkg" --unprivileged
```

Al terminar, agrega el directorio de binarios a tu `PATH`:

```sh
export PATH="/opt/pkg/bin:/opt/pkg/sbin:$PATH"
```

El bootstrap puede instalar `pkgin` y dejar el resto listo. A partir de ahí, los comandos son los mismos que en NetBSD. Es una forma excelente de tener herramientas recientes y consistentes en distintos sistemas.

## Consejos prácticos

- **Lee antes de actualizar.** `pkgin full-upgrade` puede requerir reiniciar servicios o cambiar archivos de configuración.
- **No mezcles binarios y compilaciones sin cuidado.** Si compilas un paquete que también existe como binario, documenta qué versión tienes.
- **Revisa `pkg_info`.** Muestra la versión y la descripción de cada paquete; `pkg_info -L` lista los archivos instalados.
- **Usa ramas trimestrales en servidores.** Menos sorpresas, actualizaciones más controladas.
- **Contribuye.** Actualizar un paquete, reportar un fallo de compilación o probar en una arquitectura menos común ayuda mucho al proyecto.

pkgsrc es enorme, y vale la pena explorarlo. La [guía oficial](https://www.netbsd.org/docs/pkgsrc/) entra en detalle sobre creación de paquetes, opciones y publicación. Y si algo falla, la lista [tech-pkg](https://www.netbsd.org/mailinglists/) es el lugar indicado para preguntar.
