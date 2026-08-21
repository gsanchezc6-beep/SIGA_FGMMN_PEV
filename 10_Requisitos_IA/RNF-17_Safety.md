# RNF-17 — Seguridad física (Safety), ISO/IEC 25010:2023

> Nota de numeración: el ERS ya usa el identificador RNF-16 (Disponibilidad en modo degradado sin conectividad, Fiabilidad, sustentado en EV-15 — ver `secciones_generadas.tex` L903). Este requisito nuevo se numera **RNF-17** para no colisionar. No renombrar el RNF-16 existente: ya tiene evidencia de campo real (EV-15) y forma parte de la cadena RNF-13/15/16 sobre conectividad.

## RNF-17 — Apagado automático seguro de climatización

**Descripción cuantificada:** antes de ejecutar un apagado automático de climatización (RF-13, RF-16), el sistema debe verificar que el aula está efectivamente desocupada mediante al menos dos lecturas de sensor de presencia consecutivas y separadas por ≥30 s (para descartar una lectura espuria), y debe registrar en bitácora (RF-23) el estado de ocupación que motivó cada apagado automático, con marca de tiempo. Ante una lectura de sensor de presencia inconsistente o ausente (sensor caído), el sistema **no** debe ejecutar el apagado automático y debe generar una alerta de "verificación fallida" en su lugar (fallback seguro, fail-safe).

**Característica ISO/IEC 25010:2023:** Seguridad física (Safety).

**Criterio de verificación:** prueba de inyección de lecturas de sensor inconsistentes/ausentes durante un ciclo de evaluación de apagado automático → el sistema no ejecuta el comando de apagado y genera la alerta de verificación fallida en el 100 % de los casos de prueba (mínimo 20 casos, incluyendo caída de sensor, lectura oscilante y lectura única sin confirmación).

**Estado de validación:** Derivación directa de RD-04 (equipos compatibles con control remoto) y de las fichas RF-13/RF-16 (apagado automático de climatización) — **borrador PE5, pendiente de validación de campo**. No existe evidencia de entrevista (EV-xx) que sustente este umbral específico porque el guion de campo aplicado en la Entrega 3 (2A) no incluyó preguntas sobre condiciones de falla de sensores durante apagados automáticos. Se recomienda incorporar esta pregunta en la ronda de validación de la Entrega 4 (2B), tal como el propio documento ya recomienda para NFR-07/09/10/12/13/15 (L919).

**Trazas:** RF-13, RF-16, RD-04, RD-13.

**Justificación (por qué es Safety y no Fiabilidad):** RNF-13 (Fiabilidad, reanudación tras caída de gateway) y RNF-16 (Fiabilidad, aviso de falta de conectividad) tratan la *disponibilidad* del sistema. RNF-17 trata un escenario distinto: el sistema tomando una **acción física irreversible en el momento equivocado** (apagar climatización con el aula ocupada) por un dato de sensor erróneo — eso es exactamente lo que ISO/IEC 25010:2023 separa como característica de primer nivel "Seguridad física", distinta de Fiabilidad y de Seguridad (Security/NFR-03).
