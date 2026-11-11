### HU_004: Gestionar buses

**Como** operador de una empresa transportadora
**Quiero** registrar los buses de mi empresa con su placa, capacidad y tipo de servicio
**Para** saber cuántos asientos tiene cada salida

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_004

**Mockup**

![Mockup HU_004](../mockups/HU_004.png)

**Validación INVEST**
- I — Independent: ⚠️ El bus pertenece a una empresa (HU_003) y lo registra su operador (HU_016); se puede probar con los datos iniciales.
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
    Cuando el operador de "Cootranar" registra el bus "ABC123" con capacidad 40 y servicio "Preferencial"
    Entonces el bus aparece en el listado de buses de "Cootranar"

  Escenario: Registrar un bus con placa repetida
    Dado que ya existe un bus con placa "ABC123"
    Cuando el operador registra otro bus con placa "ABC123"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "Ya existe un bus con esa placa"

  Esquema del escenario: Validar la capacidad del bus
    Cuando el operador registra un bus con capacidad <capacidad>
    Entonces el sistema "<resultado>" el registro

    Ejemplos:
      | capacidad | resultado |
      | 9         | rechaza   |
      | 10        | acepta    |
      | 45        | acepta    |
      | 46        | rechaza   |

  Escenario: Tipos de servicio permitidos
    Cuando el operador registra un bus
    Entonces solo puede escoger el servicio "Básico", "Preferencial" o "Dos pisos"

  Escenario: Registrar un bus para otra empresa
    Dado que el usuario es operador de "Cootranar"
    Cuando intenta registrar un bus para la empresa "Transipiales"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "Solo puede gestionar la información de su empresa"
```

**Supuestos / preguntas abiertas**
- Los asientos se numeran del 1 a la capacidad del bus.
- El administrador puede ver los buses de todas las empresas, pero quien los registra es el operador de cada empresa.
