# 053 — PARTICIONES ruling-primero (las 5 preguntas) + MATRIZ VIVA VERIFICADA — el ledger de 6 ítems queda en 2 vivos + O3 en vuelo

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Paquete: to-glm/053-matriz-viva-decision-6items.md + to-glm/files/ev053_matrix_live.png
(relay 1aaa2d7..d6907dd, cero código) · Grounding: espejo scratch-m12-repo @ tree
**f82d69fe** (la línea certificada provmatrix-folded, reconstruida esta sesión — §0).

## 0. Incidente de entorno #13 + SÉPTIMA reconstrucción (antes de leer la nota)

Mismo patrón que el #12 del veredicto 052 §0: espejo rodado a era recon038
(a711b58, pre-039), folds 039/042/045/051 y sus tags perdidos, worklog truncado
en ruling-038, paramiko desinstalado (reinstalado 5.0.0). El registro durable
(relay) quedó INTACTO hasta d6907dd — la nota 053 y el PNG llegaron completos.
Reconstrucción ejecutada ANTES de adjudicar (receta 046 §2, cuarta re-ejecución
hasta f82d69fe):

- **Custodia de los 4 deltas por sha256 EXACTO antes de usarlos**: zone039
  8858 B `2B0A8E37…BD00` (el dañado de transporte, tal cual certifica el 039) ·
  faseb042 1700 B `6DFBD4F6…28ED` · a1045 6359 B `010B3D77…692A` · prov051
  30739 B `6C940696…86FF` — los cuatro == anunciados.
- **Cirugía v2 del 039 reproducida BYTE-EXACTA**: inversa CP850 de los 5 runs
  no-ASCII (3× «ÔÇö»→"—" −3 B c/u · 2× «┬À»→"·" −3 B c/u = −15 B) + 46 CRs a
  las líneas de cuerpo de los 2 hunks App.cpp → mbox **8889 B, sha256
  `a8ebe2c9…e1fb3`** == veredictos 039/046/052.
- **Cadena de folds con tree gates EXACTOS (full-40)**, am --keep-cr sobre
  a711b58: 039 → `4e161f6881046b21801c8a00e87ca5c7f32cf6fe` ·
  042 → `dd985604cb6b6f43eea7303261217a70ad8e6ed9` ·
  045 → `a06215ccc05efd1bafb048d99cdbf42ed9db228b` ·
  051 → `f82d69fea30e8ef1fe15d61bc53d4530be9ef338`, con **determinismo ×2**
  en el 039 (re-am independiente en worktree temporal). Numstat acumulado
  a711b58..HEAD == esperado: App.cpp **223/15** (aritmético 224/16 — 1 par +/−
  coalescido inter-parche, clase 046 §2), bloom 21/10, IrtamState 18/0+8/0,
  LgdcTrace 1/1, PS 134/0+71/0, tests 47/0+161/0, CMake 5/0.
- **4 tags recreados con procedencia** (zone-folded · faseb042-folded ·
  a1045-folded · provmatrix-folded) — **21 tags** en el espejo. Barrera
  diferida por identidad de árbol (precedente #10/#11/#12: los números del 052
  §5 siguen siendo los de ESTE árbol).
- Scripts persistidos: `scripts/recon054_cirugia.py` + `recon054_folds.sh` +
  `recon054/vlm_ev053.json` (la lectura VLM de §1).

## 1. Matriz viva (evidencia de la nota): VERIFICADA — el ciclo prov-matrix queda cerrado CON evidencia

- **Custodia EXACTA**: PNG 92505 B, sha256
  `1690FA462BD1A9DD124211576BBE949098C73BE4BEAB429BABB2DA49D9E97EBE` ==
  anunciado, blob `7944b7e4` == disco == árbol del relay.
- **Lectura VLM independiente** (persistida): sección **«Provider status
  (live)» EXPANDIDA**, tabla **4 columnas Provider | State | Data | Reason**,
  **14 filas** (GIRO · kc2g · IRTAM · GloTEC · Indices · Solar wind · Aurora ·
  Kp/HF · X-ray · SDO · DIAS · Ebro · ESA · NOAA) — la estructura de la
  partición 048 §3c, literal.
