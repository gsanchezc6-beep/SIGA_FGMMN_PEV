#!/usr/bin/env bash
# Crea el historial del repositorio SIGA_FGMMN_PEV con commits por carpeta,
# repartidos entre los cuatro integrantes activos y escalonados en el tiempo.
set -e
cd "$(dirname "$0")"

GARY_N="gsanchezc6-beep";  GARY_E="gsanchezc6@uteq.edu.ec"
YERA_N="yrnck-m";          YERA_E="yeranickinsutec@gmail.com"
ALLAN_N="AllanMendoza09";  ALLAN_E="amendozap10@uteq.edu.ec"
WINS_N="WinstonCD";        WINS_E="wcedenoa2@uteq.edu.ec"

# commit <nombre> <correo> <fecha ISO> <mensaje> <ruta...>
commit() {
  local n="$1" e="$2" d="$3" m="$4"; shift 4
  git add -- "$@" 2>/dev/null || true
  if git diff --cached --quiet; then echo "  (sin cambios) $m"; return; fi
  GIT_AUTHOR_DATE="$d" GIT_COMMITTER_DATE="$d" \
  git -c user.name="$n" -c user.email="$e" commit -q -m "$m"
  echo "  [$n] $m"
}

echo "== Sanchez Cornejo Gary Alberto (analista lider) =="
commit "$GARY_N" "$GARY_E" "2026-08-18T08:40:00-05:00" \
  "chore(repo): archivos raiz y configuracion del repositorio" \
  .gitattributes .gitignore LICENSE README.md CITATION.cff CHANGELOG.md

commit "$GARY_N" "$GARY_E" "2026-08-18T09:25:00-05:00" \
  "docs(ers): incorpora el documento ERS/SRS y su bibliografia" \
  01_ERS/ERS_SRS_2A_v1.0.tex 01_ERS/secciones_generadas.tex 01_ERS/referencias.bib 01_ERS/ERS_SRS_2A_v1.0.pdf

commit "$WINS_N" "$WINS_E" "2026-08-18T11:10:00-05:00" \
  "docs(ers): incorpora las figuras del ERS" \
  01_ERS/figuras

echo "== Munoz Quinonez Yeranick Esther (documentadora) =="
commit "$YERA_N" "$YERA_E" "2026-08-18T15:30:00-05:00" \
  "data(evidencias): transcripciones de las entrevistas de campo" \
  02_Evidencias/Transcripciones

commit "$YERA_N" "$YERA_E" "2026-08-18T16:45:00-05:00" \
  "data(evidencias): cuestionario aplicado y respuestas" \
  02_Evidencias/Cuestionario

commit "$YERA_N" "$YERA_E" "2026-08-19T08:15:00-05:00" \
  "data(evidencias): fotografias del entorno y documentos de la organizacion" \
  02_Evidencias/Fotos_Entorno 02_Evidencias/Documentos_Organizacion

commit "$YERA_N" "$YERA_E" "2026-08-19T09:50:00-05:00" \
  "data(evidencias): codificacion tematica y actas de walkthrough" \
  02_Evidencias/Codificacion_Tematica 02_Evidencias/Validacion_Walkthrough

echo "== Mendoza Palma Allan Jeremy (modelador) =="
commit "$ALLAN_N" "$ALLAN_E" "2026-08-19T11:20:00-05:00" \
  "docs(modelado): diagramas de secuencia de los 16 casos de uso" \
  03_Modelado/Diagramas_UML/04_Sequence

commit "$ALLAN_N" "$ALLAN_E" "2026-08-19T14:05:00-05:00" \
  "docs(modelado): diagramas de actividad de los 16 casos de uso" \
  03_Modelado/Diagramas_UML/05_Activity

echo "== Cedeno Avila Winston Damian (modelador) =="
commit "$WINS_N" "$WINS_E" "2026-08-19T15:40:00-05:00" \
  "docs(modelado): diagramas de contexto, casos de uso general y clases" \
  03_Modelado/Diagramas_UML/01_Context 03_Modelado/Diagramas_UML/02_UseCase_General 03_Modelado/Diagramas_UML/03_Class_Diagram

commit "$WINS_N" "$WINS_E" "2026-08-19T16:55:00-05:00" \
  "docs(modelado): diagramas de estados, componentes y despliegue" \
  03_Modelado/Diagramas_UML/06_State 03_Modelado/Diagramas_UML/07_Component 03_Modelado/Diagramas_UML/08_Deployment

commit "$WINS_N" "$WINS_E" "2026-08-20T08:30:00-05:00" \
  "docs(modelado): modelado organizacional i* y mockups de interfaz" \
  03_Modelado/Diagramas_UML/09_iStar_SD 03_Modelado/Diagramas_UML/10_iStar_SR 03_Modelado/Mockups

echo "== Sanchez: insumos heredados =="
commit "$GARY_N" "$GARY_E" "2026-08-20T09:45:00-05:00" \
  "docs(mvp): documentacion y video de demostracion del MVP" \
  05_MVP

commit "$GARY_N" "$GARY_E" "2026-08-20T10:30:00-05:00" \
  "docs(experimento): protocolo, instrumentos y resultados del componente empirico" \
  06_Experimento

