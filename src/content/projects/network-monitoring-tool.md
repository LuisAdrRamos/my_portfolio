---
title: "Network Monitoring Tool"
description: "Herramienta de telemetría y monitoreo de red en tiempo real con agentes ligeros en Rust y dashboard central."
category: "system-tools"
featured: false
date: "2025-08-10"
technologies: ["Python", "FastAPI", "SQLite", "Prometheus", "Rust"]
githubUrl: "https://github.com/tu-usuario/net-monitor"
metrics:
  Overhead: "< 5MB RAM"
  Resolution: "1s"
problem: "Las soluciones empresariales de monitoreo consumían demasiados recursos en servidores edge pequeños (Raspberry Pis, VPS baratos)."
architecture: "Agentes escritos en Rust recogen métricas de red a nivel de kernel vía eBPF y envían buffers UDP a un servidor central FastAPI. Los datos se agregan en memoria y se persisten en SQLite para análisis histórico."
---

Una solución de monitoreo de código abierto para infraestructura edge con recursos muy limitados.

## El Reto
Necesitábamos monitorear el ancho de banda y latencia de docenas de nodos remotos, pero herramientas como Zabbix o Datadog Agent agotaban la CPU y memoria de los dispositivos.

## La Solución
Escribí un agente personalizado de cero en Rust que hace polling directo al sistema de archivos `/proc` en Linux, procesa los datos localmente y emite telemetría UDP binaria muy ligera. El backend de Python lo decodifica.

## Resultados
- Agente consume menos de 5MB de RAM (vs 120MB de soluciones tradicionales).
- Monitoreo sub-segundo sin afectar el rendimiento del servidor host.
