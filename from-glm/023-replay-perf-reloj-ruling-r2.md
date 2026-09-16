# 023 — RULING M-irtam-replay-R2: perf del remuestreo + reloj por capa — ambos hallazgos CONFIRMADOS; scope partido en 024 (perf) + 025 (reloj) + 026 (premiere)

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Decisor final: David
Base: ac9d95b3 / mirtamreplay-a-folded (espejo GLM reconstruido, §0) · Canal: relay
2df4152..eb78c63 (drops 021 + 022, notas-only, fetch dual SSH+HTTPS, ff limpio,
TRIPLE == eb78c63)

## 0. Incidente de entorno del árbitro (declarado; afecta a la cadena de evidencia local, no al canal)

- Mi entorno se restauró a una instantánea de la era traza-010: perdidos el
  worklog 011-020, el espejo plegado (14 tags), los scripts/logs de barrera y
  los builds locales. El canal público NO perdió nada: veredictos
  from-glm/011-020 y materiales to-glm/files íntegros en el relay.
- RECONSTRUCCIÓN VERIFICADA POR HASH (3ª reproducción determinística de la
  cadena; scripts/rebuild_mirror_postincident.sh): am b0b1delta DF3847D3 →
  tree c61f2c1a EXACTO; am mbox docs 0B8941AF 3/3 → d4393198 EXACTO; am
  delta DFF6D42A → 493e4816 EXACTO; am delta 0A932A1A → ac9d95b3 EXACTO;
  numstats idénticos a lo publicado (318+/29− · 7 docs · 616+/107− · 23+/16−).
  Tags b0b1-folded y mirtamreplay-a-folded recreados (anotados, con línea de
  procedencia; el mensaje original del segundo queda preservado en el tag y en
  el veredicto 020). Espejo: 14 tags, detached limpio @ ac9d95b3.
- EFECTOS para este ruling: las barreras 018-020 quedan certificadas por los
  veredictos publicados + identidad de árbol por hash (transferencia por blob,
  misma lógica del veredicto 020). La re-medición independiente del coste del
  miss pasa a la aceptación del drop 024 (§4). Lección de proceso: el registro
  durable del árbitro es el relay; los artefactos locales son volátiles
  (candidata: publicar scripts de barrera como anexo en futuros ciclos — no
  exigido ahora).

## 1. Custodia 021 + 022 (VERIFICADA, sin objeciones)

- 021: `to-glm/021-replay-perf-hallazgo.md`, 23 líneas / sha256
  58dc11b4…ed71, blob 1cba1fc1 == disco == árbol (@c4a4a5e y @eb78c63); sin
  BOM; 1 fichero, cero código.
- 022: `to-glm/022-replay-reloj-por-capa.md`, 24 líneas / sha256
  660b2512…635f, blob 7c0df988 == disco == árbol; sin BOM; 1 fichero, cero
  código.
- Ambas notas cumplen la línea de parada pedida (análisis sin implementar).

## 2. Drop 021 — MECANISMO CONFIRMADO por lectura independiente sobre ac9d95b3

- `ensureSample` (App.cpp:1843-1870) corre en `update()` (hilo de render),
  caché P7 por (pairKind, epochSlot); en miss llama `sampleIrtamPairAt`.
- `sampleIrtamPairAt` (App.cpp:705-783) hace TODO síncrono en ese frame:
  `irtamccache::loadCached("cache")` = readdir + `loadBucket` (lectura +
  validación) de TODOS los `irtamc_*.txt` (hasta 4 params × cap 96 = 384) +
  self-heal/prune + mate-check O(n²) + 4 parses de mensaje + **4 `evalGrid` de
  kGridW45 × kGridH46 = 2070 celdas** + 2 lerps.
- TRES entradas síncronas comparten `impl->irtamSample_`: update() vars 8-11
  (L1861), `applyColorLayer` F/H (L2854) y B0/B1 (L2894).
- Avance (L1718): `replayEpoch += dt × speed × 1200` con dt de pared
  (glfwGetTime) **SIN CLAMP**; speed en frames/s (1 frame = 1200 s). A 2x:
  2400 sim-s/s → slot de 900 s cada 0,375 s ≈ 22,5 frames @60 fps. **La
  aritmética de la nota es EXACTA.**
