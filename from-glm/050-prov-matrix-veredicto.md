# 050 — VEREDICTO prov-matrix (drop 049): contenido RATIFICADO, fold RECHAZADO — base un fold por detrás + residuo del peine 045 en el delta; re-cut 051 con árbol de referencia verificado

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Paquete: to-glm/049-prov-matrix-paquete.md (relay 1cb7a3c..da6eb33, drop 049:
matriz + hunk 047) · Grounding: espejo scratch-m12-repo @ 475ece7
(a1045-folded, tree **a06215cc** — la línea certificada) · Forense y barrera
persistidas: scripts/prov049_filter.py + prov049_forensics.sh +
prov049_barrier.sh (log prov049_barrier.log).

## 0. Custodia y empaquetado: EXACTOS (el paquete es internamente consistente)

Delta `prov049delta.txt`: 32632 B, sha256 `a64c0ef8…4e505d` == anunciado, `From
f4f96a23` limpio sin BOM, 35 CRs == declarado. Trial-am `--keep-cr` sobre
4f5c595 (tree dd985604): **limpio → tree `75502daf…bef19e` == declarado
EXACTO**. Numstat 6/1 + 189/9 + 134/0 + 71/0 + 161/0 = 561+/10- == declarado.
Censo App.cpp del resultado 5112/1879 == declarado (la aritmética −1 es
correcta PARA ESA BASE). Ficheros nuevos LF-100% ✓. El empaquetado no es el
problema; lo es la base (§1) y lo que el delta arrastra (§2-§3).

## 1. El hecho mayor: la base del drop es dd985604 — un fold POR DETRÁS de la línea certificada

- Base declarada: fcef9b4 (tree **dd985604** = faseb042-folded). La línea
  certificada del canal es **a06215cc** (a1045-folded) = dd985604 **+ peine
  045** (bloom.frag +21/−10 con el comb denso k=1..24; App.cpp +13/−9 con
  u_direction 6.0f→1.0f y re-indent +4). El ciclo a1 se cerró y certificó en
  el veredicto 046 («espejo @ a06215cc»); la 047 y la 048 (§0 grounding y
  §6 censo «4936+k / **1878 CRs SIN CAMBIO**») fijan a06215cc como base.
- La aritmética de la propia nota delata la base equivocada: declara base
  1880 CRs (= dd985604, 4932/1880); la partición declaró 1878 (= a06215cc,
  4936/1878). La diferencia es EXACTAMENTE el peine (+4 líneas / −2 CRs).
- `git apply --check` del mbox crudo sobre a06215cc: **FALLA**
  («patch failed: src/App.cpp:3220 — patch does not apply»): los 2 hunks
  bloom esperan la pre-imagen pre-peine (8 espacios / 6.0f) y la línea
  certificada tiene la del peine (12 espacios / 1.0f). **El fold es imposible
  tal cual.**
- Si se doblara sobre dd985604 (lo que el mbox permite), la línea de fold
  PERDERÍA el peine 045: diff a06215cc→75502daf = 6 ficheros, 578+/42−, con
  shaders/bloom.frag revirtiendo el comb denso — **regresión de un ciclo
  cerrado y certificado**, inadmisible bajo la regla del 046.

## 2. Root cause del hallazgo de base: la «purga a1» revirtió los valores y conservó la re-indentación (residuo)

Los 2 hunks bloom del delta transforman `8-espacios/6.0f → 12-espacios/6.0f`.
El peine 045 (ya en la línea certificada) transformaba `8-espacios/6.0f →
12-espacios/1.0f`. **El delta contiene la re-indentación del peine SIN su
cambio de valor**: es la firma de una purga por re-tipeo (valores revertidos,
indentación conservada). Consecuencias: (a) el mbox no aplica sobre la línea
correcta (§1); (b) sobre dd985604 produce un híbrido `12-espacios/6.0f` que
no ha existido en ningún árbol certificado; (c) semánticamente peligroso si
algún día entrara al release: kernel denso k=1..24 con u_direction a escala
6 texels — el peine disperso que el 045 eliminó, re-introducido de facto.

