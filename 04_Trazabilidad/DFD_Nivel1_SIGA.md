# Diagrama de Flujo de Datos — Nivel 1 (SIGA)

Construido a partir del modelo de RF/CU real del ERS (`secciones_generadas.tex`), no de una plantilla genérica. Cada proceso agrupa RF que comparten el mismo flujo de datos de entrada/salida, verificado contra `04_Trazabilidad/matriz_trazabilidad.csv`.

## Entidades externas

| Entidad | Rol |
|---|---|
| Sensor/Gateway IoT | Origina lecturas ambientales, de ocupación y de consumo |
| Controlador de equipo (proyector/climatización) | Ejecuta comandos, reporta estado |
| Usuario humano (Infraestructura, TI, Docente, Administrativo, Autoridades) | Consulta, autoriza, actúa sobre alertas/tickets |
| Sistema de Horario Académico | Provee horario vigente para automatización |
| Sistema de Videovigilancia | Provee flujo de video complementario (RF-06) |
| Servicio de Notificaciones | Canal de salida de alertas |

## Almacenes de datos

| ID | Almacén | Alimentado por | Consultado por |
|---|---|---|---|
| D1 | Lecturas (ambiente, ocupación) | P-1 | P-3, P-4, P-6 |
| D2 | Alertas | P-3 | P-5, P-6 |
| D3 | Tickets de mantenimiento | P-5 | P-6 |
| D4 | Bitácora de acciones | P-2, P-3, P-4, P-5, P-7 | P-6, P-8 |
| D5 | Usuarios y roles | P-7 | P-1 a P-8 (control de acceso, transversal) |
| D6 | Reportes/histórico agregado | P-6 | Consumidor externo (Autoridades) |

## Procesos (P-1 a P-8)

| Proceso | Nombre | RF que agrupa | Entrada | Salida | Almacén |
|---|---|---|---|---|---|
| P-1 | Captura de datos ambientales y ocupación | RF-01, RF-03 | Lecturas de sensor IoT | Estado de aula actualizado | Escribe D1 |
| P-2 | Control remoto de equipos | RF-02, RF-04, RF-05 | Comando de usuario autorizado + estado de controlador | Confirmación/estado ejecutado | Lee D5, escribe D4 |
| P-3 | Generación y gestión de alertas | RF-08, RF-11, RF-21 | Lecturas fuera de umbral (D1), estado de equipo (P-2) | Alerta enviada (Servicio de Notificaciones) | Lee D1, escribe D2 |
| P-4 | Automatización energética | RF-13, RF-15, RF-16 | Ocupación (D1), horario académico (externo), regla de Safety (RNF-17) | Comando de apagado/encendido a P-2 | Lee D1, escribe D4 |
| P-5 | Gestión de mantenimiento | RF-10, RF-12 | Alerta (D2), reporte manual de usuario | Ticket creado/actualizado | Lee D2, escribe D3, D4 |
| P-6 | Reportes administrativos | RF-17, RF-18, RF-20 | D1, D2, D3, D4 agregados | Reporte exportable (PDF/Excel) | Lee D1-D4, escribe D6 |
| P-7 | Gestión de acceso y auditoría | RF-19, RF-23 | Credenciales, acción de usuario | Sesión autorizada / registro de bitácora | Escribe D5, D4 |
| P-8 | Gestión de derechos sobre datos personales | RF-24, RF-25 | Solicitud de titular (Docente/Administrativo, vía CU-17) | Archivo exportado / dato rectificado | Lee/escribe D5, escribe D4 |

## Notas de trazabilidad

- P-8 es el proceso nuevo que sustenta **CU-17** (ver `11_Informe_Final/CU-17.md`) — antes, RF-24/RF-25 no tenían un proceso propio en ningún diagrama del ERS y quedaban implícitos dentro de la gestión de acceso (CU-11), que conceptualmente es otra cosa (autenticación/roles, no derechos ARCO).
- D4 (Bitácora) es el único almacén transversal a los 8 procesos — coherente con RF-23 y con el requisito legal de trazabilidad (Art. 10-k y 47-2 LOPDP, ya mapeado en §3.4 del ERS).
- Este DFD es de **Nivel 1** (procesos, no algoritmos internos); un Nivel 2 detallado por proceso queda fuera del alcance mínimo de la PE5.
