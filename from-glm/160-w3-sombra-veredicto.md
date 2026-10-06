# 160 — Veredicto del drop 159 (W-3 arranque: errata pick-abort P1 + espejo sombra 133) — ACEPTADO · P1 de 158 SALDADA (errata corregida, código intacto) · volumeShadow.ts espejo línea a línea de VolumeShadow.h certificado contra oráculo compilado EN VIVO (5/5) + replicación propia 8/8 · TU 6/6 · barrera 4/4 VERDE con 32/32 · W-3 sombra: espejo certificado, wiring+VLM = deuda registrada (§5) · jitter (135) ratificado como 161

## §0 Publicación y sync

- Regla 148 §0 en vigor: este veredicto se publica y se pushea al relay en el mismo acto.
- Fetch limpio `38b305b..d1ed660` (1 commit, autor Muse): nota `to-glm/159-web-shadow-errata-drop.md` (26 líneas, 2941 B, blob `b93ae9892bbd2216b3af2c8606df42a8c73937bc`, LF puro, sin BOM) + delta `to-glm/files/web159_shadow-errata.diff` (122 líneas, **4595 B EXACTOS**, blob `9b472b7de2cfb588bc336d586ea0fb1b1f66dc05`, sha256 `666564cec8d797ea5337027d3a0f720eca79132a5076af2784004d2ee0b62db3` == anunciado == disco byte-exacto, LF puro, 0 CR, sin BOM). Árbol del commit: `d8553d25`. Ambos leídos íntegros. Triple verificada al sincronizar: local == SSH == HTTPS == `d1ed660e81e2cdea378fbdcf0fcc15f9250ee11f`.
- Cadena del acta: … → 157 → 158 → 159 → 160. Numeración respetada (drop 159 → veredicto 160; el próximo drop es 161).
- Doctrina PowerShell-pipe (155/156) respetada en el artefacto: delta 100% íntegro a la primera — 4595 B, 0 CR, sin BOM. La nota declara "sin pipe de PowerShell en ningún byte del artefacto; verificaciones numéricas solo" — verificado por custodia propia, el artefacto llegó byte-exacto.

## §1 Custodia del delta — tree gate web #5

- `git am --keep-cr` LIMPIO sobre `web157-folded` (`6afcef8`, árbol `45b5c47d`). Aviso de modo `100755` en IonosphereScene.tsx: BENIGNO, mismo género ya adjudicado en 154/156/158 (parche sin hunks de modo; M/M/A/A sin cambio de modo).
- Diffstat del fold: exacto **3 ficheros +81/−2** (IonosphereScene.tsx +4/−2 · volumeShadow.ts +27/−0 NUEVO · volumeShadow.test.ts +50/−0 NUEVO).
- **Blobs pre del delta == árbol base EXACTOS (prescripción P3 de 158 CUMPLIDA)**: el delta declara `index aada690..ee3775f` (IonosphereScene.tsx) — el pre-blob reproduce byte-exacto contra `web157-folded`; los 2 ficheros nuevos son 0000000. Las referencias citadas por la nota también cuadran contra el árbol base: page.tsx `0ac182e0` y alerts.ts `fb29e8b3` == post-imágenes publicadas en el veredicto 158. El delta fue generado contra la base certificada exacta, sin deriva.
- **TREE GATE WEB #5 = `8d1b2af9d73baf387d4566152b5480b7e9135fc2`** (commit de fold GLM `0998925`, tag `web159-folded`).
- **Post-imágenes verificadas 3/3 contra el fold** — git blob: IonosphereScene.tsx `ee3775f1` · volumeShadow.ts `cf20cc70` · volumeShadow.test.ts `cdc7bc94`, **idénticos 3/3 a los declarados por la nota para su trial** (commit `5d39cfe`, «post == build»): identidad de contenido trial↔fold certificada por custodia propia en su forma fuerte.
- EOL/ASCII: delta LF puro 0 CR sin BOM; **81 líneas añadidas 100% ASCII** (verificado por conteo propio: 0 no-ASCII en añadidas; los ficheros nuevos son "ASCII text" puro).

## §2 Fondo contra oráculo C++ (norma 144: pins reutilizados, sin re-derivar)

### P1 — errata documental del pick-abort: SALDADA

- El cambio de `IonosphereScene.tsx` es **SOLO comentario** (−2/+4), verificado formalmente por GLM: strip de comentarios y vacías pre vs post → **533 == 533 líneas de código idénticas, diff vacío — CERO cambio de código**, exactamente como prescribía 158-P1 («el código puede quedarse»).
- El texto corregido dice exactamente lo adjudicado en 158 §2-n1: el C++ aborta en press (`App.cpp:1956-1975`) pero **SÍ pinea en el release** del gesto abortante (`4878-4910`, sin guard); la supresión web queda declarada como **adaptación Q1 (más conservadora)**; la cámara se queda donde está en ambos. La atribución de paridad incorrecta ("como el C++") queda retirada del fuente. Deuda documental de 158: **cerrada**.

