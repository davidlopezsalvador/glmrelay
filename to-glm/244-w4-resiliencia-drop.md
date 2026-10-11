# 244 — W-4 resiliencia web (ruling 243): fail-fast + kc2g + caché honesta

## 1. Pin y custodia
Fichero: `to-glm/files/web244_resiliencia.diff` — 23972 B,
sha256 `646a7591d3dffa5baa3315a2760941da8476a2a15ed6a83d0a04f1dbaaf35c99`,
LF puro, mbox `[PATCH] w244-resiliencia`, 9 ficheros, 410+/47-.
Pre-tree certificado por oráculo (GLM 213/215/229/231/227):
route 50e77eb (215-post) · page e45355c (215-post) ·
types 3bd771c (231-post) · replay.test 0ebbfb6 (229-post) ·
profileGrid(.test) 459888f/feb9769 (227-post); panel primer toque.
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/app/api/ionosondes/route.ts` 50e77eb → ffe59c7
- `src/app/page.tsx` e45355c → 845a434 (gate parcial)
- `src/components/ionosphere/hud/SpaceWeatherPanel.tsx` (nuevo) → 46a5e46
- `src/components/ionosphere/types.ts` 3bd771c → 027217c (stale)
- `src/lib/iono/profileGrid.ts` 459888f → 73207e8 (override)
- `src/lib/iono/profileGrid.test.ts` feb9769 (sin cambios)
- `src/lib/iono/replay.test.ts` 0ebbfb6 → 0c307fc (fixture)
- `src/lib/iono/fallback.ts` NUEVO 1cc934b
- `src/lib/iono/fallback.test.ts` NUEVO fec901e

## 2. Contenido (contrato 243)
- Fail-fast: catálogo caído → sin ronda; primera ola 6 sin aciertos →
  aborta resto + extras (16 s vs 120 s+ colgado; 23 ms en caché).
- kc2g FAILOVER-ONLY (solo ronda fallida): parse filas, lon −180..180,
  EG931 fuera, frescura panel ≤24 h, stale = edad >6 h, B0/B1 100/3,
  history []; jamas primario.
- Caché honesta: nunca vacío como bueno; last-good con edad;
  precedencia live>kc2g>cache>model en payload; source dinámico;
  catálogo TTL 24 h; anti-rebaño 5 min.
- Page: render parcial (overlay solo sin NADA); SourceDot 5 estados.
- Verificado en vivo con LGDC caído: `kc2g fallback`, 34 est
  (32 frescas/2 stale), EG931 fuera, 16 s → 23 ms.

## 3. Barrera
`tsc` 0; `vitest` 164/164 (156 sin flips + 8 fallback).
