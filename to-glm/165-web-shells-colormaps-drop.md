# 165 — W-3 ultimo tramo espejos: shells Chapman + colormaps (P1 del 164)

## Spec
- Veredicto 164: P1 shells volume-derived + colormaps con matriz de oraculos (buildPalette con pines propios —no hay TU C++ dedicado—, alinear con colormaps.ts o declarar relacion; DensityVolume layout + applyDayNight; pin shells DERIVADAS; RefShells GL -> solo logica pura/declarar no-espejable); P2 VLM viaja con wiring; P3 custodia vs web163-folded; P4 spec integra. Drop 165 -> veredicto 166.

## P1a — colormaps (Colormap.h)
- `colormaps.ts` (+37): `buildPalette(name, n)` port de `colormap::buildPalette` sobre las MISMAS tablas del fichero (alineacion = un solo juego de stops; `sampleColormap` y `buildPalette` son dos vistas del mismo dato). Misma semantica: t = i/(n-1), tramo por inclusion, guarda 1e-6, desconocido -> viridis. Salida plana RGB x n.
- `colormaps.test.ts` (nuevo, 5/5 pines propios): longitud + extremos (5 digitos por la guarda, igual que el C++), default viridis, 5 paletas en rango, consistencia buildPalette vs sampleColormap < 1e-9 en malla 33, aurora interpola el verde neon.
- Nota de precision honesta: los extremos exactos de stop caen a ~2e-7 por la guarda 1e-6 del denominador (igual en C++); se pinean a 5 digitos, no exactos.

## P1b — density volume, parte pura (DensityVolume.h sin LayerProfile/GL)
- `densityVolume.ts` (nuevo): constantes `72x72x48, alt 60..500, log 8..12.5, suelo 8.5`; `volumeIndex` (layout `data[(a*H+y)*W+x]`); `volumeAltKm` (^1.5); `densityDir` (convencion theta = pi - lon, con el OJO de meridianos del C++); `applyDayNight` (smoothstep(-0.05,0.25), e<=0 apaga flags; interfaz minima DayNightProfile); `extractPeakGrids` (pico + vertice de Lagrange con alturas reales + umbral 8.5 -> hueco; pin 158 s5.4: shells DERIVADAS); `integrateTEC` (trapezoidal con Ah real, acumulador double como el C++); `sampleVolume` (trilineal, wrap lon, clamp lat/alt).
- `densityVolume.test.ts` (nuevo, 11/11): consts, layout, alturas (extremos + malla densa abajo), direcciones (-X/+Z/+Y), dia/noche (subsolar intacto, antisolar apaga, terminador e == 2/27, tamano erroneo no-op), picos (logNe 12.5 exacto + hm en punto medio para pico simetrico + hueco + invalido), TEC uniforme 0.0044 + bordes, campo constante + invalido.
- NO espejado (declarado, viaja con el wiring): `buildDensityVolume` (necesita rejilla LayerProfile + evalNeTotal, inexistentes en lib) y `RefShells` (clase GL pura VAO/VBO/shader: nada de logica pura; la web ya tiene `buildRefRings` como equivalente).

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 65/65 EXIT=0 (7+7+6+6+6+4+13+5+11).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web165_shells-colormaps.diff`: 20147 B, sha256 `85b2ea60341b0a2f72758e6aa5b70b13679c39e3fbc2aec7b0ec198f81a50115`, LF puro 0 CRLF, sin BOM, 4 ficheros +510/-0, lineas anadidas 510 100% ASCII.
- Pre = web163-folded (`9374246` / arbol `ac878dd6`): colormaps modificado (pre `7030c592`); densityVolume + 2 tests NUEVOS (pre 0000000); refs de cadena godrays `c898c589` y jitter `9222237e` == post-imagenes del veredicto 164 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web163: commit `02b6cbc`; post densityVolume `4f8c4126`, densityVolume.test `5d235bb5`, colormaps `47159a8b`, colormaps.test `24361a79` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 166. Con este tramo, los 4 espejos W-3 estan completos a nivel espejo+TU; queda el wiring visual con VLM (deuda registrada).
