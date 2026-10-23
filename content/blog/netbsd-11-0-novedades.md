+++
title = "NetBSD 11.0: lo que trae la decimonovena versión"
date = 2026-08-04T10:30:00-06:00
description = "RISC-V, el kernel MICROVM, POSIX.1-2024 y mejoras de compatibilidad: repaso de lo más importante de NetBSD 11.0."
tags = ["netbsd", "versiones", "kernel"]
+++

El 30 de julio de 2026 el proyecto publicó **NetBSD 11.0**, la decimonovena versión mayor del sistema. Después de varios *release candidates*, la rama estable llegó con cambios profundos en portabilidad, compatibilidad y rendimiento de virtualización. Estos son los puntos que más nos interesan.

## RISC-V de 64 bits, por fin estable

La noticia principal es el nuevo port a **RISC-V**. NetBSD 11.0 es la primera versión estable con soporte para plataformas RISC-V de 64 bits, incluyendo equipos basados en StarFive JH71xx como la VisionFive 2 y la PINE64 STAR64, además de QEMU.

El port incluye soporte para PCI/PCIe, TRNG, pines, sensores de temperatura, consola serial y el depurador de kernel `crash(8)`. También hay soporte básico para el SoC Allwinner D1, presente en placas como la MangoPi MQ Pro.

Para quienes experimentan con arquitecturas alternativas, esto convierte a NetBSD en una opción mucho más práctica en hardware RISC-V real.

## MICROVM: arranques en milisegundos

NetBSD 11.0 introduce **MICROVM**, un kernel dedicado para x86 (i386 y amd64) pensado para máquinas virtuales que necesitan arrancar extremadamente rápido. Aprovecha el arranque PVH, dispositivos VirtIO MMIO y varias optimizaciones del kernel.

El proyecto reporta arranques del orden de **10 milisegundos** en CPUs x86 de 2020 en adelante. No es un kernel para uso general, pero abre la puerta a usos interesantes: funciones efímeras, aislamiento ligero y arranque casi instantáneo de servicios.

## POSIX.1-2024 y C23

La biblioteca C y varias utilidades mejoraron su cumplimiento con **POSIX.1-2024** y con la interfaz de programación de **C23**. Se añadieron funciones como `mempcpy(3)`, `heapsort_r(3)`, `qsort_r(3)` y `timespec_getres(3)`, y se auditaron puntos de cancelación en `libpthread`.

También se incorporó el envoltorio `c17(1)` para el compilador de C de ISO 2017, requerido por POSIX.1-2024, y `lint(1)` ahora entiende C23. Para quienes mantienen código portable, la base es más sólida.

## Mejor compatibilidad con Linux

La capa `compat_linux(8)` recibió una actualización importante. Ahora soporta `epoll` implementado sobre `kqueue`, colas de mensajes POSIX, `statx`, `readahead`, `close_range`, `waitid`, `renameat2`, `clone3`, `sync_file_range`, `syncfs` e `inotify`.

En la práctica, esto debería facilitar ejecutar software Linux en NetBSD, especialmente contenedores y binarios modernos que dependen de interfaces recientes.

## Redes: npf más flexible

El firewall **npf(7)** añadió filtrado de **capa 2** y reglas basadas en **usuario y grupo**. Son dos funciones que muchos administradores venían pidiendo: permiten filtrar tráfico a nivel de enlace y aplicar políticas distintas según el usuario que origine la conexión.

Además, el kernel redujo el tiempo de retransmisión inicial de TCP de 3 a 1 segundo, conforme a la RFC 6298, y mejoró el rendimiento de `pipe(2)` y del subsistema `drum(4)`.

## Hardware: de Snapdragon a la Wii

Hay mejoras para todos los gustos:

- **aarch64**: soporte inicial para CPUs Qualcomm Oryon y para la plataforma Snapdragon X Elite (batería, cargador, GPIO e I2C).
- **evbarm**: mejor soporte para Raspberry Pi 5 al arrancar con UEFI, y para placas como la NanoPi R4S.
- **amd64**: sensores de temperatura para CPUs Zen 5 y control de carga en algunas ThinkPad.
- **evbppc / Wii**: soporte para la unidad de DVD, Wi-Fi `bwi(4)`, consola serial USB Gecko, motor AES por hardware y cargador de arranque independiente.
- **macppc**: PaX MPROTECT y ASLR habilitados por defecto, además de control de ventiladores en PowerMac7,2.
- **hppa y hp300**: nuevos drivers de video y mejor soporte de X.Org en estaciones HP antiguas.

También se actualizaron componentes importantes: OpenSSH 10.3, OpenSSL 3.5.7, GCC 12.5.0, GDB 15.1, tmux 3.6b y Xorg 21.1.24.

## Cosas que cambian al actualizar

Hay varios detalles que conviene revisar antes de saltar desde la rama 10:

- Las bibliotecas de compatibilidad se separaron en nuevos *sets* `base32`/`base64` y `debug32`/`debug64`. Es posible que tengas que instalarlos por separado con `sysinst(8)`.
- Las páginas de manual en HTML ahora viven en el set `manhtml`, separado de `man`.
- OpenSSH 10.3 **ya no admite claves DSA**. Si tenías configuraciones que las habilitaban, `sshd` podría no arrancar hasta que las ajustes.
- Se eliminó `xfwp(1)` y algunas herramientas obsoletas de la era PDP-11.

Como siempre, actualiza primero el kernel y los módulos, reinicia, y después el resto del sistema. Revisa las [notas completas de la versión](https://www.netbsd.org/releases/formal-11/NetBSD-11.0.html) antes de empezar.

## ¿Vale la pena?

Si vienes de NetBSD 10 y tu hardware funciona bien, no hay prisa: la rama 10.x sigue recibiendo mantenimiento. Pero si te interesa RISC-V, la virtualización ligera, hardware ARM reciente o simplemente quieres la base más actualizada, 11.0 es una actualización muy completa.

Puedes descargar las imágenes desde el [CDN oficial](https://cdn.netbsd.org/pub/NetBSD/NetBSD-11.0/images/). En el blog publicaremos una guía de instalación en QEMU y otra sobre pkgsrc para acompañar el lanzamiento.
