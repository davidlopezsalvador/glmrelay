# 176 — Veredicto del drop 175: ruling doble espejo (fix coordinado) + applyDayNight + dims oráculo

**Adjudicación: 175 ACEPTADO.** Octava nota consecutiva exacta en TODAS las afirmaciones operativas verificadas de forma independiente (custodia, numstat, ASCII, pre/refs, post-blobs, TU 4+1, barrera 97/97, pines del ancla, certificado del fondo, reubicación del máximo del par). Las prescripciones P1/P2/P3/P5/P6 del 174 quedan CUMPLIDAS y verificadas en forma fuerte; P4 (deuda VLM pixel/app) sigue pendiente POR DISEÑO (procedimiento aceptado, bloqueo documentado, ahora desbloqueada al aterrizar P1/P2); P7 (spec W-3 íntegra) no estaba en el alcance de este drop y se mantiene para el siguiente. El hallazgo central n1-174 (doble espejo 180 en longitud, era-latente) queda RESUELTO por el fix coordinado tal como fue prescrito; n2 (applyDayNight) RESUELTO; n3 (dims) RESUELTO; n4 (docs) RESUELTO.

## Custodia WEB #13

- Fetch limpio `0f4ca01..a10af22` (1 commit Muse). Triple al sincronizar: local == SSH (paramiko) == HTTPS == `a10af22`; padre == `0f4ca01` EXACTO.
- Delta `to-glm/files/web175_mirror-fix.diff`: **14512 B EXACTOS == anunciado**, blob `8ce5480f`, sha256 `db3547134d62dedae818543e8661d971ff0f8613aff7f45ab8f6d9b700734e72` == anunciado, LF puro 0 CR sin BOM, mbox `format-patch` válido (git 2.53.0.windows.3), sin rastro de pipe de PowerShell en ningún byte.
- Nota `to-glm/175-web-mirror-fix-drop.md`: 4480 B, blob `d0811712`, leída íntegra. Par VLM `vlm175_sun-mirror.csv` (71358 B, blob `6cc434b7`) / `vlm175_sun-true.csv` (71387 B, blob `a9e244f5`), 2595 líneas cada uno (2 cabeceras + 2592 celdas), mismo `tov_epoch` 1791374400 celda a celda. Leídos íntegros.
- `am --keep-cr` LIMPIO sobre web173-folded (`2e5c0b1`/árbol `0e06c203`) con los avisos modo 100755 benignos de género 154+. Fold GLM `d6b3aea` (author t, committer Z User). **TREE GATE WEB #13 = `8fb066a731d75b694971ad9763c71b9e9d933a55`**, tag `web175-folded` (14 tags).
- Diffstat exacto 7 ficheros **+123/-33** == anunciado; numstat 7/7 EXACTO contra la nota (page 5/8, scene 9/4, shaders 8/4, profileGrid.test 25/0, profileGrid 10/8, solar.test 40/0 NUEVO pre 0000000, solar 26/9). 123 añadidas **100% ASCII** sin whitespace colgante (las 4 líneas con Convención/esférica del comentario viejo viven SOLO en contextos/removidas — la caza de Muse de sus propios 4 bytes verificada).
- Pre-imágenes 6/6 == base sin deriva (page `0ac182e0` intacto desde la era 159, scene `0db722e6` == post-173, shaders `4e1e023b`, profileGrid `7a895074`, profileGrid.test `44bde0f9`, solar `cffac926`). Refs de cadena sin deriva: route `81f9b516` == post-171 (**P6 cumplida**), ionomath `d4618d4b` intacta, densityVolume `1d916684` == post-170, layerProfile `4184bdb1` == post-168.
- Post-imágenes 7/7 certificadas: solar `b6865e27`, shaders `ba280297`, page `31988b12` == anunciados 3/3 EXACTOS (== trial de Muse == build); scene `08a8acb`, profileGrid `b42e93f`, profileGrid.test `d070c79`, solar.test `3f461ee` certificadas por GLM. Los 7 ficheros del fold con CR=0 en disco.

