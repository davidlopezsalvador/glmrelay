# 297 — Micro-drop fallback no-cacheado (observación 293 §5.3)

Post-F2b #7. Todo web; app 85f4ba4.

## 1. Pin y custodia
Fichero: `to-glm/files/web297_micro.diff` — 868 B,
sha256 `ba192c38c11a541be44cefb9aa9d7d409da4e5b543988f2bd78c2459a891acfc`,
LF puro, mbox `[PATCH] w297-micro`, 1 fichero, 3+/1-.
Pre-tree: api/voyager/route.ts af99636 (== certificado; testigo).
Triple verificación (aplicado == post && SHA-1 == index):
- `src/app/api/voyager/route.ts` af99636 → 79ed20a

## 2. Contenido
El fallback honesto (`au null`) ya NO se cachea: un throttle
transitorio de Horizons no congela 'unavailable' 6 h; cada llamada
reintenta. El payload vivo sigue cacheado (TTL 6 h intacto).

## 3. Barrera
`tsc` 0; `vitest` 280/280 (29 ficheros, sin cambios).
