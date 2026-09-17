# Veredicto GLM — Drop 028 (fold): replay ESCALONADO — bracket entregado + render-lerp + memo

Emisor: GLM (árbitro) · Base de plegado: espejo scratch-m12-repo @ tree 8355e8e7 (fold 027) · Drop: 751c14b · Relay: ef1718c..751c14b · Commit MUSE: 6a2cbf0 · Tree anunciado: 32a902c57fd1dd71e9762cccfb119efcda77b4a8 · Todas las líneas por grep final (lección 024).

## 0. Custodia y estructura del delta (serie mbox)

- Delta `to-glm/files/replay028delta.txt`: 31.245 B exactos, sha256 `c3cbaedb32491ee0addb62f4a8777c3a90bff0446993d6fed73253e6ef837583` == anunciado (C3CBAEDB). Blob 5a238673 == disco == árbol (751c14b). Sin BOM. TRIPLE de recepción: SSH == HTTPS == local == 751c14b.
- **El delta es una SERIE mbox de 2 parches**: 1/2 = «M-irtam-replay-027: sol al cursor» (el drop 027, From c2e3502) y 2/2 = «M-irtam-replay-028: bracket entregado + render-lerp + memo scan/TOV» (From 6a2cbf0). La serie es autocontenida desde el estado 025: la aplica quien esté en 7206b4f sin haber plegado el 027.
- **Adjudicación del «padre 7206b4f» de la nota**: describe la base de la SERIE. El padre git de 6a2cbf0 es c2e3502 (027), probado triplemente: (a) cadena de blobs index del propio delta 838e83b (025) → 681f4f1 (027) → 60855c1 (028); (b) el fold directo del parche 2/2 sobre el fold 027 cierra el tree gate; (c) la serie completa desde 952714ba reproduce {8355e8e7, 32a902c5}. Notación, no discrepancia de contenido.

## 1. Metodología de plegado (lección de método incluida)

- **Serie completa** (determinismo ×2 de AMBOS árboles por vía independiente): `am --keep-cr` del mbox íntegro sobre 952714ba en rama temporal → 2 commits, sin fuzz ni offsets, árboles {8355e8e7, 32a902c5} == {fold 027, gate 028}.
- **Vía principal**: extracción BYTE-EXACTA del parche 2/2 (`tail` desde la línea `From 6a2cbf0`; 29.843 B, 460 CRs) → `git apply --check` OK → `git am --keep-cr` sin fuzz → **tree gate 32a902c57fd1dd71e9762cccfb119efcda77b4a8 EXACTO**.
- **Lección de método registrada**: `git mailsplit` NO sirve para extraer parches de estos deltas — normaliza CRLF→LF (strbuf_getline): 0001 quedó en 0 CRs vs 13 del original, y el apply del 0002 fallaba en App.cpp:256 por pre-imágenes sin CR. La extracción para plegar debe ser byte-exacta (tail/sed sobre el original); mailsplit queda solo como contador de mensajes. Tercera iteración de método del arbitro en este ciclo (tras includes grid_eval era-B0B1 recuperada de O4-024 y el pin de población-comentario), ninguna toca el código plegado.

## 2. Diffstat y scope taxativo

- **5 files, 335+/146−** == shortstat == numstat por fichero EXACTO: App.cpp 240/145, App.h 14/1, IrtamState.cpp 33/0, IrtamState.h 18/0, test_irtam_state 30/0. Lista taxativa del ruling 026 respetada (los 5 y solo los 5).

## 3. Las 3 piezas por lectura dirigida (contrato verificado)

### 3.1 Bracket entregado (pieza 1)

- `sampleIrtamPairAt` y `consumeIrtamSample` **ELIMINADOS**: 0 ocurrencias en App.cpp y App.h.
- `sampleIrtamBracketWorker` (def :776 + llamada :1543 + referencia en comentario :756): el worker resuelve el bracket sobre el índice memoizado y `irtamstate::pairBracketTovs` (puro, NUEVO en IrtamState, ver 3.4) y guarda bajo lock `{gA0,gA1,gB0,gB1,t0,t1,clamped}` — los 4 endpoints PUROS a cada TOV del bracket + t0/t1; se saltan los 2 lerps del worker (menos trabajo, como exigía el 026 §1.3). `evalTovGrid` (:747-766) carga por fichero (`irtamccache::loadBucket` :760) + parse + isStandardBasis + evalGrid a la hora del TOV — misma convención de ryear (`pb.clamped ? pb.t0 : epoch`).
- El thread de init() queda reducido a llamar al worker y limpiar `irtamSampleBusy`; a fallo conserva la muestra anterior. O2-026 resuelto por diseño: la semántica pasa a «último bracket válido» y el render lerpa al cursor DENTRO de él — documentado en los comentarios del propio código.

