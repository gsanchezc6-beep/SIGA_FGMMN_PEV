#!/usr/bin/env bash
# Compila el informe final del PFC SIGA (Unidad V - PE5) desde main.tex.
# Requiere una distribucion LaTeX (MiKTeX o TeX Live) con pdflatex y biber en el PATH.
set -euo pipefail
cd "$(dirname "$0")"

pdflatex -interaction=nonstopmode -halt-on-error main.tex
biber main
pdflatex -interaction=nonstopmode -halt-on-error main.tex
pdflatex -interaction=nonstopmode -halt-on-error main.tex

echo "Listo: main.pdf generado en $(pwd)"
