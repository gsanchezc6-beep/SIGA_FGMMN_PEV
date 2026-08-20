# -*- coding: utf-8 -*-
"""
Script de análisis estadístico del componente empírico SIGA (Enfoque 1).
Uso: colocar las hojas de puntuación completas de cada juez en
resultados/ (una por juez, ej. juez1.csv, juez2.csv, juez3.csv) y
correr este script. Requiere: pandas, scipy, numpy.

    pip install pandas scipy numpy --break-system-packages
    python3 analizar_resultados.py
"""
import glob
import pandas as pd
import numpy as np
from scipy import stats

DIMENSIONES = [
    "Completitud(1-5)", "Ausencia_ambiguedad(1-5)", "Verificabilidad(1-5)",
    "Correccion_fuente(1-5)", "Consistencia_interna(1-5)",
]

def cargar_clave():
    clave = pd.read_csv("../CLAVE_RESPUESTAS_no_compartir_con_jueces.csv")
    return clave.set_index("Item_ciego")["Origen"].to_dict()

def cargar_jueces():
    archivos = sorted(glob.glob("../resultados/juez*.csv"))
    if not archivos:
        print("No se encontraron archivos resultados/juez*.csv todavía.")
        return []
    return [pd.read_csv(a) for a in archivos]

def main():
    origen = cargar_clave()
    jueces = cargar_jueces()
    if not jueces:
        return

    for dim in DIMENSIONES:
        print(f"\n=== Dimensión: {dim} ===")
        humano_scores, llm_scores = [], []
        for df in jueces:
            df["Origen"] = df["Item_ciego"].map(origen)
            humano_scores.append(df[df["Origen"] == "Humano"][dim].mean())
            llm_scores.append(df[df["Origen"] == "LLM"][dim].mean())

        humano_scores = np.array(humano_scores, dtype=float)
        llm_scores = np.array(llm_scores, dtype=float)

        print("Medias por juez (Humano):", humano_scores)
        print("Medias por juez (LLM):", llm_scores)

        # Normalidad
        if len(humano_scores) >= 3:
            _, p_norm_h = stats.shapiro(humano_scores)
            _, p_norm_l = stats.shapiro(llm_scores)
            normal = p_norm_h > 0.05 and p_norm_l > 0.05
        else:
            normal = False  # con n<3 no se puede evaluar normalidad de forma fiable

        if normal:
            stat, p = stats.ttest_rel(humano_scores, llm_scores)
            print(f"t-test apareado: t={stat:.3f}, p={p:.4f}")
        else:
            stat, p = stats.wilcoxon(humano_scores, llm_scores)
            print(f"Wilcoxon: W={stat:.3f}, p={p:.4f}")

        diff = humano_scores - llm_scores
        d = diff.mean() / diff.std(ddof=1) if diff.std(ddof=1) > 0 else float("nan")
        print(f"Cohen d (apareado): {d:.3f}")

if __name__ == "__main__":
    main()
