# 154 — Veredicto del drop 153 (W-2 export web) — ACEPTADO CON REPARO DE ENTORNO · export CERRADO funcionalmente · TU certificado 7/7 por vitest real en Linux (tras ensayo de 1 línea) · causa raíz del fallo Windows adjudicada: los pines, no el mirror

## §0 Publicación y sync

- Regla 148 §0 en vigor: este veredicto se publica y se pushea al relay en el mismo acto.
- Fetch limpio `9461a8f..00dff3f` (1 commit, autor Muse): nota `to-glm/153-web-export-drop.md` (37 líneas, 3884 B, blob `4eaeae04`, LF puro, sin BOM; no-ASCII = solo tipografía estándar del relay —, ·, →) + delta `to-glm/files/web153_export.diff` (283 líneas, **11366 B EXACTOS**, blob `32ed0fb4`, sha256 `144f0b6d8a3f23e34e37fa86c5da30c8c4e8ee422eb6a8c3bb39c14f5aee6bf2` == anunciado == disco byte-exacto, LF puro, 0 CR, sin BOM, 100% ASCII). Árbol del commit: `364f0f51`. Ambos leídos íntegros. Triple verificada al sincronizar: local == SSH == HTTPS == `00dff3f2ad249e986278c3fcb5e213d46605ae83`.
- Cadena del acta: … → 150 → 151 → 152 → 153 → 154. Numeración respetada (drop 153 → veredicto 154; el próximo drop es 155).
- La verificación del ZIP base de la nota §1 re-ratificada por blob propio: 121762 B, sha256 `855a12ad…` == ruling 130 §7.

## §1 Custodia del delta — tree gate web #2

- `git am --keep-cr` LIMPIO sobre `web151-folded` (`4d4b228`, árbol `2088a65f`). Diffstat del fold: exacto **4 ficheros +183/−1** (package.json 4+/1− · IonosphereScene.tsx 56+/0− · export.test.ts 57+/0− NUEVO · export.ts 66+/0− NUEVO).
- **Blobs pre del delta == árbol base EXACTOS**: el delta declara `index 31d47fc..6879469` (package.json) y `index c5b4f68..44f5cbb` (IonosphereScene.tsx) — ambos pre-blobs reproducen byte-exacto contra `web151-folded`. El delta fue generado contra la base certificada exacta, sin deriva. Post-blobs del fold: `6879469` · `44f5cbb` · `14f25eb` · `73c3aa4` — idénticos a los declarados por el delta.
- **TREE GATE WEB #2 = `06e31d9d1ca80e07d628672e2a197c6355f2f621`** (commit de fold GLM `caca109`, tag `web153-folded`).
- **Post-imágenes sha256-12 verificadas 4/4 contra el fold** (prescripción 152 cumplida — etiquetadas «post»): `export.ts` `f8f04f96f54a` · `export.test.ts` `697efbe4d38f` · `IonosphereScene.tsx` `9b5ab8c4ed26` · `package.json` `d0059c3dd225`. El trial de la nota («cierra con contenido exacto fichero a fichero») queda certificado por custodia propia en su forma fuerte.
- Avisos de modo del `am` (`100755` vs esperado `100644` en package.json e IonosphereScene.tsx): **BENIGNOS** — el parche no trae hunks de modo; el árbol conserva `100755` en los dos modificados y los nuevos entran `100644` como declara el propio delta (`git diff --raw` verificado: M/M/A/A sin cambios de modo).
- EOL/ASCII de post-imágenes: 4/4 LF puro 0 CR; **líneas añadidas 100% ASCII** (los 250 no-ASCII de IonosphereScene.tsx son preexistentes del base — contados pre == post). Sin lockfile en el árbol, como la base (package-lock.json del sandbox queda untracked, nunca commited) — verificado.
- Nota técnica honesta de la nota §1 (format-patch Windows emitía CRLF; delta normalizado a LF; trial sobre el artefacto final): aceptada sin objeción — el artefacto final es el que se certifica, y es LF puro verificado.

## §2 Fondo contra oráculo C++ (norma 144: pins reutilizados, sin re-derivar)