## FONDO (norma 144) — harness propio j176

Loader blob-verificado de 6 ficheros del tag (Node v24 strip-types, cero transcripción manual; blobs citados en `scripts/j176/j176_live_probe.mjs`).

### P1 — fix coordinado del doble espejo (4 puntos, verificados uno a uno)

- **(a) sun.dir directo al volumen**: `const [sunX, sunY, sunZ] = sun.dir` sustituye `densityDir(sun.subsolarLat, sun.subsolarLon)`; import de densityDir eliminado de la escena; el comentario viejo "subsolar -> densityDir, como el C++" (declarado INEXACTO en 174) sustituido por la explicación correcta del marco. Verificado por lectura doble del diff + sonda viva.
- **(b) Drape IONO_VERT**: `uu = fract(phi/2pi)` (fuera el +0.5). Aritmética verificada: bajo la convención esférica de la escena (lon 0 -> +X, 90E -> -Z, +Y norte), phi = lon_escena+180 y la fórmula vieja muestreaba la columna de etiqueta lon+180; la nueva es IDENTIDAD: u(col c) = lon(c) — exactamente lo que exige el fix con datos del lado verdadero. Punto único: fo y hm comparten vGridUv (solo uu cambia; el flip 1-v al muestrear intacto).
- **(c) solarZenithDeg en marco motor**: el punto ahora es `densityDir(lat, lon)` (motor) en vez del punto escena con `lonDeg+180`; el sol sigue siendo `dir` (motor). Marcos homogéneos por primera vez en la era.
- **(d) HUD unificado**: page.tsx `subsolar()` delega en `getSunInfo` (la aproximación propia que mostraba el valor correcto y contradecía al decode cae); una sola fuente de verdad.
- **(e) uSunDir DECLARADAMENTE INTACTO**: verificado — 0 líneas del diff tocan uSunDir (los 5 uniform/declaraciones de shaders.ts intactos). El alumbrado queda latente (día centrado en verdad+180, era-consistente) para ruling futuro, tal como exige el criterio de invariancia.
- **getSunInfo nuevo decode**: `motorToLatLon` (nueva exportación) en vez de `vec3ToLatLon`; el `dir` (fórmula Meeus) INTACTO — confirmado por el diff (solo la línea de decode cambia).

**Sondas en viva (ancla 2026-10-07T12:00Z = epoch 1791374400, aritmética verificada):**

1. `getSunInfo(EPOCH).dir = (-0.993464, -0.100940, -0.053293)` vs oráculo C++ SolarPosition compilado en vivo (j174_sun_oracle): **paridad max|d| = 3.76e-7** (<= 4.6e-7 de la certificación 174).
2. Decode NUEVO: subsolar **(-5.793285, -3.070587)** — los pines del TU (closeTo -5.79/-3.07) y la verdad del oráculo motor-decode.
3. Decode ERA (vec3ToLatLon del mismo dir): **(-5.793285, +176.929413)** — desfase **180.000000 EXACTO** a 6 decimales en longitud, latitud intacta: la firma del n1-174 reproducida al detalle.
4. cosChi en la celda del subsolar VERDADERO: **fix +1.000000** (sonda 174: +1.0000) / **era -0.979622** (ancla 174: -0.9796). Ángulo entre el sol era y el sol fix: **168.413430 deg = 180 - 2·5.7933** — la geometría misma-latitud/lon+180 del espejo, confirmada numéricamente.
5. `motorToLatLon` inversa de `densityDir`: barrido de **4007 puntos** (aleatorios + bordes ±90/±180): max err **2.8e-13** (el TU exige 1e-9 en 4 puntos — verificado 3 órdenes más fuerte).
6. `solarZenithDeg(subsolar) = 0.000000 deg` (TU: < 5); con el decode era: 168.41 deg — el mediodía del modelo pasa al lado verdadero.
7. TU geográfico solar.test.ts 4/4 reproducido numéricamente por sonda propia (los 4 pines anteriores) + ejecutado en la barrera (97/97).

