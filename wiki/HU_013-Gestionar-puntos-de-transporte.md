# HU_013 – Gestionar puntos de transporte

| Identificación | Título |
|---|---|
| HU_013 | Gestionar puntos de transporte |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Administrador | 4.2 Administración de la plataforma | Alta | 2 puntos | RF_014 |

## Descripción

**Como** administrador, **quiero** registrar, consultar, editar y eliminar los puntos de transporte terrestre de Pasto (nombre, dirección, horario de atención y zona que atiende), **para** que cada ruta quede asociada al punto real desde donde sale.

## Criterios de aceptación

- Registrar los puntos de transporte de Pasto
- Nombre repetido
- Editar el horario de atención
- Eliminar un punto con rutas

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

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

</details>

## Mockup

![Mockup HU_013](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_013.png)

*Listado de los tres puntos de transporte de Pasto y edición de un punto.*

## Validación INVEST

- I — Independent: ✅ No depende de otra historia.
- N — Negotiable: ✅ No impone cómo se guardan ni cómo se muestran los puntos.
- V — Valuable: ✅ Es lo que permite centralizar la información de los tres puntos de la ciudad.
- E — Estimable: ✅ Gestión de una entidad con cuatro datos.
- S — Small: ✅ Entidad simple.
- T — Testable: ✅ Cada operación tiene un resultado verificable.

## Supuestos

- Las direcciones y horarios de atención se cargan con los datos reales de cada punto.
- Los datos iniciales del sistema traen los tres puntos ya registrados.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
