# Diagramas de Abordo

Hechos en Visual Paradigm Community Edition. Cada diagrama sale de las historias de usuario (`docs/historias/`) y de los requisitos (`docs/02-requisitos.md`).

| Diagrama | Archivo | Qué muestra | Trazabilidad |
|---|---|---|---|
| Contexto (nivel 0) | [vista-contexto.png](vista-contexto.png) | Abordo como un solo proceso con sus 5 actores externos: Visitante, Pasajero, Operador de empresa, Administrador y Pasarela de pagos | HU_001 a HU_016 (nota en el diagrama) |
| Vista funcional (componentes) | [vista-funcional.png](vista-funcional.png) | Interfaces que ofrece el sistema por funcionalidad | RF_001 a RF_018 |
| Vista lógica (clases del dominio) | [vista-logica.png](vista-logica.png) | Clases de `com.abordo.model` y `model.tarifa`, asociaciones con multiplicidad, herencia de Usuario y patrones GRASP resaltados por color | HU_003 a HU_016 |
| Vista de desarrollo (tres capas) | [vista-desarrollo.png](vista-desarrollo.png) | Paquetes Presentacion_Controller, Negocio_Service, Datos_Repository y Modelo_de_Dominio, con las clases reales del backend | Todas las HU |
| Vista de despliegue | [vista-despliegue.png](vista-despliegue.png) | Navegador, Vercel, Render (Docker), MongoDB Atlas y GitHub | RNF de disponibilidad y despliegue |
| Secuencia: comprar tiquete | [secuencia-comprar-tiquete.png](secuencia-comprar-tiquete.png) | Flujo de compra con asiento ocupado (409), pago rechazado (402) y compra exitosa (201) | HU_010 |
| Secuencia: buscar salidas | [secuencia-buscar-salidas.png](secuencia-buscar-salidas.png) | Búsqueda por destino y fecha, sin rutas (200 con lista vacía) y con resultados (200) | HU_008 |

## Patrones GRASP en el diseño

- **Controlador:** cada `*Controller` recibe la petición HTTP y delega en su servicio.
- **Experto:** `Usuario` verifica su contraseña, `Ruta` calcula la hora de llegada, `Salida` sabe qué asientos están libres, `Tiquete` sabe si se puede cancelar.
- **Creador:** `Salida.emitirTiquete()` crea el `Tiquete`; `ReporteVentas` crea sus `LineaReporte`.
- **Polimorfismo:** `CalculadoraTarifa` con `TarifaGeneral`, `TarifaEstudiante` y `TarifaAdultoMayor`.
- **Fabricación pura:** `FabricaTarifas` elige la calculadora según el tipo de pasajero.
- **Variaciones protegidas / Indirección:** `CalculadoraTarifa` y `PasarelaPagos` aíslan lo que puede cambiar (tarifas y proveedor de pagos).