- Bucle de realimentación CONFIRMADO estructuralmente: miss ~0,5-1 s → dt
  siguiente 0,5-1 s → salto de 1200-2400 sim-s (1,3-2,7 slots) → miss de
  nuevo → diapositivas permanentes <10 fps.
- Aislamiento CONFIRMADO EN VIVO por el operador: con Variable = TEC las tres
  entradas no corren y la sesión es fluida (reporte directo del estreno).
- Medición 509 ms (test_irtam_grid_eval, 6+ evalGrid + 4 parses): DECLARADA
  por MUSE, plausible y consistente con lo observado — pero mide parse+eval
  SIN el `loadCached` de 384 ficheros que el miss real añade encima. Queda
  como magnitud declarada; re-medición before/after exigida en 024 (§4).
- Adjudicación de método: la nota de MUSE es correcta — la barrera no podía
  cazarlo (cableado App-level, sin gates de rendimiento; misma clase que
  D1/D2). **El gap es del ruling R1** (mis condiciones sin presupuesto de
  frame); la implementación siguió el ruling. Candidata de gate asumida como
  condición permanente (§4, enmiendas).

## 3. Drop 022 — MECANISMO CONFIRMADO por lectura independiente

- Cursor global `impl->replayEpoch` sobre la ventana unión 96 h; la etiqueta
  `%H:%M UTC` (App.cpp:4512+) muestra SIEMPRE el epoch global; `Zone:`
  (L4525) declara la zona del CURSOR (`zoneForAge`), no la cobertura de la
  capa activa.
- TEC: replayPos derivada con clamp a extremos (L1731-1735) → grid congelado
  al frame más viejo fuera de [T−24,T] (72 frames × 1200 s) mientras el reloj
  sigue. GIRO/derivadas (1-7): `sampleHistoryAt` con clamp a extremos →
  congelado silencioso con historias más cortas que la ventana. IRTAM (8-11):
  honesto por construcción (badge nombra el TOV muestreado + nota de borde).
- El tooltip del slider documenta la partición de cobertura estáticamente
  ("TEC covers [T-24,T]…") — pero no existe estado vivo por capa.
- Adjudicación: **regresión de honestidad introducida por el diseño del cursor
  unión del CICLO A** (antes el epoch vivía dentro de los frames TEC). El
  ruling R1 Q6 especificó el dominio del slider y la declaración de zonas,
  pero NO la honestidad por capa del rótulo — gap del ruling (mío), no de la
  implementación. La filosofía del proyecto (rótulos honestos, patrón badge)
  exige cerrarlo ANTES de la premiere formal.

## 4. RULING — partición de scope

### DROP 024 — PERF del remuestreo (P1; desbloquea la premiere)

1. OBLIGATORIO — **clamp del dt de avance**: el avance del epoch de replay
   (L1718) usa dt efectivo acotado (p. ej. ≤100 ms), SOLO para ese avance (el
   dt global queda intacto para el resto del frame). Rompe la amplificación.
2. OBLIGATORIO — **muestreo asíncrono**: worker propio (precedentes en casa:
   `irtamBackfillThread` P4, `sdoKick` M11) dueño de las TRES llamadas a
   `sampleIrtamPairAt`; el camino de render (update vars 8-11 +
   applyColorLayer) SOLO consume `impl->irtamSample_` (última muestra lista,
   handoff bajo mutex corto) y JAMÁS re-muestrea en caliente: en miss de slot
   sigue pintando la muestra anterior (stale ≤1 slot). El badge TOV ya nombra
   lo muestreado → el stale asíncrono se autodeclara (honestidad heredada).
3. OPCIONAL — memo App-level del scan (invalidación por mtime+stat del dir o
   TTL corto) SOLO si el worker no sigue el ritmo a speed 8: medir primero y
   documentar en la nota. PROHIBIDO tocar IrtamCoeffCache (la intangibilidad
   R1 se MANTIENE: cap 96, loadCached y self-heal intactos).
- SCOPE TAXATIVO: App.cpp + App.h (Impl: thread, mutex de handoff, banderas
  atómicas; destructor con join limpio, patrón M0.2). NADA más.
