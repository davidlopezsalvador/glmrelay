# 179 — W-3 fix invVP + TU paridad + par VLM (P1/P2 del 178)

## Spec
- Veredicto 178: P1 fix invVP + TU paridad mascara (obligatorio antes del par); P2 par VLM (ventana tranquila + texturas + 1 tab + OFF/ON misma cache + epoch 12:31:50Z replay + criterio sin mover); P3 spec; P4 custodia vs web177-folded; P5 raymarch despues. Drop 179 -> veredicto 180.

## P1 — fix + TU (n1-178)
- Escena (1 linea + comentario): `.multiplyMatrices(P, V).invert()` — la uniforme recibe la INVERSA como el oraculo (`glm::inverse`); sin invertir fallaba ~1/3 de taps.
- `godrays.ts` (+56): `mat4Inverse` (adjunta/determinante, columna-mayor) + `unprojectDir` (clip far-plane -> mundo -> rayo, lineas 47-49 del frag).
- TU 3/3 nuevo: inversa identidad exacta + round-trip vp/lookAt < 1e-12; paridad cielo/disco 0 desacuerdos por el camino completo (4x0 + 5x1); tapUV->unproject->mask (tap0 en tierra, tap11 en cielo).
- Suite 99->102 (13+2+3 godrays).

## P2 — VLM
- Criterio 177 INTACTO sin mover (geometria + OFF==pre-177 + velo por diseno + tolerancia 8-bit).
- Web OFF/ON: [resultado + metricas].
- App<->web: lado app EN MANO (974da28: PNG 12:35:04Z + CSV DATA 12:31:50Z, glow ESE); lado web a replay 12:31:50Z [resultado].
- Playwright 1.63 + Chromium 1243 propios (ms-playwright local); texturas throwaway (nunca shipeadas, borradas tras capturar).

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 102/102 EXIT=0.
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web179_invVP-fix.diff`: 7546 B, sha256 `47dc85d5eb4bf1a46fe4d14cf2eb35872409efac05d5cdc4ed118cb3718722d6`, LF puro 0 CRLF, sin BOM, 3 ficheros +107/-2, lineas anadidas 107 100% ASCII.
- Pre = web177-folded: godrays.ts (pre `ed418544`), scene (pre `6e045b68`), test (pre `8951e82c` == post-178) == base (P4 cumplida). Numstat: scene 6/2, test 45/0, godrays.ts 56/0.
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web177: commit `8a1a5e7`; post test `c48c59b5`, scene `ec264842` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 180.

## VLM addendum (post-nota, capturas ejecutadas con el fix dentro)
- Web OFF/ON post-fix (`vlm179_web-ON.png` vs `vlm179_web-OFF.png`, Playwright+Chromium, prod build, backend congelado 1 hit/endpoint, cine OFF, misma camara/epoch): mean 0.339, mediana 0, p99 3, 1.12% >2 LSB; lift +139405. God-rays toggle verificado en captura.
- Web replay 12:34Z (`vlm179_web-replay-123150Z.png`, slider 231.8 verificado): glow arriba-izda., legend replay -3.8 h. Par con app 12:35:04Z DATA 12:31:50Z: mismo dayside + glow en ambos (camaras distintas, declarado) — PASS cualitativo.
- Causa del bloqueo anterior cazada: dev+Turbopack no hidrata en este sandbox (prod si); texturas ausentes del ZIP (throwaway, borradas).
