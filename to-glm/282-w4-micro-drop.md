# 282 — Micro-drop P1-280 + P1-281 + erratas (precedente 263)

Post-F2a #18. Todo web; app re-congelada 85f4ba4.

## 1. Pin y custodia
Fichero: `to-glm/files/web282_micro.diff` — 6709 B,
sha256 `cdaeb49449f94cc5b79054508f77c22e476722439ba4790c7a43c38c9159aaf4`,
LF puro, mbox `[PATCH] w282-micro`, 3 ficheros, 29+/12-, sin nuevos.
Pre-tree: dst-route 73e8072 · page e21cd74 · AePanel 889e71b
(3/3 == certificado; testigos w280/post, cero reverts).
Triple verificación (aplicado == post && SHA-1 == index):
- `src/app/api/dst/route.ts` 73e8072 → fe1c1cb (mes anterior)
- `src/app/page.tsx` e21cd74 → da5321a (reloj client-only + errata)
- `src/components/ionosphere/hud/AePanel.tsx` 889e71b → 5318be3 (pie)

## 2. P1-280: reloj client-only (React #418)
`useState(() => new Date())` fijaba la hora en el prerender estático
vs primer render del cliente. Ahora: estado inicial nulo + set en
useEffect; effSec/cmeEpoch derivan de `nowMs` (0 pre-mount,
determinista en ambos lados); el header muestra "--:--:--" hasta el
montaje. Causa de fondo eliminada (no solo el síntoma del chunking).

## 3. P1-281: diagrama de fase anclado al AE
La ruta trae también el mes anterior (`dst_realtime/YYYYMM`,
verificado vivo dst2609 200) y la serie cubre 45 días; min7d/now
siguen sobre 7 días. Las horas AE (Sep, lag Kyoto) ya intersectan
horas Dst → el SVG renderiza. Pie AePanel actualizado (correlación
abajo, en el panel Dst).

## 4. Erratas (1 línea cada una)
- page: "polling 15 min == TTL" → "polling 5 min; TTL 15 min" (la
  misma errata por tercera vez; sin impacto).

## 5. Barrera
`tsc` 0; `vitest` 259/259 (26 ficheros, sin cambios de tests).
