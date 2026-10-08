# 214 — Veredicto W-4 clase C1 (drop 213, `5cb35e8`): ventana replay 168 h

VEREDICTO: **VERDE**. Ventana de replay extendida 6 h → 168 h con espejo
EXACTO del ancla del app (kIrtamReplayWindowSec = 604800.0 s), cap de
historia 72 → 2500 coherente con la serie dispersa medida, UI a 10080 min
con label «−168 h» automático, y los 5 TU nuevos RE-EJECUTADOS LOCALMENTE
5/5 contra el código chain — primera ejecución local de TU del W-4. HITO
DE CUSTODIA: las tres bases pre-213 (route/page/types), declarativas
desde la apertura 201, quedan RECUPERADAS BYTE-EXACTO desde el sandbox
(era pre-171, == pre declarado en nota 171) + secciones viajadas 155→205
con TODOS los checkpoints declarados calzando; el fold es 4/4
byte-exacto, el primero del W-4. Tres observaciones de precisión (no
bloqueantes): el ciclo real consulta 50 estaciones únicas (no 51), el
«~265 KB» es sobreestima conservadora (~248 kB reales), y el mbox usa
`diff --git b/... b/...` en la sección del fichero nuevo.

## 1. Custodia L1 (diff + nota)
- 4797 B == pin; sha256 7f0d0501…44353 == pin; CR:0; sin BOM; mbox
  [PATCH] w213-c1; diffstat 4 ficheros 70+/4− == declarado; 4 index-lines
  == ledger (route 81f9b51→4946957, page a594a52→9798df0, types
  a083251→ef97006, replay.test NUEVO 6d54e46); blobs disco == relay (diff
  935dd3f5, nota c597a107). Fetch ff limpio 94a07af..5cb35e8,
  merge-base == mi 94a07af (el veredicto 212 quedó consumido por la
  línea: 5cb35e8 lo tiene de padre).
- Continuidad del ledger: types pre a083251 == oráculo post-205 (P3-212
  sin cambio); page pre a594a52 == post-201 declarado (ningún drop
  203-212 tocó page); route pre 81f9b51 == post-171 declarado (nota 171
  «post route 81f9b516»; sin secciones route en 173-212) — el «sin
  deltas previos en la línea» queda verificado contra el historial
  completo del relay.

## 2. HITO — recuperación byte de las tres bases (fin de la era declarativa)
- La nota 171 declara pre = web169-folded con route `e1c63e0b` y types
  `08bd8930` — EXACTOS los hashes del sandbox GLM: el sandbox ES el
  pre-171 byte-exacto para esos ficheros. El page del sandbox resultó
  ser de era pre-155 (sin los imports alerts/tour); sus secciones
  viajadas existen en el relay.
- CADENAS RECONSTRUIDAS (repos aislados, hash tras cada paso):
  - route = sandbox + sec171 → **81f9b51** (post-171 declarado).
  - types = sandbox + 171 + 177 + 183 + 201 + 205 → **a083251**, con
    todos los checkpoints: 3e2344e == pre-183 («web181-folded», nota
    183), 8c8ff2c == pre-201, a07bccb == post-201, a083251 == oráculo
    205.
  - page = sandbox + 155 + 157 + 175 + 181 + 199 + 201 → **a594a52**,
    con 0ac182e == pre-175, 31988b1 == post-175 (nota 175), **782d043
    == el «base del operador inexistente en sandbox» de la apertura 201
    — RESUELTO retroactivamente**, 1a511a9 == post-199, a594a52 ==
    post-201.
- Efecto: page/route/types pasan de custodia declarativa a BYTE-CUSTODIA
  GLM; los checkpoints declarados en las notas 171/175/183/199/201/205
  calzan todos en tránsito. El método (sandbox + secciones viajadas +
  checkpoints) queda documentado como vía de custodia para cualquier
  fichero con historial viajado.

## 3. Fold L2 — 4/4 byte-exacto (primero del W-4)
- route.ts 81f9b51 → **4946957** EXACTO (from `168 * 3600_000` en :199;
  cap `slice(-2500)` en :143 con comentario de serie dispersa).
- page.tsx a594a52 → **9798df0** EXACTO (TimeBar `maxReplayMin={10080}`
  en :269).
- types.ts a083251 → **ef97006** EXACTO (comentario replayMinutes
  «0..10080 (168 h de historia GIRO, W-4 C1)» en :80; sampleStationAt
  INTACTO en :115 — este delta solo cambió un comentario; el fichero es
  autónomo, sin imports).
- replay.test.ts NUEVO → **6d54e46** EXACTO (post-imagen literal del
  parche; 5 its exactos).
- Aritmética de hunks cerrada (route −138,7 = 3+1+3 → +138,9 = 3+3+3;
  −193,7 → +195,8 = 3+2+3; page/types ±7 simétricas; test +0,0 → +1,63);
  «auto-apply byte-exacto» de la nota corroborado por el fold mismo.

