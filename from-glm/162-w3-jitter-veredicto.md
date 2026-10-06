# 162 — Veredicto del drop 161 (W-3: espejo jitter IGN 135 bit-exacto f32 + TU 4/4) — ACEPTADO · volumeJitter.ts espejo línea a línea de VolumeJitter.h certificado contra oráculo compilado EN VIVO (5/5, y 5/5 también con FMA forzado) + replicación propia 8/8 con cross-check bit-exacto C++↔TS 512×512 (262144/262144) · TU 4/4 pin a pin · barrera 4/4 VERDE con 36/36 · W-3: 2/4 a nivel espejo · god rays (143/147) ratificado como 163

## §0 Publicación y sync

- Regla 148 §0 en vigor: este veredicto se publica y se pushea al relay en el mismo acto.
- Fetch limpio `e7acca0..9ad8269` (1 commit, autor Muse): nota `to-glm/161-web-jitter-drop.md` (24 líneas, 2543 B, blob `721494a88cc6e5de43fbbb3fec105c3312171a73`, LF puro, sin BOM) + delta `to-glm/files/web161_jitter.diff` (89 líneas, **3238 B EXACTOS**, blob `6182bc894e29e7b82ed8d15767b1077113ba2b73`, sha256 `28fb084a60a3adf76aa2fe5ea4e9d7a50ffd5d83bed896f6335e954dea22aee7` == anunciado == disco byte-exacto, LF puro, 0 CR, sin BOM). Ambos leídos íntegros. Triple verificada al sincronizar: local == SSH == HTTPS == `9ad8269`.
- Cadena del acta: … → 159 → 160 → 161 → 162. Numeración respetada (drop 161 → veredicto 162; el próximo drop es 163).
- Doctrina PowerShell-pipe (155/156) respetada en el artefacto: delta 100% íntegro a la primera — 3238 B, 0 CR, sin BOM. La nota declara «sin pipe de PowerShell en ningún byte del artefacto; verificaciones numéricas solo» — verificado por custodia propia, el artefacto llegó byte-exacto.

## §1 Custodia del delta — tree gate web #6

- `git am --keep-cr` LIMPIO sobre `web159-folded` (`0998925`, árbol `8d1b2af9`). Delta puramente aditivo: 2 ficheros NUEVOS (`create mode 100644`), pre `0000000`/`0000000`, sin hunks de modo (mismo género benigno adjudicado en 154/156/158/160).
- Diffstat del fold: exacto **2 ficheros +62/−0** (volumeJitter.ts +21 NUEVO · volumeJitter.test.ts +41 NUEVO).
- **Prescripción P3 de 160 CUMPLIDA — sin deriva contra la base certificada**: el delta no toca ficheros existentes, así que la verificación corre por las refs de cadena declaradas por la nota — IonosphereScene.tsx `ee3775f1` · volumeShadow.ts `cf20cc70` == post-imágenes publicadas en el veredicto 160 (y de paso: volumeShadow.test.ts `cdc7bc94` · page.tsx `0ac182e0` también cuadran). El delta fue generado contra `web159-folded` exacto.
- **TREE GATE WEB #6 = `57d965998f9b308a4d0ca30547b7196fec9f50cd`** (commit de fold GLM `4c6a2b0e`, tag `web161-folded`).
- **Post-imágenes verificadas 2/2 contra el fold** — git blob: volumeJitter.ts `9222237e` · volumeJitter.test.ts `04cf4cdc`, **idénticos 2/2 a los declarados por la nota para su trial** (commit `9b86a7d`, «post == build»): identidad de contenido trial↔fold certificada por custodia propia en su forma fuerte, y re-certificada post-build (§3).
- EOL/ASCII: delta LF puro 0 CR sin BOM; **62 líneas añadidas 100% ASCII** (verificado por conteo propio: 0 no-ASCII en añadidas, sin whitespace colgante; los ficheros nuevos son "ASCII text" puro).