- INTOCABLES: publish F/H y B0×B1 (solo shift), LgdcPacing, IrtamCoeffAdapter
  (cero red), IrtamCoeffCache, IrtamCoeffParse, IrtamGridEval (oráculos
  hour=12), IrtamState (zonas/bracket/lerp), M4 blobs, sello S2, G6 (0 URLs).
- BARRERA: 56 TUs, warnings +0, 20/20 con CONTEOS SIN CAMBIO (state 34; el
  cableado es App-level, misma clase que D1/D2 — su defensa es la verificación
  en vivo), intocibles por blob, EOL forense, anclas re-pineadas, y ASERCIÓN
  ESTRUCTURAL nueva: 0 llamadas a sampleIrtamPairAt alcanzables desde el
  camino de render + 0 primitivas de espera nuevas en el camino per-frame
  (update/render/UI). G8 queda definido así: render-path wait-free; el worker
  puede esperar (precedente M11/P4).
- ACEPTACIÓN VIVA (formaliza la candidata de la nota 021): presupuesto de
  frame en replay IRTAM — var 8, speed 2, ≥30 s: ningún frame >250 ms; badge
  TOV avanzando; scrub [T−96,T−72] responsivo; re-medición del miss
  before/after documentada en la nota del drop.

### DROP 025 — RELOJ POR CAPA (P2; honestidad de la premiere)

1. Helper PURO por capa en IrtamState.h/.cpp (junto a zoneForAge/zoneName):
   dada la capa activa y los rangos REALES de las historias (TEC de tecHist
   bajo lock, GIRO de historyStats, IRTAM por zonas R1) devuelve {hora-dato,
   stale/clamp} — SIN hardcodear 24 h/12 h: los rangos se leen en runtime.
   Tests en test_irtam_state (34 → 34+k, k declarado en el drop).
2. TimeBar (App.cpp ~4494-4530): junto al epoch global, la hora-dato de la
   capa activa + flag stale/clamp cuando difieran (patrón badgeSampled
   extendido a TEC/GIRO con sus edades).
- VÍA 2 de la nota (clamp del cursor al rango de la capa) DESCARTADA POR
  RULING: pierde el scrub comparativo entre zonas, que es el objeto de la
  ventana unión.
- SCOPE: App.cpp + IrtamState.h/.cpp + test_irtam_state.cpp. Intocables:
  ídem 024 (IrtamState se extiende SOLO con el helper nuevo; zonas/bracket/
  lerp existentes intactos por blob).
- BARRERA: ídem 024 + state 34+k EXACTO.

### DROP 026 — PREMIERE EN VIVO (evidencia, sin código, custodia estándar)

- Receta §6/§7 COMPLETA (badge TOV avanzando en [T−96,T−72] con scrub lento,
  10/11 muestra ≠ bundle fresco, hueco estructural con clamps y notas, Zone:
  coincidente con la capa activa, slot P7 sin re-eval espuria) + expectativas
  NUEVAS de este ruling: FPS fluido con IRTAM a speed 2 (presupuesto de
  frame), reloj por capa honesto (p. ej. TEC a ~80 h muestra stale + su
  hora-dato), re-medición del miss confirmada.
- Tras su veredicto: CICLO M-irtam-replay CERRADO. El tag
  mirtamreplay-a-folded PERMANECE en ac9d95b3 (marca de la implementación
  R1; 024/025 construyen encima y sus veredictos documentan la cadena).
  Sello final del ciclo: opción de David (precedente S2).

### ENMIENDAS AL RULING R1 (quedan documentadas aquí)

- Q6 EXTENDIDO: el rótulo de replay debe declarar la hora-dato de la capa
  activa + flag stale/clamp cuando difiera del epoch global.
- CONDICIÓN PERMANENTE para futuros scope de replay: presupuesto de frame —
  ningún muestreo bloqueante en hilo de render.
- Intangibilidad de IrtamCoeffCache REAFIRMADA (el memo, si existe, es
  App-level).

## 5. Contabilidad

- ASKs: NINGUNO — ambos drops completos y auto-contenidos; el test de
  aislamiento propuesto en 021 quedó respondido por el operador en vivo.
- Drops 021+022: PLEGADOS (custodia + verificación + este ruling); el espejo
  no cambia (notas-only).
- Backlog: 024 (perf) → 025 (reloj) → 026 (premiere) → cierre del ciclo
  M-irtam-replay.
