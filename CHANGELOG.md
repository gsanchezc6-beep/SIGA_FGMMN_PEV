# Registro de cambios — SIGA (Sistema Inteligente de Gestión de Aulas)

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Todas las versiones corresponden a entregas del Proyecto Fin de Curso
ISR-401 Ingeniería de Requerimientos, período 2026–2027 PPA.

## [PEV-1.1.0] — 2026-08-23 (Entrega 5 — Unidad V, revisión de cierre)

### Añadido
- Diez figuras numeradas y referenciadas en el informe final (casos de uso,
  contexto, componentes, despliegue, clases, los dos diagramas de estados, i* SD
  y SR, y la secuencia de CU-16), con `\listoffigures`. El cuerpo analítico pasa
  de 37 a 46 páginas sin anexos.
- `11_Informe_Final/secciones/fig_estado_alerta.tex`: diagrama de estados de
  `Alerta` redibujado en TikZ dentro del repositorio, de modo que se regenera al
  compilar en lugar de depender de una imagen exportada a mano.
- Etiqueta anotada `v4.0-PE5` como línea base de salida de la unidad, declarada
  en la §3 y la §6.1 del informe.

### Corregido
- **D-15 (nuevo defecto, severidad alta).** El diagrama de estados de `Alerta`
  entregado desde la Entrega 3 modelaba `Pending → InProgress → Closed`, ciclo
  calcado del de `SolicitudMantenimiento`, y no el especificado en la §4.6 del
  ERS (`Generada → Notificada → {Atendida | Escalada}`); omitía la escalada por
  vencimiento del umbral de NFR-01. Se corrigió el diagrama, no el texto: el
  ciclo especificado tiene respaldo en NFR-01, en la columna `Estado` de la
  matriz y en el análisis de impacto. Con ello el registro pasa a 15 defectos
  raíz y 72 instancias contables, y M6 «antes» de 1,73 a 1,76. M6 «después»
  sigue en 0,00.
- La tabla de respaldo de M6 en el Anexo A omitía la fila de D-14, de modo que
  sumaba 69 instancias frente a las 71 que declaraba el texto. Se completa la
  tabla y se añade la fila de total, para que la aritmética sea auditable.
- Resúmenes bilingües ampliados a 230 palabras en español y 231 en inglés; antes
  quedaban en 172 y 151, por debajo de las 200 que pide la guía.

## [PEV-1.0.0] — 2026-08-22 (Entrega 5 — Unidad V, versión de entrega)

### Añadido
- **ERS versión 4.0**, consolidando todos los cambios de PE1 a PE5: RNF-17 de
  seguridad física, CU-17 de derechos sobre datos personales, sección 4.11 con el
  Diagrama de Flujo de Datos de nivel 1, y la prioridad MoSCoW de los 13 RNF que
  no la tenían.
- Seis requisitos funcionales de IA (RF-IA-01 a RF-IA-06), que completan los
  mínimos por componente que exige la guía.
- 42 casos de prueba conceptuales derivados de los criterios de verificación reales.
- Presentación de defensa de 14 diapositivas y banco de respuestas del tribunal
  (12_Defensa/).

### Corregido
- Las 17 historias de usuario, reescritas: Connextra bien formado y escenarios
  Gherkin con evento observable en lugar de un marcador de plantilla.
- Sección 6.1 del ERS: declara la desviación entre el alcance planificado y el
  implementado del MVP, que declaraban conjuntos distintos de RF.
- Cuatro errores de compilación por usar el símbolo de porcentaje dentro de modo
  matemático.

### Métricas (antes / después de las correcciones)
- M1a completitud: 70,73 % → 100 %
- M2 consistencia: 0,957 → 1,000, sin conflictos abiertos
- M4 trazabilidad adelante: 0 % → 100 %
- M6 corrección: 1,76 → 0,00 (valor «antes» actualizado en PEV-1.1.0 al
  incorporarse D-15; la cifra 1,68 que constaba aquí era anterior al registro
  completo de defectos)
- M5 modificabilidad: 4,2, no alcanza el umbral de 3,0; se asume y se justifica

### Pendiente
- Re-inspección independiente de la versión 4.0, que respaldaría el M6 igual a cero.
- Barrido semántico par a par de los 400 pares RF↔RNF.
- Ampliar la elicitación a los siete actores nunca entrevistados como fuente (D-03).
- Completar el DOI o ISBN de las siete referencias que no lo llevan (dos normas
  ISO/IEC, la LOPDP, el SWEBOK v4.0, el informe técnico de Kitchenham y dos
  libros). No se rellenan con valores no comprobados. Las 36 entradas están
  citadas individualmente en el cuerpo: no se usa `\nocite` comodín.
- Ensayo cronometrado de la defensa.

## [PEV-0.2.0] — 2026-08-22 (Entrega 5 — Unidad V)

### Añadido
- Auditoría de calidad del ERS con las seis métricas de ISO/IEC 25010:2023,
  con aritmética reproducible y registro de 12 defectos (09_Metricas/).
- 32 casos de prueba conceptuales derivados del criterio de verificación real
  de cada requisito; el ERS no contenía ninguno.
- Diagrama de Flujo de Datos de nivel 1 con 8 procesos (P-1 a P-8).
- CU-17 «Ejercer derechos sobre datos personales», que da caso de uso propio
  a RF-24 y RF-25 (antes colgaban de CU-11, que es gestión de acceso).
- Matriz de trazabilidad PE5 de 48 filas con las columnas Proceso_DFD, Estado
  e ID_CP, y con los 16 RNF trazados por primera vez.
- Fichas de los dos componentes de IA con los cinco bloques exigidos, 6 RF de
  IA, 11 RNF de IA y clasificación de riesgo (10_Requisitos_IA/).
