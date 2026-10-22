### HU_006: Programar salidas

**Como** administrador
**Quiero** programar salidas indicando la ruta, el bus, la fecha, la hora y el precio base
**Para** que se puedan vender tiquetes de ese viaje

**Prioridad:** Alta · **Estimación:** 3 puntos · **Requisitos:** RF_006

**Validación INVEST**
- I — Independent: ⚠️ Necesita una ruta (HU_005) y un bus (HU_004); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se guardan las salidas ni los asientos.
- V — Valuable: ✅ Es lo que el pasajero busca y compra.
- E — Estimable: ✅ Reglas claras.
- S — Small: ✅ Un registro con cuatro validaciones.
- T — Testable: ✅ Resultados exactos.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Programación de salidas

  Antecedentes:
    Dado que la empresa "Cootranar" tiene la ruta "Pasto - Cali" y el bus "ABC123" de 40 asientos

  Escenario: Programar una salida válida
    Cuando el administrador programa una salida de "Pasto - Cali" con el bus "ABC123" el "2026-11-20" a las "20:00" con precio base $50.000
    Entonces la salida queda programada
    Y tiene 40 asientos libres

  Escenario: Bus de otra empresa
    Dado que el bus "XYZ789" es de la empresa "Transipiales"
    Cuando el administrador programa una salida de "Pasto - Cali" de "Cootranar" con el bus "XYZ789"
    Entonces el sistema rechaza la salida
    Y muestra el mensaje "El bus no pertenece a la empresa de la ruta"

  Escenario: Bus con otra salida a la misma fecha y hora
    Dado que el bus "ABC123" ya tiene una salida el "2026-11-20" a las "20:00"
    Cuando el administrador programa otra salida con el bus "ABC123" el "2026-11-20" a las "20:00"
    Entonces el sistema rechaza la salida
    Y muestra el mensaje "El bus ya tiene una salida a esa hora"

  Escenario: Precio base no válido
    Cuando el administrador programa una salida con precio base $0
    Entonces el sistema rechaza la salida
    Y muestra el mensaje "El precio debe ser mayor que 0"
```

**Supuestos / preguntas abiertas**
- No se validan cruces de horario por la duración del viaje; solo la misma fecha y hora exactas.
