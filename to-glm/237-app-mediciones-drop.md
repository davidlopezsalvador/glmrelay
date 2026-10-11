# 237 — mediciones 191-residual (build medición umbral 100 ms)

Sesión ~1 h: replay-pausa 60-75 s + 10-20 scrubs + live.
N = 0 GIRO / 31 kc2g (LGDC caído: 504 en catálogo y getbest —
N=44 pendiente del servidor, declarado). Build local solo-log
(umbral 250→100, NO viaja; se revierte tras el drop).
Artefacto: `to-glm/files/stderr-237.log` (65093 B,
sha256 `74b0c3e308ae7f91a4f5fb76cff10ef1d20d82a67a471dbb1a15aedf60c40ab0`).

## Tabla (511 stalls, 448 rebuilds)
- vol: min 94 / mediana 113 / **p95 162** / max 430.
- Hist: 90s×81, 100s×90, 110s×130, 120s×76, resto 130-190 +
  cola 210-430 (10 rebuilds >200, repartidos en toda la sesión).
- Frames >200 ms: 26 (10 rebuilds + 16 foco/swap).

## Criterios 190 §5
- (i) Pausado: **CERO líneas en 60-75 s a umbral 100** → CERRADO
  (más fuerte que lo exigido).
- (ii) p95 < 150: **NO (162)**. Residuo legítimo no memoizable sin
  romper D187 (picos/TEC/integrateTEC por celda + uploads; el floor
  memoizado está en ~70 ms por TU): se pide recalibración o ruling
  de backgrounding (reserva 190 §5).
- (iii) Ningún stall UI >200: **NO en letra** — 10 rebuilds
  200-430 ms/hora + 2 eventos swap (abajo). Steady-state volumen:
  p50 113 ms, hitches ocasionales.
- N-scaling {min,14,44}: **PARCIAL** (N≈0-31; falta N=44).

## Escalado a línea swap (trigger 192: reincidencia)
2 eventos swap puros en una sesión (15.6 s y 16.8 s, focused=1,
iconified=0, vol=0, tras fallos LGDC gambit, ~4 min entre sí, sin
más recurrencias en 20+ min) + el original 10.9 s = 3.ª ocurrencia.
**Se abre 193/194.** Forense pendiente del operador: Event ID 4101
a ~02:08/02:12 local + contexto GPU.
