# 217 — W-4 p3 + survey D/E/F (paridades y backlog)

## 1. Pin y custodia (p3: default speed 2 == App.cpp:284)
Fichero: `to-glm/files/web217_p3.diff` — 1538 B,
sha256 `b4c11ad9b9e0feaa10615a8be9f93e1a449fe050b45760ffd24c2d3084e09169`,
LF puro, mbox `[PATCH] w217-p3`, 2 ficheros.
Pre-tree = 215-post (types 62a5e8e / test 05eea9a exactos).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/components/ionosphere/types.ts` 62a5e8e → 94c53ad (default 2)
- `src/lib/iono/replay.test.ts` 05eea9a → 174864e (+1 TU pin default)

## 2. p1 re-anclaje ledger route (prescripción 216)
Cadena real: 81f9b51 (pre-213, recuperada) → 4946957 (213: ventana
168 h + cap 2500) → 50e77eb (215: +2 comentarios 51→50). El 215 se
generó contra pre-213 re-llevando C1 (defecto de cadena declarado en
216, convergencia probada). Regla p2 adoptada: pre-tree sin ediciones
locales no entregadas (verificado por hash contra oráculos antes de
generar: este drop cumple).

## 3. Survey D/E/F (declaraciones + backlog)
- **D alertas: PARIDAD** (umbrales 4/5, -5/-10, C/M, 10/20%, debounce
  2, OFF honesto, worst-sin-OFF — espejo W-2 intacto). Sin delta.
- **E rejilla: PARIDAD salvo métricas** (GIRO X/Y, foF2+colores,
  point-size, DIAS EU, stale/M4R-A, click-pin TX/RX; app: 4 modos de
  métrica foF2/MUF/hmF2/NmF2 con colormaps propios — web solo foF2).
  Backlog: selector de métrica.
- **F volumen: gaps reales** (web carece de: ref-shells E/F1/F2,
  iso-bands, labels 3D, modo Chapman, escala opacidad 0-3; paridad en
  peak/model/density/colormaps/explode/limb).
  Backlog 219+: F1 ref-shells+iso+labels, F2 modo Chapman+opacidad.

## 4. Barrera
`tsc` 0; `vitest` 139/139 (138 sin flips + 1 pin default).

## 5. P1 fps (abierto, del 212)
Pendiente del operador: badge CAPAS a pantalla completa sin capturas
(30 s, min/max, capas activas).