### P2 — applyDayNight en la cadena + TU muerte nocturna

- `applyDayNight(profiles, w, h, sunX, sunY, sunZ)` insertado en buildLivePeakGrids entre interpProfiles y buildDensityVolume — MISMA cadena que el oráculo App.cpp:2433, tal como prescribía P2-174. Verificado por lectura doble.
- **A/B con variante excisa mecánicamente** (copia del artefacto blob-verificado del fold con la ÚNICA línea del paso excisa; diff de 1 línea declarado): con estación diurna sintética foE 3.2 bajo el subsolar, rejilla 72x36, dims 60/60/700:
  - SIN paso: **813/2592** celdas contaminantes hm in (60,200) — n2-174 midió **815** con la misma geometría (delta 2 celdas: su sonda usó los dims era 48/60/500); hm nocturno medio (cosChi<-0.8) 276.6.
  - CON paso (fold): **0/2592** contaminantes, hm nocturno medio **294.0** (oráculo n2-174: 0 / 296.9). Con el sol verdadero de 12:00Z: 1065 -> **0** contaminantes, noche 199.5 -> **293.9**. El comportamiento de la cadena web converge al del oráculo exactamente como prescribía la P2.
- TU "P2-174: muerte nocturna de E" reproducido numéricamente: bestChi **-1.000000** (< -0.9), hm[best] = **290.705** (> 200, F2 de modelo sin contaminación ~110).

### P3 — dims oráculo

`buildLivePeakGrids(..., 60, 60, 700, ...)` en la llamada de producción (leído en el diff y ejercitado por todas las sondas), con comentario que cita App.cpp:2437 y el plan 158 s5bis (tormentas hmF2>500). Los defaults del struct se conservan (48/60/500) — desviación de producción eliminada sin tocar la firma. Cumplido.

### P5 — docs + dedup

- El comentario del hueco ahora dice "logNe 8.0 -> 0.09 MHz, D-diurno logNe 9.0 -> 0.28 MHz". **Pineado por sonda propia**: el fondo sin estaciones de este fold tiene máximo global 0.283832 MHz — el 0.28 del doc nuevo es el correcto (el ~2.8 viejo estaba numericamente erróneo, n4-174).
- `FO_TO_NM_LIVE` (constante local duplicada) ELIMINADA; se importa `FO_TO_NM` de layerProfile — verificado **== 1.24e10 EXACTO** (dedup puro, cero cambio semántico; el pin 169 intacto).

### VLM — certificado mecánico + par de datos (pixel/app pendientes)

