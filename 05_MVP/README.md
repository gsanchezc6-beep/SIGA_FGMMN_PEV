# Producto Mínimo Viable (MVP) — SIGA

El código fuente del MVP se encuentra en un repositorio separado:
https://github.com/gsanchezc6-beep/SIGA_FGMMN_MVP

**Commit evaluado:** `1ef2873`

## Alcance y cobertura

Este MVP implementa 6 módulos (Autenticación y roles, Panel de control, Alertas,
Mantenimiento, Reportes, Bitácora), cubriendo **11 de los 17 Requisitos Funcionales
"Must"** del proyecto (64.7%), verificado contra el código real. El detalle completo
por RF —con archivo y función exacta que lo implementa— está en el README del
repositorio del MVP.

## Stack

Node.js + Express + Socket.io + SQLite (módulo nativo `node:sqlite`, sin
dependencias externas de compilación). Frontend HTML/CSS/JS plano, sin build step.
Requiere Node.js ≥22.5.

## Despliegue local

```bash
npm install
npm start
```

Levanta el servidor en `http://localhost:3000`, con datos de ejemplo sembrados
automáticamente al primer inicio. Instrucciones completas y cuentas de demo: ver
el README del repositorio del MVP.

## Licencia

Código bajo licencia Apache-2.0 (ver `LICENSE` en el repositorio del MVP).

## Video de demostración

`video_demo.mp4` en esta misma carpeta (≤3 minutos).