# Banco de respuestas para la defensa (Anexo B de la guía PE5)

Las 22 preguntas del Anexo B, con la respuesta y **el artefacto exacto que la respalda**. La rúbrica evalúa que cada respuesta se ancle en un artefacto concreto ("eso está en la matriz de trazabilidad, fila RF-12"), no en una opinión.

> **Los tres errores que hunden defensas técnicamente correctas** (§4.5 de la guía): leer las diapositivas, describir la herramienta en lugar de la decisión de ingeniería, y responder con opiniones cuando existe evidencia en el ERS que zanja la pregunta.

---

## Fundamentos

**1. ¿Cuál es la frontera del sistema y qué queda deliberadamente fuera?**
La frontera son las aulas de la Facultad, sus sensores, gateways, controladores y la plataforma web. Fuera queda, por decisión declarada: la videovigilancia (solo se integra como vista complementaria, RD-05), la gestión académica —matrícula, asistencia, calificaciones, asignación de horarios— (RD-16), la red eléctrica del campus (RD-18) y el mantenimiento físico (RD-17).
→ *ERS §1.2 y §3.5, restricciones RD-05, RD-16, RD-17, RD-18.*

**2. ¿Qué diferencia hay entre el contexto y el límite del sistema en su proyecto?**
El contexto incluye todo lo que interactúa con SIGA sin ser parte de él: el Sistema de Horario Académico, la videovigilancia existente, el servicio de notificaciones y los usuarios. El límite es lo que el equipo construye y controla: la plataforma, la lógica de reglas y la base de datos. La distinción es operativa, no académica: el Horario Académico está en el contexto, y por eso su indisponibilidad es una dependencia declarada (DEP-02) y no un defecto del sistema.
→ *ERS §2.1, diagrama de contexto; §2.6.2 dependencias.*

**3. ¿Qué modelo de proceso siguieron y por qué era el adecuado?**
Un ciclo incremental por entregas alineado con los procesos técnicos de ISO/IEC/IEEE 15288:2023, con la definición de requisitos de las partes interesadas y el análisis de requisitos del sistema como procesos separados. Era el adecuado porque el dominio era desconocido al inicio y la elicitación fue en dos rondas: la primera (EV-01 a EV-07) definió el núcleo y la segunda (EV-08 a EV-16, más el cuestionario EV-17) lo corrigió y amplió; un proceso en cascada habría congelado el alcance antes de la segunda ronda.
→ *Informe §2; ERS Apéndice A.2 y A.3.*

## Elicitación

**4. ¿Qué técnica les aportó requisitos que no habrían descubierto de otro modo?**
La observación directa y las entrevistas al personal de servicios generales. RF-13 (apagado automático) nace de observar que **una sola persona** recorría el edificio apagando equipos; ningún cuestionario lo habría revelado, porque nadie lo reportaba como problema: era la rutina normalizada. Del mismo modo, RNF-16 nace de una frase de campo (EV-15): en la mayoría de las aulas no hay internet.
→ *ERS §3.2 RF-13, campo Actor/Origen; Tabla 39 NFR-16, estado de validación.*

**5. ¿Qué stakeholder quedó subrepresentado y cómo lo compensaron?**
Siete de los nueve actores nunca fueron entrevistados como fuente de un requisito: solo Personal de Infraestructura (origen de 16 RF) y Docente (9 RF) figuran como origen. **No lo compensamos**, lo declaramos: cuatro de esos siete son actores de sistema, de los que no procede elicitar; los otros tres —TI, Administrativo y Autoridades— son partes interesadas humanas reales cuya ausencia como fuente es una limitación de validez externa del ERS, registrada como D-03 y solo resoluble con más trabajo de campo.
→ *Registro de defectos D-03; `huerfanos_y_cadenas_rotas.csv`, siete últimas filas; Anexo A, métrica M1c.*

