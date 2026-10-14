# 276 — W-4 F2a #8 rayos + whistlers (GLM + NWS + B(r)) + errata kp

Segunda pieza F2a (ruling 266). Todo web; app re-congelada 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web276_bolt.diff` — 31436 B,
sha256 `bbd5b1d1fb2069ca6be04e3054f6c158d379534dacef1d75a1910dcf153883b6`,
LF puro, mbox `[PATCH] w276-bolt`, 9 ficheros, 572+/2-.
Pre-tree anclado al certificado: fadeout 5ca26fd · types b085f96 ·
page 415e1fb · panel 065ca06 · escena 649bd9d (5/5 EXACTOS).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261
(shaders/builders/solar/geo/densityVolume) INTACTOS.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/lightning.ts` NUEVO b923589
- `src/lib/iono/lightning.test.ts` NUEVO 5d9bc3a
- `src/app/api/lightning/route.ts` NUEVO 9bc93a6
- `src/components/ionosphere/hud/LightningPanel.tsx` NUEVO 1387ecc
- `src/lib/iono/fadeout.ts` 5ca26fd → 35c10c2 (errata kp, 1 línea)
- `src/components/ionosphere/types.ts` b085f96 → f8a32b4
- `src/app/page.tsx` 415e1fb → 10bf22a
- `src/components/ionosphere/hud/LayersPanel.tsx` 065ca06 → ec20e61
- `src/components/ionosphere/IonosphereScene.tsx` 649bd9d → 263803a

## 2. Referencia pineada (regla 252, ANTES de código)
(a) GLM-L2-LCFA AWS sin auth, verificado vivo 2026-10-14: buckets
`noaa-goes19` (Este) + `noaa-goes18` (Oeste); GOES-16 retirado (hasta
2025). Granulos continuos 20 s (~450 KB NetCDF-4, sin localización
legible: la ruta declara frescura + cobertura, NO flashes).
Cobertura GLM = Américas (declarado en UI).
(b) NWS Alerts sin auth, viva: Severe Thunderstorm Warnings con
polígonos GeoJSON (cúspides honestas; solo CONUS, declarado).
(c) Helliwell 1965 (ducting por líneas de campo): la trayectoria es
la LÍNEA DIPOLAR REAL (toMag + dipoleLinePoints con L y meridiano
del punto — misma API B(r) de O4.5; el conjugado lo reproduce el
puerto independiente).
(d) Sprites SOLO sobre centroides NWS activos (umbral declarado:
aviso presente; sin avisos no hay sprites ni líneas — negativo O8).

## 3. Contenido (O8)
Monitor GLM por satélite (frescura, no actividad) + celdas NWS +
pulsos whistler por líneas B(r) + sprites 40-90 km + panel EN con
limitación visible (resto del planeta sin strokes en v1).
Toggle showLightning default ON. Errata kp del 275 saldada
(comentario acorde a implementación).

## 4. Barrera
`tsc` 0; `vitest` 249/249 (24 ficheros; 242 sin flips + 7 nuevos).
Fuentes verificadas en vivo (S3 G19/G18 + NWS Texas).
Nota de proceso: el revert de escena comió por error el bloque
fadeout de #2 (marcador "fadeout" ambiguo entre piezas); detectado
por triple hash y reconstruido desde el testigo w274/post —
verificado 649bd9d byte-exacto antes del delta. Lección: marcadores
de revert con número de pieza (#8 vs #2).
