// Genera la presentacion de defensa PE5 - SIGA
// Uso:  node generar_presentacion.js
const pptxgen = require("pptxgenjs");

const VERDE   = "1D6B36";  // verde institucional del ERS
const VERDE_C = "97BC62";  // verde claro de apoyo
const CREMA   = "F5F5F0";
const CARBON  = "2B2B2B";
const GRIS    = "6E6E6E";
const BLANCO  = "FFFFFF";
const AMBAR   = "C8791A";  // acento para lo que no cumple / pendiente

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.3 x 7.5
pres.author = "Equipo FGMMN";
pres.title  = "SIGA - Defensa PE5";

const W = 13.3, H = 7.5, M = 0.7;

// ---------- helpers ----------
function tituloSlide(s, texto) {
  s.addText(texto, {
    x: M, y: 0.45, w: W - 2 * M, h: 0.8,
    fontSize: 34, bold: true, color: VERDE, fontFace: "Cambria", margin: 0,
  });
}
function fondoOscuro(s) {
  s.background = { color: VERDE };
}
function pie(s, n) {
  s.addText(String(n), {
    x: W - 1.0, y: H - 0.55, w: 0.5, h: 0.3,
    fontSize: 10, color: GRIS, align: "right", margin: 0,
  });
}
// tarjeta con tinte de fondo (sin barras ni franjas)
function tarjeta(s, x, y, w, h, relleno) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: relleno || CREMA }, line: { color: relleno || CREMA },
  });
}
// numero en circulo verde
function circulo(s, x, y, d, texto, colorFondo, colorTexto) {
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: colorFondo || VERDE }, line: { color: colorFondo || VERDE },
  });
  s.addText(texto, {
    x, y, w: d, h: d, fontSize: 13, bold: true,
    color: colorTexto || BLANCO, align: "center", valign: "middle", margin: 0,
  });
}

// ================================================== 1. PORTADA
{
  const s = pres.addSlide(); fondoOscuro(s);
  s.addText("SIGA", { x: M, y: 1.9, w: W - 2*M, h: 1.0, fontSize: 66, bold: true, color: BLANCO, fontFace: "Cambria", margin: 0 });
  s.addText("Sistema Inteligente de Gestión de Aulas", { x: M, y: 2.9, w: W - 2*M, h: 0.5, fontSize: 24, color: VERDE_C, margin: 0 });
  s.addText("Cierre del Proyecto Integrador · Unidad V", { x: M, y: 3.5, w: W - 2*M, h: 0.4, fontSize: 16, color: BLANCO, margin: 0 });
  s.addText([
    { text: "Equipo FGMMN", options: { bold: true, breakLine: true } },
    { text: "Sánchez Cornejo · Muñoz Quiñonez · Cedeño Avila · Mendoza Palma · Gilces Carranza", options: { breakLine: true } },
    { text: "Ingeniería de Requerimientos (ISR-401) · Universidad Técnica Estatal de Quevedo", options: { breakLine: true } },
    { text: "github.com/gsanchezc6-beep/SIGA_FGMMN_PEV", options: { color: VERDE_C } },
  ], { x: M, y: 5.1, w: W - 2*M, h: 1.5, fontSize: 12, color: BLANCO, lineSpacing: 20, margin: 0 });
  s.addNotes("Presentar el sistema y el propósito de la unidad: auditar, trazar, especificar IA y defender. 30 segundos.");
}

// ================================================== 2. EL PROBLEMA
{
  const s = pres.addSlide(); pie(s, 2);
  tituloSlide(s, "El problema");
  s.addText("La gestión de aulas de la Facultad es manual: climatización, proyectores, conectividad y mantenimiento.",
    { x: M, y: 1.35, w: W - 2*M, h: 0.4, fontSize: 15, color: CARBON, margin: 0 });

  const datos = [
    ["1", "Una sola persona recorre el edificio apagando equipos", "EV-01"],
    ["2", "15 a 30 minutos de clase perdidos por falla no resuelta", "EV-12 · DOC-01"],
    ["3", "El cruce de horarios se hace comparando dos ventanas a mano", "EV-10 · COORD-02"],
    ["4", "La mayoría de las aulas no tiene internet estable", "EV-15 · DOC-03"],
  ];
  let y = 2.05;
  datos.forEach(([n, txt, ev]) => {
    tarjeta(s, M, y, W - 2*M, 0.92);
    circulo(s, M + 0.28, y + 0.22, 0.48, n);
    s.addText(txt, { x: M + 1.0, y: y + 0.14, w: 8.4, h: 0.35, fontSize: 15, bold: true, color: CARBON, margin: 0 });
    s.addText("Evidencia de campo: " + ev, { x: M + 1.0, y: y + 0.5, w: 8.4, h: 0.3, fontSize: 11, color: GRIS, margin: 0 });
    y += 1.05;
  });
  s.addText("11 entrevistas de campo transcritas sustentan estos hallazgos, no una suposición de diseño.",
    { x: M, y: 6.5, w: W - 2*M, h: 0.4, fontSize: 14, italic: true, color: VERDE, margin: 0 });
  s.addNotes("Insistir: cada viñeta viene de una transcripción real, no de una lluvia de ideas.");
}

