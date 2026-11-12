# 04 - Características del Sistema (Requisitos Funcionales)

Cada historia de usuario tiene su propia página con la descripción **Como – Quiero – Para**, los criterios de aceptación, el **mockup** de la app móvil, la validación INVEST y los escenarios en Gherkin.

La función principal de Abordo es **consultar, comparar y planificar** (4.4). La **compra de tiquete** (4.5) es una funcionalidad extra.

## 4.1 Cuenta de usuario

| Código | Título | Actor | Historia de Usuario |
|--------|--------|-------|---------------------|
| [HU_001](HU_001-Registrarse-como-pasajero) | Registrarse como pasajero | Visitante | Como **visitante (persona que usa la app sin cuenta)**, quiero **crear una cuenta con mi nombre, documento, correo y contraseña**, para **quedar registrado como pasajero y poder comprar tiquetes a mi nombre**. |
| [HU_002](HU_002-Iniciar-sesión) | Iniciar sesión | Pasajero, Operador, Administrador | Como **usuario registrado (pasajero, operador de empresa o administrador)**, quiero **iniciar sesión con mi correo y contraseña**, para **acceder a las funciones que corresponden a mi rol**. |

## 4.2 Administración de la plataforma

| Código | Título | Actor | Historia de Usuario |
|--------|--------|-------|---------------------|
| [HU_013](HU_013-Gestionar-puntos-de-transporte) | Gestionar puntos de transporte | Administrador | Como **administrador**, quiero **registrar, consultar, editar y eliminar los puntos de transporte terrestre de Pasto (nombre, dirección, horario de atención y zona que atiende)**, para **que cada ruta quede asociada al punto real desde donde sale**. |
| [HU_003](HU_003-Gestionar-empresas-transportadoras) | Gestionar empresas transportadoras | Administrador | Como **administrador**, quiero **registrar, consultar, editar y eliminar las empresas transportadoras (nombre, NIT y teléfono)**, para **mantener actualizada la lista de empresas que operan en los puntos de transporte de Pasto**. |
| [HU_016](HU_016-Gestionar-operadores-de-empresa) | Gestionar operadores de empresa | Administrador | Como **administrador**, quiero **crear, consultar, desactivar y reactivar las cuentas de los operadores de cada empresa transportadora**, para **que cada empresa mantenga al día sus propios buses, rutas y salidas sin depender del administrador**. |

## 4.3 Gestión de la empresa transportadora

| Código | Título | Actor | Historia de Usuario |
|--------|--------|-------|---------------------|
| [HU_004](HU_004-Gestionar-buses) | Gestionar buses | Operador de empresa | Como **operador de una empresa transportadora**, quiero **registrar los buses de mi empresa con su placa, capacidad y tipo de servicio**, para **saber cuántos asientos tiene cada salida**. |
| [HU_005](HU_005-Gestionar-rutas) | Gestionar rutas | Operador de empresa | Como **operador de una empresa transportadora**, quiero **registrar las rutas de mi empresa indicando el punto de transporte de donde salen, el destino y la duración**, para **que los pasajeros sepan desde qué punto de Pasto sale cada destino**. |
| [HU_006](HU_006-Programar-salidas) | Programar salidas | Operador de empresa | Como **operador de una empresa transportadora**, quiero **programar las salidas de mi empresa indicando la ruta, el bus, la fecha, la hora y el precio base**, para **que los viajeros vean los horarios y tarifas al día y puedan comprar tiquetes de ese viaje**. |
| [HU_007](HU_007-Consultar-reporte-de-ventas) | Consultar reporte de ventas | Operador de empresa, Administrador | Como **operador de empresa o administrador**, quiero **ver cuántos tiquetes se vendieron y cuánto se recaudó por empresa en un rango de fechas**, para **controlar la operación (el operador, la de su empresa; el administrador, la de todas)**. |

## 4.4 Consulta, comparación y planificación (principal)

| Código | Título | Actor | Historia de Usuario |
|--------|--------|-------|---------------------|
| [HU_014](HU_014-Consultar-puntos-de-transporte) | Consultar puntos de transporte | Visitante, Pasajero | Como **viajero (visitante o pasajero)**, quiero **ver los puntos de transporte de Pasto con su dirección, horario, empresas y destinos**, para **saber a cuál de ellos debo ir según el lugar al que quiero viajar**. |
| [HU_008](HU_008-Buscar-salidas) | Buscar salidas | Visitante, Pasajero | Como **viajero (visitante o pasajero)**, quiero **buscar salidas por destino y fecha, y si quiero filtrar por punto de transporte**, para **planificar mi viaje sabiendo desde dónde salgo, a qué hora y cuánto cuesta**. |
| [HU_015](HU_015-Comparar-salidas) | Comparar salidas | Visitante, Pasajero | Como **viajero (visitante o pasajero)**, quiero **comparar lado a lado varias salidas hacia el mismo destino**, para **escoger la que más me conviene por precio, hora de llegada, empresa o punto de salida**. |

## 4.5 Compra de tiquete (extra)