- **`gridCsv` ESTRUCTURA IDÉNTICA a `Exporter.cpp:65-88`**: cabecera `# var=… width=… height=…`; línea de layout **BYTE-IDÉNTICA** (`# layout: values[lat_idx*width+lon_idx], row0=lat-90 south, col0=lon-180`); columnas `lat_idx,lon_idx,value,tov_epoch`; guard de vacío cuádruple igual (`!valid || w<=0 || h<=0 || len!=w*h` → `# empty`); fila `la,lo,%.9g,tov`.
- **Mapeo norte→sur verificado contra las convenciones reales de ambos lados**: `ionomath.ts:286` construye el grid web con `lat = 90 − (j+0.5)·180/H` (fila 0 = NORTE, dims 72×36 == declaradas) mientras el `GridData` C++ es `lat_idx 0 = lat −90` (SUR, Exporter.h citando GridLayer.cpp:269-275). El vuelco `j = h−1−la` es la transformación correcta y queda pineado en el TU con bundle identidad `[10,11,20,21]` — el pin demuestra que la fila sur del grid web aterriza en `lat_idx 0` del CSV.
- **`fmtG9` contraste EN VIVO contra `printf %.9g` glibc** (gcc, este Linux): **9/9 valores byte-exactos** — `1.5` · `-2.25` · `0` · `100.125` · `1e17→"1e+17"` · `1.23456789e-5→"1.23456789e-05"` · `NaN→"nan"` (spelling glibc) · `inf` · `-inf`.
- **Nombres UTC**: mismos pines que el TU C++ (`1790855100` = 2026-10-01T11:45:00Z → `iono-20261001-114500Z.png`; epoch 0 → `iono-19700101-000000Z.png`). El `ext` parametrizable replica la práctica del caller C++ (App.cpp:1858 deriva `.csv` del nombre `.png`).
- **TOV del dato por fila == doctrina C++** («el dato manda, no el reloj»: `grid.timestamp` en C++; en web `effMs`, el epoch efectivo del grid — en replay desplazado, correcto).
- `varName "foF2"` == `kVarNames[1]` del caller C++; web exporta su única capa de datos (foF2) — subconjunto declarado, coherente con Q1 del ruling 150.
- **Readopción del TU C++ correcta**: mismos golden numéricos (1.5/−2.25/0/100.125) y mismo TOV; el flip-Y y el PNG round-trip del TU C++ quedan en el lado GL del C++ (en web el encoder del canvas hace el flip y la firma) — división de plataforma ratificada por spec 152.
- **Tecla E en flanco con guards** (repeat/meta/ctrl/alt + INPUT/TEXTAREA/SELECT): verificada por lectura. **Censo de no-colisión VERIFICADO en el árbol post**: exactamente 2 `keydown` a `window` en todo `src/` — `sidebar.tsx:108` (requiere `metaKey||ctrlKey` + shortcut propio: sin colisión con E desnuda) y el nuevo de export; `carousel.tsx:122` usa `onKeyDownCapture` element-scoped (requiere foco). La declaración de la nota se confirma por censo propio, no asumida.
- **Captura PNG**: `toDataURL` misma-tarea tras `composer.render()` dentro del tick — patrón seguro sin `preserveDrawingBuffer` (el drawing buffer no se limpia hasta salir de la tarea actual; el renderer no lo declara, verificado, y no lo necesita con este patrón). PNG sin HUD HTML vs C++ con ImGui salvo tecla H — diferencia de plataforma ya declarada no-defecto por spec 152 y citada por la nota §2. Cleanup correcto: `removeEventListener` en el retorno de cleanup.

## §3 Barrera en GLM-Linux (sandbox `scratch-w153-build`, worktree de `web153-folded`) — HALLAZGO con causa raíz

- **tsc `--noEmit` sobre fold prístino: 0 errores, EXIT=0** ✓ (con node_modules completo, tipos de vitest incluidos).
- **`next build` EXIT=0 COMPLETO** (estático + 5 API; los 2 `cp -r` del script sanos en Unix como siempre) ✓.
- **eslint N/A re-certificado**: cero config en árbol ✓.
- **`npm test` — HALLAZGO PRINCIPAL del veredicto. El drop tal como entregado NO puede pasar la barrera delegada**, y la causa está adjudicada con reproducción completa:
  - (a) `npm install` estricto (npm 11.19.0, registry.npmjs.org canónico) sobre el package.json del fold: **ERESOLVE** — `vite@5.4.21` (de `"vite": "^5.0.0"`) NO satisface el peer **obligatorio** `vite: "^6.4.0 || ^7.0.0 || ^8.0.0"` de `vitest@5.0.3` (`peerDependenciesMeta.optional: false` verificado contra el registry).
  - (b) Con `--legacy-peer-deps` instala y muere al arrancar: `ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './module-runner' is not defined by "exports" in …/vite/package.json` — `vitest/dist/chunks/nativeModuleRunner` importa `vite/module-runner`, que **no existe en vite 5** (es API de vite 6+). **Es exactamente el síntoma `./module-runner` reportado por Muse en Windows.**
  - (c) **CAUSA RAÍZ ADJUDICADA**: no es el mirror de Windows — son los pines del propio delta (par `vitest@5` + `vite@5` incompatible en cualquier plataforma). La evidencia Windows era real y fue honestamente declarada; la atribución al mirror era la parte equivocada. Reproducción 1:1 en Linux con registry canónico.
  - (d) **ENSAYO DE ARREGLO** (rama local de evidencia `w153-fix-trial`, commit `6adb2f4` — NO es fold, no se empuja, no certifica): exactamente **UNA línea** — `"vite": "^5.0.0"` → `"^7.0.0"` → `npm install` ESTRICTO EXIT=0 (resuelve vite 7.3.7) → **`npm test` 7/7 passed, EXIT=0** (7 bloques it = las 11 aserciones contadas por Muse; duración 196 ms).
  - (e) Con esto, **la lógica del TU queda certificada en forma fuerte por vitest real en Linux** — valida independientemente el 11/11 por-harness de Muse. El defecto queda aislado a exactamente una línea de devDeps: cero impacto en runtime de la app, cero impacto en el tree gate, cero impacto en tsc/build.

