# HU_014 – Consultar puntos de transporte

🔗 Issue en GitHub: [#14](https://github.com/abordo-pasto/abordo/issues/14)

| Identificación | Título |
|---|---|
| HU_014 | Consultar puntos de transporte |

| Actor | Épica | Prioridad | Estimación | Requisitos |
|---|---|---|---|---|
| Visitante, Pasajero | 4.4 Consulta, comparación y planificación (principal) | Alta | 2 puntos | RF_015 |

## Descripción

**Como** viajero (visitante o pasajero), **quiero** ver los puntos de transporte de Pasto con su dirección, horario, empresas y destinos, **para** saber a cuál de ellos debo ir según el lugar al que quiero viajar.

## Criterios de aceptación

- Ver la lista de puntos
- Ver el detalle de un punto
- Saber desde qué punto sale un destino
- Destino que no sale de ningún punto

<details>
<summary><b>Escenarios completos en Gherkin</b></summary>

```gherkin
# language: es
Característica: Consulta de puntos de transporte

  Antecedentes:
    Dado que existen estas rutas:
      | punto                            | empresa     | destino   |
      | Terminal de Transportes de Pasto | Cootranar   | Ipiales   |
      | Terminal Torobajo                   | Transandoná | Sandoná   |
      | Terminal Torobajo                   | Transandoná | Genoy     |
      | Terminal Mixto                   | Coomixtos   | El Encano |

  Escenario: Ver la lista de puntos
    Cuando el viajero consulta los puntos de transporte
    Entonces ve 3 puntos
    Y cada uno muestra nombre, dirección, horario de atención y zona que atiende

  Escenario: Ver el detalle de un punto
    Cuando el viajero consulta el punto "Terminal Torobajo"
    Entonces ve la empresa "Transandoná"
    Y ve los destinos "Genoy" y "Sandoná"

  Escenario: Saber desde qué punto sale un destino
    Cuando el viajero pregunta desde dónde sale el destino "Sandoná"
    Entonces ve el punto "Terminal Torobajo"

  Escenario: Destino que no sale de ningún punto
    Cuando el viajero pregunta desde dónde sale el destino "Medellín"
    Entonces ve el mensaje "Ningún punto tiene rutas a ese destino"
```

</details>

## Mockup

![Mockup HU_014](https://raw.githubusercontent.com/wiki/abordo-pasto/abordo/images/HU_014.png)

*Lista de puntos con la búsqueda "¿desde dónde sale?", y el detalle de un punto.*

## Validación INVEST

- I — Independent: ⚠️ Necesita puntos y rutas registrados (HU_013, HU_005); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se presenta la información.
- V — Valuable: ✅ Resuelve la confusión de no saber de qué terminal sale cada destino.
- E — Estimable: ✅ Dos consultas simples.
- S — Small: ✅ Solo lectura.
- T — Testable: ✅ El contenido de cada punto se puede verificar.

## Supuestos

- Consultar los puntos no requiere iniciar sesión.

---
[← 04 - Características del Sistema](04---Características-del-Sistema)
