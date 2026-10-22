### HU_001: Registrarse como pasajero

**Como** pasajero
**Quiero** crear una cuenta con mi nombre, documento, correo y contraseña
**Para** poder comprar tiquetes a mi nombre

**Prioridad:** Alta · **Estimación:** 3 puntos · **Requisitos:** RF_001

**Validación INVEST**
- I — Independent: ✅ No depende de ninguna otra historia.
- N — Negotiable: ✅ No dice cómo se guarda la cuenta ni cómo se cifra la contraseña.
- V — Valuable: ✅ Sin cuenta el pasajero no puede comprar ni consultar sus tiquetes.
- E — Estimable: ✅ Los datos y las validaciones están definidos.
- S — Small: ✅ Un solo formulario con validaciones simples.
- T — Testable: ✅ Cada caso tiene un resultado y un mensaje exactos.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Registro de pasajero

  Escenario: Registro con datos válidos
    Dado que no existe una cuenta con el correo "ana@correo.com"
    Cuando la persona se registra con nombre "Ana Ruiz", documento "1085123456", correo "ana@correo.com" y contraseña "Clave123"
    Entonces el sistema crea la cuenta como pasajero
    Y muestra el mensaje "Cuenta creada"

  Escenario: Registro con un correo ya registrado
    Dado que ya existe una cuenta con el correo "ana@correo.com"
    Cuando otra persona intenta registrarse con el correo "ana@correo.com"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "El correo ya está registrado"

  Esquema del escenario: Registro con un dato obligatorio vacío
    Cuando la persona se registra dejando vacío el campo "<campo>"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "El campo <campo> es obligatorio"

    Ejemplos:
      | campo      |
      | nombre     |
      | documento  |
      | correo     |
      | contraseña |

  Escenario: La contraseña no se guarda tal como se escribió
    Dado que la persona se registró con la contraseña "Clave123"
    Cuando se revisa la cuenta guardada
    Entonces la contraseña guardada es distinta de "Clave123"
```

**Supuestos / preguntas abiertas**
- La contraseña debe tener mínimo 8 caracteres (no se pidió más complejidad).
- Solo los pasajeros se registran solos; los administradores se crean con los datos iniciales del sistema.
