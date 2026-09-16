# 024 — VEREDICTO DEL FOLD M-irtam-replay-PERF (ruling R2): worker async + dt clamp + render consume-only — APROBADO

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Decisor final: David
Base: ac9d95b3 (espejo 0f2a084; tag mirtamreplay-a-folded PERMANECE ahí, política R2) · Canal: relay
52f9c61..c2164b3 (fetch dual SSH+HTTPS, ff limpio, TRIPLE == c2164b3)

## 1. Custodia (VERIFICADA, sin objeciones)

- Delta `to-glm/files/replay024delta.txt`: 17.969 B exactos, sha256
  `9881CECEA648F14F4284A5753A1FBA589EBA222AD9E06E2AECCD918A11E4977B` ==
  anunciado; `From 70f4bd4` limpio, sin BOM; blob `2ba27119` == disco ==
  árbol (@c2164b3).
- Nota `to-glm/024-replay-perf-paquete.md`: blob `68e27fb1` == disco ==
  árbol; 21 líneas, sha256 3ca44faa… re-verificada.
- Rango 52f9c61..c2164b3 = 1 commit (nota + delta, 381+/0-), cero código
  en el relay. Canal íntegro.

## 2. Fold y tree gate (CERRADO)

- `git apply --check` limpio → `git am --keep-cr` (warning quoted-CRLF
  benigno, costumbre de la casa) sobre 0f2a084, cuyo árbol ac9d95b3 ==
  padre fd2def0 de MUSE por identidad certificada en el 020.
- Commit espejo `68c1d22`, autoría MUSE preservada (David Lopez Salvador,
  2026-09-16 18:22:18 +0200, subject íntegro).
- TREE GATE: árbol `239bf4a375af44242c290c003d9535eed9bb5517` == anunciado
  EXACTO. Determinismo ×2: segunda reproducción `f0a689f` → mismo árbol.
- Numstat EXACTO: App.cpp 144/95 + App.h 4/0 = 148+/95- (titular
  --shortstat de la nota; lección 010 cumplida). Ficheros cambiados 2/2 ==
  scope taxativo App.cpp+App.h del ruling R2 §4. Blob App.h `f5d3ea0` ==
  post-imagen del index del delta.

## 3. Barrera (VERDE completa; scripts/replay024_fold_verify.sh persistido, logs replay024_baseline.log / replay024_post.log)

- BASELINE RE-ESTABLECIDO POST-INCIDENTE (lo prometido en la
  reconstrucción): build A sobre ac9d95b3 = 56 TUs + LINK, warnings 13
  con lista idéntica a la certificada 018-020, 20/20 con pins EXACTOS
  37/43/32/19/21/37/34/9, oráculos ASC vivos. La certificación de
  ac9d95b3 pasa de "transferencia por identidad de árbol" a "reproducida
  por construcción en este entorno".
- POST sobre 239bf4a3: 56 TUs + LINK (024 no añade TUs); warnings 13
  +0/-0 (comm A/B vacío, ni una clase nueva ni desaparecida); 20/20 con
  conteos IDÉNTICOS al baseline en los 20 tests — cableado App-level
  invisible a la barrera (misma clase que D1/D2; su defensa es la lectura
  + grep de §4 y la aceptación viva 026).

## 4. Ruling R2 punto por punto (VERIFICADO por lectura + grep sobre 239bf4a3)

1. CLAMP dt de avance: `const double advDt = dt > 0.1 ? 0.1 : (double)dt`
   (App.cpp:1813) SOLO en la expresión de avance del epoch (L1815); dt
   global intacto para el resto del frame. A 60 fps (dt≈16 ms) NO cambia
   comportamiento: muerde solo en frames parados (dt>100 ms → ≤0,27 slots
   a speed 2). El bucle miss→dt gigante→salto multi-slot→miss del hallazgo
   021 queda ESTRUCTURALMENTE roto.
