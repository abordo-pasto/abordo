# Historias de usuario — Abordo

**Tema registrado:** Plataforma móvil para la gestión y consulta de información del transporte terrestre en Pasto.

**Descripción registrada:** desarrollo de una plataforma móvil que centralice la información de los diferentes puntos de transporte terrestre de Pasto, permitiendo a los usuarios consultar y comparar rutas, destinos, horarios, tarifas y empresas transportadoras, facilitando la planificación de sus viajes y el acceso a información clara y organizada.

**Enfoque:** la función principal es **consultar, comparar y planificar**. La **compra del tiquete** es una funcionalidad extra.

Cada historia está en su propio archivo, con el formato **Como / Quiero / Para**, la **validación INVEST** y los **criterios de aceptación en Gherkin** (en español).

## Problema

En Pasto hay tres puntos de transporte terrestre y cada uno atiende destinos distintos:

| Punto | Qué destinos atiende |
|---|---|
| Terminal de Transportes de Pasto | Ciudades y municipios intermunicipales (Ipiales, Cali, Bogotá…) |
| Terminal Mixto | Pueblos y veredas cercanas |
| Terminal Torobajo (sector norte) | Municipios del norte de Nariño (Sandoná, Genoy, La Florida…) |

Para saber desde cuál sale un destino, qué empresas lo cubren, a qué hora y cuánto cuesta, una persona tiene que ir hasta el punto o llamar a cada empresa. Abordo centraliza la información de los tres puntos para consultarla y compararla desde el celular, planificar el viaje y, como extra, comprar el tiquete.

## Actores

| Actor | Tipo | Descripción |
|---|---|---|
| Visitante | Persona (sin cuenta) | Cualquier persona que abre la app sin iniciar sesión: consulta los puntos de transporte, busca y compara salidas, ve los asientos y puede registrarse. |
| Pasajero | Persona (usuario registrado) | Visitante que creó su cuenta. Además de consultar, compra, consulta y cancela sus tiquetes. |
| Operador de empresa | Persona (usuario registrado) | Empleado de una empresa transportadora (Cootranar, Transipiales, Coomixtos…). Mantiene al día los buses, rutas y salidas **de su empresa** y consulta sus ventas. |
| Administrador | Persona (usuario registrado) | Encargado de la plataforma: registra los puntos de transporte y las empresas, crea las cuentas de los operadores y consulta las ventas de todas las empresas. |
| Pasarela de pagos | Sistema externo | Servicio que autoriza o rechaza el pago de un tiquete. En el proyecto es una pasarela simulada (la compra es una funcionalidad extra). |

Pasajero, Operador de empresa y Administrador son tipos de **Usuario** (herencia). El Visitante no tiene cuenta, por eso no es una clase del sistema.

## Reglas de negocio

- **RN1. Precio final del tiquete** = precio base de la salida − descuento según tipo de pasajero + tasa de uso de la terminal.
- **RN2. Descuento por tipo de pasajero:** General 0 %, Estudiante 10 %, Adulto mayor 20 %.
- **RN3. Tasa de uso de la terminal:** valor fijo configurable, inicialmente $3.000.
- **RN4.** Un asiento solo puede venderse una vez por salida.
- **RN5.** Un tiquete solo puede cancelarse si faltan más de 2 horas para la salida.
- **RN6.** Estados del tiquete: Activo, Cancelado, Usado.
- **RN7.** Toda ruta sale de un único punto de transporte de Pasto.
- **RN8.** Hora estimada de llegada = hora de salida + duración de la ruta.
- **RN9.** Un operador solo gestiona los buses, rutas, salidas y ventas de su propia empresa.
- **RN10.** Un tiquete solo se emite si la pasarela de pagos aprueba el pago.

Ejemplo de RN1 con precio base $50.000: General $53.000, Estudiante $48.000, Adulto mayor $43.000.

## Resumen

### Épica 1. Cuenta de usuario
| ID | Título | Actor | Valor de negocio | Prioridad | Puntos | Archivo |
|---|---|---|---|---|---|---|
| HU_001 | Registrarse como pasajero | Visitante | Poder comprar a su nombre | Alta | 3 | [HU_001](HU_001-registrarse-como-pasajero.md) |
| HU_002 | Iniciar sesión | Pasajero, Operador y Administrador | Acceder según el rol | Alta | 3 | [HU_002](HU_002-iniciar-sesion.md) |