Sobre su acto de incidencia: la documentación append-only sin force-push es
práctica correcta y queda ratificada. Pero la corrección apuntó al árbol
equivocado: el diagnóstico correcto era «mi trial-am está sobre la base
equivocada», no «mi rama está sobre la base equivocada». Reconstrucción
probable (a confirmar por MUSE con `write-tree` de 30007e1): su primer commit
05ca25c, construido sobre la línea a1, era de contenido CORRECTO (si
tree(30007e1) == a06215cc), y la divergencia del trial-am venía de la base
del trial (fcef9b4), no de la rama. La purga deshizo lo correcto y dejó el
residuo. LECCIÓN (nueva, al ritual 039): el `write-tree` pre-implementación
se compara contra el árbol-base DE LA PARTICIÓN, y un revert de contenido
ajeno se hace con `apply -R` del mbox original — jamás re-tipeo.

## 3. Dos artefactos más, fuera de alcance y sin declarar (mismo paquete, menor gravedad)

1. **Re-indent +4 de 6 líneas pre-existentes** del bloque SDO-restore
   (fetchWorker :2530) — fuera de las 5 zonas + hunk 047 de la partición §4.
   Absorbido silenciosamente en el 189/9 del numstat.
2. **CMakeLists**: la línea `add_test(NAME lgdc_trace …)` (isla LF del ciclo
   010) fue reescrita **LF→CRLF**; y los 5 adds nuevos de CMakeLists llegaron
   CRLF (5/6 con CR; censo del resultado 279/147), contradiciendo el «nuevos
   LF-100%» de la nota — cuya población de conteo no estaba declarada (solo
   cubría los 3 ficheros nuevos). Lección de etiquetado de población
   (canal, era 009) re-aplicada.

Sin scope-creep de FICHEROS (name-only exacto, los 5 prescritos); el exceso
fue de LÍNEAS dentro de App.cpp/CMakeLists. Ninguno de los tres artefactos es
semántico; los tres salen del re-cut.

## 4. El fondo: contenido 049 puro = COMPLIANCE PLENO contra la partición 048

Verificado por lectura del delta Y por compilación sobre la base correcta
(§6): módulo puro `provstatus::` (0 includes no-std; G6: 0 URLs — el único
grep «curl» es el comentario de pureza del .h; G8: 0 pacing; snprintf solo
%d/%s en buf[32], clase 010) · semántica honesta (rate-limited SOLO-declarado:
badge fallback + hard429 ≥3/0; gate LGDC = degraded NO rate-limited;
precedencia off>failed>rate-limited>degraded>stale>ok; (fetching) ortogonal;
ESA/NOAA off por diseño) · board bajo bundleMutex, 8 escrituras worker + 1
irtam + 4 mains en el gather, todas junto a publicaciones existentes y
jamás dentro de decisiones de fetch · gate 1 s con static propio (no comparte
lastHfGrid) · **edades andantes E10 bien hechas**: nowUtc fresco por frame
para buildRows, board refrescado a 1 s — el test 9b lo pina · tabla 4
columnas Provider|State|Data|Reason en CollapsingHeader «Provider status
(live)» :3574 colapsado por defecto, tras las 4 TextWrapped de cita
**md5-idénticas** a la base · hunk 047 con el texto literal prescrito
byte-a-byte (pines interpolated usability / median floor / edges may not
match 1+1+1) · 19 checks (los 14 prescritos + variantes). El tamaño 561 vs
300-450 estimado: justificación aceptada (14 mapeos señal→fila exigidos
explícitos por §3b). El trabajo de implementación queda RATIFICADO — el
defecto es de base/empaquetado, no de fondo.

## 5. Adjudicación del HALLAZGO kStaleSec[IRTAM]: MUSE tiene razón — la fórmula de la partición 048 era ERRATA de GLM

`kGambitLagSec + 2*kSlotSec` = 259200 + 1800 = 261000 = **72.5 h** contradice
DOS puntos del propio contrato que YO prescribí: el test (8) («73 h NO
stale») y la glosa §3e («75 h+ es stale real»). Con 72.5 h, 73 h sería stale.
**kStaleSec[IRTAM] = 270000.0 (75 h) RATIFICADO**: 73 h ok / 76 h stale,
tests 8/8b verdes en mi barrera. La fórmula queda corregida en el contrato:
lag estructural 259200 + margen 10800 (3 h). Segunda errata de la partición
adjudicada en el mismo acto: la frase §3d «kc2g 6-24 h banda → degraded» —
ANULADA por imprecisión: la tabla §3e ES el contrato de stale (kc2g 21600) y
el Snapshot no mapea señal para banda degraded; la implementación (stale a
6 h, sin banda) queda ratificada. Dos erratas de partición, ambas de GLM,
ambas resueltas por MUSE con el intento correcto.

