# 018 — VEREDICTO del fold M-irtam-replay-A: DEVOLUCIÓN (2 defectos de cableado + 1 ask de custodia)

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Base declarada: c61f2c1a (+ docs)
Canal: relay 012a50c..88ea85e · Commit MUSE 40a26ea · Delta replay018delta.txt

## 1. Custodia (VERIFICADA, sin objeciones)

- Delta: sha256 DFF6D42AB5DAA737B41BCDA0FC71896CA7F9A893A0C95797770C021A9FE2C886 ==
  anunciado, 40.860 B exactos, `From 40a26ea` sin BOM. Nota 22 líneas íntegra.
- Fold sobre espejo 5aa69cc (c61f2c1a): apply --check OK, am --keep-cr SIN fuzz ni
  offsets (determinismo re-verificado en rama temporal: mismo tree a6feb48e dos veces).
- numstat EXACTO: App.cpp 401/107 · IrtamState.cpp 94/0 · IrtamState.h 38/0 ·
  test_irtam_state 83/0 == 616+/107- == shortstat == diffstat del propio delta.
- Scope de ficheros 4/4 == lista taxativa del ruling §8 (sin CMake: no hay fichero nuevo).

## 2. Tree gate: PENDIENTE (ask único de custodia, no defecto del paquete)

- Fold espejo: tree a6feb48e… · Anunciado: 493e4816… — NO coinciden.
- Causa declarada por MUSE y aceptada como explicación: el padre de 40a26ea es e1ee315
  (docs GitHub), commit FUERA del espejo (repo privado, inaccesible anónimamente —
  precedente v1.0/v1.1; solo glmrelay es público).
- Lo que SÍ está verificado localmente: post-imágenes de los 4 ficheros (blobs
  f8f22fc4/41912c66/4fdc6014/1c5cfe8f), 16 intocibles por blob, bloques publish
  F/H (pre 1178-1228 == post 1277-1327) y B0×B1 (pre 1232-1310 == post 1331-1409)
  BYTE-IDÉNTICOS con el shift +99 del sampler. El subtree de código es custodiado;
  lo pendiente es el subtree de docs.
- **ASK ÚNICO**: mbox/format-patch de e1ee315 junto al drop de fix (así el espejo
  reconstruye e1ee315 → 40a26ea → fix y el tree gate cierra byte-exacto contra el
  árbol anunciado del fix). Clase de incidente M11 "missing-4", misma receta.

## 3. DEFECTO 1 (BLOQUEANTE, Q5): el sampler IRTAM lee un epoch clavado por el lerp TEC

Cadena verificada en el código plegado (líneas post-018):
- L1724: `replayEpoch = impl->replayEpoch;` (cursor primario, correcto).
- L1759: `replayEpoch = fa.timestamp*(1.0-f) + fb.timestamp*f;` — REASIGNA el local
  al epoch cuantizado TEC siempre que haya ≥2 frames (havePair). Línea heredada del
  código previo (donde era la única fuente del epoch); en el cableado nuevo es un
  leftover que CLAVA el local.
- L1843-1866: `ensureSample` captura `[&]` y lee ese LOCAL (guard L1844, slot L1845,
  sampleIrtamPairAt L1857).

Efecto por zona (el daño es exactamente la zona que justifica el ciclo):
- solo-IRTAM [T−96,T−72]: cursor < tecHist.front() → pos=0/f=0/fa=frame más viejo
  (~T−24) → el sampler recibe ~T−24 → bracketTovs clampa SIEMPRE al TOV T−72 →
  **IRTAM congelado en el borde: sin lerp, sin animación**. El "ciclo diurno completo
  de movimiento IRTAM" (objeto del CICLO A) no ocurre en el camino per-frame update().
- hueco y solo-TEC: mismo resultado que el intended (clamp T−72) — por eso el defecto
  pasa inadvertido fuera de la zona IrtamOnly.
- Efecto secundario: el slot del cache P7 queda anclado a ~T−24 (que deriva con el
  reloj de pared) → re-evaluación espuria cada ~15 min reales + invalidación mutua
  con applyColorLayer (que usa impl->replayEpoch — el cursor verdadero — y por eso
  SÍ muestrea bien: la inconsistencia entre ambos caminos es la firma del defecto).
- Nota para la verificación en vivo: con <2 frames TEC (havePair=false) el local
  conserva el cursor verdadero y el replay IRTAM ANIMA — el defecto solo se manifiesta
  en régimen (sesión con historia TEC). Un smoke test corto puede dar verde falso.

**FIX (mecánico)**: dentro de ensureSample, leer `impl->replayEpoch` (3 sitios:
guard, slot, llamada al sampler). PARTición que se rulega para el resto: GIRO/sol/
derivadas (vars 1-7 + terminator, L1874/L1951/L2010) CONSERVAN el local cuantizado
(comportamiento histórico, regresión cero, declarado); el sampler IRTAM usa el cursor
primario. No tocar L1759.

## 4. DEFECTO 2 (BLOQUEANTE, Q3-heredado): rama 10/11 sin else — el bundle live pisa la muestra

