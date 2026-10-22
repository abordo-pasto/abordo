### HU_012: Cancelar tiquete

**Como** pasajero
**Quiero** cancelar un tiquete que ya no voy a usar
**Para** liberar el asiento si no voy a viajar

**Prioridad:** Media · **Estimación:** 2 puntos · **Requisitos:** RF_013

**Validación INVEST**
- I — Independent: ⚠️ Necesita un tiquete comprado (HU_010); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se registra la cancelación.
- V — Valuable: ✅ El pasajero corrige un cambio de planes y el asiento se puede volver a vender.
- E — Estimable: ✅ La regla de las 2 horas es clara.
- S — Small: ✅ Una acción con dos validaciones.
- T — Testable: ✅ Los límites de tiempo y los estados son exactos.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Cancelación de tiquete

  Antecedentes:
    Dado que el pasajero "ana@correo.com" tiene el tiquete "T-003" en estado "Activo"
    Y el tiquete es para la salida del "2026-11-20" a las "20:00" en el asiento 12

  Esquema del escenario: Cancelar según el tiempo que falta
    Dado que la hora actual es "<hora actual>" del "2026-11-20"
    Cuando el pasajero cancela el tiquete "T-003"
    Entonces el sistema "<resultado>" la cancelación

    Ejemplos:
      | hora actual | resultado |
      | 17:59       | acepta    |
      | 18:00       | rechaza   |
      | 19:30       | rechaza   |

  Escenario: Cancelación aceptada
    Dado que faltan más de 2 horas para la salida
    Cuando el pasajero cancela el tiquete "T-003"
    Entonces el tiquete queda en estado "Cancelado"
    Y el asiento 12 aparece libre

  Escenario: Cancelación con menos de 2 horas
    Dado que faltan 2 horas o menos para la salida
    Cuando el pasajero cancela el tiquete "T-003"
    Entonces el tiquete sigue en estado "Activo"
    Y muestra el mensaje "Ya no se puede cancelar"

  Escenario: Cancelar un tiquete de otro pasajero
    Dado que el tiquete "T-900" es de otro pasajero
    Cuando "ana@correo.com" intenta cancelar el tiquete "T-900"
    Entonces el sistema rechaza la cancelación
    Y muestra el mensaje "Este tiquete no es tuyo"

  Escenario: Cancelar un tiquete que no está activo
    Dado que el tiquete "T-001" está en estado "Usado"
    Cuando el pasajero intenta cancelarlo
    Entonces muestra el mensaje "Solo se pueden cancelar tiquetes activos"
```

**Supuestos / preguntas abiertas**
- No hay reembolso de dinero porque el sistema no maneja pagos reales.