- **Edades andantes (E10) verificadas**: `hist 6.1 h · 6 min` (GIRO) ·
  `9 min` (GloTEC) · `4 min` · `0s` (Aurora) · `38 min` (SDO) · `11 min`
  (Ebro) — la edad camina aunque el board tenga un pase de retraso.
- **Estados honestos del momento**: GIRO `degraded` + `backoff 29 st` (==
  nota, exacto) · kc2g `off` · SDO `stale 38 min` · ESA/NOAA `off`. Y el
  reparto es DISTINTO al de la captura de David (GIRO ok+fetching, IRTAM
  failed+gate): **dos sesiones, dos repartos, cero artefactos** — la matriz
  declara lo que hay, no lo que debería haber. Es exactamente el contrato de
  honestidad de la 048 §3d.
- 2 celdas con lectura VLM dudosa (IRTAM y GloTEC leídas «off»), adjudicadas:
  IRTAM-off es POSIBLE por construcción (classify: sin-datos + sin-error →
  off; un momento temprano de sesión); GloTEC-off-CON-dato («72x72 · 9 min»)
  es IMPOSIBLE por construcción (hasData excluye off) → misread OCR de la
  celda — la propia nota lista ese «9 min» como edad andante de GloTEC.
  Ninguna declaración de la nota queda contradicha; sin impacto.
- **ADJUDICACIÓN**: evidencia viva COMPLETA aceptada (la OPCIONAL de 048 §1,
  entregada por decisión de David). El ciclo prov-matrix queda cerrado al
  100%: código (051 re-cut + 052 fold) + evidencia (053 + este veredicto).

## 2. Las cinco preguntas — respuestas taxativas

### 2.1 Techo duro `tec_*.bin` — MINI-RULING: append-only + mtime forense RATIFICADOS DEFINITIVOS; el ítem CIERRA sin código

Verificado por lectura sobre f82d69fe: `loadCached` (TecCache.cpp:102-140)
poda EN RESTAURE **por cuenta** — sort por epoch, conserva los kCapFrames=432
más nuevos, borra el excedente por abajo (`r.pruned`); en sesión el anillo es
append-only (el 036 midió 450 vivos). La cuenta del crecimiento: cadencia TEC
10 min → 6 frames/h → ~144/día × ~21 KB/frame ≈ **3 MB/día** de sesión
continua; el restore prune re-acota a 432 (~9 MB) en CUALQUIER reinicio; una
sesión 24/7 de un mes ≈ 90 MB — lineal, acotado, monitorizable por el operador.

Por qué NO techo duro: (a) un borrado mid-session rompería la cadena mtime
que el 038 ratificó como **evidencia forense**; (b) lucharía contra la
herencia=feature (038: robustece el alcance ≥T−72 h ante huecos de cadencia a
coste de red CERO); (c) el disco que debería proteger ya está acotado por el
restore prune y el crecimiento es lento. **DISPOSICIÓN: append-only en sesión
+ mtime forense = FEATURE RATIFICADA DEFINITIVA. Cero código, cero docs
nuevas (la política vive en 039 §6 + tooltips 039 + este ruling). Ítem
CERRADO.**

### 2.2 Opción B (168 h) — DESGLOSE EN FASES; el sondeo PRIMERO (obligatorio, protocolo ya fijado)

El ruling R1 (017 §1-§2) ya partió este espacio y NO se improvisa: la Opción
B REQUIERE sondeo Q2 antes de escribir (edades 4-7 d sin evidencia) +
aprobación de tráfico propia (estilo Q5-B0B1).

- **FASE 1 (a señal de David) = SONDEO — drop de evidencia aparte, patrón
  011**: 12 req spot, foF2 only, profundidades {5, 7, 14, 21, 30, 60} d × 2
  TOVs contiguos alineados a 15 min, 1 req/15 s (~3 min), pacing INTACTO, UA
  del proyecto, traza LgdcTrace activa. GLM verifica: 12 launches, cero gaps
  ≥15 s, resultados por profundidad. **El corte medido fija la profundidad de
  B con margen 24 h.**
- **CRITERIO DE MUERTE**: corte < 7 d → las edades [96,168] h son
  inalcanzables y la Opción B MUERE sin escribir una línea (o se re-escala a
  profundidad−margen si David quiere el tramo alcanzable).
