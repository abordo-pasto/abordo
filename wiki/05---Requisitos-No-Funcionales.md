# 05 - Requisitos No Funcionales

Los requisitos no funcionales establecen las condiciones técnicas y de calidad que debe cumplir Abordo.

---

## 5.1 Requisitos No Funcionales (RNF)

### 5.1.1 Tecnología

**RNF_001 – Tecnología:**
El backend se construye en Java 17 con Spring Boot 3 y expone una API REST con JSON.

| Identificación | Categoría | Versión |
|---|---|---|
| EC001 | Tecnología | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Equipo de desarrollo | Construcción del backend | API REST | Desarrollo |

---

### 5.1.2 Persistencia

**RNF_002 – Persistencia:**
Los datos se guardan en MongoDB (colecciones: usuarios, puntos de transporte, empresas, buses, rutas, salidas, tiquetes).

| Identificación | Categoría | Versión |
|---|---|---|
| EC002 | Persistencia | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Equipo de desarrollo | Guardar y consultar información | Base de datos MongoDB | Operación normal |

---

### 5.1.3 Arquitectura

**RNF_003 – Arquitectura:**
El backend sigue una arquitectura por capas: Controlador → Servicio → Repositorio → Modelo, con DTO para entrada y salida.

| Identificación | Categoría | Versión |
|---|---|---|
| EC003 | Arquitectura | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Profesor / desarrollador | Cambio en una regla de negocio | Capas del backend | Mantenimiento |

---

### 5.1.4 Seguridad

**RNF_004 – Seguridad:**
Las contraseñas se guardan con BCrypt; ninguna clave ni contraseña de base de datos se sube al repositorio. Cada endpoint valida el rol, y un operador solo accede a los datos de su empresa.

| Identificación | Categoría | Versión |
|---|---|---|
| EC004 | Seguridad | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Usuario registrado | Inicio de sesión y acceso a datos | Módulo de autenticación | Operación normal |

---

### 5.1.5 Mantenibilidad

**RNF_005 – Mantenibilidad:**
Los valores de negocio que pueden cambiar (tasa de uso, porcentajes de descuento) se leen de configuración o de una sola clase, para cambiarlos en un minuto.

| Identificación | Categoría | Versión |
|---|---|---|
| EC005 | Mantenibilidad | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Profesor / administrador | Cambio de la tasa o de un descuento | Configuración de tarifas | Mantenimiento |

---

### 5.1.6 Usabilidad de la API

**RNF_006 – Usabilidad de la API:**
Los errores devuelven código HTTP correcto (400, 401, 403, 404, 409) y un mensaje en español.

| Identificación | Categoría | Versión |
|---|---|---|
| EC006 | Usabilidad de la API | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| App móvil | Petición con datos inválidos | API REST | Operación normal |

---

### 5.1.7 Rendimiento

**RNF_007 – Rendimiento:**
Una búsqueda de salidas responde en menos de 2 segundos con hasta 1.000 salidas guardadas.

| Identificación | Categoría | Versión |
|---|---|---|
| EC007 | Rendimiento | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Viajero | Búsqueda de salidas | Servicio de búsqueda | 1.000 salidas guardadas |

---

### 5.1.8 Facilidad de prueba

**RNF_008 – Facilidad de prueba:**
Todos los endpoints se pueden probar con una colección de Postman incluida en el repositorio.

| Identificación | Categoría | Versión |
|---|---|---|
| EC008 | Facilidad de prueba | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Profesor / evaluador | Prueba en vivo de los endpoints | Colección de Postman | Sustentación |

---

### 5.1.9 Portabilidad

**RNF_009 – Portabilidad:**
El backend corre en local con `mvn spring-boot:run` y se puede desplegar en la nube (AWS) con una variable de entorno para la conexión a MongoDB.

| Identificación | Categoría | Versión |
|---|---|---|
| EC009 | Portabilidad | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Equipo de desarrollo | Despliegue | Backend | Local y nube (AWS) |

---

### 5.1.10 Documentación

**RNF_010 – Documentación:**
El repositorio incluye las historias, los requisitos y los diagramas UML exportados desde Visual Paradigm.

| Identificación | Categoría | Versión |
|---|---|---|
| EC010 | Documentación | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Profesor | Revisión del diseño | Repositorio y wiki | Evaluación |

---

### 5.1.11 Plataforma móvil

**RNF_011 – Plataforma móvil:**
La API está pensada para ser consumida desde una aplicación móvil (frontend opcional): respuestas en JSON livianas y sin depender de sesiones del navegador.

| Identificación | Categoría | Versión |
|---|---|---|
| EC011 | Plataforma móvil | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Viajero | Uso desde el celular | API REST | Red móvil |

---

### 5.1.12 Integración