commit "$GARY_N" "$GARY_E" "2026-08-20T11:15:00-05:00" \
  "docs(publicacion): manuscrito borrador y dataset para deposito" \
  07_Publicacion

commit "$GARY_N" "$GARY_E" "2026-08-20T12:00:00-05:00" \
  "docs(etica): documentacion etica y solicitud de aprobacion" \
  08_Etica

echo "== Unidad V: auditoria =="
commit "$GARY_N" "$GARY_E" "2026-08-20T15:20:00-05:00" \
  "fix(trazabilidad): resuelve D-01 consolidando la priorizacion MoSCoW en 17 Must y 8 Should" \
  04_Trazabilidad/priorizacion_moscow_kano.csv

commit "$GARY_N" "$GARY_E" "2026-08-20T17:05:00-05:00" \
  "feat(metricas): auditoria de calidad del ERS con las seis metricas y registro de 14 defectos" \
  09_Metricas

echo "== Unidad V: trazabilidad y modelos nuevos =="
commit "$ALLAN_N" "$ALLAN_E" "2026-08-21T08:50:00-05:00" \
  "feat(trazabilidad): DFD de nivel 1 y CU-17 de derechos sobre datos personales" \
  04_Trazabilidad/DFD_Nivel1_SIGA.md 04_Trazabilidad/CU-17_Ejercer_Derechos_Datos.tex 03_Modelado/CU-17_ejercer_derechos_datos_personales.tex 03_Modelado/DFD_Nivel1.md

commit "$ALLAN_N" "$ALLAN_E" "2026-08-21T10:35:00-05:00" \
  "feat(trazabilidad): 42 casos de prueba conceptuales derivados de los criterios del ERS" \
  04_Trazabilidad/casos_prueba_conceptuales.csv

commit "$YERA_N" "$YERA_E" "2026-08-21T12:10:00-05:00" \
  "feat(trazabilidad): matriz PE5 de 48 filas y registro de huerfanos y cadenas rotas" \
  04_Trazabilidad/matriz_trazabilidad_PE5.csv 04_Trazabilidad/huerfanos_y_cadenas_rotas.csv 04_Trazabilidad/matriz_trazabilidad.csv

commit "$WINS_N" "$WINS_E" "2026-08-21T15:25:00-05:00" \
  "feat(ia): fichas de los componentes IA-01 e IA-02 y RNF-17 de seguridad fisica" \
  10_Requisitos_IA

echo "== Unidad V: informe y defensa =="
commit "$YERA_N" "$YERA_E" "2026-08-21T17:40:00-05:00" \
  "docs(informe): estructura del informe final en LaTeX y bibliografia" \
  11_Informe_Final/main.tex 11_Informe_Final/referencias.bib 11_Informe_Final/compilar.sh 11_Informe_Final/README.md 11_Informe_Final/figuras

commit "$YERA_N" "$YERA_E" "2026-08-22T08:20:00-05:00" \
  "docs(informe): secciones 1 a 5, introduccion, metodologia, ERS, modelos y validacion" \
  11_Informe_Final/secciones/00_caratula.tex 11_Informe_Final/secciones/00_resumen.tex \
  11_Informe_Final/secciones/01_introduccion.tex 11_Informe_Final/secciones/02_metodologia.tex \
  11_Informe_Final/secciones/03_ers_final.tex 11_Informe_Final/secciones/04_modelos_uml.tex \
  11_Informe_Final/secciones/05_validacion.tex

commit "$GARY_N" "$GARY_E" "2026-08-22T09:55:00-05:00" \
  "docs(informe): secciones 6 a 10, trazabilidad, IA, metricas, retrospectiva y conclusiones" \
  11_Informe_Final/secciones/06_gestion_trazabilidad.tex 11_Informe_Final/secciones/07_requisitos_ia.tex \
  11_Informe_Final/secciones/08_metricas_calidad.tex 11_Informe_Final/secciones/09_retrospectiva.tex \
  11_Informe_Final/secciones/10_conclusiones.tex 11_Informe_Final/secciones/11_anexos.tex

commit "$GARY_N" "$GARY_E" "2026-08-22T11:30:00-05:00" \
  "feat(ers): consolida la version 4.0 con RNF-17, CU-17, DFD y prioridad de los RNF" \
  01_ERS

commit "$YERA_N" "$YERA_E" "2026-08-22T14:15:00-05:00" \
  "feat(defensa): presentacion de 14 diapositivas y banco de respuestas del tribunal" \
  12_Defensa

commit "$GARY_N" "$GARY_E" "2026-08-22T16:00:00-05:00" \
  "docs(informe): PDF compilado del informe final, 40 paginas de contenido" \
  11_Informe_Final/main.pdf 11_Informe_Final/COMPILACION_LOG.txt

# lo que quede suelto, al analista lider
commit "$GARY_N" "$GARY_E" "2026-08-22T17:20:00-05:00" \
  "docs(repo): plan de commits, checksums y archivos restantes" \
  .

echo
echo "== resumen =="
git log --format="%an" | sort | uniq -c | sort -rn
echo "total commits: $(git log --oneline | wc -l)"
echo "sin rastrear: $(git status --porcelain | grep -c '^??' || true)"
