# 295 — Micro-drop P1-285 (div duplicado) + P1-286 (fila pasada + fecha)

Post-F2b #7. Todo web; app 85f4ba4.

## 1. Pin y custodia
Fichero: `to-glm/files/web295_micro.diff` — 6413 B,
sha256 `86e2432ebc886a826a3421e9c8e01dc335bea2a300d8a4597631a3632698665b`,
LF puro, mbox `[PATCH] w295-micro`, 5 ficheros, 50+/20-, sin nuevos.
Pre-tree: voyager.ts 2bdcd78 · voyager.test 873763e · route a56cbd0 ·
VoyagerPanel fe76dda · page ce971f1 (5/5 == certificado; testigos).
Triple verificación (aplicado == post && SHA-1 == index):
- `src/lib/iono/voyager.ts` 2bdcd78 → 1f81fc3 (parse+t + pickCurrentRow)
- `src/lib/iono/voyager.test.ts` 873763e → e318fa1 (TU P1-286)
- `src/app/api/voyager/route.ts` a56cbd0 → af99636 (pickCurrentRow)
- `src/components/ionosphere/hud/VoyagerPanel.tsx` fe76dda → 56f52a7
  (fecha visible + no-data gris)
- `src/app/page.tsx` ce971f1 → e58b156 (borrado duplicado móvil)

## 2. P1-285: duplicado móvil eliminado (3 líneas).

## 3. P1-286: fila pasada más cercana (nunca futura; fallback declarado
a la primera) + fecha visible en el panel. TU: pasada más cercana,
vacío→null, todo-futuro→primera.

## 4. Barrera
`tsc` 0; `vitest` 280/280 (29 ficheros; 278 sin flips + 2 nuevos).
