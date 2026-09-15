# 010 — Veredicto del fold: ciclo traza (log stderr del tráfico LGDC, solo-log)

**APROBACIÓN.** El drop 010 (ciclo traza, 1º del backlog post-sello) queda
plegado, verificado y anclado como `lgdctrace-folded` (espejo ae88923 →
tree `a2616f7780942f53b9374cb5d8eed27abf494a80`, padre 7df46ff =
`mirtamf2-sealed`/03bcd8b4). El sello M-IRTAM-F2 no se toca: este ciclo
vive sobre el árbol sellado, exactamente como exige la disciplina S2.

## 1. Custodia del delta

- `traza010delta.txt`: sha256 `6414DBEA8295D7639DA81E478887AD892C249FE1CCE23787FABA3A693EFC23C9`
  == anunciado, 15.416 B exactos, blob 785da799 == disco. `From 0319d3e`
  limpio, sin BOM.
- EOL forense: 53/53 CRs, todos en hunks de zonas CRLF probadas — CMakeLists
  30 (21 ctx + 7 add + 2 del) + GiroAdapter 23 (12 ctx + 9 add + 2 del);
  IrtamCoeffAdapter.cpp (fichero LF) recibe +20 líneas sin CR. Crecimiento
  neto post-fold exacto: Giro 281→288, CMake 137→142, IrtamCoeffAdapter 0→0.
  Nuevos (LgdcTrace.cpp/.h, test) LF-100%. Sin regresión EOL.
- Fold: `git apply --check` OK → `git am --keep-cr` (warning quoted-CRLF
  benigno) → ae88923. **Tree gate EXACTO**: `a2616f77` == publicado; padre
  == sellado (03bcd8b4). La custodia de contenido queda cerrada por árbol.

## 2. Diffstat: titular vs numstat

El diffstat real sobre el árbol sellado es **6 ficheros, 204+/5-** (numstat:
CMakeLists 8/3, GiroAdapter 9/2, IrtamCoeffAdapter +20, LgdcTrace.cpp +71,
LgdcTrace.h +35, test +61). La nota anuncia "204+/8-". El +204 es exacto;
el "-8" es un **artefacto de conteo**: 5 eliminaciones reales + 3 cabeceras
`--- a/...` contadas como líneas menos. El numstat por fichero de la propia
nota es EXACTO y suma 204+/5- — el titular lo contradice. Misma clase que la
lección "66 gaps" de esta mañana: estadística sobre población mal delimitada.
No bloqueante (el tree gate cierra el contenido byte-exacto); registrado como
constancia para el protocolo de notas: **el diffstat titular debe salir de
`git diff --shortstat` del commit, no de conteos manuales de líneas del delta**.

## 3. Contrato solo-log (verificado por lectura de código plegado)

- **Módulo nuevo `LgdcTrace`**: formato + sumidero, solo std
  (string/cstdio/ctime/functional/mutex). Línea
  `[LGDC <ISO8601-ms-UTC>] <categoria> <detalle>`. `formatIsoMs` puro
  (gmtime_r/gmtime_s + snprintf); `trace` con mutex interno y
  `setSink`/`setEnabled` para test. Sin curl/GL/App/URLs (G6 por grep, 0
  literales). G8: 0 primitivas de espera.
- **7 llamadas en 4 sitios**, como declara la nota:
  1. `launch catalog` — GiroAdapter:118. **Hoist correcto**: el reloj se lee
     UNA vez (`catMs` :115), el gate registra ese valor (:117) y la traza
     sale inmediatamente después. Cero doble lectura, cero cambio de
     comportamiento en el camino del catálogo.
  2. `launch getbest <code>` — GiroAdapter:350. Reutiliza el `now` del CAS
     M4 (el valor ya existía; el pacing M4 no cambia: mismo gap-check, mismo
     CAS, mismo break).
  3. `gate-consult deny` + `ms-since-last` — IrtamCoeffAdapter:138. La
     decisión (`canLaunchGambit(wallMs())` :136) se toma ANTES y sin cambios;
     la lectura extra del reloj para `msSinceLastLaunch` ocurre SOLO en la
     rama deny y alimenta exclusivamente el string display — `msSinceLast`
     es load atómico puro (LgdcPacing.cpp verificado, blobs intactos).
  4. `launch/result gambit` — IrtamCoeffAdapter:178/180 (éxito) y :148/:159
     (fail red/pre-gate y fail estructural). El registro del gate sigue
     ocurriendo dentro de `fetchURL` (:101, P3 sin tocar): orden
     consult→registro→perform intacto.
- **Intangibles 7/7 por blob**: LgdcPacing.h 95fe46f3 / .cpp c18e17c4 (el
  gate P3, intocado), App.cpp 229fce1e (cero desplazamiento de anclas — el
  ciclo no toca App), IrtamGridEval.cpp bb5ad4e0, IrtamState.cpp/.h
  bbdc9f14/193d1a8, IrtamCoeffAdapter.h 9abc376e. Pre-imágenes == blobs
  sellados (8df39a26/d50f1bca/66d53ede). Wiring CMake espejado: 4 menciones
  LgdcTrace.cpp (SOURCES + getbest + irtam_adapter + test nuevo).
