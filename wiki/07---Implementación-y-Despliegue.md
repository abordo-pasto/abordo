# 07 - Implementación y Despliegue

## 7.1 Tecnologías

| Parte | Tecnología |
|---|---|
| Backend | Java 17, Spring Boot 3.3, Spring Security con JWT, Spring Data MongoDB, Bean Validation, springdoc (Swagger) |
| Base de datos | MongoDB (Atlas M0 en la nube, Docker en local) |
| Frontend | React 18 + Vite, diseño móvil |
| Pruebas | JUnit 5 + Mockito, colección de Postman |
| Despliegue | Docker, Render, Vercel, GitHub Actions |
| Diseño | Visual Paradigm Community Edition |

## 7.2 Estructura del código

```
backend/src/main/java/com/abordo/
├── controller/     Endpoints REST (Controlador)
├── service/        Reglas de negocio de cada historia
├── repository/     Interfaces de Spring Data MongoDB
├── model/          Clases de la vista lógica
│   └── tarifa/     CalculadoraTarifa y sus implementaciones
├── integracion/    PasarelaPagos y la pasarela simulada
├── dto/            Datos de entrada y salida
├── security/       JWT y usuario actual
├── exception/      Errores con código HTTP y mensaje en español
└── config/         Seguridad, Swagger, zona horaria y datos de prueba
```

## 7.3 Relación entre los diagramas y el código

| Elemento del diagrama | Dónde está en el código |
|---|---|
| Clase abstracta `Usuario` con `Pasajero`, `Administrador` y `OperadorEmpresa` | `model/Usuario.java`; las tres se guardan en la colección `usuarios` con el discriminador del tipo |
| `OperadorEmpresa` «trabaja para» `EmpresaTransportadora` | `OperadorEmpresa.empresa` y `perteneceA()`; los servicios solo dejan editar lo de su empresa |
| `Salida.emitirTiquete()` (Creador) | `model/Salida.java`, usado por `TiqueteServicio.comprar()` |
| `CalculadoraTarifa` y sus tres tarifas (Polimorfismo) | `model/tarifa/`, elegidas por `FabricaTarifas.para(tipo)` |
| `PasarelaPagos` «interface» | `integracion/PasarelaPagos.java` y `PasarelaPagosSimulada.java` |
| Paquetes Presentacion_Controller / Negocio_Service / Datos_Repository | `controller/`, `service/`, `repository/` |
| Secuencia comprar tiquete | `TiqueteController` → `TiqueteServicio` → `SalidaRepository` / `TiqueteRepository` |
| Nodo Render «executionEnvironment» Docker | `backend/Dockerfile` y `render.yaml` |
| Nodo Vercel | `frontend/` y `frontend/vercel.json` |

## 7.4 Ejecución local

```bash
# MongoDB y backend con Docker
docker compose up --build

# O el backend sin Docker (con MongoDB en localhost:27017)
cd backend && mvn spring-boot:run

# Frontend
cd frontend && cp .env.example .env && npm install && npm run dev
```

La API queda en `http://localhost:8080` (Swagger en `/swagger-ui.html`) y la app en `http://localhost:5173`. La primera vez se cargan datos de prueba: los tres puntos de transporte, empresas, buses, rutas y salidas.

## 7.5 Pruebas

- **JUnit 5 + Mockito:** reglas del dominio (tarifas, asientos, cancelación, comparación) y servicios. Se ejecutan con `mvn test`.
- **Postman:** `postman/Abordo.postman_collection.json` recorre las historias en orden. Hay entornos para la nube (`Abordo-Render`) y local (`Abordo-Local`).
- **CI:** cada push a `main` compila, corre las pruebas y la colección de Postman en GitHub Actions.

## 7.6 Despliegue

| Parte | Plataforma | Configuración |
|---|---|---|
| Backend (Docker) | Render (plan gratuito) | `render.yaml` y `backend/Dockerfile`; variables `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGENES`, `DATOS_PRUEBA` |
| Base de datos | MongoDB Atlas (M0) | La cadena de conexión solo está en Render, no en el repositorio |
| Frontend | Vercel | Carpeta `frontend`, variable `VITE_API_URL` |

Cada push a `main` vuelve a desplegar backend y frontend. El workflow `keep-alive.yml` evita que Render duerma el backend de día.

## 7.7 Aplicación desplegada y cuentas de prueba

- **App:** https://abordo-pi.vercel.app
- **API:** https://abordo-backend-myc1.onrender.com
- **Swagger:** https://abordo-backend-myc1.onrender.com/swagger-ui.html (login en `POST /api/auth/login`, luego **Authorize** con el token)

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@abordo.com | admin123 |
| Pasajero | pasajero@abordo.com | pasajero123 |
| Operador (Cootranar) | operador@cootranar.com | operador123 |

Pasarela simulada: cualquier tarjeta de 16 dígitos se aprueba (por ejemplo 4111111111111111), excepto las que terminan en 0000.
