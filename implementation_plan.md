# 🚀 Portafolio Profesional — Luis Adrián Ramos
## Full-Stack Developer · Backend Specialist · Local AI Benchmarking

> **Versión:** 2.1 — Revisión Software Architect  
> **Última actualización:** 2026-09-02  
> **Estado:** Pendiente de aprobación final

---

## 1. Resumen Ejecutivo

Crear un portafolio profesional **tipo dashboard de telemetría** que refleje el perfil técnico de un desarrollador Full-Stack orientado a Backend y benchmarking de modelos de IA locales. El sitio debe comunicar competencia técnica a reclutadores y equipos de ingeniería mediante una estética dark-mode inspirada en dashboards de sistemas, con componentes interactivos diferenciadores.

**Audiencia objetivo:**
- Reclutadores técnicos y no técnicos
- Equipos de ingeniería evaluando candidatos
- Comunidad de IA/ML local (Hugging Face, Reddit, Discord)

---

## 2. Stack Tecnológico y Justificación

| Capa | Tecnología | Versión | Justificación |
|---|---|---|---|
| **Framework** | Astro | 5.x (latest) | SSG por defecto, Islands Architecture para JS mínimo, Content Collections con Zod |
| **UI Interactiva** | React | 19.x | Islas hidratadas on-demand (`client:idle`, `client:visible`) para Terminal y Benchmarks |
| **Estilos** | Tailwind CSS | 4.x | Utility-first, dark mode nativo, diseño responsive rápido |
| **Lenguaje** | TypeScript | 5.x | Type-safety en esquemas Zod y componentes React |
| **Iconos** | Lucide React | latest | Iconografía consistente, tree-shakeable |
| **Gráficas** | Recharts o Chart.js | latest | Visualización de benchmarks (barras, radar) |
| **Animaciones** | Framer Motion | latest | Micro-animaciones en islas React |
| **Entorno Dev** | Docker + Docker Compose | - | Aislamiento total, reproducibilidad, cero dependencias locales |
| **Hosting** | **Vercel** | - | Deploy estático desde GitHub, CDN global, CI/CD automático |
| **VCS** | Git + GitHub | - | Rama `desarrollo` obligatoria, PRs a `main` |

> [!IMPORTANT]
> **Sobre Tailwind CSS:** El plan original especifica Tailwind CSS. Dado que es una decisión explícita del documento, se mantiene. Se usará **Tailwind CSS v4** (la versión más reciente estable a septiembre 2026).

### 2.1 Estrategia de Deploy — Vercel

El flujo de deploy separa completamente desarrollo de producción:

```
┌──────────────────────────────────────────────────────────┐
│  DESARROLLO LOCAL (tu PC)                                │
│  Docker Compose → Astro Dev Server → localhost:4321      │
│  Dockerfile.dev + docker-compose.yml                     │
└────────────────────────┬─────────────────────────────────┘
                         │ git push
                         ▼
┌──────────────────────────────────────────────────────────┐
│  GITHUB (repositorio)                                    │
│  Rama desarrollo → PR → Rama main                        │
└────────────────────────┬─────────────────────────────────┘
                         │ webhook automático
                         ▼
┌──────────────────────────────────────────────────────────┐
│  VERCEL (producción)                                     │
│  1. Lee package.json                                     │
│  2. Ejecuta npm install + npm run build                  │
│  3. Astro compila todo a dist/ (HTML + CSS + assets)     │
│  4. Vercel distribuye dist/ en su CDN global             │
│  ⚡ Sin Docker, sin servidor Node, 100% estático         │
└──────────────────────────────────────────────────────────┘
```

> [!NOTE]
> **Docker es solo para desarrollo local.** `Dockerfile.dev` y `docker-compose.yml` aíslan tu entorno en tu equipo. Vercel NO usa Docker; ejecuta `npm run build` internamente y sirve los archivos estáticos resultantes (`dist/`) desde su CDN sin necesidad de mantener un servidor.

### 2.2 Dominio

Vercel asigna automáticamente un **subdominio gratuito** al proyecto:
- Ejemplo: `my-portfolio-abc123.vercel.app`

Opcionalmente, puedes conectar un **dominio personalizado** (ej. `adrianramos.dev`) desde el panel de Vercel. Esto es totalmente opcional y se puede hacer en cualquier momento después del deploy inicial. No es bloqueante para el desarrollo.

