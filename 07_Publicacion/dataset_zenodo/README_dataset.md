# README — Dataset Zenodo: Proyecto SIGA (Ingeniería de Requerimientos, ISR-401, UTEQ)

## Descripción general
Este repositorio contiene los artefactos de datos del proceso de Ingeniería de
Requerimientos del proyecto SIGA (Sistema Inteligente de Gestión de Aulas),
equipo FGMMN, asignatura ISR-401, Universidad Técnica Estatal de Quevedo (UTEQ).

## Estructura de carpetas y diccionario de datos

### `02_Evidencias/Codificacion_Tematica/`
- `codificacion_tematica.csv` — Codificación abierta de 42 fragmentos extraídos
  de las 11 transcripciones (EV-01, EV-02, EV-08 a EV-16). Columnas: Fragmento
  (cita textual), Codigo (etiqueta de codificación abierta), Categoria
  (categoría axial), Requisito_derivado (RF/RNF relacionado), ID_evidencia
  (código de entrevista), Analista_codificador.
- `curva_saturacion_tematica.png` — Curva de códigos únicos acumulados por
  entrevista, en orden cronológico de recolección.

### `04_Trazabilidad/`
- `matriz_trazabilidad.csv` — 44 filas. Columnas: Ley, Articulo, Objetivo,
  Stakeholder, ID-EV, ID-RF, Tipo, ID-CU, ID-HU, ID-CA, ID-Componente,
  ID-Mockup.
- `priorizacion_moscow_kano.csv` — Prioridad MoSCoW, resultados WSJF (17 filas
  con datos reales de sesión de equipo) y clasificación Kano (3 pares
  funcional/disfuncional reales del cuestionario; RF-12 y RF-09 sin
  clasificar por ausencia de instrumento Kano para esos ítems).

### `06_Experimento/` (componente empírico, Enfoque 1: RF humanos vs. LLM)
- `protocolo.md` — Protocolo completo: PICOC, hipótesis, variables, diseño,
  plan estadístico, amenazas a la validez.
- `CLAVE_RESPUESTAS_no_compartir_con_jueces.csv` — Clave de origen real
  (Humano/LLM) por ítem ciego. **Uso restringido a análisis; no se comparte
  con jueces evaluadores.**
- `instrumentos/`
  - `Paquete_Evaluacion_Ciega_Jueces.md` — 51 ítems (25 humanos + 26 LLM)
    mezclados y anonimizados, semilla fija 20260802.
  - `rubrica_evaluacion.md` / `.csv` — Rúbrica de 5 dimensiones con anclas 1-5.
  - `Hoja_Puntuacion_JUEZ.csv` — Plantilla en blanco de hoja de puntuación.
- `prompts_llm/`
  - `prompt_llm_conjunto_A.md` — Registro de la consigna exacta, modelo
    (Claude Sonnet 5, interfaz de chat), material fuente y limitación
    metodológica declarada (el modelo no era una instancia "ingenua": tuvo
    exposición previa parcial al Conjunto B humano en la misma cuenta de
    chat — amenaza a la validez de constructo).
  - `material_fuente_LLM.txt` — Corpus de las 11 transcripciones entregado
    al modelo.
  - `Conjunto_A_RF_LLM.md` — Los 26 RF generados por el LLM.
- `resultados/`
  - `juez1.csv`, `juez2.csv`, `juez3.csv` — Puntuaciones reales de los 3
    jueces evaluadores (5 dimensiones × 51 ítems cada uno).
  - `resumen_resultados.csv` — Medias por conjunto (Humano/LLM), prueba
    estadística (t apareado o Wilcoxon según normalidad Shapiro-Wilk),
    p-valor y Cohen's d, por dimensión.
  - `acuerdo_interevaluador.csv` — κ de Cohen (ponderado lineal) por par de
    jueces y κ de Fleiss conjunto, por dimensión.
- `scripts_analisis/analizar_resultados.py` — Script de análisis estadístico
  (reproducible, requiere pandas/scipy/numpy/scikit-learn).

### `07_Publicacion/`
- `manuscrito_borrador.pdf` — Título, resumen, introducción, trabajo
  relacionado, metodología y disponibilidad de datos. **Resultados,
  Discusión y Conclusiones se completan ahora que existen datos reales de
  los 3 jueces** (antes bloqueados por el gatekeeper G4 del proyecto,
  para evitar resultados fabricados).

## Limitaciones metodológicas declaradas (transparencia obligatoria)
1. **Validez de constructo (Conjunto A):** el LLM que generó los 26 RF del
   Conjunto A tuvo exposición previa parcial al Conjunto B humano en la
   misma cuenta de chat. Ver detalle y redacción sugerida en
   `prompt_llm_conjunto_A.md`.
2. **Potencia estadística:** el diseño pre-registrado compara medias por
   juez (n=3), lo que produce una prueba de baja potencia; los tamaños de
   efecto (Cohen's d) calculados con n=3 deben interpretarse con cautela,
   no como magnitudes de efecto poblacional robustas.
3. **Acuerdo inter-evaluador:** κ de Fleiss entre 0.29 y 0.34 según
   dimensión (acuerdo "aceptable/moderado" según Landis & Koch), lo que
   indica variabilidad real de criterio entre jueces, no un instrumento
   perfectamente calibrado.

## Licencia
CC BY 4.0.

## Preregistro
Protocolo registrado en OSF: [DOI/URL a completar tras aprobación de la
revisión institucional en curso].

## Contacto
Gary Alberto Sánchez Cornejo, analista líder, equipo FGMMN — Facultad de
Ciencias de la Computación y Diseño Digital, UTEQ.
