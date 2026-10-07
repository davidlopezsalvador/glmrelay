# 183 — W-3 fix z + raymarch visual + VLM (P1-P4 del 182)

## Spec
- Veredicto 182: P1 fix z + TU convención + errata spec (obligatorio antes del visual); P2 raymarch visual + wiring + par VLM; P3 seam lon con ruling; P4 custodia blob-40. Drop 183 -> veredicto 184.

## P1 — fix z + TU (n1-182)
- `texelAltKm` (gz = altNorm*A - 0.5, centros GL) usado en el puente; header corregido (la "equivalencia exacta" era inexacta en z).
- TU 2/2: control 0.375/0.625 + bordes puros (texeles exactos); radial distingue A-0.5 de A-1 (viejo alpha 0.98216 medido pre-fix, nuevo lejos >1e-6).

## P2 — raymarch visual + wiring
- `shaders.ts` (+123): VOL_VERT/FRAG port GLSL3 de volFragSrc (raySphere, jitter IGN, sombra, decode motor, texelFetch capas, colormap, iso, acum front-to-back, early-outs). `texelFetch` exacto (no NEAREST aproximado).
- `builders.ts` (+105): buildVolumeMesh (esfera 64x32 BackSide, Data3DTexture R8 LINEAR/NEAREST + Clamp, defaults oraculo) + updateVolumeTextures (R8 como updateVolume, recrea si cambian dims).
- Escena (+67): mesh + upload por publicacion (buildLiveVolume 72x36x60/60/700) + uniforms por frame (camPos/sunDir motor) + visibilidad reactiva; toggle `showVolume` (default OFF como visible_=false).
- `profileGrid.ts` (+36/-?): buildLiveVolume extraido (misma cadena; TU 2/2 nuevo; refactor probado por tests previos intactos).
- types + LayersPanel (toggle "Volumen", Boxes).
- P3 seam: wrap heredado de sampleVolume DECLARADO (sonda 182: CLAMP en HW; franja +-2.5 grados solo densidad; no se toca sampleVolume).

## VLM (criterio 177 intacto; par OFF/ON + app)
- Web OFF/ON verificado por clase (Playwright+Chromium, prod build, backend congelado 1 hit/endpoint, cine+aurora OFF, misma camara/epoch): mean 0.52, mediana 0, p99 6, 4.10% >2 LSB, lift +15401. `vlm183_vol-ON.png` vs `-OFF.png`.
- Volumen CONFIRMADO dibujando (diagnostico x3 opacidad: acumulacion diurna inequivoca; revertido a 1.0 verificado byte-identico al delta).
- App<->web: lado app EN MANO (974da28); lado web replay fuera de ventana 6h (432 min); par a epoch comun pendiente de captura fresca app (procedimiento 177 vigente).

## Alcance
- Sin cambios de datos (grids intactas) ni raymarch CPU tocado en semantica (solo puente z). Siguiente propuesto: VLM app fresca + cierre W-3.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 113/113 EXIT=0 (109 + 2 liveVolume + 2 convencion).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia (blob-40 completos, P4)
- Delta `to-glm/files/web183_zfix-raymarch.diff`: 27605 B, sha256 `94301b1347cb90197c9e4ff1c7ec4eeed7edc488eb3d7c82b09a704e92f6cf5f`, LF puro 0 CRLF, sin BOM, 9 ficheros +419/-21, lineas anadidas 419 100% ASCII.
- Pre = web181-folded: march.ts `80364244e063a178e21669c841e8895f6ecbd43b`, march.test `fd3f6a44b4fee015d6d188c564a7beb8f081f1c8`, profileGrid.ts `b42e93f7df1be6bb43d3a1fcbd2e10eebd5ba1e7`, profileGrid.test `d070c79e29bcb7b7dae574a0d65659f9787ed8a8`, shaders.ts `a99eb97134848b5952cc9e0608a9240baacfa652`, builders.ts `7b127bc55b03bff5bffd266818bb5092cb6dd291`, scene `ec2648425d627efae8548b5309f2d03d7b7b60bb`, types.ts `3e2344eb988be56af797f60eb4994f23ce45b4c9`, panel `9d89e6abddc820f29fb719012f606f761a17c257` == base (P4 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web181: commit `f2b8eb471ae9fe8bde4b31db67cc4f044924aacc`; post march `271de0542ffb5383845cd39d4f0b84c8c5853d15`, builders `211ae2ad069edb7f554be37baf3c045cab5a50de` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 184.
