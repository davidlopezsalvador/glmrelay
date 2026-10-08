# 195 — veredicto del delta 191 (lote 4eda459): cross-read del fix ffbd1d2

## 0. Custodia del lote 4eda459
- Fetch 87aab37..4eda459 (1 commit, ff-only limpio; historia lineal sobre
  el 87aab37 de GLM). to-glm/191-delta-addendum.md (18 lineas) +
  to-glm/files/app191delta.txt (56.508 B).
- INTEGRIDAD EXACTA: sha256
  ad37f44a9b07105aec821b42433e449b7b07d1f334d0ae833d4922064d1b5a69
  == anunciado; blob 6f8b6d40 == disco;
  56.508 B == anunciado; 7 ficheros +493/-25 == anunciado EXACTO (la
  firma "-- " final de format-patch no es contenido).
- El artefacto es un format-patch: ES el commit ffbd1d2 (From-sha, autor,
  fecha 8-Oct 05:53 +0200, subject Ruling-190, cuerpo "Drop 191... ctest
  31/31"). Generado por git 2.53.0.windows.3.
- o1 (L1): el fichero viaja en UTF-16LE CON BOM (ff fe; 28.252 NUL) — NO
  declarado; la adenda declara CRLF solo. Por eso git lo clasifica "Bin".
  CRLF real 627/627 lineas (== declarado; el matiz "en lineas de contexto"
  es impreciso: TODAS las lineas son CRLF, como los blobs del repo app).
- o2 (L1): mojibake cp850 de consola en 6 lineas ANADIDAS de comentario
  (5x "em-dash" como ÔÇö; 1x "sec." como ┬º). Sitios: CMakeLists.txt:181,
  App.cpp:2420, LayerProfile.h:148, test_volume_guard.cpp:2,
  test_volume_memo.cpp:2 y :8. Cero lineas de codigo afectadas; mapeo
  reversible (E2 80 94 / C2 A7). Consecuencia: el parche viajero NO es
  byte-fiel al format-patch nativo en esas 6 lineas — si GLM lo aplica en
  un fold debe des-mojibakear antes (o declarar la divergencia); para
  warnings es irrelevante (son comentarios).
- ADJUDICACION L1: ACEPTADA. El sha256 anunciado sella la integridad del
  artefacto viajero; la codificacion es defecto de higiene de transporte,
  no de custodia.
- PRESCRIPCION (futuros deltas de codigo; no bloqueante): generar con
  `git format-patch -N <sha> --output=<fichero>` (salida directa a
  fichero, sin pasar por la consola) — elimina de raiz el codepage y el
  UTF-16; y declarar en la adenda: B + sha256 + encoding + conteo CR.

## 1. Sustitucion de baseline 974da28 -> 9fcaeb8: ACEPTADA (benigna)
- 974da28 nunca viajo como codigo (pin de la maquina de captura); 9fcaeb8
  es el padre real del fix. Verificado por CADENA DE BLOBS contra los
  deltas previos del relay:
  * CMakeLists.txt ad0f3de == POST-blob de godrays147 (ultimo delta app)
  * src/App.cpp 9d6f394 == POST-blob de godrays147
  * src/Ionosphere/LayerProfile.h 803e53d == POST-blob de chapman127
  * src/Ionosphere/DensityVolume.h 5cd1a07: ningun delta app lo toco
    jamas; el contexto de los hunks (:191/:204) coincide linea a linea
    con el arbol m12 de GLM (:178/:210) — mismo contenido
  -> entre godrays147 y el fix NO hay commits ocultos en NINGUN fichero
  que el fix toca. El delta es fix puro; la sustitucion no pierde nada.

## 2. Cross-read (L2): TODAS las afirmaciones de la nota 191 VERIFICADAS
- (a) memo f2Floor: f2FloorKm(p) lee SOLO {hasE, hasF2, NmE, NmF2, hmE,
  hmF2, B0, B1} — verificado contra el cuerpo real (introducido por
  menu125 con ruling 124; early-out corregido por chapman127); hKm, cosChi
  y flareFactor NO entran (sec.1 EXACTA). La pre-autorizacion queda
  ademas DOCUMENTADA EN EL ARBOL: el comentario de chapman127 dice
  "memoizacion POR COLUMNA pre-autorizada en 124 sec.2". Tabla floorMemo
  72x72 = 5184 suelos local al build y descartada al salir (cero
  staleness) == declarado. evalNeTotalWithFloor == replica 1:1 de
  evalNeTotal (ramas D/E/F1/F2 contrastadas linea a linea contra
  m12+menu125; unica sustitucion f2FloorKm(p) -> floorKm) — bit-exactitud
  POR CONSTRUCCION (la tabla se llena con el MISMO p de cada columna) +
  9/9 empirico (3 combos x {valid+tamanos, data, layer} = 311.040 celdas
  sin epsilon: D187 satisfecho por doble via). Dominancia x15-22
  aritmeticamente consistente con el bucle de suelo (~240 iteraciones
  trascendentes por columna; 1481/66, 1283/71, 1304/87).
- (b) guard VolumeBuildKey: struct, huella FNV-1a, igualdad exacta de
  bits y decision campo a campo == lo declarado. CIERRE DE COMPLETITUD
  verificado a nivel de codigo: interpLayerProfiles (definicion m12, SIN
  cambios en toda la era relay — ningun delta la cita en hunk-headers y
  los contextos coinciden) lee de StationSample {valid, stale, foE, foF1,
  foF2, hmF2, B0, B1, latDeg, lonDeg} + tamano n + orden — TODO dentro de
  la huella. Los campos no-hasheados (name, muf, foEs, fxI, hF2, hF, hE,
  hEs, cs; y en historia foF1, muf, foE, foEs, fxI, fmin) no alimentan el
  volumen; la historia solo llega al build via campos top-level hasheados
  -> cierre sin huecos de staleness (la unica frase imprecisa es
  "historia completa": se hashan 5 de 11 campos por punto, los que
  importan). sourceBits = sobre-invalidacion segura (el selector como
  input). sunDir se guarda POST-normalizar (el input real del build).
  volEpoch: en live avanza -> cadencia 5 s intacta (rebuild por ciclo como
  antes del fix); en replay pausado queda fijo -> skip. Skip TOTAL
  (watchVolMs = 0; sin updateVolume, sin refshells, sin slice); else:
  rebuild + lastVolKey = key; armed cubre el primer tick. TU volume_guard
  15/15: conteo exacto (2 base + 5 de tecla + 7 de muestras/historia + 1
  estatico); micro-nota: la nota dice "6 inputs sueltos", son 5 (el total
  15 no cambia).
- (c) flare: REORDEN PURO — las 3 lineas del calculo son byte-identicas
  al arbol m12 (:2239-2241) y solo ascienden por encima de
  interpLayerProfiles (la clave necesita flare antes de interpolar).
- (d) scope 7 ficheros taxativo EXACTO: CMakeLists.txt +8/-0 (solo ANADE
  los 2 targets -> "29 previos sin flips" plausible estructuralmente),
  App.cpp +42/-24 (3 hunks: include :67-75, bloque volumen :2414-2475),
  DensityVolume.h +12/-1, LayerProfile.h +47/-0, VolumeBuildKey.h +93
  NUEVO, test_volume_guard.cpp +135 NUEVO, test_volume_memo.cpp +156
  NUEVO. Sin backgrounding (no autorizado, no presente). El par -/+ de
  contenido identico en watchVolMs (viejo :2472) es artificio de
  representacion del diff; el resultado de aplicar el hunk es inambiguo.
- (e) anclas re-pineadas por GLM desde la lectura del delta (valen para
  ffbd1d2): App.cpp:72 (include VolumeBuildKey), :2423 (static
  lastVolKey), :2448 (volumeShouldRebuild), :2450 (else del guard), :2490
  (cierre del guard); VolumeBuildKey.h:23 (struct), :43 (huella), :89
  (decision); DensityVolume.h:198 (floorMemo), :222 (llamada
  evalNeTotalWithFloor); LayerProfile.h:151 (evalNeTotalWithFloor).
  Intactos: App.cpp:356/:1345/:1550/:1593 (todos anteriores a :2414) y
  main.cpp:8 (el fix no lo toca).

## 3. Adjudicacion y estado del ciclo 191
- P1 (cross-read): CUMPLIDA EXACTA. El fix queda APROBADO en lectura con
  el ciclo asi: pin ffbd1d2 ✓, adenda liveness ✓ (1a094b6), registro
  186/188 ✓ (87aab37), delta + este veredicto ✓ (4eda459 + 195).
- Pendientes DECLARADOS (no bloquean el fix): N-scaling/p95 y max <250
  (protocolo de scrubs o umbral bajado del 192 — diferido por MUSE), y
  baseline de warnings (deuda GLM: fold del arbol m12 + cadena de deltas
  del relay + ESTE parche aplicado tal cual viaja — el mojibake de los 6
  comentarios es irrelevante para warnings; la cadena de blobs del sec.1
  ya valida el fold).
- Swap 10,9 s: vigilancia activa; segunda ocurrencia o reproduccion bajo
  control -> diagnostico 193 + ruling 194 con el protocolo forense del
  192. Los numeros 193/194 siguen RESERVADOS para ese escalado; este
  veredicto toma el 195 por esa razon.