**6. Muéstrenme un requisito y díganme de qué evidencia concreta nació.**
RF-12 (gestión de solicitudes de mantenimiento) nace de EV-01 y EV-02: no existía ningún sistema formal de reporte, las incidencias se comunicaban de palabra. EV-12 (DOC-01) cuantificó después el costo: de 15 a 30 minutos de clase perdidos por falla no resuelta.
→ *Matriz de trazabilidad, fila RF-12, columna Fuente; transcripciones EV-01, EV-02, EV-12.*

## Especificación

**7. Elijan un RNF y expliquen cómo se comprueba objetivamente.**
NFR-01: las alertas deben entregarse en ≤60 s desde la detección. Se comprueba con una prueba de carga sobre 50 aulas simuladas, midiendo el tiempo real entre la lectura fuera de umbral y la entrega al responsable. Su caso de prueba conceptual es CP-08, compartido con RF-08 porque verifican el mismo umbral desde dos ángulos: RF-08 que la alerta se genere, NFR-01 que llegue a tiempo.
→ *ERS Tabla 39 NFR-01; `casos_prueba_conceptuales.csv`, CP-08.*

**8. ¿Qué requisito les costó más redactar de forma verificable y por qué?**
RNF-10, la explicabilidad del predictor de fallas. "El sistema debe explicar sus predicciones" no es verificable: no dice qué se explica, a quién, en qué formato ni en qué momento. Se cerró con cuatro parámetros medibles: explicación en ≤2 s, ≤60 palabras, comprensión reportada ≥4/5 en escala Likert por ≥6 participantes, y momento definido (al generarse la alerta predictiva). Su estado de validación se declara **no verificado**: el estudio con los seis participantes no se ejecutó.
→ *ERS §3.3.1 y Tabla 39 NFR-10; ficha IA-01, bloque (d).*

**9. ¿Por qué este caso de uso incluye a aquel y no lo extiende?**
CU-17 (ejercer derechos) **no** extiende CU-11 (gestión de acceso), y esa fue precisamente la corrección de esta unidad. Extenderlo habría implicado que ejercer un derecho es un caso especial de gestionar el acceso, y no lo es: CU-11 responde a "quién puede entrar y a qué", CU-17 a "qué puede exigir el titular sobre sus propios datos". Tienen actores, plazos legales y evidencia distintos. Mientras estuvieron mezclados, RF-24 y RF-25 figuraban como huérfanos de caso de uso.
→ *ERS §4.2 CU-17; registro de defectos D-07.*

## Validación

**10. ¿Cuántos defectos halló la inspección y cuáles siguen abiertos?**
14 defectos raíz, 71 instancias contables para M6. Todos los que cuentan para M6 quedaron cerrados. Sigue **declarado como limitación** D-03 (siete actores sin RF de origen), y quedan dos pendientes metodológicos: la re-inspección independiente de la versión 4.0 y el barrido semántico par a par.
→ *`registro_defectos.csv`, columnas Instancias, Cuenta_para_M6 y Estado.*

**11. ¿Qué defecto crítico se les escapó y cómo lo detectaron después?**
D-01: la prioridad MoSCoW de RF-20, RF-24 y RF-25 era Should en el documento y Must en el CSV de priorización. Sobrevivió tres versiones del ERS sin que nadie lo notara, porque no existía ningún registro de inspección en ninguna entrega anterior. Se detectó al cruzar por script las dos fuentes durante la auditoría de esta unidad. Se resolvió a favor del documento y se eliminó el archivo duplicado que mantenía viva la contradicción.
→ *Registro de defectos D-01; Anexo A, métrica M2.*

**12. ¿Cómo saben que las correcciones no introdujeron nuevos defectos?**
Se volvió a medir, y en parte con verificación automatizada: coherencia de prioridad entre la Tabla 42 y el CSV para los 42 requisitos, conteos narrativos contra identificadores realmente definidos, cobertura de historias de los 17 Must, correspondencia en ambos sentidos entre casos de prueba citados y definidos, y balance de entornos LaTeX. **Con una salvedad que declaramos:** una re-lectura semántica completa por una persona distinta de quien aplicó las correcciones sigue pendiente, y es lo que respaldaría definitivamente el M6 = 0,00.
→ *Anexo A, sección M6, advertencia sobre el cero; Informe §8.3.*

