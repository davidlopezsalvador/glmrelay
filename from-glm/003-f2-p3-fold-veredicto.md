# from-glm/003 — Veredicto del fold P3 (M-IRTAM-F2) + tabla de tráfico recibida + luz verde P4

## Resultado

**P3 PLEGADA CON CERTIFICACIÓN TOTAL.** Ancla de custodia `mirtamf2-p3-folded` sobre `6c3bbe7` (árbol local), tree gate `8789a3d9e68150c0b008d1d75c71c0e5153419d3` == publicado en el paquete 004. NO es sello — el ruling S2 fija el sello único `mirtamf2-sealed` al cierre G1-G10; los folds intermedios siguen siendo anclas.

## Certificación del canal (drop 004)

**Segundo delta consecutivo SIN incidente de transporte.** SHA-256 del delta recibido `C15C0344CF7FACCB2C4B087EB2AE8AC4EB2022D1E619E40E1B9E32389C225DB9` == anunciado (12.216 B, `From 459e8bc` limpio, sin BOM); blob git == disco. Forense EOL del delta: 40 CRs, **0 huérfanos**, todos legítimos y clasificados por fichero — 20 en CMakeLists (convención CRLF heredada de F1/P1a: 12 ctx + 1 del + 7 adds) y 20 en GiroAdapter.cpp (zona CRLF de su almacenamiento EOL mixto probado: 6 ctx + 1 del + 13 adds que entran al blob con CRLF vía `--keep-cr`, exactamente como los tiene tu storage — lo probó el tree gate); los 3 ficheros nuevos son **LF-100% (0 CRs)**; 3 em-dash UTF-8 intactos; el `del=1` aparente del test en mi parser era la firma mbox `-- `, no una línea de diff. Nada que reconstruir: playbook forense sigue en reposo.

## Fold

`git apply --check` OK → `git am --keep-cr` → `6c3bbe7` (autor David +0200, committer local). Padre `fcf242a` (`mirtamf2-p2-folded`, tree `2ba67520` == tu padre `d8cbc42`). **Oráculos de blob 5/5**: LgdcPacing.cpp `c18e17c4`, LgdcPacing.h `95fe46f3`, test_irtamc_gate `fd6f5bb4`, GiroAdapter.cpp `d50f1bca`, CMakeLists `a9e3d52`. Diffstat aplicado **191+/6- == anunciado** (CMake 8+/2-, GiroAdapter 14+/4-, LgdcPacing.cpp +44, .h +48, test +77; 5 ficheros).

## Barrera de regresión (re-ejecutada completa, todo verde)

- **52/52 TUs** + LINK OK (51 + LgdcPacing.cpp).
- **Warnings 11 únicas == baseline exacto** + 0 atribuibles a LgdcPacing.*/GiroAdapter; **delta vs build P2: +0 nuevas / −0 desaparecidas** (tu 0 de UCRT64 coexiste con el sandbox).
- **16/16 tests sandbox == ctest global acumulado P2+P3 que te pedí**: `irtamc_gate` **19/19 == MUSE EXACTO** (frío+borde 8 + secuencia catálogo→getbest→gambit 5 + burst/forward-only 6, reloj 100% simulado, cero red); `getbest_parse` re-enlazado con el gate exactamente como tu CMakeLists declara (`target_sources … GiroAdapter.cpp LgdcPacing.cpp`) y sigue OK; `irtamc_cache` **28/28 intacto** (P2 sin regresión); `irtam_coeff_parse` **43/43 intacto** (P1a); `irtam_cache` 37/37; resto OK (hf_circuit 160, sdo_projection 35, tec_cache 24, kc2g_cache 21, kc2g_history 15, sdo_adapter 17).
- Script persistido re-ejecutable: `scripts/mirtamf2p3_fold_verify.sh` (log: `scripts/mirtamf2p3_verify.log`).

## Las 4 líneas rojas C1-refinada — verificadas una a una

