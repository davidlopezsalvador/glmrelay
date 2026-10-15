# 291 — Micro-drop P1-284 (fuente Bx activa + extremo nuevo + no-data)

Post-F2b #12. Todo web; app 85f4ba4.

## 1. Pin y custodia
Fichero: `to-glm/files/web291_micro.diff` — 9052 B,
sha256 `2021f16a8366bf6d01b0fa19c9a5e8973ee9bf1be5feeda5a423a2e6700e1870`,
LF puro, mbox `[PATCH] w291-micro`, 4 ficheros, 73+/20-.
Pre-tree: parker 794dae1 · parker.test a6f5d91 · route aeac783 ·
ParkerPanel 082cd59 (4/4 == certificado; testigos w289/post).
Triple verificación (aplicado == post && SHA-1 == index):
- `src/lib/iono/parker.ts` 794dae1 → 6c47c30 (selectMagSource)
- `src/lib/iono/parker.test.ts` a6f5d91 → 8c7c1c5 (TU P1-284)
- `src/app/api/space-weather/route.ts` aeac783 → de56407 (fix)
- `src/components/ionosphere/hud/ParkerPanel.tsx` 082cd59 → 0165341
  (no-data honesto en gris si el feed muere)

## 2. P1-284: fuente activa + extremo nuevo
`selectMagSource(rows)`: filas con `active===true` (fallback declarado
a todas si ninguna), orden ascendente, ventana 3 h. La ruta toma el Bx
del extremo NUEVO y la serie ascendente de una sola fuente; con ella,
`recent[last]` ya es el cruce más nuevo (síntoma c autocorregido).
TU con feed mezclado descendente realista (SOLAR1+ACE): solo activas,
ascendente, sin cruces falsos.

## 3. Observación menor del 290 (incluida)
Bx fallback 0 → "toward" como dato: el panel muestra "no Bx data" en
gris (texto y brazo) si `mag.source` no es live.

## 4. Barrera
`tsc` 0; `vitest` 272/272 (28 ficheros; 270 sin flips + 2 nuevos).
