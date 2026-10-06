# 167 — W-3 wiring tramo 1: evalNeTotal con winner + buildDensityVolume (P1 del 166)

## Spec
- Veredicto 166: P1 wiring con decision DECLARADA (port evalNeTotal con winner vs adaptacion neTotal, Q1/Q2); P2 VLM viaja con wiring vivo; P3 custodia vs web165-folded; P4 spec integra; P5 guarda como rango (~2e-7..2.1e-6, anotado abajo). Drop 167 -> veredicto 168.

## P1a — layerProfile.ts (port de LayerProfile.h: chapmanAlpha, sanitize oraculo-exacto, profileFromFo, f2FloorKm, evalNeTotal con winner, buildDensityVolume con suelo memoizado)
- Estructura 1:1 con el oraculo (mismo orden de ramas D/E/F1/F2, max() estricto con empates a la mas baja, puerta f2Floor solo para el win F2, topside/bottomside con taper, early-out del suelo, barrido 1 km).
- Memoizacion bit-identica (124 sec.2 pre-autorizada): el suelo solo depende del perfil; el builder lo calcula una vez por celda de perfil via evalWithFloor interno. Pineado: builder == ingenuo celda a celda bit-exacto en el TU.
- `profileFromFo` mapea datos web (fo/hmF2/B0/B1) al struct del oraculo (fo->Nm 1.24e10, hmF1 = max(150, 0.8*hmF2), flags por fo>0).

## Decision neTotal <-> evalNeTotal (n2 de 164/166, DECLARADA)
- Nucleo compartido identico (Chapman-alfa/Epstein ya porteados en ionomath). La COMBINACION difiere y ambas conviven: neTotal queda para radio/UI; evalNeTotal (este modulo) para el volumen. Divergencias declaradas: (1) sin winner en neTotal; (2) D: neTotal flare interno + noche con flare vs gate estricto cosChi>0 + flare externo; (3) E/F1: neTotal atenua inline por dayFactor vs mutacion applyDayNight; (4) F2: neTotal factor nocturno 0.25+0.75*dayFactor vs F2 plena + puerta f2Floor; (5) sanitizeB0 default 100 oraculo vs 90 legacy (borde invalido solo; el builder usa 100).

## TU layerProfile.test.ts (16/16: replica test_layer_winner.cpp + pines builder)
- Suelos exactos 110/-1/167.0 + REAL-shape 145/155/136 + continuidad B0 (pines medidos del C++, verificados float64-robustos antes de pinearlos: margenes >> 1e-6); winners dia/noche 75/110/200/300/60/100; invariante best bit-identico contra max() viejo transcrito (genero del C++; la puerta legitima se aisla: divergencia de winner solo si h <= suelo); profileFromFo; builder (tamano erroneo invalido, rangos, memo invisible).

## P5 — guarda como rango
- Confirmado y cuantizado: el corrimiento es stop-dependiente ~2e-7 (aurora central, segmento 0.25) .. 2.1e-6 (viridis ultimo r, segmento 0.12); el C++ lo tiene igual; pines a 5 digitos con margen.

## Alcance
- SOLO nucleo puro + TU (sin escena, sin VLM posible aun; deuda intacta). Siguiente tramo propuesto: rejilla de perfiles desde ionosondas (IDW) + primer wiring visual (shells derivadas via extractPeakGrids).

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 81/81 EXIT=0 (65 + 16).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web167_volume-builder.diff`: 19188 B, sha256 `b69f6675affda5c98096da8db4a34768d8ec6c824b964529b02441707e6d8a68`, LF puro 0 CRLF, sin BOM, 4 ficheros +535/-0, lineas anadidas 535 100% ASCII.
- Pre = web165-folded (`a8a5d92` / arbol `b194e54e`): layerProfile + test NUEVOS (pre 0000000); densityVolume modificado (pre `4f8c4126` == post del 166); refs godrays `c898c589` == post del 164/166 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web165: commit `e91928c`; post layerProfile `4184bdb1`, layerProfile.test `a71726c7`, densityVolume `45e51d8d`, densityVolume.test `78acbd13` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 168.