2. WORKER dueño único: `irtamSampleThread` (precedentes
   irtamBackfillThread P4 / sdoKick M11), bucle for(;;) con sleep 50 ms
   que vive SOLO en el worker; `sampleIrtamPairAt` corre FUERA del mutex
   (el muestreo largo jamás bloquea el handoff del render); petición
   idempotente latest-wins {pairKind, epochSlot, epoch}; en fallo del par
   conserva la muestra anterior (ausente honesto Q2-B0B1 heredado).
3. ASERCIÓN ESTRUCTURAL: `sampleIrtamPairAt` en src/ = EXACTAMENTE 2
   ocurrencias (def App.cpp:719 + llamada del worker :1462, bloque
   [1434..1481]); cero en camino de render. `ensureSample` ELIMINADO
   (0 menciones). Los 4 consumidores render — update vars 8/9 (:1963),
   vars 10/11 (:1980), applyColorLayer F/H (:2914) y B0/B1 (:2938) —
   llaman SOLO a `consumeIrtamSample`.
4. RENDER CONSUME-ONLY: `consumeIrtamSample` (def :800, decl App.h:39) =
   guard + slot desde impl->replayEpoch, lock_guard corto, posteo
   idempotente, copia de la última muestra lista (handoff ~µs por
   construcción: mutex + 2 GridData ≈33 KB); en miss pinta lo anterior.
   Badge lee escalares bajo lock (:3429; carrera worker/render cerrada).
5. G8 REDEFINIDO (render-path wait-free): las únicas primitivas de espera
   en las añadidas del delta = 1 sleep_for (worker) + joins en
   shutdown() (irtamSampleThread.join :4674, tras el del backfill,
   patrón M0.2, antes de destruir capas/impl; break por shutdownRequested
   bajo mutex; peor caso de join = muestra en vuelo ~0,5-1 s + poll). El
   lock_guard de handoff es la única sincronización del camino de render
   (sancionada por el ruling).
6. MEMO NO APLICADO (correcto): 0 «memo» en añadidas;
   IrtamCoeffCache.cpp blob idéntico a ac9d95b3 (intangibilidad R1
   respetada). La adjudicación medir-primero es correcta: el coste
   dominante del miss es parse+eval (509 ms del test) y el memo no
   cerraría el gap; el stale honesto es el comportamiento diseñado.
   Observación: las 5 menciones «memo» preexistentes de App.cpp son
   `<memory>`/`memory_order` (substring), no memoización.

## 5. Intocibles, publish, EOL, anclas

- PUBLISH F/H y B0×B1: región de la lambda publish (2 bloques do/while)
  103 líneas pre == 103 post, sha256 `1b19b29e…` IDÉNTICO — cero hunks,
  solo desplazamiento.
- INTOCIBLES 19/19 por blob (LgdcPacing ×2, LgdcTrace ×2,
  IrtamCoeffAdapter ×2, IrtamCoeffCache, IrtamCoeffParse, IrtamGridEval,
  IrtamState ×2, IrtamCache, GiroAdapter ×2, main.cpp, CMakeLists,
  tests oráculo ×3); ficheros cambiados = EXACTAMENTE App.cpp+App.h;
  sello mirtamf2-sealed intacto (S2, 7df46ff); tag mirtamreplay-a-folded
  PERMANECE en 0f2a084/ac9d95b3 (024/025 construyen encima; veredictos
  documentan la cadena — política R2).
- EOL FORENSE: App.cpp 4651→4700 líneas (+49 = 144−95 exacto); CRs
  1571→1622 (+51 = +142−91, conservación exacta); sección App.cpp del
  delta = 292 CRs (ctx 59 + add 142 + del 91) == nota EXACTA —
  población declarada correcta (lección de etiquetado cumplida); App.h
  0 CRs (LF puro). El par -/+ aparente de la línea backfill-join
  (shutdown) = flip EOL único LF→CRLF, texto idéntico sin CR — la única
  línea «modificada» sin semántica de refactor; --keep-cr la preserva
  tal como fue autorada.
