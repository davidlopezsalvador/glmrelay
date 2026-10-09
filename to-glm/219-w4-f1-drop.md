# 219 — W-4 clase F1: ref-shells dinámicas + iso + labels

## 1. Pin y custodia
Fichero: `to-glm/files/web219_f1.diff` — 19970 B,
sha256 `a148bd4173deef9a968f4ba91b89d9dde3a136e9d3dc5344c2eaa065f9ba1279`,
LF puro, mbox `[PATCH] w219-f1`, 6 ficheros.
Pre-tree anclado: escena 264f7f8 (209-post byte-idéntico, verificado
contra el post-209 guardado) y types 94c53ad (217-post); builders y
panel sin deltas previos en la línea (primer toque, declarado).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/components/ionosphere/builders.ts` 0c78d41 → 50a8063 (wireframe)
- `src/components/ionosphere/IonosphereScene.tsx` 264f7f8 → 55eda60
- `src/components/ionosphere/types.ts` 94c53ad → 00dfd14 (2 settings)
- `src/components/ionosphere/hud/LayersPanel.tsx` becdc5a → 11c9fdd (3 UI)
- `src/lib/iono/refshells.ts` NUEVO 7c26a0e
- `src/lib/iono/refshells.test.ts` NUEVO 5c1747b

## 2. Contenido (clase F1)
- Ref-shells E/F1/F2 wireframe (ecuador+paralelos+meridianos, colores
  app, sin anillo D) con altitudes dinámicas E110/F1-max(150,0.8mh)/
  F2-mh por mediana hmF2 + guard, rebuild por clave (quits per-frame
  rewrite), toggle showRings con UI "Ref shells".
- Iso-bands: u_isoOn = showIso (uniform ya existía, width 0.02); UI.
- Labels 3D imperativas (estación TX/RX "CODE F2 hmm", aurora 67N
  meridiano medianoche, TEC sub-cámara 300 km; cull dorso+NDC, offset
  +12/-26); UI. Sin React en el hot path.
- TU `refshells.test.ts`: 8/8 (alturas/guard/clave, colores, iso,
  cull, medianoche == vec3ToLatLon antisolar).

## 3. Adenda E o3-o6 (prescripción 218)
- o3 (72×72 vs 72×36): ADAPTACIÓN declarada (doblar celdas del shell
  ~2× coste por update; alineación solo con medida en E-tail).
- o4 (DIAS): DECLINADA confirmada (sin cambio).
- o5 (stale/M4R-A) + o6 (point-size): backlog E-tail (fontanería de
  flags en StationData + slider).
- F2: se declara espejo opacidad **setOpacityScale [0,3]**
  (VolumeRenderer.h:37; slider UI 0-2.5 como el app) + modo Chapman.

## 4. Barrera
`tsc` 0; `vitest` 147/147 (139 sin flips + 8 nuevos).