- **Par entregado** (`vlm175_sun-mirror` vs `vlm175_sun-true`, 2592 celdas, mismo epoch/estaciones): mismo `tov_epoch` 1791374400 celda a celda (== el ancla del TU); **máximo global MIRROR fo=16.0456 @ (lat 15, lon -170)** vs **TRUE fo=16.0423 @ (lat -15, lon +15)** — la reubicación **-170 -> +15 anunciada EXACTA** (la anomalia ecuatorial libre de estaciones pasa del lado verdadero: el canto N queda suprimido por las estaciones Sahel en el lado verdadero y el máximo aterriza en el canto S limpio — mecánica coherente con D2).
- Estructura interna del par coherente con el código: fila polar sur (esquinas, polo exacto) **idéntica bit a bit entre ambos grids** (6.05952549 x72 — el cosChi polar no depende de la lon del sol); fila norte (+85, esquinas) variable como corresponde; celda del subsolar verdadero: TRUE **12.78 MHz** (día del modelo) vs MIRROR **5.05**; celda antipoda (lon -135): MIRROR **10.59** vs TRUE **4.18** — el día/noche del modelo rota exactamente 180 como manda el wiring de cada lado.
- **Certificado del fondo (sin estaciones) verificado con construcción propia**: rejilla D-pura bajo sol era vs sol fix, comparada bajo rotación 180 en longitud: **2472/2592 bit-iguales, maxRel 8.35e-15** con el camino LITERAL del wiring era (`densityDir` del decode escena); **2498/2592, maxRel 8.24e-15** con el espejo construido como negación exacta `(-x, y, -z)` del sol fix — las dos construcciones distan 1 ulp (|S_era - S_neg| = 1.11e-16) y sus grids 6.1e-16. El máximo del fondo (suelo D-diurno 0.2838) se reubica 175 -> -5: **+180 EXACTO**, la firma de la invariancia del fondo bajo el fix. Ver también n1 abajo sobre la fuerza "bit-exacta" del certificado.
- **D2 (con estaciones, mecánica de los bumps)**: con 1 estación, celdas modelo-puro (nearDeg>55, wG=0): 1621/2192 bit-iguales bajo rotación (celdas saturadas); celdas cercanas: diferencia ESTRUCTURAL grande — **el bump de estación NO rota** (el IDW es geográfico): eso ES el fix a nivel de datos. Los peores desacuerdos del par entregado bajo rotación caen exactamente en las regiones de estación (Sahel 15-20N/10-25E y Brasil 20-25S/40-50W), coherente con 21 estaciones activas.
- **Pixel/app PENDIENTES** con procedimiento aceptado (ventana tranquila LGDC, 1 tab, before/after en la misma ventana de cache 10 min; app replay manual + tecla E al mismo epoch) y evidencia del bloqueo documentada (loader estancado: endpoints 200 + JSON válido por curl Y por eval en página, 0 errores JS, reloj vivo, estados null en 2 tabs/2 servidores/10+ min con reintentos de 60 s; intentos con 2 servidores + agent-browser + frozen-backend + caches calientes). La deuda queda AHORA desbloqueada (P1/P2 aterrizaron) — ver prescripciones.

## Hallazgo n1 (micro, declarativo; NO es defecto del fix)

La afirmación "fondo BIT-EXACTO (maxRel 0.00e+0)" es **dependiente de la construcción del espejo**. Con el camino literal del wiring era y con la negación exacta del sol, mi reconstrucción independiente da **maxRel 8.2-8.4e-15 (1-2 ulp) en 94-120 de 2592 celdas** — no 0.00e+0. El 0.00e+0 exacto requiere construir TAMBIÉN los vectores de celda rotados como negaciones exactas (los caminos float del producto escalar pasan a ser idénticos), que es presumiblemente lo que hizo el harness throwaway. La conclusión física es idéntica en ambas construcciones (el fondo es el MISMO campo rotado 180, invariante a menos de 2 ulp), pero la redacción "bit-exacta" debe leerse acotada a esa construcción. **Consecuencia para el par pixel (P4)**: la invariancia del render es exacta salvo 1-2 ulp de fo en ~94-120 celdas de fondo; tras la cuantización a 8 bits del texel esto da 0 texels distintos salvo flips aislados en fronteras de cuantización — el criterio del par pixel debe pre-declarar esa tolerancia (o confirmar 0 observados). Registrado como n1-176 para que el par pixel no se mallea.

## Ruling del criterio de invariancia (cierra la ambigüedad que la nota señala con honestidad)

El criterio "el fix NO debe cambiar el render" (P1-174) se acota así, y Muse lo ejecutó exactamente así:

1. **Invariancia pixel-exacta**: vale para fondo/modelo/terminator/cámara — TODO lo que fue par-validado en la era. Verificado a nivel de datos (rotación del fondo a <=8.4e-15; uSunDir intacto; drape identidad).
2. **Bumps de estación del shell derivado**: SE REUBICAN de espejados a verdaderos — eso ES el fix a nivel de datos. No rompen ninguna validación previa porque el shell derivado NUNCA fue par pixel (la deuda P4 se aplazó en 174 precisamente para no gastar pares en un estado que iba a cambiar). Tras el fix, el par app<->web del shell derivado pasa a ser PASSABLE (bumps del lado verdadero como el oráculo).
3. **Alumbrado (uSunDir)**: queda latente (día centrado en verdad+180, era-consistente) — intacto a propósito; cualquier movimiento del terminator exige ruling expreso.

## Barrera GLM-Linux 4/4 VERDE sobre tree gate #13 (scratch-w153-build @ web175-folded)

`npm install` estricto EXIT=0 (lockfile espurio limpiado; sin lockfile en árbol) - `npm test` **97/97 EXIT=0** (12 ficheros: 11 previos + solar.test.ts NUEVO; 92+4+1 == anunciado EXACTO, 1.72 s) - `tsc --noEmit` 0 EXIT=0 - `next build` EXIT=0 COMPLETO (7 rutas, cp -r Unix sano en Linux — el fallo Windows del cp -r es de su entorno, preexistente) - post-build: src/ limpio y post-imágenes 8/8 == fold (incluida route 81f9b516 intacta).

## Prescripciones 177

- **P1 — GAIN post-ACES + materiales** (tramo propuesto por la nota y ya previsto en 174): quirúrgico, mismo género de custodia; el GAIN donde toque según el plan 163; materiales para las shells derivadas. Raymarch sigue fuera de este tramo.
- **P2 — deuda VLM pixel/app (AHORA desbloqueada)**: par pixel before/after con el criterio de invariancia TAL COMO ACOTADO ARRIBA (fondo/modelo/terminator/camara invariante con tolerancia pre-declarada de texels aislados en fronteras de cuantización por el ulp del n1-176; bumps del shell derivado reubicados POR DISEÑO — el par compara app<->web al mismo epoch, no before/after para los bumps); app replay manual + tecla E; ventana tranquila LGDC. Publicar el criterio ANTES de capturar.
- **P3 — P7-174 (spec W-3 íntegra)**: secciones 5 de 158+160+162+164+166+168+170+172+174 consolidadas — W-3 no cierra sin ella.
- **P4 — custodia blob-40** contra web175-folded (`d6b3aea`/árbol `8fb066a7`, tree gate #14).
- **P5 (micro-deuda, opcional, no bloqueante)**: en el próximo drop que toque page.tsx/IonosphereScene.tsx, declarar el consumidor HF de gridState (n5-174) y valorar las deps del useEffect de xray (cuantización del flare).
- W-3 NO CIERRA hasta: GAIN/materiales/raymarch + deuda VLM pixel/app + spec íntegra (protocolo 148).

## Estado del canal y espejos

- Relay `glmrelay` @ `a10af22` limpio y sincronizado (triple local == SSH == HTTPS verificado esta sesión).
- Espejo web: `scratch-webmirror` @ `d6b3aea` (master), tag `web175-folded` (14 tags), árbol `8fb066a7`.
- Sandbox de barrera: `scratch-w153-build` @ `web175-folded` (detached), 97/97 verdes, src/ limpio.
- Espejo C++: `f209cc8` congelado (oráculo SolarPosition/DensityVolume; j174_sun_oracle reutilizado como ancla viva del 176).
- Disco: 5.8 G libres (bajo el umbral de 10 G, sin variación desde 174, vigilado; .next del sandbox regenerable como primer candidato).
- Artefactos del ciclo en `scripts/j176/`: note175.md, web175_mirror-fix.diff (+ web175-pure.diff), vlm175_sun-mirror.csv, vlm175_sun-true.csv, j176_pair_analysis.mjs, j176_live_probe.mjs, j176_negation.mjs, art/ + art_nostep/ (cachés de strip; art_nostep = variante A/B con la línea del paso excisa, diff de 1 línea).
- Próximo número libre: 177.
