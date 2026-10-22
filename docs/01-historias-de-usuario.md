# Historias de usuario

**Proyecto:** Abordo
**Dominio:** consulta y compra de pasajes intermunicipales que salen de la Terminal de Transportes de Pasto.
**Tecnología:** Java 17 + Spring Boot 3, MongoDB, frontend opcional, pruebas con Postman.

## Problema

Para saber qué buses salen de la Terminal de Pasto, a qué hora y cuánto cuestan, una persona tiene que ir a la terminal o llamar a cada empresa. Abordo reúne en un solo sistema las empresas, rutas y salidas, y permite comprar el tiquete y elegir el asiento sin hacer fila.

## Actores

| Actor | Descripción |
|---|---|
| Pasajero | Persona que busca salidas, compra y consulta sus tiquetes. |
| Administrador | Empleado de la terminal que registra empresas, buses, rutas y salidas, y consulta las ventas. |

Los dos son tipos de **Usuario** (herencia en el diagrama de clases).

## Reglas de negocio

- **RN1. Precio final del tiquete** = precio base de la salida − descuento según tipo de pasajero + tasa de uso de la terminal.
- **RN2. Descuentos por tipo de pasajero:** General 0 %, Estudiante 10 %, Adulto mayor 20 %. Cada tipo es una clase que implementa la interfaz `CalculadoraTarifa` (polimorfismo).
- **RN3. Tasa de uso de terminal:** valor fijo configurable en `application.properties` (inicial: $3.000).
- **RN4.** Un asiento solo puede venderse una vez por salida.
- **RN5.** Un tiquete solo puede cancelarse si faltan más de 2 horas para la salida.
- **RN6.** Estados del tiquete (enumeración `EstadoTiquete`): `ACTIVO`, `CANCELADO`, `USADO`.

---

## Épica 1. Cuenta de usuario

### HU_001 Registrarse como pasajero
**Como** pasajero **quiero** crear una cuenta con mi nombre, documento, correo y contraseña **para** poder comprar tiquetes a mi nombre.
- Prioridad: Alta · Estimación: 3 puntos

**Criterios de aceptación**
1. Dado que envío todos los datos válidos, cuando me registro, entonces el sistema crea la cuenta con rol `PASAJERO` y responde 201.
2. Dado que el correo ya existe, cuando me registro, entonces el sistema responde 409 con el mensaje "El correo ya está registrado".
3. Dado que falta un campo obligatorio, cuando me registro, entonces el sistema responde 400 indicando el campo.
4. La contraseña nunca se guarda en texto plano.

### HU_002 Iniciar sesión
**Como** usuario (pasajero o administrador) **quiero** iniciar sesión con correo y contraseña **para** acceder a las funciones de mi rol.
- Prioridad: Alta · Estimación: 3 puntos

**Criterios de aceptación**
1. Dado un correo y contraseña correctos, cuando inicio sesión, entonces recibo mis datos y mi rol.
2. Dados datos incorrectos, cuando inicio sesión, entonces recibo 401 con "Correo o contraseña incorrectos".

---

## Épica 2. Administración de la terminal

### HU_003 Gestionar empresas transportadoras
**Como** administrador **quiero** crear, listar, editar y eliminar empresas (nombre, NIT, teléfono) **para** mantener actualizadas las empresas que operan en la terminal.
- Prioridad: Alta · Estimación: 2 puntos

**Criterios de aceptación**
1. Dado un NIT nuevo, cuando creo la empresa, entonces queda guardada y aparece en el listado.
2. Dado un NIT repetido, cuando creo la empresa, entonces recibo 409.
3. Dada una empresa con buses o rutas asociadas, cuando intento eliminarla, entonces recibo 409 y no se elimina.

### HU_004 Gestionar buses
**Como** administrador **quiero** registrar los buses de cada empresa (placa, capacidad, tipo de servicio) **para** saber cuántos asientos tiene cada salida.
- Prioridad: Alta · Estimación: 2 puntos

**Criterios de aceptación**
1. Dada una placa nueva y una empresa existente, cuando registro el bus, entonces queda asociado a esa empresa.
2. La capacidad debe estar entre 10 y 45 asientos; si no, recibo 400.
3. El tipo de servicio es una enumeración: `BASICO`, `PREFERENCIAL`, `DOS_PISOS`.

### HU_005 Gestionar rutas
**Como** administrador **quiero** registrar rutas (empresa, origen, destino, duración en minutos) **para** que los pasajeros puedan buscarlas.
- Prioridad: Alta · Estimación: 2 puntos

**Criterios de aceptación**
1. El origen por defecto es "Pasto".
2. Origen y destino no pueden ser iguales; si lo son, recibo 400.
3. La duración debe ser mayor que 0.

