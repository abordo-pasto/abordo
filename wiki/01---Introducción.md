# 01 - Introducción

## 1.1 Propósito
El presente documento tiene como propósito describir de manera clara y detallada los requerimientos funcionales y no funcionales de **Abordo**, una plataforma móvil para la gestión y consulta de información del transporte terrestre en Pasto. Este documento sirve como base para el análisis, el diseño (vistas UML), la implementación y la validación del sistema.

## 1.2 Convenciones del documento
- **HU_xxx**: Historias de Usuario.
- **RF_xxx**: Requisitos Funcionales.
- **RNF_xxx**: Requisitos No Funcionales.
- **RNx**: Reglas de negocio.
- Las historias siguen el formato **Como – Quiero – Para**, se validan con **INVEST** y sus criterios de aceptación se escriben en **Gherkin** en español.
- Cada historia incluye un **mockup** de la pantalla de la app móvil.
- La estructura y redacción siguen el estándar IEEE 830 para la especificación de requisitos de software.

## 1.3 Audiencia objetivo
Este documento está dirigido a:
- El profesor y evaluadores del curso de Diseño de Software.
- Analistas y diseñadores de software.
- Desarrolladores del backend (Java + Spring Boot) y de la app móvil.
- Empresas transportadoras y administración de los puntos de transporte de Pasto.
- Viajeros que usan el transporte terrestre desde Pasto.

## 1.4 Alcance del producto
**Abordo** centraliza la información de los tres puntos de transporte terrestre de Pasto (Terminal de Transportes de Pasto, Terminal Mixto y Terminal Torobajo). Permite a los viajeros **consultar y comparar** rutas, destinos, horarios, tarifas y empresas transportadoras para **planificar** su viaje desde el celular. Las empresas transportadoras, por medio de sus operadores, mantienen al día sus buses, rutas y salidas, y un administrador gestiona los puntos de transporte, las empresas y las cuentas de los operadores. Como funcionalidad extra, el pasajero registrado puede comprar y cancelar tiquetes, con el pago autorizado por una pasarela de pagos.

Queda fuera del alcance: el reembolso de dinero, la facturación electrónica y el rastreo del bus en tiempo real.

## 1.5 Referencias
- IEEE 830 — Recomendaciones para la Especificación de Requisitos de Software.
- Repositorio del proyecto: [abordo-pasto/abordo](https://github.com/abordo-pasto/abordo) (carpeta `docs/`).
- Lineamientos del curso de Diseño de Software (entrega final: vistas UML en Visual Paradigm).