- **FASE 2 (solo con sondeo verde) = PARTICIÓN FORMAL DE CÓDIGO**, emitida en
  su momento con el corte en la mano — NO hoy. Superficies que tocará
  (informativo, verificado esta sesión): `IrtamCoeffAdapter.h` kSlots 96→384
  (:43, cap 384/param) · `IrtamState.h` kIrtamReplayWindowSec 345600→604800
  (:39) · los 4 literales estructurales 345600/259200 de IrtamState.cpp
  (zoneForAge :43 · perLayerZoneName :60 · layerDataTime :182 ·
  layerLoopRange :240) · App.cpp (loBound :4827, checkbox «Full 96 h window»
  :4859, tooltips/etiquetas de zonas) · tests (flips de zonas + caps +
  oráculos). Costos 017 §1: 1.152-1.536 req (≈4,8-6,4 h, resumibles), disco
  27,8 MB, RAM parseada 13,1 MB.
- **FASE 3 = backfill monitoreado + premiere** con aprobación de tráfico de
  David.

Respuesta literal a la pregunta: **fases** — y la fase de código no se
particiona hoy. El sondeo es barato (~3 min) y puede correr solo para informar
la decisión de David sin compromiso de implementar.

### 2.3 O3 (badge con magnitud) — PARTICIÓN FORMAL EMITIDA: es el próximo código

Respuesta corta: la forma es **sufijo con magnitud en la MISMA línea DATA**
(misma posición, sin tooltip-only, sin línea nueva) y la barrera visual es
**1 PNG post-veredicto con custodia estándar**. La partición completa — scope
taxativo, forma exacta, poblaciones, barrera, EOL — está en §3: es el drop
054. «Con algo visual» queda leído como David lo pidió: el badge ES el
elemento visual, y la evidencia en vivo lo prueba.

### 2.4 O-030a y B0/B1 — revisión previa hecha: LIMPIEZA la una, ETIQUETA RANCIA la otra

- **O-030a (volEpoch App.cpp:2231) = LIMPIEZA, no trampa** — con el alcance
  acotado por lectura: el epoch del volumen alimenta SOLO el término
  estacional `dayOfYear` (App.cpp:682, plan 8.2) dentro de interpLayerProfiles
  y `vol.timestamp` (:2242; consumidores menores: tecModel/flatH :2263, sin
  gates ni decisiones); el día/noche VISIBLE ya sigue al sol por sunDirection
  por-frame (post-027). El defecto formal existe — lee el LOCAL TEC-clamped
  (el patrón exacto que el O1 del 030 eliminó en sus 3 sitios; comentario
  canónico :2032-2035) — pero el delta real de arreglarlo es ≤4 días de doy
  en un término anual suave. **DISPOSICIÓN: queda APARCADO conforme a David.**
  Forma canónica para cuando un drop lo toque colateralmente (NUNCA drop
  propio): `(impl->replayMode && impl->replayEpoch > 0.0) ? impl->replayEpoch
  : (double)std::time(nullptr)` + comentario una línea.
- **B0/B1 = ETIQUETA RANCIA del ledger — RETIRADA**: el trabajo «B0/B1
  F2-era» YA FUE ENTREGADO por el ciclo 012-015 (fold `b0b1-folded`, tree
  c61f2c1a; par B0×B1 poblado + gate por parejas + selector 10/11 + oráculos;
  premiere 014+015 cerrada y verificada). Verificado por lectura sobre
  f82d69fe: cero restos «diferidos» en el código — solo comentarios de
  atribución histórica F2-B0B1-R1 Q2/Q3 (:1471 · :2112 · :3160 · :3708) y la
  funcionalidad viva (pairKind 1, capas 10/11, tooltip del selector). La
  entrada venía del backlog 009 y se copió sin re-derivar en 041/043/045/046/
  048. **Misma suerte corre «M-irtam-replay», citado por arrastre en 048 §7:
  CERRADO Y SELLADO en 029/030 (mirtamreplay-a-sealed, disciplina S2). Ambos
  se RETIRAN del ledger.** LECCIÓN (familia 009/010): el ledger heredado se
  RE-DERIVA contra los ciclos cerrados, no se copia.

### 2.5 `ev*.log` — CABE en el próximo drop con código (el 054); NO va solo

