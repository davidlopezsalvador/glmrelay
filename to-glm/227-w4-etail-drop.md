# 227 — W-4 E-tail: o5 stale 6 h + o6 point-size

## 1. Pin y custodia
Fichero: `to-glm/files/web227_etail.diff` — 10146 B,
sha256 `c953b14794a7552ce4f007297835fa9b26d6b8359582ba2eaf42ab0b4f8850b2`,
LF puro, mbox `[PATCH] w227-etail`, 7 ficheros.
Pre-tree anclado: escena 977d40b (223-post declarado, reproducido
byte-exacto), types 0860b8e (215-post), panel 29f4e55 (223-post);
profileGrid/builders/shaders primer toque en W-4 (declarado).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/lib/iono/profileGrid.ts` (nuevo) → 459888f (stale+epoch)
- `src/lib/iono/profileGrid.test.ts` (nuevo) → feb9769 (+4 TU)
- `src/components/ionosphere/types.ts` 0860b8e → 5b05fbe (o6)
- `src/components/ionosphere/IonosphereScene.tsx` 977d40b → 226155f
- `src/components/ionosphere/hud/LayersPanel.tsx` 29f4e55 → 8b38fd3
- `src/components/ionosphere/builders.ts` (nuevo) → 1c6709a (uniform)
- `src/components/ionosphere/shaders.ts` (nuevo) → 5402166 (uPointSize)

## 2. Contenido
- o5: `isStaleSample` (>6 h, banner App.cpp:4326) + `STALE_AFTER_MS`;
  `stationToProfileSample(s, nowMs)` lo propaga; `buildLiveVolume`
  pasa `epochSec` (cursor-relativo en replay); la puerta `!stale`
  del IDW ya existía (solo faltaba el productor); paneles intactos.
- o6: settings.pointSize 3..30 default 11 (App.cpp:205/4293) +
  clamp [2,30] + uniform uPointSize (shader /11: default idéntico
  al look actual) + slider "Point size" + tick update.
- TU: 4 stale (fresca/stale/vacía, const 6 h, propagación con epoch,
  exclusión de rejilla) + 2 o6 (default+REF, clamp).

## 3. Higiene p2-216 (hallazgo propio)
El working traía una línea colapsada (`replayAdvance(  minutesBack`,
cosmética, válida para tsc) no entregada en ningún delta: restaurada
a los bytes certificados antes de generar. Pre-tree verificado por
hash contra oráculos.

## 4. Barrera
`tsc` 0; `vitest` 156/156 (150 sin flips + 6 nuevos).