### 3.2 Render-lerp por cursor (pieza 2)

- `lerpBracketGrid` (def :866 + 4 usos): f = clamp((epoch−t0)/(t1−t0), 0, 1) por frame sobre el bracket entregado, al coste de TEC (lerpValues de 2×2070 floats, ~µs, patrón :1854). **Las 4 entradas**: consume 8/9 **:2041**, consume 10/11 **:2065** (update), applyCL 8/9 **:3002**, applyCL 10/11 **:3033** — anclas de la nota EXACTAS las 4.
- Clamp-color B0 display-only **POST-lerp** (:2075 update, :3046 applyCL) — como exigía el 026 («se aplica post-lerp»).
- D1 heredado: `consumeIrtamBracket` lee el cursor miembro (`impl->replayEpoch` :858/:862 — slot por floor(replayEpoch/900)). D2 heredado: else-espejo de live en las 4 vías (6 `getIrtam()` == pre).
- Badge: nombra el TOV del bracket **más cercano al cursor** (:3529 `(e - s.t0 < s.t1 - e) ? s.t0 : s.t1`, con guarda `s.t1 > s.t0`).

### 3.3 Memo App-level (pieza 3)

- `IrtamScanMemo` (:299): índice {param, tovEpoch, path} invalidado por mtime del directorio (`last_write_time`, 2 usos); ante cualquier duda (error, vacío) corre `loadCached` completo — heal/prune preservados por delegación.
- `IrtamTovGridMemo` (:321): rejillas por (param,tov) con **FIFO cap 16** (kCap :305, ~132 KB) — los endpoints compartidos entre brackets consecutivos se reutilizan (el bracket siguiente comparte t1→t0).
- **Solo-worker, sin locks**: ambas estructuras se tocan únicamente dentro de `sampleIrtamBracketWorker`. `IrtamCoeffCache` INTOCIBLE (blob idéntico, §4).

### 3.4 IrtamState: pureza y tests

- `pairBracketTovs` en IrtamState.cpp/.h (+33/+18): función PURA — mate-check de TOVs comunes del par (misma convención que commonTovEpoch), sort/unique, reutiliza `bracketTovs` (intocada) y mapea a {t0,t1,f,clamped}. IrtamState solo se EXTIENDE (0 deletions).
- test_irtam_state +30: 6 checks nuevos → **state 44→50** (medio f=0.5 exacto, bajo-rango clamp t0, sobre-rango clamp t1, par sin intersección = empty, huérfano sin mate ignorado, índice vacío = empty) — la aceptación «barrera state +k (bracket/f/clamp/roundtrip)» CUMPLIDA.

## 4. Intangibles

- **Publish F/H + B0xB1 + bucle fetch**: zona pre[825,1453] == post[909,1537] — **629 líneas BYTE-IDÉNTICAS** (shift +84, cero hunks). Gate F/H :1411 (`tovF != tovH`) y commonTov :1456 intactos.
- **12/12 blobs idénticos** pre→post: LgdcPacing.h/.cpp, IrtamCoeffAdapter.h/.cpp, IrtamCoeffCache.h/.cpp, IrtamCoeffParse.cpp, IrtamGridEval.cpp/.h, GiroAdapter.cpp/.h, CMakeLists.txt — «Publish/fetch/cache/parse/eval/M4 intactos (cero hunks)» verificado por blob.
- G6: 0 URLs/curl en líneas añadidas. G8: 0 esperas nuevas (sleep_for 5 == pre: backfill ×2 + fetch-retry + worker-idle + resize; el render-path sigue wait-free salvo handoff corto).
- O1-026 (radio, vars 5-7 :2027/:2125/:2987 leyendo el local): NO tocado — solo cambió el comentario de Fase 5 (:2011-2014, consumeIrtamSample→consumeIrtamBracket). Pendiente declarado, conforme a la partición.

## 5. Barrera (builds ×2 byte-exactos)

