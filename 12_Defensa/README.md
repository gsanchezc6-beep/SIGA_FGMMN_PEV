# Defensa técnica (criterio C5 de la rúbrica, 15 %)

| Archivo | Qué es |
|---|---|
| `Defensa_PE5_SIGA.pptx` | Presentación, 14 diapositivas, con notas del orador en cada una |
| `generar_presentacion.js` | Código fuente que genera el `.pptx` — editar aquí y regenerar, para que el archivo no se desincronice |
| `banco_respuestas_tribunal.md` | Las 22 preguntas del Anexo B respondidas, cada una con el artefacto que la respalda, más 4 repreguntas probables |

Regenerar la presentación tras editar el generador:

```bash
npm install pptxgenjs && node generar_presentacion.js
```

## Secuencia y reparto de tiempo (20 min de exposición + 10 de preguntas)

La guía (§4.a) fija la secuencia; esta es la asignación de tiempo para que entre en 20 minutos.

| # | Diapositiva | Min | Acumulado |
|---|---|---|---|
| 1 | Portada | 0:30 | 0:30 |
| 2 | El problema | 2:00 | 2:30 |
| 3 | Sistema y partes interesadas | 1:30 | 4:00 |
| 4 | Proceso PE1–PE5 | 1:30 | 5:30 |
| 5 | ERS: estructura y requisitos clave | 2:00 | 7:30 |
| 6 | Modelos | 1:30 | 9:00 |
| 7 | Validación: primera inspección | 2:00 | 11:00 |
| 8 | Métricas antes/después | 2:30 | 13:30 |
| 9 | Trazabilidad end-to-end | 2:00 | 15:30 |
| 10 | Componentes de IA | 2:00 | 17:30 |
| 11 | Datos personales y Safety | 1:30 | 19:00 |
| 12 | Lecciones aprendidas | 0:40 | 19:40 |
| 13 | Lo que queda abierto | 0:20 | 20:00 |
| 14 | Preguntas | — | — |

Las diapositivas 8 y 9 son las que más peso tienen en la rúbrica (C1 y C2 suman 32 %); las 12 y 13 se pasan rápido porque su contenido se defiende mejor respondiendo preguntas que leyéndolo.

## Cómo se evalúa la defensa (§8 de la rúbrica)

El tribunal puntúa seis indicadores, y su promedio da el nivel de C5:

| Indicador | Qué observa | Cómo prepararlo |
|---|---|---|
| Dominio del proyecto completo | Que respondas sobre partes que no desarrollaste personalmente | Repasar el banco de respuestas entero, no solo tu parte |
| Anclaje en artefactos | Que remitas a un requisito, matriz, modelo o anexo concreto | Cada respuesta del banco ya trae su artefacto: citarlo en voz alta |
| Rigor conceptual | Que distingas requisito, caso de uso, historia y prueba | Ver preguntas 7, 8 y 9 del banco |
| Justificación de decisiones | Que expliques por qué se decidió así y qué se descartó | Ver preguntas 3, 9 y 11 |
| Comunicación y tiempo | Exponer sin leer, dentro del tiempo | Ensayar con reloj usando la tabla de arriba |
| Reconocimiento de límites | Identificar lo pendiente sin inventar respuestas | Diapositiva 13; decirlo antes de que lo pregunten |

## Los tres errores que la guía marca como fatales

1. **Leer las diapositivas.** Por eso cada una lleva notas del orador: son para preparar, no para recitar.
2. **Describir la herramienta en vez de la decisión de ingeniería.** No «usamos Visual Paradigm», sino «separamos CU-17 de CU-11 porque el ejercicio de derechos tiene actores y plazos distintos».
3. **Responder con opiniones cuando hay evidencia que zanja la pregunta.** Si está en el ERS, se cita el ERS.

## Antes de la defensa

- [ ] Ensayo cronometrado completo, al menos una vez.
- [ ] Verificar que el repositorio abre y que el PDF del informe se regenera desde el `.tex` (gatekeeper G2).
- [ ] Repasar las cuatro repreguntas del final del banco: son las que más probablemente caigan.
- [ ] Tener a mano la matriz de trazabilidad y el registro de defectos para citar filas concretas.
