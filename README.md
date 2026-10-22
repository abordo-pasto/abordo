# Abordo

Sistema para consultar y comprar pasajes que salen de la Terminal de Transportes de Pasto.
Proyecto final de Diseño de Software.

## Estructura del repositorio

```
abordo/
├── README.md
├── docs/
│   ├── historias/                   Una historia por archivo (INVEST + Gherkin) y 00-resumen.md
│   └── 02-requisitos.md             Requisitos funcionales y no funcionales
├── diagramas/                       Proyecto de Visual Paradigm (.vpp) y las imágenes exportadas
│   ├── 0-contexto
│   ├── 1-componentes
│   ├── 2-clases
│   ├── 3-clases-por-capas
│   └── 4-despliegue
├── backend/                         Java 17 + Spring Boot 3
│   └── src/main/java/.../
│       ├── controller/              Reciben las peticiones HTTP
│       ├── service/                 Reglas de negocio
│       ├── repository/              Acceso a MongoDB
│       ├── model/                   Documentos, enumeraciones e interfaces
│       └── dto/                     Datos de entrada y salida
├── database/                        Datos de prueba para MongoDB
├── postman/                         Colección para probar los endpoints
└── frontend/                        Opcional
```

## Tecnologías
Java 17, Spring Boot 3, MongoDB, Postman, Visual Paradigm.