// ================================================== 3. SISTEMA Y STAKEHOLDERS
{
  const s = pres.addSlide(); pie(s, 3);
  tituloSlide(s, "El sistema y sus partes interesadas");
  s.addText("SIGA monitorea condiciones ambientales y ocupación con sensores IoT, controla proyectores y climatización de forma remota, genera alertas, gestiona tickets y analiza el consumo con dos componentes de IA.",
    { x: M, y: 1.3, w: W - 2*M, h: 0.6, fontSize: 14, color: CARBON, margin: 0 });

  tarjeta(s, M, 2.2, 5.8, 3.9);
  s.addText("9 actores", { x: M + 0.35, y: 2.4, w: 5.1, h: 0.4, fontSize: 20, bold: true, color: VERDE, margin: 0 });
  s.addText([
    { text: "5 humanos", options: { bold: true, breakLine: true } },
    { text: "Infraestructura · TI · Docente · Administrativo · Autoridades", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "4 de sistema", options: { bold: true, breakLine: true } },
    { text: "Gateway IoT · Videovigilancia · Horario Académico · Notificaciones" },
  ], { x: M + 0.35, y: 2.9, w: 5.1, h: 3.0, fontSize: 13, color: CARBON, lineSpacing: 20, margin: 0 });

  tarjeta(s, 7.0, 2.2, W - 7.0 - M, 3.9, "F3E9DC");
  s.addText("Fuera de alcance", { x: 7.35, y: 2.4, w: 5.0, h: 0.4, fontSize: 20, bold: true, color: AMBAR, margin: 0 });
  s.addText([
    { text: "No reemplaza la videovigilancia (RD-05)", options: { bullet: true, breakLine: true } },
    { text: "No gestiona matrícula ni calificaciones (RD-16)", options: { bullet: true, breakLine: true } },
    { text: "No controla la red eléctrica del campus (RD-18)", options: { bullet: true, breakLine: true } },
    { text: "No hace mantenimiento físico (RD-17)", options: { bullet: true } },
  ], { x: 7.35, y: 2.95, w: 5.0, h: 2.9, fontSize: 13, color: CARBON, paraSpaceAfter: 10, margin: 0 });
  s.addNotes("El fuera de alcance está declarado como restricciones de diseño, no como una lista informal.");
}

// ================================================== 4. PROCESO PE1-PE5
{
  const s = pres.addSlide(); pie(s, 4);
  tituloSlide(s, "El proceso: de PE1 a PE5");
  const filas = [
    [{ text: "Entrega", options: { bold: true, color: BLANCO, fill: { color: VERDE } } },
     { text: "Fecha", options: { bold: true, color: BLANCO, fill: { color: VERDE } } },
     { text: "Resultado", options: { bold: true, color: BLANCO, fill: { color: VERDE } } }],
    ["1A", "30/05/2026", "Dominio, alcance y partes interesadas"],
    ["1B", "05/07/2026", "ERS parcial: 23 RF, 6 RNF, 16 CU. Nota 9,70/10"],
    ["2A", "02/08/2026", "ERS completo, UML, MoSCoW+Kano+WSJF, MVP, componente empírico"],
    ["2B", "en curso", "Manuscrito de publicación y dataset"],
    [{ text: "PE5", options: { bold: true, fill: { color: "E6F0E4" } } },
     { text: "22/08/2026", options: { bold: true, fill: { color: "E6F0E4" } } },
     { text: "Auditoría, trazabilidad end-to-end, requisitos de IA, ERS v4.0", options: { bold: true, fill: { color: "E6F0E4" } } }],
  ];
  s.addTable(filas, {
    x: M, y: 1.5, w: W - 2*M, colW: [1.5, 1.9, 8.5],
    fontSize: 13, color: CARBON, border: { type: "solid", color: "DDDDDD", pt: 1 },
    rowH: 0.45, valign: "middle", margin: 0.08,
  });

  s.addText("Marco normativo: ISO/IEC/IEEE 29148:2018 · ISO/IEC 25010:2023 · ISO/IEC/IEEE 15288:2023 · LOPDP Ecuador · Reglamento (UE) 2024/1689 como referencia.",
    { x: M, y: 5.1, w: W - 2*M, h: 0.6, fontSize: 12, color: GRIS, margin: 0 });
  s.addNotes("Dos rondas de campo: la primera define el núcleo, la segunda lo corrige. Por eso el proceso fue incremental y no cascada.");
}

