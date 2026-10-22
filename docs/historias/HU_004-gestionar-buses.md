### HU_004: Gestionar buses

**Como** administrador
**Quiero** registrar los buses de cada empresa con su placa, capacidad y tipo de servicio
**Para** saber cuántos asientos tiene cada salida

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_004

**Validación INVEST**
- I — Independent: ⚠️ El bus pertenece a una empresa (HU_003); se puede probar con una empresa de los datos iniciales.
- N — Negotiable: ✅ No impone cómo se guardan los buses.
- V — Valuable: ✅ La capacidad del bus define los asientos que se pueden vender.
- E — Estimable: ✅ Datos y límites definidos.
- S — Small: ✅ Entidad simple con pocas validaciones.
- T — Testable: ✅ Límites numéricos y valores permitidos exactos.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Gestión de buses

  Escenario: Registrar un bus válido
    Dado que existe la empresa "Cootranar"
    Y no existe un bus con placa "ABC123"
    Cuando el administrador registra el bus "ABC123" con capacidad 40 y servicio "Preferencial" para "Cootranar"
    Entonces el bus aparece en el listado de buses de "Cootranar"

  Escenario: Registrar un bus con placa repetida
    Dado que ya existe un bus con placa "ABC123"
    Cuando el administrador registra otro bus con placa "ABC123"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "Ya existe un bus con esa placa"

  Esquema del escenario: Validar la capacidad del bus
    Cuando el administrador registra un bus con capacidad <capacidad>
    Entonces el sistema "<resultado>" el registro

    Ejemplos:
      | capacidad | resultado |
      | 9         | rechaza   |
      | 10        | acepta    |
      | 45        | acepta    |
      | 46        | rechaza   |

  Escenario: Tipos de servicio permitidos
    Cuando el administrador registra un bus
    Entonces solo puede escoger el servicio "Básico", "Preferencial" o "Dos pisos"
```

**Supuestos / preguntas abiertas**
- Los asientos se numeran del 1 a la capacidad del bus.