- ANCLAS: 8/9 EXACTAS vs nota (mergeKc2g def 386, gate F/H 1327,
  commonTov 1372, restore call 1579, restore def 2753, applyCL def 2855,
  freshest 3627, setvbuf main.cpp:8); contenido 9/9 byte-idéntico
  pre→post (solo desplazamientos por inserción, como declaraba la nota).

## 6. D1+D2 heredados (019) sobre la nueva forma

- D1: `consumeIrtamSample` lee `impl->replayEpoch` en 3 sitios (guard,
  slot, q.epoch del posteo) — la disciplina «cursor miembro, no local
  TEC» sobrevive al refactor; el worker muestrea el epoch posteado bajo
  mutex, nunca un local del frame. Congelado en zona solo-IRTAM: cerrado
  en 019, sigue cerrado en 024.
- D2: else espejo de 8/9 intacto (comentario ancla :1975 + estructura
  if(replayMode){consume}else{getIrtam} en las cuatro entradas).

## 7. Observaciones (no bloqueantes)

- O1 — PIN E9 ERRÓNEO EN LA NOTA: ancla E9 («IRTAM/GAMBIT (UML)»)
  anunciada en 3397; posición real en 239bf4a3 = 3339 (= 3304 + 35). El
  3397 sale de aplicar +93 (acumulado tras el hunk del worker) olvidando
  los netos −58 de los hunks 5/8/9 (ensureSample −30, applyColorLayer
  F/H −17 y B0/B1 −16). Contenido intacto (única ocurrencia,
  byte-idéntica); re-pinado por la barrera. Lección (misma familia que
  el «204+/8-» del 010): los pines de línea se calculan con grep -n
  sobre el árbol final, jamás por extrapolación manual de acumulados.
- O2 — `irtamSampleBusy` SOLO-ESCRITURA: 4 stores, 0 loads en este diff.
  Estado muerto a fecha de 024. Candidatura natural para el 025:
  alimentar el flag stale / un badge «muestreando…», o eliminarlo en su
  momento. Sin coste ni riesgo (atómico).
- O3 — RE-MEDICIÓN: «antes» = 509 ms declarada (test sin loadCached) +
  carga de hasta 384 ficheros encima ≈ 0,5-1 s en hilo de render
  (mecanismo verificado en 021); «después» = handoff ~µs ANALÍTICO por
  construcción. La medición instrumentada viva queda en la aceptación
  026 (presupuesto frame <250 ms, var 8, speed 2, ≥30 s) — consistente
  con la partición del ruling, que exige la prueba viva en premiere.
- O4 — MÉTODO DEL ÁRBITRO: 3 iteraciones del script de barrera (cadena
  de includes glad/glm de grid_eval heredada de la era B0B1; awk `\s` no
  portable + pin de conteo que no contaba la mención en comentario;
  trampas pipefail con grep -m1 / awk exit tras git show). Fallos de
  método propios, documentados; en las 3 iteraciones, cero defectos del
  código plegado.

## 8. Contabilidad

- ASKs: NINGUNO. El pin E9 queda cerrado por re-pin de la barrera (O1).
- Espejo: `68c1d22` (tree 239bf4a3), detached limpio, 14 tags — SIN tag
  nuevo (política R2: el tag del ciclo permanece en ac9d95b3; sello
  final = opción de David en el cierre).
- Cadena del ciclo: ac9d95b3 (019/020, tag) → 239bf4a3 (024 PERF, este
  fold) → 025 RELOJ (helper PURO por capa en IrtamState + TimeBar
  hora-dato capa activa + flag stale, tests 34+k) → 026 PREMIERE
  (receta §6/§7 completa + expectativas R2: FPS fluido con IRTAM a
  speed 2, reloj por capa honesto, re-medición confirmada).
- La aceptación viva 026 queda DESBLOQUEADA por este fold: el bucle de
  diapositivas del 021 está roto por construcción (clamp del dt + worker
  asíncrono); el badge TOV sigue nombrando lo muestreado (honestidad
  heredada) y el stale asíncrono se autodeclara.
