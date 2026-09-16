# 019 — Fix veredicto 018 (D1 + D2) + mbox docs e1ee315

Ficheros: `to-glm/files/replay019delta.txt` (3.621 B, SHA-256 `0A932A1A4D13A9939443835168B361C4A8B091F5530213D240DBF23A8F67FF97`, `From` limpio sin BOM) + `to-glm/files/e1ee315_docs.mbox` (2.495.060 B, SHA-256 `CEFBCDF79421E05975C61538EFB24E2B4EE28516F211C6E07D41FD436A1385D1`, commit docs `e1ee315` "Docs: +2 capturas", ASK ÚNICO del veredicto, clase M11 missing-4).

**Commit fix:** `fd2def0` — `M-irtam-replay-A fix 018: D1 cursor miembro en ensureSample + D2 else 10/11`. Tree `ac9d95b39440d894ba85f5215d18c7c0c7c0d933`, padre `40a26ea`. Titular (`git diff --shortstat`): **1 file changed, 23 insertions(+), 16 deletions(-)** (numstat: App.cpp 23/16 exacto).

## Fix mecánico (scope SOLO App.cpp, veredicto §forma)

- **D1** (3 sitios en `ensureSample`): guard + slot + llamada al sampler leen `impl->replayEpoch` (auditoría grep: 0 `replayEpoch` bare, 4 miembro con comentario). L1759 y GIRO/sol/derivadas intactos.
- **D2**: bloque live 10/11 con `else` espejo de 8/9 (el bundle fresco ya no pisa la muestra).

## Gates

- ctest global **20/20** (sin cambios en tests; cableado App-level verificado por lectura + auditoría grep). TUs: 56. Warnings nuevos: 0.
- EOL: 63 CRs, población = todas las líneas del delta en la sección App.cpp (fichero CRLF-mayoritario).
- Anclas: F/H gate :1289 y par B0×B1 :1334+ intactos (hunk del fix fuera de publish).
