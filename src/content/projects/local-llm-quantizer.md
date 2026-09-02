---
title: "Local LLM Quantizer Pipeline"
description: "Pipeline automatizado para cuantización de modelos grandes de lenguaje (GGUF/EXL2) optimizado para AMD ROCm."
category: "ai-inference"
featured: true
date: "2026-03-22"
technologies: ["Python", "llama.cpp", "GGUF", "ROCm", "Bash"]
githubUrl: "https://github.com/tu-usuario/llm-quant-pipeline"
huggingfaceUrl: "https://huggingface.co/tu-usuario"
metrics:
  VRAM_Saved: "65%"
  Speedup: "3.2x"
  Quality_Loss: "< 1%"
problem: "Correr LLMs de 7B-14B parámetros localmente en GPUs de 16GB VRAM en formato FP16 es imposible sin out-of-memory errors."
architecture: "Un script orquestador en Python que descarga pesos en Safetensors de Hugging Face, los convierte a GGUF, aplica cuantización Q4_K_M usando llama.cpp compilado para backend Vulkan/ROCm, y sube el modelo resultante."
---

Pipeline diseñado para desarrolladores locales que necesitan correr modelos de última generación en hardware de consumo.

## El Reto
La cuantización manual de modelos requiere docenas de comandos, conversión de tensores y gestión de memoria extremadamente cuidadosa. Además, el ecosistema AMD requiere compilaciones específicas.

## La Solución
Desarrollé una herramienta CLI de Python que automatiza todo el proceso. Detecta la VRAM disponible, calcula la cuantización óptima, compila `llama.cpp` con los flags correctos para la RX 9060 XT y genera el modelo.

## Resultados
- Permite ejecutar un modelo Llama-3 de 8B ocupando solo 5.1GB de VRAM.
- Aceleración en inferencia de 25 t/s a 78 t/s.