## Gestión

**13. Tomen un RF y díganme qué se rompería si mañana cambia.**
Si cambia RF-01 (captura de datos ambientales) hay que revisar seis requisitos: RF-03, RF-04, RF-05, RF-07, RF-16 y RF-20, porque comparten los casos de uso CU-01 y CU-03 o las clases SensorIoT y LecturaSensor. Ese número es precisamente la métrica M5, que da 4,2 de promedio frente a un umbral de 3,0: el sistema está más acoplado de lo deseable, y lo reportamos como incumplimiento asumido.
→ *Matriz de trazabilidad, fila RF-01; Anexo A, métrica M5, calculada por script.*

**14. ¿Qué RFC rechazó el CCB y con qué argumento?**
**Ninguno, porque no existió un CCB formal.** No hay comité de control de cambios documentado en ninguna entrega, y lo declaramos como vacío de proceso en lugar de inventar un historial de decisiones que no ocurrió. Los cambios se gestionaron por commits con mensaje descriptivo y por el registro de defectos.
→ *Informe §6.1, línea base y control de cambios.*

**15. ¿Cuál es la línea base vigente y dónde está etiquetada?**
La línea base de entrada a esta unidad es el commit `9f7c54c` (02/08/2026), última modificación del ERS v3.0. El trabajo de la Unidad V está en el repositorio `SIGA_FGMMN_PEV` y culmina en el ERS v4.0. **No hay un tag de Git formal**, que es una deuda declarada: la trazabilidad de versiones se apoya hoy en el historial de commits y en el CHANGELOG, no en etiquetas.
→ *`CHANGELOG.md`, entrada PE5-0.2.0; historial de commits del repositorio.*

## Inteligencia artificial

**16. ¿Qué decide el modelo y qué pasa cuando se equivoca?**
IA-01 emite un puntaje de riesgo de falla de 0 a 1 por equipo, a 7 días. Si se equivoca, no pasa nada irreversible: una predicción de alto riesgo **no crea el ticket** ni actúa sobre el equipo, solo genera una alerta informativa de prioridad Media que un humano evalúa. Si el modelo no está disponible o su F1 cae por debajo de 0,60 en dos evaluaciones consecutivas, se retira de producción y el sistema vuelve al proceso reactivo de RF-08, RF-10 y RF-12.
→ *Ficha IA-01, bloques (a) y (c), RNF-IA-03.*

**17. ¿Con qué datos lo entrenarían y con qué base legal?**
Con el historial acumulado por el propio sistema: lecturas de RF-01, RF-03 y RF-05 más el registro de fallas de RF-10, mínimo 90 días continuos por equipo. El etiquetado sale automáticamente de los tickets correctivos cerrados (RF-12), sin etiquetado manual. **Base legal: no aplica LOPDP**, porque son datos de equipo y de aula, no datos personales; el modelo no usa identidad de usuario, docente ni estudiante.
→ *Ficha IA-01, bloque (b) y minimización de datos en el bloque (d).*

**18. ¿Cómo medirían que el modelo no perjudica sistemáticamente a un grupo?**
Con dos métricas de equidad explícitas. RNF-IA-04: la tasa de falsos negativos no debe diferir en más de 10 puntos porcentuales entre aulas de uso alto y bajo, para que el modelo no aprenda a ignorar equipos de aulas poco usadas por escasez de datos. RNF-IA-05: la misma diferencia máxima entre edificios, para que el mantenimiento predictivo no se concentre en las aulas con mejor conectividad IoT. En IA-02, RNF-IA-10 prohíbe además atribuir responsabilidad individual a un docente por el consumo de un aula que no controla.
→ *Fichas IA-01 y IA-02, bloque (d).*

## Métricas

**19. ¿Qué métrica salió peor y qué hicieron al respecto?**
En la primera medición, M4_ade: 0 %. No existía ningún caso de prueba conceptual ni ningún DFD, así que ninguna cadena podía cerrarse. Se construyó el DFD de nivel 1, se creó CU-17 y se redactaron 42 casos de prueba derivados de los criterios de verificación reales; volvió a medirse en 100 %. **Al cierre, la peor es M5 = 4,2** frente a un umbral de 3,0, y esa no se corrigió: mide acoplamiento del modelo de dominio, no calidad documental.
→ *Anexo A, métricas M4_ade y M5.*

