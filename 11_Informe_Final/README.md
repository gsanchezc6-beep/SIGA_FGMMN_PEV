# Informe Final PE5 — SIGA (Unidad V)

## Compilador

MiKTeX (o TeX Live) con `pdflatex` y `biber` en el PATH. Probado con MiKTeX 25.12 / MiKTeX-pdfTeX 4.23.

## Archivo principal

`main.tex` — incluye (`\input`) las 13 secciones de `secciones/`, la bibliografía real (`referencias.bib`, copiada de `01_ERS/referencias.bib`), y el ERS completo vigente (`01_ERS/secciones_generadas.tex`) dentro de `secciones/03_ers_final.tex`.

## Orden exacto de comandos

```bash
cd 11_Informe_Final
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

O simplemente:

```bash
bash compilar.sh
```

(cuatro pasadas son necesarias: la primera genera las referencias cruzadas y `.bcf` para biber, la segunda ejecuta biber sobre la bibliografía, la tercera y cuarta resuelven el índice, la lista de tablas/figuras y las citas bibliográficas ya procesadas.)

## Dependencias de paquetes LaTeX

`babel` (spanish), `geometry`, `graphicx`, `float`, `longtable`, `booktabs`, `amssymb`, `xcolor` (table), `hyperref`, `enumitem`, `fancyhdr`, `titlesec`, `lastpage`, `multirow`, `biblatex` (backend biber, estilo ieee). MiKTeX instala paquetes faltantes automáticamente en la primera compilación si tiene conexión a internet; en modo offline, instalar el conjunto anterior manualmente con el MiKTeX Console.

## Dependencias de rutas (importante para clonar en limpio)

`main.tex` referencia archivos fuera de esta carpeta con rutas relativas (`../../01_ERS/...`, `../../04_Trazabilidad/...`, `../../10_Requisitos_IA/...`). Esto significa que **la estructura completa del repositorio debe estar presente** — no basta con clonar solo `11_Informe_Final/`. Verificado por diseño: el informe reutiliza el ERS y los artefactos reales del repositorio en vez de duplicarlos.

## Estado de compilación (última verificación)

Ver `COMPILACION_LOG.txt` en esta misma carpeta para el resultado exacto de la última prueba de compilación real con MiKTeX.
