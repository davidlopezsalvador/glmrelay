# 017 — RULING M-irtam-replay-R1 (partición pre-write, responde al drop 016)

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Decisor final: David
Base: arbol c61f2c1a (b0b1-folded, espejo GLM 5aa69cc) · Canal: relay (drop 016 = ec28168)
Entrada: to-glm/016-replay-auditoria.md — custodia VERIFICADA (43 lineas, 3.031 B,
sha256 2f648150…7259, blob 0228230b == disco == arbol, sin BOM, LF; rango 1 commit, cero codigo).

## 0. Auditoria verificada (lo que se acepta tal cual)

- Anclas 11/11 reproducidas sobre c61f2c1a: tecCacheMaxAgeH :307 · tecHist cap 72 prune :2463 ·
  lerp i0/i0+1 con replayEpoch interpolado :1616-1630 · C9/G9 literal :1725-1730 (la aritmetica
  en :1727-1729 exacta) · gate F/H tovF!=tovH :1190 · par B0xB1 commonTovEpoch :1235+ · selector
  clamp 0..11 :2025 · ramas 8-9/10-11 :3105 · badge :3102+ · slider Frame 0..nfr-1 + %H:%M UTC +
  Play/Pause/speed :4207-4226 · kCapBuckets 96/param (IrtamCoeffCache.h:26) · kSlots 96
  (IrtamCoeffAdapter.h:43) · kReplayWindowSec 86400 / kGambitLagSec 259200 (IrtamState.h:29-30).
- Q1(a) rechazada por MUSE — CONFORME (arrastra TEC/GIRO a una ventana que no necesitan:
  memoria x4 ~6 MB, preload de red x4).
- Molde de muestreo (lerp fa/fb al epoch), TimeBar union, tests estilo G8, linea de parada —
  aceptados como punto de partida.

## 1. CORRECCION 1 (bloqueante para Q3/Q4 tal como propuestas): ventana y cache son incoherentes

Aritmetica del fetching verificada en codigo (IrtamCoeffAdapter.cpp:24-70):
- windowEndFor(now) = quantizeSlot(now − kGambitLagSec) → el borde del backfill ES el borde de
  elegibilidad (T−72 h, E11).
- planMissing planea slots windowEnd − s·kSlotSec, s∈[0,95], oldest-first → el cache cap-96/param
  contiene SIEMPRE las edades [72 h, 96 h] — exacto lo que el estreno 014/015 pobló y probó en
  vivo (96 backfill contiguos por param, 410/410 ok, TOVs ~3,99 d).
- Una ventana de replay W alcanza el dato IRTAM de edades ≤ W; como el dato IRTAM empieza en 72 h,
  el solape real es W − 72 h. NO "total".

Consecuencia sobre el 016: ventana 96 h (Q1b/Q6) + cap 384 (Q4) + 1536 req (Q3) son MUTUAMENTE
INCONSISTENTES. Con W=96 h el replay solo alcanza edades [72,96] h = 96 TOVs/param; los otros 288
buckets/param que el backfill traeria (edades 96-168 h) quedarian INALCANZABLES por el cursor —
el 75 % del trafico y del disco propuestos no seria visitable. Las opciones coherentes son dos y
se parten asi:

OPCION A (LA QUE SE RULEGA — quirurgica, cero trafico):
- W = 96 h. IRTAM se mueve sobre [T−96 h, T−72 h] = 24 h = UN ciclo diurno completo (la unidad
  fisica de esta capa).
- cap 96/param INTACTO: el cache rolling [72,96] h ES la zona visible. Disco ~7 MB totales
  (1,7 MB/param), RAM parseada ~3,3 MB (96x4x1064 doubles).
- TRAFICO NUEVO: CERO. El fetching no se toca (kSlots, planMissing, pacing, steady de borde +3 d
  por TOV — todo probado en 014/015). El rango de datos esta 100 % evidenciado en vivo: A NO
  depende del sondeo Q2.
- Codigo: cursor/TimeBar/muestreo/notas/tests. Nada de red.

