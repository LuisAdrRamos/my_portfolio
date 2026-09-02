---
title: "Scalable REST API"
description: "API REST de alto rendimiento para procesamiento de transacciones, con arquitectura modular y 99.9% de uptime."
category: "backend"
featured: true
date: "2025-11-15"
technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"]
githubUrl: "https://github.com/tu-usuario/scalable-rest-api"
demoUrl: "https://api.tudominio.com"
metrics:
  Latency: "18ms"
  Throughput: "5k req/s"
  Uptime: "99.99%"
problem: "El sistema legacy no podía manejar los picos de tráfico durante eventos especiales, resultando en caídas del servicio y transacciones perdidas."
architecture: "Se implementó una arquitectura monolítica modular con Django, utilizando Redis para caché de sesión y Celery para procesamiento asíncrono de colas. La base de datos PostgreSQL se optimizó con índices compuestos y réplicas de lectura."
---

En este proyecto se rediseñó completamente el backend de procesamiento de transacciones. 

## El Reto
El desafío principal era mantener la consistencia de los datos mientras se escalaba horizontalmente para manejar picos de tráfico de hasta 5,000 peticiones por segundo.

## La Solución
Implementamos un sistema de caché de múltiples niveles y movimos todo el procesamiento pesado a workers en segundo plano usando Celery y RabbitMQ. La base de datos fue particionada lógicamente.

## Resultados
- Reducción del 80% en latencia de API.
- Cero tiempo de inactividad durante los últimos 3 eventos pico.
- Reducción del 40% en costos de infraestructura en AWS.