### Épica 2. Administración de la información
| ID | Título | Actor | Valor de negocio | Prioridad | Puntos | Archivo |
|---|---|---|---|---|---|---|
| HU_013 | Gestionar puntos de transporte | Administrador | Centralizar los tres puntos de Pasto | Alta | 2 | [HU_013](HU_013-gestionar-puntos-de-transporte.md) |
| HU_003 | Gestionar empresas transportadoras | Administrador | Lista de empresas al día | Alta | 2 | [HU_003](HU_003-gestionar-empresas.md) |
| HU_016 | Gestionar operadores de empresa | Administrador | Cada empresa actualiza su información | Alta | 2 | [HU_016](HU_016-gestionar-operadores-de-empresa.md) |
| HU_004 | Gestionar buses | Operador de empresa | Saber cuántos asientos hay | Alta | 2 | [HU_004](HU_004-gestionar-buses.md) |
| HU_005 | Gestionar rutas | Operador de empresa | Saber desde qué punto sale cada destino | Alta | 2 | [HU_005](HU_005-gestionar-rutas.md) |
| HU_006 | Programar salidas | Operador de empresa | Horarios y tarifas al día | Alta | 3 | [HU_006](HU_006-programar-salidas.md) |
| HU_007 | Consultar reporte de ventas | Operador y Administrador | Controlar la operación | Media | 3 | [HU_007](HU_007-reporte-de-ventas.md) |

### Épica 3. Consulta, comparación y planificación (principal)
| ID | Título | Actor | Valor de negocio | Prioridad | Puntos | Archivo |
|---|---|---|---|---|---|---|
| HU_014 | Consultar puntos de transporte | Visitante y Pasajero | Saber a qué punto ir | Alta | 2 | [HU_014](HU_014-consultar-puntos-de-transporte.md) |
| HU_008 | Buscar salidas | Visitante y Pasajero | Ver horarios, tarifas y punto de salida | Alta | 3 | [HU_008](HU_008-buscar-salidas.md) |
| HU_015 | Comparar salidas | Visitante y Pasajero | Escoger la mejor opción | Alta | 3 | [HU_015](HU_015-comparar-salidas.md) |

### Épica 4. Compra de tiquete (extra)
| ID | Título | Actor | Valor de negocio | Prioridad | Puntos | Archivo |
|---|---|---|---|---|---|---|
| HU_009 | Ver asientos disponibles | Visitante y Pasajero | Escoger dónde sentarse | Media | 2 | [HU_009](HU_009-ver-asientos.md) |
| HU_010 | Comprar tiquete | Pasajero | Asegurar el viaje sin fila | Media | 5 | [HU_010](HU_010-comprar-tiquete.md) |
| HU_011 | Consultar mis tiquetes | Pasajero | Tener a mano los datos del viaje | Baja | 2 | [HU_011](HU_011-consultar-mis-tiquetes.md) |
| HU_012 | Cancelar tiquete | Pasajero | Liberar el asiento si no viaja | Baja | 2 | [HU_012](HU_012-cancelar-tiquete.md) |

Total: 16 historias, 41 puntos. Los ID se mantienen aunque el orden de presentación sea por épica.

## Trazabilidad con los requisitos

| HU | Requisitos (ver [02-requisitos.md](../02-requisitos.md)) |
|---|---|
| HU_001 | RF_001 |
| HU_002 | RF_002 |
| HU_003 | RF_003 |
| HU_004 | RF_004 |
| HU_005 | RF_005 |
| HU_006 | RF_006 |
| HU_007 | RF_007 |
| HU_008 | RF_008 |
| HU_009 | RF_009 |
| HU_010 | RF_010, RF_011, RF_018 |
| HU_011 | RF_012 |
| HU_012 | RF_013 |
| HU_013 | RF_014 |
| HU_014 | RF_015 |
| HU_015 | RF_016 |
| HU_016 | RF_017 |
