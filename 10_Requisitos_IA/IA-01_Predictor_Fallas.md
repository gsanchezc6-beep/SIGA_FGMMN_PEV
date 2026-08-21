# Ficha IA-01 — Predictor de fallas de equipos

**Identificador y nombre:** IA-01 — Predictor de fallas de equipos de aula.
**Tarea y tipo:** Clasificación binaria (riesgo de falla: alto/bajo) por equipo y ventana temporal; variante de detección de anomalías sobre series de tiempo de sensor.
**RF/RNF preexistentes que sustenta:** RF-09 (Predecir fallos de equipos mediante IA, CU-16, prioridad Should), RNF-10 (Explicabilidad de RF-09, ya definida en `secciones_generadas.tex` L897 y L908-912).

## (a) Descripción del componente

Qué decide: para cada equipo monitoreado (proyector, climatizador) con historial de lecturas suficiente, el modelo produce un puntaje de riesgo de falla en la ventana de los próximos 7 días. Con qué entradas: series de tiempo de lecturas del propio equipo y del aula que lo contiene (temperatura, humedad, ciclos de encendido/apagado, alertas previas registradas en RF-08/RF-10). Con qué salida: puntaje 0-1 + etiqueta alto/bajo riesgo + lista de las variables que más influyeron (para RNF-10). Quién consume el resultado: Personal de Infraestructura y Mantenimiento, vía alerta predictiva (CU-16) y panel (RF-07). Qué ocurre si el modelo se equivoca (fallback): una predicción de "alto riesgo" no bloquea ni ejecuta ninguna acción automática sobre el equipo — solo genera una alerta informativa de prioridad Media que un humano evalúa; el sistema sigue operando con el proceso reactivo actual (RF-08/RF-10/RF-12) si el modelo no está disponible o no tiene confianza suficiente.

## Requisitos funcionales del componente

Ninguno queda aislado: los tres refinan RF-09, ya especificado en el ERS.

| ID | Enunciado verificable | Traza |
|---|---|---|
| **RF-IA-01** | El sistema debe calcular, para cada equipo con al menos 90 días de historial continuo, un puntaje de riesgo de falla en el rango 0–1 referido a una ventana de los próximos 7 días, y recalcularlo al menos una vez al día. | Refina RF-09; verifica CP-IA-01; medido por RNF-IA-01 y RNF-IA-02 |
| **RF-IA-02** | Cuando el puntaje de un equipo supere el umbral de alto riesgo, el sistema debe generar una alerta predictiva de prioridad Media asociada a ese equipo y aula, visible en la vista de alertas, **sin** crear automáticamente un ticket de mantenimiento. | Refina RF-09; se apoya en RF-08 y CU-16; verifica CP-IA-02 |
| **RF-IA-03** | Para cada predicción de alto riesgo mostrada, el sistema debe presentar las variables de sensor que más contribuyeron a esa predicción, en lenguaje natural. | Refina RF-09; operacionaliza RNF-10; verifica CP-IA-03 |

## (b) Datos de entrenamiento requeridos

- **Origen:** historial de lecturas del simulador de sensores del MVP (fase de desarrollo) y, en producción, historial real acumulado por RF-01/RF-03/RF-05 más el registro de fallas de RF-10.
- **Volumen estimado:** mínimo 90 días de historial continuo por equipo antes de entrenar un primer modelo (consistente con SUP-06, "se asume que se almacenarán datos suficientes para aplicar análisis mediante IA").
- **Variables:** temperatura y humedad del aula, ciclos de encendido/apagado del equipo, número de alertas previas del equipo en los últimos 30/90 días, antigüedad del equipo (si está disponible en el inventario).
- **Etiquetado:** la variable objetivo ("falla" sí/no) se deriva automáticamente de los tickets de mantenimiento correctivos (RF-12) cerrados con causa "falla de equipo" — no requiere etiquetado manual adicional.
- **Calidad mínima:** ≥80 % de las lecturas esperadas presentes en la ventana de entrenamiento (máx. 20 % de datos faltantes por interpolación simple).
- **Sesgos conocidos:** el historial de fallas actual depende de qué tan diligente fue el registro manual antes del sistema (RD-17); equipos con bajo uso reciente pueden estar subrepresentados. Se declara como limitación, no se corrige artificialmente.
- **Base legal del tratamiento y política de conservación:** dato de equipo, no dato personal (no aplica LOPDP directamente); se conserva mientras el equipo esté en inventario activo, ver RD-15.