- **Anclas App.cpp 8/8 + E9 2969** sin desplazamiento (blob idéntico). Valor
  adjudicado 1551 para mergeKc2g-applyCL (colisión de tablas, veredicto 008 §4).

## 4. Barrera

- **56 TUs + LINK** (55 + LgdcTrace.cpp), 0 errores.
- **Warnings: 13 únicas = baseline 12 + 1 nueva ADJUDICADA**. La nueva es
  `-Wformat-truncation` en LgdcTrace.cpp:42 (GCC-Linux): análisis
  conservativo de rangos sobre el `snprintf` de `formatIsoMs` (peor caso
  teórico 77 B en buf[32]). **No es defecto**: snprintf trunca con seguridad
  y NUL garantizado; la truncación real requeriría año >9999 (epoch-ms fuera
  de todo alcance de `system_clock::now()`); la salida realista es 24+1 ≤ 32.
  Misma clase que la baseline de P4 (IrtamCoeffAdapter `%02d`, adjudicada
  cross-toolchain non-defecto en el veredicto 005). El "warnings +0" de la
  nota es cierto en la toolchain MSYS2/UCRT64 de MUSE — este sandbox GCC-Linux
  la dispara. Delta vs build 008: +1/-0 exacto (laadvertida), 0 de otra clase.
- **20/20 tests**: heredados intactos (hop, m2_sun, getbest_parse 47 con
  wiring nuevo, kc2g_parse/history/cache, model_foF2, d_region, hf_circuit
  160, tec_cache, sdo_projection/adapter, irtam_cache 37, coeff_parse 43,
  irtamc_cache 28, irtamc_gate 19 — LgdcPacing intacto, irtam_adapter 19 con
  wiring nuevo, grid_eval 24 con oráculo ASC activo, irtam_state 11) +
  **test_lgdc_trace 9/9** (época 0, fecha conocida 2026-09-15T01:10:39.123Z,
  forma ISO, sumidero, prefijo, categoría, sin-URLs con literal ensamblado en
  runtime, disable, re-enable). Compilación del test: 1 format-truncation de
  la clase adjudicada, 0 de otra.
- **Lecciones de barrera (mías, documentadas)**: (a) la normalización de
  warnings con prefijo `[TU##]` rompía la comparación cross-build al
  insertarse LgdcTrace y renumerarse los TUs posteriores (+2/-1 espurio en
  la primera ejecución) — corregido a normalización sin prefijo; (b) ancla
  applyCL arrastraba el valor rancio 1377 — corregido al 1551 adjudicado.

## 5. Observación semántica para consumidores de la traza (no bloqueante)

Las líneas `launch gambit` se emiten en **compleción** (tras fetch+parse,
junto a `result ok`), no en el instante de lanzamiento — el `recordLaunch`
vive dentro de `fetchURL` (:101) y el punto de emisión con contexto
param/epoch es el éxito de `fetchOnce`. Además son asimétricas: un fetch
fallido emite `result fail` SIN línea `launch` previa. Consecuencias para
cualquier futuro análisis tipo G10 sobre esta traza: (1) los conteos de
lanzamientos gambit deben hacerse sobre las líneas `result` (ok+fail = total;
`launch` = solo éxitos); (2) los timestamps de `launch gambit` son instantes
de completitud — la aritmética de gaps debe aplicar el piso por fetch
(1-5 s, precedente drop 009). La frase de la nota "instante de registro leído
del gate" es imprecisa para este sitio: la estampa sale del reloj propio de
`trace()`, no de una lectura del gate. Todo declarado honestamente en los
comentarios del código ("el record ocurrió dentro de fetchURL"); se registra
aquí para que ningún consumidor futuro malinterprete las estampas. Si algún
día se quiere estampa de lanzamiento exacta, es ciclo nuevo (mover la
emisión dentro de `fetchURL` o pasarle contexto) — no exigido.

## 6. Ruling

- **APROBACIÓN** del fold del ciclo traza. Tag anotado `lgdctrace-folded`
  (ae88923, tree a2616f77) con registro completo: custodia, barrier,
  observaciones, lecciones de script.
- El sello `mirtamf2-sealed` permanece único y permanente (ruling S2); la
  cadena de este ciclo es: 03bcd8b4 (sellado) → a2616f77 (traza) — 1/1.
- Nice-to-have registrado (no exigido): `buf[64]` en `formatIsoMs`
  silenciaría el GCC-Linux sin tocar semántica, la próxima vez que el ciclo
  toque LgdcTrace.cpp por cualquier motivo.
- Backlog restante sin cambios: B0/B1, `M-irtam-replay`. Con esta
  instrumentación en el árbol, un futuro cierre-en-vivo tipo G10 ya no
  dependerá de stdout void: las denegaciones del gate, los lanzamientos y
  los resultados quedarán en stderr capturable.
