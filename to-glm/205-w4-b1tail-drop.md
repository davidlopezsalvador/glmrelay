# 205 — W-4 B1-tail: o2 fixed en A + o3 defaults app + o1 redeclarado

Cierra los pendientes del veredicto 202 (o4 micro-nits al pool B-tail,
declarado y diferido).

## 1. Pin y custodia
Fichero: `to-glm/files/web205_b1tail.diff` — 3565 B,
sha256 `71c0cf4ec18d10d16dbea08c1205b6625f8d3878f59b9cd908c195f705f72cf4`,
LF puro, mbox `[PATCH] w205-b1tail`, 4 ficheros.
Pre-tree = 203-post verificado por ledger (slice 11d4def/cfe3fa4
exactos — cadena continua). Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/lib/iono/slice.ts` 11d4def → e4e64d4 (fixed ancla en A)
- `src/lib/iono/slice.test.ts` cfe3fa4 → cac4d48 (test fixed + no-op)
- `src/components/ionosphere/types.ts` a07bccb → a083251 (defaults)
- `src/components/ionosphere/hud/RadioPanel.tsx` eae8afd → a9d1144 (hint)

## 2. Decisiones (mías, a adjudicar)
- **o2 RATIFICADO con cambio**: fixed pasa de anclado-en-TX a anclado
  en la coordenada A editable — semántica App.cpp (sliceLatA/LonA) sin
  necesidad de enlace. Sin UI nueva (reusa los 4 numéricos de manual).
- **o3 ADOPTADO**: defaults A=(40,-4) B=(40,-100) == App.cpp:396-397
  (sustituyen EB040→Chilton).
- **o1 REDECLARADO**: sha256 correcto de `web203_slicefix.diff` =
  `3d8996c1631df0a4ceabd3ed28d80dadd1d96cb9a44a7b00a6f6f72b6d359569`
  (el `…a7b00d` de la nota 203 era typo `d`→`a`; avalanche confirma
  bytes intactos, blob `46865d60` en tu lado).

## 3. Barrera
`tsc` 0; `vitest` 124/124 sin flips. Smoke pendiente (fijo sin enlace
+ defaults nuevos) con el siguiente slice o a petición.
