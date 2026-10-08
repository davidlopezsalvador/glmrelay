# 203 — W-4 clase B1-fix: paleta slice 0..1 a byte

Fix al 201 (pusheado con la cortina en negro): `buildPalette` devuelve
stops 0..1 y la asignación a `Uint8Array` truncaba todo a 0.
Smoke del operador: cortina negra (rombo) → tras el fix, viridis
correcto (brillo F2 arriba, alfa abajo), readout `A→B pk 11.7`.

## 1. Pin y custodia
Fichero: `to-glm/files/web203_slicefix.diff` — 2115 B,
sha256 `3d8996c1631df0a4ceabd3ed28d80dadd1d96cb9a44a7b00a6f6f72b6d359569`,
LF puro, mbox `[PATCH] w203-slicefix`, 2 ficheros.
Pre-tree = post-201 (cadena continua). Auto-apply byte-exacto.
Ledger (blob-shas):
- `src/lib/iono/slice.ts` e7546e9 → 11d4def (×255 + clamp + comentario)
- `src/lib/iono/slice.test.ts` 078d796 → cfe3fa4 (+1 test color)

## 2. Barrera
`tsc` 0; `vitest` 124/124 (123 sin flips + 1 nuevo: viridis arriba
R>200/G>150, abajo oscuro no-cero). Smoke navegador: cortina viridis
en dos vistas (manual A/B) + readout.
