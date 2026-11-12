# HU_002 – Iniciar sesión

🔗 Issue en GitHub: [#2](https://github.com/abordo-pasto/abordo/issues/2)

| Identificación | Título |
|---|---|
| HU_002 | Iniciar sesión |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Pasajero, Operador, Administrador | 4.1 Cuenta de usuario | Alta | 3 puntos | RF_002 |

## Descripción

**Como** usuario registrado (pasajero, operador de empresa o administrador), **quiero** iniciar sesión con mi correo y contraseña, **para** acceder a las funciones que corresponden a mi rol.

## Criterios de aceptación

- Inicio de sesión correcto
- Inicio de sesión con datos incorrectos

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

```gherkin
# language: es
Característica: Inicio de sesión

  Esquema del escenario: Inicio de sesión correcto
    Dado que existe la cuenta "<correo>" con contraseña "Clave123" y rol "<rol>"
    Cuando el usuario inicia sesión con "<correo>" y "Clave123"
    Entonces el sistema le da acceso
    Y le muestra su nombre y su rol "<rol>"

    Ejemplos:
      | correo                | rol           |
      | ana@correo.com        | Pasajero      |
      | operador@cootranar.co | Operador      |
      | admin@abordo.co       | Administrador |

  Esquema del escenario: Inicio de sesión con datos incorrectos
    Cuando el usuario inicia sesión con correo "<correo>" y contraseña "<contraseña>"
    Entonces el sistema no le da acceso
    Y muestra el mensaje "Correo o contraseña incorrectos"

    Ejemplos:
      | correo              | contraseña |
      | ana@correo.com      | Otra999    |
      | nadie@correo.com    | Clave123   |
```

</details>

## Mockup

![Mockup HU_002](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_002.png)

*Inicio de sesión con el error de credenciales, y los tres roles que pueden ingresar.*

## Validación INVEST

- I — Independent: ⚠️ Para probarla con un pasajero se necesita una cuenta (HU_001); se puede probar con las cuentas de los datos iniciales.
- N — Negotiable: ✅ No impone un mecanismo de sesión concreto.
- V — Valuable: ✅ Separa lo que puede hacer cada rol: pasajero, operador de empresa y administrador.
- E — Estimable: ✅ Solo dos resultados posibles: entra o no entra.
- S — Small: ✅ Una sola acción.
- T — Testable: ✅ Resultado y mensaje exactos en cada caso.

## Supuestos

- El mensaje de error es el mismo si el correo no existe o si la contraseña está mal, para no revelar qué correos están registrados.
- No hay bloqueo por intentos fallidos.
- El operador queda ligado a una sola empresa y solo ve la información de esa empresa.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
