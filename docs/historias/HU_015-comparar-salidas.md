### HU_015: Comparar salidas

**Como** pasajero
**Quiero** comparar lado a lado varias salidas hacia el mismo destino
**Para** escoger la que más me conviene por precio, hora de llegada, empresa o punto de salida

**Prioridad:** Alta · **Estimación:** 3 puntos · **Requisitos:** RF_016

**Validación INVEST**
- I — Independent: ⚠️ Usa las salidas de la búsqueda (HU_008); se puede probar con datos iniciales.
- N — Negotiable: ✅ No impone cómo se dibuja la comparación.
- V — Valuable: ✅ Es la "comparación" que promete el proyecto: decidir sin ir a cada terminal.
- E — Estimable: ✅ Datos y cálculos definidos.
- S — Small: ✅ Una vista con cálculos simples.
- T — Testable: ✅ Los valores y las marcas se pueden verificar.

**Criterios de aceptación (Gherkin)**
```gherkin
# language: es
Característica: Comparación de salidas

  Antecedentes:
    Dado que la tasa de uso de la terminal es $3.000
    Y el "2026-11-20" hay estas salidas a "Cali":
      | código | empresa      | hora  | duración | precio base | servicio     |
      | S1     | Transipiales | 08:00 | 480 min  | $55.000     | Preferencial |
      | S2     | Supertaxis   | 14:00 | 540 min  | $45.000     | Básico       |
      | S3     | Cootranar    | 20:00 | 450 min  | $50.000     | Dos pisos    |

  Escenario: Comparar tres salidas
    Cuando el pasajero compara "S1", "S2" y "S3"
    Entonces ve para cada una: punto de salida, empresa, hora de salida, hora estimada de llegada, servicio, asientos libres y precio final por tipo de pasajero
    Y la hora estimada de llegada de "S1" es "16:00"

  Esquema del escenario: Precio final por tipo de pasajero en la comparación
    Cuando el pasajero compara "S1", "S2" y "S3"
    Entonces el precio final de "S3" para "<tipo>" es "<precio final>"

    Ejemplos:
      | tipo         | precio final |
      | General      | $53.000      |
      | Estudiante   | $48.000      |
      | Adulto mayor | $43.000      |

  Escenario: Marcar la más barata y la más rápida
    Cuando el pasajero compara "S1", "S2" y "S3"
    Entonces "S2" aparece marcada como "Más barata"
    Y "S3" aparece marcada como "Más rápida"

  Esquema del escenario: Cantidad de salidas a comparar
    Cuando el pasajero intenta comparar <cantidad> salidas
    Entonces el sistema "<resultado>" la comparación

    Ejemplos:
      | cantidad | resultado |
      | 1        | rechaza   |
      | 2        | acepta    |
      | 4        | acepta    |
      | 5        | rechaza   |

  Escenario: Salidas a destinos distintos
    Cuando el pasajero intenta comparar una salida a "Cali" con una salida a "Ipiales"
    Entonces el sistema rechaza la comparación
    Y muestra el mensaje "Solo se pueden comparar salidas al mismo destino"
```

**Supuestos / preguntas abiertas**
- Se comparan de 2 a 4 salidas.
- "Más rápida" se mide por la duración del viaje; si hay empate se marcan ambas.
- Comparar no requiere iniciar sesión.