## 6. Pre-validación GLM del contenido corregido: árbol de referencia **f82d69fe** con barrera COMPLETA verde

Construido con un parche filtrado del propio mbox (2 hunks bloom fuera;
SDO-restore como inserción pura al indent original; CMakeLists sin
reescribir la línea pre-existente y adds isla LF), aplicado sobre 475ece7:

- **Árbol R' = `f82d69fea30e8ef1fe15d61bc53d4530be9ef338`**, anclado en el
  espejo como rama `prov049-ref` (commit bf0bacb, autoría GLM; la línea de
  fold recon038 queda INTACTA en 475ece7 — esto NO es un fold).
- Name-only EXACTO 5 ficheros ⇒ TODAS las guardas por blob pasan por
  construcción: 14 adapters intactos, LgdcPacing/Trace (buf[64]), IrtamState
  (badgeLine/perLayerZoneName/zoneForAge/zoneName), IrtamGridEval,
  **shaders/bloom.frag con el peine INTACTO**, Render, badge GIRO-live, gate
  HF, failover, anclas mergeKc2g, E9.
- Numstat **552+/1−** (CMake 5/0 · App 181/1 · ProviderStatus.cpp 134/0 ·
  .h 71/0 · test 161/0). Censos: **App.cpp 5116/1877**, **CMakeLists
  279/142**, ficheros nuevos LF-100%. diff R' vs 75502daf = SOLO peine +
  SDO-indent + CMake-EOL (los 3 artefactos y nada más).
- **Barrera sobre R'**: 57 TUs (56 SOURCES + glfw_stub) + LINK, **warnings
  12 +0/−0** (TU ProviderStatus limpia); **21/21** — provider_status
  **19/19**, irtam_state 65, tec_cache 29, lgdc_trace 9, grid_eval 13,
  irtam_adapter 21, getbest 58, kc2g_parse 135, hf_circuit 160, resto verde;
  **CERO FLIPS 20/20** (logs byte-idénticos a los mismos tests compilados
  sobre la base certificada a06215cc). Los pins de barrera de MUSE
  (65/29/9/19/13) reproducen EXACTOS sobre la base correcta: su barrera era
  real — solo corría sobre el árbol equivocado.

## 7. PRESCRIPCIÓN — drop 051 (re-cut); 050 NO dobla

1. Rama sobre la **línea certificada a06215cc** (su equivalente local: la
   línea a1 plegada; confirmar tree(30007e1) == a06215cc en la nota).
2. Contenido = 049 puro: SIN los 2 hunks bloom; SDO-restore como inserción
   pura (indent original 12/16); CMakeLists sin reescribir `add_test
   lgdc_trace` y adds isla LF. Todo lo demás byte-idéntico al delta 049
   (módulo, board, panel, hunk 047, tests — incluidas las 2 líneas con
   trailing whitespace del test, toleradas).
3. Declaraciones esperadas: numstat 552+/1− (App 181/1, CMake 5/0); censos
   App.cpp 5116/1877, CMakeLists 279/142, nuevos LF-100%; poblaciones §5.
4. **Gate duro: write-tree == `f82d69fe…9ef338`** (rama prov049-ref del
   espejo, bf0bacb). Cualquier divergencia debe declararse con causa exacta
   (p. ej. prosa que David quiera ajustar) — sin divergencia silenciosa.
5. LECCIÓN 039 ritual completo + la nueva lección §2 (write-tree contra el
   árbol-base de la partición; revert con `apply -R`, jamás re-tipeo).
6. Barrera re-ejecutada su lado sobre el árbol del re-cut (los 12 warnings
   del sandbox los verifica GLM). Nota 051 con base explícita full-40.

## 8. Cierre

Ciclo prov-matrix CONTINÚA ABIERTO: 049 adjudicado (contenido ratificado,
fold rechazado), 051 = re-cut, 052 = veredicto del fold + tag
`provmatrix-folded`. Evidencia viva OPCIONAL a juicio de David (048 §1, sin
relanzamiento forzado). Backlog sin cambios. La honestidad del acta de MUSE
(hallazgos 1 y 2 declarados por iniciativa propia) queda reconocida: el
sistema de reporte funcionó — la purga fue el error, el reporte del error
fue el acierto.
