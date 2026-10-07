# 177 — W-3 GAIN post-ACES + materiales + VLM (P1/P2/P5 del 176)

## Spec
- Veredicto 176: P1 GAIN + materiales (quirurgico); P2 VLM pixel/app con criterio ACOTADO pre-publicado; P3 spec; P4 custodia vs web175-folded; P5 n5-174 opcional. Ruling invariancia: pixel-exacto fondo/modelo/terminator/camara (tolerancia pre-declarada a texels en fronteras 8-bit por ulp); bumps REUBICADOS por diseno (par app<->web PASSABLE). Drop 177 -> veredicto 178.

## P1 — pase god-rays post-ACES + materiales
- `shaders.ts` (+65): GODRAYS_VERT/FRAG port GLSL1 de shaders/godrays.frag (12 taps, aspecto, decay^i, mascara B con t1>1e-4, falloff, GAIN; early L<1e-5).
- `builders.ts` (+31): buildGodRaysPass() con las constantes certificadas (DECAY/MAX_RADIUS/FALLOFF_K/GAIN/sol 1.0,0.90,0.75 de godrays.ts; triple crudo sin conversion, como el oraculo). Ultimo pase tras OutputPass = GAIN post-ACES por construccion (el composer vuelca a pantalla el ultimo activo).
- Escena (+39): puerta CPU por frame con el espejo (godraysPassState: projectSun+gateSkip+rayHitsEarth sobre vp certificada mat4Mul; sol = mismo vector del sprite, motor-consistente); toggle settings.showGodrays (default ON productivo); P5-176 incluida (HF/gridState + xray-deps en comentario). Velo global ~0.13 en cielo (Σdecay 7.18 x GAIN 0.12, identico oraculo): look cine intencionado, no defecto.
- types.ts (+2): showGodrays + default true. LayersPanel (+8/-1): toggle "God rays" (Sun).
- TU godraysPassState 2/2 (nuevo): lateral visible con UV en [0,1] (el frontal queda ocluido por la Tierra: la puerta hace su trabajo); detras/fuera/limbo apagados.
- NO tocado (declarado): sprites del sol (look tuned), aurora (colores propios), earth/atmo. Materiales = pase + shell (LUT 171).

## P2 — VLM con criterio ACOTADO (pre-publicado aqui antes de capturar)
- Criterio CORREGIDO antes de shippear (pesca propia al releer el frag: el velo NO es <=2 LSB): el pase es puramente aditivo (base intacta + GAIN*fall*rays; Σdecay = 7.18, velo global ~0.13 en cielo con sol visible, identico oraculo). Invariancia GEOMETRICA garantizada por construccion (sin vertices: imposible desplazar); con showGodrays=false la cadena es BIT la pre-177 (el composer salta pases apagados: Render->Bloom->Output a pantalla, identico). OFF/ON difieren en velo calido global + glow (diseno, no defecto).
- OFF/ON web EJECUTADO (Playwright+Chromium propios, prod build — el dev no hidrata aqui; backend congelado 1 hit/endpoint, cine OFF, misma camara/epoch): mean 0.339, mediana 0, p99 3, 1.12% >2 LSB, 0.71% >8, 0.12% >32; lift ON-OFF +139405 (el glow suma). `vlm179_web-ON.png` vs `vlm179_web-OFF.png`. (Intento previo con cine ON descartado: autorrotaba entre tomas.)
- App<->web EJECUTADO (cualitativo): app 12:35:04Z DATA 12:31:50Z (glow derecha) vs web replay 12:34Z (`vlm179_web-replay-123150Z.png`, glow arriba-izda. en su vista, slider replay verificado en captura): mismo dayside + glow presente en ambos; camaras distintas (declarado). PASS cualitativo. Causa del bloqueo anterior cazada: dev+Turbopack no hidrata en este sandbox (prod si); texturas ausentes del ZIP (throwaway locales, borradas).

## P5 — declaraciones consumidas (n5-174 cerrada).

## Alcance
- Sin raymarch/sampleVolume visual (tramo siguiente) ni cambios de datos (grids intactas). Siguiente propuesto: raymarch + VLM pixel/app ejecutado.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 99/99 EXIT=0 (97 + 2 pass-state).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web177_gain-materials.diff`: 14461 B, sha256 `655b0d4ead03fbe208b942e33a33ad52640cbfac2b3176282137e5d41551e6f7`, LF puro 0 CRLF, sin BOM, 7 ficheros +191/-1, lineas anadidas 191 100% ASCII (cace separador U+2500 mio y regenere).
- Pre = web175-folded (`d6b3aea` / arbol `8fb066a7`): godrays modificado (pre `c898c589`), scene (pre `08a8acb`), shaders (pre `ba280297`), builders (pre `4d50f0bf`), types (pre `678c6afe`), panel (pre `6eb92678`), test (pre `f14435d7`) == base sin deriva (P4 cumplida). Numstat 7 ficheros +191/-1.
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web175: commit `c798e25`; post builders `7b127bc5`, godrays.test `8951e82c` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 178.