> [!TIP]
> Si decides comprar un dominio, proveedores recomendados: **Cloudflare Registrar** (precio al costo, sin markup), **Namecheap**, o **Porkbun**. Vercel gestiona los DNS automáticamente una vez apuntas el dominio.

---

## 3. Sistema de Diseño

### 3.1 Paleta de Colores — "Tokyo Night Terminal"

| Token | Hex | Uso |
|---|---|---|
| `--bg-primary` | `#0b0f19` | Fondo principal (azul petróleo profundo) |
| `--bg-secondary` | `#0d1117` | Fondo de tarjetas/paneles (GitHub Dark) |
| `--bg-elevated` | `#161b22` | Fondo elevado (modales, tooltips) |
| `--border-default` | `#1e293b` | Bordes y separadores |
| `--border-subtle` | `#2d3748` | Bordes sutiles en hover |
| `--accent-cyan` | `#38bdf8` | Métricas de sistemas, enlaces, CTAs primarios |
| `--accent-mint` | `#2dd4bf` | Éxito, estados activos, terminales |
| `--accent-purple` | `#a855f7` | IA/Modelos, badges de ML |
| `--accent-amber` | `#f59e0b` | Warnings, métricas de VRAM |
| `--text-primary` | `#e2e8f0` | Texto principal (slate-200) |
| `--text-secondary` | `#94a3b8` | Texto secundario (slate-400) |
| `--text-muted` | `#64748b` | Texto terciario (slate-500) |

### 3.2 Tipografía

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Headings | **JetBrains Mono** | 700 | Títulos, nombres de secciones (monospace = engineering feel) |
| Body | **Inter** | 400, 500 | Texto general, descripciones |
| Code/Badges | **Fira Code** | 400 | Badges técnicos, snippets inline, terminal |

### 3.3 Componentes de Diseño Clave

- **Bento Grid:** Cajas asimétricas con `grid-template-areas`, bordes `border-slate-800`, efecto glassmorphism sutil (`backdrop-blur-sm`, `bg-white/5`)
- **Badges técnicos:** Estilo de flags de compilación con monospace (ej. `KV-Cache: 4-bit`, `Throughput: 42 t/s`, `Quant: GGUF Q4_K_M`)
- **Glow effects:** Cian sutil en hover para CTAs y tarjetas (`box-shadow: 0 0 20px rgba(56,189,248,0.15)`)
- **Scrollbar personalizado:** Estilo delgado con colores del tema
- **Magnetic buttons:** Efecto de atracción al cursor con `cubic-bezier(0.16, 1, 0.3, 1)` para botones de CTA
- **Micro-animaciones:** Transiciones de 300ms con easing premium, hover scale `1.02-1.05`, parallax sutil en scroll

### 3.4 Estándares de Calidad Visual (Senior Developer)

| Criterio | Target |
|---|---|
| Tiempo de carga | < 1.5s (First Contentful Paint) |
| Animaciones | 60fps constante |
| Responsive | Mobile-first (375px → 1440px) |
| Accesibilidad | WCAG 2.1 AA (contraste, alt text, aria labels, focus states) |
| Lighthouse Score | > 90 en Performance, SEO, Accessibility |

---

## 4. Arquitectura de Información (Secciones)

### Sección 1 — Hero Section
**Propósito:** Primera impresión. Comunicar nombre, rol, formación y CTAs principales.

| Elemento | Detalle |
|---|---|
| Nombre | Luis Adrián Ramos |
| Rol | `Backend Developer · Local AI Engineer` |
| Formación | Escuela Politécnica Nacional — ESFOT |
| CTAs | GitHub ↗, Descargar CV (PDF), LinkedIn ↗, Contacto (scroll) |
| Foto | **Espacio reservado** — el usuario proporcionará la ruta del asset (`src/assets/profile-photo.webp`) |
| Animación | Typing effect en el subtítulo del rol |

> [!NOTE]
> **Foto de perfil:** El usuario confirmó que tiene foto profesional. Se dejará el espacio preparado con un placeholder elegante que se reemplazará con la imagen real una vez proporcionada la ruta del archivo. El asset debe colocarse en `src/assets/profile-photo.webp` (Astro optimiza automáticamente las imágenes de esta carpeta).