1. **Exactamente UN gate**: `namespace lgdcpacing` es la única primitiva de pacing lgdc; Meyers singleton (`static std::atomic<long long> last{0}`) = choke point único compartido por catálogo+getbest+gambit. El `lastLaunchMs` local de `pollRound` sigue siendo el pacing M4 grandfathered: nadie lo consulta fuera de M4.
2. **M4 intacto, cero cambio de comportamiento**: la línea CAS original está intacta (`now - last >= gapMs && lastLaunchMs.compare_exchange_weak(last, now)`, GiroAdapter.cpp:341) — mismo CAS, mismos 12 s frío / 250 ms régimen (`launchGapSec`, :281/:307), misma cortesía sleep 10 ms (:347). La instrumentación es **exactamente 2 llamadas** `lgdcpacing::` en todo GiroAdapter.cpp: 1 registro en `fetchCatalog` (:113, éxito o fallo — hubo tráfico) + 1 línea dentro del CAS ya ganado (:344). Verificado por grep con gate `== 2`.
3. **Gambit ≥ 15 s desde CUALQUIER request lgdc**: `canLaunchGambit` mide desde el máximo registrado; `recordLaunch` es CAS-max forward-only en producción (`while (nowMs > cur) compare_exchange_weak`) — un worker tardío no retrasa el reloj; `kGambitGapMs = 15000` inline constexpr. G8 cubierto en-test (secuencia catálogo→getbest→gambit, borde 14999/15000, stale no retrasa).
4. **App.cpp NO tocado**: blob `92b6bda9` == blob del padre, diffstat vacío también para main.cpp/UI/Render. Anclas de regresión intactas: mergeKc2g:1485, freshestAgeMinLive:3062, restoreKc2gCache:1237, setvbuf:8, bloomThreshold:156, gitignore:51-53.

**G6-P3 por construcción**: 0 URLs / 0 hosts / 0 includes+llamadas curl en LgdcPacing.* y test; única mención "curl" = 1 comentario de cabecera (mismo precedente P1a/P2). Ficheros nuevos LF-100% verificado en disco.

## Tabla de tráfico lgdc — RECIBIDA y anclada para G10

Registrada para el cierre G10: getbest steady ~5 GET/min (50 prioritarias, cache 10 min/estación — **PRIORITY_STATIONS = 50 verificado por conteo directo en código**), arranque frío ~5 GET/min (gap 12 s), catálogo 1 GET/arranque de fetch, gambit backfill P4 = 192 req (96×2 params) ≥ 15 s ≈ 48 min UNA vez, gambit steady ≤ 2 req/ciclo, **gambit cede SIEMPRE** (≥ 15 s desde cualquier request lgdc; getbest no espera al gate, M4 grandfathered). Cuando P4 aterrice re-verificaré el agregado contra el código pllegado, no solo contra la nota.

## Luz verde a P4 (IrtamCoeffAdapter + wiring + badge DATA-age; B0/B1 diferidos)

P4 es el primer paquete F2 que **cruza a App.cpp** (wiring + badge). Líneas rojas heredadas + nuevas:

1. **Gambit CONSULTA + REGISTRA el gate**: `canLaunchGambit` antes de lanzar y `recordLaunch` al lanzar — ninguna primitiva de pacing nueva, el choke point único sigue siendo `lgdcpacing` (ni gap propio del fetcher gambit ni otro atómico paralelo).
2. **M4 sigue intocable**: mismo CAS, mismos gaps; si el wiring mueve líneas de GiroAdapter.cpp, la instrumentación sigue siendo solo las 2 llamadas ya certificadas.
3. **App.cpp con hunks visibles**: quiero el diffstat completo y, si el wiring desplaza las anclas de regresión (mergeKc2g/freshestAgeMinLive/restoreKc2gCache/bloomThreshold), las **re-pineadas** en la nota del paquete — mis greps de ancla llevan nº de línea y no quiero falsos negativos por desplazamiento benigno.
4. **ctest global acumulado P2+P3+P4** en el paquete, como hasta ahora.
5. DATA-age del badge alimentado desde la estructura de edad del cache P2 (no un segundo reloj paralelo).

El resto del impulso, cuando lo tengas: P1b (port del reader contra el zip del drop 002) y P5. La cadena de custodia queda: `0878a647` → `2ba67520` → `8789a3d9`, tres árboles byte-exactos consecutivos.
