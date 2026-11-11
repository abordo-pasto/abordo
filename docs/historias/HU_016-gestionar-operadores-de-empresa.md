### HU_016: Gestionar operadores de empresa

**Como** administrador
**Quiero** crear, consultar, desactivar y reactivar las cuentas de los operadores de cada empresa transportadora
**Para** que cada empresa mantenga al día sus propios buses, rutas y salidas sin depender del administrador

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_017

**Mockup**

![Mockup HU_016](../mockups/HU_016.png)

**Validación INVEST**
- I — Independent: ⚠️ El operador pertenece a una empresa (HU_003); se puede probar con una empresa de los datos iniciales.
- N — Negotiable: ✅ No impone cómo se guarda la cuenta ni cómo se envía la contraseña inicial.
- V — Valuable: ✅ Reparte el trabajo: cada empresa actualiza su propia información.
- E — Estimable: ✅ Una cuenta con un dato extra (la empresa) y dos estados.
- S — Small: ✅ Gestión de una entidad simple.
- T — Testable: ✅ Cada operación tiene un resultado y un mensaje exactos.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Gestión de operadores de empresa

  Escenario: Crear un operador para una empresa
    Dado que existe la empresa "Cootranar"
    Y no existe una cuenta con el correo "operador@cootranar.co"
    Cuando el administrador crea el operador "Luis Paz" con correo "operador@cootranar.co" para "Cootranar"
    Entonces el operador aparece en el listado de operadores de "Cootranar"
    Y puede iniciar sesión con el rol "Operador"

  Escenario: Correo ya registrado
    Dado que ya existe una cuenta con el correo "operador@cootranar.co"
    Cuando el administrador crea otro operador con ese correo
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "El correo ya está registrado"

  Escenario: Operador sin empresa
    Cuando el administrador crea un operador sin escoger la empresa
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "Debe indicar la empresa del operador"

  Escenario: Desactivar un operador
    Dado que el operador "operador@cootranar.co" está activo
    Cuando el administrador lo desactiva
    Entonces el operador ya no puede iniciar sesión
    Y los buses, rutas y salidas que registró se conservan
```

**Supuestos / preguntas abiertas**
- Una empresa puede tener varios operadores; cada operador pertenece a una sola empresa.
- Los operadores no se eliminan, se desactivan, para no perder quién registró cada dato.