// ================================================== 5. EL ERS
{
  const s = pres.addSlide(); pie(s, 5);
  tituloSlide(s, "El ERS: estructura y requisitos clave");
  s.addText("Versión 4.0 · 22 de agosto de 2026", { x: M, y: 1.3, w: 6, h: 0.35, fontSize: 15, bold: true, color: AMBAR, margin: 0 });

  const cifras = [["25", "RF"], ["6", "RF de IA"], ["17", "RNF"], ["18", "restricciones"], ["17", "casos de uso"], ["17", "historias"]];
  let x = M;
  cifras.forEach(([n, etq]) => {
    tarjeta(s, x, 1.85, 1.85, 1.35);
    s.addText(n, { x: x, y: 1.98, w: 1.85, h: 0.6, fontSize: 32, bold: true, color: VERDE, align: "center", margin: 0 });
    s.addText(etq, { x: x, y: 2.6, w: 1.85, h: 0.35, fontSize: 11, color: GRIS, align: "center", margin: 0 });
    x += 1.99;
  });

  tarjeta(s, M, 3.5, 3.85, 2.5);
  s.addText("Prioridad MoSCoW", { x: M + 0.25, y: 3.68, w: 3.4, h: 0.35, fontSize: 15, bold: true, color: VERDE, margin: 0 });
  s.addText("17 Must · 8 Should", { x: M + 0.25, y: 4.1, w: 3.4, h: 0.4, fontSize: 20, bold: true, color: CARBON, margin: 0 });
  s.addText("Consolidada en un único archivo tras cerrar la contradicción D-01.",
    { x: M + 0.25, y: 4.6, w: 3.4, h: 1.1, fontSize: 11, color: GRIS, margin: 0 });

  tarjeta(s, 4.75, 3.5, 3.85, 2.5);
  s.addText("Núcleo funcional", { x: 5.0, y: 3.68, w: 3.4, h: 0.35, fontSize: 15, bold: true, color: VERDE, margin: 0 });
  s.addText([
    { text: "RF-01 captura ambiental", options: { bullet: true, breakLine: true } },
    { text: "RF-07 panel centralizado", options: { bullet: true, breakLine: true } },
    { text: "RF-08 alertas", options: { bullet: true, breakLine: true } },
    { text: "RF-13 / RF-16 apagado automático", options: { bullet: true, breakLine: true } },
    { text: "RF-19 acceso por roles", options: { bullet: true } },
  ], { x: 5.0, y: 4.08, w: 3.4, h: 1.8, fontSize: 11, color: CARBON, paraSpaceAfter: 4, margin: 0 });

  tarjeta(s, 8.85, 3.5, W - 8.85 - M, 2.5, "F3E9DC");
  s.addText("Requisitos legales", { x: 9.1, y: 3.68, w: 3.2, h: 0.35, fontSize: 15, bold: true, color: AMBAR, margin: 0 });
  s.addText("RF-24 y RF-25 derivan de los Art. 13 y 14 de la LOPDP, y desde esta unidad tienen caso de uso propio: CU-17.",
    { x: 9.1, y: 4.1, w: 3.2, h: 1.6, fontSize: 12, color: CARBON, margin: 0 });
  s.addNotes("Si preguntan por la versión: la 4.0 consolida todos los cambios de PE1 a PE5, con fecha y commit declarados en el historial de versiones.");
}

