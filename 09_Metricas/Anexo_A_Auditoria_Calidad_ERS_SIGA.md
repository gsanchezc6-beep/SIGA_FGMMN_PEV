# Anexo A — Auditoría de calidad del ERS (SIGA)

**Documento auditado.** `01_ERS/secciones_generadas.tex`, más `04_Trazabilidad/matriz_trazabilidad.csv` y `04_Trazabilidad/priorizacion_moscow_kano.csv`.

- **Medición inicial (20–22/08/2026):** versión 3.0 del ERS, commit `9f7c54c`.
- **Re-medición (22/08/2026):** versión 4.0 del ERS, tras aplicar las correcciones de la Unidad V.

**Alcance.** Cobertura completa de las 25 fichas RF (§3.2), las 17 fichas RNF (§3.3), las 18 restricciones (§3.5), las 17 historias de usuario (§3.6), la especificación de los 17 CU (§4.2), la Tabla 42 (§5.1), la sección VI del MVP y las matrices CSV. Las limitaciones de alcance que subsisten se declaran en cada métrica.

---

## Tabla de auditoría (plantilla 7.1) — antes y después

| Métrica | Antes (v3.0) | Después (v4.0) | Referencia | Cumple |
|---|---|---|---|---|
| M1a Completitud (4 atributos) | 70,73 % (29/41) | **100 %** (42/42) | ≥95 % | **Sí** |
| M1b Completitud (CU) | 100 % (16/16) | **100 %** (17/17) | 100 % | **Sí** |
| M1c Actores con ≥1 RF | 100 % (9/9) | **100 %** (9/9) | 100 % | **Sí** |
| M2 Consistencia | 0,957 — 2 conflictos abiertos | **1,000** — 0 abiertos | ≥0,98 y 0 abiertos | **Sí** |
| M3 Verificabilidad | 100 % (41/41) | **100 %** (42/42) | ≥90 % | **Sí** |
| M4_ade Trazabilidad adelante | 0 % (0/25) | **100 %** (25/25) | ≥90 % | **Sí** |
| M4_atr Trazabilidad atrás | 100 % (25/25) | **100 %** (25/25) | 100 % | **Sí** |
| M5 Modificabilidad | 4,2 | **4,2** | ≤3,0 | **No** |
| M6 Corrección | 1,76 (72/41) | **0,00** (0/42) | ≤0,05 | **Sí** |

Ocho de las nueve mediciones alcanzan su valor de referencia tras las correcciones. **M5 sigue sin cumplir** y no se maquilla: refleja un acoplamiento real del diseño, no un defecto documental.

Dos advertencias metodológicas antes de leer estas cifras, ambas desarrolladas en su métrica: **M1c** cambió respecto al primer reporte no porque el documento cambiara, sino porque se corrigió la definición operativa que se estaba aplicando; y **M6 = 0,00** significa «cero defectos residuales de los registrados», no «documento sin defectos» —una re-inspección independiente sobre la versión 4.0, hecha por una persona distinta de quien aplicó las correcciones, sigue pendiente.

---

## M1a — Completitud (ID, prioridad, fuente, criterio de aceptación)

```bash
awk 'NR>=494 && NR<=880' secciones_generadas.tex | grep -c "Prioridad (MoSCoW)"   # → 25 RF
# RNF con prioridad declarada en la Tabla 42                                       # → 17
```

- **Antes:** 25/25 RF completos, pero solo 4/16 RNF, porque únicamente NFR-01, 02, 03 y 10 tenían prioridad MoSCoW declarada. → 29/41 = **70,73 %**.
- **Corrección aplicada:** se declaró la prioridad de los 13 RNF pendientes (los 12 huérfanos más el nuevo RNF-17) en la Tabla 42, **cada una con justificación escrita**. Reparto: 7 Must, 5 Should, 1 Could. Criterio usado: es Must lo que, de faltar, impide operar o expone a incumplimiento legal (NFR-05, 07, 08, 11, 12, 16 y RNF-17); es Should lo que degrada calidad sin bloquear (NFR-04, 06, 13, 14, 15); es Could lo que solo facilita evolución futura (NFR-09).
- **Después:** 42/42 = **100 %**.