- Baseline A (952714ba, re-establecido por construcción tras el incidente #2) → F027 → **F028 y F028b** (dos builds completos del árbol final): warnings_normalized.txt y state.log **BYTE-EXACTOS entre F028 y F028b**.
- 56 TUs + LINK; **warnings 13, +0/−0** vs baseline A (el «1 param sin usar detectado y eliminado antes del commit» de la nota se confirma: clases idénticas al baseline).
- **20/20 tests**: state **50/50** (44 + 6 bracket, ×2 determinista), heredados en sus pins exactos: irtam_cache 37, coeff_parse 43, irtamc_cache 32, gate 19 (LgdcPacing intacto), adapter 21, grid_eval **37 con oráculos ASC vivos** (6.1034 / 261.0765 / 3.3639), trace 9.

## 6. EOL forense

- Población de la nota reconciliada y **EXACTA**: 460 CRs en la sección App.cpp del parche 2/2 + 13 CRs en la sección App.cpp del parche 1/2 (el drop 027) = **473** — «todas las líneas del delta en las secciones App.cpp». Secciones de App.h/IrtamState.cpp/IrtamState.h/test: **0 CRs** (resto LF, como declara la nota).
- Censo post-fold: App.cpp 4.837 líneas / 1.773 CRs (4.742/1.664 +95/+109 netos); IrtamState.cpp 214, IrtamState.h 112, test 236, App.h 67 — todos LF-100% (los añadidos de IrtamState/App.h/test son LF, correcto para ficheros LF).

## 7. Anclas (grep final)

- **6/6 EXACTAS**: gate F/H :1411, commonTov :1456, consume 8/9 :2041, consume 10/11 :2065, applyCL 8/9 :3002, applyCL 10/11 :3033.
- **OBSERVACIÓN (etiquetas desordenadas en las 4 últimas de la nota)**: los NÚMEROS son líneas reales del árbol final, pero corresponden a: :4483 = `DATA %s LIVE (stale %.0fm)`, :4486 = `DATA %s LIVE (+%.0fs)` (este sí es «DATA»), :4646 = `SliderFloat("hours back"...)`, :4673 = `TextDisabled("Zone: %s"...)`. Los pines reales del cluster TimeBar: etiqueta **Zone: :4673**, **busy** (load, stale) **:4692**, lector **%H:%M de replayEpoch :4659**, DATA replay (stale) :4700/:4704, DATA sin dato :4710. Misma familia que la lección de etiquetado de poblaciones (cierre 010/015): al lado del número, el patrón exacto. No bloqueante — contenido intacto, 6/6 primeras exactas, y las 4 líneas citadas existen todas.

## 8. Re-medición analítica (aceptación R2-026) y expectativa de fluidez

- La nota declara: miss antes ≈ 0,5-1 s en render (021); miss ahora = memo-hit ~150-250 ms en worker + render ~µs. **Verificado por lectura**: el coste dominante del 021 (loadCached re-escaneando/validando hasta 384 ficheros POR MUESTRA) queda memoizado por mtime (una vez por estado del directorio); cada endpoint (param,tov) se evalúa una vez con FIFO-16; el render es lerp puro por frame. La cifra 150-250 ms es la estimación MUSE del camino de miss completo (load+parse+eval de 4 buckets vía loadBucket) — plausible por construcción; la **prueba VIVA** del presupuesto (<250 ms, var 8, speed 2, 30 s) queda para la premiere 029, como exige la aceptación.
- Geometría del 026 §1.2-1.3 cerrada: la imagen interpola DENTRO del bracket que envuelve al cursor cada frame — el escalón desaparece mientras el bracket esté fresco. A 2x (TOV real 0,375 s) la fluidez exige latencia < 0,375 s: exactamente lo que el memo ataca. A 8x, degradación honesta y declarada (TOV real 94 ms).

## 9. Conclusión

- **APROBACIÓN.** Tree gate 32a902c5 exacto (con determinismo ×2 por vía doble: serie completa + parche 2/2), las 3 piezas del ruling 026 verificadas por lectura y por barrera (state 50/50 con los 6 tests de bracket; eliminaciones estructurales confirmadas; memo solo-worker con IrtamCoeffCache intacto; publish/B0xB1 byte-idénticos; G6/G8 limpios; EOL 473 cuadrado), herencia 024/025/027 intacta (D1/D2, worker dueño único, consume-only, clamp-color post-lerp, badge TOV cercano). Sin tag nuevo (política R2; el tag del ciclo permanece en ac9d95b3 y el sello final es opción de David).
- **029 premiere desbloqueada** con expectativas explícitas: (1) sol fluido en zonas IRTAM/muerta (027); (2) imagen IRTAM fluida a speed 2 con badge TOV avanzando por bracket (028); (3) re-medición viva del miss post-memo (tirones al mover el slider rápido); (4) bordes O1-025 (TEC ~80 h = stale; T−24 h exacto = fresco); (5) a 8x degradación honesta declarada. Tras su veredicto, CICLO M-irtam-replay CERRADO.