// ================================================== 6. MODELOS
{
  const s = pres.addSlide(); pie(s, 6);
  tituloSlide(s, "Modelos");

  tarjeta(s, M, 1.45, 5.8, 4.6);
  s.addText("Heredado de la Entrega 3", { x: M + 0.3, y: 1.65, w: 5.2, h: 0.4, fontSize: 17, bold: true, color: GRIS, margin: 0 });
  s.addText([
    { text: "Contexto y casos de uso general", options: { bullet: true, breakLine: true } },
    { text: "Clases refinadas (16 clases)", options: { bullet: true, breakLine: true } },
    { text: "Secuencia y actividad (16 de cada uno)", options: { bullet: true, breakLine: true } },
    { text: "Estados: Alerta y Solicitud de mantenimiento", options: { bullet: true, breakLine: true } },
    { text: "Componentes y despliegue", options: { bullet: true, breakLine: true } },
    { text: "Modelado organizacional i* (SD y SR)", options: { bullet: true } },
  ], { x: M + 0.3, y: 2.15, w: 5.2, h: 3.6, fontSize: 13, color: CARBON, paraSpaceAfter: 8, margin: 0 });

  tarjeta(s, 7.0, 1.45, W - 7.0 - M, 4.6, "E6F0E4");
  s.addText("Nuevo en la Unidad V", { x: 7.3, y: 1.65, w: 5.1, h: 0.4, fontSize: 17, bold: true, color: VERDE, margin: 0 });
  circulo(s, 7.3, 2.25, 0.45, "1");
  s.addText("CU-17 — Ejercer derechos sobre datos personales", { x: 7.95, y: 2.25, w: 4.4, h: 0.5, fontSize: 13, bold: true, color: CARBON, margin: 0 });
  s.addText("RF-24 y RF-25 colgaban de CU-11, que es gestión de acceso: otro propósito, otros actores, otros plazos.",
    { x: 7.95, y: 2.75, w: 4.4, h: 0.8, fontSize: 11, color: GRIS, margin: 0 });
  circulo(s, 7.3, 3.85, 0.45, "2");
  s.addText("DFD nivel 1 — 8 procesos, 6 almacenes", { x: 7.95, y: 3.85, w: 4.4, h: 0.5, fontSize: 13, bold: true, color: CARBON, margin: 0 });
  s.addText("Sin proceso DFD ninguna cadena de trazabilidad podía cerrarse: es la causa del 0 % inicial de M4 adelante.",
    { x: 7.95, y: 4.35, w: 4.4, h: 0.9, fontSize: 11, color: GRIS, margin: 0 });
  s.addNotes("Ambos artefactos no son adorno: cada uno cierra un hueco que la auditoría midió.");
}

// ================================================== 7. VALIDACION
{
  const s = pres.addSlide(); pie(s, 7);
  tituloSlide(s, "Validación: la primera inspección formal");
  s.addText("No existía registro de defectos de ninguna entrega anterior. Esta fue la primera inspección formal del ERS.",
    { x: M, y: 1.3, w: W - 2*M, h: 0.4, fontSize: 14, color: CARBON, margin: 0 });

  const filas = [
    [{ text: "Defecto", options: { bold: true, color: BLANCO, fill: { color: VERDE } } },
     { text: "Naturaleza", options: { bold: true, color: BLANCO, fill: { color: VERDE } } },
     { text: "Inst.", options: { bold: true, color: BLANCO, fill: { color: VERDE }, align: "center" } }],
    ["D-01  Prioridad MoSCoW contradictoria", "El documento decía Should; el CSV, Must", { text: "3", options: { align: "center" } }],
    ["D-02  RNF sin prioridad declarada", "Atributo obligatorio ausente", { text: "12", options: { align: "center" } }],
    ["D-05  Cero casos de prueba conceptual", "Artefacto inexistente", { text: "25", options: { align: "center" } }],
    ["D-10  Gherkin sin evento observable", "Marcador de plantilla, no criterio", { text: "17", options: { align: "center" } }],
    ["D-12  §6.1 y §6.4 con conjuntos distintos", "Contradicción interna sobre el MVP", { text: "1", options: { align: "center" } }],
    ["D-13  Connextra malformado", "17 historias mal redactadas", { text: "17", options: { align: "center" } }],
  ];
  s.addTable(filas, {
    x: M, y: 1.95, w: W - 2*M, colW: [4.9, 5.5, 1.5],
    fontSize: 12.5, color: CARBON, border: { type: "solid", color: "DDDDDD", pt: 1 },
    rowH: 0.44, valign: "middle", margin: 0.08,
  });

  tarjeta(s, M, 5.55, W - 2*M, 0.95, "E6F0E4");
  s.addText([
    { text: "14 defectos raíz · 71 instancias contables. ", options: { bold: true } },
    { text: "Todos los que cuentan para la métrica de corrección quedaron cerrados." },
  ], { x: M + 0.3, y: 5.75, w: W - 2*M - 0.6, h: 0.55, fontSize: 14, color: CARBON, valign: "middle", margin: 0 });
  s.addNotes("Si preguntan cuál se les escapó: D-01, sobrevivió tres versiones del ERS porque nunca hubo inspección.");
}

