# Historias de usuario — Abordo

**Dominio:** consulta y compra de pasajes intermunicipales que salen de la Terminal de Transportes de Pasto.

Cada historia está en su propio archivo, con el formato **Como / Quiero / Para**, la **validación INVEST** y los **criterios de aceptación en Gherkin** (en español).

## Problema

Para saber qué buses salen de la Terminal de Pasto, a qué hora y cuánto cuestan, una persona tiene que ir a la terminal o llamar a cada empresa. Abordo reúne en un solo sistema las empresas, rutas y salidas, y permite comprar el tiquete y elegir el asiento sin hacer fila.

## Actores

| Actor | Descripción |
|---|---|
| Pasajero | Persona que busca salidas, compra y consulta sus tiquetes. |
| Administrador | Empleado de la terminal que registra empresas, buses, rutas y salidas, y consulta las ventas. |

Los dos son tipos de **Usuario**.

## Reglas de negocio

- **RN1. Precio final del tiquete** = precio base de la salida − descuento según tipo de pasajero + tasa de uso de la terminal.
- **RN2. Descuento por tipo de pasajero:** General 0 %, Estudiante 10 %, Adulto mayor 20 %.
- **RN3. Tasa de uso de la terminal:** valor fijo configurable, inicialmente $3.000.
- **RN4.** Un asiento solo puede venderse una vez por salida.
- **RN5.** Un tiquete solo puede cancelarse si faltan más de 2 horas para la salida.
- **RN6.** Estados del tiquete: Activo, Cancelado, Usado.

Ejemplo de RN1 con precio base $50.000: General $53.000, Estudiante $48.000, Adulto mayor $43.000.

## Resumen

| ID | Título | Actor | Valor de negocio | Prioridad | Puntos | Archivo |
|---|---|---|---|---|---|---|
| HU_001 | Registrarse como pasajero | Pasajero | Poder comprar a su nombre | Alta | 3 | [HU_001](HU_001-registrarse-como-pasajero.md) |
| HU_002 | Iniciar sesión | Pasajero y Administrador | Acceder según el rol | Alta | 3 | [HU_002](HU_002-iniciar-sesion.md) |
| HU_003 | Gestionar empresas transportadoras | Administrador | Lista de empresas al día | Alta | 2 | [HU_003](HU_003-gestionar-empresas.md) |
| HU_004 | Gestionar buses | Administrador | Saber cuántos asientos hay | Alta | 2 | [HU_004](HU_004-gestionar-buses.md) |
| HU_005 | Gestionar rutas | Administrador | Destinos disponibles para buscar | Alta | 2 | [HU_005](HU_005-gestionar-rutas.md) |
| HU_006 | Programar salidas | Administrador | Viajes listos para vender | Alta | 3 | [HU_006](HU_006-programar-salidas.md) |
| HU_007 | Consultar reporte de ventas | Administrador | Controlar la operación | Media | 3 | [HU_007](HU_007-reporte-de-ventas.md) |
| HU_008 | Buscar salidas | Pasajero | Comparar horarios y precios | Alta | 3 | [HU_008](HU_008-buscar-salidas.md) |
| HU_009 | Ver asientos disponibles | Pasajero | Escoger dónde sentarse | Alta | 2 | [HU_009](HU_009-ver-asientos.md) |
| HU_010 | Comprar tiquete | Pasajero | Asegurar el viaje sin fila | Alta | 5 | [HU_010](HU_010-comprar-tiquete.md) |
| HU_011 | Consultar mis tiquetes | Pasajero | Tener a mano los datos del viaje | Media | 2 | [HU_011](HU_011-consultar-mis-tiquetes.md) |
| HU_012 | Cancelar tiquete | Pasajero | Liberar el asiento si no viaja | Media | 2 | [HU_012](HU_012-cancelar-tiquete.md) |

Total: 32 puntos.

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
| HU_010 | RF_010, RF_011 |
| HU_011 | RF_012 |
| HU_012 | RF_013 |