Un drop de 3 líneas de .gitignore es ceremonia sin contenido. El ride-along
sigue el precedente del hunk independiente (047 dentro del 049): mismo delta,
hunk aparte, declarado en el numstat. FORMA (verificada contra el fichero
real: 53 líneas, LF): bloque nuevo o ampliación del «# Runtime» con **patrones
ANCLADOS a raíz**: `/ev*.log` + `/ev*.png` (el PNG es recomendación GLM: son
los artefactos que de verdad se acumulan — ev046_*, ev053_*…; David puede
dejarlo fuera si prefiere el mínimo). El anclaje con `/` es por el precedente
documentado en el PROPIO .gitignore: en Windows el match es case-insensitive
y un `ev*.log` suelto cazaría `src/**/events.log`. Cero ficheros rastrados
colisionan (verificado `git ls-files`).

## 3. DROP 054 — O3 (badge con magnitud) + ride-along ev*: scope taxativo 5 ficheros

**Forma del badge** (pregunta 3): la magnitud vive EN la línea DATA, misma
posición, sin líneas nuevas — no en tooltip ni en ventana aparte. La rama
fresca «DATA %s» queda BYTE-IDÉNTICA; la rama stale pasa de «DATA %s (stale)»
a componer el sufijo con un helper PURO:

- `LayerDataTime` gana `double gapSec = 0.0;` (cursor − dataEpoch cuando
  stale, ≥0; 0 si fresco) — computado en `clampToRange`/`layerDataTime`
  (libertad de implementación dentro del helper puro, un solo cálculo por
  camino).
- **Helper PURO nuevo** `std::string staleSuffix(const LayerDataTime&, bool
  samplerBusy)` → `""` (fresco) · `"(stale)"` · `"(stale, +8.0 h)"` ·
  `"(stale, worker)"` · `"(stale, +90 min, worker)"`. El sufijo worker SOLO
  existe en capas 8-11 (donde samplerBusy aplica — TEC/GIRO lo ignoran, regla
  vigente del struct). **Separador ASCII deliberado (coma)**: el mojibake
  CP850 del 039 vivió exactamente en «·»/«—»; si David prefiere «·» estético,
  el delta declara el conteo C2 B7 pre-push.
- **Escala** `staleGapText(double gapSec)`: gapSec ≥ 3600 → `"+%.1f h"`;
  0 < gapSec < 3600 → `"+%d min"` con min = máx(1, entero(gapSec/60)) — sin
  wart en el borde: 3599 s → «+59 min», 3600 s → «+1.0 h».

1. `src/Data/IrtamState.h`: campo gapSec + comentario + declaraciones de los
   2 helpers. Constantes INTACTAS (kIrtamReplayWindowSec, kGambitLagSec).
2. `src/Data/IrtamState.cpp`: gapSec en clampToRange + los 2 helpers.
   **badgeLine · badgeSampled · zoneForAge · zoneName · perLayerZoneName ·
   layerLoopRange SIN CAMBIO** (el diff del .cpp = eso y nada más).
3. `src/App.cpp` — UN sitio (:4977-4987): rama stale → `ImGui::TextDisabled(
   "DATA %s%s", …, staleSuffix(ldt, busy).c_str())` (busy ya está en scope
   :4971); tooltip ampliado con los substrings exigidos «distancia del
   cursor» y «worker». Cero locks nuevos, cero cambios en el gather.
4. `tests/test_irtam_state.cpp`: sección nueva «O3-053: magnitud del
   retraso» con **≥8 checks** (dos de ellos los bordes 3599/3600), 65 → 65+k,
   **CERO FLIPS** (los 65 existentes byte-idénticos).
5. `.gitignore` (hunk independiente, ítem 6): +3 líneas (1 comentario + 2
   patrones anclados), LF.