**Criterio de Aceptación:**
- [ ] Renderiza nombre, rol, formación sin errores
- [ ] Botones de CTA funcionales (links a GitHub, LinkedIn, descarga de CV)
- [ ] Responsive: stack vertical en mobile, layout horizontal en desktop
- [ ] Typing animation del subtítulo funciona sin JS si es posible (CSS animation) o como isla React
- [ ] Placeholder de foto visible y estilizado hasta que se proporcione la imagen real

---

### Sección 2 — Telemetría / Bento Grid Overview
**Propósito:** Resumen técnico a simple vista en formato dashboard.

**Celdas del Bento Grid:**

| Celda | Contenido | Tamaño |
|---|---|---|
| Rol Actual | ICT Assistant @ Instituto Libertad | 1x1 |
| Core Stack | Python, Django, Linux, SQL, Docker | 2x1 |
| AI Lab | Inferencia local, ROCm/Vulkan, cuantización, GGUF/EXL2 | 1x2 |
| Hardware | AMD RX 9060 XT 16GB, specs del lab | 1x1 |
| Repos Destacados | Count de repos + link a GitHub profile | 1x1 |
| Uptime/Status | Badge animado de "disponible para trabajar" | 1x1 |

**Criterio de Aceptación:**
- [ ] Grid asimétrico renderiza correctamente en desktop (3-4 columnas)
- [ ] Colapsa a 1-2 columnas en mobile
- [ ] Badges técnicos con tipografía monospace
- [ ] Efecto glassmorphism en cada celda

---

### Sección 3 — Showcase de Proyectos
**Propósito:** Presentar proyectos con enfoque de ingeniería (problema → solución → métricas).

**Estructura por proyecto:**
- **Título** + categoría badge (`backend`, `ai-inference`, `system-tools`, `fullstack`)
- **Descripción** del problema resuelto (2-3 líneas)
- **Stack tecnológico** como badges
- **Métricas de desempeño** (ej. Latency: 18ms, VRAM: 5.2 GB, Speed: 38 t/s)
- **Links:** GitHub ↗ | Demo ↗ | HuggingFace ↗ (si aplica)

**Fuente de datos:** Astro Content Collections (`src/content/projects/*.md`)

> [!NOTE]
> **Proyectos de ejemplo:** El usuario tiene proyectos reales pero son privados por acuerdo con clientes. Se crearán **3 proyectos de ejemplo realistas** para demostrar cómo se verán las tarjetas y páginas de detalle. El usuario los reemplazará con descripciones reales (sin exponer código) posteriormente.

**Criterio de Aceptación:**
- [ ] Proyectos se renderizan desde archivos Markdown validados con Zod
- [ ] Filtro por categoría funcional
- [ ] Tarjetas con hover effect (glow + elevación)
- [ ] Links externos funcionan correctamente
- [ ] Subpágina de detalle en `/projects/[slug]` con layout completo
- [ ] Los proyectos de ejemplo son creíbles y demuestran el formato completo

---

### Sección 4 — Local AI Benchmarks & Hardware Lab (Isla React)
**Propósito:** Widget interactivo que demuestra expertise en inferencia local.

**Funcionalidad:**
1. **Selector de modelo:** Dropdown/tabs (Llama-3.1-8B, Mistral-7B, Phi-3, Qwen2-7B, etc.)
2. **Comparación de cuantizaciones:** FP16 vs GGUF Q4_K_M vs GGUF Q8_0 vs EXL2 4-bit
3. **Métricas visualizadas:**
   - Tokens/segundo (gráfica de barras)
   - Consumo de VRAM (gráfica de barras apiladas)
   - Latencia de primer token (TTFT)
4. **Hardware specs:** Card fija mostrando GPU, RAM, OS del lab

#### 4.1 Hardware del Usuario (GPU principal)

| Spec | Valor |
|---|---|
| **GPU** | AMD Radeon RX 9060 XT |
| **VRAM** | 16 GB GDDR6 |
| **Arquitectura** | RDNA 4 (Navi 44 XT) |
| **Backend de inferencia** | ROCm 7.x / Vulkan (llama.cpp) |
| **OS** | Windows (desarrollo local) |

#### 4.2 Datos de Benchmark de Ejemplo

Se incluirán datos de referencia realistas basados en benchmarks de la comunidad para la RX 9060 XT 16GB. El usuario reemplazará estos con sus propios resultados reales.

