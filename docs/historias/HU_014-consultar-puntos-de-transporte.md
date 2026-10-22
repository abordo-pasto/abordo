### HU_014: Consultar puntos de transporte

**Como** pasajero
**Quiero** ver los puntos de transporte de Pasto con su dirección, horario, empresas y destinos
**Para** saber a cuál de ellos debo ir según el lugar al que quiero viajar

**Prioridad:** Alta · **Estimación:** 2 puntos · **Requisitos:** RF_015

**Validación INVEST**
- I — Independent: ⚠️ Necesita puntos y rutas registrados (HU_013, HU_005); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se presenta la información.
- V — Valuable: ✅ Resuelve la confusión de no saber de qué terminal sale cada destino.
- E — Estimable: ✅ Dos consultas simples.
- S — Small: ✅ Solo lectura.
- T — Testable: ✅ El contenido de cada punto se puede verificar.

**Criterios de aceptación (Gherkin)**
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
    Cuando el pasajero consulta los puntos de transporte
    Entonces ve 3 puntos
    Y cada uno muestra nombre, dirección, horario de atención y zona que atiende

  Escenario: Ver el detalle de un punto
    Cuando el pasajero consulta el punto "Terminal Torobajo"
    Entonces ve la empresa "Transandoná"
    Y ve los destinos "Genoy" y "Sandoná"

  Escenario: Saber desde qué punto sale un destino
    Cuando el pasajero pregunta desde dónde sale el destino "Sandoná"
    Entonces ve el punto "Terminal Torobajo"

  Escenario: Destino que no sale de ningún punto
    Cuando el pasajero pregunta desde dónde sale el destino "Medellín"
    Entonces ve el mensaje "Ningún punto tiene rutas a ese destino"
```

**Supuestos / preguntas abiertas**
- Consultar los puntos no requiere iniciar sesión.