## M1b — Completitud de casos de uso

17/17 casos de uso identificados tienen especificación textual completa. CU-17 se incorporó en esta unidad. **100 %.**

## M1c — Actores con ≥1 RF

**Corrección de la definición operativa.** El primer reporte aplicó la lectura «actores que *originan* al menos un RF» y midió 2/9 = 22,22 %. Esa lectura es incorrecta por una razón concreta: convierte a M1c en un duplicado de M4_atr, que ya mide exactamente eso («#RF con fuente o *stakeholder* identificado»). La lectura que la hace medir algo distinto —y que es la literal de la fórmula, «#actores con ≥1 RF»— es de **cobertura**: ningún actor debe quedar sin funcionalidad asociada. Se adopta esa, al amparo de la nota de la guía que permite proponer definiciones propias justificándolas por escrito.

Verificación (participación de cada actor en los 17 CU, y por tanto en los RF que estos realizan):

| Actor | CU en que participa |
|---|---|
| Personal de Infraestructura y Mantenimiento | 10 |
| Personal Administrativo | 7 |
| Sensores / Gateway IoT | 7 |
| Personal de TI | 6 |
| Autoridades de la Facultad | 5 |
| Docente | 4 |
| Sistema de Horario Académico | 3 |
| Servicio de Notificaciones | 2 |
| Sistema de Videovigilancia | 1 |

**9/9 = 100 %.**

**Limitación que se mantiene declarada (D-03).** Bajo la lectura de origen, solo 2 actores figuran como fuente: Personal de Infraestructura (16 RF) y Docente (9 RF). Eso no es un defecto de completitud del documento, pero sí una **concentración real de las fuentes de elicitación** que afecta la validez externa del ERS: siete de los nueve actores nunca fueron entrevistados como origen. Se declara como limitación en el informe y se recomienda ampliarla en una ronda posterior.

## M2 — Consistencia

**Definición operativa aplicada.** Se verificó la coherencia de cada requisito contra todas sus declaraciones duplicadas en el documento: prioridad MoSCoW de los 42 requisitos contrastada entre la Tabla 42, la §5.2 y el CSV de priorización (42 comparaciones), coherencia de los conteos narrativos con los identificadores realmente definidos (3 comparaciones) y coherencia del alcance declarado del MVP entre §6.1 y §6.4 (1 comparación). Total: **46 verificaciones**.

| Conflicto | Descripción | Estado |
|---|---|---|
| **D-01** | Prioridad de RF-20/24/25: el documento decía Should, el CSV decía Must | **Cerrado** |
| **D-12** | §6.1 y §6.4 declaraban *conjuntos* distintos de RF para el MVP; solo 7 coincidían | **Cerrado** |

- **Antes:** M2 = 1 − 2/46 = **0,957**, con 2 conflictos abiertos.
- **Después:** M2 = 1 − 0/46 = **1,000**, con **0 conflictos abiertos**, verificado por script (la comparación Tabla 42 ↔ CSV da OK para los 42 requisitos y los conteos narrativos coinciden con los identificadores definidos: 25 RF, 17 RNF, 18 RD, 17 CU, 17 HU).

**Limitación declarada:** no se ejecutó el barrido semántico exhaustivo par a par (400 pares RF↔RNF) buscando contradicciones de contenido, distinto de las contradicciones de declaración que sí se verificaron por completo. Un conflicto semántico latente no quedaría capturado por esta medición.

**Cómo se cerró D-12.** La §6.1 se reescribió declarando el alcance planificado, la desviación y su causa: cinco RF (RF-02, 04, 05, 11, 15) se pospusieron por depender de control remoto sobre hardware no disponible, y en su lugar se implementaron cuatro que el simulador permitía demostrar de extremo a extremo (RF-16, 19, 22, 23). Se fija la cifra de §6.4 —11/17, 64,7 %— como cobertura real verificada contra código.

## M3 — Verificabilidad

Búsqueda de términos no medibles («rápido», «fácil», «eficiente», «amigable», «adecuado», «intuitivo», «sencillo») en los criterios de verificación: cero coincidencias, incluido el nuevo RNF-17, cuyo criterio fija 20 casos de prueba y un 100 % de aciertos exigido. **42/42 = 100 %.**

## M4_ade — Trazabilidad adelante

**Definición operativa:** cadena `RF → CU → clase → estado → prueba` del recuadro M4 de la guía. El paso «estado» se cuenta satisfecho cuando la entidad no tiene ciclo de vida modelado, conforme a la plantilla 7.2, que lo marca como aplicable «si aplica»; el ERS modela estados solo para *Alerta* y *Solicitud de mantenimiento*.

- **Antes: 0/25 = 0 %.** No existía ningún caso de prueba conceptual ni DFD.
- **Después: 25/25 = 100 %**, con 42 casos de prueba redactados y las columnas `Proceso_DFD`, `Estado` e `ID_CP` incorporadas. Verificación cruzada en ambos sentidos: todo CP citado en la matriz está definido y todo CP definido está citado.

**Matiz:** la cadena extendida de §4.3 de la guía, que además exige criterio BDD, cierra en **17/25 (68 %)**, porque solo los RF Must tienen historia y Gherkin —que es lo que la guía pide—. Se declara para que el 100 % no se lea como algo que no es.

## M4_atr — Trazabilidad atrás

25/25 fichas RF con `Actor / Origen` no vacío. **100 %.**

## M5 — Modificabilidad

| RF muestreado | CU / Clase | RF acoplados | # |
|---|---|---|---|
| RF-01 | CU-01, CU-03 / SensorIoT, LecturaSensor | RF-03, 04, 05, 07, 16, 20 | 6 |
| RF-07 | CU-01 / Aula | RF-01, 03, 04, 05, 16, 20 | 6 |
| RF-13 | CU-13 / Equipo | RF-02, 09, 15, 16, 21 | 5 |
| RF-19 | CU-11 / Usuario, Rol | RF-24, RF-25 | 2 |
| RF-24 | CU-17 / Usuario | RF-19, RF-25 | 2 |

Promedio (6+6+5+2+2)/5 = **4,2**. Referencia ≤3,0: **no cumple**. Recalculado por script sobre `matriz_trazabilidad_PE5.csv`, no estimado.

**Sin cambio respecto de la medición anterior.** Se comprobó si la creación de CU-17 desacoplaba a RF-24 —al dejar de compartir caso de uso con RF-19— y **no lo hace**: ambos siguen acoplados por la clase `Usuario`, que RF-19 comparte con RF-24 y RF-25. Cambiar el caso de uso no cambia el modelo de dominio.

El acoplamiento se concentra en CU-01 (panel) y CU-13 (automatización energética), que son los núcleos funcionales del sistema. Bajar de 3,0 exigiría rediseñar el modelo de dominio —por ejemplo, separar la clase `Aula` de la clase `LecturaSensor` en agregados independientes—, no reescribir requisitos, y eso excede el alcance de una unidad de ingeniería de requisitos. **Se reporta como incumplimiento asumido y justificado.**

## M6 — Corrección

Se cuentan los defectos de **calidad de requisitos ya existentes** (ambigüedad, atributo obligatorio faltante, contradicción). No se cuentan los artefactos que la propia guía manda construir en la PE5 (DFD, CU-17, casos de prueba, RNF de Safety): son entregables de un paso posterior, no errores previos. La columna `Cuenta_para_M6` de `registro_defectos.csv` marca explícitamente cuáles entran.

| Defecto | Instancias | Estado |
|---|---|---|
| D-01 Prioridad MoSCoW contradictoria | 3 | Resuelto |
| D-02 RNF sin prioridad declarada | 12 | Resuelto |
| D-06 RF Must sin historia de usuario | 3 | Resuelto |
| D-09 RNF ausentes de la matriz | 16 | Resuelto |
| D-10 Cláusula Gherkin sin evento observable | 17 | Resuelto |
| D-12 §6.1 y §6.4 con conjuntos distintos | 1 | Resuelto |
| D-13 Connextra malformado en las 17 historias | 17 | Resuelto |
| D-14 Dos RNF bajo una característica que ISO/IEC 25010:2023 ya no contempla | 2 | Resuelto |
| D-15 Diagrama de estados de `Alerta` distinto del ciclo especificado | 1 | Resuelto |
| **Total** | **72** | |

- **Antes:** 72 instancias / 41 requisitos = **1,76**.
- **Después:** 0 residuales / 42 requisitos = **0,00**.

**Advertencia sobre esta cifra.** Un 0,00 no significa que el ERS no tenga defectos: significa que no queda ninguno **de los registrados**. La re-inspección posterior a las correcciones fue automatizada y verificó lo comprobable por script —conteos, identificadores definidos, coherencia de prioridad entre tablas y CSV, cobertura de historias de los 17 Must, balance de tablas LaTeX—, pero **una re-lectura semántica completa por una persona distinta de quien aplicó las correcciones sigue pendiente**, y es lo que daría al valor su respaldo definitivo. Reportarlo de otro modo sería exactamente el error que la guía advierte: declarar 100 % de corrección cuando el propio anexo no lo respalda.

**D-15 es un hallazgo posterior al cierre de la inspección**, detectado el 23/08/2026 al insertar las figuras en el informe final: el diagrama de estados de `Alerta` entregado desde la Entrega 3 modela `Pending → InProgress → Closed` y no el ciclo `Generada → Notificada → {Atendida | Escalada}` que especifica la §4.6 del ERS, de modo que omite la escalada por vencimiento del umbral de NFR-01. Se corrigió el diagrama —no el texto— porque el ciclo especificado tiene respaldo en NFR-01, en la columna `Estado` de la matriz y en el análisis de impacto, tres artefactos coincidentes entre sí. Se cuenta en el «antes» porque preexistía a esta unidad.

**D-13 es un hallazgo del cierre de la inspección**, no de la primera pasada: al reescribir los escenarios Gherkin se detectó que también la cláusula Connextra estaba malformada (el «quiero» repetía el título del requisito y el «para» su descripción, en las 17 historias). Se registra y se cuenta en el «antes» aunque se detectara tarde, porque preexistía al trabajo de esta unidad.

---

## Correcciones aplicadas en la Unidad V

| Defecto | Corrección |
|---|---|
| D-01 | Priorización consolidada en un único archivo: 17 Must / 8 Should |
| D-02 | Prioridad declarada y justificada para 13 RNF en la Tabla 42 |
| D-04 | RNF-17 (Safety) redactado y fusionado en la Tabla 39 del ERS |
| D-05 | 42 casos de prueba conceptuales derivados de los criterios reales |
| D-07 | CU-17 creado y fusionado en la §4.2 del ERS |
| D-08 | DFD de nivel 1 (8 procesos, 6 almacenes) fusionado como §4.11 |
| D-09 | Matriz PE5 de 48 filas con los 17 RNF y los 6 RF de IA |
| D-10 y D-13 | Las 17 historias reescritas: Connextra correcto y evento observable |
| D-11 | Figura del diagrama de estados restituida |
| D-12 | §6.1 reescrita declarando la desviación del alcance del MVP |

## Qué queda pendiente

1. **M5 (4,0 frente a ≤3,0):** requiere rediseño del modelo de dominio; se asume y se justifica.
2. **Re-inspección independiente** de la versión 4.0 por una persona distinta, para respaldar el M6 = 0,00.
3. **Barrido semántico par a par** de los 400 pares RF↔RNF, para cerrar M2 sin la limitación declarada.
4. **D-03:** ampliar la elicitación a los siete actores nunca entrevistados como fuente.