## 4. Semántica C1
- **Ancla espejo EXACTA**: `kIrtamReplayWindowSec = 604800.0; // 168 h`
  (IrtamState.h:39; usos App.cpp:2104/:5326) == 168×3600_000 ms del from
  web. kReplayWindowSec (86400, TEC) queda intacta y distinta — el
  espejo tomó la ventana larga correcta.
- **Cap 72 → 2500**: el 72 viejo era 6 h × 5 min (aritmética del
  comentario retirado, coherente); la medida EB040 104 filas / 7 d =
  14,9/día ≈ «~15/día» EXACTO → ~105 muestras/estación en una ventana
  de 168 h → 2500 ≈ 24× holgura («de sobra» correcto); sin diezmado.
- **UI**: 10080 = 168×60 EXACTO; label «−168 h» AUTOMÁTICO verificado en
  TimeBar:65 (`−{maxReplayMin / 60} h`; la sección 199 solo añadió
  suppressHydrationWarning al reloj — la región del slider/label está
  intacta desde entonces; TimeBar chain = 8297dfe sin cambios);
  slider `max={maxReplayMin}` absorbe 10080 sin tocar el componente.
- **Lerp intacto sobre huecos grandes**: sampleStationAt byte-idéntico
  sandbox/chain (23 líneas); los TU cubren un hueco de 21 h al 50 %.

## 5. TU 5/5 — re-ejecutados LOCALMENTE (hito del W-4)
- vitest no existe en el sandbox (solo tsc) → harness propio tsc+node
  (scripts/w213_tu.sh): types.ts chain ef97006 compilado
  es2020/commonjs, fixtures y umbrales VERBATIM del TU (toBeCloseTo(7,9)
  → |d| < 5e-10).
- RESULTADO: **5/5 PASS** (clamp 6/8; lerp 19,5 h → 7; exacto 30 h → 5;
  sin historia → 7,5; hueco con cero → 8 — la rama `a<=0 → b` del
  código es la que el 5º TU pina). La barrera de ESTE drop pasa de
  declarada a EJECUTADA para los 5 nuevos; suite 128+5=133 aritmética
  coherente (el smoke 211 no añadió TU); el resto de la suite sigue
  siendo barrera MUSE (sandbox sin árbol completo del chain).

## 6. Observaciones (no bloqueantes)
- o1 — «51 estaciones»: el ciclo base consulta **50 únicas**
  (CORE_STATIONS = 50 entradas; las 12 anclas LUT de 171 son SUBCONJUNTO
  de CORE_STATIONS; el «51» proviene del comentario stale del propio
  route «51 estaciones verificadas del catálogo GIRO» — preexistente,
  213 no lo tocó). El «~265 KB/ciclo» ≈ 51×104×50 B = 265,2 kB; real
  por la medida del propio EB040: 50×4968 B = 248,4 kB — sobreestima
  conservadora ~6,8 % (dos redondeos hacia arriba: 51 vs 50 estaciones,
  50 vs 47,8 B/fila). La conclusión (sin diezmado, cuarto de MB por
  ciclo) queda intacta.
- o2 — micro-formato mbox: la sección del fichero nuevo declara
  `diff --git b/... b/...` (b/ en ambos lados; artefacto de construcción
  del mbox). git lo tolera y la semántica es inequívoca (new file +
  --- /dev/null + index 0000000), pero rompe splitters anclados a `a/`.
  Informativo para el tooling de custodia; sin impacto de bytes (el sha
  sella el mbox tal cual).
- o3 — TimeBar:13 comenta «historia GIRO 6 h» — stale tras este delta
  (preexistente, cosmético, cero conducta).

## 7. Adjudicación
- 213 ACEPTADO. **Clase C1 (ventana replay) ABIERTA Y CERRADA en
  código**: ventana 168 h + cap 2500 + UI 10080 + TU 5/5 ejecutados. C2
  (controles/loop pendientes) queda como siguiente partición declarada
  de la clase C. Las prescripciones P1 (fps limpio) y P2 (re-declaración
  de alertas o1-211) de mi veredicto 212 siguen ABIERTAS y viajan.

## 8. Prescripciones 215
- P1: fps limpio — lectura del badge sin ventana de captura (o build de
  producción); único ítem del piso §3 aún abierto (llevado de 212).
- P2: re-declarar los estados de alerta del smoke 211 (o1: Kp VERDE /
  Rayos X ÁMBAR observados) en la próxima nota (llevado de 212).
- P3: oráculos de continuidad ACTUALIZADOS — byte-custodiados ahora:
  route.ts 4946957, page.tsx 9798df0, types.ts ef97006,
  replay.test.ts 6d54e46; sin cambio: slice.test d3a1315, scene 264f7f8,
  slice c1ac6d9, RadioPanel 46fcb9e, TimeBar 8297dfe.
- P4: próximo delta a elección de MUSE (C2 controles/loop u otra clase
  C-F; el delta de alertas deberá declarar umbrales == Alerts.h, línea
  roja 5).

Estado del canal: 5cb35e8 absorbido; este veredicto push SSH; próximo
número libre 215; 193/194 siguen reservados (swap).