**Comparativa incluida:** RX 9060 XT vs otras GPUs de 16GB del mercado para dar contexto.

```json
{
  "hardware": {
    "primary": {
      "name": "AMD Radeon RX 9060 XT",
      "vram": "16 GB GDDR6",
      "arch": "RDNA 4",
      "backend": "ROCm 7.x / Vulkan"
    },
    "comparison": [
      { "name": "NVIDIA RTX 4060 Ti 16GB", "arch": "Ada Lovelace" },
      { "name": "NVIDIA RTX 3060 12GB", "arch": "Ampere" }
    ]
  },
  "benchmarks": [
    {
      "model": "Llama-3.1-8B",
      "results": {
        "FP16":       { "tokensPerSec": 28,  "vramGB": 15.2, "ttftMs": 320 },
        "GGUF_Q8_0":  { "tokensPerSec": 52,  "vramGB": 8.6,  "ttftMs": 180 },
        "GGUF_Q4_K_M":{ "tokensPerSec": 78,  "vramGB": 5.1,  "ttftMs": 95  },
        "EXL2_4bit":  { "tokensPerSec": 85,  "vramGB": 5.4,  "ttftMs": 88  }
      }
    },
    {
      "model": "Mistral-7B-v0.3",
      "results": {
        "FP16":       { "tokensPerSec": 32,  "vramGB": 14.1, "ttftMs": 290 },
        "GGUF_Q8_0":  { "tokensPerSec": 58,  "vramGB": 7.8,  "ttftMs": 160 },
        "GGUF_Q4_K_M":{ "tokensPerSec": 84,  "vramGB": 4.6,  "ttftMs": 82  },
        "EXL2_4bit":  { "tokensPerSec": 91,  "vramGB": 4.9,  "ttftMs": 75  }
      }
    },
    {
      "model": "Phi-3-mini-4k",
      "results": {
        "FP16":       { "tokensPerSec": 45,  "vramGB": 7.6,  "ttftMs": 150 },
        "GGUF_Q8_0":  { "tokensPerSec": 72,  "vramGB": 4.2,  "ttftMs": 85  },
        "GGUF_Q4_K_M":{ "tokensPerSec": 105, "vramGB": 2.8,  "ttftMs": 52  }
      }
    },
    {
      "model": "Qwen2-7B",
      "results": {
        "FP16":       { "tokensPerSec": 30,  "vramGB": 14.8, "ttftMs": 310 },
        "GGUF_Q8_0":  { "tokensPerSec": 54,  "vramGB": 8.2,  "ttftMs": 170 },
        "GGUF_Q4_K_M":{ "tokensPerSec": 80,  "vramGB": 4.9,  "ttftMs": 90  }
      }
    }
  ]
}
```

> [!TIP]
> **Para el usuario:** Estos datos son estimaciones basadas en benchmarks comunitarios de la RX 9060 XT con ROCm 7.x y Vulkan backend. Cuando tengas tus resultados reales, solo necesitas editar el archivo `public/data/benchmarks.json` — la UI se actualiza automáticamente.

**Criterio de Aceptación:**
- [ ] Componente React hidratado con `client:visible`
- [ ] Selector de modelo funcional
- [ ] Gráficas animadas al seleccionar modelo/cuantización
- [ ] Responsive: gráficas se adaptan a viewport
- [ ] Datos cargados desde JSON estático (`public/data/benchmarks.json`)
- [ ] Hardware specs card visible con datos de la RX 9060 XT

---

### Sección 5 — Experiencia y Trayectoria Académica
**Propósito:** Timeline profesional y académico.

La timeline soporta **4 entradas** para permitir la inclusión completa de la trayectoria:

| # | Entrada | Detalle | Estado |
|---|---|---|---|
| 1 | Instituto Libertad | ICT Assistant — Infraestructura, APIs, TICs | ✅ Datos disponibles |
| 2 | EPN - ESFOT | Escuela Politécnica Nacional — Formación técnica | ✅ Datos disponibles |
| 3 | *(Experiencia adicional)* | Placeholder — El usuario completará con datos reales | ⏳ Pendiente |
| 4 | *(Experiencia adicional)* | Placeholder — El usuario completará con datos reales | ⏳ Pendiente |