// ================================================== 8. METRICAS
{
  const s = pres.addSlide(); pie(s, 8);
  tituloSlide(s, "Métricas de calidad: antes y después");
  const filas = [
    [{ text: "Métrica", options: { bold: true, color: BLANCO, fill: { color: VERDE } } },
     { text: "Antes", options: { bold: true, color: BLANCO, fill: { color: VERDE }, align: "center" } },
     { text: "Después", options: { bold: true, color: BLANCO, fill: { color: VERDE }, align: "center" } },
     { text: "Referencia", options: { bold: true, color: BLANCO, fill: { color: VERDE }, align: "center" } },
     { text: "Cumple", options: { bold: true, color: BLANCO, fill: { color: VERDE }, align: "center" } }],
    ["M1a  Completitud", { text: "70,73 %", options: { align: "center" } }, { text: "100 %", options: { align: "center", bold: true, color: VERDE } }, { text: "≥ 95 %", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    ["M1b  Completitud de CU", { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    ["M1c  Cobertura de actores", { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    ["M2   Consistencia", { text: "0,957", options: { align: "center" } }, { text: "1,000", options: { align: "center", bold: true, color: VERDE } }, { text: "≥ 0,98", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    ["M3   Verificabilidad", { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "≥ 90 %", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    ["M4a  Trazabilidad adelante", { text: "0 %", options: { align: "center", color: AMBAR } }, { text: "100 %", options: { align: "center", bold: true, color: VERDE } }, { text: "≥ 90 %", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    ["M4b  Trazabilidad atrás", { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "100 %", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
    [{ text: "M5   Modificabilidad", options: { bold: true } }, { text: "4,2", options: { align: "center" } }, { text: "4,2", options: { align: "center", bold: true, color: AMBAR } }, { text: "≤ 3,0", options: { align: "center" } }, { text: "No", options: { align: "center", bold: true, color: AMBAR } }],
    ["M6   Corrección", { text: "1,73", options: { align: "center", color: AMBAR } }, { text: "0,00", options: { align: "center", bold: true, color: VERDE } }, { text: "≤ 0,05", options: { align: "center" } }, { text: "Sí", options: { align: "center" } }],
  ];
  s.addTable(filas, {
    x: M, y: 1.45, w: W - 2*M, colW: [4.3, 1.9, 1.9, 1.9, 1.9],
    fontSize: 12.5, color: CARBON, border: { type: "solid", color: "DDDDDD", pt: 1 },
    rowH: 0.4, valign: "middle", margin: 0.08,
  });
  tarjeta(s, M, 6.0, W - 2*M, 0.85, "F3E9DC");
  s.addText([
    { text: "M5 no cumple y no se maquilla: ", options: { bold: true } },
    { text: "mide acoplamiento real del diseño; bajarlo exige rediseñar el modelo de dominio, no reescribir requisitos." },
  ], { x: M + 0.3, y: 6.15, w: W - 2*M - 0.6, h: 0.55, fontSize: 13, color: CARBON, valign: "middle", margin: 0 });
  s.addNotes("Ojo con M6 = 0,00: significa cero residuales DE LOS REGISTRADOS. Falta una re-inspección independiente. Decirlo antes de que lo pregunten.");
}

// ================================================== 9. TRAZABILIDAD
{
  const s = pres.addSlide(); pie(s, 9);
  tituloSlide(s, "Trazabilidad end-to-end");
  s.addText("Cadena completa de la plantilla 7.2, recorrible para las 48 filas de la matriz:",
    { x: M, y: 1.3, w: W - 2*M, h: 0.35, fontSize: 14, color: CARBON, margin: 0 });

  const pasos = ["Fuente", "RF", "CU", "Clase", "Proceso DFD", "Estado", "BDD", "CP"];
  let x = M, anchoPaso = 1.42;
  pasos.forEach((p, i) => {
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 1.85, w: anchoPaso, h: 0.62, rectRadius: 0.06,
      fill: { color: i >= 4 && i <= 4 ? VERDE_C : (i === 7 ? VERDE_C : CREMA) },
      line: { color: "DDDDDD" },
    });
    s.addText(p, { x, y: 1.85, w: anchoPaso, h: 0.62, fontSize: 11.5, bold: true, color: CARBON, align: "center", valign: "middle", margin: 0 });
    if (i < pasos.length - 1) {
      s.addText("›", { x: x + anchoPaso, y: 1.85, w: 0.16, h: 0.62, fontSize: 16, color: GRIS, align: "center", valign: "middle", margin: 0 });
    }
    x += anchoPaso + 0.16;
  });
  s.addText("En verde, las columnas que no existían en ningún archivo del proyecto antes de esta unidad.",
    { x: M, y: 2.55, w: W - 2*M, h: 0.3, fontSize: 11, italic: true, color: GRIS, margin: 0 });

  const cifras = [
    ["48", "filas en la matriz", "25 RF + 6 RF de IA + 17 RNF"],
    ["42", "casos de prueba", "derivados de criterios reales del ERS"],
    ["31", "huérfanos y cadenas rotas", "24 enlazados · 7 justificados"],
  ];
  let cx = M;
  cifras.forEach(([n, t, sub]) => {
    tarjeta(s, cx, 3.15, 3.85, 1.85);
    s.addText(n, { x: cx + 0.25, y: 3.3, w: 3.3, h: 0.7, fontSize: 40, bold: true, color: VERDE, margin: 0 });
    s.addText(t, { x: cx + 0.25, y: 4.0, w: 3.3, h: 0.35, fontSize: 14, bold: true, color: CARBON, margin: 0 });
    s.addText(sub, { x: cx + 0.25, y: 4.35, w: 3.3, h: 0.5, fontSize: 11, color: GRIS, margin: 0 });
    cx += 3.99;
  });

  tarjeta(s, M, 5.25, W - 2*M, 1.15, "E6F0E4");
  s.addText([
    { text: "Un identificador no es una traza. ", options: { bold: true } },
    { text: "Poner un caso de prueba en la matriz sin escribirlo habría sido un enlace «por si acaso»: hubo que redactar los 42 y verificar en ambos sentidos que todo CP citado existe y todo CP definido se usa." },
  ], { x: M + 0.3, y: 5.45, w: W - 2*M - 0.6, h: 0.8, fontSize: 13, color: CARBON, valign: "middle", margin: 0 });
  s.addNotes("Esta es la diapositiva donde se demuestra el criterio de ingeniería, no solo el resultado.");
}

// ================================================== 10. IA
{
  const s = pres.addSlide(); pie(s, 10);
  tituloSlide(s, "Componentes de inteligencia artificial");

  tarjeta(s, M, 1.4, 5.8, 4.0);
  s.addText("IA-01 · Predictor de fallas", { x: M + 0.3, y: 1.58, w: 5.2, h: 0.4, fontSize: 17, bold: true, color: VERDE, margin: 0 });
  s.addText("refina RF-09", { x: M + 0.3, y: 1.96, w: 5.2, h: 0.3, fontSize: 11, italic: true, color: GRIS, margin: 0 });
  s.addText([
    { text: "Clasificación binaria de riesgo a 7 días", options: { bullet: true, breakLine: true } },
    { text: "RF-IA-01 a 03 · F1 ≥ 0,70 · latencia ≤ 2 s", options: { bullet: true, breakLine: true } },
    { text: "Equidad: ≤ 10 p.p. de diferencia en falsos negativos entre aulas de uso alto y bajo", options: { bullet: true, breakLine: true } },
    { text: "Fallback: nunca crea el ticket; genera una alerta que un humano evalúa", options: { bullet: true } },
  ], { x: M + 0.3, y: 2.35, w: 5.2, h: 2.9, fontSize: 12.5, color: CARBON, paraSpaceAfter: 8, margin: 0 });

  tarjeta(s, 7.0, 1.4, W - 7.0 - M, 4.0);
  s.addText("IA-02 · Consumo energético", { x: 7.3, y: 1.58, w: 5.1, h: 0.4, fontSize: 17, bold: true, color: VERDE, margin: 0 });
  s.addText("refina RF-14", { x: 7.3, y: 1.96, w: 5.1, h: 0.3, fontSize: 11, italic: true, color: GRIS, margin: 0 });
  s.addText([
    { text: "Detección de anomalías no supervisada", options: { bullet: true, breakLine: true } },
    { text: "RF-IA-04 a 06 · falsos positivos ≤ 15 %", options: { bullet: true, breakLine: true } },
    { text: "Equidad: no atribuye responsabilidad individual a un docente por consumo que no controla", options: { bullet: true, breakLine: true } },
    { text: "Fallback: solo agrega una línea a un reporte que un humano revisa", options: { bullet: true } },
  ], { x: 7.3, y: 2.35, w: 5.1, h: 2.9, fontSize: 12.5, color: CARBON, paraSpaceAfter: 8, margin: 0 });

  tarjeta(s, M, 5.6, W - 2*M, 1.15, "F3E9DC");
  s.addText([
    { text: "Clasificación de riesgo: ", options: { bold: true } },
    { text: "ambos de riesgo mínimo/limitado. El Reglamento (UE) 2024/1689 se usa como marco de buenas prácticas, no como obligación: el sistema opera solo en Ecuador, sin nexo con la UE. La obligación legal real y aplicable es la LOPDP." },
  ], { x: M + 0.3, y: 5.8, w: W - 2*M - 0.6, h: 0.8, fontSize: 12.5, color: CARBON, valign: "middle", margin: 0 });
  s.addNotes("Si preguntan qué pasa cuando el modelo se equivoca: ninguna acción irreversible, siempre hay humano en el bucle.");
}

// ================================================== 11. DATOS PERSONALES Y SAFETY
{
  const s = pres.addSlide(); pie(s, 11);
  tituloSlide(s, "Datos personales y seguridad física");

  tarjeta(s, M, 1.4, 5.8, 2.5);
  s.addText("Qué datos trata", { x: M + 0.3, y: 1.58, w: 5.2, h: 0.35, fontSize: 16, bold: true, color: VERDE, margin: 0 });
  s.addText("Perfil y credenciales de usuario, y bitácora de acciones. La imagen de las cámaras se procesa solo para determinar presencia agregada: no se almacena, no hay reconocimiento facial, y por eso no constituye dato biométrico bajo el Art. 4 de la LOPDP.",
    { x: M + 0.3, y: 2.0, w: 5.2, h: 1.7, fontSize: 12.5, color: CARBON, margin: 0 });

  tarjeta(s, 7.0, 1.4, W - 7.0 - M, 2.5);
  s.addText("Cómo se protegen", { x: 7.3, y: 1.58, w: 5.1, h: 0.35, fontSize: 16, bold: true, color: VERDE, margin: 0 });
  s.addText([
    { text: "Cifrado AES-256 (NFR-03)", options: { bullet: true, breakLine: true } },
    { text: "Control de acceso por roles (RF-19)", options: { bullet: true, breakLine: true } },
    { text: "Bitácora de auditoría (RF-23)", options: { bullet: true, breakLine: true } },
    { text: "CU-17: derechos en ≤ 15 días hábiles", options: { bullet: true } },
  ], { x: 7.3, y: 2.0, w: 5.1, h: 1.7, fontSize: 12.5, color: CARBON, paraSpaceAfter: 6, margin: 0 });

  tarjeta(s, M, 4.15, W - 2*M, 2.35, "E6F0E4");
  s.addText("RNF-17 — Seguridad física (Safety), nuevo en esta unidad",
    { x: M + 0.35, y: 4.35, w: W - 2*M - 0.7, h: 0.4, fontSize: 17, bold: true, color: VERDE, margin: 0 });
  s.addText("El modelo de calidad no tenía ninguna característica Safety, pese a que el sistema emite comandos físicos de apagado sobre climatización. RNF-17 exige dos lecturas de presencia consecutivas separadas por 30 segundos antes de apagar; ante una lectura inconsistente o ausente no apaga, y genera una alerta de verificación fallida.",
    { x: M + 0.35, y: 4.8, w: W - 2*M - 0.7, h: 1.5, fontSize: 13, color: CARBON, margin: 0 });
  s.addNotes("Por qué se numera 17 y no 16: RNF-16 ya existía y trata la disponibilidad sin conectividad, con evidencia de campo propia (EV-15).");
}

// ================================================== 12. LECCIONES
{
  const s = pres.addSlide(); pie(s, 12);
  tituloSlide(s, "Lecciones aprendidas");
  const items = [
    ["1", "Medir con datos reales cambia el diagnóstico en las dos direcciones", "La verificabilidad resultó mejor de lo que suponíamos (100 %); la cobertura de fuentes de elicitación, peor."],
    ["2", "Editar un artefacto sin sincronizar sus duplicados genera contradicciones", "D-01 nació de tocar el CSV de priorización sin tocar el ERS."],
    ["3", "Un identificador no es una traza", "Escribir un CP en la matriz sin redactarlo habría sido un enlace vacío; hubo que redactar los 42."],
    ["4", "La definición de una métrica pesa tanto como su cálculo", "M1c pasó de 22 % a 100 % al corregir la definición operativa, no el documento."],
  ];
  let y = 1.45;
  items.forEach(([n, tit, sub]) => {
    tarjeta(s, M, y, W - 2*M, 1.25);
    circulo(s, M + 0.3, y + 0.36, 0.55, n);
    s.addText(tit, { x: M + 1.1, y: y + 0.2, w: 10.6, h: 0.4, fontSize: 15, bold: true, color: CARBON, margin: 0 });
    s.addText(sub, { x: M + 1.1, y: y + 0.62, w: 10.6, h: 0.5, fontSize: 12, color: GRIS, margin: 0 });
    y += 1.35;
  });
  s.addNotes("Estas cuatro son las que el tribunal puede repreguntar; cada una tiene un artefacto detrás.");
}

// ================================================== 13. LO QUE QUEDA ABIERTO
{
  const s = pres.addSlide(); pie(s, 13);
  tituloSlide(s, "Lo que queda abierto");
  s.addText("Se declara explícitamente, no se omite.", { x: M, y: 1.3, w: W - 2*M, h: 0.35, fontSize: 14, italic: true, color: AMBAR, margin: 0 });

  const items = [
    ["M5 = 4,2 frente a un umbral de 3,0", "Acoplamiento real en CU-01 y CU-13; corregirlo exige rediseñar el modelo de dominio."],
    ["Re-inspección independiente pendiente", "El M6 = 0,00 significa «cero residuales de los registrados», no «documento sin defectos»."],
    ["Barrido semántico par a par no ejecutado", "Los 400 pares RF↔RNF no se revisaron uno a uno buscando contradicciones de contenido."],
    ["Siete de los nueve actores sin entrevistar", "Nunca fueron fuente de un requisito; es una limitación de validez externa."],
    ["Nueve RNF sin validación de campo", "Marcados como «no verificado» en la Tabla 39 del ERS, no como validados."],
  ];
  let y = 1.85;
  items.forEach(([tit, sub]) => {
    tarjeta(s, M, y, W - 2*M, 0.94, "F3E9DC");
    s.addText(tit, { x: M + 0.35, y: y + 0.12, w: 11.4, h: 0.35, fontSize: 14, bold: true, color: AMBAR, margin: 0 });
    s.addText(sub, { x: M + 0.35, y: y + 0.48, w: 11.4, h: 0.35, fontSize: 11.5, color: CARBON, margin: 0 });
    y += 1.02;
  });
  s.addNotes("Reconocer límites suma en la rúbrica: el indicador «reconocimiento de límites» se evalúa explícitamente.");
}

// ================================================== 14. PREGUNTAS
{
  const s = pres.addSlide(); fondoOscuro(s);
  s.addText("Preguntas", { x: 0, y: 2.6, w: W, h: 1.0, fontSize: 54, bold: true, color: BLANCO, align: "center", fontFace: "Cambria", margin: 0 });
  s.addText("github.com/gsanchezc6-beep/SIGA_FGMMN_PEV", { x: 0, y: 3.75, w: W, h: 0.4, fontSize: 16, color: VERDE_C, align: "center", margin: 0 });
  s.addText("Informe final · ERS v4.0 · matriz de trazabilidad · 42 casos de prueba · fichas de IA · anexo de auditoría",
    { x: 0, y: 4.4, w: W, h: 0.4, fontSize: 12, color: BLANCO, align: "center", margin: 0 });
  s.addNotes("Anclar cada respuesta en un artefacto concreto. El banco de 22 respuestas está en 12_Defensa/banco_respuestas_tribunal.md");
}

pres.writeFile({ fileName: "Defensa_PE5_SIGA.pptx" }).then(() => console.log("OK: Defensa_PE5_SIGA.pptx"));
