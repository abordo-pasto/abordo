# HU_007 – Consultar reporte de ventas

🔗 Issue en GitHub: [#8](https://github.com/abordo-pasto/abordo/issues/8)

| Identificación | Título |
|---|---|
| HU_007 | Consultar reporte de ventas |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Operador de empresa, Administrador | 4.3 Gestión de la empresa transportadora | Media | 3 puntos | RF_007 |

## Descripción

**Como** operador de empresa o administrador, **quiero** ver cuántos tiquetes se vendieron y cuánto se recaudó por empresa en un rango de fechas, **para** controlar la operación (el operador, la de su empresa; el administrador, la de todas).

## Criterios de aceptación

- Reporte con ventas en el rango
- Los tiquetes cancelados no cuentan
- El operador solo ve su empresa
- El administrador ve todas las empresas
- Rango sin ventas

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

```gherkin
# language: es
Característica: Reporte de ventas por empresa

  Antecedentes:
    Dado que entre el "2026-11-01" y el "2026-11-30" la empresa "Cootranar" tiene estos tiquetes:
      | estado    | precio final |
      | Activo    | $53.000      |
      | Usado     | $48.000      |
      | Cancelado | $53.000      |

  Escenario: Reporte con ventas en el rango
    Cuando el administrador pide el reporte del "2026-11-01" al "2026-11-30"
    Entonces ve para "Cootranar" 2 tiquetes vendidos
    Y un total recaudado de $101.000

  Escenario: Los tiquetes cancelados no cuentan
    Cuando el administrador pide el reporte del "2026-11-01" al "2026-11-30"
    Entonces el tiquete cancelado no suma ni a la cantidad ni al total

  Escenario: El operador solo ve su empresa
    Dado que en el mismo rango "Transipiales" también vendió tiquetes
    Cuando el operador de "Cootranar" pide el reporte del "2026-11-01" al "2026-11-30"
    Entonces solo ve la fila de "Cootranar"

  Escenario: El administrador ve todas las empresas
    Cuando el administrador pide el reporte del "2026-11-01" al "2026-11-30"
    Entonces ve una fila por "Cootranar" y otra por "Transipiales"

  Escenario: Rango sin ventas
    Cuando el administrador pide el reporte del "2026-12-01" al "2026-12-31"
    Entonces ve el mensaje "No hay ventas en ese rango"
```

</details>

## Mockup

![Mockup HU_007](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_007.png)

*Reporte del operador (solo su empresa) y reporte del administrador (todas las empresas).*

## Validación INVEST

- I — Independent: ⚠️ Necesita tiquetes vendidos (HU_010); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone formato de presentación ni de exportación.
- V — Valuable: ✅ Cada empresa conoce sus ventas y el administrador ve el total de la plataforma.
- E — Estimable: ✅ Cálculo definido.
- S — Small: ✅ Una sola consulta con totales.
- T — Testable: ✅ Los totales se pueden comparar con valores exactos.

## Supuestos

- El rango se filtra por la fecha de la salida, no por la fecha de compra.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
