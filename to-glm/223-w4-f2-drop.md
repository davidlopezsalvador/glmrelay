# 223 — W-4 clase F2: modo Chapman + opacidad [0,3]

## 1. Pin y custodia
Fichero: `to-glm/files/web223_f2.diff` — 7103 B,
sha256 `8dacbd3ab8865f67e3368d48e7cac421a5179e2784cc9d363b567a5fd198b7a9`,
LF puro, mbox `[PATCH] w223-f2`, 5 ficheros, 92+/0- (adición pura).
Pre-tree anclado: escena 55eda60 (219-post), types 00dfd14
(219-post), panel 11c9fdd (219-post); densityVolume primer toque
en W-4 (sin oráculo previo, entra con este drop).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/lib/iono/densityVolume.ts` (nuevo en custodia) → 63c16fd
  (helpers render: colores+modo+clamp)
- `src/lib/iono/densityVolume.test.ts` → da4fc84 (+3 TU)
- `src/components/ionosphere/types.ts` 00dfd14 → 0860b8e (2 settings)
- `src/components/ionosphere/IonosphereScene.tsx` 55eda60 → 977d40b
  (uniforms por frame)
- `src/components/ionosphere/hud/LayersPanel.tsx` 11c9fdd → 29f4e55
  (modo + slider)

## 2. Contenido (clase F2)
- Helpers puros en densityVolume.ts: CHAPMAN_WINNER_COLORS (pin
  anti-deriva vs VOL_FRAG hardcodeado), volumeModeIndex (0/1),
  volumeOpacityClamp [0,3] (setOpacityScale).
- Escena: u_colorMode + u_opacityScale por frame desde settings
  (bloque iso existente extendido).
- UI: botones Density/Chapman + slider Opacidad volumen 0-2.5
  (formato "Nx"); defaults density/1.0.

## 3. Barrera
`tsc` 0; `vitest` 150/150 (147 sin flips + 3 nuevos).
Smoke pendiente (Chapman visible + slider).