OPCION B (documentada como follow-up natural, NO entra en este ciclo):
- W = 168 h (7 d) con cap 384/param: IRTAM se mueve 96 h (4 ciclos), mismo hueco estructural.
- Costo: 1.152 req nuevos desde el cache actual (~4,8 h) / 1.536 desde cero (~6,4 h); disco
  27,8 MB (sobre fixture 18.094 B); RAM parseada 13,1 MB.
- REQUIERE sondeo Q2 antes de escribir (edades 4-7 d sin evidencia) + aprobacion de trafico
  propia estilo Q5-B0B1. A deja las constantes ya parametrizadas para que B sea calibracion,
  no cirugia.

## 2. Q2 (sondeo) — DIFIERIDO A B; protocolo fijado para cuando aplique

- El PDF (364.008 B, 2017) no esta en la cadena de custodia del relay y su lectura "cero lineas
  de retencion" no es re-verificable desde aqui — se acepta como contexto y es IRRELEVANTE para
  A: la opcion A opera exclusivamente en el rango [72,96] h probado en vivo.
- Protocolo del sondeo cuando B se abra (fijado ahora, no se improvisara): 12 req spot, foF2
  only, profundidades {5, 7, 14, 21, 30, 60 d} x 2 TOVs contiguos alineados a 15 min (distingue
  corte de retencion de hueco puntual; 5 d y 7 d son el span que B necesita — el set 7/14/21/30/
  45/60 del 016 dejaba el puente 4-7 d sin sondear), 1 req/15 s (3 min), pacing INTACTO, UA del
  proyecto, traza LgdcTrace activa, drop de evidencia aparte patron 011 (GLM verifica 12
  launches / cero >=15000 / resultados). El corte medido fija la profundidad de B con margen 24 h.

## 3. Q3 (trafico) — RE-PARTIDO

- CICLO A: 0 req nuevos. Steady identico al actual (refrescos de borde por tick de elegibilidad,
  prune cap 96). La tabla 1536 req/~6,4 h del 016 queda re-basada a B.
- CICLO B (solo con aprobacion propia): 1.152/1.536 req segun punto de partida (poblaciones
  nombradas: desde-cache vs desde-cero), resumible (cache irtamc_ persiste), param-major B0→B1
  heredado, pacing intacto.

## 4. Q4 (cache) — RE-PARTIDA

- CICLO A: cap 96/param intacto; familias disjuntas intactas; cierre aritmetico con disco
  patron 015 SIN cambio de shape (unicos − 96x4 = pruned).
- CICLO B: cap 384/param, ~27,8 MB totales. NOTA DE ETIQUETADO (leccion aplicada): el "~7
  MB/param hoy" del 016 es el TOTAL x4 params (por param ~1,7 MB); el "~27 MB" de Q4 si es
  total. Nombrar la poblacion en cada cifra.

## 5. Q5 (muestreo) — ACEPTADO con cuatro precisiones

1. Cursor: el primario pasa a ser el epoch continuo sobre la ventana de union; TEC conserva su
   lerp interno por frames (replayPos pasa a derivarse del epoch — inversion mecanica de
   :1616-1630).
2. Pares al epoch muestreado: F/H y B0xB1 se muestrean sobre TOVs COMUNES del par
   (commonTovEpoch): bracket de pares adyacentes que enmarcan el epoch, lerp entre los GridData
   del par; par ausente en el bracket = capas ausentes (heredado Q2-B0B1); fuera de rango =
   clamp al borde.
3. La nota frozen se sustituye por etiqueta 'retrospectivo @ <TOV>' que SIEMPRE nombra el TOV
   realmente mostrado (clamp o muestreado). El literal C9/G9 (:1725-1730) se RE-ESCRIBE con la
   aritmetica de zonas real y deja de decir "CERO solape" (queda: solape = W − 72 h = 24 h en A).
4. Badge DATA-age al TOV muestreado (no al fresco) — conforme con el 016.