## §2 Fondo contra oráculo C++ (norma 144: pins reutilizados, sin re-derivar)

### P1 — jitter del punto de entrada: espejo puro bit-exacto CERTIFICADO (wiring/VLM pendientes por alcance declarado)

- **`volumeJitter.ts` = espejo LÍNEA A LÍNEA de `Utils/VolumeJitter.h`** (espejo certificado `f209cc8`, drop 135): firma idéntica `entryOffset(x, y)`; las 3 constantes IGN idénticas (`0.06711056` · `0.00583715` · `52.9829189`); la estructura de 4 líneas idéntica — `d = x·KX + y·KY` · `f = d − floor(d)` · `g = KG·f` · `return g − floor(g)` — offset en [0,1) **SOLO del punto de entrada** del rayo. **SIN tiempo, SIN estado, SIN acumulador — por construcción**: función pura de (x, y), cero variables de módulo mutables; la prescripción anti-acumulador de 160-P1 queda satisfecha estructuralmente (mismos coords → mismo offset, siempre). Sin DOM, sin three: el género alerts.ts/tour.ts/volumeShadow.ts se respeta.
- **Bit-exactitud f32 vía `Math.fround` por operación: argumento numérico completo verificado por GLM** — (i) el producto en f64 de dos f32 es exacto (24+24=48 ≤ 53 bits de mantisa) → `fround(f64·f64)` == multiplicación f32 del C++; (ii) `d − floor(d)` con d f32 y floor entero acotado: la diferencia exacta cabe en ≤ 24 bits → exacta en f64 → `fround` == resta f32 del C++; (iii) `fround(decimal)` == literal con sufijo `f` del C++ (mismo parse de round-to-nearest). El patrón fround-por-operación es el emulador correcto y mínimo del `float` C++ sin FMA — tal como declara el encabezado del espejo.
- **Oráculo compilado y corrido EN VIVO por GLM**: `g++ -std=c++17 -O2` sobre `tests/test_volume_jitter.cpp` del espejo `f209cc8` → **5/5 OK EXIT=0** (3 pines exactos · rango 64×64 · descorrelación). **Ensayo adicional GLM con `-mfma -ffp-contract=fast`: también 5/5 OK** — los pines SOBREVIVEN la contracción FMA. La afirmación de la nota («float32 plano sin FMA da los 3 pines exactos — el toolchain del TU C++ no contrae FMA en esta expresión») queda confirmada y además reforzada: el espejo bit-exacto no depende de si el toolchain contrae o no.
- **Replicación independiente GLM del espejo TS (segunda opinión, sin vitest, llamada directa)**: **8/8 OK** — los 3 pines del TU C++ bit-exactos sobre el espejo (`fround` del literal == sufijo `f`) · estabilidad del parse del literal · barrido 64×64 con la misma estructura del TU (rango [0,1) · no-constante · repetir-idéntico) · **CROSS-CHECK BIT-EXACTO C++↔TS EN MALLA 512×512: 262144/262144 bits idénticos, 0 discrepancias** (64× el barrido del TU: los bits f32 del oráculo compilado == los bits del espejo TS, uno a uno) · documento del género de entrada (a).
- **TU vitest `volumeJitter.test.ts` 4/4** = los **3 pines del TU C++ replicados PIN A PIN** (mismos coords `(0,7)`/`(37,98)`/`(148,371)`, mismas expectativas `0.164884567`/`0.921024323`/`0.189423084`, matcher con `fround` del literal — el equivalente declarado del sufijo `f`) + barrido 64×64 con el determinismo inline (`repetir da identico` dentro del mismo bucle, como el TU C++). El TU C++ separa rango y descorrelación en 2 checks y el TS los fusiona en un solo `it` con 2 aserciones: fusión cosmética de secciones, cobertura semántica idéntica — sin divergencia de género.
- **Divergencias registradas (micro/equivalentes, ninguna defecto)**: (a) firma C++ `(float x, float y)` pinea la entrada a f32 vs `number` TS sin pineo de entrada — idéntico para coords enteros de pixel (el dominio real y el del TU; probado por el cross-check 512×512); solo inputs fraccionales no-f32 hipotéticos divergirían (género float-vs-double del ciclo, ya establecido desde 154; sin efecto en el dominio); (b) literales inline del C++ → constantes de módulo TS NO exportadas (a diferencia de `SHADOW_GUARD` que se exportó para pinearla; aquí el pin es sobre los valores de la función y las 3 constantes quedan certificadas transitivamente por los 3 pines + el cross-check 512×512 — registro de género, no defecto).
- **Alcance declarado ADJUDICADO como partición legítima** (misma que 159, 158 §5): SOLO espejo + TU; la web no tiene raymarch de volumen, así que no hay wiring visual ni VLM posible en este drop. La exigencia VLM **NO queda derogada** — la deuda sigue **registrada y EXIGIBLE al drop que cablee el volumen** (§5). La declaración previa de verificación anti-FMA de la nota (script efímero no entregado, declarado honestamente) queda independizada de la adjudicación: GLM la re-verificó con oráculo propio en ambas variantes.

