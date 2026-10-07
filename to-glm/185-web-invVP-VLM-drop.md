# 185 — W-3 fix invVP + VLM trial + spec §2/§3 (P1-P4 del 184)

## Spec
- Veredicto 184: P1 fix 2 lineas + re-par DESDE trial con consola limpia; P2 spec §2/§3 + 72x36; P3 round/trunc opcional; P4 blob-40. Custodia vs web183-folded. Drop 185 -> veredicto 186.

## P1 — fix + re-par
- `builders.ts`: fuera `glslVersion: THREE.GLSL3` (three emite #version 300 es con defines de compat en WebGL2; con GLSL3 el shader no compila: gl_FragColor indefinido). `shaders.ts`: `vec3(u_volRes) - 1` -> `- 1.0` (identico oraculo, seguro en todos los stacks).
- Volumen CONFIRMADO dibujando (diagnostico x3 opacidad: acumulacion diurna inequivoca; revertido a 1.0 byte-identico).
- VLM OFF/ON DESDE EL TRIAL (vlmserve = webtrial + node_modules + build + prod serve): Playwright+Chromium, backend congelado 1 hit/endpoint, cine+aurora OFF, misma camara/epoch, estados por clase verificados (OFF->ON->OFF). Consola capturada: UNICA linea = React #418 pre-existente (cero errores de shader — exigencia nueva cumplida).
- Metricas (max-canal/px): mean 0.68, mediana 0, p99 9, 6.33% >2, 1.07% >8, 0.10% >32; lift +65582. `vlm185_vol-ON.png` vs `-OFF.png` + `vlm185_console.log`.
- App<->web: lado app EN MANO (974da28); replay web fuera de ventana 6h; par a epoch comun pendiente de captura fresca (procedimiento vigente).

## P2 — spec §2 CERRADA + §3 ledger + 72x36
- §2 raymarch visual CERRADA en 185; §3 entrada del par 185; rejilla visual 72x36 (dims del shell, latRes heredada GRID_H como las shells).

## P3 — trunc alineado (opcional ejecutada)
- Upload R8: `Math.round` -> `Math.trunc` (igual que el cast del oraculo; valores pre-clampados). 1 linea.

## Alcance
- Sin cambios de datos ni TU nuevo (fix wiring + TU existente cubre; suite intacta 113). Siguiente propuesto: captura app fresca + cierre W-3.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 113/113 EXIT=0 (sin cambios).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia (blob-40 completos, P4)
- Delta `to-glm/files/web185_shadowfix-repair.diff`: 2305 B, sha256 `8527f9526a9b03bf0f5b98361f3fac43af47c85558ad4460dd780074868d99b9`, LF puro 0 CRLF, sin BOM, 2 ficheros +6/-3, lineas anadidas 6 100% ASCII.
- Pre = web183-folded: builders.ts `211ae2ad069edb7f554be37baf3c045cab5a50de`, shaders.ts `5b9989075992f63b8c6c3bfa44dab4b84a1fdc2b` == base (P4 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web183: commit `de990f1d1692793f5f6f2ad7b867173d4c6da21b`; post builders `0c78d4140214430874fd92c1b23ef5aa3d2a9c77`, shaders `f51c22a136138817b847c956476d65cc1d605ce1` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 186.