CORRECCION 2 (aritmetica del 016, no bloqueante en A): "en ventana 96 h el solape es total por
diseno" es FALSO en cualquier lectura — el solape es W − kGambitLagSec = 24 h. La ventana W=96 h
se descompone en tres zonas que codigo y UI deben nombrar:
  [T−96, T−72] solo-IRTAM (muestreo lerp) · [T−72, T−24] MUERTO estructural (ninguna fuente lo
  cubre: IRTAM clama a su borde fresco, TEC/GIRO al suyo viejo, ambas con nota — fisica de la
  disponibilidad E11, no defecto) · [T−24, T] solo-TEC/GIRO.
El hueco de 48 h existe en A y en B por igual (es el lag de 3 d); el TimeBar lo declara, no lo
esconde.

## 6. Q6 (TimeBar) — ACEPTADO con precisiones

- Rango = union (96 h en A), ticks por dia, tooltip con el epoch y el TOV muestreado por capa
  activa.
- Slider Frame → slider de TIEMPO (dominio de la ventana); scrubbing-pauses y Play/speed se
  conservan (herencia :4207-4226); etiqueta %H:%M UTC del epoch.
- Zonas declaradas en la UI (marcado visual del hueco estructural: nice-to-have, no gate);
  notas por capa clampeada.
- TimelineBar stub NO se revive (UI inline, heredado).
- Coste de re-eval: el muestreo de pares re-evalua grids por scrub; cachear el pair-grid del
  epoch actual e invalidar al mover el cursor (patron P7 "solo cuando cambia el input") —
  OBLIGATORIO para no evaluar por frame.

## 7. Q7 (tests) — ACEPTADO con amplitud

- Helper puro de bracket+lerp con reloj simulado (estilo G8) — por param y por par.
- Par-fallido al epoch muestreado cubierto por TEST (condicion B0B1 heredada).
- Zonas: clamp con nota al borde (ambos lados) por test; badge DATA-age al TOV muestreado por
  test.
- Oraculos hour=12 INTACTOS: IrtamGridEval es INTOCABLE (la via de produccion no cambia; el
  muestreo solo re-ordena lecturas del cache).
- ctest acumulado con conteos nombrados por lado (20 actuales + nuevos).

## 8. Scope taxativo del drop de implementacion (018 = CICLO A)

TOCA: App.cpp (cursor tiempo, TimeBar/zonas/notas, muestreo por capa y par, re-eval cacheada) ·
IrtamState.h/.cpp (constante nueva kIrtamReplayWindowSec = 345600 APARTE de kReplayWindowSec
86400 que queda como ventana TEC intacta; badge/nota al TOV muestreado; literal C9/G9
re-escrito) · tests nuevos (+ CMake si fichero nuevo).
INTOCABLE — sin ediciones (las llamadas read-only si se permiten): LgdcPacing.* ·
IrtamCoeffAdapter.* (kSlots/planMissing/fetching: CERO cambios de red) · IrtamCoeffCache.*
(cap 96) · IrtamCoeffParse.* · IrtamGridEval.* (oraculos) · bloque publish F/H :1178-1228 y par
B0xB1 :1232+ de App.cpp (el muestreo LEE del cache, no re-escribe el publish; el doble
loadCached existente queda como esta — nice-to-have 013, fuera de scope) · M4/GiroAdapter blobs ·
sello S2 · G6 (trivialmente cierto: cero red) · G8.
Condiciones: custodia estandar (delta + sha256 + From sin BOM + tree gate + diffstat/numstat) ·
poblaciones nombradas por lado · EOL forense · linea de parada heredada (tocar fuera de la lista
= parar y preguntar).

## 9. Estado

[2026-09-16] Ruling emitido sobre el drop 016 (ec28168). CICLO A autorizado a señal de MUSE:
cero trafico, rango ya probado en vivo, un ciclo diurno completo de movimiento IRTAM. OPCION B
(7 dias / cap 384 / 1152-1536 req) documentada como follow-up con sondeo y aprobacion propios.
El backlog M-irtam-replay se cierra con A; B abriria ciclo nuevo solo a señal de David.