> [!NOTE]
> **Timeline expandible:** El componente `Timeline.astro` se diseñará con un array de datos. Los 2 slots adicionales se renderizan con contenido placeholder estilizado ("Próximamente" o similar). Cuando el usuario agregue datos, solo necesita editar el array — no se requiere tocar el componente visual.

**Estructura de datos por entrada:**
```typescript
interface TimelineEntry {
  date: string;          // "2024 - Presente"
  role: string;          // "ICT Assistant"
  company: string;       // "Instituto Libertad"
  description: string;   // Breve descripción de responsabilidades
  technologies: string[];// ["Python", "Django", "Linux"]
  type: 'work' | 'education'; // Para diferenciar iconos/colores
}
```

**Criterio de Aceptación:**
- [ ] Timeline vertical con línea conectora y nodos circulares
- [ ] 4 entradas renderizadas (2 con datos, 2 con placeholders estilizados)
- [ ] Cada entrada con fecha, rol, institución, descripción y badges de tech
- [ ] Diferenciación visual entre experiencia laboral y académica (iconos/colores)
- [ ] Animación de entrada al hacer scroll (intersection observer o CSS)
- [ ] Fácil de editar: agregar/modificar entradas editando solo el array de datos

---

### Sección 6 — Footer Técnico
**Propósito:** Contacto y metadata técnica.

| Elemento | Detalle | Incluido |
|---|---|---|
| Email/Contacto | Link de contacto | ✅ |
| GitHub | Perfil completo | ✅ |
| LinkedIn | Perfil profesional | ✅ |
| Git SHA | Versión del build actual | ✅ |
| Estado | "Construido con Astro + React + ☕" | ✅ |

> [!NOTE]
> **PGP/SSH Key — DESCARTADO.** Una clave PGP pública en el footer es un detalle de "engineering credibility" usado principalmente por:
> - Desarrolladores que firman sus commits con GPG (`git log --show-signature`)
> - Profesionales de seguridad que publican su fingerprint para comunicación cifrada
> 
> **Requiere:** Tener generada una clave GPG/PGP y haberla subido a un keyserver público (keys.openpgp.org) o a tu perfil de GitHub. Dado que actualmente no tienes una clave pública, se descarta esta funcionalidad. Si en el futuro generas una, será trivial agregarlo al footer (un simple link + fingerprint).

**Criterio de Aceptación:**
- [ ] Links funcionales a GitHub, LinkedIn, email
- [ ] Git SHA renderizado desde variable de entorno en build (`import.meta.env.PUBLIC_GIT_SHA` o similar)
- [ ] Diseño minimal, consistente con el tema
- [ ] Sin PGP/SSH section

---

## 5. Terminal Interactiva (Isla React)

**Propósito:** Componente diferenciador. Mini-terminal donde visitantes puedan ejecutar comandos simulados.

**Comandos soportados:**

| Comando | Output |
|---|---|
| `help` | Lista de comandos disponibles |
| `whoami` | Nombre, rol, ubicación |
| `skills` | Lista de tecnologías con niveles |
| `projects` | Lista resumida de proyectos |
| `contact` | Email, GitHub, LinkedIn |
| `benchmarks` | Resumen de hardware y top models |
| `clear` | Limpia la terminal |
| `neofetch` | 🥚 **Easter egg** — Estilo neofetch con stats del perfil (ASCII art + info sistema) |

**Criterio de Aceptación:**
- [ ] Componente React hidratado con `client:idle`
- [ ] Input de texto funcional con cursor parpadeante
- [ ] Historial de comandos con scroll
- [ ] Respuestas con colores ANSI simulados (verde para éxito, rojo para error, cian para datos)
- [ ] Comando desconocido: `command not found: <input>`
- [ ] Mobile-friendly (teclado virtual no obstruye)
- [ ] `neofetch` renderiza ASCII art con estadísticas al estilo Linux

---

## 6. Modelado de Datos — Astro 5 Content Layer API

> [!IMPORTANT]
> **Corrección Arquitectónica (Software Architect):** Astro 5 reemplazó la legacy Content Collections API con la **Content Layer API**. Los cambios clave son:
> - El archivo de configuración se mueve de `src/content/config.ts` → `src/content.config.ts` (raíz de src/)
> - Se reemplaza `type: 'content'` por un `loader` (ej. `glob()` de `astro/loaders`)
> - La API de queries también cambia ligeramente

### Colección: `projects`

