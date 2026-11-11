# Base de datos

Abordo usa **MongoDB**. No hace falta crear la base ni las colecciones a mano: al arrancar, el backend crea la base `abordo`, los índices únicos y, si está vacía, carga los datos de prueba (clase `config/DatosIniciales.java`).

| Colección | Qué guarda | Clase |
|---|---|---|
| `usuarios` | Pasajeros, operadores y administradores (el campo `_class` indica el tipo) | `Usuario` y sus hijas |
| `puntos_transporte` | Terminal de Transportes, Terminal Mixto y Terminal Torobajo | `PuntoTransporte` |
| `empresas` | Empresas transportadoras | `EmpresaTransportadora` |
| `buses` | Buses de cada empresa | `Bus` |
| `rutas` | Destino, duración, punto de salida y empresa | `Ruta` |
| `salidas` | Fecha y hora, precio base, ruta, bus y asientos ocupados | `Salida` |
| `tiquetes` | Tiquetes vendidos con su estado | `Tiquete` |

Las relaciones se guardan como referencias (`@DBRef`) al documento relacionado.

Para empezar de cero basta con borrar la base: `mongosh abordo --eval "db.dropDatabase()"` y reiniciar el backend.
