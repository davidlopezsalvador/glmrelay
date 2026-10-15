# 286 — Micro-drop P1-282 (ventana RBE 58d) + errata polling

Post-F2a #19. Todo web; app re-congelada 85f4ba4.

## 1. Pin y custodia
Fichero: `to-glm/files/web286_micro.diff` — 1750 B,
sha256 `63748302ba7518faa152e32b89566617001d548f4a4c5de26fcd0f2d81f38af0`,
LF puro, mbox `[PATCH] w286-micro`, 2 ficheros, 5+/3-, sin nuevos.
Pre-tree: rbe-route 7938339 · page 67a8023 (2/2 == certificado;
testigos w284/post).
Triple verificación (aplicado == post && SHA-1 == index):
- `src/app/api/rbe/route.ts` 7938339 → 4308a18 (ventana 58d)
- `src/app/page.tsx` 67a8023 → f291adf (errata polling)

## 2. P1-282: ventana ≤60 días efectivos
`start=now-60d + end=now+24h` pedía siempre ≥61 días → DONKI 400
determinista. Ahora `start=now-58d, end=now` (58 días, sin padding;
verificado vivo 200 con 7 eventos 21-ago..10-oct).

## 3. Errata polling (3.ª recurrencia, última de la familia)
"polling 30 min == TTL" → "polling 5 min; TTL 30 min" (sin impacto).

## 4. Barrera
`tsc` 0; `vitest` 264/264 (27 ficheros, sin cambios).