```typescript
// src/content.config.ts  ← NUEVA ubicación en Astro 5
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['backend', 'ai-inference', 'system-tools', 'fullstack']),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
    huggingfaceUrl: z.string().url().optional(),
    metrics: z.record(z.string()).optional(),
    image: z.string().optional(),
    problem: z.string().optional(),
    architecture: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
```

### Proyectos de Ejemplo (3 mínimo)

Se crearán los siguientes proyectos de ejemplo que demuestran el formato completo:

| # | Título | Categoría | Stack Principal |
|---|---|---|---|
| 1 | Scalable REST API | `backend` | Python, Django, PostgreSQL, Redis, Docker |
| 2 | Local LLM Quantizer Pipeline | `ai-inference` | Python, llama.cpp, GGUF, ROCm |
| 3 | Network Monitoring Tool | `system-tools` | Python, FastAPI, SQLite, Prometheus |

> [!NOTE]
> Estos son proyectos de ejemplo para demostrar la UI. El usuario los reemplazará con descripciones de sus proyectos reales (sin exponer código privado) cuando esté listo.

---

## 7. Estructura de Directorios

> [!NOTE]
> **✅ Validada por Software Architect.** Estructura corregida para Astro 5 + Tailwind v4. Cambios vs. plan original:
> - `src/content/config.ts` → `src/content.config.ts` (Content Layer API de Astro 5)
> - `tailwind.config.mjs` → **ELIMINADO** (Tailwind v4 usa configuración CSS-first via `@theme` en `global.css`)
> - Se usa `@tailwindcss/vite` en vez de `@astrojs/tailwind` (deprecado)

```plaintext
my_portfolio/
├── public/
│   ├── favicon.svg
│   ├── cv-luis-adrian-ramos.pdf
│   └── data/
│       └── benchmarks.json          # Datos de benchmarks de IA local
├── src/
│   ├── assets/                      # Imágenes optimizadas por Astro
│   │   └── profile-photo.webp       # ← PLACEHOLDER: reemplazar con foto real
│   ├── components/
│   │   ├── astro/                   # Componentes estáticos (0 JS al cliente)
│   │   │   ├── Navbar.astro
│   │   │   ├── Hero.astro
│   │   │   ├── BentoGrid.astro
│   │   │   ├── ProjectCard.astro
│   │   │   ├── ProjectsSection.astro
│   │   │   ├── Timeline.astro
│   │   │   └── Footer.astro
│   │   └── react/                   # Islas interactivas (JS on-demand)
│   │       ├── Terminal.tsx
│   │       └── BenchmarkViewer.tsx
│   ├── content/
│   │   └── projects/                # Proyectos en Markdown (.md / .mdx)
│   │       ├── scalable-rest-api.md
│   │       ├── local-llm-quantizer.md
│   │       └── network-monitoring-tool.md
│   ├── content.config.ts            # ← Astro 5: Content Layer API (Zod + glob loader)
│   ├── data/
│   │   └── timeline.ts              # Array de entradas del timeline
│   ├── layouts/
│   │   └── BaseLayout.astro         # SEO, OpenGraph, fuentes, meta tags
│   ├── pages/
│   │   ├── index.astro              # Página principal (SPA-like)
│   │   └── projects/
│   │       └── [slug].astro         # Detalle de cada proyecto
│   └── styles/
│       └── global.css               # @import "tailwindcss" + @theme {} + custom CSS
├── Dockerfile.dev                   # Entorno de desarrollo Docker
├── docker-compose.yml               # Orquestación Docker
├── astro.config.mjs                 # Config de Astro + @tailwindcss/vite + React
├── tsconfig.json                    # TypeScript config
├── package.json
├── vercel.json                      # Config de deploy Vercel (opcional)
└── .gitignore
```

### 7.1 Configuración de Astro + Tailwind v4

