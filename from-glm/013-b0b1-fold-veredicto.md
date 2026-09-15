# 013 — Veredicto del fold: B0/B1 (par aditivo + visual 10/11 + oráculos)

**APROBACIÓN.** El drop 013 (implementación del ruling F2-B0B1-R1) queda
plegado, verificado y anclado como `b0b1-folded` (espejo 24bc692 → tree
`c61f2c1a68b8fb53d733230c451ef382830dc37f`, padre a2616f77 =
`lgdctrace-folded`). El sello M-IRTAM-F2 no se toca; la cadena post-sello
pasa a 3 árboles: 03bcd8b4 (sellado) → a2616f77 (traza) → c61f2c1a (B0/B1).

## 1. Custodia

- `b0b1delta.txt`: sha256
  `DF3847D3A541A8DF2FA538E3D25D769296A3F464B558ED2A1AA7A9B89AD9C4A7`
  == anunciado, 32.147 B exactos, blob 390072cd == disco. `From 141aa06`
  limpio, sin BOM. `git apply --check` OK → `git am --keep-cr` → 5aa69cc.
  **Tree gate EXACTO**: c61f2c1a == publicado.
- Diffstat: **11 ficheros, 318+/29-** — shortstat del commit == numstat de
  la nota, sumas exactas por fichero (lección 010 aplicada: el titular ahora
  sale de git y cuadra con el numstat). Cero ficheros nuevos.
- Intangibles por blob (HEAD == HEAD^): LgdcPacing.h/.cpp, IrtamState.cpp/.h,
  IrtamCoeffParse.cpp/.h, IrtamCache.cpp/.h, main.cpp, GiroAdapter.cpp,
  LgdcTrace.cpp/.h — 12/12 intactos. El scope taxativo se respeta: solo los
  11 ficheros declarados cambian.

## 2. Contrato ruling → código (verificado por lectura + test)

- **Q1 aditivo**: `b0`/`b1` GridData al final del bundle; `valid`/`dataEpoch`
  siguen gobernados SOLO por el par F/H. El bloque F/H publish queda
  **byte-idéntico** (51 líneas pre[1178..1228] == post, gate `tovF != tovH`
  intacto). Las 14 eliminaciones de App.cpp están TODAS en UI
  selector/badge/leyenda — ninguna en publish/gate.
- **Q2 parejas**: `commonTovEpoch` (comparación exacta de tovEpoch, misma
  convención que el gate F/H, -1 sin intersección) + `evalPairGrids` (exige
  mensajes válidos, basis standard en ambos, MISMO TOV; rellena o devuelve
  false sin tocar nada). La condición del ruling "par-fallido cubierto por
  TEST" se cumple: TOV desigual y basis no-standard están testeados, no solo
  leídos.
- **Q3 visual**: selector 12 entradas ("IRTAM B0"/"IRTAM B1" en 10/11),
  leyenda con unidades "km"/"[]", colormaps propios (B0=inferno, B1=plasma
  vía VAR_AUTO_CM[12]), **B0 clamp-a-0 en copia display-only** (2 sitios:
  update y applyColorLayer; el GridData crudo viaja intacto), draw exige
  valid+present en ambos caminos, badge B0/B1 exige grid presente con
  DATA-age gobernado por F/H. "Sin dato no se dibuja" heredado y verificado.
- **Q4 oráculos**: el test contra los ASC 20160523_1200 produce eco
  **B0 = 84.5733871 km / B1 = 2.4862359** — 7 dígitos iguales a mi réplica
  independiente (cross-anchor del ruling §1); grids **[43.249, 199.194] /
  [0.392, 5.708]** == mi rebanada hour=12 **exacta**. Tripwires corregidos
  B0 [−100,+400] / B1 [−1,+8] aplicados tal cual el ruling.
- **Q5 tráfico**: `kParams[4]` param-major (foF2, hmF2, B0, B1);
  `planMissing` 96×4 = 384 (testeado: 384 targets, orden por bloques,
  oldest-first por param, faltantes exactos con pares llenos no
  interferidos); pacing INTACTO (blobs LgdcPacing sin cambio, kSlots/
  kSlotSec/kGambitLagSec intactos); tabla G10 del `.h` actualizada (384 req
  ≈ 96 min, "justo E11"). G6: 0 literales URL nuevas. G8: 0 esperas nuevas.

## 3. Barrera (script persistido `b0b1_013_fold_verify.sh`)

