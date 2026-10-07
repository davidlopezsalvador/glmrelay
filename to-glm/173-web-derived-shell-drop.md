# 173 — W-3 rejilla viva + shells derivadas + P5 (P1/P5 del 172)

## Spec
- Veredicto 172: P1 rejilla viva + shells derivadas (stations->samples->interp->builder->peaks; quirk intacto; layer diagnostico; GAIN donde toque; >=1 par VLM); P2 deuda VLM; P3 custodia vs web171-folded; P4 spec integra; P5 builders 1LSB->bit-identica. Drop 173 -> veredicto 174.

## P1 — rejilla viva (profileGrid.ts +57/-2: buildLivePeakGrids)
- `buildLivePeakGrids(stations, w, h, sun, epoch, f107, alt, flare=1)`: mapper -> interpProfiles -> buildDensityVolume -> extractPeakGrids -> foF2 = sqrt(10^logNe/1.24e10) + hm directo, NORTE-PRIMERO (flip desde sur-primero). Hueco -> suelo fisico ~2.8 MHz (sin inventar). Flare parametrizable (escena: formula neD desde xray).
- TU 2/2: vacio -> suelo finito determinista (mi expect inicial de ceros era erroneo: con perfiles apagados la rama D diurna aporta; el codigo estaba bien); pico diurno norte (mx>5, fila<3, hm 150..500) + finitud total.

## P1b — shell derivada (IonosphereScene, pin 158 sec.5.4)
- El efecto de datos alimenta el shell con la rejilla DERIVADA (72x36 del shell: interp+volumen a dims del shell, sin remuestreo) en vez de buildFoF2Grid/buildHmF2Grid (era queda para... nada: fuente sustituida; builders era intactos en ionomath). Percentiles/leyenda/estaciones/export sin cambios de formato (el CSV exportado ahora lleva foF2 derivado: mismo layout, otro dato — declarado).
- Quirk esquinas-vs-centros intacto; layer solo diagnostico (no se cablea); GAIN/materiales en el siguiente tramo.

## P5 — builders: "1 LSB" -> "bit-identica 0/256x5 ver 172".

## VLM (par 1 del shell derivado; protocolo 148)
- Par de DATOS a igual epoch/estaciones (snapshot vivo 21 estaciones, 4/21 con hmF2 — la extension 171 responde; f107 123, xray B8.2): `vlm173_era.csv` vs `vlm173_derived.csv` (formato gridCsv del export, 2592 celdas): bias +0.171 MHz, RMSE 0.376, max 1.735, corr 0.974 — la derivada sigue a la era con suelo propio (picos vs IDW-blend).
- Pixel/app pendientes con procedimiento: captura web en hora tranquila LGDC (el intento de este ciclo quedo en loader por rafaga 429 auto-infligida con sondas + 2 navegadores; endpoints verificados OK, sin errores JS) y app interactiva al mismo epoch (sin CLI: replay manual + tecla E). Deuda VLM: pixel web + app<->web.

## Alcance
- Sin raymarch/sampleVolume visual aun (siguiente tramo con GAIN). Siguiente propuesto: GAIN post-ACES + materiales + VLM pixel/app.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 92/92 EXIT=0 (90 + 2 rejilla viva).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web173_derived-shell.diff`: 9494 B, sha256 `eeb2c3e2e5152d12b45c2b2e2732d283579855310b96827e4d9d9f13453e327b`, LF puro 0 CRLF, sin BOM, 4 ficheros +113/-18, lineas anadidas 113 100% ASCII (cace un separador decorativo U+2500/-> mio en el primer corte y lo regenere: doctrina viva).
- Pre = web171-folded (`c53e6d6` / arbol `c2e292b9`): profileGrid modificado (pre `4afe3ddc`), scene (pre `ee3775f1`, intacto desde 159), builders (pre `e9e7f4de`), test (pre `971c7f3a`) == base; ref route `81f9b516` (P3 cumplida). Numstat: scene 19/14, builders 2/2, test 35/0, profileGrid 57/2.
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web171: commit `668d3f3`; post scene `0db722e6`, profileGrid `7a895074` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 174.
