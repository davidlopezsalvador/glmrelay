# 181 — W-3 march CPU + spec integra + P4 HUD (P1-P4 del 180)

## Spec
- Veredicto 180: P1 raymarch/sampleVolume (TU paridad camino completo + constantes 1:1 + VLM solo si altera pixeles); P2 spec W-3 INTEGRA (tercera re-prescripcion, prioridad maxima); P3 blob-40 EN LA NOTA; P4 opcional HUD replay (effSec + TU o declarar LIVE). Drop 181 -> veredicto 182.

## P1 — volumeMarch.ts (espejo puro del loop volFragSrc 48-141)
- `marchRay(vol, ro, rd, opts)`: entrada/salida raySphere, clip planeta, oclusion modo-1 (tEA), dt, jitter IGN del punto, sombra dura, decode geo motor (lon = pi-atan2, t sur-primero), muestreo via sampleVolume (equivale al LINEAR), colormap/layers fijos, iso 10.5/11/11.5, acumulacion front-to-back con early-outs 0.98/0.001 (null si <=0.001). Reusa 4 espejos certificados. `raySphereT` canonico (t0/t1). Constantes 1:1 (STEPS 64, OPACITY 1, ISO_WIDTH 0.02, ISO triple, colores D/E/F1/F2, EARLY/MIN).
- Altura TRUE equivalente al R de textura (capas ^1.5 lineales en indice): interpolacion del mismo tramo (exacta, no la curva).
- NO cableado a escena (sin VLM: no altera pixeles — P1-180 lo exige solo si altera).
- TU 7/7: consts, raySphereT exacto, descartes (invalido/fuera/opacidad 0), saturacion densa (alfa>0.98 + hue viridis), dia/noche (mismo rayo, sol invertido -> null), determinismo, capas (hue cian) + iso ilumina.

## P2 — spec W-3 integra (`to-glm/181-web-spec-W3.md`, prioridad maxima)
- Consolidado 158..178 s5: 8 espejos con TU + wiring + VLM ledger + 12 decisiones Q1/Q2 + deudas con dueno + criterio de cierre. Referencia de conformidad desde 181.

## P4 — HUD replay (opcional ejecutada)
- subsolar(now) -> subsolar(effSec): en replay muestra el subsolar del epoch visible (antes: reloj LIVE contradictorio, o5). Display con escape `{"\u00B0"}` (patron ASCII; render identico). TU geografico ya existe (solar.test.ts); wiring de 2 lineas.

## Alcance
- Sin raymarch visual (march puro, sin cablear) ni cambios de datos. VLM N/A (cero pixeles tocados; HUD solo en replay). Siguiente propuesto: raymarch visual + su VLM.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 109/109 EXIT=0 (102 + 7 march).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia (blob-40 completos, P3)
- Delta `to-glm/files/web181_raymarch-spec.diff`: 13288 B, sha256 `0a0101d37ab46954306d3c9d7ddbc34b45e84cb92f2f7a63d5cd3f698e7176e7`, LF puro 0 CRLF, sin BOM, 3 ficheros +291/-2, lineas anadidas 291 100% ASCII.
- Pre = web179-folded: page modificado (pre `31988b1272a341bae5191d7d8dad8689a9afe173`); volumeMarch + test NUEVOS (pre 0000000); refs godrays.ts `1d2fc0a51bfbf7667e4bc41d86a2b1e4e3f4ca20` y scene `ec2648425d627efae8548b5309f2d03d7b7b60bb` == posts del 180 (P4-180 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web179: commit `2e9912a81f55bcfdc1f4a19f68a11628eadd42b0`; post march `80364244e063a178e21669c841e8895f6ecbd43b`, test `fd3f6a44b4fee015d6d188c564a7beb8f081f1c8`, page `782d043ad873570f7f379eae7ad8ffd717fd2891` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 182.