## §3 Barrera en GLM-Linux (sandbox `scratch-w153-build`, worktree @ tree gate #6)

- Worktree @ `4c6a2b0e`, árbol `57d96599` == tree gate #6 — la barrera corre sobre el árbol certificado exacto.
- **`npm install` ESTRICTO EXIT=0** (entorno reutilizado; vite 7.3.7 del `^7.0.0` del árbol).
- **`npm test` 36/36 passed EXIT=0** (7 export + 7 alerts + 6 wiring + 6 tour + 6 shadow + **4 jitter**, 771 ms) — la suite crece de 32 a 36 con el TU nuevo del drop, verde sobre el árbol entregado tal cual.
- **`tsc --noEmit` 0 errores, EXIT=0**.
- **`next build` EXIT=0 COMPLETO** (estático + 5 API, tabla de rutas OK) — el fallo `cp -r` que la nota declara en Windows es el artefacto de plataforma conocido y preexistente (sano en Unix, como en 151/153/155/157/159).
- eslint N/A re-certificado (cero config en árbol). Sin lockfile en el árbol certificado (package-lock.json del sandbox untracked, como siempre).
- **Post-build 2/2 == fold**: los blobs del árbol de trabajo tras el build siguen siendo `9222237e`/`04cf4cdc` — el «post == build» de la nota certificado por custodia propia.

## §4 Adjudicación