### HU_006 Programar salidas
**Como** administrador **quiero** programar salidas (ruta, bus, fecha, hora, precio base) **para** que se puedan vender tiquetes de ese viaje.
- Prioridad: Alta · Estimación: 3 puntos

**Criterios de aceptación**
1. Dada una ruta y un bus de la misma empresa, cuando programo la salida, entonces se crea con todos los asientos libres.
2. Si el bus es de otra empresa, recibo 400.
3. Un bus no puede tener dos salidas a la misma fecha y hora; si pasa, recibo 409.
4. El precio base debe ser mayor que 0.

### HU_007 Consultar reporte de ventas
**Como** administrador **quiero** ver cuántos tiquetes se vendieron y el total recaudado por empresa en un rango de fechas **para** controlar la operación.
- Prioridad: Media · Estimación: 3 puntos

**Criterios de aceptación**
1. Dado un rango de fechas, cuando pido el reporte, entonces veo por empresa: cantidad de tiquetes activos y usados, y valor total.
2. Los tiquetes cancelados no suman al total.

---

## Épica 3. Búsqueda y compra

### HU_008 Buscar salidas
**Como** pasajero **quiero** buscar salidas por destino y fecha **para** comparar horarios, empresas y precios.
- Prioridad: Alta · Estimación: 3 puntos

**Criterios de aceptación**
1. Dado un destino y una fecha, cuando busco, entonces veo las salidas con empresa, hora, precio base y asientos libres, ordenadas por hora.
2. Puedo ordenar por precio en lugar de por hora.
3. Si no hay salidas, recibo una lista vacía con el mensaje "No hay salidas para esa fecha".
4. No se muestran salidas cuya hora ya pasó.

### HU_009 Ver asientos disponibles
**Como** pasajero **quiero** ver el mapa de asientos de una salida **para** escoger dónde sentarme.
- Prioridad: Alta · Estimación: 2 puntos

**Criterios de aceptación**
1. Cuando consulto una salida, veo cada número de asiento con estado libre u ocupado.
2. Los asientos de tiquetes cancelados vuelven a aparecer libres.

### HU_010 Comprar tiquete
**Como** pasajero **quiero** comprar un tiquete eligiendo salida, asiento y tipo de pasajero **para** asegurar mi viaje.
- Prioridad: Alta · Estimación: 5 puntos

**Criterios de aceptación**
1. Dado un asiento libre, cuando compro, entonces se crea el tiquete en estado `ACTIVO` con un código único y el asiento queda ocupado.
2. El precio final se calcula con RN1 y RN2. Ejemplo: base $50.000, estudiante → 50.000 − 5.000 + 3.000 = **$48.000**.
3. Dado un asiento ocupado, cuando intento comprar, entonces recibo 409 "El asiento ya está ocupado".
4. El tipo de pasajero es una enumeración: `GENERAL`, `ESTUDIANTE`, `ADULTO_MAYOR`.

### HU_011 Consultar mis tiquetes
**Como** pasajero **quiero** ver mis tiquetes **para** recordar la fecha, hora, asiento y valor de mis viajes.
- Prioridad: Media · Estimación: 2 puntos

**Criterios de aceptación**
1. Veo mis tiquetes del más reciente al más antiguo, con su estado.
2. Puedo filtrar por estado.

### HU_012 Cancelar tiquete
**Como** pasajero **quiero** cancelar un tiquete **para** liberar el asiento si ya no voy a viajar.
- Prioridad: Media · Estimación: 2 puntos

**Criterios de aceptación**
1. Dado un tiquete `ACTIVO` y faltando más de 2 horas, cuando cancelo, entonces pasa a `CANCELADO` y el asiento queda libre.
2. Si faltan 2 horas o menos, recibo 409 "Ya no se puede cancelar".
3. No puedo cancelar un tiquete de otro pasajero (403).

---

## Resumen y trazabilidad

| HU | Actor | Prioridad | Requisitos |
|---|---|---|---|
| HU_001 | Pasajero | Alta | RF_001 |
| HU_002 | Ambos | Alta | RF_002 |
| HU_003 | Administrador | Alta | RF_003 |
| HU_004 | Administrador | Alta | RF_004 |
| HU_005 | Administrador | Alta | RF_005 |
| HU_006 | Administrador | Alta | RF_006 |
| HU_007 | Administrador | Media | RF_007 |
| HU_008 | Pasajero | Alta | RF_008 |
| HU_009 | Pasajero | Alta | RF_009 |
| HU_010 | Pasajero | Alta | RF_010, RF_011 |
| HU_011 | Pasajero | Media | RF_012 |
| HU_012 | Pasajero | Media | RF_013 |