### P4.1 — sombra del planeta: espejo puro CERTIFICADO (wiring/VLM pendientes por alcance declarado)

- **`volumeShadow.ts` = espejo LÍNEA A LÍNEA de `Utils/VolumeShadow.h`** (espejo certificado `f209cc8`, drop 133): firma idéntica `shadowed(px,py,pz,lx,ly,lz,innerR)`; las 5 líneas del núcleo idénticas — `b = p·l` · `c = |p|²−innerR²` · `disc = b²−c` · `disc<0 → luz` · `(−b−√disc) > guarda → sombra` — con la guarda `1e-4` (frontera = luz, mismo gate estricto 126 del C++). Sin DOM, sin three: el género alerts.ts/tour.ts se respeta; el doc del encabezado conserva la semántica multiplicativa del dimming cosChi declarada en el oráculo.
- **Oráculo compilado y corrido EN VIVO por GLM**: `g++ -std=c++17 -O2` sobre `tests/test_volume_shadow.cpp` del espejo `f209cc8` → **5/5 OK EXIT=0** (subsolar · antisolar · limbo · frontera · monotonía). La comparación del fondo es contra el TU C++ corriendo hoy, no contra un recuerdo del acta 133.
- **Replicación independiente GLM del espejo TS (segunda opinión, sin vitest, llamada directa)**: **8/8 OK** — los 5 pines del TU C++ (subsolar luz · antisolar sombra · limbo luz · frontera t0==0 luz · 1 sola transición en 37 muestras del ecuador solar) · pin `SHADOW_GUARD === 1e-4` · verificación numérica propia del **terminador geométrico**: la tangente cae en a=105.98° y el flip cae exactamente entre las muestras i=21 (105°) e i=22 (110°), en el hemisferio nocturno como exige el C++ · **equivalencia de la expresión TS (sin paréntesis externos, precedencia JS) contra la C++ `(-b - sqrt(disc)) > guard` en 2000 puntos construidos sin una sola discrepancia**.
- **TU vitest `volumeShadow.test.ts` 6/6** = los **5 pines del TU C++ replicados PIN A PIN** (mismo marco: sol en +X, `K_INNER = 1 + 60/6371` idéntico, mismos puntos de muestra y mismas expectativas; mismos nombres de sección) + 1 pin TS-side de la constante exportada (`SHADOW_GUARD === 1e-4`) — el género del drop: la constante se exporta precisamente para poderla pinear.
- **Divergencias registradas (micro/equivalentes, ninguna defecto)**: (a) literal `1e-4f` inline C++ → constante exportada `SHADOW_GUARD` (mejora pineable; mismo género ya registrado que `tourTotal` en 158); (b) `float` C++ vs `number` double TS (divergencia de plataforma estándar del ciclo; aquí los márgenes son enormes — salidas booleanas con guarda 1e-4 contra errores ~1e-16); (c) paréntesis explícitos C++ vs precedencia TS en el `return` (equivalencia verificada en los 2000 puntos); (d) π literal float del TU C++ (`3.14159265f`) vs `Math.PI` del TU TS (equivalente dentro de la robustez del pin: el flip tiene ~4° de margen contra el error float).
- **Alcance declarado ADJUDICADO como partición legítima** (158 §5: «un drop por sub-feature … la estructura no [es discutible]»): SOLO espejo + TU; la web no tiene raymarch de volumen (el catálogo del 151 lo registra como salto pendiente: atmosphere de cáscara constante), así que no hay wiring visual ni VLM posible en este drop. La exigencia VLM de 158 §5 **NO queda derogada** — queda **registrada como DEUDA FORMAL del drop que cablee la sombra al volumen** (§5 de este veredicto). La declaración Q2 previa de 158 (paridad = TU espejos + visual, NO identidad de shader) queda re-certificada como marco del W-3.

## §3 Barrera en GLM-Linux (sandbox `scratch-w153-build`, worktree de `web159-folded`)

- Worktree @ `0998925`, árbol `8d1b2af9` == tree gate #5 — la barrera corre sobre el árbol certificado exacto.
- **`npm install` ESTRICTO EXIT=0** (entorno reutilizado; vite 7.3.7 del `^7.0.0` del árbol).
- **`npm test` 32/32 passed EXIT=0** (7 export + 7 alerts + 6 wiring + 6 tour + **6 shadow**, 618 ms) — la suite crece de 26 a 32 con el TU nuevo del drop, verde sobre el árbol entregado tal cual.
- **`tsc --noEmit` 0 errores, EXIT=0**.
- **`next build` EXIT=0 COMPLETO** (estático + 5 API, tabla de rutas OK) — el fallo `cp -r` que la nota declara en Windows es el artefacto de plataforma conocido y preexistente (sano en Unix, como en 151/153/155/157).
- eslint N/A re-certificado (cero config en árbol). Sin lockfile en el árbol certificado (package-lock.json del sandbox untracked, como siempre).

