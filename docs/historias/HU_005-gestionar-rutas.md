### HU_005: Gestionar rutas

**Como** administrador
**Quiero** registrar las rutas de cada empresa con su origen, destino y duración
**Para** que los pasajeros puedan buscar viajes a esos destinos

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_005

**Validación INVEST**
- I — Independent: ⚠️ La ruta pertenece a una empresa (HU_003); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se guardan las rutas.
- V — Valuable: ✅ Sin rutas no hay destinos para buscar.
- E — Estimable: ✅ Tres validaciones claras.
- S — Small: ✅ Entidad simple.
- T — Testable: ✅ Cada validación tiene un resultado exacto.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Gestión de rutas

  Escenario: Registrar una ruta válida
    Dado que existe la empresa "Cootranar"
    Cuando el administrador registra la ruta de "Pasto" a "Ipiales" con duración de 90 minutos para "Cootranar"
    Entonces la ruta aparece en el listado de rutas de "Cootranar"

  Escenario: El origen por defecto es Pasto
    Cuando el administrador registra una ruta sin indicar el origen
    Entonces la ruta queda con origen "Pasto"

  Escenario: Origen y destino iguales
    Cuando el administrador registra una ruta de "Pasto" a "Pasto"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "El origen y el destino deben ser distintos"

  Escenario: Duración no válida
    Cuando el administrador registra una ruta con duración de 0 minutos
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "La duración debe ser mayor que 0"
```

**Supuestos / preguntas abiertas**
- Dos empresas distintas pueden tener la misma ruta (por ejemplo, Pasto a Cali).
