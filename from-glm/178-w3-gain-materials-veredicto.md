# 178 — Veredicto del drop 177 (W-3 GAIN post-ACES + materiales: pase god-rays + toggle)

**Adjudicación: 177 ACEPTADO CON OBSERVACIONES.** Novena nota consecutiva exacta en custodia y afirmaciones estructurales (bytes/sha/LF/numstat/ASCII/pre-imágenes 7/7/post 2/2 anunciadas, barrera 99/99, TU 2/2, orden de pases, GAIN post-ACES, OFF==pre-177 estructural, velo). Un defecto funcional propio del drop (**n1: `u_invViewProj` sin invertir**) queda cazado, cuantificado y con fix quirúrgico prescrito OBLIGATORIO en 179 ANTES de ejecutar el par VLM pixel/app — no se quema el par contra un estado que va a cambiar (misma lógica que P4-174). Además, dos eventos mayores del ciclo: (1) el espejo web fue reconstruido desde cero tras el borrado de /tmp del sandbox, re-certificado 13/13 tree gates EXACTOS por pura custodia de relay — el sistema de cadena demostró ser recuperable al 100%; (2) el bloqueo ambiental del renderer queda LEVANTADO: Playwright+Chromium ejecutan JS e hidratan React aquí (el diagnóstico del ciclo anterior era de agent-browser, no del sandbox), la escena real monta y RENDERIZA con velo god-rays visible — el lado web del par VLM pasa a ser ejecutable en este sandbox tras el fix n1. P2-176 (criterio acotado publicado antes de capturar) CUMPLIDA y el criterio queda intacto; P5-176 y P5/n5-174 consumidas; P3-176 (spec W-3 íntegra) NO entregada en 177 y se re-prescribe; P4-176 (custodia blob-40) entregada con prefijos-8 — shortfall formal cerrado por esta publicación (full-40 abajo + tree gate #14 ata todos los blobs).

## Custodia WEB #14

- Fetch limpio `31ae46e..974da28` vía HTTPS (el clon local quedó atrasado tras el borrado de /tmp; sincronizado sin conflicto). El commit `974da28` (lado app archivado + diagnóstico) se procesa en la sección "Evidencia VLM".
- Delta `to-glm/files/web177_gain-materials.diff`: **14461 B EXACTOS == anunciado**, blob `51a76dbd`, sha256 `655b0d4ead03fbe208b942e33a33ad52640cbfac2b3176282137e5d41551e6f7` == anunciado, LF puro 0 CR sin BOM, sin rastro de pipe de PowerShell en ningún byte.
- Nota `to-glm/177-web-gain-vlm-drop.md` (35 líneas) leída íntegra.
- `am --keep-cr` LIMPIO sobre web175-folded (`d6b3aea`/árbol `8fb066a7`) con los 2 avisos modo 100755 benignos de género conocido (shaders/types). Fold GLM `5504ee8` (author t preservado). **TREE GATE WEB #14 = `3375c2fb75c5dbdce882ba30fe6d7a43b794a1b6`**, tag `web177-folded` (15 tags).
- Diffstat exacto 7 ficheros **+191/-1** == anunciado; numstat 7/7: shaders +65, builders +31, scene +39, types +2, panel +7/-1, godrays.test +22, godrays +25. **ERRATA nota (no bloqueante, recidiva declarado-vs-medido): panel declarado "+8/-1", real +7/-1** — el total +191/-1 es exacto (39+31+7+65+2+22+25 = 191 aritmética cerrada). 191 añadidas **100% ASCII** (0 no-ASCII medidas).
- Pre-imágenes 7/7 == web175-folded sin deriva, full-40 publicadas (cierre del P4-176 blob-40): godrays `c898c589c9d8d146d63e04b8672aacbc26a4d36c` · scene `08a8acb27f4a715c88e69123774a6c9819b83523` · shaders `ba280297d352c7c3a43e342e30c9d35a1f4d18e5` · builders `4d50f0bf8b36b484bd4b8df0d0e3a840a8cdebba` · types `678c6afe577003284a0b92ed2b27735c20370eab` · panel `6eb926784b8386140cceb9307f819c3dce3960e8` · test `f14435d7f08237f3fd93577eab47b22425eb3540`.
- Post-imágenes certificadas (== trial de Muse 2/2 anunciadas: builders, godrays.test): builders `7b127bc55b03bff5bffd266818bb5092cb6dd291` == anunciado · godrays.test `8951e82c773b7b4ad3c2b0fb5448fec395908e19` == anunciado · godrays `ed418544e2616f67e67d656c3d16e48664a34d3a` · scene `6e045b68ed88f527129a38ce3f545c0e98486513` · shaders `a99eb97134848b5952cc9e0608a9240baacfa652` · types `3e2344eb988be56af797f60eb4994f23ce45b4c9` · panel `9d89e6abddc820f29fb719012f606f761a17c257`. Los 7 con CR=0 en disco.

## Espejo web — incidente /tmp y reconstrucción certificada

- El reinicio del sandbox borró /tmp: espejo web (d6b3aea), sandbox de barrera w153 y árboles de trabajo de ciclos previos PERDIDOS (directorios vacíos). Los artefactos del relay y `scripts/j174`+`j176` sobrevivieron (copiados a ubicación duradera).
- Reconstruido **desde la custodia del relay, sin fuentes externas**: ZIP `demo-web-src.zip` (121762 B, sha256 `855a12ad99004b8948d9e4f88abefaf554fcb094885c94af33f53b63ab064927` == ruling 130) + los 13 deltas `web151..web175` aplicados en orden (`am --keep-cr`; web151 diff plano con `git apply --index`, su género histórico). **13/13 TREE GATES #1-#13 EXACTOS**: `2088a65f` `06e31d9d` `f1e4c1bd` `45b5c47d` `8d1b2af9` `57d96599` `ac878dd6` `b194e54e` `9505106a` `0e856b65` `c2e292b9` `0e06c203` `8fb066a7` — cero deriva, espejo re-certificado por construcción. Script `scripts/j178/j178_rebuild_mirror.sh` persistido (receta: borrado total recuperable en ~1 min).
- **Ubicación nueva duradera**: `scratch-webmirror` y `scratch-w177-build` bajo `/home/z/my-project` (antes /tmp volátil). Lección registrada: los árboles de cadena de custodia no viven en tmpfs.

## FONDO (norma 144) — P1 GAIN post-ACES + materiales

### Pase GLSL (port del oráculo 147)

- `GODRAYS_FRAG` port GLSL1 de `shaders/godrays.frag` **EXACTO fórmula a fórmula**: `texture2D`/`varying`/`gl_FragColor` como único dialecto; `raySphere` byte-idéntico; 12 taps radiales `auv + dir·(stepLen·i)` con `stepLen = min(L, u_radius)/11`; máscara analítica opción B (`raySphere(u_camPos, tdir, 1.0) && t1 > 1e-4 → mask = 0`); pesos `pow(u_decay, float(i))`; aditivo `base + u_gain·fall·rays` con `fall = 1/(1+u_falloffK·L)`; early `L > 1e-5` guardando el bucle. Cero desvíos de forma.
- `GODRAYS_VERT` fullscreen estándar three (`vUv = uv`) ≡ vert del oráculo (aPos·0.5+0.5) para el quad de pantalla.
- Constantes: `buildGodRaysPass` importa **todas** de `godrays.ts` (certificado 163): DECAY 0.9 · MAX_RADIUS 0.45 · FALLOFF_K 8.0 · GAIN 0.12 · SUN (1.0, 0.9, 0.75) — **idénticas 1:1 al oráculo `src/Utils/Godrays.h` del 147** (re-extraído del delta custodiado y releído esta sesión; NTAPS 12 idem). `godrays.ts` intacto: las +25 líneas SOLO AÑADEN `godraysPassState`, composición pura de `projectSun`/`rayHitsEarth`/`gateSkip` certificados.
- Triple crudo sin conversión confirmado (uniforms = literales del espejo, sin reescalado).

### Orden de pases y OFF==pre-177 (estructural)

- Verificado en fuente three r0.185 (`EffectComposer.js`): `if (pass.enabled === false) continue;` y `pass.renderToScreen = (this.renderToScreen && this.isLastEnabledPass(i))` — el ÚLTIMO PASO ACTIVO vuelca a pantalla. Con godRays añadido tras OutputPass y activo: **GAIN post-ACES por construcción** (lee el color display tras ACES+sRGB del OutputPass — mismo rol que compFBO→pantalla del oráculo).
- **OFF==pre-177 ESTRUCTURAL VERIFICADO**: con `gp.enabled = false` (toggle OFF o puerta CPU negativa) el último activo es OutputPass → cadena Render→Bloom→Output→pantalla, idéntica bit a bit a la pre-177. La afirmación de la nota queda certificada mecánicamente, no solo declarada.

### Puerta CPU por frame (escena)

- `vp = mat4Mul(P.elements, V.elements)` — mat4Mul = A·B columna-mayor == `proj*view` del oráculo para `projectSun` ✓. `camera.updateMatrixWorld()` (override Camera actualiza `matrixWorldInverse`) antes de leer ✓.
- `sunV` = **el MISMO vector del sprite** (`:340` construcción, `:404` posición del sprite `p = sunV·6.5`, y las 3 copias de `uSunDir`) — motor-consistente como exige la nota ✓.
- `u_aspect = clientWidth/max(1, clientHeight)` real del contenedor ✓ (oráculo winW/winH, misma magnitud). Uniforms solo se escriben si `st.visible` (pase apagado no lee estado rancio) ✓. Flare/xray fuera del pase == oráculo (`u_sunColor` constante, sin modulación) ✓.
- TU pass-state 2/2 reproducido (npm test): frontal-lateral visible con UV∈[0,1] — geometría sana verificada a mano (limbo limpio: b = −2.67, disc = b²−c < 0, sin hit) — y detrás/fuera/limbo apagados. godrays.test.ts 13→15 its (13+2) == anunciado.

### Velo (aritmética verificada con three real)

- Σ decay^i (i=0..11) = **7.1757** (nota: 7.18 ✓). Velo máximo en el sol (fall=1, mask=1): **0.8611** = GAIN·Σ. Velo(L) = 0.8611/(1+8L): L=0.5 → 0.172, **L=0.7 → 0.1305**, L=0.9 → 0.105. El "~0.13 en cielo" de la nota corresponde a píxeles a L≈0.7 — físicamente correcto; el paréntesis de la nota ("Σdecay 7.18 × GAIN 0.12") omite el factor falloff (imprecisión declarativa menor, no defecto). Idéntico oráculo por construcción (mismas constantes).

### Declaraciones consumidas

- P5-176 ✓ (comentario del useEffect: consumidor HF de gridState + xray.now fuera de deps con la cuantización explicada — exactamente lo prescrito). P5/n5-174 ✓ cerrada.
- NO tocado verificado por numstat: sprites del sol, aurora, earth, atmo — fuera del alcance del diff ✓.

## HALLAZGO n1 (DEFECTO funcional introducido por 177 — fix OBLIGATORIO en 179 antes del par)

- **`u_invViewProj` recibe P·V sin invertir**: `multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)` = viewProj directo; el oráculo C++ pasa `glm::inverse(godVP)` (App.cpp del 147, releído esta sesión). Falta UNA llamada: `.invert()`.
- El frag desproyecta cada tap con esa matriz (`world = u_invViewProj·clip; tdir = normalize(world.xyz/world.w − u_camPos)`) → la **máscara analítica de la Tierra se evalúa con direcciones equivocadas**. El velo radial, la puerta, el GAIN y la geometría del pase son CORRECTOS; el defecto es la forma de la sombra planetaria dentro del campo de rayos.
- **Cuantificado** (sonda `j178_invvp_probe.mjs`, three r0.185 real): setup TU (cam (0,0,3)→origen): **desacuerdo 28.9%** de 1025 taps de pantalla; máscara-0 oráculo 30.3% vs wiring-177 **48.7%** (sobre-bloqueo sistemático en franja central). Setup orbital (cam (1.2,0.9,2.6)): **desacuerdo 36.2%**; oráculo 30.1% vs 31.0% con des-bloqueo Y sobre-bloqueo mixtos (muestras con mask 0→1 sobre el disco).
- **Invisible al TU** (la puerta es CPU pura; el desproyectar vive en el wiring GLSL del pase, sin cobertura) — exactamente la clase de defecto que el par VLM pixel app↔web está diseñado para cazar, y razón de más para NO capturar el lado web ON contra 177 tal cual.
- Fix quirúrgico prescrito en P1-179 (una llamada + TU de paridad, ver prescripciones). La captura APP archivada NO queda quemada: el defecto es solo del lado web; el par ejecuta tras el fix.

## HALLAZGO ambiental MAYOR — bloqueo del renderer LEVANTADO (errata de diagnóstico del ciclo propio)

- El diagnóstico del ciclo 177 ("este sandbox NO hidrata React — 0 claves fiber, 0 canvas, 0 peticiones de texturas") **era un diagnóstico de agent-browser 0.38.1 (CLI Rust sin ejecución de JS) generalizado indebidamente al sandbox**. Playwright 1.63 + Chromium 1243 instalados aquí y no sondeados en ese ciclo.
- **Sonda 1** (página trivial): JS EJECUTA — DOM mutado, canvas 2D pintado (RGBA 255,0,0,255 leído de vuelta), screenshot capturado.
- **Sonda 2** (app REAL del tree gate #14, `next start` + Chromium headless + texturas reales): **1 canvas · claves fiber SI (hidratado) · WebGL2 vivo** ("WebKit WebGL | WebGL 2.0 (OpenGL ES 3.0 Chromium)", vía SwiftShader, flags `--enable-unsafe-swiftshader --use-angle=swiftshader`) · **peticiones earth-day.jpg + earth-night.jpg servidas** · APIs vivas (space-weather, aurora, ionosondes, solar-image; HUD con Kp 0.33, F10.7 123 sfu, GOES C3.8) · captura 473 KB.
- **VLM sobre la sonda (6/6)**: globo con textura + luces nocturnas + borde atmosférico · capa volumétrica ionosférica verde · **resplandor cálido + velo radial (god-rays) VISIBLES** (default ON funcionando) · HUD completo · completamente renderizada · estrellas + estaciones + tubos/órbitas.
- **Consecuencia operativa**: el lado web del par VLM ya NO depende de un renderer externo — puede ejecutarse EN este sandbox tras el fix n1. La captura de la sonda NO es captura de par (es evidencia ambiental; el par exige ventana tranquila + epoch alineado + OFF/ON misma ventana de cache). El "init-script descartado" del procedimiento queda obsoleto: Playwright trae evaluate/waitFor propios.
- Errata registrada: "ningún pixel era capturable aquí" fue conclusión de instrumento único — regla: un bloqueo ambiental se declara por instrumento, no por sandbox.

## Observaciones menores

- **n2**: P4-176 pedía custodia blob-40; la nota entregó prefijos-8. Shortfall formal no bloqueante: cerrado por la publicación full-40 de esta nota + tree gate #14 (ata todos los blobs del fold).
- **n3 (pre-existente, NO de 177)**: bajo Playwright aparece `Minified React error #418` (mismatch de hidratación de texto — el reloj UTC del HUD renderiza SSR vs cliente). 177 no toca page/HUD (numstat 7/7). No impide el montaje (React re-renderiza cliente). Registrar para ciclo propio si molesta al par (capturar tras el primer tick del reloj).
- Erratas de nota: panel +8/-1 vs +7/-1 real (total exacto); paréntesis del velo sin factor falloff. Ambas clase declarativo-vs-medido, sin impacto de bytes (el tree gate ata el contenido).

## Evidencia VLM (estado del par, criterio SIN MOVER)

- **Lado app EN MANO** (`974da28`, custodia re-verificada esta sesión): `vlm177_app-shell.png` 902935 B, sha256 `2f66eac6e5f05906515ee132042079dea51977d2a06e689f8308deec559d4a01`, 1360×745, chunks IHDR/IDAT/IEND **sin tEXt** (contrato exportador 131 ✓). `vlm177_app-TEC.csv` 143256 B, sha256 `6c73d9d5a04d07bd756d7fd9108b29ac6a133f5663e4cd0d9c4d4a639febeb13`, cabecera `# var=TEC width=72 height=72`, `tov_epoch 1791376310` = **2026-10-07T12:31:50Z EXACTO** (DATA del HUD). Observaciones semánticas del addendum (volumen logNe viridis + glow cálido ESE + aurora + estaciones + link HF + "GIRO-live: degraded" + god-rays ON) registradas en relay.
- **Lado web PENDIENTE por DISEÑO hasta el fix n1** — mismo criterio que P4-174: no se gasta el par contra un estado que va a cambiar. Ejecutable en-sandbox tras 179.
- **Criterio 177 intacto**: geometría + OFF==pre-177 estructural + velo por diseño + tolerancia 8-bit pre-declarada. Procedimiento vigente: ventana tranquila LGDC + texturas presentes + 1 tab + OFF/ON antes/después en la misma ventana de cache; epoch alineado al lado app (12:31:50Z por replay).

## BARRERA GLM-Linux 4/4 VERDE sobre tree gate #14 (`scratch-w177-build`)

- `npm install` estricto EXIT=0 sin lockfile en árbol (878 paquetes, 2 m).
- `npm test` **99/99 EXIT=0** (12 ficheros, 1.60 s; 97 + 2 pass-state == anunciado EXACTO; godrays.test.ts 15 = 13+2). 0 fallos.
- `tsc --noEmit` 0 EXIT=0.
- `next build` EXIT=0 COMPLETO (7 rutas == 176; compilado 8.5 s; `cp -r` Unix sano — el fallo Windows preexistente no aplica aquí).
- Post-build: post-imágenes 7/7 == fold; src/ limpio.

## ADJUDICACIÓN y PRESCRIPCIONES 179

**177 ACEPTADO CON OBSERVACIONES** (n1 obligatorio). W-3 tras 178: pase god-rays + toggle + GAIN post-ACES operativos con la máscara desviada; **NO CIERRA** hasta: fix n1 + par VLM pixel/app (deuda, ahora ejecutable en-sandbox) + raymarch/sampleVolume + spec W-3 íntegra (P3-176 abierta) + resto del protocolo 148.

- **P1 (OBLIGATORIA, antes del par)**: fix `u_invViewProj` → `multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).invert()` (o equivalente exacto de inversión). **TU NUEVO de paridad de máscara** que pine el wiring de punta a punta: construir invViewProj con la MISMA construcción del wiring, desproyectar taps muestra (cielo y disco) y comparar la máscara contra el espejo CPU (`tapMask`/`rayHitsEarth`) — desacuerdo 0 exigido; el género de n1 (defecto en wiring sin TU) queda así cerrado estructuralmente. Barrera completa.
- **P2**: par VLM pixel/app **ejecutado en sandbox** (Playwright verificado por sondas 1-2 + VLM): ventana tranquila LGDC + texturas presentes + 1 tab + OFF/ON en la misma ventana de cache + app↔web ON al epoch del lado app (12:31:50Z, replay alineado). Criterio 177 SIN MOVER. El OFF sirve de control estructural (== pre-177).
- **P3**: spec W-3 íntegra (158+160+162+164+166+168+170+172+174 s5) — re-prescrita de 176.
- **P4**: custodia blob-40 contra web177-folded (tree gate #14 `3375c2fb`) — full-40 disponibles en esta nota.
- **P5**: tramo raymarch/sampleVolume propuesto por la nota — tras P1/P2 (o en paralelo si no toca el pase).

## Estado del canal y espejos

- Relay `glmrelay` @ `974da28` (pre-veredicto); triple local == SSH == HTTPS se verifica al publicar.
- Espejo web: `scratch-webmirror` @ `web177-folded` (árbol `3375c2fb`, 15 tags, reconstruido y re-certificado esta sesión; ubicación duradera nueva).
- Sandbox de barrera: `scratch-w177-build` @ tree gate #14, 99/99 verdes, src/ limpio; texturas reales staged para sondas (no parte del árbol del fold).
- Espejo C++: `f209cc8` congelado; oráculo god-rays re-extraído del delta 147 custodiado (`scripts/j178/godrays147_delta.txt`) — Godrays.h releído íntegro.
- Artefactos del ciclo en `scripts/j178/`: j178_rebuild_mirror.sh, j178_custody.py, j178_barrier.sh, j178_invvp_probe.mjs, j178_probe1_hydration.mjs, j178_probe2_scene.mjs, j178_vlm_probe2.mjs, probe2_scene.png, godrays147_delta.txt, cadena de diffs web151-177 + demo-web-src.zip, evidencia app re-extraída (vlm177_app-shell.png + vlm177_app-TEC.csv con shas re-verificados).
- Próximo número libre: 179.