| Código | Título | Actor | Historia de Usuario |
|--------|--------|-------|---------------------|
| [HU_009](HU_009-Ver-asientos-disponibles) | Ver asientos disponibles | Visitante, Pasajero | Como **viajero (visitante o pasajero)**, quiero **ver el mapa de asientos de una salida**, para **escoger dónde sentarme**. |
| [HU_010](HU_010-Comprar-tiquete) | Comprar tiquete | Pasajero, Pasarela de pagos | Como **pasajero**, quiero **comprar un tiquete eligiendo la salida, el asiento y mi tipo de pasajero**, para **asegurar mi puesto en el viaje que planifiqué sin hacer fila en el punto de transporte**. |
| [HU_011](HU_011-Consultar-mis-tiquetes) | Consultar mis tiquetes | Pasajero | Como **pasajero**, quiero **ver la lista de mis tiquetes**, para **recordar la fecha, la hora, el asiento y el valor de mis viajes**. |
| [HU_012](HU_012-Cancelar-tiquete) | Cancelar tiquete | Pasajero | Como **pasajero**, quiero **cancelar un tiquete que ya no voy a usar**, para **liberar el asiento si no voy a viajar**. |

## 4.6 Mapa de Trazabilidad HU ↔ RF

| Código HU | Requisito Funcional (RF) Asociado | Descripción del Requisito |
|----------|-----------------------------------|---------------------------|
| [HU_001](HU_001-Registrarse-como-pasajero) | RF_001 | El sistema debe: registrar pasajeros validando que el correo no se repita y guardando la contraseña cifrada. |
| [HU_002](HU_002-Iniciar-sesión) | RF_002 | El sistema debe: autenticar usuarios por correo y contraseña e informar su rol (`PASAJERO`, `OPERADOR` o `ADMINISTRADOR`); los operadores desactivados no pueden entrar. |
| [HU_003](HU_003-Gestionar-empresas-transportadoras) | RF_003 | El sistema debe: crear, listar, actualizar y eliminar empresas transportadoras, sin permitir NIT repetido ni eliminar empresas con buses o rutas. |
| [HU_004](HU_004-Gestionar-buses) | RF_004 | El sistema debe: permitir al operador registrar los buses de su empresa con placa única, capacidad entre 10 y 45 y tipo de servicio. |
| [HU_005](HU_005-Gestionar-rutas) | RF_005 | El sistema debe: permitir al operador registrar las rutas de su empresa con punto de transporte de salida obligatorio, destino distinto de Pasto y duración mayor que 0. |
| [HU_006](HU_006-Programar-salidas) | RF_006 | El sistema debe: permitir al operador programar las salidas de su empresa validando que el bus sea de la empresa de la ruta y que no tenga otra salida a la misma fecha y hora. |
| [HU_007](HU_007-Consultar-reporte-de-ventas) | RF_007 | El sistema debe: generar el reporte de tiquetes vendidos y valor recaudado por empresa en un rango de fechas: el operador ve solo su empresa y el administrador todas. |
| [HU_008](HU_008-Buscar-salidas) | RF_008 | El sistema debe: buscar salidas futuras por destino y fecha, con filtro opcional por punto de transporte, ordenadas por hora o por precio, mostrando punto de salida, hora estimada de llegada y asientos libres. |
| [HU_009](HU_009-Ver-asientos-disponibles) | RF_009 | El sistema debe: mostrar el estado (libre u ocupado) de cada asiento de una salida. |
| [HU_010](HU_010-Comprar-tiquete) | RF_010 | El sistema debe: vender un tiquete por asiento libre a un pasajero con sesión iniciada, con código único y estado `ACTIVO`. |
| [HU_010](HU_010-Comprar-tiquete) | RF_011 | El sistema debe: calcular el precio final: precio base − descuento por tipo de pasajero + tasa de uso de terminal. |
| [HU_010](HU_010-Comprar-tiquete) | RF_018 | El sistema debe: solicitar la autorización del pago a la pasarela de pagos antes de emitir el tiquete, y no emitirlo si el pago es rechazado. |
| [HU_011](HU_011-Consultar-mis-tiquetes) | RF_012 | El sistema debe: listar los tiquetes de un pasajero del más reciente al más antiguo, con filtro por estado. |
| [HU_012](HU_012-Cancelar-tiquete) | RF_013 | El sistema debe: cancelar tiquetes activos con más de 2 horas de anticipación y liberar el asiento. |
| [HU_013](HU_013-Gestionar-puntos-de-transporte) | RF_014 | El sistema debe: crear, listar, actualizar y eliminar puntos de transporte, sin nombres repetidos ni eliminar puntos con rutas. |
| [HU_014](HU_014-Consultar-puntos-de-transporte) | RF_015 | El sistema debe: mostrar los puntos de transporte con su dirección, horario, empresas y destinos, e indicar desde qué punto sale un destino. |
| [HU_015](HU_015-Comparar-salidas) | RF_016 | El sistema debe: comparar de 2 a 4 salidas al mismo destino mostrando precio final por tipo de pasajero y hora estimada de llegada, y marcar la más barata y la más rápida. |
| [HU_016](HU_016-Gestionar-operadores-de-empresa) | RF_017 | El sistema debe: crear, listar, desactivar y reactivar cuentas de operador ligadas a una empresa, sin correos repetidos. |

## 4.7 Reglas de negocio

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

Total: **16 historias de usuario, 41 puntos**.