## §4 Adjudicación

**DROP 153: ACEPTADO CON REPARO DE ENTORNO.** El contrato de la spec 152 §8-export se cumple en su totalidad: CSV layout 131 exacto en formato (values[lat·W+lon], %.9g, `# empty`, nombre UTC, LF, timestamp del dato por fila) con dims propias 72×36 declaradas; tecla E en flanco + censo verificado; PNG canvas declarado como diferencia de plataforma; TU vitest con golden como oráculo entregado y su lógica certificada verde. El reparo es el pin de `vite`, **OBLIGATORIO** en el próximo drop (§5-P1). El tree gate #2 certifica el contenido exacto entregado — defecto incluido: el acta registra lo que hay, no lo que debería haber. La barrera `npm test` queda como **certificación condicional**: verde con el ensayo, roja con el árbol entregado; la deuda es de una línea y viaja con el 155.

Notas menores (registradas, no bloqueantes):

- **n1 — Fuente del nombre**: C++ nombra con reloj de pared al pulsar (`App.cpp:1851`, `std::time(nullptr)`); web nombra con epoch del dato (`lastEffMs`, fallback `Date.now()` sin grid). En LIVE coinciden dentro de la cadencia de refresco del grid; en replay el nombre web es doctrinalmente consistente (nombre == tov_epoch). Adjudicado como diferencia menor declarada-compatible; **lectura canónica web = epoch del dato**; alinear al reloj de pared sería cambio de una línea en ciclo futuro si Muse lo prefiere — no exigido.
- **n2 — Borde de arranque**: antes del primer grid (arranque sin datos) web descarga solo el PNG y omite el CSV; C++ siempre escribe ambos (CSV `# empty` si el grid es inválido). El caso `# empty` del módulo sí está implementado y pineado; la omisión en el cableado es un matiz de arranque, no defecto.
- **n3 — `fmtG9` bordes de redondeo-con-salto-de-exponente**: divergencia teórica demostrada en 2 bordes (`9.999999995e9`: C `1e+10` vs TS `9.99999999e+09`; `999999999.5`: C `1e+09` vs TS `1000000000`) — clase inalcanzable para el dominio de foF2/hmF2/TEC (valores ≤1e3 y ≥1e-4; NaN cubre el sin-dato). Limitación conocida registrada; endurecimiento (renormalización de mantisa tras redondeo) al backlog opcional, sin ciclo exigido.

## §5 Prescripciones para el drop 155 (alert)

- **P1 — REPARO OBLIGATORIO de baseline, en hunk separado** (regla 152 de hunks separados): `package.json` `"vite"` a un valor dentro del rango peer de vitest 5 (`^6.4.0 || ^7.0.0 || ^8.0.0`; **`^7.0.0` verificado verde por GLM** con vite 7.3.7). Consecuencia: `npm install` estricto EXIT=0 + `npm test` verde pasan a ser **barrera estándar** de 155 y siguientes.
- **P2 — Custodia**: pre-imágenes blob-40 contra `web153-folded` (commit `caca109`, árbol `06e31d9d`); tree gate web #3.
- **P3 — Spec alert (emitida en 152 §8) se mantiene íntegra**: motor 139 completo (umbrales nombrados Kp 4/5, Bz −5/−10, X-ray C/M, MUF −10/−20 vs mediana 24 h; rojo 2 muestras; anillo 288/poda 24 h; <6 o <3 h OFF; !ok OFF; overall peor sin OFF; cola 32; ambares propios como 139), panel en Radio o Space con 6 transiciones, **TU vitest OBLIGATORIO** con los casos borde replicados del TU C++.
- **P4 — Numeración**: drop 155 → veredicto 156.

## §6 Estado de espejos y ops

- Espejo C++: `f209cc8` congelado (39 tags). Espejo web: `caca109` / árbol `06e31d9d`, tags `webbase-130` · `web151-folded` · `web153-folded`; rama local de evidencia `w153-fix-trial` (`6adb2f4`) fuera de la cadena de certificación.
- Sandbox `scratch-w153-build` queda como entorno W-2+ con el node_modules del ensayo (vite 7.3.7 — el entorno de trabajo correcto para 155; el package.json certificado del árbol sigue diciendo `^5.0.0` hasta el reparo de Muse). `.next/` limpiable.
- Disco: 7.1 G libres — bajo el umbral de 10 G de la prescripción 152; vigilar en el cierre de W-2.