- RNF-17 de seguridad física (Safety), ausente del modelo de calidad pese al
  apagado automático de climatización.
- Informe final en LaTeX, con instrucciones de compilación reproducibles
  (11_Informe_Final/). La cifra de páginas verificada al cierre de la versión
  está en `11_Informe_Final/COMPILACION_LOG.txt`; la que constaba aquí (134)
  era incorrecta y se retira.

### Corregido
- Prioridad MoSCoW de RF-20, RF-24 y RF-25: el CSV de priorización los marcaba
  Must y el documento Should. Se consolidó en 17 Must y 8 Should.
- Figura del diagrama de estados de mantenimiento, referenciada por el ERS
  pero ausente de 01_ERS/figuras/, que impedía compilar el informe.
- Diagrama de despliegue reemplazado por su versión actualizada.

### Pendiente
- D-02: declarar la prioridad MoSCoW de 12 RNF.
- D-03: elicitar o justificar los 7 actores sin RF de origen.
- D-10: reescribir la cláusula «Cuando» de las 17 historias de usuario.
- D-12: explicar el desvío entre el alcance planificado y el implementado del
  MVP (secciones 6.1 y 6.4 del ERS declaran conjuntos distintos de RF).
- Fusionar RNF-17 y CU-17 en el cuerpo del ERS y emitir su versión final.
- Presentación y ensayo de la defensa.

## [PEV-0.1.0] — 2026-08-22 (Entrega 5 — Unidad V, en curso)

### Añadido
- Estructura inicial del repositorio de la Unidad V (carpetas y archivos raíz).

### Pendiente
- Incorporación de los artefactos de la Unidad V: auditoría de calidad con las
  seis métricas (09_Metricas/), fichas de los componentes de IA y requisitos de
  equidad, explicabilidad y Safety (10_Requisitos_IA/), matriz de trazabilidad
  PE5 con DFD nivel 1 y CU-17 (04_Trazabilidad/), e informe final en LaTeX
  (11_Informe_Final/).
- Consolidación del ERS/SRS en su versión final con los cambios de PE1 a PE5.

## [2A-1.0.0] — 2026-08-02 (Entrega 3 — 2A)

### Añadido
- Ampliación de 23 a 25 requisitos funcionales (RF-24, RF-25) derivados
  de la Ley Orgánica de Protección de Datos Personales del Ecuador.
- Requisitos no funcionales cuantificados sobre las nueve características
  de ISO/IEC 25010:2023, incluido el requisito de explicabilidad
  obligatorio para RF-09 (RNF-10).
- Sección de requisitos legales mapeados a la LOPDP (Ley → Artículo →
  RF/RNF).
- Historias de usuario en formato Connextra con criterios de aceptación
  en Gherkin para los 17 RF de prioridad Must.
- Modelado UML completo: diagramas de secuencia, actividad, estados,
  componentes y despliegue, además de los heredados de contexto, casos
  de uso general y clases. Modelado organizacional i* (SD y SR).
- Priorización combinada MoSCoW + Kano + WSJF con datos reales de sesión
  de equipo.
- Segunda ronda de campo: 11 entrevistas adicionales (9 en video, 2 en
  audio), 6 sesiones de validación (walkthrough) con acta, cuestionario
  ampliado con 31 respuestas.
- Producto Mínimo Viable (MVP) con cobertura del 64,7 % de los RF Must,
  en repositorio separado.
- Protocolo del componente empírico (comparación de calidad de RF
  humanos frente a RF generados por modelo de lenguaje grande).
- Archivos raíz obligatorios: LICENSE, CITATION.cff, CHANGELOG.md.

### Cambiado
- Migración completa del documento ERS/SRS de Word a LaTeX.
- Ampliación de la matriz de trazabilidad (de 28 a un mínimo de 40
  filas), incorporando las columnas Ley, Objetivo, ID-HU, ID-CA,
  ID-Componente e ID-Mockup.
- Corrección de codificación de participantes en las transcripciones de
  campo (véase 02_Evidencias/Transcripciones/00_LEEME_Transcripciones.txt
  para el detalle de las correcciones aplicadas).

### Pendiente para el cierre de esta entrega
- Transcripción de las entrevistas EV-05 y EV-06.
- Codificación temática y curva de saturación de la segunda ronda.
- Registro del protocolo experimental en el OSF.
- Documentación ética: firmas, aval institucional del Decano, CV del
  docente responsable, certificado de formación ética (CITI o
  equivalente).
- Ejecución del componente empírico (modelo de lenguaje grande) y
  análisis estadístico.

## [1B-1.0.0] — 2026-06-30 (Entrega 2 — 1B)

Nota: 9,70/10. Observaciones del docente resueltas en la Entrega 3 (2A):
declaración de las tres técnicas de elicitación efectivamente aplicadas
(entrevista, cuestionario y observación), corrección de resolución del
video EV-02 y declaración de uso de inteligencia artificial generativa.

### Añadido
- 23 requisitos funcionales, 6 requisitos no funcionales, 18 restricciones
  de diseño y 16 casos de uso.
- Documento de Especificación de Requisitos de Software (ERS) inicial.
- Diagrama de contexto, diagrama general de casos de uso y diagrama de
  clases conceptual.
- 4 prototipos de interfaz de alta fidelidad (mockups).
- 7 evidencias de campo (EV-01 a EV-07): entrevistas, cuestionario a
  9 estudiantes, fotografías, documento de horario académico, video del
  proceso de mantenimiento físico y evidencia del sistema de cámaras.
- Matriz de trazabilidad inicial (28 filas).

## [1A-1.0.0] — 2026-05-XX (Entrega 1 — 1A)

### Añadido
- Definición inicial del dominio, alcance y stakeholders del proyecto
  SIGA.
