### HU_013: Gestionar puntos de transporte

**Como** administrador
**Quiero** registrar, consultar, editar y eliminar los puntos de transporte terrestre de Pasto (nombre, dirección, horario de atención y zona que atiende)
**Para** que cada ruta quede asociada al punto real desde donde sale

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_014

**Validación INVEST**
- I — Independent: ✅ No depende de otra historia.
- N — Negotiable: ✅ No impone cómo se guardan ni cómo se muestran los puntos.
- V — Valuable: ✅ Es lo que permite centralizar la información de los tres puntos de la ciudad.
- E — Estimable: ✅ Gestión de una entidad con cuatro datos.
- S — Small: ✅ Entidad simple.
- T — Testable: ✅ Cada operación tiene un resultado verificable.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Gestión de puntos de transporte

  Esquema del escenario: Registrar los puntos de transporte de Pasto
    Cuando el administrador registra el punto "<nombre>" con zona que atiende "<zona>"
    Entonces el punto aparece en el listado de puntos de transporte

    Ejemplos:
      | nombre                           | zona                                         |
      | Terminal de Transportes de Pasto | Ciudades y municipios intermunicipales       |
      | Terminal Mixto                   | Pueblos y veredas cercanas                   |
      | Terminal Torobajo                   | Municipios del norte (Sandoná, Genoy, La Florida) |

  Escenario: Nombre repetido
    Dado que ya existe el punto "Terminal Mixto"
    Cuando el administrador registra otro punto llamado "Terminal Mixto"
    Entonces el sistema rechaza el registro
    Y muestra el mensaje "Ya existe un punto con ese nombre"

  Escenario: Editar el horario de atención
    Dado que existe el punto "Terminal Torobajo"
    Cuando el administrador cambia su horario de atención a "5:00 a 19:00"
    Entonces el listado muestra "Terminal Torobajo" con horario "5:00 a 19:00"

  Escenario: Eliminar un punto con rutas
    Dado que el punto "Terminal Torobajo" tiene rutas registradas
    Cuando el administrador intenta eliminarlo
    Entonces el sistema no lo elimina
    Y muestra el mensaje "El punto tiene rutas asociadas"
```

**Supuestos / preguntas abiertas**
- Las direcciones y horarios de atención se cargan con los datos reales de cada punto.
- Los datos iniciales del sistema traen los tres puntos ya registrados.