**RNF_012 – Integración:**
La pasarela de pagos se usa a través de una interfaz propia del sistema, para poder cambiar la pasarela simulada por una real sin modificar la lógica de venta.

| Identificación | Categoría | Versión |
|---|---|---|
| EC012 | Integración | 1.0 |

| Fuente | Estímulo | Artefacto | Ambiente |
|---|---|---|---|
| Equipo de desarrollo | Cambio de proveedor de pagos | Interfaz de pasarela de pagos | Mantenimiento |

---

## 5.2 Objetivos de Negocio

| Objetivo | Tiempo estimado | Beneficio esperado |
|---|---|---|
| Centralizar la información de los tres puntos de transporte de Pasto | 1 mes | El viajero sabe a qué punto ir sin desplazarse ni llamar |
| Permitir comparar salidas por precio, hora y empresa | 1 mes | Decisiones de viaje más rápidas y económicas |
| Que cada empresa actualice sus propias salidas | 1.5 meses | Información de horarios y tarifas siempre al día |
| Ofrecer la compra del tiquete desde el celular (extra) | 2 meses | Menos filas en las taquillas |

---

## 5.3 Restricciones de Negocio

### Restricción 1
| Descripción | Usuario | Justificación |
|---|---|---|
| El backend debe estar listo para la sustentación del 18 de noviembre de 2026. | Profesor | Fecha de la entrega final. |

### Restricción 2
| Descripción | Usuario | Justificación |
|---|---|---|
| Un operador solo gestiona la información de su propia empresa. | Empresas transportadoras | Cada empresa responde por sus datos. |

### Restricción 3
| Descripción | Usuario | Justificación |
|---|---|---|
| Un tiquete solo se cancela si faltan más de 2 horas para la salida. | Empresas transportadoras | Dar tiempo para volver a vender el asiento. |

### Restricción 4
| Descripción | Usuario | Justificación |
|---|---|---|
| El precio final es: precio base − descuento por tipo de pasajero + tasa de uso de la terminal ($3.000). | Puntos de transporte | Cobro de la tasa de uso de la terminal. |

---

## 5.4 Modelo de Datos del Sistema

Colecciones principales en MongoDB:

### **Usuario** (Pasajero, OperadorEmpresa, Administrador)
- id, nombre, documento, correo, contrasenaCifrada, rol, activo
- empresaId (solo operador)

### **PuntoTransporte**
- id, nombre, direccion, horarioAtencion, zonaQueAtiende

### **EmpresaTransportadora**
- id, nombre, nit, telefono

### **Bus**
- id, placa, capacidad, tipoServicio, empresaId

### **Ruta**
- id, empresaId, puntoTransporteId, destino, duracionMinutos

### **Salida**
- id, rutaId, busId, fecha, hora, precioBase, asientosOcupados

### **Tiquete**
- id, codigo, salidaId, pasajeroId, asiento, tipoPasajero, precioFinal, estado, fechaCompra

Enumeraciones: **Rol** (PASAJERO, OPERADOR, ADMINISTRADOR), **TipoPasajero** (GENERAL, ESTUDIANTE, ADULTO_MAYOR), **TipoServicio** (BASICO, PREFERENCIAL, DOS_PISOS), **EstadoTiquete** (ACTIVO, CANCELADO, USADO).

---

## 5.5 Escenarios de Calidad

### **Escenario de Rendimiento (RNF_007)**
**Estímulo:** Un viajero busca salidas a Cali para una fecha.
**Respuesta:** El sistema devuelve las salidas ordenadas con punto, hora de llegada y asientos libres.
**Medición:** Respuesta en menos de 2 segundos con 1.000 salidas guardadas.

---

### **Escenario de Seguridad (RNF_004)**
**Estímulo:** El operador de Cootranar intenta registrar un bus para Transipiales.
**Respuesta:** El sistema rechaza la petición con el mensaje "Solo puede gestionar la información de su empresa".
**Medición:** 100 % de las peticiones de otra empresa rechazadas.

---

### **Escenario de Mantenibilidad (RNF_005)**
**Estímulo:** El profesor pide cambiar el descuento de estudiante del 10 % al 15 %.
**Respuesta:** Se cambia un solo valor y los precios se recalculan.
**Medición:** Cambio hecho en menos de 1 minuto, tocando un solo lugar.

---

### **Escenario de Integración (RNF_012)**
**Estímulo:** Se reemplaza la pasarela simulada por una pasarela real.
**Respuesta:** Solo se agrega una nueva implementación de la interfaz de pagos.
**Medición:** Cero cambios en la lógica de venta de tiquetes.

---

### **Escenario de Facilidad de prueba (RNF_008)**
**Estímulo:** El profesor pide crear y consultar un registro en vivo.
**Respuesta:** Se ejecuta la petición desde la colección de Postman.
**Medición:** Cada endpoint tiene al menos un ejemplo listo en la colección.
