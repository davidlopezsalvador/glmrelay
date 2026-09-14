# 006 — Paquete P1b (M-IRTAM-F2): port del reader + evaluación + flip + visual

Fichero: `to-glm/files/mirtamf2p1bdelta.txt` (31.811 B, SHA-256 `49B1192CD2347CDFE6AB757B85B96127896DD4BE87B0992CA52E556A9ED07629`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit P1b:** `bc45598` — `M-IRTAM-F2 P1b: port Jones-Gallet + igrf_dip (mixto float) + eval 46x45 + flip aditivo valid=true`. Tree `3a9a80c06c23d4a0579fc589b11f24a297864f6f`, padre `42dc233` (P4). 6 ficheros, 630 inserciones, 3 borrados (numstat: CMakeLists 7/1, App.cpp 65/2, IrtamGridEval.cpp +294, .h +68, .inc +53, test +143).

## Matriz de auditoría línea a línea (contra `IrtamReader_Fortran_V1.0.zip`, custodia 997A43C7)

| # | Fuente FORTRAN | Port C++ | Desviación / justificación |
|---|---|---|---|
| 1 | `IrtamReader.for:89-92` FOUT1 ×4 params | `fout1()` ×foF2/hmF2 (B0/B1 diferidos, backlog) | Scope tight: solo foF2+hmF2; B0/B1 parseados como oráculo auditoría, no evaluados |
| 2 | `IrtamReader.for:102-117` FOUT1 (QF={11,11,8,4,1,0,0,0,0}, IHARM=6) | QF/IHARM/K1=9/M=76/MM=13 literales en `fout1()` | Fiel, sin desviación |
| 3 | `IrtamReader.for:120-216` GAMMA2 + XMIN `:151` + pendiente `SFE(MMM+I)*XMIN` | `fout1()` idéntico; producto pendiente en SINGLE antes del add | **Mapa de tipos** (abajo); `GAMMA2=SUM` trunca a float |
| 4 | `IrtamReader.for:219-232` FOUT/GAMMA1 (988, legacy) | NO portado (dead path, documentado en .h) | Recorte correcto: jamás llamado por el reader IRTAM |
| 5 | `IrtamReader.for:307-362` READIRTAMCOF (`# END_HEADER` + `4E16.8`) | Parser P1a existente (dobles) + cast a float en `fout1()` | Réplica del truncado REAL al leer |
| 6 | `igrf.for:94-133` igrf_dip (INITIZE+FELDCOF+FELDG, modip asin) | `igrfDip()` idéntico, clamp dipdiv, 300 km | Fiel; FELDC/FELDI/SHELLG no necesarios (L-cálculo) |
| 7 | `igrf.for:441-573` FELDG + K-loop `IF(I-1) 5,4,2` | `feldg()` con **fall-through explícito** (label-2 → 4 → 5; K=3 último escritor) | Transcripción literal del flujo más peligroso |
| 8 | `igrf.for:576-675` FELDCOF + `sun.for` (49 lín) | Solo rama EXTRASHC year≥2015; sun.for fuera de scope (sin `CALL SUN`) | Recorte pineado: igrf2015+SV embebidos (.inc); resto .dat dormidos |
| 9 | GETSHC/INTERSHC/EXTRASHC/INITIZE | EXTRASHC + Schmidt + INITIZE portados; hoisting 1×/año | Hoisting determinista, numéricamente idéntico |

**Mapa de tipos (GLM #2):** float = args GAMMA2, SFE, UMR/PI, XMIN, HOU, SS/S3/XSINX/S0/S1/S2, todo FELDG/igrf_dip; double = C/S/COEF/SUM, X/F0/F Schmidt. Double-en-bloque difiere en 7º dígito — no exacto.

## Oráculos (custodia S4, ASC 20160523_1200, HOUR==TOV==12, ryear 2016.6)

- Punto ejemplo (−11.95, 283.13): foF2 **7.6651 MHz** ([0.5,20] ✓), hmF2 **347.0565 km** ([100,600] ✓); xmodip −1.11 (ecuador de inclinación, localización deliberada).
- Grid 46×45 foF2 a TOV: min 0.13 / max 13.21 MHz, cresta ecuatorial presente. **Nota honesta:** min reportado, no gateado — réplica GLM da 2.14; sin gfortran aquí no se adjudica (ver triple-check abajo).
- **Desviación documentada (sin gfortran en este lado):** no hay stdout gfortran custody-only; en su lugar ecos del test de producción + nota. Tolerancia propuesta en tu sandbox glibc ≤1e-6 rel con % exacto, mismo trato que `-Wformat-truncation`.

## Flip + visual + gates

- **Flip aditivo estricto:** `IrtamBundle` sin cambio de tipo; `publish()` en App.cpp rellena foF2/hmF2 45×46 + `valid=true` solo con TOV común foF2×hmF2 y basis standard; si no, `valid=false` (P4 intacto).
- **Malla oficial:** 45×46 (lons −180..172/8, lats −90..90/4), E2 nativo, sin remuestreo. ryear producción = año decimal del TOV.
- **Visual:** draw path P4 ya exigía `valid` en 2 sitios — con `valid=true` la capa IRTAM foF2/hmF2 se dibuja (sello interino canjeado); badge DATA-age intacto (fuente TOV).
- `test_irtam_grid_eval` **18/18** + ctest global **18/18**. TUs: 54. Warnings nuevos: 0. G6: 0 URLs/hosts en nuevos. EOL: 90/90 CRs en hunks App/CMake (zonas probadas), nuevos LF-100%.
- Anclas re-pineadas (solo desplazamientos +63 por inserción): mergeKc2g def 356, restoreKc2gCache call 1345, applyCL 1550, replay 1593, restoreKc2gCache def 2431, applyCL2 2546, freshestAgeMinLive 3205, setvbuf main.cpp:8. bloomThreshold/gitignore intactos.
- Tráfico: sin cambios vs P4 (cero red nueva; eval puro).