**20. Enséñenme los conteos con los que calcularon la verificabilidad.**
M3 = 42/42 = 100 %. El conteo es la búsqueda de términos no medibles —"rápido", "fácil", "eficiente", "amigable", "adecuado", "intuitivo", "sencillo"— en los campos de criterio de verificación de los 25 RF y los 17 RNF: cero coincidencias. El comando exacto está en el Anexo A y es reproducible sobre el repositorio.
→ *Anexo A, métrica M3, con el comando `grep` documentado.*

## Ética

**21. ¿Qué datos personales trata el sistema y cómo se protegen?**
Perfil y credenciales de usuario, y bitácora de acciones. Las imágenes de las cámaras se procesan solo para determinar presencia agregada —verdadero o falso—, no se almacenan fotogramas y no hay reconocimiento facial; por eso **no constituyen dato biométrico** en los términos del Art. 4 de la LOPDP, lo que sustenta la clasificación del proyecto en Categoría B de riesgo ético. Protección: cifrado AES-256 (NFR-03), control de acceso por roles (RF-19), bitácora de auditoría (RF-23) y CU-17 para el ejercicio de derechos en ≤15 días hábiles.
→ *ERS §3.4, tabla Ley → Artículo → RF/RNF; §4.2 CU-17.*

**22. ¿Qué partes del informe fueron asistidas por IA y cómo las validaron?**
Está declarado por sección en el Anexo E: la extracción de conteos y el cálculo de las métricas, la redacción de las fichas de IA y de RNF-17, la construcción del DFD, CU-17, la matriz y los casos de prueba, y el borrador de retrospectiva y conclusiones. **El método de validación es la reproducibilidad**: toda cifra de métrica y todo defecto reportado se puede volver a obtener ejecutando los comandos documentados en el Anexo A sobre el repositorio. Donde no hay evidencia de campo, se declara explícitamente "borrador PE5, pendiente de validación" en lugar de citar una EV inexistente.
→ *Informe, Anexo E.*

---

## Preguntas que probablemente hará el tribunal y no están en el Anexo B

**¿Por qué el RNF de Safety es el 17 y no el 16?**
Porque RNF-16 ya existía y trata otra cosa: disponibilidad en modo degradado sin conectividad, sustentada en evidencia de campo real (EV-15). Numerar el de Safety como 16 habría creado una colisión de identificadores. Se detectó al fusionar y se numeró 17.

**Su M6 da 0,00 y el umbral es 0,05. ¿No es sospechoso un cero perfecto?**
Es una cifra que hay que leer con su advertencia, y la escribimos nosotros mismos en el anexo: significa cero defectos residuales **de los registrados**, no documento sin defectos. La re-inspección posterior fue automatizada y verificó lo comprobable por script; falta una re-lectura semántica por una persona distinta de quien aplicó las correcciones. Sin ese paso, el 0,00 está respaldado solo parcialmente.

**M1c pasó de 22 % a 100 %. ¿Cambiaron el documento o la métrica?**
La métrica, y está declarado. La primera lectura fue "actores que originan un RF", que convierte M1c en un duplicado de M4_atr. La lectura literal de la fórmula —"actores con ≥1 RF"— mide cobertura: que ningún actor quede sin funcionalidad. Adoptamos esa, amparados en la nota de la guía que permite proponer definiciones justificándolas. Lo que la otra lectura revelaba no desapareció: sigue declarado como D-03.

**¿La cobertura del MVP es 64,7 % o 71 %?**
64,7 %, once de diecisiete RF Must, verificado contra el código. El 71 % era el alcance **planificado** en §6.1, y ambas listas ni siquiera coincidían: solo siete RF eran comunes. Esa contradicción es el defecto D-12; se corrigió declarando la desviación y su causa, y fijando la cifra verificada como la válida.