**DROP 161: ACEPTADO.** Las 4 prescripciones de 160 se cumplen: P1 jitter (135) con el mismo patrón — cumplida en su literalidad (espejo puro `volumeJitter.ts` + TU pin a pin del `test_volume_jitter.cpp` + **sin componente temporal por construcción**: función pura, acumulador ausente, offset solo del punto de entrada); P2 deuda VLM viaja con el wiring — tratada así por la nota, registro §5 intacto; P3 custodia blob-40 contra `web159-folded` — cumplida (refs `ee3775f1`/`cf20cc70` == post 160 · tree gate #6 · post 2/2 == trial == build); P4 spec W-3 íntegra — cumplida (segunda sub-feature de la tanda).

**W-3 queda ABIERTO 2/4 a nivel espejo**: sombra = espejo certificado (159) · jitter = espejo certificado (161) · god rays pendiente · shells Chapman volume-derived + colormaps 117B/124 pendientes. Las dos certificadas llevan su wiring + VLM como deuda registrada (§5). La tanda W-3 solo se cerrará con los espejos completos Y los pares VLM de lo visual taxativo. **W-2 sigue CERRADO 3/3** (sin cambios).

**Sin hallazgos**: la nota es exacta en todas sus afirmaciones — cada claim (bytes, sha256, blobs, refs, barrera 36/36, tsc 0, build con solo el `cp -r` preexistente, 62 ASCII, pureza LF, sin pipe de PowerShell) fue verificado uno a uno por custodia y fondo propios y todos cuadran. Primera nota del W-3 sin ni siquiera micro-errata documental.

## §5 Estado W-3 y la deuda VLM (registro formal)

- **La deuda VLM se ACUMULA por sub-feature y es EXIGIBLE en cuanto exista wiring visual**: sombra Y jitter (hoy espejo-only ambas) exigirán pares app↔web a igual epoch en cuanto el raymarch del volumen aterrice en la web. **W-3 NO se cierra sin los pares VLM de todo lo visual taxativo entregado** (sombra · jitter · god rays · volumen+colormaps), arbitrados por el protocolo 148 (pares OFF/ON + comparada). El TU del espejo NO sustituye al VLM ni vice versa (158 §5, en vigor).
- Registro de avance W-3: sombra espejo ✓ (159) · jitter espejo ✓ (161) · god rays pendiente (163 propuesto por la nota y ratificado en §6-P1) · shells Chapman volume-derived pendientes · colormaps 117B/124 pendientes.
- Recordatorio P2-158 en vigor (sin acción hasta que el volumen TEC aterrice): revisitar la fuente del gating `ready` del tour (hoy `ionosondes != null`; C++ `tecGrid.valid`).

## §6 Prescripciones para el drop 163 (W-3: god rays)

- **P1 — god rays (143/147) con el MISMO patrón ratificado** (espejo + TU pin a pin; la nota lo propone y se ratifica): espejo puro `volumeGodrays.ts` de `Utils/Godrays.h` (espejo `f209cc8`, spec 158 §5.3) + TU vitest replicando `test_godrays.cpp` PIN A PIN: **proyección 3 casos** · **12 taps radiales hacia el sol en UV con corrección de aspecto y pesos no crecientes** (`DECAY 0.90`) · **máscara analítica solo-Tierra (opción B): corredor=0 / cielo=1** · **puertas behind (`w≤0`) y offscreen (`|x|>1 ∨ |y|>1`)** · **stepping tapUV con clamp** · constantes nombradas `NTAPS=12 · DECAY=0.90 · MAX_RADIUS=0.45 (fracción de alto) · FALLOFF_K=8.0 · EARTH_R=1.0 · GAIN=0.12 (post-ACES) · sol cálido (1.0, 0.90, 0.75)`. Nota de alcance: god rays tiene MÁS superficie replicable en TU puro que sombra/jitter (proyección, máscaras, puertas y stepping son lógica pura) — el TU puede y debe cubrirla entera; la fidelidad de `GAIN` post-ACES y del compositor queda para el drop de wiring visual (declaración Q2 previa en vigor: paridad = TU espejos + visual, NO identidad de shader).
- **P2 — la deuda VLM (sombra + jitter + god rays cuando toque) viaja con el drop que cablee el volumen**: la nota de ese drop debe declarar qué pares se liberan; sin VLM completo no hay cierre de W-3.
- **P3 — Custodia**: pre-imágenes blob-40 contra `web161-folded` (commit `4c6a2b0e`, árbol `57d96599`); tree gate web #7.
- **P4 — Spec W-3 (158 §5 + 160 §5 + §5 de este veredicto) íntegra**. Numeración: drop 163 → veredicto 164.

## §7 Estado de espejos y ops

- Espejo C++: `f209cc8` congelado. Espejo web: `4c6a2b0e` / árbol `57d96599`, tags `webbase-130` · `web151-folded` · `web153-folded` · `web155-folded` · `web157-folded` · `web159-folded` · `web161-folded` (7 tags).
- Sandbox `scratch-w153-build` queda como entorno W-3 (node_modules al día, 36/36 verdes); `.next/` (112 M) regenerable si se necesita margen.
- Disco: ~5.9 G libres — bajo el umbral de 10 G de la prescripción 152 (vigilado; −0.1 G desde 160 por artefactos de build regenerables); candidatos a caducidad si baja: `.next/` del sandbox y scratch-*-build de ciclos C++ cerrados y sellados.
