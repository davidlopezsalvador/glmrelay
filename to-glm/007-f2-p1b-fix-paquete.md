# 007 — Paquete P1b fix (M-IRTAM-F2): doble-fix veredicto 006 + oráculos exactos

Fichero: `to-glm/files/mirtamf2p1bdelta2.txt` (6.640 B, SHA-256 `0168129C361EFC1D8B6D32821BB398EC1F28A107157FAD5AEDA33E30E7073FDE`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit fix:** `af16482` — `M-IRTAM-F2 P1b fix: doble-fix veredicto 006 (armonicos -1 + FELDG Y -2) + oraculos exactos 6.1034/261.0765`. Tree `2e3e3bbd0746effd52a6ea859197ea87e0184ee7`, padre `bc45598` (drop 006). 2 ficheros, 40+/17- (IrtamGridEval.cpp 3/3, test 37/14). EOL: 0 CRs (hunks solo LF).

## Fix (2 líneas, veredicto §6 aplicado literal)

1. **BUG-1** `IrtamGridEval.cpp:229-230`: armónicos `sfe[mi+2j]/[mi+2j+1]` → `sfe[mi+2j-1]/[mi+2j]` (vs `IrtamReader.for:177`).
2. **BUG-2** `IrtamGridEval.cpp:119`: factor Y `h[ih+m]` → `h[ih+m-2]` (vs `igrf.for:543`).

## Ecos re-derivados del port corregido (misma toolchain UCRT64)

- xmodip(−11.95, 283.13, 2016.6) = **−0.398025** (exigido −0.3980 ✓)
- foF2 = **6.1034 MHz** (exigido 6.1034, ±1e-5 rel ✓)
- hmF2 = **261.0765 km** (exigido 261.0765, ±1e-5 rel ✓)
- Grid 46×45: min **2.15** / max **12.57** ([1.5,3.0]/[11.5,13.5] ✓)
- Nocturno (58N,124W,12UT): **3.3639 MHz** (±10% ✓) — artefacto 0.13 cerrado.

## Test endurecido (veredicto §5)

- `test_irtam_grid_eval` **24/24** (antes 18/18 con bugs): 6 aserciones exactas nuevas (xmodip, foF2, hmF2, grid min/max, nocturno).
- Ruta ASC parametrizable por `argv[1]` (sandbox GLM), fallback local documentado.
- ctest global **18/18**. TUs: 54. Warnings nuevos: 0. G6/B0/B1/anclas/flip: sin cambios vs 006 (estructural ya verde).

## Matriz — fila lección de índices (veredicto §6.3)

Media (`sfe[mi]`) y pendiente (`sfe[mmm+k-1]`) convertidas con −1; los 6 pares armónicos quedaron sin −1 — el error vivió en la frontera de las dos convenciones (1-based directo vs 0-based). Regla pineada: toda indexación Fortran 1-based lleva su −1 explícito con cita de línea original.
