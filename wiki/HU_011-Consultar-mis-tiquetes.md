# HU_011 – Consultar mis tiquetes

🔗 Issue en GitHub: [#11](https://github.com/abordo-pasto/abordo/issues/11)

| Identificación | Título |
|---|---|
| HU_011 | Consultar mis tiquetes |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Pasajero | 4.5 Compra de tiquete (extra) | Baja (funcionalidad extra) | 2 puntos | RF_012 |

## Descripción

**Como** pasajero, **quiero** ver la lista de mis tiquetes, **para** recordar la fecha, la hora, el asiento y el valor de mis viajes.

## Criterios de aceptación

- Ver todos mis tiquetes
- Filtrar por estado
- Solo ve sus propios tiquetes

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

```gherkin
# language: es
Característica: Mis tiquetes

  Antecedentes:
    Dado que el pasajero "ana@correo.com" tiene estos tiquetes:
      | código | fecha de compra | estado    |
      | T-001  | 2026-11-02      | Usado     |
      | T-002  | 2026-11-10      | Cancelado |
      | T-003  | 2026-11-15      | Activo    |

  Escenario: Ver todos mis tiquetes
    Cuando el pasajero consulta sus tiquetes
    Entonces ve "T-003", "T-002" y "T-001" en ese orden
    Y cada uno muestra destino, fecha, hora, asiento, precio final y estado

  Escenario: Filtrar por estado
    Cuando el pasajero consulta sus tiquetes con estado "Activo"
    Entonces solo ve el tiquete "T-003"

  Escenario: Solo ve sus propios tiquetes
    Dado que otro pasajero tiene el tiquete "T-900"
    Cuando "ana@correo.com" consulta sus tiquetes
    Entonces no ve el tiquete "T-900"
```

</details>

## Mockup

![Mockup HU_011](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_011.png)

*Lista de tiquetes del pasajero con filtro por estado.*

## Validación INVEST

- I — Independent: ⚠️ Necesita tiquetes comprados (HU_010); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se muestra la lista.
- V — Valuable: ✅ El pasajero tiene a mano la información de su viaje.
- E — Estimable: ✅ Orden y filtro definidos.
- S — Small: ✅ Una consulta con un filtro.
- T — Testable: ✅ El orden y el filtro se pueden verificar.

## Supuestos

- "Más reciente" se toma por la fecha de compra.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
