# Ficha IA-02 — Análisis de patrones de consumo energético

**Identificador y nombre:** IA-02 — Análisis de patrones de consumo energético.
**Tarea y tipo:** Detección de anomalías + agrupamiento (clustering) sobre series de tiempo de consumo, para identificar aulas/horarios con consumo atípico y proponer reglas de ahorro.
**RF/RNF preexistentes que sustenta:** RF-14 (Analizar patrones de consumo energético, CU-16, prioridad Should), RF-17 (Reportes estadísticos, consumidor del resultado).

## (a) Descripción del componente

Qué decide: identifica aulas y franjas horarias cuyo consumo energético (proxy: ciclos de climatización + ocupación, según disponibilidad de sensor de consumo real por RD-07) se desvía significativamente de su propio patrón histórico o del patrón de aulas comparables. Con qué entradas: lecturas de ocupación (RF-03), estado de climatización/proyector (RF-04/RF-05), y lectura directa de consumo cuando el sensor de consumo energético esté disponible (Sección 2.5, "cuando la infraestructura lo permita" — no está garantizado en todas las aulas). Con qué salida: lista de anomalías de consumo con aula, franja horaria y magnitud de la desviación, alimentando el reporte administrativo (RF-17/RF-18). Quién consume el resultado: Autoridades de la Facultad, Personal Administrativo. Qué ocurre si el modelo se equivoca (fallback): una anomalía mal detectada solo produce una línea de más (o de menos) en un reporte que un humano revisa antes de tomar cualquier decisión de inversión o cambio de regla — no ejecuta ninguna acción automática sobre equipos.

## Requisitos funcionales del componente

Los tres refinan RF-14 y alimentan RF-17; ninguno queda aislado.

| ID | Enunciado verificable | Traza |
|---|---|---|
| **RF-IA-04** | El sistema debe calcular, para cada aula con al menos 60 días de historial, una línea base de consumo por franja horaria y día de la semana, e indicar explícitamente si esa línea base proviene de un sensor de consumo real o del indicador indirecto (ocupación y estado de equipos). | Refina RF-14; se apoya en RF-03/RF-04/RF-05; verifica CP-IA-04 |
| **RF-IA-05** | El sistema debe ejecutar, una vez al día, la detección de desviaciones respecto a la línea base y producir la lista de anomalías con aula, franja horaria y magnitud de la desviación. | Refina RF-14; verifica CP-IA-05; medido por RNF-IA-06, RNF-IA-07 y RNF-IA-08 |
| **RF-IA-06** | El sistema debe incorporar las anomalías detectadas al reporte administrativo del periodo, agregadas por aula y franja horaria, indicando para cada una la variable que más contribuyó a la desviación. | Refina RF-14; alimenta RF-17/RF-18; operacionaliza RNF-IA-10 y RNF-IA-11; verifica CP-IA-06 |

## (b) Datos de entrenamiento requeridos

- **Origen:** mismas fuentes que IA-01 (RF-01, RF-03, RF-05) más lectura de consumo cuando exista sensor dedicado (Sección 2.5, componente de hardware "Sensores o módulos de consumo energético").
- **Volumen estimado:** mínimo 60 días de historial por aula para establecer una línea base de patrón normal (un ciclo académico corto es suficiente para detección de anomalías, a diferencia del predictor de fallas que necesita más historial).
- **Variables:** ocupación, estado de climatización/proyector, hora del día, día de la semana, consumo directo (si existe sensor).
- **Etiquetado:** no requiere etiquetado manual — es un modelo no supervisado (detección de anomalías respecto al patrón propio del aula).
- **Calidad mínima:** igual que IA-01, ≥80 % de lecturas presentes en la ventana.
- **Sesgos conocidos:** las aulas sin sensor de consumo directo dependen del proxy (ocupación + estado de equipo), que es menos preciso que una lectura real de consumo — esto se declara explícitamente en el reporte, no se oculta.
- **Base legal y conservación:** dato agregado de aula, no dato personal; se conserva conforme a RD-15.

## (c) Métricas de éxito del modelo

- **RNF-IA-06 (rendimiento, principal):** tasa de falsos positivos de anomalía ≤15 % sobre un conjunto de validación etiquetado manualmente por Infraestructura y Mantenimiento (muestra de al menos 4 semanas revisadas por un humano al cierre de cada ciclo académico).
- **RNF-IA-07 (rendimiento):** el análisis por lote (batch) debe completarse en ≤10 minutos para el conjunto completo de aulas monitoreadas, ejecutado una vez por día (no requiere tiempo real).
- **RNF-IA-08 (rendimiento):** cobertura ≥90 % de las aulas con sensor de ocupación activo, aun en las que no tengan sensor de consumo dedicado (usando el proxy del bloque (a)).

## (d) Requisitos éticos y de privacidad

- **RNF-IA-09 (equidad):** la tasa de detección de anomalías no debe diferir en más de 15 puntos porcentuales entre aulas con sensor de consumo real y aulas que dependen solo del proxy, para no penalizar sistemáticamente en los reportes a las aulas con menos instrumentación (que es una decisión presupuestaria, RD-07/RD-08, no una responsabilidad del usuario del aula).
- **RNF-IA-10 (equidad):** los reportes de consumo (RF-17) no deben usarse para atribuir responsabilidad individual a un docente específico por el consumo de un aula que no controla directamente (climatización con reglas automáticas de RF-13); el reporte se presenta agregado por aula/horario, no por persona.
- **RNF-IA-11 (explicabilidad):** cada anomalía reportada debe indicar la variable que más contribuyó a la desviación (p. ej. "climatización activa con aula vacía 40 % del tiempo detectado" en vez de solo un puntaje numérico), en el mismo reporte, sin requerir consulta técnica adicional.
- **Finalidad declarada:** eficiencia energética institucional, no evaluación de desempeño individual.
- **Minimización de datos:** no se usa identidad de usuario/docente; el análisis es por aula y franja horaria.
- **Supervisión humana:** ninguna acción correctiva (cambio de regla de climatización, inversión) se ejecuta automáticamente; el resultado alimenta un reporte para revisión de Autoridades/Administrativo (RF-17).

## (e) Plan de monitoreo

- **Indicadores en producción:** tasa de falsos positivos mensual (contra la muestra revisada manualmente), cobertura de aulas analizadas.
- **Frecuencia de medición:** mensual, alineado al ciclo de reportes administrativos (RF-17).
- **Umbral de alerta por deriva:** tasa de falsos positivos >25 % durante dos meses consecutivos, o caída de cobertura por debajo del 80 % (por ejemplo, por caída de sensores — cruza con RNF-13/RNF-16/RNF-17).
- **Criterio de reentrenamiento:** recalcular la línea base de patrón normal por aula al inicio de cada periodo académico (cambia el patrón de ocupación esperado).

## Clasificación de riesgo — Reglamento (UE) 2024/1689

Misma nota de aplicabilidad honesta que IA-01 (marco de referencia, no obligación directa; la obligación real es la LOPDP). IA-02 se clasifica también como **riesgo mínimo/limitado**: no es un sistema de gestión de infraestructura crítica en el sentido del Anexo III (no opera la red eléctrica del campus, RD-18; solo analiza consumo de equipos de aula), no procesa datos personales ni biométricos, y no tiene efecto automático sobre personas. Obligación de transparencia cubierta por RNF-IA-11.
