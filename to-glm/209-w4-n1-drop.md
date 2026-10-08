# 209 — W-4 n1-208: label fijo = centro

One-liner del veredicto 208: en modo fijo el app muestra el centro en
ambos lados (App.cpp:3146); el web mostraba los endpoints ±2.

## 1. Pin y custodia
Fichero: `to-glm/files/web209_n1.diff` — 2363 B,
sha256 `ab3c6acfe6f2620e5fb7f51da6ae43d217862d5a2b105d69f9b33e66a34609c6`,
LF puro, mbox `[PATCH] w209-n1`, 2 ficheros.
Pre-tree = 207-post (test ef2fa38 / escena 2e2ea51 exactos).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/lib/iono/slice.test.ts` ef2fa38 → d3a1315 (+1 it centro)
- `src/components/ionosphere/IonosphereScene.tsx` 2e2ea51 → 264f7f8

## 2. Contenido
Escena: en fixed, coords = centro (sliceLatA/LonA) en ambos lados
para el label; manual/link intactos. TU: fijo con A=(40,-4) →
"40.0,-4→40.0,-4 pk 11.2".

## 3. Barrera
`tsc` 0; `vitest` 128/128 (127 sin flips + 1 nuevo).
