+++
title = "NetBSD en hardware antiguo: una segunda vida bien merecida"
date = 2026-10-20T18:00:00-06:00
description = "Qué revisar antes de instalar NetBSD en una laptop o computadora vieja, cómo configurar red y escritorio, y qué esperar."
tags = ["hardware", "retro", "guías"]
+++

Hay algo profundamente satisfactorio en rescatar una computadora que parecía destinada al basurero. NetBSD es un aliado natural para esa tarea: su portabilidad no es un eslogan, es una característica que se nota cuando el hardware tiene quince o veinte años.

Esta guía no promete convertir una Pentium III en una estación de trabajo moderna. Promete ayudarte a decidir si vale la pena, instalar un sistema utilizable y evitar las trampas más comunes.

## Por qué NetBSD

- **Soporte de arquitecturas que otros sistemas abandonaron**: PowerPC, SPARC, MIPS, HP 9000, VAX, 68k y más.
- **Requisitos modestos**: una instalación base funciona con muy poca RAM, y hay gestores de ventanas ligeros en pkgsrc.
- **Un sistema base coherente**: las herramientas de red, cifrado, compilación y diagnóstico vienen incluidas.
- **Documentación específica por port**: cada plataforma tiene sus notas de instalación y limitaciones conocidas.

Si tu equipo es una laptop x86 de los últimos quince años, las probabilidades de que funcione bien son altas. Si es una estación de trabajo de los años noventa, también hay camino, aunque con más paciencia.

## Antes de instalar: haz inventario

Arranca un sistema live o revisa el hardware desde otro sistema operativo. Los datos que más importan son el modelo exacto, la tarjeta de video, la tarjeta de red inalámbrica, el disco y la cantidad de RAM.

Si ya tienes NetBSD instalado, estas herramientas te ayudan:

```sh
dmesg | less
pcictl pci0 list
envstat
sysctl hw
```

`dmesg` muestra qué detectó el kernel al arrancar: discos, red, video, USB y errores. `pcictl` lista los dispositivos PCI. `envstat` informa sensores de temperatura, voltaje y ventiladores cuando el hardware los expone.