> [!IMPORTANT]
> **Corrección Arquitectónica (Software Architect):** Tailwind CSS v4 eliminó `tailwind.config.mjs` y `@astrojs/tailwind`. La configuración ahora es **CSS-first**:
> - Los tokens de diseño (colores, fuentes, breakpoints) se definen con `@theme {}` en `global.css`
> - Se usa `@tailwindcss/vite` como plugin de Vite en `astro.config.mjs`
> - Esto simplifica la arquitectura: un solo archivo CSS controla todo el sistema de diseño

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-bg-primary: #0b0f19;
  --color-bg-secondary: #0d1117;
  --color-bg-elevated: #161b22;
  --color-border-default: #1e293b;
  --color-border-subtle: #2d3748;
  --color-accent-cyan: #38bdf8;
  --color-accent-mint: #2dd4bf;
  --color-accent-purple: #a855f7;
  --color-accent-amber: #f59e0b;
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;

  --font-heading: 'JetBrains Mono', monospace;
  --font-body: 'Inter', sans-serif;
  --font-code: 'Fira Code', monospace;
}
```

---

## 8. Entorno Docker (Desarrollo Local)

### `Dockerfile.dev`
```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm install
EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### `docker-compose.yml`
```yaml
services:
  portfolio:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: portfolio-dev
    ports:
      - "4321:4321"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

### Flujo de trabajo diario
```bash
# Levantar el entorno de desarrollo
docker compose up

# Agregar dependencias
docker compose exec portfolio npm install <paquete>