## (c) Métricas de éxito del modelo

- **RNF-IA-01 (rendimiento, principal):** el modelo debe alcanzar F1 ≥ 0,70 en el conjunto de prueba (holdout temporal, no aleatorio) antes de cada despliegue a producción.
- **RNF-IA-02 (rendimiento):** la latencia de inferencia debe ser ≤ 2 s por equipo evaluado, en el percentil 95, para no bloquear la actualización del panel (RF-07).
- **RNF-IA-03 (rendimiento):** el modelo debe reevaluarse (recalcular métricas sobre datos nuevos) cada 30 días; si F1 cae por debajo de 0,60 en dos evaluaciones consecutivas, se retira de producción automáticamente y el sistema vuelve al modo reactivo puro (fallback del bloque (a)).

## (d) Requisitos éticos y de privacidad

- **RNF-IA-04 (equidad):** la tasa de falsos negativos (fallas no predichas) no debe diferir en más de 10 puntos porcentuales entre aulas de uso "alto" (>30 h/semana) y "bajo" (≤30 h/semana), medida trimestralmente — para evitar que el modelo aprenda a ignorar equipos de aulas poco usadas por escasez de datos.
- **RNF-IA-05 (equidad):** la tasa de falsos negativos no debe diferir en más de 10 puntos porcentuales entre edificios/bloques de la Facultad, para no concentrar el beneficio del mantenimiento predictivo en las aulas con mejor conectividad IoT.
- **RNF-10 (explicabilidad, ya existente en el ERS):** el sistema debe presentar la explicación de cada predicción en ≤2 s, ≤60 palabras, con comprensión reportada ≥4/5 Likert — se reutiliza tal cual, no se duplica.
- **Finalidad declarada:** mantenimiento preventivo de equipos, no evaluación del desempeño de docentes ni de aulas.
- **Minimización de datos:** el modelo no usa ningún dato personal (usuario, docente, estudiante); solo series de equipo/aula.
- **Supervisión humana:** toda predicción de alto riesgo pasa por revisión humana antes de generar un ticket de mantenimiento (RF-12) — el modelo nunca crea el ticket automáticamente.

## (e) Plan de monitoreo

- **Indicadores en producción:** F1 mensual, tasa de falsos negativos por segmento (uso alto/bajo, edificio), latencia p95.
- **Frecuencia de medición:** mensual (alineado con RNF-IA-03).
- **Umbral de alerta por deriva (drift):** caída de F1 >15 puntos respecto a la línea base del último reentrenamiento, o cambio en la distribución de la variable "ciclos de encendido/apagado" >2 desviaciones estándar respecto al conjunto de entrenamiento.
- **Criterio de reentrenamiento:** cada 90 días o al activarse el umbral de deriva, lo que ocurra primero.

## Clasificación de riesgo — Reglamento (UE) 2024/1689

**Nota de aplicabilidad honesta:** el SIGA opera en Ecuador, sobre infraestructura de la UTEQ; el Reglamento (UE) 2024/1689 no aplica jurídicamente salvo nexo con la UE (proveedor establecido en la UE, o salida del sistema usada en la UE), que aquí no existe. Se usa igualmente como **marco de mejores prácticas**, tal como pide la guía, no como obligación legal directa — la obligación legal real y aplicable es la LOPDP ecuatoriana (ya cubierta en §3.4 del ERS).

Bajo el enfoque basado en riesgo del Reglamento, IA-01 **no** encaja en ninguna categoría del Anexo III (no es biometría, no es gestión de infraestructura crítica en el sentido del Reglamento —no opera la red eléctrica ni la red de agua/gas del campus, solo equipos individuales de aula—, no es empleo, crédito, aplicación de la ley, migración ni proceso democrático). Se clasifica como **riesgo mínimo/limitado**, con obligación de transparencia (el usuario debe saber que la predicción es generada por IA) — ya cubierta por RNF-10.
