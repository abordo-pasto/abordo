# Requisitos

Cada requisito sale de una historia de usuario (ver `01-historias-de-usuario.md`).

## Requisitos funcionales

| ID | El sistema debe... | HU |
|---|---|---|
| RF_001 | Registrar pasajeros validando que el correo no se repita y guardando la contraseña cifrada. | HU_001 |
| RF_002 | Autenticar usuarios por correo y contraseña e informar su rol (`PASAJERO` o `ADMINISTRADOR`). | HU_002 |
| RF_003 | Crear, listar, actualizar y eliminar empresas transportadoras, sin permitir NIT repetido ni eliminar empresas con buses o rutas. | HU_003 |
| RF_004 | Registrar buses con placa única, capacidad entre 10 y 45 y tipo de servicio. | HU_004 |
| RF_005 | Registrar rutas con empresa, origen, destino distinto del origen y duración mayor que 0. | HU_005 |
| RF_006 | Programar salidas validando que el bus sea de la empresa de la ruta y que no tenga otra salida a la misma fecha y hora. | HU_006 |
| RF_007 | Generar el reporte de tiquetes vendidos y valor recaudado por empresa en un rango de fechas. | HU_007 |
| RF_008 | Buscar salidas futuras por destino y fecha, ordenadas por hora o por precio, con asientos libres. | HU_008 |
| RF_009 | Mostrar el estado (libre u ocupado) de cada asiento de una salida. | HU_009 |
| RF_010 | Vender un tiquete por asiento libre, con código único y estado `ACTIVO`. | HU_010 |
| RF_011 | Calcular el precio final: precio base − descuento por tipo de pasajero + tasa de uso de terminal. | HU_010 |
| RF_012 | Listar los tiquetes de un pasajero del más reciente al más antiguo, con filtro por estado. | HU_011 |
| RF_013 | Cancelar tiquetes activos con más de 2 horas de anticipación y liberar el asiento. | HU_012 |

## Requisitos no funcionales

| ID | Tipo | Requisito |
|---|---|---|
| RNF_001 | Tecnología | El backend se construye en Java 17 con Spring Boot 3 y expone una API REST con JSON. |
| RNF_002 | Persistencia | Los datos se guardan en MongoDB (colecciones: usuarios, empresas, buses, rutas, salidas, tiquetes). |
| RNF_003 | Arquitectura | El backend sigue una arquitectura por capas: Controlador → Servicio → Repositorio → Modelo, con DTO para entrada y salida. |
| RNF_004 | Seguridad | Las contraseñas se guardan con BCrypt; ninguna clave ni contraseña de base de datos se sube al repositorio. |
| RNF_005 | Mantenibilidad | Los valores de negocio que pueden cambiar (tasa de uso, porcentajes de descuento) se leen de configuración o de una sola clase, para cambiarlos en un minuto. |
| RNF_006 | Usabilidad de la API | Los errores devuelven código HTTP correcto (400, 401, 403, 404, 409) y un mensaje en español. |
| RNF_007 | Rendimiento | Una búsqueda de salidas responde en menos de 2 segundos con hasta 1.000 salidas guardadas. |
| RNF_008 | Facilidad de prueba | Todos los endpoints se pueden probar con una colección de Postman incluida en el repositorio. |
| RNF_009 | Portabilidad | El backend corre en local con `mvn spring-boot:run` y se puede desplegar en la nube (AWS) con una variable de entorno para la conexión a MongoDB. |
| RNF_010 | Documentación | El repositorio incluye las historias, los requisitos y los diagramas UML exportados desde Visual Paradigm. |
