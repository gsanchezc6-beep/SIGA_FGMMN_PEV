# DFD Nivel 1 — SIGA (nuevo en PE5)

**Por qué existe:** la matriz de trazabilidad exige una columna "Proceso DFD" para cerrar la cadena RF→CU→Clase→**Proceso DFD**→Estado→BDD→CP (M4_ade). El ERS nunca tuvo un DFD — la sección IV es "Modelado del sistema (UML) completo" y el diagrama de componentes no es un DFD (describe módulos de software, no flujo de datos entre procesos y almacenes). Este DFD se deriva de los RF y CU ya existentes, agrupándolos por función, no inventa ningún dato nuevo.

**Entidades externas:** Sensores/Gateway IoT, Usuario (Docente/Infraestructura/TI/Administrativo/Autoridades), Sistema de Horario Académico, Sistema de Videovigilancia, Servicio de Notificaciones.

**Almacenes de datos:** D1 Lecturas de sensores, D2 Estado de aulas/equipos, D3 Alertas, D4 Tickets de mantenimiento, D5 Bitácora, D6 Usuarios/roles, D7 Reportes/históricos.

## Diagrama (Mermaid)

```mermaid
flowchart TB
    SENS[Sensores / Gateway IoT]
    USR[Usuario autenticado]
    HORARIO[Sistema de Horario Académico]
    VIGIL[Sistema de Videovigilancia]
    NOTIF[Servicio de Notificaciones]

    P1(("P-1<br/>Recopilar y validar<br/>lecturas ambientales<br/>y de ocupación<br/>RF-01,03,22"))
    P2(("P-2<br/>Controlar remotamente<br/>equipos de aula<br/>RF-02,04,05,06"))
    P3(("P-3<br/>Evaluar reglas y<br/>generar alertas<br/>RF-08,11,21"))
    P4(("P-4<br/>Ejecutar automatización<br/>energética<br/>RF-13,15,16"))
    P5(("P-5<br/>Gestionar solicitudes<br/>de mantenimiento<br/>RF-10,12"))
    P6(("P-6<br/>Generar reportes<br/>y exportaciones<br/>RF-14,17,18,20"))
    P7(("P-7<br/>Analizar y predecir<br/>con IA<br/>RF-09,14,RNF-10"))
    P8(("P-8<br/>Administrar acceso,<br/>bitácora y derechos<br/>de datos personales<br/>RF-19,23,24,25"))

    D1[(D1 Lecturas de sensores)]
    D2[(D2 Estado de aulas/equipos)]
    D3[(D3 Alertas)]
    D4[(D4 Tickets de mantenimiento)]
    D5[(D5 Bitácora)]
    D6[(D6 Usuarios/roles)]
    D7[(D7 Reportes/históricos)]

    SENS --> P1
    P1 --> D1
    P1 --> D2
    USR --> P2
    P2 --> D2
    P2 --> D5
    VIGIL --> P2
    D1 --> P3
    D2 --> P3
    HORARIO --> P3
    P3 --> D3
    P3 --> NOTIF
    D2 --> P4
    HORARIO --> P4
    P4 --> D2
    P4 --> D5
    USR --> P5
    D3 --> P5
    P5 --> D4
    P5 --> D5
    D4 --> P6
    D1 --> P6
    D2 --> P6
    P6 --> D7
    USR --> P6
    D4 --> P7
    D1 --> P7
    P7 --> D7
    P7 --> USR
    USR --> P8
    P8 --> D6
    P8 --> D5
    D6 --> P8
```

## Tabla de procesos

| Proceso | Nombre | RF cubiertos | Entradas | Salidas |
|---|---|---|---|---|
| P-1 | Recopilar y validar lecturas ambientales y de ocupación | RF-01, RF-03, RF-22 | Lecturas de Sensores/Gateway IoT | D1 (lecturas), D2 (estado) |
| P-2 | Controlar remotamente equipos de aula | RF-02, RF-04, RF-05, RF-06 | Comando de Usuario, flujo de Sistema de Videovigilancia | D2 (estado), D5 (bitácora) |
| P-3 | Evaluar reglas y generar alertas | RF-08, RF-11, RF-21 | D1, D2, Sistema de Horario Académico | D3 (alertas), notificación a Servicio de Notificaciones |
| P-4 | Ejecutar automatización energética | RF-13, RF-15, RF-16 | D2, Sistema de Horario Académico | D2 (actualizado), D5 (bitácora) |
| P-5 | Gestionar solicitudes de mantenimiento | RF-10, RF-12 | Usuario, D3 (alertas que generan ticket) | D4 (tickets), D5 (bitácora) |
| P-6 | Generar reportes y exportaciones | RF-14, RF-17, RF-18, RF-20 | D1, D2, D4, Usuario (filtros) | D7 (reportes) |
| P-7 | Analizar y predecir con IA | RF-09, RF-14, RNF-10 (explicabilidad) | D1, D4 (históricos) | D7, explicación al Usuario |
| P-8 | Administrar acceso, bitácora y derechos de datos personales | RF-19, RF-23, RF-24, RF-25 | Usuario (credenciales/solicitud) | D6 (usuarios/roles), D5 (bitácora) |

**Nota:** este DFD es un artefacto nuevo de PE5, derivado de RF/CU ya validados en entregas previas — no introduce ninguna funcionalidad nueva, solo la representa como flujo de datos. Debe insertarse en el ERS como sección 4.11 "Diagrama de flujo de datos (DFD) — Nivel 1" y referenciarse en la matriz de trazabilidad (columna "Proceso DFD").