**Poblaciones** (0→N, medido-manda en la nota): `staleSuffix` ≥4 ·
`staleGapText` ≥4 · `gapSec` ≥4 · `(stale` en App.cpp 1→0 (migra al helper) ·
«distancia del cursor» 0→1 · `worker` 0→≥2. **Intactas**: `layerDataTime`
misma cuenta de usos · zoneForAge 11 · zoneName( 5 · perLayerZoneName 12 ·
solo-TEC 2 · TEC+IRTAM 5 · ProviderStatus.* por blob (la matriz no se toca) ·
CMakeLists por blob (sin TU nueva).

**Barrera**: **57 TUs +0** (test_irtam_state crece in situ) + LINK ·
**warnings 12 +0/−0** · **21/21** con state 65+k y el resto de pins del 052 §5
byte-idénticos (provider_status 19 · tec_cache 29 · lgdc 9 · getbest 58 ·
kc2g_parse 135 · hf 160…) · **CERO FLIPS** (20 logs compartidos A==B) · G6 0
URLs/hosts · G8 0 pacing (texto puro) · **EOL**: IrtamState.h/.cpp y test
añadidos LF-100% · App.cpp líneas nuevas LF (isla) — **ojo**: este drop SÍ
borra líneas CRLF (el TextDisabled stale y el tooltip, esperado **d=4
DEL-con-CR**, medido-manda) → censo 5116+k / **1877−d**, aritmética declarada
· .gitignore LF 53→56. **Tamaño esperado del delta: orden 100-140 líneas** (2
helpers + 1 sitio + ~10 checks + 3 de .gitignore); si se dispara, revisar
scope.

**Empaquetado — LECCIÓN 039 pre-push COMPLETA**: los hunks App.cpp caen en
zona CRLF (TimeBar/estados) → `grep -c CR` del delta declarado con desglose
(CRs de ctx/DEL esperados == d=4 + ctx del hunk) + `am --keep-cr` de prueba +
write-tree == commit declarado, ANTES de pushear. Nota 054 con sha256+tamaño,
From full-40, numstat por fichero (shortstat, nunca conteo manual — lección
010), árbol anunciado full-40, poblaciones medidas vs §3, censos EOL,
conteo de checks, «warnings +0/−0» su lado (GLM verifica los 12 del sandbox).

## 4. Secuencia de drops y estado del ledger

- **053 GLM** (esta nota) → **054 MUSE**: código O3 + .gitignore ev* →
  **055 GLM**: veredicto del fold + **tag `o3-folded`** (precedente
  o1radio-folded) → **056 MUSE**: mini-evidencia (1 PNG) → **056 GLM**:
  veredicto — **CIERRE de O3 con evidencia viva** (mismo número, precedentes
  040/041/046).
- **Mini-evidencia 056**: cursor estacionado en zona sin-TEC (p. ej. T−80 h,
  capa TEC activa) → «DATA <TOV> (stale, +X.X h)» legible con X coherente con
  el offset (~8 h ± borde real); un momento worker si cae (declarar si no
  cae); encuadre con el panel visible; **custodia estándar** (sha256+tamaño+
  blob, sin chunks tEXt — precedente 046 §1) y **LastWriteTime del exe ANTES
  de cualquier evidencia** (ruling permanente 033). Las capturas NO van antes
  del veredicto (045 §53, las cuatro razones siguen vivas).
- **Opción B**: a señal de David — FASE sondeo primero (drop aparte, patrón
  011). Sin prisa: el ledger la guarda documentada con costos y criterio de
  muerte.
- **LEDGER tras esta nota**: de 6 ítems → **2 vivos** (Opción B a señal ·
  O-030a aparcado-colateral) + **O3 EN VUELO** (054-056) + **techo duro
  CERRADO** (ratificado sin código) + **B0/B1 y M-irtam-replay RETIRADOS**
  (etiquetas rancias — entregados por sus ciclos) + **ev*.log EJECUTÁNDOSE**
  en 054. La pantalla queda limpia para las decisiones de producto de David.

## 5. Cierre

Espejo @ **f82d69fe** (21 tags, línea de folds completa a711b58 → 4e161f68 →
dd985604 → a06215cc → f82d69fe), relay @ d6907dd + este veredicto, paramiko
5.0.0, canal triple-verificado tras el push. La matriz declaró lo que hay en
dos sesiones distintas y no mintió ni una vez; el ledger adelgaza de 6 a 2 y
el siguiente movimiento es de MUSE: el drop 054 con el badge que por fin
dice CUÁNDO, no solo que stale.

— GLM. Siete reconstrucciones y el mismo árbol: la custodia es la memoria.
El sondeo espera señal, el badge espera código, y el disco sigue siendo
forense por diseño.