# Detener
docker compose down
```

> [!NOTE]
> Docker es **exclusivamente para desarrollo local**. Vercel maneja el build y deploy de producción de forma independiente.

---

## 9. SEO y Meta Tags

Implementados en `BaseLayout.astro`:

| Meta | Valor |
|---|---|
| `<title>` | "Luis Adrián Ramos — Backend Developer & Local AI Engineer" |
| `<meta description>` | "Portafolio de desarrollo Backend, infraestructura y benchmarking de modelos de IA locales" |
| `og:title` | Mismo que title |
| `og:description` | Mismo que meta description |
| `og:image` | Screenshot/preview del portafolio (generar después del primer deploy) |
| `og:type` | "website" |
| `twitter:card` | "summary_large_image" |
| Canonical URL | URL final de Vercel (o dominio custom si se configura) |
| `robots` | "index, follow" |
| Fuentes | JetBrains Mono + Inter + Fira Code (Google Fonts, `preconnect`) |

---

## 10. Datos Personales — Estrategia de Contenido Progresivo

> [!NOTE]
> **Decisión del usuario:** No es necesario tener todos los datos personales al 100% antes de comenzar el desarrollo. La estrategia es:
> 
> **Fase 1 (ahora):** Construir la base del portafolio con datos de ejemplo y placeholders estilizados.  
> **Fase 2 (post-build):** El usuario reemplaza datos de ejemplo con contenido real (foto, proyectos, benchmarks, experiencias adicionales).
> 
> Los componentes se diseñan para que actualizar contenido sea tan simple como editar archivos Markdown o arrays de datos TypeScript, sin tocar la lógica visual.

**Contenido con placeholder:**
- [ ] Foto de perfil → `src/assets/profile-photo.webp` (placeholder hasta que el usuario proporcione la ruta)
- [ ] 2 entradas de timeline → Slots vacíos estilizados
- [ ] Proyectos → 3 proyectos de ejemplo
- [ ] Benchmarks → Datos estimados de la RX 9060 XT (reemplazables)

**Contenido confirmado:**
- [x] Nombre: Luis Adrián Ramos
- [x] Formación: EPN - ESFOT
- [x] Empleo actual: ICT Assistant @ Instituto Libertad
- [x] GPU: AMD Radeon RX 9060 XT 16GB
- [x] Hosting: Vercel
- [x] Neofetch easter egg: Aprobado
- [x] PGP/SSH: Descartado

---

## 11. Tareas de Desarrollo (Task Breakdown)

### Fase 0 — Setup del Proyecto (~30 min)
- [ ] Inicializar repositorio Git con rama `desarrollo`
- [ ] Crear proyecto Astro 5 con integración React (`@astrojs/react`)
- [ ] Instalar Tailwind v4 (`tailwindcss` + `@tailwindcss/vite`) y configurar en `astro.config.mjs`
- [ ] Configurar tokens de diseño con `@theme {}` en `global.css` (colores, fuentes)
- [ ] Configurar `src/content.config.ts` con Content Layer API (glob loader + esquema Zod)
- [ ] Configurar Docker (Dockerfile.dev + docker-compose.yml)
- [ ] Configurar `BaseLayout.astro` con SEO, fuentes Google, meta tags
- [ ] Configurar `.gitignore` (node_modules, dist, .env, etc.)

### Fase 1 — Layout y Navegación (~45 min)
- [ ] Crear `Navbar.astro` con navegación por anclas + hamburger menu mobile
- [ ] Crear `Footer.astro` con links sociales y Git SHA
- [ ] Implementar `global.css` con scrollbar custom, smooth scroll, estilos base
- [ ] Verificar responsive en mobile/tablet/desktop

### Fase 2 — Hero Section (~30 min)
- [ ] Crear `Hero.astro` con nombre, rol, formación, CTAs
- [ ] Implementar typing animation para subtítulo (CSS preferred, React fallback)
- [ ] Espacio reservado para foto de perfil con placeholder estilizado
- [ ] Botones con magnetic hover + glow effect

### Fase 3 — Bento Grid (~45 min)
- [ ] Crear `BentoGrid.astro` con CSS Grid asimétrico
- [ ] Implementar 6 celdas con contenido (rol, stack, AI lab, hardware, repos, status)
- [ ] Badges técnicos con tipografía Fira Code monospace
- [ ] Glassmorphism (`backdrop-blur`, `bg-white/5`) y hover effects

### Fase 4 — Proyectos (~60 min)
- [ ] Verificar Content Layer API (`src/content.config.ts` con glob loader funcional)
- [ ] Crear 3 archivos Markdown de proyectos de ejemplo en `src/content/projects/`
- [ ] Crear `ProjectCard.astro` con hover glow + elevación + badges
- [ ] Crear `ProjectsSection.astro` con filtro por categoría
- [ ] Crear página de detalle `projects/[slug].astro` con layout de caso de estudio

### Fase 5 — Terminal Interactiva (~60 min)
- [ ] Crear `Terminal.tsx` como componente React
- [ ] Implementar parser de comandos (help, whoami, skills, projects, contact, benchmarks, clear, neofetch)
- [ ] Estilo de terminal con colores simulados (verde, rojo, cian)
- [ ] Easter egg `neofetch` con ASCII art
- [ ] Integrar como isla con `client:idle`

### Fase 6 — Benchmark Viewer (~60 min)
- [ ] Crear `public/data/benchmarks.json` con datos de ejemplo de la RX 9060 XT
- [ ] Crear `BenchmarkViewer.tsx` con selector de modelo y comparativa de cuantizaciones
- [ ] Implementar gráficas con Recharts (barras para t/s, stacked para VRAM)
- [ ] Animaciones de transición entre modelos con Framer Motion
- [ ] Hardware specs card fija
- [ ] Integrar como isla con `client:visible`

### Fase 7 — Timeline (~30 min)
- [ ] Crear `src/data/timeline.ts` con array de 4 entradas (2 reales + 2 placeholders)
- [ ] Crear `Timeline.astro` con diseño vertical + línea conectora
- [ ] Diferenciación visual trabajo vs. educación
- [ ] Animación de entrada con intersection observer

### Fase 8 — Polish & QA (~45 min)
- [ ] Revisión completa de responsive design (375px, 768px, 1024px, 1440px)
- [ ] Verificar accesibilidad (contraste, alt text, aria labels, focus visible)
- [ ] Optimización de imágenes (WebP, lazy loading via Astro Image)
- [ ] Lighthouse audit (target: >90 en Performance, SEO, Accessibility)
- [ ] Build de producción sin errores (`astro build`)
- [ ] Test de navegación, links y descarga de CV

---

## 12. Plan de Verificación

### Tests Automatizados
```bash
npm run build          # Verificar build estático sin errores
npx astro check        # Type-check de componentes Astro
```

### Verificación Manual
- [ ] Navegación por anclas funciona en todas las secciones
- [ ] Terminal acepta y responde a los 8 comandos definidos
- [ ] `neofetch` easter egg funciona
- [ ] Benchmark viewer muestra gráficas al seleccionar modelo
- [ ] Transiciones entre cuantizaciones son fluidas (60fps)
- [ ] Todos los links externos abren en nueva pestaña (`target="_blank"`, `rel="noopener"`)
- [ ] CV descarga correctamente
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1440px)
- [ ] No hay elementos con fondo blanco accidental (dark mode consistente)
- [ ] Placeholder de foto y timeline slots vacíos se ven profesionales

### Deploy Verification
- [ ] `npm run build` exitoso sin warnings
- [ ] Deploy a Vercel funcional
- [ ] URLs de preview de Vercel accesibles
- [ ] Meta tags OG renderizables (verificar con og:image debugger)
