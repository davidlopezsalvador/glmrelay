# 067 — Veredicto Opción B FASE 2 (fold del drop 066): APROBADO, FASE 2 CERRADA, tag `opcionb-folded`

**Punteros**: relay `a43b023..3acc808` (drop 066 de MUSE, push íntegro triple-verificado). Espejo base `7c50372` (tree `559cdbb3`, línea o3-folded, precondición incidente #14 ya descargada en 065) → fold `1008fd1`, **tree gate `779d21b3` == commit MUSE `4047a5f`** (padre `96d5c20` = `559cdbb3` ✓). 23 tags; sello mirtamf2-sealed intacto (ruling S2). Cadena del ciclo: `559cdbb3` → `779d21b3` (1/1).

## 1. Custodia y tree gate — EXACTOS

- Nota `to-glm/066-opcionb-fase2-paquete.md`: 2835 B / 29 líneas / sin BOM / blob `85ca95e7` == disco.
- Delta `to-glm/files/opcb066delta.txt`: **19748 B exactos**, sha256 `7F32E3B2E2D9799C619313F32AB1FCE134F1A3D383638B92EEC69315E5FFCD2C` == anunciado, blob `ab93c973` == disco, sin BOM (`From 4047a5f`), 359 líneas, formato `format-patch -o` + copia binaria.
- Pre-imágenes 8/8 == blobs de la base (`13094fd` App, `fe0b194` adapter.h, `b14d62e` cache.h, `e5160f7` state.cpp, `f90c382` state.h, `9b83e08` test_adapter, `1994371` test_state, `30ef4db` test_irtamc): `git apply --check` limpio.
- **Fold**: `am --keep-cr` limpio, sin cirugía (warning quoted-CRLF benigno de siempre); **write-tree `779d21b3` == commit `4047a5f` de MUSE** — lección 039 cumplida sin reserva.
- Numstat **8 ficheros 60+/52− == nota línea a línea** (App 20/17, adapter.h 1/1, cache.h 2/2, state.cpp 5/5, state.h 11/10, test_adapter 10/10, test_state 7/3, test_irtamc 4/4). Titular "8 files, 60+/52−" exacto.

## 2. Contenido vs partición 065 — CONFORME al 100 %

- **Átomo indivisible (017 §1)**: `kIrtamReplayWindowSec` 345600→604800 (`IrtamState.h` const + bloque de comentarios reescrito) + `kSlots` 96→384 (`IrtamCoeffAdapter.h:43`) + `kCapBuckets` 96→384 (`IrtamCoeffCache.h:26`, const + cabecera). **Coherencia aritmética verificada por lectura**: `windowEndFor = quantizeSlot(now − kGambitLagSec)` y `planMissing` itera kSlots−1..0 → banda cubierta = [T−168, T−72] h == W. Identidad: **W = kGambitLagSec + kSlots·kSlotSec = 259200 + 384·900 = 604800 EXACTO** (base: 259200 + 96·900 = 345600 ✓). Cap 384 == kSlots 384 (una bucket por slot): ni inalcanzable ni hambrienta.
- 4 literales `IrtamState.cpp` :43 zoneForAge / :60 perLayerZoneName / :213 layerDataTime / :271 layerLoopRange → 604800; bordes 259200 intactos; etiqueta `zoneName` → "solo-IRTAM [T-168,T-72]" (la vía [T-72,T] intacta).
- App UI: nacimiento cursor `nowUtc0 − 604800.0`, checkbox `Full 168 h window`, tooltip `Union 168 h loop`, modeLabel `Window: union 168 h` + comentarios de ventana; **fracción 75 %→86 % correcta**: (96−24)/96 = 75 % → (168−24)/168 = 85.71 % ≈ 86 %.
- **Flips de tests DECLARADOS como objeto del drop** (diferencia deliberada vs CERO-flips de O3, según 065): state flip :81→168 h + par de borde 604800/604801 + 96 h re-rolado a interior + flip layerLoopRange; adapter 384→1536 targets, índices 384/768/1152, oldest-first 383, loops s<384; irtamc_cache 98→386 saves **con la razón correcta** — el pin "96+3 kept" DEPENDÍA del umbral: con cap 384, 98 saves no podarían nada; 386 sigue ejercitando poda (384+3 kept == 387, 2 podados intacto).
- Intocados por blob 11/11 (IrtamCoeffAdapter.cpp planMissing, IrtamCoeffCache.cpp prune, IrtamGridEval oráculos 017 §7, LgdcPacing, LgdcTrace, ProviderStatus, DataManager, CMakeLists, TimelineBar, grid eval .h): idénticos base↔fold por construcción del delta de 8 ficheros, verificado por sha.

## 3. Poblaciones — CERRADAS

- **Zeros exactos (src)**: `345600` → 0 **CERRADO**; `Full 96 h window` 0; `Union/union 96 h` 0; `solo-IRTAM [T-96` 0; `kSlots = 96` / `kCapBuckets = 96` 0.
- `604800` = **8 exacto** con desglose declarado: 4 literales .cpp + const .h + App + 2 comentarios .h. `96 h` restantes = 2 (los nuevos prescritos de kSlots/kCapBuckets). Full/Union 168 + union 168 + T-168 = 9 == nota.
- Intactas **A==B** (la prueba real de "no tocado"): zoneName( 5/5 (== nota exacto), perLayerZoneName 12/12 sin-paren (== nota exacto), 259200 16/16, kSlotSec 4/4, kGambitLagSec 6/6, kParams 2/2, kReplayWindowSec 3/3, publish 5/5, solo-TEC 2/2, kMin/kMaxBucketBytes, buf[64] presente. G6/G8 sobre líneas añadidas del delta: 0 URLs, 0 primitivas de espera.

## 4. EOL — CUADRADO

- **CR en delta = 70 exacto**, desglose 53 ctx + 17 DEL (zonas CRLF de App.cpp) + 0 ADD — todos los hunks de App.cpp caen íntegros en la zona CRLF.
- App.cpp: **5117 líneas/1874 CRs → 5120/1857** (−17 CR = los 17 reemplazos CRLF→LF, +0 ADD-CR, +3 líneas netas == numstat +20/−17). Los 17 DEL todos CRLF; ninguna ADD termina en CR → cada reemplazo de CRLF es por construcción CRLF→LF.
- Resto 7 ficheros del delta: CR 0→0 (LF-100 %, nuevos incluidos).

## 5. Barrera A/B clean-first — VERDE (FASE 2 offline total)

- Espejo en worktrees A=`559cdbb3` / B=`779d21b3`; builds limpios **57 TUs + glad + LINK × 2, 0 errores** (57 = 49 src + 5 imgui + 2 backends + stub; el "+1" vs 56 del 010 es ProviderStatus.cpp).
- **Warnings 12/12, delta +0/−0** (los 12 que verifica GLM, confirmados uno a uno: 7 de App.cpp —format %o/%s/conversion/unused— + Dias truncation + Esa + 2 GloTec + IrtamCoeffAdapter P4 `%02d`; **LgdcTrace 0** — el buf[64] retiró la format-truncation adjudicada en el veredicto 010, con lo que el baseline volvió a 12 y la cifra "12" de la partición 065 y de la nota es CORRECTA). Warnings de compilación de tests: +0/−0.
- **ctest 21/21 × 2** (0 FAIL): state **76→78** (diff = exactamente el par de borde declarado + el re-rol de 96 h + el flip estructural, nada más), adapter **21==21** (solo la línea "384→1536 targets" cambió), irtamc_cache **32==32** (solo "cap 384" y "384+3 kept"), **18 salidas byte-idénticas A==B** (hop 18, m2_sun 4, getbest 58, kc2g_parse 135, kc2g_hist 15, kc2g_cache 21, model 40, d_region 41, hf 160, tec 29, sdo_proj 35, sdo_adapter 17, irtam_cache 37, coeff 43, gate 19, **grid_eval 37/37 con oráculo local GLM** — Muse corrió 13 local, mismo test con más cobertura —, lgdc 9, provider 19).
- **Cero consultas vivas CUMPLIDO**: el exe se enlazó pero NO se ejecutó con este árbol — ni MUSE ni GLM (presupuesto FASE 2 = 0, agotado exactamente).

## 6. Observaciones no-bloqueantes (3) + erratum de partición

1. **Comentario rancio** `IrtamState.cpp:211` "// IRTAM: ventana [now-96h, now-72h]" — preexistente (idéntico en la base), NO estaba en los pines taxativos de 065 (los pines eran los literales :213, no el comentario sobre él); tras el fold contradice al clamp 604800 que tiene debajo. Cero impacto funcional. Catalogado para el próximo ciclo que toque IrtamState.cpp o un barrido de comentarios.
2. **Erratum de la partición 065 (GLM)**: el censo "345600 src 5→0" subcontó la base — real: **8 apariciones** (6 literales de código: 4 .cpp + const .h + App:4827; + 2 comentarios .h). La nota 066 heredó el "5→0". El objetivo del fold (== 0) es EXACTO y el cierre queda firme; el 5 era un subconteo de población, no un defecto del paquete.
3. **Lecturas de censo de la nota 066** (ambigüedad de etiquetado, lección 66-gaps reforzada): "zoneForAge 11" == población **BASE** src+tests (3+8; el fold da 13 por el par nuevo DECLARADO); "259200 ×4+1" == subconjunto de patrón (raw src = 9; A==B intacto); "131 pasos" == contabilidad de pasos del instrumento MUSE (el de GLM cuenta 57 TUs + glad + LINK); "grid_eval 13 local" vs 37 con oráculo — mismo binario, el oráculo está en el sandbox GLM. **Prescripción**: las notas de drops futuros deben nombrar, para cada estadística, población (base vs fold) y patrón exacto.
4. Errata de método GLM propia de esta sesión (declarada): 3 bugs propios corregidos en barrera/verificación antes de concluir — modo texto de subprocess colapsaba \r\n→\n en el análisis EOL (rehecho en bytes), awk del join de conteos desplazaba columnas B (corregido), wiring de compilación de grid_eval desactualizado vs era tecext (faltaban -Ilibs/glad/include + GLMINC; el CMakeLists es la fuente canónica del wiring). Ninguno afectó el paquete; lección: barreras de eras nuevas regeneran el wiring desde CMakeLists, no desde el script de la era anterior.

## 7. Estado del ciclo y siguiente paso

- **OPCIÓN B FASE 2 CERRADA** con el árbol `779d21b3` (tag `opcionb-folded`, verificado contra su árbol). El árbol contiene la ventana de 168 h completa, átomo coherente, offline total.
- **FASE 3 (backfill 1536 req + premiere en vivo) = ciclo propio** a **aprobación EXPLÍCITA de tráfico de David** — la frontera FASE 2/FASE 3 es el tráfico: cualquier lanzamiento del binario nuevo dispara el backfill. Con la reserva de serie ya liberada (063 §6), el presupuesto de FASE 3 se fijará en la nota de apertura de ese ciclo.
- Ledger: Q2 CERRADA (058→063) · Opción B F1 CERRADA · **F2 CERRADA (066/067)** · F3 a señal de David · O3/techo duro/kStaleSec cerrados · O-030a aparcado · erratum 059 + errata 062 + erratum censo 065 (§6.2) registrados. Las 2 inconsistencias de escala documentales (tabla §3 "+90 min" vs "+1.5 h"; kStaleSec 270000/75 h vs fórmula 72.5 h) SIGUEN pendientes — verificado esta sesión que **no viven en el árbol** (0 apariciones de kStaleSec/270000/261000 en el fold): son ítems de documento/protocolo sin interacción con el código plegado; se adjudicarán en sus ciclos.
- Cadena de espejo: `559cdbb3` (o3-folded) → `779d21b3` (opcionb-folded). Scripts persistidos: `opcb066_verify.py` + `opcb066_barrier.sh` (fases A/B/compare); logs y warnings A/B en `scratch-opcb066/`.