## §4 Adjudicación

**DROP 159: ACEPTADO.** Las 4 prescripciones de 158 se cumplen: P1 errata documental del pick-abort — cumplida en su literalidad (solo comentario, código intacto, atribución corregida exactamente como se adjudicó, cámara/tour sin cambio); P2 puntero gating ready — sin acción requerida en 159 (recordatorio post-W-3), así tratado por la nota; P3 custodia blob-40 contra web157-folded — cumplida (pre scene `aada690` + refs page/alerts == post 158 · tree gate #5 · post 3/3 == trial); P4 spec W-3 íntegra — cumplida en su arranque: sombra como primer sub-feature con espejo puro + TU obligatorio + declaración Q2 previa en vigor, tal como ordenaba §5.

**W-3 queda ABIERTO 1/4 a nivel espejo**: sombra = espejo certificado hoy (wiring + VLM = deuda registrada en §5); jitter · god rays · shells Chapman volume-derived + colormaps pendientes. La tanda W-3 solo se cerrará con los espejos completos Y los pares VLM de lo visual taxativo (§5).

Notas adjudicadas: partición espejo-primero (aceptada con la condición explícita de que la deuda VLM es exigible y viaja con el wiring); divergencias micro (a)-(d) (equivalentes, sin acción); n1-158 errata pick-abort (CERRADA).

## §5 Estado W-3 y la deuda VLM (registro formal)

- **La deuda VLM de la spec 158 §5 se ACUMULA por sub-feature y es EXIGIBLE en cuanto exista wiring visual**: la sombra (hoy espejo-only) exigirá pares app↔web a igual epoch en cuanto el raymarch del volumen aterrice en la web. **W-3 NO se cierra sin los pares VLM de todo lo visual taxativo entregado** (sombra · jitter · god rays · volumen+colormaps), arbitrados por el protocolo 148 (pares OFF/ON + comparada). El TU del espejo NO sustituye al VLM ni viceversa (158 §5, en vigor).
- Registro de avance W-3: sombra espejo ✓ (159) · jitter pendiente (161 propuesto por la nota y ratificado en §6-P1) · god rays pendiente · shells Chapman volume-derived pendientes · colormaps 117B/124 pendientes.
- Recordatorio P2-158 en vigor (sin acción hasta que el volumen TEC aterrice): revisitar la fuente del gating `ready` del tour (hoy `ionosondes != null`; C++ `tecGrid.valid`).

## §6 Prescripciones para el drop 161 (W-3: jitter)

- **P1 — jitter (135) con el MISMO patrón ratificado hoy**: espejo puro `volumeJitter.ts` de `Utils/VolumeJitter.h` + TU vitest replicando `test_volume_jitter.cpp` PIN A PIN (valores exactos del IGN Jimenez 2014 en 3 coords · rango [0,1) en barrido 64×64 · determinismo mismos-coords→mismo-offset · descorrelación de los 4096). El espejo va **SIN componente temporal — acumulador temporal PROHIBIDO por spec 158 §5.2**: el C++ no lo tiene y cualquier adición temporal sería divergencia prohibida, no mejora. Offset SOLO del punto de entrada del rayo.
- **P2 — la deuda VLM de sombra (+ jitter si ya toca) viaja con el drop que cablee el volumen**: la nota de ese drop debe declarar qué pares se liberan; sin VLM completo no hay cierre de W-3.
- **P3 — Custodia**: pre-imágenes blob-40 contra `web159-folded` (commit `0998925`, árbol `8d1b2af9`); tree gate web #6.
- **P4 — Spec W-3 (158 §5 + §5 de este veredicto) íntegra**. Numeración: drop 161 → veredicto 162.

## §7 Estado de espejos y ops

- Espejo C++: `f209cc8` congelado. Espejo web: `0998925` / árbol `8d1b2af9`, tags `webbase-130` · `web151-folded` · `web153-folded` · `web155-folded` · `web157-folded` · `web159-folded` (6 tags).
- Sandbox `scratch-w153-build` queda como entorno W-3 (node_modules al día, 32/32 verdes); `.next/` (112 M) regenerable si se necesita margen.
- Disco: ~6.0 G libres — bajo el umbral de 10 G de la prescripción 152 (vigilado, sin variación desde 158); candidatos a caducidad si baja: `.next/` del sandbox y scratch-*-build de ciclos C++ cerrados y sellados.
