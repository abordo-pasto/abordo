# HU_008 – Buscar salidas

🔗 Issue en GitHub: [#8](https://github.com/abordo-pasto/abordo/issues/8)

| Identificación | Título |
|---|---|
| HU_008 | Buscar salidas |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Visitante, Pasajero | 4.4 Consulta, comparación y planificación (principal) | Alta | 3 puntos | RF_008 |

## Descripción

**Como** viajero (visitante o pasajero), **quiero** buscar salidas por destino y fecha, y si quiero filtrar por punto de transporte, **para** planificar mi viaje sabiendo desde dónde salgo, a qué hora y cuánto cuesta.

## Criterios de aceptación

- Buscar ordenando por hora
- Buscar ordenando por precio
- El resultado indica de qué punto sale
- Filtrar por punto de transporte
- Fecha sin salidas
- No se muestran salidas que ya pasaron

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

```gherkin
# language: es
Característica: Búsqueda de salidas

  Antecedentes:
    Dado que el "2026-11-20" hay estas salidas a "Cali":
      | punto                            | empresa      | hora  | precio base | asientos libres |
      | Terminal de Transportes de Pasto | Cootranar    | 20:00 | $50.000     | 40              |
      | Terminal de Transportes de Pasto | Transipiales | 08:00 | $55.000     | 12              |
      | Terminal de Transportes de Pasto | Supertaxis   | 14:00 | $45.000     | 3               |

  Escenario: Buscar ordenando por hora
    Cuando el viajero busca salidas a "Cali" el "2026-11-20"
    Entonces ve 3 salidas en este orden: "08:00", "14:00", "20:00"
    Y cada una muestra punto de salida, empresa, hora, hora estimada de llegada, precio base y asientos libres

  Escenario: Buscar ordenando por precio
    Cuando el viajero busca salidas a "Cali" el "2026-11-20" ordenando por precio
    Entonces ve las salidas en este orden: $45.000, $50.000, $55.000

  Escenario: El resultado indica de qué punto sale
    Dado que hay una salida a "Sandoná" el "2026-11-20" a las "07:00" desde "Terminal Torobajo"
    Cuando el viajero busca salidas a "Sandoná" el "2026-11-20"
    Entonces ve la salida de las "07:00" con punto de salida "Terminal Torobajo"

  Escenario: Filtrar por punto de transporte
    Cuando el viajero busca salidas a "Cali" el "2026-11-20" solo desde "Terminal Mixto"
    Entonces ve el mensaje "No hay salidas para esa fecha"

  Escenario: Fecha sin salidas
    Cuando el viajero busca salidas a "Cali" el "2026-11-21"
    Entonces ve el mensaje "No hay salidas para esa fecha"

  Escenario: No se muestran salidas que ya pasaron
    Dado que hoy es "2026-11-20" y son las "15:00"
    Cuando el viajero busca salidas a "Cali" el "2026-11-20"
    Entonces solo ve la salida de las "20:00"
```

</details>

## Mockup

![Mockup HU_008](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_008.png)

*Búsqueda por destino y fecha con filtro de punto y orden por precio, y el caso sin resultados.*

## Validación INVEST

- I — Independent: ⚠️ Necesita salidas programadas (HU_006); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se hace la búsqueda.
- V — Valuable: ✅ Resuelve el problema principal: saber qué sale, de qué punto, a qué hora y a qué precio.
- E — Estimable: ✅ Filtros y orden definidos.
- S — Small: ✅ Una consulta con un filtro opcional y dos formas de ordenar.
- T — Testable: ✅ El orden y el contenido de la lista se pueden verificar.

## Supuestos

- Buscar salidas no requiere iniciar sesión.
- Hora estimada de llegada = hora de salida + duración de la ruta.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
