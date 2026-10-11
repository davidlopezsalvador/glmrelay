# 246 — W-4 P1-245 (atribución + wiring caché + techo)

## 1. Pin y custodia
Fichero: `to-glm/files/web246_p1.diff` — 4412 B,
sha256 `0672fb9b76782c22234c2dad928fab3f06834c7d05b406635f7a13bd543b40a0`,
LF puro, mbox `[PATCH] w246-p1`, 4 ficheros, 26+/6-.
Pre-tree = 244-post (fallback 1cc934b/fec901e, route ffe59c7,
page 845a434 — los 4 exactos).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/lib/iono/fallback.ts` 1cc934b → c276f74 (techo+precedencia)
- `src/lib/iono/fallback.test.ts` fec901e → c1392cf (+1 TU techo)
- `src/app/api/ionosondes/route.ts` ffe59c7 → 076f1b4 (wiring)
- `src/app/page.tsx` 845a434 → cd23ad3 (atribución footer)

## 2. Contenido (P1-245a/b + P2-245)
- Atribución GIRO/WWROF/eSWua en el footer.
- Wiring caché: `{ ...stationCache.data, source }` (source nuevo).
- Techo 24 h: `CACHE_MAX_AGE_MIN` + `isCacheUsable`; precedencia
  con techo (vieja → model).
- TU: techo (1440 sí / 1441 no / null no) + resolve con caché vieja.

## 3. Barrera
`tsc` 0; `vitest` 165/165 (164 sin flips + 1 nuevo).
