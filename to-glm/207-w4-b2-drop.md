# 207 — W-4 B2: o4 (a-e) + n1 affordance

Pool B-tail del 202 + micro-nit n1-206. Cierra el código de B.

## 1. Pin y custodia
Fichero: `to-glm/files/web207_b2.diff` — 7771 B,
sha256 `0892fd5bd9638669021e1c7093d3ed957b35630e2e736a65c0c03de713214db7`,
LF puro, mbox `[PATCH] w207-b2`, 4 ficheros.
Pre-tree anclado a la cadena (slice 11d4def… no: e4e64d4/cac4d48 ==
205-post; escena 640b6a0 == 201-post; RadioPanel a9d1144 == 205-post).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/lib/iono/slice.ts` e4e64d4 → c1ac6d9 (antipodal, trunc, label)
- `src/lib/iono/slice.test.ts` cac4d48 → ef2fa38 (+3 its)
- `src/components/ionosphere/IonosphereScene.tsx` 640b6a0 → 2e2ea51
  (Linear, opacity 0.9, label coords)
- `src/components/ionosphere/hud/RadioPanel.tsx` a9d1144 → 46fcb9e (n1)

## 2. Contenido (o4 término a término + n1)
- o4(a): guard antipodal (omega > pi-1e-4 → lerp) — como el espejo.
- o4(b): alfa x0.9 (material opacity — mismo producto que el oráculo).
- o4(c): DataTexture mag+min Linear (vs Nearest default).
- o4(d): índice y alfa por truncado (unsigned char), no round.
- o4(e): label manual/fijo con coordenadas "%.1f,%.0f" (link sigue
  con códigos).
- n1-206: numéricos A visibles con src !== "link" (B manual-only,
  como App.cpp:4254 sliders A para src≥1).

## 3. Barrera
`tsc` 0; `vitest` 127/127 (124 sin flips + 3 nuevos: coords,
antipodal sin NaN, trunc pi-127/alfa-153).
