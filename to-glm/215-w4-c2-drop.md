# 215 — W-4 clase C2: replay play/speed/loop + P2 + o1/o3

## 1. Pin y custodia
Fichero: `to-glm/files/web215_c2.diff` — 9505 B,
sha256 `84e9e50d34e3a1d855388550bee5a75743c2569e4a24b2fab5ce5b0df939e1dd`,
LF puro, mbox `[PATCH] w215-c2`, 5 ficheros (sin nuevos: labels a/b
estándar, sin artefacto o2 del 213).
Pre-tree anclado: types ef97006 (213-post), page 9798df0 (213-post),
test 6d54e46 (213-post), TimeBar 8297dfe (199-post), route 81f9b51
(sin deltas previos: primer toque de la línea, declarado).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/app/api/ionosondes/route.ts` 81f9b51 → 50e77eb (ventana+cap+50)
- `src/components/ionosphere/types.ts` ef97006 → 62a5e8e (settings+helper)
- `src/components/ionosphere/hud/TimeBar.tsx` 8297dfe → 98879f9 (UI+o3)
- `src/app/page.tsx` 9798df0 → e45355c (efecto avance)
- `src/lib/iono/replay.test.ts` 6d54e46 → 05eea9a (+5 TU advance)

## 2. Contenido (clase C2)
- Settings: replayPlaying (false), replaySpeed (1, set 0.5/1/2/4/8),
  replayLoop (true). Helper puro `replayAdvance` (espejo
  App.cpp:2139-2141: +dt*speed*1200 s, wrap al fondo con loop, 0 sin).
- TimeBar: play/pausa + velocidad + loop (solo en replay); comentario
  6 h → 168 h (o3 del 214).
- Page: intervalo 500 ms con resuscripción por avance (sin stale).
- TU: 5 advance (10 min/tick 1x, escala 4x, wrap, clamp 0, clamp max).

## 3. P2 re-declaración alertas 211 (veredicto 212 o1)
La nota 211 intercambió los estados: correcto es **Kp GREEN**
(0.33 < 4.0) y **X-ray AMBER** (C1.1 rank≥2), 4 chips sin PROTONES —
el motor web era Alerts.h-correcto, la nota estaba mal. Corregido.

## 4. o1 50 estaciones (veredicto 214)
Verificado: la lista trae 50 códigos únicos sin duplicados; los dos
comentarios que decían 51 eran stale y se corrigen en este drop
(misma línea de custodia, sin TU: comentarios).

## 5. Barrera
`tsc` 0; `vitest` 138/138 (133 sin flips + 5 nuevos).
