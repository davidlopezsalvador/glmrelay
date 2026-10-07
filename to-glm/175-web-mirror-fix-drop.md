# 175 — RULING doble espejo + applyDayNight + dims oraculo (P1-P3/P5-P6 del 174)

## Spec
- Veredicto 174 §5: P1 ruling+fix coordinado en UN drop (sun.dir + drape + solarZenithDeg + HUD; TU geografico; VLM invariancia); P2 applyDayNight + TU; P3 60/60/700 o declarar; P4 VLM despues de P1/P2 (GAIN en paralelo = siguiente tramo); P5 docs; P6 custodia vs web173-folded; P7 spec. Drop 175 -> veredicto 176.

## P1 — fix coordinado (4 puntos, en UN drop)
- Volumen: `sun.dir` directo (ya es el vector motor, paridad <=4.6e-7); cae `densityDir(subsolar)` + su comentario inexacto ("como el C++": el C++ usa getDirection directo).
- Drape IONO_VERT: `uu = fract(phi/2pi)` (fuera el +0.5 que desplazaba cada columna a lon+180). Punto unico (fo y hm comparten vGridUv).
- solarZenithDeg: punto en marco motor (densityDir) en vez de escena (mezclaba marcos: punto escena . sol motor). Mueve el mediodia era al lado verdadero + absorcion RadioPanel.
- HUD unificado: page subsolar() delega en getSunInfo (decodificacion corregida); una sola fuente.
- uSunDir DECLARADAMENTE INTACTO (criterio de invariancia del ruling: el fix no debe cambiar el render). Derivacion propia: con datos+drape corregidos el render es identico texel a texel; mover el terminador lo romperia. El alumbrado queda latente (dia centrado en verdad+180, como en la era) para ruling futuro; no se toca sin ruling.
- TU geografico solar.test.ts 4/4: subsolar 12:00Z lon -3.07 (|.|<6), motorToLatLon invierte densityDir, cosChi>0.999 en subsolar, cenit<5 en subsolar.

## P2 — applyDayNight en buildLivePeakGrids (App.cpp:2433) + TU muerte nocturna
- Antipoda con E diurna fuerte: hm>200 (F2 modelo, sin contaminacion ~110). 

## P3 — dims oraculo 60/60/700 en la llamada de escena (App.cpp:2437). Struct conserva defaults.

## P5 — docs: ~2.8 -> 0.09/0.28; FO_TO_NM_LIVE eliminado (import FO_TO_NM).

## VLM (invariancia mecanica certificada + par de datos; pixel/app pendientes)
- CERTIFICADO (harness throwaway con codigo real, no entregado): fondo modelo-sin-estaciones BIT-EXACTO bajo espejo+shift (maxRel 0.00e+0); con estaciones el maximo global se reubica -170 -> +15 (los bumps caen del lado verdadero; el fondo no se mueve). `vlm175_sun-true.csv` vs `vlm175_sun-mirror.csv` (2592 celdas, mismo epoch/estaciones).
- Lectura honesta del criterio: la invariancia pixel-exacta vale para el fondo/modelo/terminator/camara; los bumps de estacion SE REUBICAN (de espejados a verdaderos) — eso ES el fix a nivel de datos. Si el criterio exigia pixeles identicos tambien en bumps, el par pixel lo confirmara/refutara.
- Pixel/app PENDIENTES con procedimiento y evidencia del bloqueo: loader estancado en este sandbox (endpoints 200+JSON valido via curl Y via eval en pagina, 0 errores JS, reloj vivo, estados null en 2 tabs/2 servidores/10+ min con reintentos de 60s). Intento documentado: 2 servidores + agent-browser + frozen-backend (init-script rompe la navegacion en esta version) + caches calientes. Procedimiento aceptado: ventana tranquila LGDC (sin sondas propias), 1 tab, captura before/after en misma ventana de cache 10 min; app sin CLI (replay manual + E al mismo epoch).

## Alcance
- Sin GAIN/materiales (siguiente tramo 176) ni raymarch. Siguiente propuesto: GAIN post-ACES + materiales + VLM pixel/app.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 97/97 EXIT=0 (92 + 4 solar + 1 noche-E).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web175_mirror-fix.diff`: 14512 B, sha256 `db3547134d62dedae818543e8661d971ff0f8613aff7f45ab8f6d9b700734e72`, LF puro 0 CRLF, sin BOM, 7 ficheros +123/-33, lineas anadidas 123 100% ASCII (cace 4 bytes mios — Convencion/esferica — y regenere).
- Pre = web173-folded (`2e5c0b1` / arbol `0e06c203`): solar modificado (pre `cffac926`), shaders (pre `4e1e023b`), page (pre `0ac182e0`), scene (pre `0db722e6`), profileGrid (pre `7a895074`), test (pre `44bde0f9`); solar.test.ts NUEVO (pre 0000000); ref route `81f9b516` (P6 cumplida). Numstat: page 5/8, scene 9/4, shaders 8/4, test 25/0, profileGrid 10/8, solar.test 40/0, solar 26/9.
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web173: commit `ac719d4`; post solar `b6865e27`, shaders `ba280297`, page `31988b12` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 176.
