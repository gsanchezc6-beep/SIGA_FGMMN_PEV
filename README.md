# SIGA — Sistema Inteligente de Gestión de Aulas
## Práctica Experimental 5 (PE5) — Unidad V: Integración, Métricas y Defensa

Proyecto Integrador de la asignatura **Ingeniería de Requerimientos (ISR-401)**,
Carrera de Ingeniería de Software, Facultad de Ciencias de la Computación,
**Universidad Técnica Estatal de Quevedo (UTEQ)**. Período 2026–2027 PPA.
Docente responsable: Guerrero Ulloa Gleiston Cicerón, PhD.

### Equipo FGMMN

| Integrante | Rol |
|---|---|
| Sánchez Cornejo Gary Alberto | Analista líder |
| Mendoza Palma Allan Jeremy | Modelador |
| Cedeño Avila Winston Damian | Modelador |
| Muñoz Quiñonez Yeranick Esther | Documentadora |
| Gilces Carranza José Ignacio | Verificador |

---

## Cómo regenerar el PDF del informe final (gatekeeper G2)

**Compilador:** MiKTeX o TeX Live, con `pdflatex` y `biber` disponibles en el PATH.
Verificado con MiKTeX 25.12 / MiKTeX-pdfTeX 4.23.

**Archivo principal:** `11_Informe_Final/main.tex`

**Orden exacto de comandos:**

```bash
git clone https://github.com/gsanchezc6-beep/SIGA_FGMMN_PEV.git
cd SIGA_FGMMN_PEV/11_Informe_Final
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

Equivalente en un solo paso:

```bash
bash 11_Informe_Final/compilar.sh
```

Se requieren cuatro pasadas: la primera genera las referencias cruzadas y el
archivo `.bcf`; `biber` procesa la bibliografía; la tercera y la cuarta resuelven
el índice, la lista de tablas/figuras y las citas ya procesadas.

**Dependencias de paquetes LaTeX:** `babel` (spanish), `geometry`, `graphicx`,
`float`, `longtable`, `booktabs`, `amssymb`, `xcolor` (opción `table`),
`hyperref`, `enumitem`, `fancyhdr`, `titlesec`, `lastpage`, `multirow`,
`tikz` (con las librerías `arrows.meta` y `positioning`),
`biblatex` (backend `biber`, estilo `ieee`). MiKTeX instala los paquetes
faltantes automáticamente en la primera compilación si hay conexión a internet.

**Importante:** `main.tex` referencia artefactos fuera de su carpeta mediante
rutas relativas (`../01_ERS/`, `../04_Trazabilidad/`, `../10_Requisitos_IA/`),
y las figuras del informe se cargan desde `../01_ERS/figuras/` a través de
`\graphicspath`. Debe clonarse el repositorio completo; no basta con descargar
`11_Informe_Final/`.

---

## Estructura del repositorio

| Carpeta | Contenido |
|---|---|
| `01_ERS/` | ERS/SRS final en LaTeX y sus figuras |
| `02_Evidencias/` | Evidencia de campo: audio, video, transcripciones, consentimientos, cuestionario |
| `03_Modelado/` | Diagramas UML (contexto, casos de uso, clases, secuencia, actividad, estados, componentes, despliegue), i* y mockups |
| `04_Trazabilidad/` | Matriz de trazabilidad, priorización MoSCoW/Kano/WSJF, DFD nivel 1, huérfanos y cadenas rotas |
| `05_MVP/` | Documentación y video de demostración del Producto Mínimo Viable |
| `06_Experimento/` | Protocolo, instrumentos, resultados y scripts del componente empírico |
| `07_Publicacion/` | Manuscrito y conjunto de datos para depósito |
| `08_Etica/` | Documentación ética y consentimientos institucionales |
| `09_Metricas/` | Auditoría de calidad del ERS (Anexo A) y registro de defectos |
| `10_Requisitos_IA/` | Fichas de los componentes de IA y requisitos de equidad, explicabilidad y Safety |
| `11_Informe_Final/` | Informe final en LaTeX (`main.tex`), secciones, bibliografía y PDF generado |

Las carpetas contienen un archivo `.gitkeep` porque Git no versiona directorios
vacíos; se eliminará de cada carpeta a medida que reciba su contenido definitivo.

## Repositorios relacionados

- ERS y documentación de la Entrega 3 (2A): <https://github.com/gsanchezc6-beep/SIGA_FGMMN_ISR401_AVANCE_2A>
- Producto Mínimo Viable (MVP): <https://github.com/gsanchezc6-beep/SIGA_FGMMN_MVP>

## Licencia

Ver [LICENSE](LICENSE). Cita académica en [CITATION.cff](CITATION.cff).
