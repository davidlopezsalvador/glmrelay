# 039 — Zone por capa (ruling 038, familia 022): código

**Commit:** `ebcd297` - `Zone por capa 038: perLayerZoneName + rama Zone + tooltips + 8 tests`. Tree `4e161f6881046b21801c8a00e87ca5c7f32cf6fe`, padre `56a41d7` (TEC-ext). Titular (`git diff --shortstat`): **4 files changed, 101 insertions(+), 6 deletions(-)**. Numstat: App.cpp 28/6, IrtamState.cpp 18/0, IrtamState.h 8/0, test_irtam_state 47/0 (= 101+/6- exacto).

Fichero: `to-glm/files/zone039delta.txt` (8858 B, SHA-256 `2B0A8E37055C5939FC11A09963E0287E09B6661A4B1745E15854514FFC17BD00`, `From` limpio sin BOM).

## Scope (4 ficheros, taxativo §3 del ruling)

- **IrtamState.h/.cpp**: helper puro `perLayerZoneName(replayEpoch, nowUtc, r)` — TEC/GIRO por rangos reales (`oldest>0` + inclusivo), IRTAM banda estructural `nowUtc-345600.0 <= epoch <= nowUtc-259200.0` (mismos literales e inclusividad que layerLoopRange vars 8-11 y la vía unión). Tabla libre de 8 literales, orden canónico TEC+GIRO+IRTAM, prefijo `solo-` en singleton, `sin datos` en vacío. Sin forzar familia activa. Cabecera cita ruling 038 / familia 022.
- **App.cpp :4754**: rama por modo — `replayLayerLoop` → `perLayerZoneName(replayEpoch, nowUtcR, lr)` (lr/nowUtcR ya en scope :4685-4697, sin locks nuevos) + tooltip nuevo; unión → byte-idéntica (rz + zoneName + tooltip intactos).
- **Tooltips**: Zone por-capa declara los 3 hechos (dato real TEC/GIRO + banda IRTAM; span real flota, 72h nominal; heredados de disco); slider +1 frase (bounds por-capa pueden exceder 72h con heredados). Substrings: Zone contiene `real`, `inherited`, `per-layer`; slider contiene `per-layer` + `bounds` (verificado por lectura).
- **tests/test_irtam_state.cpp**: sección `M-irtam-replay-038` con 8 checks (1: caso 037 TEC+IRTAM en now-80h; 2: solo-TEC en now-30h; 3: solo-IRTAM en now-90h; 4: borde T-72h inclusivo; 5: solo-GIRO; 6: TEC+GIRO; 7: sin datos; 8: TEC+GIRO+IRTAM orden canónico). CERO flips (bloque `variable desconocida` restaurado byte-exacto tras detectar flip accidental en el acto).

Intocables verificados (`git diff --name-only` = exactamente los 4): zoneForAge/zoneName, TecCache, GloTecAdapter, LgdcPacing/Trace, IrtamCoeff*, IrtamCache, Kc2g*, main.cpp, CMakeLists, shaders, README, App.h.

## Poblaciones (grep -o case-sensitive, ocurrencias)

- `perLayerZoneName` **12** (≥6: decl .h + def .cpp + uso App + printf + 8 checks).
- `zoneForAge` **11** SIN cambio (un +1 accidental por comentario intermedio, revertido en el acto).
- `zoneName(` **5** SIN cambio (vía unión intacta).
- `solo-TEC` en IrtamState.cpp **2** (zoneName + perLayerZoneName).
- `TEC+IRTAM` **5** (≥2: código + tests).

## Barrera ×2 (A = build 56a41d7 previo; B = plegado 039)

- ctest global **20/20** en ambas (B tras `--clean-first` completo: 127 pasos, 0 fallos).
- state **65/65** (57 + 8 nuevos, 0 FAIL); resto pins: tec_cache 29, coeff_parse 43, irtamc_cache 32, gate 19, adapter 21, lgdc_trace 9, hf 160.
- grid_eval local 13/13 con skips (`ASC extra-repo ausentes`; fichero intacto, fuera del diff — el 37 del §5-036 cuenta fixtures del espejo).
- Warnings: build local sin `-Wall` en CMakeLists → 0 emitidos pre/post (+0 nuevos; las 13 son del harness del espejo).
- **G6 0 URLs nuevas · G8 0 esperas nuevas** (función pura + texto UI).
- EOL: App.cpp total 4930 / CRLF 1878 (+22/+22 vs 4908/1856 — hunks en CRLF de la zona local); IrtamState + test en LF; LF-alone resto +0.

## Retención de disco (pedido §7-038, una línea)

tec_*.bin: poda-en-restore a 432 + append-only en sesión (medido 450 por crecimiento en vivo; sin poda periódica; si se quiere techo duro, item nice-to-have junto a buf[64]).

## Siguiente

Binario post-039 para el ÚNICO relanzamiento; drop 040 = evidencia mini-premiere (puntos 2/2b/3/4) con custodia estándar.