Antes de elegir un equipo, revisa la página del [port correspondiente](https://www.netbsd.org/ports/) y busca el modelo en los archivos de las listas de correo. Alguien probablemente ya lo intentó.

## Instalación mínima, pero completa

Para hardware limitado, instala los sets esenciales: `base`, `etc`, `comp`, `man`, `misc`, `text` y los de X si vas a usar interfaz gráfica. No necesitas `games` ni `tests` en una máquina de producción, aunque en un equipo de pruebas pueden ser útiles.

NetBSD 11.0 mejora el soporte para varios equipos antiguos:

- **Nintendo Wii**: unidad de DVD, Wi-Fi `bwi(4)`, consola serial USB Gecko, motor AES por hardware y cargador de arranque independiente.
- **PowerPC Mac**: mejor soporte de I2C/OpenPIC en G4/G5, control de ventiladores en PowerMac7,2 y PaX MPROTECT/ASLR habilitados por defecto.
- **HP 9000**: nuevos drivers de framebuffer para las series 362/382 y tarjetas Visualize FX y HCRX.
- **hp300**: X.Org funciona en modelos 362 y 382.
- **Sun UltraSPARC**: el port `sparc64` sigue recibiendo mantenimiento.

Para equipos muy antiguos, revisa si el port está marcado como soportado o sólo como experimental. La diferencia importa.

## Gráficos y escritorio

Si instalaste los sets de X, ya tienes un servidor Xorg en el sistema base. En la mayoría de los casos no necesitas un `xorg.conf`: X detecta el hardware y usa el driver adecuado.

Un gestor de ventanas ligero hace una gran diferencia:

```sh
pkgin install ctwm
echo 'exec ctwm' > ~/.xinitrc
startx
```

Otras opciones populares en pkgsrc son `icewm`, `fluxbox` o un entorno ligero como Xfce. Para equipos con poca RAM, evita entornos de escritorio completos y quédate con un gestor de ventanas sencillo. Si `startx` no está en tu `PATH`, prueba con `/usr/X11R7/bin/startx`.

Los navegadores modernos son el punto más débil en hardware antiguo. Firefox funciona, pero consume mucha memoria y CPU. **NetSurf** es una alternativa ligera para consultar documentación y sitios simples; no esperes compatibilidad perfecta con aplicaciones web modernas.

Si el video no funciona bien, revisa `dmesg` y las notas del port. En algunas tarjetas antiguas la aceleración es limitada o inexistente, y X funciona con un framebuffer genérico. Para uso de terminal, SSH y servidores, eso no importa.

## Conectividad inalámbrica

NetBSD incluye `wpa_supplicant` y `dhcpcd` en el sistema base. El nombre de la interfaz depende del driver: `iwn0`, `athn0`, `urtwn0`, `run0`, `bwi0`, etc.

Primero identifica la interfaz:

```sh
ifconfig -l
dmesg | grep -i -E 'wlan|wireless|802.11'
```

Luego crea `/etc/wpa_supplicant.conf`:

```text
ctrl_interface=/var/run/wpa_supplicant
update_config=1

network={
    ssid="MiRed"
    psk="mi contraseña"
}
```

Y conéctate:

```sh
wpa_supplicant -B -i urtwn0 -c /etc/wpa_supplicant.conf
dhcpcd urtwn0
```

Sustituye `urtwn0` por tu interfaz. Si el adaptador no aparece en `dmesg`, probablemente no esté soportado o necesite firmware adicional. Revisa las páginas de manual del driver y la documentación del port.

## Energía, temperatura y ruido

En laptops antiguas, la batería y el calor son limitaciones reales. `envstat` te dice qué sensores están disponibles. En equipos x86, `apm` puede reportar el estado de la batería.

NetBSD incluye `powerd`, que ajusta la frecuencia del CPU según la carga cuando el hardware lo permite. En equipos de escritorio, revisa que los ventiladores funcionen y que el disipador no esté lleno de polvo; ningún sistema operativo arregla eso.

Si el equipo tiene una batería hinchada o una fuente de poder dudosa, detente. La seguridad va antes que el experimento.

## Almacenamiento y arranque

Los discos mecánicos antiguos siguen funcionando, pero un SSD SATA barato transforma la experiencia. NetBSD detecta la mayoría de los controladores SATA y NVMe modernos, y también muchos antiguos.

Herramientas útiles:

- `gpt` para inspeccionar y editar tablas de particiones GPT.
- `dkctl` para trabajar con *wedges* y discos virtuales.
- `mount -t msdos` para leer particiones FAT de otros sistemas.
- `fsck` y `dump`/`restore` para mantenimiento y respaldos.

Si el equipo arranca por BIOS legacy, revisa el orden de arranque y la configuración del disco. En máquinas con firmware extraño, a veces conviene instalar desde un medio externo y luego ajustar el cargador.

## Expectativas realistas

NetBSD puede devolverle la vida a un equipo viejo, pero no lo vuelve nuevo. Antes de empezar, define para qué lo vas a usar:

- **Servidor casero**: DNS, HTTP, archivos, respaldos, monitoreo. Excelente caso de uso.
- **Router o firewall**: `npf`, reenvío de puertos, VLANs. Muy buen ajuste.
- **Laboratorio de redes**: QEMU, Xen, pruebas de protocolos.
- **Terminal de trabajo**: SSH, edición de texto, compilación. Perfecto con un gestor ligero.
- **Máquina retro**: jugar con ports históricos, emuladores y hardware exótico.
- **Navegación web diaria**: posible, pero con limitaciones y paciencia.

La comunidad de NetBSD lleva décadas haciendo exactamente esto. Si tu equipo funciona, documenta el modelo y compártelo: esa información ayuda a la siguiente persona. Y si algo no funciona, un reporte claro en GNATS o en las listas puede mejorar el soporte para todos.
