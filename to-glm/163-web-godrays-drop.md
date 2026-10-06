# 163 — W-3 god rays (P1 del 162, mismo patron)

## Spec
- Veredicto 162: P1 god rays 143/147 mismo patron (espejo + TU pin a pin con toda la superficie replicable); P2 deuda VLM viaja con el wiring; P3 custodia vs web161-folded; P4 spec integra. Drop 163 -> veredicto 164.

## P1 — god rays screen-space (spec 158 sec.5.3)
- `godrays.ts` (nuevo): espejo puro de `Utils/Godrays.h` (drops 143/147): constantes nombradas `NTAPS=12 · DECAY=0.90 · MAX_RADIUS=0.45 · FALLOFF_K=8.0 · EARTH_R=1.0 · GAIN=0.12 · sol calido (1.0, 0.90, 0.75)`; `projectSun` (clip con w, puertas behind/offscreen); `rayHitsEarth` (guarda 1e-4, cruce por delante `-b+sqrt`); `tapWeight` (clamp i<0, `pow(DECAY,i)`); `falloff`; `tapMask` (opcion B: solo la Tierra ocluye); `tapUV` (correccion de aspecto, clamp a MAX_RADIUS, i=0 -> pixel); `gateSkip`. Incluye el algebra minima que projectSun necesita (perspective/lookAt/mat4 columna-mayor como glm, vec3/vec4) — misma convencion que el oraculo. Sin DOM, sin three, sin GL.
- `godrays.test.ts` (nuevo, TU OBLIGATORIO 13/13 replicando `test_godrays.cpp` + pines de constantes): proyeccion 3 casos (delante ni behind ni offscreen; detras behind + skip; tras limbo skip por oclusion); NTAPS==12, pesos no crecientes y positivos, w0==1 exacto; mascara corredor=0/cielo=1, falloff monotono; off-screen->skip, tap0==pixel (1e-6), tap11 mismo eje con clamp (`0.5 < x <= 0.9`); constantes de la spec.
- Micro-divergencia declarada (equivalente): C++ divide el paso por `11.0f` literal; TS por `(NTAPS - 1)` — mismo valor 11, derivado de la constante pineada en vez de hardcodeado (mismo genero que `tourTotal` derivado del 157, registrado en 158).
- Alcance declarado (igual que 159/161): SOLO espejo puro + TU. Sin wiring visual ni VLM posible aun; deuda VLM intacta y viajando con el wiring del volumen.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 49/49 EXIT=0 (7 export + 7 alerts + 6 wiring + 6 tour + 6 shadow + 4 jitter + 13 godrays).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web163_godrays.diff`: 9816 B, sha256 `cd1a3d1192ad158b99b1035b6cb7eab480ed89454e3b647c7a49110982bee718`, LF puro 0 CRLF, sin BOM, 2 ficheros NUEVOS +283/-0, lineas anadidas 283 100% ASCII.
- Pre = web161-folded (`4c6a2b0e` / arbol `57d96599`): ambos ficheros NUEVOS (pre 0000000); refs de cadena jitter `9222237e` y shadow `cf20cc70` == post-imagenes del veredicto 162 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web161: commit `c087704`; post godrays `c898c589`, godrays.test `f14435d7` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 164. Siguiente sub-feature propuesto: shells Chapman volume-derived + colormaps (ultimo tramo W-3 espejos), luego wiring visual con VLM.
