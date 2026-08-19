# Sesiones de validación por walkthrough

La Sección 8.4 de la guía exige, para cada sesión de validación, la **grabación** y
el **acta firmada**.

Las sesiones de walkthrough de este proyecto se realizaron **dentro de las mismas
sesiones de entrevista** con cada participante: tras recorrer el guion de
elicitación, se presentaron los mockups y el modelo de requisitos al participante
para su validación, y el resultado quedó recogido en el acta correspondiente.

Por eso las grabaciones **no se duplican** en esta carpeta: son las mismas piezas de
audio y video ya registradas bajo su identificador de evidencia. Aquí queda la
correspondencia entre cada acta y su grabación.

## Correspondencia acta ↔ grabación

| Acta | Evidencia | Participante | Grabación | Ubicación |
|---|---|---|---|---|
| `Acta_WT-01_EV-12_DOC-01.pdf` | EV-12 | DOC-01 | Audio | `02_Evidencias/Audio/2026-07-24_audio_entrevista_EV12.wav` |
| `Acta_WT-02_EV-13_DOC-02.pdf` | EV-13 | DOC-02 | Audio | `02_Evidencias/Audio/2026-07-27_audio_entrevista_EV13.mp3` |
| `Acta_WT-04_EV-16_DOC-04.pdf` | EV-16 | DOC-04 | Audio | `02_Evidencias/Audio/2026-07-30_audio_entrevista_EV16.mp3` |
| `Acta_WT-05_EV-08_CONS-02.pdf` | EV-08 | CONS-02 | Video + audio | `02_Evidencias/Video/EV08/` y `02_Evidencias/Audio/` |
| `Acta_WT-06_EV-09_CONS-03.pdf` | EV-09 | CONS-03 | Audio | `02_Evidencias/Audio/2026-07-13_audio_entrevista-EV09.wav` |

`Actas_Walkthrough_SIGA_2A.docx` reúne las cinco actas en un solo documento de
trabajo.

## Zona de evidencia

Las actas firmadas de esta carpeta contienen **firma manuscrita**, por lo que sus
originales forman parte de la zona restringida `[R]` y están incluidos en
`02_Evidencias/00_Restringido/evidencias_restringidas.7z`, cifrado con AES-256.

Los hashes SHA-256 de cada acta constan en
`02_Evidencias/00_Restringido/fichas_tecnicas.csv` y en `checksums.sha256`.

## Trazabilidad

Cada sesión de validación alimenta la matriz de trazabilidad
(`04_Trazabilidad/matriz_trazabilidad.csv`) a través de su identificador de
evidencia `EV-XX`, que enlaza con los requisitos funcionales validados en esa sesión.
