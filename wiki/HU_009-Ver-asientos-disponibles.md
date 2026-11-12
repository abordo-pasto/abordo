# HU_009 – Ver asientos disponibles

🔗 Issue en GitHub: [#9](https://github.com/abordo-pasto/abordo/issues/9)

| Identificación | Título |
|---|---|
| HU_009 | Ver asientos disponibles |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Visitante, Pasajero | 4.5 Compra de tiquete (extra) | Media (funcionalidad extra) | 2 puntos | RF_009 |

## Descripción

**Como** viajero (visitante o pasajero), **quiero** ver el mapa de asientos de una salida, **para** escoger dónde sentarme.

## Criterios de aceptación

- Ver asientos libres y ocupados
- Un asiento de un tiquete cancelado vuelve a estar libre

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

```gherkin
# language: es
Característica: Mapa de asientos

  Escenario: Ver asientos libres y ocupados
    Dado que la salida a "Cali" del "2026-11-20" a las "20:00" tiene 40 asientos
    Y los asientos 1 y 2 están vendidos
    Cuando el viajero consulta el mapa de asientos de esa salida
    Entonces ve 40 asientos numerados del 1 al 40
    Y los asientos 1 y 2 aparecen ocupados
    Y los demás aparecen libres

  Escenario: Un asiento de un tiquete cancelado vuelve a estar libre
    Dado que el tiquete del asiento 2 fue cancelado
    Cuando el viajero consulta el mapa de asientos de esa salida
    Entonces el asiento 2 aparece libre
```

</details>

## Mockup

![Mockup HU_009](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_009.png)

*Mapa de asientos libres, ocupados y seleccionado.*

## Validación INVEST

- I — Independent: ⚠️ Necesita una salida programada (HU_006); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se dibuja el mapa.
- V — Valuable: ✅ El pasajero elige su puesto antes de pagar.
- E — Estimable: ✅ Solo dos estados por asiento.
- S — Small: ✅ Una consulta.
- T — Testable: ✅ El estado de cada asiento se puede verificar.

## Supuestos

- Ver el mapa de asientos no requiere iniciar sesión; comprar sí (HU_010).

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
