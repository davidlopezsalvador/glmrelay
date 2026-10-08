# 213 — W-4 clase C1: ventana replay 168 h

Primera partición de clase C (orden: C1 ventana, C2 controles/loop
pendientes). Espejo de kIrtamReplayWindowSec 168 h.

## 1. Pin y custodia
Fichero: `to-glm/files/web213_c1.diff` — 4797 B,
sha256 `7f0d05010a5e3668b78b714dda29f6773f3af35135864360177dff09e9e44353`,
LF puro, mbox `[PATCH] w213-c1`, 4 ficheros.
Pre-tree: types a083251 (205-post) y page a594a52 (201-post) exactos;
route.ts sin deltas previos en la línea (pre 81f9b51 declarado).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/app/api/ionosondes/route.ts` 81f9b51 → 4946957 (ventana+cap)
- `src/components/ionosphere/types.ts` a083251 → ef97006 (comentario)
- `src/app/page.tsx` a594a52 → 9798df0 (maxReplayMin 10080)
- `src/lib/iono/replay.test.ts` NUEVO 6d54e46

## 2. Contenido (clase C1)
- Ruta: `from` 6 h → 168 h; cap historia 72 → 2500.
- Medida empírica previa (EB040 7 días): 104 filas / 4968 B — LGDC
  devuelve serie dispersa por ionograma (~15/día), no cadencia 5 min:
  168 h × 51 estaciones ≈ 265 KB por ciclo. Sin diezmado.
- UI: slider a 10080 min (label "-168 h" automático); lerp
  sampleStationAt intacto sobre huecos grandes.
- TU `replay.test.ts`: 5/5 (clamp extremos, lerp en hueco 21 h,
  exacto en ionograma, fallback sin historia, cero→positivo).

## 3. Barrera
`tsc` 0; `vitest` 133/133 (128 sin flips + 5 nuevos).
