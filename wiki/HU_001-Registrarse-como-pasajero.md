# HU_001 – Registrarse como pasajero

🔗 Issue en GitHub: [#1](https://github.com/abordo-pasto/abordo/issues/1)

| Identificación | Título |
|---|---|
| HU_001 | Registrarse como pasajero |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Visitante | 4.1 Cuenta de usuario | Alta | 3 puntos | RF_001 |

## Descripción

**Como** visitante (persona que usa la app sin cuenta), **quiero** crear una cuenta con mi nombre, documento, correo y contraseña, **para** quedar registrado como pasajero y poder comprar tiquetes a mi nombre.

## Criterios de aceptación

- Registro con datos válidos
- Registro con un correo ya registrado
- Registro con un dato obligatorio vacío
- La contraseña no se guarda tal como se escribió

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

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

</details>

## Mockup

![Mockup HU_001](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_001.png)

*Formulario de registro con el error de correo repetido, y confirmación de cuenta creada.*

## Validación INVEST

- I — Independent: ✅ No depende de ninguna otra historia.
- N — Negotiable: ✅ No dice cómo se guarda la cuenta ni cómo se cifra la contraseña.
- V — Valuable: ✅ Sin cuenta el pasajero no puede comprar ni consultar sus tiquetes.
- E — Estimable: ✅ Los datos y las validaciones están definidos.
- S — Small: ✅ Un solo formulario con validaciones simples.
- T — Testable: ✅ Cada caso tiene un resultado y un mensaje exactos.

## Supuestos

- La contraseña debe tener mínimo 8 caracteres (no se pidió más complejidad).
- Solo los pasajeros se registran solos. Las cuentas de los operadores de empresa las crea el administrador (HU_016) y la del administrador viene en los datos iniciales del sistema.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