- **Compilación**: 56 TUs + LINK, warnings únicas 13 == baseline traza,
  **+0 nuevas / −0 desaparecidas** (cross-build estable). En compilar el
  adapter: 2 format-truncation (1 baseline P4 + 1 LgdcTrace adjudicada
  veredicto 010) — "warnings +0" de la nota cierto en su toolchain MSYS2.
- **Tests 20/20** con conteos exactos: irtamc_cache **32** (28+4 commonTov),
  irtam_adapter **21** (19+2), irtam_grid_eval **37** (24+13 B0/B1: parse×2,
  TOV común, ecos exactos, tripwires×2, grids+bandas, evalPair 3 caminos),
  irtam_cache 37, irtam_coeff_parse 43, irtamc_gate 19 (LgdcPacing intacto
  re-testeado), irtam_state 11, lgdc_trace 9, heredados kc2g/hf(160)/etc.
  La sección B0/B1 del oráculo NO se saltó (fixture audit presente).
- **Anclas re-pineadas** 9/9: 357 (+0), 1387/1418/1635 (+41), 2496 (+59),
  2598/3048 (+79), 3305 (+90), setvbuf main.cpp:8 — desplazamientos exactos
  por los 4 hunks de inserción (+41/+18/+20/+11). Sin colisiones.

## 4. EOL forense (población adjudicada)

La nota declara "152 CRs = App 144 + CMake 8". Mi conteo inicial sobre
añadidas-solo daba 101 (App 100 + CMake 1) — la población correcta es el
**censo de CRs de TODAS las líneas del delta por sección** (contexto +
eliminadas + añadidas): App 34+10+100 = 144, CMake 6+1+1 = 8, total 152
EXACTO. La cifra es correcta; el etiquetado de la población podría ser más
explícito la próxima vez (lección de etiquetado aplicada a la inversa —
esta vez la ambigüedad la resolví yo a favor del emisor).

Detalle fino del censo mixto (LF-entre-CRLF en App.cpp): 8 pre → 8 post,
con un **quirk exchange**: el delta ARREGLÓ involuntariamente el `}` LF
preexistente (pre-3016 → post-3095 con CR) y CREÓ uno nuevo (el tooltip
largo ahora LF en zona CRLF, post-3096). Sin regresión neta, cero impacto
funcional; nice-to-have registrado: restaurar el CR del tooltip la próxima
vez que App.cpp se toque por cualquier motivo.

## 5. Observaciones (no bloqueantes)

- **Doble `loadCached("cache")`** en el bloque B0/B1 de App.cpp (una para
  `commonTovEpoch`, otra para el ScanResult). Correcto en la práctica (el
  cache solo crece entre ambas llamadas y el prune nunca elimina el TOV más
  fresco), pero duplica I/O de disco por ciclo de publish. Nice-to-have:
  reutilizar un único ScanResult cuando el ciclo vuelva a tocar ese bloque.
- El clamp-color de B0 vive en 2 sitios (update + applyColorLayer) —
  consistente con el patrón existente de las variables 8/9; sin acción.
- Lecciones de barrera (mías, 2 iteraciones): (a) hashes INTACTOS
  hardcodeados de memoria → sustituidos por comparación HEAD == HEAD^;
  (b) rango del bloque F/H mal acotado (1178-1231 → 1178-1228: la inserción
  va tras `} while (false);`); (c) expectativa EOL con población equivocada
  (añadidas vs censo por sección); (d) la primera lista de tests citaba
  tests de ciclos antiguos inexistentes → canonizada al registro ctest
  actual (20). Fallos de MÉTODO, no del código plegado.

## 6. Ruling

- **APROBACIÓN** del fold B0/B1. Tag anotado `b0b1-folded` (24bc692, tree
  c61f2c1a) con registro completo. Cadena post-sello: 03bcd8b4 → a2616f77
  → c61f2c1a (3 árboles, 2 ciclos). El sello `mirtamf2-sealed` permanece
  único y permanente (ruling S2).
- Con esto, el backlog F2 queda con `M-irtam-replay` como último ítem. El
  estreno en vivo del par B0×B1 (carrera de denegaciones propia, consumo
  de gate con 4 params, y eventual cierre de las lagunas steady/fail/badge
  del 011) queda como candidata natural de corrida con la traza — mismo
  formato de evidencia que el 011, a señal de MUSE.