- L1890-1899 (vars 8/9): `if (impl->replayMode) {…} else { live }` — CORRECTO.
- L1904-1933 (vars 10/11): `if (impl->replayMode) {…}` y a continuación el bloque
  live (`auto ib = impl->getIrtam(); … updateMainGrid(…)`) SIN guard — en replay con
  bundle válido, el dato fresco SOBREESCRIBE la muestra muestreada cada frame.
- applyColorLayer (L2836+/L2872+) tiene los `return;` correctos — otra vez, la
  inconsistencia entre caminos es la firma.

**FIX (mecánico)**: envolver el bloque live de 10/11 en el `else` (espejo de 8/9).

## 5. Todo lo demás: VERIFICADO Y APROBADO (lleva al fix sin re-trabajo)

- IrtamState.h/.cpp: kIrtamReplayWindowSec 345600 (kReplayWindowSec 86400 INTACTA) ·
  zonas [72,96] IrtamOnly / (24,72) DeadGap / resto TecOnly · bracketTovs con
  clamp+empty+singleton · lerpValues con guards de tamaño/isfinite · badgeSampled que
  SIEMPRE nombra el TOV mostrado + "(borde de ventana)" + honesto sin-dato. Puro,
  sin curl/GL/App. Conforme al ruling punto por punto.
- Sampler sampleIrtamPairAt: TOVs comunes del par con mate-check exacto · par
  ausente → false · isStandardBasis exigido · eval al TOV del bucket + lerp entre
  brackets · timestamp interpolado. Lee del cache, no toca el publish. Conforme.
- TimeBar: cursor nace en el frame TEC más viejo · slider "hours back" [0,96] con
  scrubbing-pauses · Play/speed intactos · etiqueta %H:%M UTC del epoch · línea
  "Zone:" con los tres tramos y tooltips que declaran el hueco estructural · stub
  TimelineBar NO revivido. Conforme Q6.
- BARRERA COMPLETA (scripts/replay018_fold_verify.sh, log replay018_verify.log):
  56 TUs + LINK · warnings 13 únicas == baseline B0B1 +0/−0 · 20/20 tests con conteos
  EXACTOS (state 34 = 11 P5 + 23 replay-A; cache 37/32; parse 43; gate 19; adapter 21;
  grid_eval 37 con oráculos hour=12 INTACTOS y sección B0/B1 no saltada; trace 9) ·
  G6 0 URLs · G8 0 esperas · EOL censo App 454 EXACTO (State/test +0) · anclas 9/9
  re-pineadas (372/1289/1334/1486/1764/2678/2780/3297/3572 + setvbuf main.cpp:8) ·
  16 intocibles por blob · publish F/H y B0×B1 byte-idénticos.
- Los 23 checks nuevos son correctos y necesarios — pero testean las funciones PURAS;
  los defectos D1/D2 son de cableado App-level y por construcción invisibles para
  esta barrera. La defensa correcta es la verificación en vivo con la receta del §7.

## 6. Forma del drop de fix (019)

- Scope: SOLO App.cpp (ambos defectos viven ahí). EOL CRLF conservado (censo
  actualizará solo). Sin tocar IrtamState/fetching/cache/pacing/publicar.
- D1: ensureSample lee impl->replayEpoch (3 sitios). D2: else en el bloque live 10/11.
- Junto al delta del fix: **mbox de e1ee315** (cierre del tree gate).
- Custodia estándar: delta + sha256 + From sin BOM + tree gate del fix (anunciar el
  tree del commit fix, hijo de 40a26ea) + diffstat/numstat + poblaciones por lado.
- Sin tag todavía: b0b1-folded sigue de ancla; el tag del ciclo (mirtamreplay-a-folded
  o el nombre que se fije) sale del fold del fix con tree gate cerrado.

## 7. Receta de verificación en vivo para el fix (para David, post-fold)

1. Sesión con ≥2 frames TEC (régimen — el smoke test corto da verde falso, ver §3).
2. Vars 8/9 en replay, scrub por [T−96,T−72]: la capa IRTAM cambia de TOV y el badge
   muestra "retrospectivo @ <TOV>" avanzando; en los bordes aparece "(borde de
   ventana)".
3. Vars 10/11 en replay: la muestra NO es el bundle fresco (comparar contra live).
4. Zona hueca [T−72,T−24]: IRTAM clampa al borde con nota; TEC clampa al suyo.
5. La línea Zone: del TimeBar coincide con la capa activa en cada tramo.

## 8. Estado

[2026-09-16] DEVOLUCIÓN del 018: custodia, scope, contracto de helpers, TimeBar y
barrera íntegra VERIFICADOS; dos defectos de cableado BLOQUEANTES (D1 epoch clavado
por lerp TEC en el sampler; D2 live-block sin else en 10/11) con fix mecánico
especificado; tree gate PENDIENTE del mbox e1ee315. El espejo queda en el fold
a6feb48e (sin tag) a la espera del 019 + mbox. Sello mirtamf2-sealed intacto (S2);
b0b1-folded (c61f2c1a) de ancla; cadena post-sello 03bcd8b4→a2616f77→c61f2c1a→(018
pendiente de fix).
