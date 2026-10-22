### HU_003: Gestionar empresas transportadoras

**Como** administrador
**Quiero** registrar, consultar, editar y eliminar las empresas transportadoras (nombre, NIT y teléfono)
**Para** mantener actualizada la lista de empresas que operan en la terminal

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_003

**Validación INVEST**
- I — Independent: ✅ No depende de otra historia.
- N — Negotiable: ✅ No dice cómo se guardan ni cómo se muestran los datos.
- V — Valuable: ✅ Sin empresas no se pueden registrar buses ni rutas.
- E — Estimable: ✅ Es la gestión de una entidad con tres datos.
- S — Small: ✅ Entidad simple; las cuatro operaciones caben en una iteración.
- T — Testable: ✅ Cada operación tiene un resultado verificable.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Gestión de empresas transportadoras

  Escenario: Registrar una empresa nueva
    Dado que no existe una empresa con NIT "900123456"
    Cuando el administrador registra la empresa "Transipiales" con NIT "900123456" y teléfono "6027201234"
    Entonces la empresa aparece en el listado de empresas

  Escenario: Registrar una empresa con NIT repetido
    Dado que ya existe una empresa con NIT "900123456"
    Cuando el administrador registra otra empresa con NIT "900123456"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "Ya existe una empresa con ese NIT"

  Escenario: Editar el teléfono de una empresa
    Dado que existe la empresa "Transipiales"
    Cuando el administrador cambia su teléfono a "6027209999"
    Entonces el listado muestra "Transipiales" con teléfono "6027209999"

  Escenario: Eliminar una empresa sin buses ni rutas
    Dado que la empresa "Transipiales" no tiene buses ni rutas
    Cuando el administrador la elimina
    Entonces la empresa ya no aparece en el listado

  Escenario: Eliminar una empresa con buses o rutas
    Dado que la empresa "Cootranar" tiene buses registrados
    Cuando el administrador intenta eliminarla
    Entonces el sistema no la elimina
    Y muestra el mensaje "La empresa tiene buses o rutas asociadas"
```

**Supuestos / preguntas abiertas**
- Solo el administrador puede gestionar empresas.
