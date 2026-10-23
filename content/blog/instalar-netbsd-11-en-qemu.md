+++
title = "Instalar NetBSD 11.0 en QEMU, paso a paso"
date = 2026-10-06T08:00:00-06:00
description = "Una guía práctica para tener NetBSD 11.0 funcionando en una máquina virtual con QEMU, desde la descarga hasta pkgin."
tags = ["guías", "instalación", "qemu"]
+++

Una máquina virtual es la forma más rápida de probar NetBSD sin tocar el equipo principal. También es útil para laboratorios, pruebas de software y para aprender administración de sistemas sin miedo a romper nada.

Esta guía usa **NetBSD 11.0 para amd64** sobre QEMU. Al final tendrás un sistema con red, `pkgin` y algunas herramientas básicas.

## Lo que necesitas

- Un equipo con QEMU instalado.
- Alrededor de 3 GB de espacio libre (la imagen y el disco virtual).
- Conexión a internet para descargar la ISO y los paquetes.

En Linux, QEMU suele estar en el gestor de paquetes de tu distribución. En macOS puedes instalarlo con Homebrew. En NetBSD está disponible en pkgsrc como `qemu`.

## 1. Descarga la imagen

La ISO de instalación para amd64 está en el CDN oficial:

```sh
curl -LO https://cdn.netbsd.org/pub/NetBSD/NetBSD-11.0/images/NetBSD-11.0-amd64.iso
```

Si prefieres verificar la descarga, en el mismo directorio encontrarás los archivos de hashes y las firmas PGP del proyecto.

> **Nota para Apple Silicon:** este procedimiento usa la arquitectura amd64. En Macs con chip Apple necesitas la imagen `evbarm-aarch64` y QEMU compilado para arm64; los comandos cambian un poco.

## 2. Crea el disco virtual

Crea una imagen QCOW2 de 24 GB. El archivo crecerá sólo a medida que se use:

```sh
qemu-img create -f qcow2 netbsd11.qcow2 24G
```

## 3. Arranca QEMU

El siguiente comando arranca desde la ISO, con disco y red VirtIO, 2 GB de RAM y dos CPUs:

```sh
qemu-system-x86_64 \
  -machine q35 \
  -cpu max \
  -smp 2 \
  -m 2048 \
  -drive file=netbsd11.qcow2,if=virtio,format=qcow2 \
  -cdrom NetBSD-11.0-amd64.iso \
  -boot order=d \
  -nic user,model=virtio-net-pci
```

Si estás en Linux y tienes virtualización por hardware, puedes acelerar bastante agregando `-accel kvm -cpu host`. En un host NetBSD con `nvmm` habilitado, usa `-accel nvmm`. Si QEMU se queja, vuelve al comando base: funcionará igual, sólo más lento.

Deberías ver el cargador de arranque de NetBSD y, unos segundos después, el instalador.

## 4. Instalación con sysinst

El instalador de NetBSD se llama `sysinst`. Es textual, claro y bastante rápido. Los pasos esenciales son:

1. **Idioma y teclado.** Elige español si está disponible y la distribución de teclado que corresponda a tu equipo.
2. **Instalar en el disco duro.** Selecciona la opción de instalación, no la de actualizar.
3. **Disco.** El disco VirtIO aparecerá como `ld0`. Selecciónalo.
4. **Esquema de particiones.** Para una máquina virtual nueva, usa GPT y ocupa todo el disco. Acepta la distribución por defecto: una partición raíz, `/var`, `/usr`, `/home` y swap.
5. **Sets.** Instala todos los conjuntos. En una VM no vale la pena recortar; tener las páginas de manual, el compilador y las pruebas a mano es útil.
6. **Contraseña de root.** Usa una contraseña fuerte. En una VM local no es crítico, pero es buena costumbre.
7. **Red.** Configura `vioif0` con DHCP si usas la red de usuario de QEMU. Pon un nombre de host, por ejemplo `mx`.
8. **Zona horaria.** Selecciona `America/Mexico_City` (o la que te corresponda).
9. **pkgin.** Acepta la opción de instalar `pkgin` y configurar el repositorio de paquetes.
10. **Usuario.** Crea tu usuario cotidiano y añádelo a los grupos que necesites. No trabajarás como root todo el tiempo.
11. **Reiniciar.** Al terminar, apaga la VM y vuelve a arrancar sin la ISO.

## 5. Primer arranque

Arranca de nuevo, esta vez desde el disco:

```sh
qemu-system-x86_64 \
  -machine q35 \
  -cpu max \
  -smp 2 \
  -m 2048 \
  -drive file=netbsd11.qcow2,if=virtio,format=qcow2 \
  -boot order=c \
  -nic user,model=virtio-net-pci
```

Inicia sesión con tu usuario. Verifica lo básico:

```sh
uname -a
ifconfig vioif0
df -h
```

`uname -a` debe mostrar algo como `NetBSD mx 11.0 NetBSD 11.0 (GENERIC) amd64`. Si la red funciona, `ping netbsd.org` debería responder.

## 6. Instala pkgin y paquetes

`pkgin` es la interfaz binaria de pkgsrc. Si el instalador no lo dejó listo, entra como root y revisa la configuración:

```sh
su -
cat /usr/pkg/etc/pkgin/repositories.conf
```

La línea del repositorio debe apuntar a tu arquitectura y versión, por ejemplo:

```text
https://cdn.NetBSD.org/pub/pkgsrc/packages/NetBSD/x86_64/11.0/All
```

Actualiza el índice e instala algunas herramientas:

```sh
pkgin update
pkgin install bash git curl tmux vim
```

Con eso ya tienes un entorno cómodo. Si quieres explorar qué hay disponible:

```sh
pkgin search firefox
pkgin avail | less
```

Y para mantener el sistema de paquetes al día:

```sh
pkgin full-upgrade
```

## 7. Apagar y guardar una instantánea

Para apagar correctamente:

```sh
shutdown -p now
```

Con la VM detenida, puedes guardar un estado limpio del disco:

```sh
qemu-img snapshot -c instalacion-limpia netbsd11.qcow2
```

Si más adelante quieres volver a ese punto:

```sh
qemu-img snapshot -a instalacion-limpia netbsd11.qcow2
```

## Notas y siguientes pasos

- **Aceleración:** si `-accel kvm` no está disponible, revisa que la virtualización esté habilitada en la BIOS/UEFI y que tu usuario tenga acceso a `/dev/kvm`.
- **Más CPUs o RAM:** ajusta `-smp` y `-m` según los recursos de tu equipo. NetBSD aprovecha bien ambos.
- **Red:** la red de usuario de QEMU es la opción más simple. Para servidores o pruebas de red más complejas, considera un puente (`bridge`) o una red TAP.
- **Escritorio:** si quieres una interfaz gráfica, instala X.Org y un gestor de ventanas ligero desde pkgsrc. En otra entrada hablaremos de eso.

Con esto ya tienes un NetBSD limpio y actualizado para experimentar. La próxima parada natural es aprender a manejar pkgsrc a fondo, y tenemos una guía para eso.
